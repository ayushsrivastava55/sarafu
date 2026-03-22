import { buildFeeComparison } from "@sarafu/core/client";
import { ArrowRight } from "lucide-react";

const comparison = buildFeeComparison(200);

export function FeeComparison() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Global average</div>
        <div className="mt-3 text-3xl font-semibold text-white">${comparison.worldBankFeeUsd}</div>
        <p className="mt-2 text-sm text-slate-400">World Bank average fee at {comparison.worldBankPct}% for a $200 remittance.</p>
      </div>
      <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
        <div className="text-sm uppercase tracking-[0.24em] text-emerald-200">Sarafu</div>
        <div className="mt-3 text-3xl font-semibold text-white">{comparison.sarafuFeeEstimate}</div>
        <p className="mt-2 text-sm text-emerald-100/80">Celo settlement with Mento stablecoins and no hidden FX markup.</p>
      </div>
      <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
        <div className="flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-amber-100">
          Savings
          <ArrowRight className="h-4 w-4" />
        </div>
        <div className="mt-3 text-3xl font-semibold text-white">${comparison.savingsUsd}</div>
        <p className="mt-2 text-sm text-amber-50/80">Savings on a $200 transfer before counting the hidden FX markup traditional providers layer on top.</p>
      </div>
    </div>
  );
}
