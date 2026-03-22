"use client";

import { useCallback, useState, type KeyboardEvent } from "react";

interface ChatInputProps {
  readonly onSend: (text: string) => void;
  readonly disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = useCallback(() => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  }, [value, disabled, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background/90 to-transparent">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-center">
          <input
            className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-xl py-4 pl-5 pr-14 text-sm focus:ring-1 focus:ring-primary-container/20 focus:border-primary-container/30 outline-none transition-all placeholder:text-outline-m3/50"
            placeholder="Type a command or ask a question..."
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
          <button
            className="absolute right-3 p-2 bg-primary-container text-on-primary rounded-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            onClick={handleSend}
            disabled={disabled || !value.trim()}
          >
            <span className="material-symbols-outlined">arrow_upward</span>
          </button>
        </div>
        <div className="flex justify-center mt-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/50 border border-outline-variant/5">
            <span className="material-symbols-outlined text-[12px] text-tertiary-fixed-dim">
              verified
            </span>
            <span className="text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">
              Venice AI — Zero Data Retention
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
