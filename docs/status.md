# Go Gasless — Status Network ($50+)

## How We Integrated Status Network

Sarafu deployed its RemittanceSwap contract to Status Network Sepolia and executed a gasless transaction to qualify for the track.

### Deployment

- **Chain**: Status Network Sepolia (Chain ID: `1660990954`)
- **RPC**: `https://public.sepolia.rpc.status.network`
- **Contract**: [`0xAA777e4835bbC729a0C50F1EC63dC5Dc371379E7`](https://sepoliascan.status.network/address/0xAA777e4835bbC729a0C50F1EC63dC5Dc371379E7)
- **Gasless tx**: [`0xb49bfe...`](https://sepoliascan.status.network/tx/0xb49bfe8970e86623e59cf71d546f8a01c7680fef62a5890b9eade5b4efaf8b1d)

### Hardhat Configuration

```typescript
"status-sepolia": {
  url: "https://public.sepolia.rpc.status.network",
  accounts: [process.env.PRIVATE_KEY],
  chainId: 1660990954,
}
```

### Gasless Transaction Helper

`apps/contracts/scripts/prepare-status-gasless.ts` generates the calldata payload for submitting a `recordRemittance` call through Status Network's gasless transaction flow.

### AI Agent Component

The agent interacts with the Status Sepolia contract via the same `RemittanceService` that handles Celo — the network config supports both chains with automatic explorer URL resolution.

### Requirements Met

- [x] Smart contract deployed on Status Network Sepolia
- [x] At least one gasless transaction (gas = 0) with tx hash proof
- [x] AI agent that performs on-chain actions
- [x] README with documentation
