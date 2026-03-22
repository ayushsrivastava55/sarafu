import type { RemittanceResult } from "@sarafu/core/client";
import { truncateAddress } from "@/lib/app-utils";

export function TxSuccessCard({ tx }: { tx: RemittanceResult }) {
  return (
    <div className="flex flex-col items-start gap-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00d9fc]/20">
          <svg
            className="h-3.5 w-3.5 text-[#00d9fc]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <span className="text-xs font-bold text-[#00d9fc]">
          Transaction Successful
        </span>
      </div>

      {/* Card body */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-[#00d9fc]/10 bg-[#1c1b1b] p-6">
        {/* Glow */}
        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-[#00d9fc]/5 blur-[60px]" />

        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00d9fc]/10">
            <svg
              className="h-6 w-6 text-[#00d9fc]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.94s4.18 1.36 4.18 3.87c0 1.87-1.38 2.92-3.12 3.17z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-[#fff9ef]">
              {tx.targetAmount} {tx.targetCurrency} delivered
            </p>
            <p className="font-mono text-[10px] text-[#d4c5ab]">
              {truncateAddress(tx.txHash)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#504532]/20 pt-4">
          <a
            href={tx.explorerUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs font-bold text-[#00d9fc] hover:underline"
          >
            View on CeloScan
            <svg
              className="h-3 w-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
            </svg>
          </a>
          <span className="rounded bg-[#353534] px-2 py-0.5 font-mono text-[10px] uppercase text-[#d4c5ab]">
            {tx.network}
          </span>
        </div>
      </div>
    </div>
  );
}
