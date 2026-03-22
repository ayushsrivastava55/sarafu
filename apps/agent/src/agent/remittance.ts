import { createPublicClient, createWalletClient, http, parseUnits, formatUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celo } from "viem/chains";
import { TOKENS, CURRENCY_TO_TOKEN } from "./constants.js";

export interface RemittanceIntent {
  action: string;
  amount?: number;
  sourceCurrency?: string;
  targetCurrency?: string;
  recipientAddress?: string;
  sourceToken?: string;
  targetToken?: string;
  confidence: number;
  rawMessage: string;
}

// Initialize Mento SDK dynamically
let mentoInstance: any = null;

async function getMento() {
  if (!mentoInstance) {
    const { Mento, ChainId } = await import("@mento-protocol/mento-sdk");
    mentoInstance = await Mento.create(ChainId.CELO);
  }
  return mentoInstance;
}

function getWalletClient() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) throw new Error("PRIVATE_KEY not set in .env");

  const account = privateKeyToAccount(privateKey as `0x${string}`);
  return createWalletClient({
    account,
    chain: celo,
    transport: http(process.env.CELO_RPC || "https://forno.celo.org"),
  });
}

function getPublicClient() {
  return createPublicClient({
    chain: celo,
    transport: http(process.env.CELO_RPC || "https://forno.celo.org"),
  });
}

export interface QuoteResult {
  sourceAmount: string;
  sourceCurrency: string;
  targetAmount: string;
  targetCurrency: string;
  exchangeRate: string;
  fee: string;
}

export interface SendResult {
  txHash: string;
  sourceAmount: string;
  sourceCurrency: string;
  targetAmount: string;
  targetCurrency: string;
  recipient: string;
  explorerUrl: string;
}

export async function getQuote(intent: RemittanceIntent): Promise<QuoteResult> {
  if (!intent.sourceToken || !intent.targetToken || !intent.amount) {
    throw new Error("Missing source token, target token, or amount for quote");
  }

  const mento = await getMento();
  const amountIn = parseUnits(intent.amount.toString(), 18);

  const expectedOut = await mento.quotes.getAmountOut(
    intent.sourceToken,
    intent.targetToken,
    amountIn
  );

  const sourceAmountStr = intent.amount.toString();
  const targetAmountStr = formatUnits(expectedOut, 18);
  const rate = (parseFloat(targetAmountStr) / intent.amount).toFixed(4);

  return {
    sourceAmount: sourceAmountStr,
    sourceCurrency: intent.sourceCurrency || "USD",
    targetAmount: targetAmountStr,
    targetCurrency: intent.targetCurrency || "?",
    exchangeRate: rate,
    fee: "< $0.001",
  };
}

export async function sendRemittance(intent: RemittanceIntent): Promise<SendResult> {
  if (!intent.sourceToken || !intent.targetToken || !intent.amount || !intent.recipientAddress) {
    throw new Error("Missing required fields: sourceToken, targetToken, amount, recipientAddress");
  }

  const mento = await getMento();
  const walletClient = getWalletClient();
  const publicClient = getPublicClient();
  const account = walletClient.account!;

  const amountIn = parseUnits(intent.amount.toString(), 18);

  // Build swap transaction via Mento SDK
  const { approval, swap } = await mento.swap.buildSwapTransaction(
    intent.sourceToken,
    intent.targetToken,
    amountIn,
    intent.recipientAddress as `0x${string}`,
    account.address,
    {
      slippageTolerance: 0.5,
    }
  );

  // Execute approval if needed
  if (approval) {
    const approvalHash = await walletClient.sendTransaction(approval);
    await publicClient.waitForTransactionReceipt({ hash: approvalHash });
  }

  // Execute swap
  const swapHash = await walletClient.sendTransaction(swap.params);
  const receipt = await publicClient.waitForTransactionReceipt({ hash: swapHash });

  // Get the actual output amount from the quote
  const expectedOut = await mento.quotes.getAmountOut(
    intent.sourceToken,
    intent.targetToken,
    amountIn
  );

  return {
    txHash: swapHash,
    sourceAmount: intent.amount.toString(),
    sourceCurrency: (intent.sourceCurrency || "USD").toUpperCase(),
    targetAmount: formatUnits(expectedOut, 18),
    targetCurrency: (intent.targetCurrency || "?").toUpperCase(),
    recipient: intent.recipientAddress,
    explorerUrl: `https://celoscan.io/tx/${swapHash}`,
  };
}

export async function getBalance(tokenSymbol?: string): Promise<Record<string, string>> {
  const publicClient = getPublicClient();
  const walletClient = getWalletClient();
  const address = walletClient.account!.address;

  const erc20Abi = [
    {
      name: "balanceOf",
      type: "function",
      stateMutability: "view",
      inputs: [{ name: "account", type: "address" }],
      outputs: [{ name: "", type: "uint256" }],
    },
  ] as const;

  const tokensToCheck = tokenSymbol
    ? { [tokenSymbol]: TOKENS[tokenSymbol as keyof typeof TOKENS] }
    : { USDm: TOKENS.USDm, EURm: TOKENS.EURm, KESm: TOKENS.KESm, NGNm: TOKENS.NGNm, PHPm: TOKENS.PHPm, BRLm: TOKENS.BRLm };

  const balances: Record<string, string> = {};

  for (const [symbol, address_] of Object.entries(tokensToCheck)) {
    try {
      const balance = await publicClient.readContract({
        address: address_ as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address],
      });
      balances[symbol] = formatUnits(balance, 18);
    } catch {
      balances[symbol] = "0";
    }
  }

  return balances;
}

export function listSupportedCurrencies(): string[] {
  return Object.keys(CURRENCY_TO_TOKEN).filter(
    (k) => !["dollar", "dollars", "euro", "euros", "shilling", "shillings",
             "peso", "pesos", "pound", "pounds", "franc", "naira", "rand",
             "yen", "cedi", "real", "reais", "cfa"].includes(k)
  );
}
