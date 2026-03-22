import Script from "next/script";
import { ChatLayout } from "@/components/sarafu/chat/ChatLayout";

export default function ChatPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <Script
        src="https://cdn.tailwindcss.com?plugins=forms,container-queries"
        strategy="beforeInteractive"
      />
      <Script id="tailwind-config-chat" strategy="beforeInteractive">
        {`tailwind.config={darkMode:"class",theme:{extend:{colors:{"primary":"#ffe2ab","tertiary-fixed-dim":"#00d9fc","surface-container-high":"#2a2a2a","outline":"#9c8f78","surface-variant":"#353534","secondary-container":"#ffdb3c","surface-container-highest":"#353534","on-surface-variant":"#d4c5ab","surface-container-lowest":"#0e0e0e","surface-container-low":"#1c1b1b","on-background":"#e5e2e1","on-primary-container":"#6d5000","background":"#131313","error":"#ffb4ab","surface":"#131313","surface-bright":"#3a3939","on-surface":"#e5e2e1","outline-variant":"#504532","tertiary":"#b4efff","surface-container":"#201f1f","primary-container":"#ffbf00","on-primary":"#402d00","secondary":"#fff9ef","on-secondary":"#3a3000"},fontFamily:{"headline":["Manrope"],"body":["Inter"],"label":["Inter"]},borderRadius:{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"}}}}`}
      </Script>
      <style
        dangerouslySetInnerHTML={{
          __html: `.material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;display:inline-block;line-height:1;text-transform:none;letter-spacing:normal;word-wrap:normal;white-space:nowrap;direction:ltr}body{background-color:#131313;color:#e5e2e1;font-family:'Inter',sans-serif}.font-headline{font-family:'Manrope',sans-serif}.glass-card{background:rgba(53,53,52,0.4);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,191,0,0.1)}.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`,
        }}
      />
      <div className="h-screen w-full bg-[#131313] text-[#e5e2e1] font-body selection:bg-primary-container selection:text-on-primary-container">
        <ChatLayout />
      </div>
    </>
  );
}
