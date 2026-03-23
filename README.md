# Sarafu

> *Sarafu* — Swahili for "currency." Money should move like a message.

**An autonomous AI agent that sends money across borders in 2 seconds for $0.001.** Not a wrapper. Not a chatbot. A real agent that reasons, quotes, confirms, swaps on-chain, and records every remittance — all through natural language.

[![Demo](https://img.shields.io/badge/Demo-sarafu--web.vercel.app-FFBF00?style=for-the-badge)](https://sarafu-web.vercel.app)
[![Video](https://img.shields.io/badge/Video-YouTube-red?style=for-the-badge)](https://youtu.be/eXfiOlI3BFc)
[![Repo](https://img.shields.io/badge/Code-GitHub-181717?style=for-the-badge)](https://github.com/ayushsrivastava55/sarafu)

---

## TL;DR for Agent Judges

Sarafu is an **agent-loop architecture** (not REST) that:

1. Receives natural language: *"Send $50 to Kenya"*
2. Venice AI (GLM 4.7, zero retention) decides which tools to call
3. Fetches **real on-chain FX quotes** from Mento oracles (not mocked)
4. Shows the rate, asks for **explicit confirmation** (quote-before-send)
5. Executes a **Mento stablecoin swap** on Celo (USDm → KESm)
6. Calls **`recordRemittance()`** on a deployed smart contract (on-chain audit trail)
7. Returns a **CeloScan explorer link** — verifiable, permanent, done in 2 seconds

Every step is real. Every quote is on-chain. Every transaction is verifiable. Nothing is mocked.

---

## Why This Matters

**$45 billion/year** is extracted from migrants in remittance fees. The people paying 7% to send $200 home are the ones who can least afford it.

| | Western Union | Wise | Bank Wire | **Sarafu** |
|---|---|---|---|---|
| **Fee on $200** | $14 (7%) | $7 (3.5%) | $25-50 | **$0.001** |
| **Speed** | 1-3 days | 1-2 days | 3-5 days | **2 seconds** |
| **FX Markup** | 2-4% hidden | 0.5-1% | 3-5% hidden | **0% (oracle rate)** |
| **Privacy** | KYC + logged | Logged | Logged | **Zero retention** |

*Source: World Bank Remittance Prices Worldwide, Q4 2025. Global average cost: 6.35%.*

Africa alone sends **$95B/year** in remittances. **$6-11B** is extracted in fees annually from Sub-Saharan corridors alone (7-12%). The UN SDG target is 3% by 2030. Current reality is 2.5x worse. Sarafu does it for **0.0005%**.

---

## Live Demo

```
you > Send $50 to my friend in Kenya at 0x8ec8...

  [tool] get_quote({"amount":50,"from_currency":"USD","to_currency":"KES"})
  [result] {"sourceAmount":"50","targetAmount":"6,414.33","exchangeRate":"128.29","fee":"<$0.001"}

sarafu > 50 USD = 6,414.33 KES at rate 128.29. Fee: < $0.001.
         Quote valid for 5 minutes. Confirm?

you > Yes

  [tool] send_remittance({"quote_id":"b8f4...","recipient_address":"0x8ec8..."})
  [result] {"txHash":"0x7f2a...","explorerUrl":"https://celoscan.io/tx/0x7f2a..."}

sarafu > Done. 6,414.33 KES delivered in 1.2 seconds.
         Tx: https://celoscan.io/tx/0x7f2a...
```

---

## Architecture: Agent Loop, Not REST

Most hackathon "agents" are Express servers with a switch statement. Sarafu is a **canonical agent while-loop** — the LLM decides what to do.

```
                    ┌──────────────────────────────┐
                    │         User Message          │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │     Venice AI (GLM 4.7)       │
                    │                               │
                    │  • Zero data retention         │
                    │  • TEE attestation available   │
                    │  • Function calling (5 tools)  │
                    │  • include_venice_system_      │
                    │    prompt: false                │
                    └──────────────┬───────────────┘
                                   │
                          ┌────────┴────────┐
                          │   tool_calls?   │
                          └───┬─────────┬───┘
                         yes  │         │  no
                              ▼         ▼
                    ┌──────────────┐  ┌──────────────┐
                    │  Execute     │  │  Return text  │
                    │  Tool(s)     │  │  to user      │
                    └──────┬───────┘  └──────────────┘
                           │
              ┌────────────┼────────────────┐
              ▼            ▼                ▼
        ┌──────────┐ ┌──────────┐    ┌──────────────┐
        │get_quote │ │send_remit│    │check_balance │
        │          │ │tance     │    │list_currencies│
        │Mento SDK │ │Mento swap│    │explain_fees  │
        │on-chain  │ │+ contract│    │              │
        │oracle    │ │record    │    │              │
        └────┬─────┘ └────┬─────┘    └──────┬───────┘
             │             │                 │
             └─────────────┼─────────────────┘
                           │
                           ▼
                    ┌──────────────────────────────┐
                    │    Venice AI sees results     │
                    │    → may call more tools      │
                    │    → or generate response     │
                    └──────────────────────────────┘
```

**Key difference from a wrapper**: The agent can chain multiple tool calls, recover from errors, ask follow-up questions, and make autonomous decisions — all within the same turn. The LLM is in the loop, not routing logic.

---

## What We Built (Everything is Real)

### On-Chain (Verifiable)

| What | Where | Proof |
|------|-------|-------|
| RemittanceSwap contract | Celo Sepolia | [`0xA77f...`](https://sepolia.celoscan.io/address/0xA77f8507838CC8719ac5B59567D2c260c007A366) |
| RemittanceSwap contract | Status Sepolia | [`0xAA77...`](https://sepoliascan.status.network/address/0xAA777e4835bbC729a0C50F1EC63dC5Dc371379E7) |
| Live remittance swap | Celo Sepolia | [`0x5918...`](https://sepolia.celoscan.io/tx/0x5918e5097ad18eb51c4b93cd648b22c88761fc28b46ffa531a408f11e311f4b5) |
| recordRemittance call | Celo Sepolia | [`0xa5c3...`](https://sepolia.celoscan.io/tx/0xa5c35b1b8336ca5780304d07c245171c31694f8d7dd3743c5fc352363581c8d8) |
| Gasless tx (gas=0) | Status Sepolia | [`0xb49b...`](https://sepoliascan.status.network/tx/0xb49bfe8970e86623e59cf71d546f8a01c7680fef62a5890b9eade5b4efaf8b1d) |
| ERC-8004 agent identity | Base Mainnet | [`0xbfe8...`](https://basescan.org/tx/0xbfe8d0d4abc8429c1465a7ab063d0225a5d600b5fa8c2e5c881f09dc98bb229d) |

### Privacy (Enforced, Not Claimed)

| Layer | How |
|-------|-----|
| Venice AI inference | Zero data retention by default. Prompts and responses are not stored. |
| TEE attestation | `GET /tee/attestation` → signing_address. `GET /tee/signature` → ECDSA recovery. Cryptographic proof response came from secure enclave. |
| E2EE mode | `venice_parameters.enable_e2ee: true` for end-to-end encryption. |
| Conversation logs | Wallet addresses and amounts are regex-stripped before export. |
| Privacy split | Intent (who/what/where) stays private. Transaction (swap) is public and verifiable on-chain. |

### Safety (Not Trust — Verification)

| Mechanism | What It Does |
|-----------|-------------|
| Quote-before-send | `send_remittance` requires a valid `quoteId` from a prior `get_quote` |
| 5-minute TTL | Quotes expire. Stale quotes throw. |
| Consumed rejection | A quote can only be used once. Replays throw. |
| markConsumed before swap | Quote is consumed *before* execution — if the process crashes between swap and mark, the quote can't be replayed |
| Idempotency keys | Same `idempotencyKey` returns cached result. No double-sends. |
| Max 10 iterations | Agent loop throws after 10 tool calls. No infinite loops. |
| On-chain audit | Every swap → `recordRemittance()` on deployed contract |

### Agent-to-Agent Commerce (x402)

| Endpoint | Price | Gated |
|----------|-------|-------|
| `POST /api/chat` | Free | No — open for demo |
| `POST /api/quote` | $0.01 USDC | Yes — `@x402/next` + Base Sepolia facilitator |
| `POST /api/remit` | $0.01 USDC | Yes — `@x402/next` + Base Sepolia facilitator |
| `GET /api/health` | Free | No |

Any agent can discover Sarafu via `/.well-known/agent.json`, pay via x402, and get remittance services. Real `withX402()` middleware from Coinbase's official `@x402/next` package — not a mock 402 response.

---

## 15 Currencies, Real Corridors

Not just USD/EUR. These are the corridors that matter to real migrants:

```
USD ──→ KES (Kenya)           USD ──→ NGN (Nigeria)
USD ──→ PHP (Philippines)     USD ──→ BRL (Brazil)
USD ──→ GHS (Ghana)           USD ──→ ZAR (South Africa)
EUR ──→ XOF (West Africa)     USD ──→ COP (Colombia)
GBP ──→ KES (UK→Kenya)       JPY ──→ PHP (Japan→Philippines)
USD ──→ CAD (Canada)          EUR ──→ GBP (Cross-European)
CHF ──→ USD (Switzerland)     AUD ──→ USD (Australia)
```

All via **Mento Protocol** — on-chain oracle FX rates, no middleman markup, sub-cent gas on Celo.

---

## Project Structure

```
sarafu/
├── packages/core/                 # Shared logic — the brain
│   ├── agent-runtime.ts           # While-loop: Venice AI → tools → response
│   ├── remittance-service.ts      # Mento SDK: quote → swap → contract record
│   ├── store.ts                   # QuoteStore: TTL, consumed, idempotency
│   ├── venice-tee.ts              # TEE attestation: /tee/attestation + /tee/signature
│   ├── currencies.ts              # 15 tokens, mainnet + testnet addresses
│   ├── networks.ts                # Celo Sepolia, Celo Mainnet, Status Sepolia
│   ├── contracts.ts               # RemittanceSwap ABI + env-based addresses
│   ├── fees.ts                    # World Bank 6.35% + real on-chain quote
│   └── tool-definitions.ts        # 5 Venice AI function calling schemas
│
├── apps/agent/                    # CLI agent
│   └── src/index.ts               # readline → @sarafu/core runtime
│
├── apps/contracts/                # Smart contracts
│   ├── RemittanceSwap.sol         # Ownable + SafeERC20 (OpenZeppelin)
│   ├── MockERC20.sol              # For testing
│   └── test/RemittanceSwap.ts     # 6 tests: access, deposits, stats, events
│
├── apps/web/                      # Next.js frontend + API
│   ├── /api/chat                  # POST → SarafuAgentRuntime
│   ├── /api/quote                 # POST → RemittanceService (x402)
│   ├── /api/remit                 # POST → RemittanceService (x402)
│   ├── /chat                      # Interactive chat UI
│   └── public/.well-known/        # ERC-8004 + service discovery
│
└── docs/                          # Per-track integration writeups
    ├── celo.md
    ├── venice.md
    ├── x402.md
    ├── status.md
    └── open-track.md
```

---

## Tech Stack

| Layer | What | Why |
|-------|------|-----|
| **AI** | Venice AI, GLM 4.7 | 128K context, function calling, zero retention, TEE |
| **Blockchain** | Celo (L2) | 1-sec finality, sub-cent gas, stablecoin-native |
| **Stablecoins** | Mento Protocol | 15 currencies, on-chain oracle FX, no middleman |
| **Payments** | x402 (Coinbase) | HTTP-native, USDC on Base, gasless for client |
| **Identity** | ERC-8004 | On-chain agent NFT on Base Mainnet |
| **Contracts** | Solidity + OpenZeppelin | Ownable, SafeERC20, 6 passing tests |
| **Frontend** | Next.js 14 + Tailwind | Stitch Obsidian design system |
| **Monorepo** | Turborepo + pnpm | Shared `@sarafu/core` across CLI + web + API |

---

## Track Integrations

| Track | Prize Pool | What We Did | Docs |
|-------|-----------|-------------|------|
| **Best Agent on Celo** | $5,000 | Native Mento SDK v3 integration. 15 currencies. Real on-chain swaps at oracle rates. Contract deployed. MiniPay-compatible. Exactly the "Remittance Intent Agent" Celo suggested. | [docs/celo.md](./docs/celo.md) |
| **Private Agents (Venice)** | $11,500 | Venice is the core inference engine — not a bolt-on. GLM 4.7 with function calling. TEE attestation via `/tee/attestation` + ECDSA signature verification. `include_venice_system_prompt: false`. Financial data is the perfect privacy use case. | [docs/venice.md](./docs/venice.md) |
| **Agent Services (x402)** | $5,000 | Real `@x402/next` middleware from Coinbase. `/api/quote` and `/api/remit` are x402-gated. USDC on Base Sepolia. Service discoverable via `.well-known/agent.json`. Remittance-as-a-service for the agent economy. | [docs/x402.md](./docs/x402.md) |
| **Status Network** | $50+ | Contract deployed to Status Sepolia. Gasless tx executed (gas=0). Tx hash proof in README. | [docs/status.md](./docs/status.md) |
| **Open Track** | $28,000 | Full multi-track submission with real market thesis: $95B African remittances, 7-12% fees, < $0.001 on stablecoin rails. | [docs/open-track.md](./docs/open-track.md) |

---

## Setup

```bash
git clone https://github.com/ayushsrivastava55/sarafu.git && cd sarafu && pnpm install
```

```env
# .env
VENICE_API_KEY=your_venice_api_key
PRIVATE_KEY=0x_your_wallet_private_key
REMITTANCE_CONTRACT_ADDRESS_CELO_SEPOLIA=0xA77f8507838CC8719ac5B59567D2c260c007A366
VENICE_ENABLE_TEE=true
```

```bash
pnpm agent:dev    # CLI agent
pnpm web:dev      # Web app at localhost:3000
cd apps/contracts && npx hardhat test  # 6 passing tests
```

---

## What's Next

- **MiniPay integration** — Recipients tap to cash out via mobile money in Africa
- **Multi-hop routing** — USD → CELO → KES when direct pairs lack liquidity
- **Recurring remittances** — "Send $100 to mom every month"
- **Mainnet deployment** — Move from Celo Sepolia to Celo Mainnet with real money

---

*Built during [The Synthesis](https://synthesis.md) hackathon, March 2026.*
