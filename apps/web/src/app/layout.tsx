import type { Metadata } from "next";
import "./globals.css";

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
      <body style={{ backgroundColor: "#131313", color: "#e5e2e1" }}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
