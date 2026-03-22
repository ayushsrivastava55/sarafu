import { randomUUID } from "crypto";
import {
  createPublicClient,
  createWalletClient,
  encodeFunctionData,
  formatUnits,
  http,
  isAddress,
  parseUnits,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { deadlineFromMinutes, Mento, ChainId } from "@mento-protocol/mento-sdk";
import { JsonRpcProvider, Wallet as EthersWallet } from "ethers";
import { buildFeeComparison } from "./fees.js";
import { listSupportedCurrencies, resolveTokenAddress, getTokenRegistry } from "./currencies.js";
import { getExplorerUrl, getNetworkConfig, getActiveNetworkKey, isCeloNetwork } from "./networks.js";
import { getRemittanceContractAddress, REMITTANCE_SWAP_ABI } from "./contracts.js";
import { QuoteStore } from "./store.js";
import type {
  BalanceSnapshot,
  QuoteRequest,
  QuoteRecord,
  RemittanceRequest,
  RemittanceResult,
  SarafuNetworkKey,
  SupportedCurrency,
} from "./types.js";

const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

let mentoClient: Mento | null = null;
let mentoClientNetwork: SarafuNetworkKey | null = null;

interface TransactionLike {
  to: `0x${string}`;
  data?: `0x${string}`;
  value?: bigint | number | string;
}

function getMentoChainId(network: SarafuNetworkKey): ChainId {
  return network === "celo-mainnet" ? ChainId.CELO : ChainId.CELO_SEPOLIA;
}

async function getMento(network: SarafuNetworkKey): Promise<Mento> {
  if (!isCeloNetwork(network)) {
    throw new Error(`Mento quoting is only supported on Celo networks, received ${network}.`);
  }

  const expectedChainId = getMentoChainId(network);
  if (!mentoClient || mentoClientNetwork !== network) {
    mentoClient = await Mento.create(expectedChainId);
    mentoClientNetwork = network;
  }

  return mentoClient;
}

function getNormalizedPrivateKey(): `0x${string}` {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY is not configured.");
  }

  return (privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`) as `0x${string}`;
}

function getAccount() {
  return privateKeyToAccount(getNormalizedPrivateKey());
}

export function createWallet(network = getActiveNetworkKey()) {
  const config = getNetworkConfig(network);
  const account = getAccount();

  return createWalletClient({
    account,
    chain: config.chain,
    transport: http(config.rpcUrl),
  });
}

export function createPublic(network = getActiveNetworkKey()) {
  const config = getNetworkConfig(network);

  return createPublicClient({
    chain: config.chain,
    transport: http(config.rpcUrl),
  });
}

function getEthersWallet(network = getActiveNetworkKey()) {
  const config = getNetworkConfig(network);
  return new EthersWallet(getNormalizedPrivateKey(), new JsonRpcProvider(config.rpcUrl));
}

async function sendTransactionWithFallback(
  network: SarafuNetworkKey,
  walletClient: ReturnType<typeof createWallet>,
  publicClient: ReturnType<typeof createPublic>,
  tx: TransactionLike,
) {
  try {
    const hash = await walletClient.sendTransaction(tx as Parameters<typeof walletClient.sendTransaction>[0]);
    await publicClient.waitForTransactionReceipt({ hash });
    return hash;
  } catch (error) {
    if (!isCeloNetwork(network)) {
      throw error;
    }

    const signer = getEthersWallet(network);
    const response = await signer.sendTransaction({
      to: tx.to,
      data: tx.data,
      value: tx.value === undefined ? undefined : BigInt(tx.value),
    });
    await response.wait();
    return response.hash as `0x${string}`;
  }
}

export class RemittanceService {
  constructor(
    private readonly quoteStore: QuoteStore,
    readonly network: SarafuNetworkKey = getActiveNetworkKey(),
  ) {}

  async getQuote(input: QuoteRequest): Promise<QuoteRecord> {
    const sourceCurrency = input.fromCurrency.toUpperCase();
    const targetCurrency = input.toCurrency.toUpperCase();
    const sourceToken = resolveTokenAddress(sourceCurrency, this.network);
    const targetToken = resolveTokenAddress(targetCurrency, this.network);

    if (!sourceToken || !targetToken) {
      throw new Error(`Unsupported currency pair: ${sourceCurrency} -> ${targetCurrency}`);
    }

    const mento = await getMento(this.network);
    const amountIn = parseUnits(input.amount.toString(), 18);
    const route = await mento.routes.findRoute(sourceToken, targetToken);

    if (!route) {
      throw new Error(`No Mento route available for ${sourceCurrency} -> ${targetCurrency}`);
    }

    const expectedOut = await mento.quotes.getAmountOut(sourceToken, targetToken, amountIn);
    const targetAmount = formatUnits(expectedOut, 18);

    return this.quoteStore.create({
      sourceAmount: input.amount.toString(),
      sourceCurrency,
      sourceToken,
      targetAmount: Number.parseFloat(targetAmount).toFixed(2),
      targetCurrency,
      targetToken,
      exchangeRate: (Number.parseFloat(targetAmount) / input.amount).toFixed(4),
      feeEstimate: "< $0.001",
      network: this.network,
    });
  }

  async sendRemittance(input: RemittanceRequest): Promise<RemittanceResult> {
    if (!isAddress(input.recipientAddress)) {
      throw new Error("Invalid recipient address.");
    }

    const existing = this.quoteStore.getExecution(input.idempotencyKey);
    if (existing) {
      return existing;
    }

    const quote = this.quoteStore.getValid(input.quoteId);
    const walletClient = createWallet(this.network);
    const publicClient = createPublic(this.network);
    const account = walletClient.account;

    if (!account) {
      throw new Error("Wallet client account is not available.");
    }

    // Mark quote as consumed BEFORE executing the swap to prevent replay on crash
    this.quoteStore.markConsumed(input.quoteId);

    const mento = await getMento(this.network);
    const amountIn = parseUnits(quote.sourceAmount, 18);
    const { approval, swap } = await mento.swap.buildSwapTransaction(
      quote.sourceToken,
      quote.targetToken,
      amountIn,
      input.recipientAddress,
      account.address,
      {
        slippageTolerance: 0.5,
        deadline: deadlineFromMinutes(5),
      },
    );

    if (approval) {
      await sendTransactionWithFallback(this.network, walletClient, publicClient, approval as TransactionLike);
    }

    const swapHash = await sendTransactionWithFallback(
      this.network,
      walletClient,
      publicClient,
      swap.params as TransactionLike,
    );

    const result: RemittanceResult = {
      txHash: swapHash,
      explorerUrl: getExplorerUrl(swapHash, this.network),
      sourceAmount: quote.sourceAmount,
      sourceCurrency: quote.sourceCurrency,
      targetAmount: quote.targetAmount,
      targetCurrency: quote.targetCurrency,
      recipient: input.recipientAddress,
      network: this.network,
    };

    const contractAddress = getRemittanceContractAddress(this.network);
    if (contractAddress && isCeloNetwork(this.network)) {
      const callData = encodeFunctionData({
        abi: REMITTANCE_SWAP_ABI,
        functionName: "recordRemittance",
        args: [
          input.recipientAddress,
          quote.sourceToken,
          quote.targetToken,
          parseUnits(quote.sourceAmount, 18),
          parseUnits(quote.targetAmount, 18),
        ],
      });

      const contractTxHash = await sendTransactionWithFallback(this.network, walletClient, publicClient, {
        to: contractAddress,
        data: callData,
      });
      result.contractRecordTxHash = contractTxHash;
    }

    return this.quoteStore.saveExecution(input.idempotencyKey, result);
  }

  async getBalances(): Promise<BalanceSnapshot> {
    const publicClient = createPublic(this.network);
    const account = getAccount();

    const registry = getTokenRegistry(this.network);
    const entries = Object.entries(registry).filter(
      ([symbol]) => symbol !== "CELO" && symbol !== "USDC",
    );

    const results = await Promise.all(
      entries.map(async ([symbol, address]) => {
        try {
          const balance = await publicClient.readContract({
            address: address as `0x${string}`,
            abi: ERC20_ABI,
            functionName: "balanceOf",
            args: [account.address],
          });
          return [symbol, formatUnits(balance, 18)] as const;
        } catch {
          return [symbol, "0"] as const;
        }
      }),
    );

    const balances: Record<string, string> = {};
    for (const [symbol, value] of results) {
      balances[symbol] = value;
    }

    return {
      address: account.address,
      network: this.network,
      balances,
    };
  }

  listCurrencies(): SupportedCurrency[] {
    return listSupportedCurrencies();
  }

  async explainFees(amount = 100) {
    const comparison = buildFeeComparison(amount);
    let liveQuote: QuoteRecord | null = null;

    try {
      liveQuote = await this.getQuote({ amount, fromCurrency: "USD", toCurrency: "KES" });
    } catch {
      liveQuote = null;
    }

    return {
      comparison,
      liveQuote,
    };
  }
}

export function createIdempotencyKey(prefix = "sarafu"): string {
  return `${prefix}-${randomUUID()}`;
}
