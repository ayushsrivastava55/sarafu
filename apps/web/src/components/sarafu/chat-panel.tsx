"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import type { ChatResponseBody, ToolTrace as ToolTraceType } from "@sarafu/core/client";

import { QuoteCard } from "@/components/sarafu/quote-card";
import { ToolTraceCard } from "@/components/sarafu/tool-trace-card";
import { TxSuccessCard } from "@/components/sarafu/tx-success-card";
import { PrivacyBadge } from "@/components/sarafu/privacy-badge";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type MessageItem =
  | { kind: "user"; text: string }
  | { kind: "assistant"; text: string }
  | { kind: "tool-trace"; traces: ToolTraceType[] }
  | { kind: "quote"; response: ChatResponseBody }
  | { kind: "tx-success"; response: ChatResponseBody };

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SERVICE_URL = process.env.NEXT_PUBLIC_SERVICE_URL || "";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ChatPanel() {
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<MessageItem[]>([
    {
      kind: "assistant",
      text: "Welcome to Sarafu. Ask me for a live remittance quote — I can swap stablecoins on Celo instantly with near-zero fees.",
    },
  ]);
  const [lastResponse, setLastResponse] = useState<ChatResponseBody | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new items
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [items, loading]);

  /* ---- API call -------------------------------------------------- */

  async function sendMessage(message: string) {
    setLoading(true);
    setError(null);
    setItems((prev) => [...prev, { kind: "user", text: message }]);

    try {
      const response = await fetch(`${SERVICE_URL}/api/chat`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, message }),
      });

      const data = (await response.json()) as ChatResponseBody & {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(data.error || "Chat request failed.");
      }

      setSessionId(data.sessionId);
      setLastResponse(data);

      // Build the list of new items for this response
      const newItems: MessageItem[] = [];

      // Tool traces
      if (data.toolTrace?.length) {
        newItems.push({ kind: "tool-trace", traces: data.toolTrace });
      }

      // Quote card
      if (data.quote && data.pendingConfirmation) {
        newItems.push({ kind: "quote", response: data });
      }

      // Tx success card
      if (data.tx) {
        newItems.push({ kind: "tx-success", response: data });
      }

      // Assistant text
      if (data.assistantText) {
        newItems.push({ kind: "assistant", text: data.assistantText });
      }

      setItems((prev) => [...prev, ...newItems]);
    } catch (err: any) {
      setError(err.message || "Chat request failed.");
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  /* ---- Handlers -------------------------------------------------- */

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || loading) return;
    await sendMessage(input.trim());
  }

  function handleConfirmQuote(quoteId: string) {
    sendMessage(`Yes, confirm quote ${quoteId}.`);
  }

  function handleRejectQuote() {
    setLastResponse(null);
    setItems((prev) => [...prev, { kind: "user", text: "Cancel" }]);
  }

  /* ---- Privacy mode label ---------------------------------------- */

  function privacyLabel(): string {
    if (!lastResponse?.venice?.privacyMode) return "Zero Data Retention";
    if (lastResponse.venice.privacyMode === "tee-verified") return "TEE Verified";
    if (lastResponse.venice.privacyMode === "tee-unverified") return "TEE Unverified";
    return "Zero Data Retention";
  }

  /* ---- Render ---------------------------------------------------- */

  return (
    <div className="flex h-full w-full">
      {/* ============================================================ */}
      {/*  SIDEBAR                                                      */}
      {/* ============================================================ */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[#504532]/10 bg-[#1c1b1b] md:flex">
        {/* Avatar / vault header */}
        <div className="flex items-center gap-3 px-6 pt-8 pb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2a]">
            <svg className="h-5 w-5 text-[#FFBF00]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z" />
            </svg>
          </div>
          <div>
            <h2 className="font-['Manrope'] text-sm font-bold text-[#FFBF00]">Sarafu Vault</h2>
            <p className="text-[10px] uppercase tracking-widest text-[#d4c5ab] opacity-70">
              Verified Secure
            </p>
          </div>
        </div>

        {/* Nav items */}
        <nav className="mt-4 flex flex-col gap-1 px-4">
          <div className="flex items-center gap-3 rounded-r-lg border-l-4 border-[#FFBF00] bg-[#2a2a2a] px-4 py-3 text-sm font-medium text-[#ffe2ab]">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z" />
            </svg>
            Assistant
          </div>
          {[
            { label: "Portfolio", icon: "M21 18v1c0 1.1-.9 2-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14c1.1 0 2 .9 2 2v1h-9a2 2 0 00-2 2v8a2 2 0 002 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" },
            { label: "Transactions", icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" },
            { label: "Security", icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm font-medium text-[#d4c5ab] opacity-70 transition-all hover:bg-[#2a2a2a] hover:opacity-100"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d={item.icon} />
              </svg>
              {item.label}
            </div>
          ))}
        </nav>

        {/* Wallet balances */}
        <div className="mt-auto space-y-4 px-6 pb-8">
          <div className="rounded-xl border border-[#504532]/10 bg-[#0e0e0e] p-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#d4c5ab]">
              Wallet Balances
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#fff9ef]">USDm</span>
                <span className="text-sm font-bold text-[#ffe2ab]">1,200.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#fff9ef]">KESm</span>
                <span className="text-sm font-bold text-[#ffe2ab]">85,400.00</span>
              </div>
            </div>
          </div>
          <button className="w-full rounded-lg bg-[#2a2a2a] py-3 text-xs font-bold uppercase tracking-widest text-[#ffe2ab] transition-colors hover:bg-[#3a3939]">
            New Transfer
          </button>
        </div>
      </aside>

      {/* ============================================================ */}
      {/*  MAIN CHAT AREA                                               */}
      {/* ============================================================ */}
      <main className="relative flex flex-1 flex-col bg-[#131313]">
        {/* Scrollable messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 pb-40"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="mx-auto max-w-4xl space-y-8">
            {items.map((item, index) => {
              switch (item.kind) {
                /* ---- User message -------------------------------- */
                case "user":
                  return (
                    <div
                      key={`user-${index}`}
                      className="ml-auto flex max-w-[85%] flex-col items-end gap-2"
                    >
                      <div className="rounded-2xl rounded-tr-none bg-[#2a2a2a] px-5 py-3 text-sm leading-relaxed text-[#e5e2e1]">
                        {item.text}
                      </div>
                      <span className="text-[10px] font-medium text-[#d4c5ab]">
                        Just now
                      </span>
                    </div>
                  );

                /* ---- Assistant message --------------------------- */
                case "assistant":
                  return (
                    <div
                      key={`asst-${index}`}
                      className="mr-auto flex max-w-[90%] flex-col items-start gap-2"
                    >
                      <div className="rounded-2xl rounded-tl-none bg-[#1c1b1b] px-5 py-3 text-sm leading-relaxed text-[#e5e2e1]">
                        {item.text}
                      </div>
                    </div>
                  );

                /* ---- Tool traces --------------------------------- */
                case "tool-trace":
                  return (
                    <div key={`trace-${index}`} className="flex max-w-[90%] flex-col gap-2">
                      {item.traces.map((trace, ti) => (
                        <ToolTraceCard key={`${trace.name}-${ti}`} trace={trace} />
                      ))}
                    </div>
                  );

                /* ---- Quote card ---------------------------------- */
                case "quote":
                  return (
                    <div key={`quote-${index}`} className="flex max-w-[90%] flex-col items-start gap-4">
                      <QuoteCard
                        quote={item.response.quote!}
                        onConfirm={() =>
                          handleConfirmQuote(item.response.quote!.quoteId)
                        }
                        onReject={handleRejectQuote}
                      />
                    </div>
                  );

                /* ---- Tx success card ----------------------------- */
                case "tx-success":
                  return (
                    <div key={`tx-${index}`} className="flex max-w-[90%] flex-col items-start gap-4">
                      <TxSuccessCard tx={item.response.tx!} />
                    </div>
                  );

                default:
                  return null;
              }
            })}

            {/* Loading indicator */}
            {loading && (
              <div className="mr-auto flex max-w-[90%] items-center gap-3 rounded-2xl bg-[#1c1b1b] px-5 py-3 text-sm text-[#d4c5ab]">
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Sarafu is thinking...
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mr-auto max-w-[90%] rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm text-[#ffb4ab]">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* ---- Input bar ------------------------------------------ */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#131313] via-[#131313]/90 to-transparent p-6">
          <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
            <div className="relative flex items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a command or ask a question..."
                className="w-full rounded-xl border border-[#504532]/20 bg-[#0e0e0e] py-4 pl-5 pr-14 text-sm text-[#e5e2e1] outline-none transition-all placeholder:text-[#9c8f78]/50 focus:border-[#FFBF00]/30 focus:ring-1 focus:ring-[#FFBF00]/20"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-3 rounded-lg bg-[#FFBF00] p-2 text-[#402d00] transition-all hover:brightness-110 active:scale-95 disabled:opacity-40"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
                </svg>
              </button>
            </div>

            {/* Venice privacy badge */}
            <div className="mt-3 flex justify-center">
              <PrivacyBadge mode={privacyLabel()} />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
