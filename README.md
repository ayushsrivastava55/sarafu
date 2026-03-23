# Sarafu

**Autonomous AI remittance agent on Celo.** Send money across borders in under 2 seconds for less than $0.001 in fees. Private inference via Venice AI. 15+ currencies via Mento stablecoins.

> *Sarafu* means "currency" in Swahili. Money should move like a message — instant, cheap, and private.

**Live demo**: [sarafu-web.vercel.app](https://sarafu-web.vercel.app) | **Demo video**: [sarafu-demo.mp4](./sarafu-demo.mp4)

---

## The Problem

$700B+ moves across borders annually. Migrants lose **$45 billion/year** in fees.

| Service | Fee on $200 | Speed | Hidden FX Markup |
|---------|------------|-------|-----------------|
| Western Union | $14 (7%) | 1-3 days | 2-4% |
| Wise | $7 (3.5%) | 1-2 days | 0.5-1% |
| Bank Wire | $25-50 | 3-5 days | 3-5% |
| **Sarafu** | **$0.001** | **2 seconds** | **0% (oracle rate)** |

*Source: World Bank Remittance Prices Worldwide, Q4 2025. Global average: 6.35%.*

## How It Works

```
you > Send $50 to my friend in Kenya at 0x8ec8...

  [tool] get_quote({"amount":50,"from_currency":"USD","to_currency":"KES"})
  [result] {"sourceAmount":"50","targetAmount":"6,414.33","exchangeRate":"128.29","fee":"<$0.001"}

sarafu > 50 USD = 6,414.33 KES at rate 128.29. Fee: < $0.001.
         Confirm? I need the recipient's wallet address.

you > Yes, send it.

  [tool] send_remittance({"quote_id":"b8f4...","recipient_address":"0x8ec8..."})
  [result] {"txHash":"0x7f2a...","explorerUrl":"https://celoscan.io/tx/0x7f2a..."}

sarafu > Sent. 6,414.33 KES delivered in 1.2 seconds.
         Tx: https://celoscan.io/tx/0x7f2a...
```

Sarafu is **not a REST API wrapper**. It's an autonomous agent — a while loop where the LLM decides which tools to call, reasons about your intent, and takes real on-chain actions.

## Architecture

```
User message
     │
     ▼
┌─────────────────────────┐
│  Venice AI (GLM 4.7)    │  ← Zero data retention
│  Function calling        │  ← LLM picks tools
│  include_venice_system   │
│  _prompt: false          │
└────────┬────────────────┘
         │ tool_calls
         ▼
┌─────────────────────────┐
│  Tool Executor           │
│  • get_quote             │ ← Mento SDK (on-chain oracle)
│  • send_remittance       │ ← Mento swap + contract record
│  • check_balance         │ ← ERC-20 reads on Celo
│  • list_currencies       │
│  • explain_fees          │ ← Real quote + World Bank data
└────────┬────────────────┘
         │ results
         ▼
┌─────────────────────────┐
│  Venice AI               │  ← Sees results
│  → calls more tools      │  ← Or returns text
│  → generates response    │
└─────────────────────────┘
```

## Supported Currencies

15+ corridors via Celo Mento stablecoins at on-chain oracle FX rates:

| Currency | Code | Mento Token | Key Corridors |
|----------|------|-------------|---------------|
| US Dollar | USD | USDm | Global base |
| Kenyan Shilling | KES | KESm | US→Kenya, UK→Kenya |
| Nigerian Naira | NGN | NGNm | US→Nigeria, UK→Nigeria |
| Philippine Peso | PHP | PHPm | UAE→Philippines |
| Brazilian Real | BRL | BRLm | US→Brazil, Japan→Brazil |
| Ghanaian Cedi | GHS | GHSm | UK→Ghana |
| South African Rand | ZAR | ZARm | UK→South Africa |
| West African CFA | XOF | XOFm | France→Senegal/Ivory Coast |
| Euro | EUR | EURm | Cross-European |
| British Pound | GBP | GBPm | UK corridors |
| Colombian Peso | COP | COPm | US→Colombia |
| Japanese Yen | JPY | JPYm | Japan corridors |
| Swiss Franc | CHF | CHFm | Switzerland corridors |
| Australian Dollar | AUD | AUDm | Australia corridors |
| Canadian Dollar | CAD | CADm | Canada corridors |

## Live Deployments

### Smart Contracts

| Chain | Contract | Address |
|-------|----------|---------|
| Celo Sepolia | RemittanceSwap | [`0xA77f8507838CC8719ac5B59567D2c260c007A366`](https://sepolia.celoscan.io/address/0xA77f8507838CC8719ac5B59567D2c260c007A366) |
| Status Sepolia | RemittanceSwap | [`0xAA777e4835bbC729a0C50F1EC63dC5Dc371379E7`](https://sepoliascan.status.network/address/0xAA777e4835bbC729a0C50F1EC63dC5Dc371379E7) |

### On-Chain Proof

- **Status Sepolia gasless tx**: [`0xb49bfe...`](https://sepoliascan.status.network/tx/0xb49bfe8970e86623e59cf71d546f8a01c7680fef62a5890b9eade5b4efaf8b1d)
- **Celo Sepolia remittance tx**: [`0x5918e5...`](https://sepolia.celoscan.io/tx/0x5918e5097ad18eb51c4b93cd648b22c88761fc28b46ffa531a408f11e311f4b5)
- **Celo Sepolia recordRemittance**: [`0xa5c35b...`](https://sepolia.celoscan.io/tx/0xa5c35b1b8336ca5780304d07c245171c31694f8d7dd3743c5fc352363581c8d8)

### Web App

**[sarafu-web.vercel.app](https://sarafu-web.vercel.app)** — Landing page + AI chat interface

### Agent Identity

ERC-8004 registered on Base Mainnet: [`0x8004a6090Cd10A7288092483047B097295Fb8847`](https://basescan.org/tx/0xbfe8d0d4abc8429c1465a7ab063d0225a5d600b5fa8c2e5c881f09dc98bb229d)

## Project Structure

```
sarafu/
├── packages/core/          # Shared logic (types, currencies, networks, SDK integrations)
│   ├── agent-runtime.ts    # Agent while-loop with Venice AI + tool dispatch
│   ├── remittance-service.ts # Mento SDK quotes + swaps + contract recording
│   ├── store.ts            # QuoteStore with TTL, consumed rejection, idempotency
│   ├── venice-tee.ts       # TEE attestation verification via Venice API
│   ├── currencies.ts       # 15+ token addresses (mainnet + testnet)
│   ├── networks.ts         # Celo + Status chain configs
│   ├── contracts.ts        # RemittanceSwap ABI + deployed addresses
│   └── tool-definitions.ts # Venice AI function calling schemas
├── apps/agent/             # CLI agent (readline loop → @sarafu/core)
├── apps/contracts/         # Solidity + Hardhat + tests
│   ├── RemittanceSwap.sol  # OpenZeppelin (Ownable + SafeERC20)
│   └── test/               # 6 tests (access control, deposits, stats, events)
├── apps/web/               # Next.js frontend + API routes
│   ├── /api/chat           # POST → SarafuAgentRuntime (open)
│   ├── /api/quote          # POST → RemittanceService (x402 gated)
│   ├── /api/remit          # POST → RemittanceService (x402 gated)
│   └── /chat               # Interactive chat UI
└── docs/                   # Track integration details
```

## Setup

```bash
git clone https://github.com/ayushsrivastava55/sarafu.git
cd sarafu
pnpm install
```

Create `.env`:

```env
VENICE_API_KEY=your_venice_api_key
PRIVATE_KEY=0x_your_wallet_private_key
REMITTANCE_CONTRACT_ADDRESS_CELO_SEPOLIA=0xA77f8507838CC8719ac5B59567D2c260c007A366
VENICE_ENABLE_TEE=true
```

### Run the CLI agent

```bash
pnpm agent:dev
```

### Run the web app

```bash
pnpm web:dev
```

### Run contract tests

```bash
cd apps/contracts && npx hardhat test
```

## Safety Model

- **Quote-before-send**: Every remittance requires a prior quote with a `quoteId`
- **5-minute TTL**: Quotes expire. Stale quotes are rejected.
- **Consumed rejection**: A quote can only be used once. Replay attempts fail.
- **Idempotency**: Same `idempotencyKey` returns cached result, prevents double-sends.
- **markConsumed before swap**: Quote is consumed before execution, not after — crash-safe.
- **On-chain audit trail**: Every swap calls `recordRemittance()` on the deployed contract.

## Privacy Model

```
Intent (private)              Transaction (public)
"Send $50 to mom in Kenya"    USDm → KESm swap on Celo
      │                              │
      ▼                              ▼
Venice AI (TEE)               celoscan.io/tx/0x...
Zero data retention           Verifiable on-chain
Processed and forgotten       Permanent record
```

- All inference via Venice AI with zero data retention
- TEE attestation available (`VENICE_ENABLE_TEE=true`) for cryptographic privacy proof
- `venice_parameters.include_venice_system_prompt: false` — full control, no default prompt injection
- Conversation logs are redacted (wallet addresses and amounts stripped) before export

## Tech Stack

| Layer | Technology |
|-------|-----------|
| AI Inference | Venice AI (GLM 4.7, function calling, TEE attestation) |
| Blockchain | Celo (L2), Mento Protocol (stablecoin swaps) |
| Payments | x402 Protocol (Coinbase, USDC on Base Sepolia) |
| Identity | ERC-8004 (on-chain agent identity on Base) |
| Contracts | Solidity 0.8.20, OpenZeppelin, Hardhat |
| Frontend | Next.js 14, Tailwind CSS, Stitch design system |
| Monorepo | Turborepo, pnpm workspaces |
| Language | TypeScript (end-to-end) |

## Track Integrations

See [`docs/`](./docs/) for detailed integration writeups per track.

| Track | Prize | Integration |
|-------|-------|-------------|
| [Best Agent on Celo](./docs/celo.md) | $5,000 | Mento stablecoins, 15+ currencies, real on-chain swaps |
| [Private Agents — Venice](./docs/venice.md) | $11,500 | Zero retention, TEE attestation, GLM 4.7 function calling |
| [Agent Services — x402](./docs/x402.md) | $5,000 | Paid API endpoints, Base Sepolia USDC, real @x402/next |
| [Status Network](./docs/status.md) | $50+ | Contract deployed, gasless tx executed |
| [Open Track](./docs/open-track.md) | $28,000 | Full submission |

## Team

Built during [The Synthesis](https://synthesis.md) hackathon, March 2026.
