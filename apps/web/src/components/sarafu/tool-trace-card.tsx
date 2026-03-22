import type { ToolTrace } from "@sarafu/core/client";
import { Wrench } from "lucide-react";

export function ToolTraceCard({ trace }: { trace: ToolTrace }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-white">
        <Wrench className="h-4 w-4 text-emerald-300" />
        {trace.name}
      </div>
      <pre className="mt-3 overflow-x-auto rounded-xl bg-black/30 p-3 text-xs text-slate-300">
        {JSON.stringify(trace.args, null, 2)}
      </pre>
      <pre className="mt-3 overflow-x-auto rounded-xl bg-black/30 p-3 text-xs text-emerald-100">
        {JSON.stringify(trace.result, null, 2)}
      </pre>
    </div>
  );
}
