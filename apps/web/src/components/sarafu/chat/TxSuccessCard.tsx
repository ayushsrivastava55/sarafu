"use client";

import type { RemittanceResult } from "@sarafu/core/client";

interface TxSuccessCardProps {
  readonly tx: RemittanceResult;
}

function truncateHash(hash: string): string {
  if (hash.length <= 12) return hash;
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

export function TxSuccessCard({ tx }: TxSuccessCardProps) {
  return (
    <div className="flex flex-col items-start gap-4 max-w-[90%]">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-tertiary-container/20 flex items-center justify-center">
          <span
            className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
        <span className="text-xs font-bold text-tertiary-fixed-dim">
          Transaction Successful
        </span>
      </div>
      <div className="bg-surface-container-low w-full rounded-2xl p-6 border border-tertiary-fixed-dim/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary-fixed-dim/5 blur-[60px] rounded-full"></div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-tertiary-fixed-dim/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-tertiary-fixed-dim text-2xl">
              published_with_changes
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-secondary-m3">Settled in 1.2s</p>
            <p className="text-[10px] text-on-surface-variant font-mono">
              {truncateHash(tx.txHash)}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10">
          <a
            className="text-xs text-tertiary-fixed-dim font-bold flex items-center gap-1 hover:underline"
            href={tx.explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on CeloScan
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
          <span className="px-2 py-0.5 rounded bg-surface-container-highest text-[10px] text-on-surface-variant font-mono uppercase">
            {tx.network}
          </span>
        </div>
      </div>
    </div>
  );
}
