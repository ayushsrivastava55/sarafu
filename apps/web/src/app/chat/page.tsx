import { ChatLayout } from "@/components/sarafu/chat/ChatLayout";

export default function ChatPage() {
  return (
    <div className="h-screen w-full bg-[#131313] text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      <ChatLayout />
    </div>
  );
}
