"use client";

import { type FormEvent, useState } from "react";
import type { ChatResponseBody } from "@sarafu/core/client";
import { ArrowUpRight, Loader2, MessageSquare } from "lucide-react";

import { QuoteCard } from "@/components/sarafu/quote-card";
import { ToolTraceCard } from "@/components/sarafu/tool-trace-card";
import { TxSuccessCard } from "@/components/sarafu/tx-success-card";
import { PrivacyBadge } from "@/components/sarafu/privacy-badge";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SERVICE_URL = process.env.NEXT_PUBLIC_SERVICE_URL || "";

export function ChatPanel() {
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Ask Sarafu for a live remittance quote, then confirm when you are ready to send.",
    },
  ]);
  const [lastResponse, setLastResponse] = useState<ChatResponseBody | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage(message: string) {
    setLoading(true);
    setError(null);
    setMessages((current) => [...current, { role: "user", content: message }]);

    try {
      const response = await fetch(`${SERVICE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          message,
        }),
      });

      const data = (await response.json()) as ChatResponseBody & { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Chat request failed.");
      }

      setSessionId(data.sessionId);
      setLastResponse(data);
      setMessages((current) => [...current, { role: "assistant", content: data.assistantText }]);
    } catch (err: any) {
      setError(err.message || "Chat request failed.");
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || loading) {
      return;
    }

    await sendMessage(input.trim());
  }

  async function handleConfirm(recipientAddress: string) {
    if (!lastResponse?.quote) {
      return;
    }

    await sendMessage(`Yes, send quote ${lastResponse.quote.quoteId} to ${recipientAddress}.`);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.25fr_0.85fr]">
      <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/20">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Agent console</div>
            <h1 className="mt-2 font-[family:var(--font-display)] text-3xl font-semibold text-white">Talk to Sarafu</h1>
          </div>
          <PrivacyBadge
            mode={
              lastResponse?.venice?.privacyMode === "tee-verified"
                ? "TEE verified"
                : lastResponse?.venice?.privacyMode === "tee-unverified"
                  ? "TEE unverified"
                  : "Zero retention"
            }
          />
        </div>

        <div className="mt-5 space-y-4">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`rounded-3xl px-4 py-3 text-sm leading-7 ${
                message.role === "user"
                  ? "ml-auto max-w-[85%] bg-emerald-400/15 text-emerald-50"
                  : "mr-auto max-w-[92%] bg-white/5 text-slate-100"
              }`}
            >
              {message.content}
            </div>
          ))}

          {loading ? (
            <div className="inline-flex items-center gap-2 rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-300">
              <Loader2 className="h-4 w-4 animate-spin" />
              Sarafu is checking tools and building the reply.
            </div>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder='Try "Send 50 USD to Kenya"'
            className="min-h-[52px] flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition focus:border-emerald-300/60"
          />
          <Button type="submit" disabled={loading || !input.trim()} className="min-h-[52px]">
            Send
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
      </section>

      <section className="space-y-5">
        {lastResponse?.quote && lastResponse.pendingConfirmation ? (
          <QuoteCard quote={lastResponse.quote} onConfirm={handleConfirm} onReject={() => setLastResponse(null)} />
        ) : null}

        {lastResponse?.tx ? <TxSuccessCard tx={lastResponse.tx} /> : null}

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
          <div className="flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-slate-400">
            <MessageSquare className="h-4 w-4" />
            Tool trace
          </div>
          <div className="mt-4 space-y-3">
            {lastResponse?.toolTrace?.length ? (
              lastResponse.toolTrace.map((trace, index) => <ToolTraceCard key={`${trace.name}-${index}`} trace={trace} />)
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-slate-400">
                Tool calls will appear here after Sarafu uses `get_quote`, `send_remittance`, or balance tools.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
