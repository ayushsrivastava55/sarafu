# Sarafu — Product Requirements Document

## Problem

Cross-border remittances are broken. $700B+ moves across borders annually, and migrants lose ~$45B/year in fees.

| Service | Fee on $200 | Time | Hidden FX markup |
|---------|------------|------|-----------------|
| Western Union | $10-14 (5-7%) | 1-3 days | 2-4% |
| Wise | $7 (3.5%) | 1-2 days | 0.5-1% |
| Bank wire | $25-50 | 3-5 days | 3-5% |
| **Global average** | **$12.70 (6.35%)** | **1-5 days** | **Varies** |

Source: World Bank Remittance Prices Worldwide Q4 2025

The people paying these fees — migrant workers sending money home — are the ones who can least afford them.

## Solution

Sarafu is an autonomous AI agent that handles cross-border remittances on Celo using Mento stablecoins. It processes natural language payment intents privately through Venice AI, swaps between 15+ local currencies on-chain, and settles in under 2 seconds for less than $0.001 in fees.

**The user experience:**
```
you > Send $50 to my friend in Kenya at 0xABC...

  [tool] get_quote({"amount":50,"from_currency":"usd","to_currency":"kes"})
  [result] {"sourceAmount":"50","targetAmount":"6408.58","exchangeRate":"128.17","fee":"< $0.001"}

sarafu > 50 USD = 6,408.58 KES at rate 128.17. Fee: < $0.001.
         Should I proceed with sending to 0xABC...?

you > yes

  [tool] send_remittance({"amount":50,"from_currency":"usd","to_currency":"kes","recipient_address":"0xABC..."})
  [result] {"txHash":"0x...","explorerUrl":"https://celoscan.io/tx/0x..."}

sarafu > Sent. 6,408.58 KES delivered to 0xABC... in 1.2 seconds.
         Tx: https://celoscan.io/tx/0x...
```

## Architecture

### Core: Agent Loop (not a REST API)

Sarafu is a **while loop with tools** — the canonical agent pattern. The LLM decides which tools to call based on the user's message. No hardcoded routing, no switch statements.

```
User message
    │
    ▼
┌──────────────────────────┐
│  Venice AI (GLM 4.7)     │
│  - Reasons about intent  │
│  - Picks tools to call   │
│  - Zero data retention   │
│  - No logs of user data  │
└──────────┬───────────────┘
           │ tool_calls
           ▼
┌──────────────────────────┐
│  Tool Executor           │
│  - get_quote             │ ◄── Mento SDK (on-chain oracle rates)
│  - send_remittance       │ ◄── Mento SDK (swap + transfer)
│  - check_balance         │ ◄── Celo RPC (ERC-20 balances)
│  - list_currencies       │
│  - explain_fees          │ ◄── Real quote + World Bank data
└──────────┬───────────────┘
           │ tool results
           ▼
┌──────────────────────────┐
│  Venice AI               │
│  - Sees tool results     │
│  - Generates response    │
│  - May call more tools   │
│  - Or returns text       │
└──────────┬───────────────┘
           │
           ▼
     Agent response
```

### Why Venice AI

1. **Zero data retention** — When a user says "send $50 to my mom in Kenya," they're revealing financial activity, family relationships, and cross-border flows. Venice processes this and forgets it. No logs.
2. **Function calling** — GLM 4.7 (128K context) supports tool use natively. The agent reasons about which tools to call.
3. **TEE attestation** — Venice can cryptographically prove responses came from a secure enclave via NEAR AI attestation endpoints.

### Why Celo + Mento

1. **15+ local currencies** — Not just USD/EUR. Mento has KES (Kenya), NGN (Nigeria), PHP (Philippines), BRL (Brazil), GHS (Ghana), ZAR (South Africa), COP (Colombia), XOF (West Africa), and more.
2. **Sub-cent fees** — Celo gas costs < $0.001 per transaction.
3. **1-second finality** — Money arrives in one block.
4. **Oracle FX rates** — Mento uses on-chain oracles for exchange rates. No middleman markup.
5. **MiniPay** — 8M+ mobile wallet users in Africa. Recipients don't need a bank account.

## Monorepo Structure

```
sarafu/
├── apps/
│   ├── agent/                    # Core AI agent
│   │   ├── src/
│   │   │   ├── index.ts          # CLI entry point (readline loop)
│   │   │   ├── agent/
│   │   │   │   ├── loop.ts       # Agent while-loop (Venice AI + tool dispatch)
│   │   │   │   ├── tools.ts      # Tool definitions (JSON schema for function calling)
│   │   │   │   ├── executor.ts   # Tool execution (maps tool names → functions)
│   │   │   │   ├── system-prompt.ts  # Agent persona and behavior rules
│   │   │   │   ├── remittance.ts # Mento SDK integration (quotes + swaps)
│   │   │   │   └── constants.ts  # Token addresses (mainnet + testnet)
│   │   │   └── utils/
│   │   │       └── logger.ts     # Conversation log export (for hackathon submission)
│   │   └── package.json
│   │
│   ├── contracts/                # Solidity smart contracts
│   │   ├── contracts/
│   │   │   └── RemittanceSwap.sol  # On-chain remittance logging + fund management
│   │   ├── ignition/modules/
│   │   │   └── RemittanceSwap.ts   # Hardhat Ignition deploy module
│   │   └── hardhat.config.ts       # Celo + Status Network config
│   │
│   └── web/                      # Next.js frontend
│       └── (Celo Composer template)
│
├── .env                          # API keys (gitignored)
├── package.json                  # Turborepo root
├── pnpm-workspace.yaml
└── turbo.json
```

