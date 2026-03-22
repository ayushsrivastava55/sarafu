import { randomUUID } from "crypto";
import OpenAI from "openai";
import { resolveCurrencyFromCountry } from "./currencies.js";
import { QuoteStore } from "./store.js";
import { RemittanceService, createIdempotencyKey } from "./remittance-service.js";
import { SARAFU_TOOL_DEFINITIONS } from "./tool-definitions.js";
import { VeniceTeeVerifier } from "./venice-tee.js";
import type { ChatResponseBody, PendingConfirmation, QuoteRecord, RemittanceResult, ToolTrace } from "./types.js";

type Message = OpenAI.ChatCompletionMessageParam;

const MODEL = "zai-org-glm-4.7";

const SYSTEM_PROMPT = `You are Sarafu, an autonomous AI remittance agent built on Celo.

Rules:
- Always call get_quote before any remittance execution.
- Never call send_remittance until the user has explicitly confirmed the quote.
- When calling send_remittance, you must use the exact quote_id returned by get_quote.
- When the user says yes or confirms the current quote and gives a recipient address, call send_remittance immediately with the active quote_id.
- If a user names a country instead of a currency, infer the local currency.
- If the source currency is omitted, assume USD.
- Keep responses short, practical, and trustworthy.
- Mention that Sarafu only exports local logs when the user explicitly asks for it.
`;

interface RedactedLogEntry {
  role: string;
  content: string;
  timestamp: string;
}

interface AgentSession {
  id: string;
  messages: Message[];
  pendingConfirmation: PendingConfirmation | null;
  latestQuote: QuoteRecord | null;
  latestTx: RemittanceResult | null;
  venice?: ChatResponseBody["venice"];
  log: RedactedLogEntry[];
}

const sessionStore = new Map<string, AgentSession>();

function redactSensitiveContent(value: string): string {
  return value
    .replace(/\b0x[a-fA-F0-9]{40}\b/g, "[wallet]")
    .replace(/\$?\b\d+(?:[.,]\d+)?\b(?:\s?(?:usd|eur|gbp|kes|ngn|php|brl|zar|cop|xof|ghs|jpy|chf|aud|cad))?/gi, "[amount]");
}

function getOrCreateSession(sessionId?: string): AgentSession {
  const id = sessionId || randomUUID();
  const existing = sessionStore.get(id);
  if (existing) {
    return existing;
  }

  const created: AgentSession = {
    id,
    messages: [{ role: "system", content: SYSTEM_PROMPT }],
    pendingConfirmation: null,
    latestQuote: null,
    latestTx: null,
    log: [],
  };

  sessionStore.set(id, created);
  return created;
}

export class SarafuAgentRuntime {
  private readonly openai: OpenAI;
  private readonly remittance: RemittanceService;
  private readonly teeVerifier: VeniceTeeVerifier;

  constructor(options?: { apiKey?: string; quoteStore?: QuoteStore; remittance?: RemittanceService }) {
    const apiKey = options?.apiKey || process.env.VENICE_API_KEY;
    if (!apiKey) {
      throw new Error("VENICE_API_KEY is not configured.");
    }

    this.openai = new OpenAI({
      apiKey,
      baseURL: "https://api.venice.ai/api/v1",
    });

    const quoteStore = options?.quoteStore || new QuoteStore();
    this.remittance = options?.remittance || new RemittanceService(quoteStore);
    this.teeVerifier = new VeniceTeeVerifier();
  }

  private appendLog(session: AgentSession, role: string, content: string) {
    session.log.push({
      role,
      content: redactSensitiveContent(content),
      timestamp: new Date().toISOString(),
    });
  }

  async exportSessionLog(sessionId: string) {
    return getOrCreateSession(sessionId).log;
  }

  async chat(input: { sessionId?: string; message: string }): Promise<ChatResponseBody> {
    const session = getOrCreateSession(input.sessionId);
    const toolTrace: ToolTrace[] = [];

    session.messages.push({ role: "user", content: input.message });
    this.appendLog(session, "user", input.message);

    while (true) {
      const response = await this.openai.chat.completions.create({
        model: MODEL,
        messages: session.messages,
        tools: SARAFU_TOOL_DEFINITIONS as OpenAI.ChatCompletionTool[],
        tool_choice: "auto",
        parallel_tool_calls: false,
        // @ts-expect-error Venice-specific parameter
        venice_parameters: {
          include_venice_system_prompt: false,
          enable_e2ee: process.env.VENICE_ENABLE_E2EE === "true",
        },
      });

      const choice = response.choices[0]?.message;
      if (!choice) {
        throw new Error("Venice returned an empty response.");
      }

      session.venice = await this.teeVerifier.buildMetadata({
        responseId: response.id,
        model: response.model,
        assistantText: choice.content || "",
        rawAttestation: ((response as unknown as Record<string, unknown>).venice_attestation as unknown) || undefined,
      });
      session.venice.responseId = response.id;
      session.venice.model = response.model;

      if (choice.content) {
        choice.content = choice.content.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
      }

      session.messages.push(choice as Message);

      if (choice.tool_calls?.length) {
        for (const toolCall of choice.tool_calls) {
          const args = JSON.parse(toolCall.function.arguments || "{}") as Record<string, unknown>;
          const result = await this.executeTool(session, toolCall.function.name, args);

          toolTrace.push({
            name: toolCall.function.name,
            args,
            result,
          });

          this.appendLog(session, "tool_call", `${toolCall.function.name}(${JSON.stringify(args)})`);
          this.appendLog(session, "tool_result", JSON.stringify(result));

          session.messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(result),
          } as Message);
        }

        continue;
      }

      const assistantText = choice.content || "I need one more detail before I can continue.";
      this.appendLog(session, "assistant", assistantText);

      return {
        sessionId: session.id,
        assistantText,
        toolTrace,
        pendingConfirmation: session.pendingConfirmation,
        quote: session.latestQuote || undefined,
        tx: session.latestTx || undefined,
        venice: session.venice,
      };
    }
  }

  private resolveCurrency(value: string): string {
    return resolveCurrencyFromCountry(value) || value;
  }

  private async executeTool(session: AgentSession, name: string, args: Record<string, unknown>) {
    switch (name) {
      case "get_quote": {
        const quote = await this.remittance.getQuote({
          amount: Number(args.amount),
          fromCurrency: this.resolveCurrency(String(args.from_currency || "USD")),
          toCurrency: this.resolveCurrency(String(args.to_currency || "")),
        });

        session.latestQuote = quote;
        session.pendingConfirmation = {
          quoteId: quote.quoteId,
          expiresAt: quote.expiresAt,
        };

        return quote;
      }

      case "send_remittance": {
        const quoteId = String(args.quote_id || "");
        const recipientAddress = String(args.recipient_address || "") as `0x${string}`;
        const idempotencyKey = String(args.idempotency_key || createIdempotencyKey(session.id));

        if (!session.pendingConfirmation || session.pendingConfirmation.quoteId !== quoteId) {
          throw new Error("The requested quote is not the active pending quote. Ask the user to confirm the latest quote first.");
        }

        const tx = await this.remittance.sendRemittance({
          quoteId,
          recipientAddress,
          idempotencyKey,
        });

        session.pendingConfirmation = null;
        session.latestTx = tx;
        return tx;
      }

      case "check_balance":
        return this.remittance.getBalances();

      case "list_currencies":
        return {
          currencies: this.remittance.listCurrencies(),
          network: this.remittance.network,
        };

      case "explain_fees":
        return this.remittance.explainFees(Number(args.amount || 100));

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }
}
