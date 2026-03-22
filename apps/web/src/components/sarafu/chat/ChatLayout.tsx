"use client";

import { useEffect, useRef } from "react";
import { useChat, type ChatItem } from "@/hooks/useChat";
import { MessageBubble } from "./MessageBubble";
import { ToolTraceRow } from "./ToolTrace";
import { QuoteCard } from "./QuoteCard";
import { TxSuccessCard } from "./TxSuccessCard";
import { ChatInput } from "./ChatInput";

function renderItem(item: ChatItem, handleConfirm: (quoteId: string) => void) {
  switch (item.kind) {
    case "text":
      return <MessageBubble key={item.id} text={item.text} role={item.role} />;
    case "tool-trace":
      return (
        <div key={item.id} className="flex flex-col items-start gap-4 max-w-[90%]">
          <ToolTraceRow trace={item.trace} />
        </div>
      );
    case "quote":
      return (
        <div key={item.id} className="flex flex-col items-start gap-4 max-w-[90%]">
          <QuoteCard
            quote={item.quote}
            confirmed={item.confirmed}
            onConfirm={handleConfirm}
          />
        </div>
      );
    case "tx":
      return <TxSuccessCard key={item.id} tx={item.tx} />;
    default:
      return null;
  }
}

export function ChatLayout() {
  const { items, loading, sendMessage, handleConfirm } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [items]);

  return (
    <>
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-xl shadow-[0_40px_40px_0px_rgba(0,0,0,0.06)] h-16 border-none">
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-[#FFBF00] font-extrabold tracking-tighter text-xl font-headline">
              SARAFU AI
            </span>
            <span className="ml-4 px-2 py-0.5 rounded-full bg-surface-container-high text-[10px] font-bold tracking-widest text-tertiary-fixed-dim uppercase border border-outline-variant/20">
              Celo Sepolia
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high text-[#d4c5ab] font-medium text-sm hover:text-[#ffe2ab] transition-colors duration-300 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-sm">sensors</span>
              <span>Network</span>
            </button>
            <button className="px-4 py-1.5 bg-[#FFBF00] text-[#402d00] font-bold text-sm rounded-lg active:scale-95 transition-transform">
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-screen pt-16">
        {/* SideNavBar */}
        <aside className="hidden md:flex flex-col py-8 gap-y-6 h-[calc(100vh-64px)] w-64 fixed left-0 top-16 bg-[#1c1b1b] border-none">
          <div className="px-6 flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
                <img
                  alt="Sarafu AI Agent"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkicH3gf6Hc7lK2p8bNjv7Q8csc-eO7g4yMmG6lOkfPARGEOlvnXnUGgI8yvxd2JDAqHQPM_kjuJapMa5GQu0wf8hkqXU2Ra-IBk2O0FWYHsm1yclcE4bGIeUmc-DgBvC8ENHm6K1NHye910hx1rHAansQQj6t8zGI9zh0_z11OyNdn-6stBHwo-njzbny5MsCp6AAs6qpuLfvDGDOYWE_SpLF8UICf6fXtsntxjgW1OnKAT--6Wv9w_aQBdv5UTZ54hs8DdqH-KlX"
                />
              </div>
              <div>
                <h2 className="text-[#FFBF00] font-bold font-headline text-sm tracking-tight">
                  Sarafu Vault
                </h2>
                <p className="text-[#d4c5ab] text-[10px] opacity-70 uppercase tracking-widest">
                  Verified Secure
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 flex flex-col gap-1">
            <div className="bg-[#2a2a2a] text-[#ffe2ab] rounded-r-lg border-l-4 border-[#FFBF00] flex items-center gap-3 px-4 py-3 cursor-pointer">
              <span className="material-symbols-outlined text-xl">smart_toy</span>
              <span className="text-sm font-medium font-headline">Assistant</span>
            </div>
            <div className="text-[#d4c5ab] opacity-70 hover:bg-[#2a2a2a] hover:opacity-100 transition-all flex items-center gap-3 px-4 py-3 cursor-pointer">
              <span className="material-symbols-outlined text-xl">
                account_balance_wallet
              </span>
              <span className="text-sm font-medium font-headline">Portfolio</span>
            </div>
            <div className="text-[#d4c5ab] opacity-70 hover:bg-[#2a2a2a] hover:opacity-100 transition-all flex items-center gap-3 px-4 py-3 cursor-pointer">
              <span className="material-symbols-outlined text-xl">receipt_long</span>
              <span className="text-sm font-medium font-headline">Transactions</span>
            </div>
            <div className="text-[#d4c5ab] opacity-70 hover:bg-[#2a2a2a] hover:opacity-100 transition-all flex items-center gap-3 px-4 py-3 cursor-pointer">
              <span className="material-symbols-outlined text-xl">verified_user</span>
              <span className="text-sm font-medium font-headline">Security</span>
            </div>
          </div>
          <div className="mt-auto px-6 space-y-4">
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-3 font-bold">
                Wallet Balances
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#fff9ef]">USDm</span>
                  <span className="text-sm font-bold text-[#ffe2ab]">1,200.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#fff9ef]">KESm</span>
                  <span className="text-sm font-bold text-[#ffe2ab]">85,400.00</span>
                </div>
              </div>
            </div>
            <button className="w-full py-3 bg-surface-container-high text-[#ffe2ab] font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-surface-bright transition-colors">
              New Transfer
            </button>
          </div>
        </aside>

        {/* Main Chat Canvas */}
        <main className="flex-1 md:ml-64 flex flex-col h-full bg-[#131313] relative">
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 pb-32 max-w-4xl mx-auto w-full"
          >
            {items.map((item) => renderItem(item, handleConfirm))}

            {loading && (
              <div className="flex flex-col items-start gap-4 max-w-[90%]">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[14px] text-on-primary-container animate-pulse"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      smart_toy
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#9c8f78] uppercase tracking-tighter animate-pulse">
                    Thinking...
                  </span>
                </div>
              </div>
            )}
          </div>

          <ChatInput onSend={sendMessage} disabled={loading} />
        </main>
      </div>
    </>
  );
}