## Agent Tools

| Tool | Purpose | Data Source |
|------|---------|------------|
| `get_quote` | Real-time FX quote between any two Mento currencies | Mento SDK → on-chain oracle |
| `send_remittance` | Execute swap + transfer on Celo | Mento SDK → on-chain tx |
| `check_balance` | Show agent wallet balances | Celo RPC → ERC-20 contracts |
| `list_currencies` | List all 15+ supported currencies | Static (from Mento registry) |
| `explain_fees` | Compare Sarafu fees vs traditional services | Real quote + World Bank data |

## Smart Contract: RemittanceSwap.sol

On-chain record of all remittances processed by the agent.

**Functions:**
- `recordRemittance(recipient, tokenIn, tokenOut, amountIn, amountOut)` — Log a completed remittance
- `deposit(token, amount)` — Fund the agent's operating balance
- `withdraw(token, amount)` — Owner withdrawal
- `getStats()` — Total remittance count and volume
- `getRemittance(index)` — Retrieve a specific remittance record

**Events:**
- `RemittanceSent(sender, recipient, tokenIn, tokenOut, amountIn, amountOut, timestamp)`
- `FundsDeposited(token, from, amount)`
- `FundsWithdrawn(token, to, amount)`

**Deployment targets:**
- Celo Sepolia (primary demo)
- Status Network Sepolia (gasless track qualifier)

## Supported Currencies

| Code | Currency | Mento Token |
|------|----------|-------------|
| USD | US Dollar | USDm |
| EUR | Euro | EURm |
| GBP | British Pound | GBPm |
| BRL | Brazilian Real | BRLm |
| KES | Kenyan Shilling | KESm |
| NGN | Nigerian Naira | NGNm |
| PHP | Philippine Peso | PHPm |
| ZAR | South African Rand | ZARm |
| COP | Colombian Peso | COPm |
| XOF | West African CFA Franc | XOFm |
| GHS | Ghanaian Cedi | GHSm |
| JPY | Japanese Yen | JPYm |
| CHF | Swiss Franc | CHFm |
| AUD | Australian Dollar | AUDm |
| CAD | Canadian Dollar | CADm |

## Hackathon Track Alignment

### Track 1: Best Agent on Celo ($5,000)
- Uses Celo as the settlement layer
- Integrates Mento stablecoins (Celo's unique primitive)
- Real-world utility: remittances for emerging markets
- Matches Celo's suggested idea: "Remittance Intent Agent"

### Track 2: Agent Services on Base via x402 ($5,000)
- Expose /remit and /quote as x402-paid endpoints
- Other agents pay per request in USDC on Base
- Remittance-as-a-service for the agent economy

### Track 3: Venice — Private Agents, Trusted Actions ($11,500)
- Venice AI for all inference (zero data retention)
- Financial data is the perfect privacy use case
- GLM 4.7 with function calling
- venice_parameters.include_venice_system_prompt: false

### Track 4: Status Network ($50+)
- Deploy RemittanceSwap.sol on Status Sepolia
- Execute one gasless transaction
- Free qualifier (40 spots)

### Track 5: Open Track ($28,000)
- General submission

## Technical Requirements

### Environment Variables
```
VENICE_API_KEY=         # Venice AI inference key
PRIVATE_KEY=            # Wallet for contract deployment + swaps
CELO_NETWORK=           # "mainnet" or omit for testnet (default)
```

### Running the Agent
```bash
pnpm install
pnpm agent:dev          # Start the CLI agent
```

### Deploying Contracts
```bash
pnpm contracts:compile
# Celo Sepolia
cd apps/contracts && npx hardhat ignition deploy ignition/modules/RemittanceSwap.ts --network celo-sepolia
# Status Network Sepolia
cd apps/contracts && npx hardhat ignition deploy ignition/modules/RemittanceSwap.ts --network status-sepolia
```

## Privacy Model

```
User: "Send $50 to mom in Kenya"
         │
         ▼
   ┌─────────────────┐
   │  Venice AI       │
   │  (TEE enclave)   │  ← Processes intent
   │  Zero retention  │  ← Forgets immediately
   │  No logs         │  ← Not stored on any server
   └────────┬────────┘
            │ Structured output: {amount: 50, from: "usd", to: "kes", recipient: "0x..."}
            ▼
   ┌─────────────────┐
   │  Celo Blockchain │  ← On-chain swap (public, verifiable)
   │  Mento Protocol  │  ← Oracle FX rate (no middleman)
   └─────────────────┘
```

The financial **intent** (who's sending, where, why) stays private. The **transaction** (swap + transfer) is public and verifiable on-chain. This is the right split — privacy where it matters, transparency where it's needed.

## What Success Looks Like

A working demo where:
1. Human types "Send $50 to Kenya to 0xABC..."
2. Agent fetches real FX quote from Mento oracle
3. Agent asks for confirmation
4. Human confirms
5. Agent executes on-chain swap (USDm → KESm) and transfer
6. Human sees tx hash, explorer link, and confirmation in under 3 seconds
7. Total cost: < $0.001
8. Zero financial data logged anywhere

## Timeline

- [x] Research and track selection
- [x] Agent registration (ERC-8004 on Base)
- [x] Monorepo scaffolding (Celo Composer)
- [x] Agent core: Venice AI + function calling + tool loop
- [x] Mento SDK integration with real on-chain quotes
- [x] RemittanceSwap.sol contract
- [ ] Deploy contract to Celo Sepolia
- [ ] Deploy contract to Status Network Sepolia
- [ ] Frontend (Next.js)
- [ ] End-to-end demo with real swap execution
- [ ] Hackathon submission
