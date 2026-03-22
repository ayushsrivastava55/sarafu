import type { RemittanceResult } from "@sarafu/core/client";
import { ExternalLink, Sparkles } from "lucide-react";

import { truncateAddress } from "@/lib/app-utils";

export function TxSuccessCard({ tx }: { tx: RemittanceResult }) {
  return (
    <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
      <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-amber-100">
        <Sparkles className="h-4 w-4" />
        Remittance sent
      </div>
      <div className="mt-4 text-2xl font-semibold text-white">
        {tx.targetAmount} {tx.targetCurrency} delivered
      </div>
      <p className="mt-2 text-sm text-amber-50/80">
        From {tx.sourceAmount} {tx.sourceCurrency} to {truncateAddress(tx.recipient)} on {tx.network}.
      </p>
      <a
        href={tx.explorerUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-sm text-white underline-offset-4 hover:underline"
      >
        View transaction
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}
