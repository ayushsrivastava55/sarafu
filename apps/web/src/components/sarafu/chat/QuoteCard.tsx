"use client";

import type { QuoteRecord } from "@sarafu/core/client";

interface QuoteCardProps {
  readonly quote: QuoteRecord;
  readonly confirmed: boolean;
  readonly onConfirm: (quoteId: string) => void;
  readonly onCancel?: () => void;
}

export function QuoteCard({ quote, confirmed, onConfirm, onCancel }: QuoteCardProps) {
  return (
    <div className="glass-card w-full rounded-2xl p-6 border-l-4 border-primary-container shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <span className="material-symbols-outlined text-6xl text-primary-container">
          currency_exchange
        </span>
      </div>
      <div className="relative z-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-xs text-on-surface-variant font-medium mb-1">
              Transfer Summary
            </p>
            <h3 className="text-2xl font-headline font-bold text-secondary-m3">
              {quote.sourceAmount} {quote.sourceCurrency} ={" "}
              <span className="text-primary-container">
                {Number(quote.targetAmount).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                {quote.targetCurrency}
              </span>
            </h3>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">
              Rate
            </p>
            <p className="text-sm font-mono text-secondary-m3">
              {quote.exchangeRate}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-outline-variant/10 mb-6">
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">
              Network Fee
            </p>
            <p className="text-sm font-medium text-tertiary-fixed-dim">
              &lt; ${quote.feeEstimate}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">
              Eta
            </p>
            <p className="text-sm font-medium text-secondary-m3">~ 2 Seconds</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            disabled={confirmed}
            onClick={() => onConfirm(quote.quoteId)}
            className="flex-1 py-3 bg-primary-container text-on-primary font-extrabold rounded-lg active:scale-[0.98] transition-all hover:shadow-[0_0_20px_rgba(255,191,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {confirmed ? "Confirmed" : "Confirm"}
          </button>
          <button
            disabled={confirmed}
            onClick={onCancel}
            className="px-6 py-3 border border-outline-variant/20 text-on-surface-variant font-bold rounded-lg hover:bg-surface-container-highest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
