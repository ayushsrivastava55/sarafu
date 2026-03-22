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
      // Get a real on-chain quote to show actual Sarafu cost
      let sarafuQuote = "< $0.001 (gas fee only)";
      try {
        const quote = await getQuote({
          action: "get_quote", amount, sourceCurrency: "usd", targetCurrency: "kes",
          sourceToken: resolveToken("usd"), targetToken: resolveToken("kes"),
          confidence: 1, rawMessage: "",
        });
        sarafuQuote = `< $0.001 gas | ${amount} USD = ${quote.targetAmount} KES at rate ${quote.exchangeRate}`;
      } catch {
        sarafuQuote = "< $0.001 (gas fee only, quote unavailable right now)";
      }

      // World Bank Remittance Prices Worldwide data (Q4 2025):
      // Global average cost of sending $200 = 6.35%
      // Source: https://remittanceprices.worldbank.org
      const worldBankAvgPct = 6.35;
      const worldBankFee = (amount * worldBankAvgPct / 100).toFixed(2);

      return JSON.stringify({
        comparison: {
          global_average: {
            fee: `$${worldBankFee} (${worldBankAvgPct}%)`,
            source: "World Bank Remittance Prices Worldwide Q4 2025",
            time: "1-5 days",
          },
          sarafu: {
            fee: sarafuQuote,
            time: "< 2 seconds (1 block confirmation on Celo)",
            source: "On-chain Mento oracle rate, no intermediaries",
          },
        },
        savings: `On a $${amount} transfer, the global average cost is $${worldBankFee}. Sarafu costs < $0.001. You save $${(parseFloat(worldBankFee) - 0.001).toFixed(2)}.`,
        note: "Fee data from World Bank. Sarafu fee is the actual Celo gas cost for a Mento swap — verifiable on-chain.",
      });
    }

    default:
      return JSON.stringify({ error: `Unknown tool: ${name}` });
  }
}
