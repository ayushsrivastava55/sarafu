"use client";

import type { QuoteRecord } from "@sarafu/core/client";

export function QuoteCard({
  quote,
  onConfirm,
  onReject,
}: {
  quote: QuoteRecord;
  onConfirm: () => void;
  onReject: () => void;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border-l-4 border-[#FFBF00] p-6 shadow-2xl"
      style={{
        background: "rgba(53, 53, 52, 0.4)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 191, 0, 0.1)",
        borderLeft: "4px solid #FFBF00",
      }}
    >
      {/* Background icon */}
      <div className="pointer-events-none absolute right-0 top-0 p-4 opacity-10">
        <svg
          className="h-16 w-16 text-[#FFBF00]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12.89 11.1c-1.78-.59-2.64-.96-2.64-1.9 0-1.02 1.11-1.39 1.81-1.39 1.31 0 1.79.99 1.9 1.34l1.58-.67c-.15-.45-.82-1.92-2.54-2.24V5h-2v1.26c-2.48.56-2.49 2.86-2.49 2.96 0 2.27 2.25 2.91 3.35 3.31 1.58.56 2.28 1.07 2.28 2.03 0 1.13-1.05 1.61-1.98 1.61-1.82 0-2.34-1.87-2.4-2.09l-1.66.67c.63 2.19 2.28 2.78 2.9 2.96V19h2v-1.24c.4-.09 2.9-.59 2.9-3.22 0-1.39-.61-2.61-3.01-3.44zM3 21H1v-6h6v2H4.52c1.61 2.41 4.36 4 7.48 4a9 9 0 008.42-5.83l1.89.66A11.002 11.002 0 0112 23c-3.62 0-6.8-1.74-8.81-4.42L3 21zM21 3h2v6h-6V7h2.48C17.87 4.59 15.12 3 12 3a9 9 0 00-8.42 5.83l-1.89-.66A11.002 11.002 0 0112 1c3.62 0 6.8 1.74 8.81 4.42L21 3z" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-medium text-[#d4c5ab]">
              Transfer Summary
            </p>
            <h3 className="font-['Manrope'] text-2xl font-bold text-[#fff9ef]">
              {quote.sourceAmount} {quote.sourceCurrency} ={" "}
              <span className="text-[#FFBF00]">
                {quote.targetAmount} {quote.targetCurrency}
              </span>
            </h3>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-[#d4c5ab]">
              Rate
            </p>
            <p className="font-mono text-sm text-[#fff9ef]">
              {quote.exchangeRate}
            </p>
          </div>
        </div>

        {/* Details grid */}
        <div className="mb-6 grid grid-cols-2 gap-4 border-y border-[#504532]/30 py-4">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-widest text-[#d4c5ab]">
              Network Fee
            </p>
            <p className="text-sm font-medium text-[#00d9fc]">
              {quote.feeEstimate ? `$${quote.feeEstimate}` : "< $0.001"}
            </p>
          </div>
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-widest text-[#d4c5ab]">
              Expires
            </p>
            <p className="text-sm font-medium text-[#fff9ef]">
              {new Date(quote.expiresAt).toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-[#FFBF00] py-3 font-extrabold text-[#402d00] transition-all hover:shadow-[0_0_20px_rgba(255,191,0,0.3)] active:scale-[0.98]"
          >
            Confirm
          </button>
          <button
            onClick={onReject}
            className="rounded-lg border border-[#504532]/40 px-6 py-3 font-bold text-[#d4c5ab] transition-colors hover:bg-[#353534]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
