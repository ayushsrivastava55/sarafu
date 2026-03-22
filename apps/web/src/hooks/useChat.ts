"use client";

import { useCallback, useRef, useState } from "react";
import type {
  ChatResponseBody,
  QuoteRecord,
  RemittanceResult,
  ToolTrace,
} from "@sarafu/core/client";

export type MessageRole = "user" | "assistant";

export interface ToolTraceItem {
  kind: "tool-trace";
  id: string;
  trace: ToolTrace;
}

export interface QuoteItem {
  kind: "quote";
  id: string;
  quote: QuoteRecord;
  confirmed: boolean;
}

export interface TxItem {
  kind: "tx";
  id: string;
  tx: RemittanceResult;
}

export interface TextItem {
  kind: "text";
  id: string;
  role: MessageRole;
  text: string;
}

export type ChatItem = TextItem | ToolTraceItem | QuoteItem | TxItem;

let nextId = 0;
function uid(): string {
  return `msg-${Date.now()}-${++nextId}`;
}

export function useChat() {
  const [items, setItems] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);
  const sessionIdRef = useRef<string | undefined>(undefined);

  const pushItems = useCallback((...newItems: ChatItem[]) => {
    setItems((prev) => [...prev, ...newItems]);
  }, []);

  const processResponse = useCallback(
    (data: ChatResponseBody) => {
      sessionIdRef.current = data.sessionId;

      const newItems: ChatItem[] = [];

      // Add tool traces
      for (const trace of data.toolTrace) {
        newItems.push({ kind: "tool-trace", id: uid(), trace });
      }

      // Add quote if present
      if (data.quote) {
        newItems.push({
          kind: "quote",
          id: uid(),
          quote: data.quote,
          confirmed: false,
        });
      }

      // Add tx result if present
      if (data.tx) {
        newItems.push({ kind: "tx", id: uid(), tx: data.tx });
      }

      // Add assistant text
      if (data.assistantText) {
        newItems.push({
          kind: "text",
          id: uid(),
          role: "assistant",
          text: data.assistantText,
        });
      }

      pushItems(...newItems);
    },
    [pushItems],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      pushItems({ kind: "text", id: uid(), role: "user", text: text.trim() });
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            message: text.trim(),
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: "Request failed" }));
          pushItems({
            kind: "text",
            id: uid(),
            role: "assistant",
            text: `Error: ${err.error || "Something went wrong."}`,
          });
          return;
        }

        const data: ChatResponseBody = await res.json();
        processResponse(data);
      } catch (err) {
        pushItems({
          kind: "text",
          id: uid(),
          role: "assistant",
          text: "Error: Failed to reach the server.",
        });
      } finally {
        setLoading(false);
      }
    },
    [loading, pushItems, processResponse],
  );

  const handleConfirm = useCallback(
    async (quoteId: string) => {
      // Mark quote as confirmed
      setItems((prev) =>
        prev.map((item) =>
          item.kind === "quote" && item.quote.quoteId === quoteId
            ? { ...item, confirmed: true }
            : item,
        ),
      );

      await sendMessage(`Yes, confirm quote ${quoteId}`);
    },
    [sendMessage],
  );

  return {
    items,
    loading,
    sendMessage,
    handleConfirm,
    sessionId: sessionIdRef.current,
  };
}
