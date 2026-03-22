import { ShieldCheck } from "lucide-react";

export function PrivacyBadge({ mode = "Zero retention" }: { mode?: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-200">
      <ShieldCheck className="h-3.5 w-3.5" />
      {mode}
    </div>
  );
}
