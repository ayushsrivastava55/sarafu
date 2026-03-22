import type OpenAI from "openai";

export const TOOLS: OpenAI.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "get_quote",
      description: "Get the current exchange rate and expected output for a currency swap via Celo Mento. Use this before sending any remittance to show the user what they'll get.",
      parameters: {
        type: "object",
        properties: {
          amount: { type: "number", description: "Amount to convert" },
          from_currency: { type: "string", description: "Source currency code (e.g. usd, eur, gbp)" },
          to_currency: { type: "string", description: "Target currency code (e.g. kes, ngn, php, brl)" },
        },
        required: ["amount", "from_currency", "to_currency"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "send_remittance",
      description: "Execute a cross-border remittance — swap stablecoins on Celo and send to recipient. ALWAYS get_quote first and ask for user confirmation before calling this.",
      parameters: {
        type: "object",
        properties: {
          amount: { type: "number", description: "Amount to send in source currency" },
          from_currency: { type: "string", description: "Source currency code" },
          to_currency: { type: "string", description: "Target currency code" },
          recipient_address: { type: "string", description: "Recipient wallet address (0x...)" },
        },
        required: ["amount", "from_currency", "to_currency", "recipient_address"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "check_balance",
      description: "Check the agent wallet's stablecoin balances on Celo. Shows how much of each currency is available to send.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "list_currencies",
      description: "List all supported currencies that can be sent or received via Celo Mento stablecoins.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "explain_fees",
      description: "Explain the fee structure — how Sarafu compares to traditional remittance services like Western Union, Wise, or banks.",
      parameters: {
        type: "object",
        properties: {
          amount: { type: "number", description: "Amount to compare fees for (in USD)" },
        },
        required: ["amount"],
      },
    },
  },
];
