# Private Agents, Trusted Actions — Venice ($11,500)

## How We Integrated Venice AI

Venice is the core inference engine for Sarafu. Every user interaction flows through Venice with privacy guarantees.

### Venice API Integration

- **Base URL**: `https://api.venice.ai/api/v1` (OpenAI SDK compatible)
- **Model**: `zai-org-glm-4.7` — Venice's flagship model for function calling (128K context, reasoning + tools)
- **Function calling**: 5 tools defined with JSON Schema, LLM decides which to call
- **`venice_parameters.include_venice_system_prompt: false`** — Full control over the agent persona, no default prompt injection

### Privacy Architecture

This is the key differentiator. When a user says "Send $50 to my mom in Kenya," they're revealing:
- Financial activity and amounts
- Family relationships
- Cross-border money flow patterns
- Geographic information

With a normal LLM, all of this is logged. With Venice:

1. **Zero data retention** — Venice does not store prompts or responses on any server
2. **TEE attestation** — Available via `VENICE_ENABLE_TEE=true`. Sarafu calls Venice's `/tee/attestation` endpoint to get a cryptographic proof that the model runs inside a Trusted Execution Environment. Response signatures are verified via `/tee/signature` with ECDSA recovery.
3. **E2EE mode** — Configurable via `venice_parameters.enable_e2ee: true` for end-to-end encryption
4. **Redacted logging** — Our conversation export strips wallet addresses and financial amounts before saving

### Privacy Split

```
Private (Venice AI)              Public (Celo blockchain)
─────────────────               ────────────────────────
"Send $50 to mom in Kenya"      USDm → KESm swap tx
User intent, amounts, identity  On-chain, verifiable
Processed and forgotten          Permanent record
```

The intent is private. The transaction is public. This is the right split.

### TEE Verification Flow

```typescript
// packages/core/src/venice-tee.ts

// 1. Session attestation (on startup)
GET /tee/attestation?model=zai-org-glm-4.7&nonce={random_32_bytes}
→ { signing_address: "0x...", intel_quote: "...", nvidia_payload: "..." }

// 2. Per-response verification (after each chat)
GET /tee/signature?model=zai-org-glm-4.7&request_id={completion_id}
→ { text: "reqHash:respHash", signature: "0x..." }

// 3. ECDSA recovery
ethers.verifyMessage(signature.text, signature.signature) === attestation.signing_address
→ true = response provably came from TEE
```

### Why We Should Win

1. Venice is not a bolt-on — it's the core inference engine. Every interaction goes through Venice.
2. Financial data is the perfect privacy use case. Not just "we don't log" — we can prove it with TEE attestation.
3. We use `zai-org-glm-4.7` with function calling — Venice's best model for agents.
4. `include_venice_system_prompt: false` shows we understand the platform, not just swapping a base URL.
5. The privacy/transparency split (private intent, public transaction) is architecturally sound.
6. Multimodal potential: Venice supports TTS (for voice-based remittance commands) — natural extension.
