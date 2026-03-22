import { encodeFunctionData, isAddress, parseUnits } from "viem";

const REMITTANCE_SWAP_ABI = [
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "address", name: "tokenIn", type: "address" },
      { internalType: "address", name: "tokenOut", type: "address" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOut", type: "uint256" },
    ],
    name: "recordRemittance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

async function main() {
  const contractAddress = requireEnv("STATUS_REMITTANCE_CONTRACT_ADDRESS");
  const recipient = requireEnv("STATUS_GASLESS_RECIPIENT");
  const tokenIn = requireEnv("STATUS_GASLESS_TOKEN_IN");
  const tokenOut = requireEnv("STATUS_GASLESS_TOKEN_OUT");
  const amountIn = requireEnv("STATUS_GASLESS_AMOUNT_IN");
  const amountOut = requireEnv("STATUS_GASLESS_AMOUNT_OUT");

  for (const value of [contractAddress, recipient, tokenIn, tokenOut]) {
    if (!isAddress(value)) {
      throw new Error(`Invalid address: ${value}`);
    }
  }

  const data = encodeFunctionData({
    abi: REMITTANCE_SWAP_ABI,
    functionName: "recordRemittance",
    args: [
      recipient as `0x${string}`,
      tokenIn as `0x${string}`,
      tokenOut as `0x${string}`,
      parseUnits(amountIn, 18),
      parseUnits(amountOut, 18),
    ],
  });

  const payload = {
    chainId: 1660990954,
    to: contractAddress,
    data,
    gas: "0x0",
    note: "Submit this calldata through the Status Sepolia gasless transaction flow and keep the resulting tx hash as hackathon proof.",
  };

  console.log(JSON.stringify(payload, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
