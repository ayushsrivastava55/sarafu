import { defineChain, type Chain } from "viem";
import { celo } from "viem/chains";
import type { SarafuNetworkKey } from "./types.js";

export interface NetworkConfig {
  key: SarafuNetworkKey;
  displayName: string;
  chainId: number;
  explorerTxBaseUrl: string;
  rpcUrl: string;
  chain: Chain;
  supportsMento: boolean;
}

const statusSepolia = defineChain({
  id: 1660990954,
  name: "Status Sepolia",
  network: "status-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://public.sepolia.rpc.status.network"],
    },
    public: {
      http: ["https://public.sepolia.rpc.status.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "StatusScan",
      url: "https://sepoliascan.status.network",
    },
  },
});

const celoSepolia = defineChain({
  id: 11142220,
  name: "Celo Sepolia",
  network: "celo-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "CELO",
  },
  rpcUrls: {
    default: {
      http: ["https://forno.celo-sepolia.celo-testnet.org"],
    },
    public: {
      http: ["https://forno.celo-sepolia.celo-testnet.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "CeloScan",
      url: "https://sepolia.celoscan.io",
    },
  },
  testnet: true,
});

const NETWORKS: Record<SarafuNetworkKey, Omit<NetworkConfig, "rpcUrl">> = {
  "celo-sepolia": {
    key: "celo-sepolia",
    displayName: "Celo Sepolia",
    chainId: 11142220,
    explorerTxBaseUrl: "https://sepolia.celoscan.io/tx/",
    chain: celoSepolia,
    supportsMento: true,
  },
  "celo-mainnet": {
    key: "celo-mainnet",
    displayName: "Celo",
    chainId: 42220,
    explorerTxBaseUrl: "https://celoscan.io/tx/",
    chain: celo,
    supportsMento: true,
  },
  "status-sepolia": {
    key: "status-sepolia",
    displayName: "Status Sepolia",
    chainId: 1660990954,
    explorerTxBaseUrl: "https://sepoliascan.status.network/tx/",
    chain: statusSepolia,
    supportsMento: false,
  },
};

function normalizeNetworkKey(value?: string): SarafuNetworkKey {
  switch ((value || "").toLowerCase()) {
    case "mainnet":
    case "celo":
    case "celo-mainnet":
      return "celo-mainnet";
    case "status":
    case "status-sepolia":
      return "status-sepolia";
    default:
      return "celo-sepolia";
  }
}

function getDefaultRpcUrl(network: SarafuNetworkKey): string {
  switch (network) {
    case "celo-mainnet":
      return process.env.CELO_RPC_URL || process.env.CELO_RPC || "https://forno.celo.org";
    case "status-sepolia":
      return process.env.STATUS_RPC_URL || "https://public.sepolia.rpc.status.network";
    case "celo-sepolia":
    default:
      return process.env.CELO_SEPOLIA_RPC_URL || process.env.CELO_RPC || "https://forno.celo-sepolia.celo-testnet.org";
  }
}

export function getActiveNetworkKey(): SarafuNetworkKey {
  return normalizeNetworkKey(process.env.SARAFU_NETWORK || process.env.CELO_NETWORK);
}

export function getNetworkConfig(network = getActiveNetworkKey()): NetworkConfig {
  return {
    ...NETWORKS[network],
    rpcUrl: getDefaultRpcUrl(network),
  };
}

export function getExplorerUrl(txHash: string, network = getActiveNetworkKey()): string {
  return `${getNetworkConfig(network).explorerTxBaseUrl}${txHash}`;
}

export function isCeloNetwork(network = getActiveNetworkKey()): boolean {
  return network === "celo-sepolia" || network === "celo-mainnet";
}
