import { ChatPanel } from "@/components/sarafu/chat-panel";

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden">
      <ChatPanel />
    </div>
  );
}
