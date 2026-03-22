"use client";

import { useState } from "react";
import type { QuoteRecord } from "@sarafu/core/client";
import { Clock3, Send } from "lucide-react";

import { isValidAddress } from "@/lib/app-utils";
import { Button } from "@/components/ui/button";

export function QuoteCard({
  quote,
  onConfirm,
  onReject,
}: {
  quote: QuoteRecord;
  onConfirm: (recipientAddress: string) => Promise<void>;
  onReject?: () => void;
}) {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    if (!isValidAddress(recipientAddress)) {
      setError("Enter a valid 0x recipient address.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await onConfirm(recipientAddress);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full border border-emerald-300/20 bg-slate-950/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">
          Quote ready
        </div>
        <div className="inline-flex items-center gap-2 text-xs text-emerald-50/80">
          <Clock3 className="h-3.5 w-3.5" />
          Expires {new Date(quote.expiresAt).toLocaleTimeString()}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div>
          <div className="text-sm text-emerald-50/80">Send</div>
          <div className="mt-1 text-2xl font-semibold text-white">
            {quote.sourceAmount} {quote.sourceCurrency}
          </div>
        </div>
        <div>
          <div className="text-sm text-emerald-50/80">Recipient gets</div>
          <div className="mt-1 text-2xl font-semibold text-white">
            {quote.targetAmount} {quote.targetCurrency}
          </div>
        </div>
        <div>
          <div className="text-sm text-emerald-50/80">Rate</div>
          <div className="mt-1 text-2xl font-semibold text-white">{quote.exchangeRate}</div>
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm text-emerald-50/80">Recipient wallet</label>
        <input
          value={recipientAddress}
          onChange={(event) => setRecipientAddress(event.target.value)}
          placeholder="0x..."
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/60"
        />
        {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={handleConfirm} disabled={submitting}>
          <Send className="mr-2 h-4 w-4" />
          {submitting ? "Sending..." : "Confirm send"}
        </Button>
        <Button variant="outline" onClick={onReject}>
          Reject
        </Button>
      </div>
    </div>
  );
}
