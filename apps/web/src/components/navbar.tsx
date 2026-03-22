"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";

import { WalletConnectButton } from "@/components/connect-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Chat Demo", href: "/chat" },
  { name: "Celo Docs", href: "https://docs.celo.org", external: true },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-300/10 text-sm font-semibold text-emerald-200">
            S
          </div>
          <div>
            <div className="font-[family:var(--font-display)] text-lg font-semibold text-white">Sarafu</div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Instant remittance agent</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`text-sm transition-colors ${active ? "text-white" : "text-slate-300 hover:text-white"}`}
              >
                <span className="inline-flex items-center gap-1.5">
                  {link.name}
                  {link.external ? <ArrowUpRight className="h-3.5 w-3.5" /> : null}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <WalletConnectButton />
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-white/10 bg-slate-950 text-white">
            <div className="mt-8 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-base text-slate-200"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3">
                <WalletConnectButton />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
