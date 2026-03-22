"use client";

import Link from "next/link";
import { navLinks } from "@/data/mockData";

interface NavbarProps {
  readonly className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  return (
    <nav className={`fixed top-0 w-full z-50 bg-[#131313]/60 backdrop-blur-xl shadow-[0_40px_40px_0px_rgba(0,0,0,0.06)] ${className ?? ""}`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
        <div className="text-2xl font-black tracking-tighter text-[#fff9ef] font-headline">Sarafu</div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.active ? (
              <a
                key={link.label}
                className="text-[#FFBF00] font-bold border-b-2 border-[#FFBF00] pb-1 font-headline tracking-tight"
                href={link.href}
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                className="text-[#d4c5ab] hover:text-[#fff9ef] transition-colors font-headline tracking-tight"
                href={link.href}
              >
                {link.label}
              </a>
            )
          )}
        </div>
        <Link
          href="/chat"
          className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-bold active:scale-95 duration-200 transition-all gold-gradient"
        >
          Try Sarafu
        </Link>
      </div>
    </nav>
  );
}
