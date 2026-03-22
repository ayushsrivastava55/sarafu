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
