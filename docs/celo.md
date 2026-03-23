# Best Agent on Celo ($5,000)

## How We Integrated Celo

Sarafu is built natively on Celo. Every remittance flows through Celo's infrastructure:

### Mento Protocol Integration

- **@mento-protocol/mento-sdk v3.1.0** — Full integration with route discovery, quoting, and swap execution
- **`mento.routes.findRoute()`** — Discovers optimal trading paths between any two Mento stablecoins
- **`mento.quotes.getAmountOut()`** — Fetches real-time exchange rates from on-chain oracles
- **`mento.swap.buildSwapTransaction()`** — Builds approval + swap transactions with slippage tolerance and deadline
- **15 currencies supported**: USDm, EURm, GBPm, BRLm, KESm, NGNm, PHPm, ZARm, COPm, XOFm, GHSm, JPYm, CHFm, AUDm, CADm

### Smart Contract on Celo

- **RemittanceSwap.sol** deployed on Celo Sepolia at [`0xA77f8507838CC8719ac5B59567D2c260c007A366`](https://sepolia.celoscan.io/address/0xA77f8507838CC8719ac5B59567D2c260c007A366)
- Hardened with OpenZeppelin `Ownable` + `SafeERC20`
- `recordRemittance()` called after every successful swap — on-chain audit trail
- `getStats()` returns total count and volume

### Real-World Utility

Celo's team specifically suggested "Remittance Intent Agent" as a hackathon idea. Sarafu is exactly that:

- **Target users**: Migrant workers sending money to Kenya, Nigeria, Philippines, Brazil, Ghana
- **MiniPay compatibility**: Celo's MiniPay wallet (8M+ users in Africa) can receive the stablecoins Sarafu sends
- **Sub-cent fees**: Celo gas costs < $0.001 per transaction
- **1-second finality**: Money arrives in one block

### On-Chain Proof

- Live remittance tx: [`0x5918e5...`](https://sepolia.celoscan.io/tx/0x5918e5097ad18eb51c4b93cd648b22c88761fc28b46ffa531a408f11e311f4b5)
- recordRemittance tx: [`0xa5c35b...`](https://sepolia.celoscan.io/tx/0xa5c35b1b8336ca5780304d07c245171c31694f8d7dd3743c5fc352363581c8d8)

### Why We Should Win

1. We built exactly what Celo suggested — a remittance intent agent
2. Deep Mento SDK integration (route discovery + quoting + swaps), not just basic token transfers
3. 15 currencies covering the corridors that matter to real migrants
4. On-chain audit trail via smart contract, not just direct swaps
5. MiniPay-friendly — recipients in Africa can use Celo's existing wallet infrastructure
6. Real market need: $95B/year in African remittances, 7-12% fees, we do it for < $0.001
