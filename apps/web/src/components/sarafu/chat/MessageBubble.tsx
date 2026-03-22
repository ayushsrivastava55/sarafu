"use client";

interface MessageBubbleProps {
  readonly text: string;
  readonly role: "user" | "assistant";
}

export function MessageBubble({ text, role }: MessageBubbleProps) {
  if (role === "user") {
    return (
      <div className="flex flex-col items-end gap-2 max-w-[85%] ml-auto">
        <div className="bg-surface-container-high px-5 py-3 rounded-2xl rounded-tr-none text-on-surface text-sm leading-relaxed">
          {text}
        </div>
        <span className="text-[10px] text-on-surface-variant font-medium">
          Just now
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2 max-w-[90%]">
      <div className="bg-surface-container-high px-5 py-3 rounded-2xl rounded-tl-none text-on-surface text-sm leading-relaxed">
        {text}
      </div>
    </div>
  );
}
