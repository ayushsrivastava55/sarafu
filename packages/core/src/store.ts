import { randomUUID } from "crypto";
import type { QuoteRecord, RemittanceResult } from "./types.js";

const DEFAULT_QUOTE_TTL_MS = 5 * 60 * 1000;

interface ExecutionCacheEntry {
  idempotencyKey: string;
  result: RemittanceResult;
}

export class QuoteStore {
  private readonly quotes = new Map<string, QuoteRecord>();
  private readonly executions = new Map<string, ExecutionCacheEntry>();

  create(input: Omit<QuoteRecord, "quoteId" | "createdAt" | "expiresAt">, ttlMs = DEFAULT_QUOTE_TTL_MS): QuoteRecord {
    const createdAt = new Date();
    const quote: QuoteRecord = {
      ...input,
      quoteId: randomUUID(),
      createdAt: createdAt.toISOString(),
      expiresAt: new Date(createdAt.getTime() + ttlMs).toISOString(),
    };

    this.quotes.set(quote.quoteId, quote);
    return quote;
  }

  get(quoteId: string): QuoteRecord | null {
    return this.quotes.get(quoteId) || null;
  }

  getValid(quoteId: string): QuoteRecord {
    const quote = this.quotes.get(quoteId);
    if (!quote) {
      throw new Error(`Quote ${quoteId} not found.`);
    }

    if (quote.consumedAt) {
      throw new Error(`Quote ${quoteId} has already been used.`);
    }

    if (new Date(quote.expiresAt).getTime() < Date.now()) {
      throw new Error(`Quote ${quoteId} has expired.`);
    }

    return quote;
  }

  markConsumed(quoteId: string): QuoteRecord {
    const quote = this.getValid(quoteId);
    const updated = {
      ...quote,
      consumedAt: new Date().toISOString(),
    };

    this.quotes.set(quoteId, updated);
    return updated;
  }

  getExecution(idempotencyKey: string): RemittanceResult | null {
    return this.executions.get(idempotencyKey)?.result || null;
  }

  saveExecution(idempotencyKey: string, result: RemittanceResult): RemittanceResult {
    this.executions.set(idempotencyKey, { idempotencyKey, result });
    return result;
  }
}
