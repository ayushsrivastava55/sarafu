# Sarafu Smart Contracts

This package contains the `RemittanceSwap` audit contract used by Sarafu to log remittances and manage funded ERC-20 balances for the agent wallet.

## Quick Start

```bash
pnpm compile
pnpm test
pnpm deploy:celo-sepolia
pnpm deploy:celo
pnpm deploy:status-sepolia
```

## Available Scripts

- `pnpm compile` compiles the contracts.
- `pnpm test` runs the `RemittanceSwap` test suite.
- `pnpm deploy` deploys `RemittanceSwap` to the default network.
- `pnpm deploy:celo-sepolia` deploys to Celo Sepolia.
- `pnpm deploy:celo` deploys to Celo mainnet.
- `pnpm deploy:status-sepolia` deploys to Status Sepolia.
- `pnpm verify` verifies a deployment.
- `pnpm clean` clears Hardhat artifacts and cache.

## Networks

- `celo`
  Chain ID: `42220`
  RPC: `https://forno.celo.org`
  Explorer: `https://celoscan.io`
- `celo-sepolia`
  Chain ID: `11142220`
  RPC: `https://forno.celo-sepolia.celo-testnet.org/`
  Explorer: `https://sepolia.celoscan.io/`
  Faucet: `https://faucet.celo.org`
- `status-sepolia`
  Chain ID: `1660990954`
  RPC: `https://public.sepolia.rpc.status.network`
  Explorer: `https://sepoliascan.status.network`
  Faucet: `https://faucet.status.network/`

## Environment

```env
PRIVATE_KEY=0x...
ETHERSCAN_API_KEY=...
```

## Structure

```text
contracts/
  MockERC20.sol
  RemittanceSwap.sol
ignition/modules/
  RemittanceSwap.ts
test/
  RemittanceSwap.ts
```

## Security Notes

- Use a dedicated funded wallet for testnet deployments.
- Test on Celo Sepolia before any mainnet deployment.
- `recordRemittance` and `withdraw` are owner-only.
- Token movement uses OpenZeppelin `SafeERC20`.
