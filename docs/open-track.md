# Synthesis Open Track ($28,000)

## Why Sarafu Deserves the Open Track

### The Thesis

Cross-border remittances are a $700B/year market where the poorest people pay the highest fees. The global average cost of sending $200 is 6.35% — that's $45 billion extracted annually from migrants and their families.

AI agents + stablecoins can eliminate this entirely. Sarafu proves it.

### What We Built

An autonomous AI agent that:

1. **Understands natural language** — "Send $50 to my friend in Kenya" → structured intent
2. **Fetches real FX quotes** — On-chain Mento oracle rates, not cached or mocked
3. **Gets user confirmation** — Shows rate, fee, and amount before executing
4. **Executes on-chain swaps** — USDm → KESm via Mento Protocol in < 2 seconds
5. **Records on-chain audit trail** — `recordRemittance()` on deployed smart contract
6. **Keeps financial data private** — Venice AI with zero data retention
7. **Exposes as a paid service** — x402 endpoints for agent-to-agent commerce

### What Makes This Different

| Aspect | Most Hackathon Projects | Sarafu |
|--------|------------------------|--------|
| Agent architecture | REST API wrapper | While-loop with tool dispatch |
| LLM routing | Switch statement | LLM decides which tools to call |
| Quotes | Mocked / hardcoded | Real Mento SDK on-chain oracle |
| Fees | Made-up comparisons | World Bank data + live quote |
| Privacy | "We don't log" claim | Venice TEE attestation (cryptographic proof) |
| Safety | Send on first message | Quote → confirm → idempotent send |
| On-chain | Token transfer | Contract-recorded audit trail |
| Multi-track | Bolt-on integrations | Native: Celo + Venice + x402 + Status + ERC-8004 |

### Market Opportunity

- **$95B/year** in African remittances alone
- **7-12% fees** in Sub-Saharan corridors ($6-11B extracted annually)
- **MiniPay**: 8M+ mobile wallet users on Celo in Africa — ready-made distribution
- **UN SDG target**: 3% by 2030. Current reality: 6.35%. Sarafu: 0.0005%.

### Technical Depth

- **`packages/core`**: 12 modules, shared across CLI + web + API
- **5 Venice AI tools**: get_quote, send_remittance, check_balance, list_currencies, explain_fees
- **QuoteStore**: TTL (5 min), consumed rejection, idempotency cache, periodic eviction
- **RemittanceSwap.sol**: OpenZeppelin hardened, 6 passing tests
- **Deployed on 3 chains**: Celo Sepolia, Status Sepolia, Base Mainnet (ERC-8004)
- **Stitch Obsidian design system**: Custom dark theme, glassmorphism, gold accents

### The Vision

Sarafu is infrastructure for the agent economy's payment layer. Today it's a remittance agent. Tomorrow:

- **MiniPay integration** — Recipients tap to cash out via mobile money
- **Multi-hop routing** — USD → CELO → KES when direct pairs aren't liquid
- **Recurring remittances** — "Send $100 to mom every month"
- **Agent-to-agent** — Other agents pay Sarafu via x402 to move money for their users

Money should move like a message. Sarafu makes it happen.
