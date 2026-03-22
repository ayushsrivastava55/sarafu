"use client";

import type { ToolTrace as ToolTraceType } from "@sarafu/core/client";

interface ToolTraceProps {
  readonly trace: ToolTraceType;
}

export function ToolTraceRow({ trace }: ToolTraceProps) {
  const argsStr = Object.entries(trace.args)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");

  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center">
        <span
          className="material-symbols-outlined text-[14px] text-on-primary-container"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          smart_toy
        </span>
      </div>
      <span className="text-[10px] font-mono text-outline-m3 uppercase tracking-tighter">
        [tool] {trace.name}({`{${argsStr}}`})
      </span>
    </div>
  );
}
