import { getActiveNetworkKey } from "./networks.js";
import type { SarafuNetworkKey } from "./types.js";

export const REMITTANCE_SWAP_ABI = [
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
  {
    inputs: [],
    name: "getStats",
    outputs: [
      { internalType: "uint256", name: "count", type: "uint256" },
      { internalType: "uint256", name: "volume", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const REMITTANCE_CONTRACT_ADDRESSES: Partial<Record<SarafuNetworkKey, `0x${string}`>> = {
  "celo-sepolia": process.env.REMITTANCE_CONTRACT_ADDRESS_CELO_SEPOLIA as `0x${string}` | undefined,
  "celo-mainnet": process.env.REMITTANCE_CONTRACT_ADDRESS_CELO as `0x${string}` | undefined,
  "status-sepolia": process.env.REMITTANCE_CONTRACT_ADDRESS_STATUS_SEPOLIA as `0x${string}` | undefined,
};

export function getRemittanceContractAddress(network = getActiveNetworkKey()): `0x${string}` | undefined {
  const direct =
    process.env.REMITTANCE_CONTRACT_ADDRESS ||
    process.env.NEXT_PUBLIC_REMITTANCE_CONTRACT_ADDRESS;

  if (direct) {
    return direct as `0x${string}`;
  }

  return REMITTANCE_CONTRACT_ADDRESSES[network];
}
