export interface ToolDefinition {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export const SARAFU_TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "get_quote",
      description:
        "Get a real-time remittance quote. Use this before asking the user to confirm any remittance.",
      parameters: {
        type: "object",
        properties: {
          amount: { type: "number", description: "Amount to convert" },
          from_currency: { type: "string", description: "Source currency code" },
          to_currency: { type: "string", description: "Target currency code" },
        },
        required: ["amount", "from_currency", "to_currency"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "send_remittance",
      description:
        "Execute a remittance after the user has confirmed a quote. Requires the quote_id returned by get_quote.",
      parameters: {
        type: "object",
        properties: {
          quote_id: { type: "string", description: "The quote identifier returned by get_quote" },
          recipient_address: { type: "string", description: "Recipient wallet address" },
          idempotency_key: {
            type: "string",
            description: "Optional idempotency key. Use the same key when retrying the same send.",
          },
        },
        required: ["quote_id", "recipient_address"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "check_balance",
      description: "Check the agent wallet's stablecoin balances on the active Celo network.",
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
      description: "List all supported remittance currencies available through Mento stablecoins.",
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
      description: "Compare Sarafu remittance costs with traditional remittance services.",
      parameters: {
        type: "object",
        properties: {
          amount: { type: "number", description: "Amount to compare in USD" },
        },
        required: ["amount"],
      },
    },
  },
];
