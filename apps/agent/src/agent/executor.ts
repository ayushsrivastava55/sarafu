import { QuoteStore, RemittanceService, createIdempotencyKey } from "@sarafu/core";

const quoteStore = new QuoteStore();
const remittance = new RemittanceService(quoteStore);

export async function executeTool(name: string, args: Record<string, any>) {
  switch (name) {
    case "get_quote":
      return JSON.stringify(
        await remittance.getQuote({
          amount: Number(args.amount),
          fromCurrency: String(args.from_currency || "USD"),
          toCurrency: String(args.to_currency || ""),
        }),
      );
    case "send_remittance":
      return JSON.stringify(
        await remittance.sendRemittance({
          quoteId: String(args.quote_id),
          recipientAddress: String(args.recipient_address) as `0x${string}`,
          idempotencyKey: String(args.idempotency_key || createIdempotencyKey("compat")),
        }),
      );
    case "check_balance":
      return JSON.stringify(await remittance.getBalances());
    case "list_currencies":
      return JSON.stringify(remittance.listCurrencies());
    case "explain_fees":
      return JSON.stringify(await remittance.explainFees(Number(args.amount || 100)));
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
