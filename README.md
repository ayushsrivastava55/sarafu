# Sarafu

AI-powered cross-border remittance agent on Celo. Send money across borders in under 2 seconds for less than $0.001 in fees.

## What it does

Sarafu is an autonomous AI agent that handles cross-border remittances using Celo's Mento stablecoins. You talk to it in natural language — it reasons, fetches quotes, and executes on-chain swaps.

```
you > Send $50 to my friend in Kenya

  [tool] get_quote({"amount":50,"from_currency":"usd","to_currency":"kes"})
  [result] {"sourceAmount":"50","targetAmount":"6450.23","exchangeRate":"129.0046","fee":"< $0.001"}

sarafu > 50 USD converts to 6,450.23 KES at a rate of 129.00. Fee is under $0.001.
         Should I proceed? I need the recipient's wallet address.
```

### How it works

- **Venice AI** — Private inference with zero data retention. Your financial data is never logged.
- **Celo Mento** — On-chain stablecoin swaps across 15+ currencies (USD, EUR, KES, NGN, PHP, BRL, GBP, ZAR, and more) at oracle FX rates.
- **Agent loop** — The LLM decides which tools to call. No hardcoded routing — the agent reasons about your intent and acts.

### Supported currencies

USD, EUR, GBP, BRL, KES, NGN, PHP, ZAR, COP, XOF, JPY, CHF, AUD, CAD, GHS

## Live Deployments

### Contracts

- `Celo Sepolia` `RemittanceSwap`: `0xA77f8507838CC8719ac5B59567D2c260c007A366`
- `Status Sepolia` `RemittanceSwap`: `0xAA777e4835bbC729a0C50F1EC63dC5Dc371379E7`

### On-Chain Proof

- `Status Sepolia` gasless qualifier tx:
  `https://sepoliascan.status.network/tx/0xb49bfe8970e86623e59cf71d546f8a01c7680fef62a5890b9eade5b4efaf8b1d`
- `Celo Sepolia` live remittance tx:
  `https://sepolia.celoscan.io/tx/0x5918e5097ad18eb51c4b93cd648b22c88761fc28b46ffa531a408f11e311f4b5`
- `Celo Sepolia` `recordRemittance` tx:
  `https://sepolia.celoscan.io/tx/0xa5c35b1b8336ca5780304d07c245171c31694f8d7dd3743c5fc352363581c8d8`

## Project Structure

Monorepo managed by Turborepo:

```
apps/
  agent/       — CLI agent (Venice AI + Mento SDK)
  contracts/   — Solidity (RemittanceSwap.sol)
  web/         — Next.js frontend
```

## Setup

```bash
pnpm install
```

Create `.env` at the root:

```
VENICE_API_KEY=your_venice_api_key
PRIVATE_KEY=0x_your_wallet_private_key
```

### Run the agent

```bash
pnpm agent:dev
```

### Deploy contracts

```bash
# Celo Sepolia testnet
pnpm contracts:deploy:celo-sepolia

# Celo mainnet
pnpm contracts:deploy:celo
```

## Tech Stack

- **AI**: Venice AI (GLM 4.7, function calling, zero data retention)
- **Blockchain**: Celo, Mento Protocol
- **Language**: TypeScript
- **Contracts**: Solidity, Hardhat
- **Frontend**: Next.js, Tailwind CSS
- **Monorepo**: Turborepo, pnpm
