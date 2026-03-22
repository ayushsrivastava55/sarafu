export function PrivacyBadge({ mode = "Zero Data Retention" }: { mode?: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-[#504532]/10 bg-[#2a2a2a]/50 px-3 py-1">
      <svg
        className="h-3 w-3 text-[#00d9fc]"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
      </svg>
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4c5ab]">
        Venice AI — {mode}
      </span>
    </div>
  );
}
