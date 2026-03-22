import path from "path";
import { subtask, type HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import { TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD } from "hardhat/builtin-tasks/task-names";

subtask(TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD, async (args) => {
  if (args.solcVersion !== "0.8.26") {
    throw new Error(`Sarafu contracts expect solc 0.8.26, received ${args.solcVersion}.`);
  }

  return {
    version: "0.8.26",
    longVersion: "0.8.26+commit.8a97fa7a",
    compilerPath: path.join(process.cwd(), "../../node_modules/.pnpm/solc@0.8.26_debug@4.4.3/node_modules/solc/soljson.js"),
    isSolcJs: true,
  };
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    celo: {
      url: "https://forno.celo.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 42220,
    },
    "celo-sepolia": {
      url: "https://forno.celo-sepolia.celo-testnet.org/",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11142220,
    },
    "status-sepolia": {
      url: "https://public.sepolia.rpc.status.network",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1660990954,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      celo: process.env.ETHERSCAN_API_KEY || "",
      "celo-sepolia": process.env.ETHERSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://api.etherscan.io/v2/api",
          browserURL: "https://celoscan.io",
        },
      },
      {
        network: "celo-sepolia",
        chainId: 11142220,
        urls: {
          apiURL: "https://api.etherscan.io/v2/api",
          browserURL: "https://sepolia.celoscan.io/",
        },
      },
      {
        network: "status-sepolia",
        chainId: 1660990954,
        urls: {
          apiURL: "https://sepoliascan.status.network/api",
          browserURL: "https://sepoliascan.status.network",
        },
      },
    ],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};

export default config;
