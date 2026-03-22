import { ChatPanel } from "@/components/sarafu/chat-panel";

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Live demo</div>
        <h1 className="mt-3 font-[family:var(--font-display)] text-4xl font-semibold text-white">
          Quote, confirm, and send through one agent loop.
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-300">
          The chat flow below calls the same Venice-backed runtime as the CLI. Quotes stay live for five minutes and the send action requires the active quote id.
        </p>
      </div>

      <ChatPanel />
    </div>
  );
}
