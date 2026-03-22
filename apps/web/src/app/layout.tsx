import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/navbar";
import { WalletProvider } from "@/components/wallet-provider";

export const metadata: Metadata = {
  title: "Sarafu",
  description: "Autonomous AI remittances on Celo with Venice privacy and Mento stablecoins.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <WalletProvider>
          <div className="relative min-h-screen overflow-x-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(55,220,153,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,179,71,0.16),transparent_28%)]" />
            <Navbar />
            <main className="relative z-10">{children}</main>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
