import { getQuote, sendRemittance, getBalance, listSupportedCurrencies } from "./remittance.js";
import { CURRENCY_TO_TOKEN, TOKENS } from "./constants.js";

function resolveToken(currency: string): string | undefined {
  const key = CURRENCY_TO_TOKEN[currency.toLowerCase()];
  return key ? TOKENS[key] : undefined;
}

export async function executeTool(name: string, args: Record<string, any>): Promise<string> {
  switch (name) {
    case "get_quote": {
      const sourceToken = resolveToken(args.from_currency);
      const targetToken = resolveToken(args.to_currency);
      if (!sourceToken || !targetToken) {
        return JSON.stringify({
          error: `Unsupported currency pair: ${args.from_currency} -> ${args.to_currency}`,
          supported: listSupportedCurrencies(),
        });
      }
      const quote = await getQuote({
        action: "get_quote",
        amount: args.amount,
        sourceCurrency: args.from_currency,
        targetCurrency: args.to_currency,
        sourceToken,
        targetToken,
        confidence: 1,
        rawMessage: "",
      });
      return JSON.stringify(quote);
    }

    case "send_remittance": {
      const sourceToken = resolveToken(args.from_currency);
      const targetToken = resolveToken(args.to_currency);
      if (!sourceToken || !targetToken) {
        return JSON.stringify({ error: `Unsupported currency pair: ${args.from_currency} -> ${args.to_currency}` });
      }
      if (!args.recipient_address?.startsWith("0x")) {
        return JSON.stringify({ error: "Invalid recipient address. Must be a 0x... wallet address." });
      }
      const result = await sendRemittance({
        action: "send_remittance",
        amount: args.amount,
        sourceCurrency: args.from_currency,
        targetCurrency: args.to_currency,
        sourceToken,
        targetToken,
        recipientAddress: args.recipient_address,
        confidence: 1,
        rawMessage: "",
      });
      return JSON.stringify(result);
    }

    case "check_balance": {
      const balances = await getBalance();
      return JSON.stringify({ balances });
    }

    case "list_currencies": {
      const currencies = listSupportedCurrencies();
      return JSON.stringify({
        currencies,
        note: "All currencies are Mento stablecoins on Celo. Swaps settle in <2 seconds with <$0.001 fees.",
      });
    }

    case "explain_fees": {
      const amount = args.amount || 100;
      return JSON.stringify({
        comparison: {
          western_union: { fee: `$${(amount * 0.07).toFixed(2)}`, time: "1-3 days", hidden_fx_markup: "2-4%" },
          wise: { fee: `$${(amount * 0.035).toFixed(2)}`, time: "1-2 days", hidden_fx_markup: "0.5-1%" },
          bank_wire: { fee: "$25-50", time: "3-5 days", hidden_fx_markup: "3-5%" },
          sarafu: { fee: "<$0.001", time: "<2 seconds", hidden_fx_markup: "0% (on-chain Mento oracle rate)" },
        },
        savings: `On a $${amount} transfer, Sarafu saves $${(amount * 0.05).toFixed(2)}-$${(amount * 0.07).toFixed(2)} compared to traditional services.`,
        how: "Sarafu uses Celo Mento protocol — stablecoins swap on-chain at oracle FX rates with no intermediaries.",
      });
    }

    default:
      return JSON.stringify({ error: `Unknown tool: ${name}` });
  }
}
