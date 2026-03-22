export type SarafuNetworkKey = "celo-sepolia" | "celo-mainnet" | "status-sepolia";

export interface SupportedCurrency {
  code: string;
  name: string;
  tokenSymbol: string;
}

export interface QuoteRequest {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

export interface QuoteRecord {
  quoteId: string;
  sourceAmount: string;
  sourceCurrency: string;
  sourceToken: `0x${string}`;
  targetAmount: string;
  targetCurrency: string;
  targetToken: `0x${string}`;
  exchangeRate: string;
  feeEstimate: string;
  network: SarafuNetworkKey;
  expiresAt: string;
  createdAt: string;
  consumedAt?: string;
}

export interface RemittanceRequest {
  quoteId: string;
  recipientAddress: `0x${string}`;
  idempotencyKey: string;
}

export interface RemittanceResult {
  txHash: `0x${string}`;
  explorerUrl: string;
  sourceAmount: string;
  sourceCurrency: string;
  targetAmount: string;
  targetCurrency: string;
  recipient: `0x${string}`;
  contractRecordTxHash?: `0x${string}`;
  network: SarafuNetworkKey;
}

export interface FeeComparison {
  amount: number;
  worldBankFeeUsd: string;
  worldBankPct: string;
  sarafuFeeEstimate: string;
  savingsUsd: string;
}

export interface BalanceSnapshot {
  address: `0x${string}`;
  network: SarafuNetworkKey;
  balances: Record<string, string>;
}

export interface ToolTrace {
  name: string;
  args: Record<string, unknown>;
  result: unknown;
}

export interface PendingConfirmation {
  quoteId: string;
  recipientAddress?: string;
  expiresAt: string;
}

export interface ChatRequestBody {
  sessionId?: string;
  message: string;
}

export interface ChatResponseBody {
  sessionId: string;
  assistantText: string;
  toolTrace: ToolTrace[];
  pendingConfirmation: PendingConfirmation | null;
  quote?: QuoteRecord;
  tx?: RemittanceResult;
  venice?: {
    responseId?: string;
    model?: string;
    privacyMode?: "zero-retention" | "tee-verified" | "tee-unverified";
    attestationAddress?: `0x${string}`;
    signatureValid?: boolean;
    signatureUrl?: string;
    attestation?: unknown;
  };
}

export interface QuoteApiResponse extends QuoteRecord {}

export interface RemitApiRequest extends RemittanceRequest {}

export interface QuoteApiRequest extends QuoteRequest {}

export interface ServiceMetadata {
  type: string;
  name: string;
  description: string;
  endpoints: Array<{
    path: string;
    method: string;
    paymentRequired: boolean;
    priceUsd?: string;
  }>;
}

export interface AgentRegistrationFile {
  type: string;
  name: string;
  description: string;
  image: string;
  services: Array<{
    name: string;
    endpoint: string;
    version?: string;
  }>;
  x402Support: boolean;
  active: boolean;
  registrations: Array<{
    agentId: number;
    agentRegistry: string;
  }>;
  supportedTrust: string[];
}
