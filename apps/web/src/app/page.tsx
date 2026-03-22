import Link from "next/link";
import { ArrowRight, Coins, Globe2, Shield, Timer } from "lucide-react";

import { CurrencyGrid } from "@/components/sarafu/currency-grid";
import { FeeComparison } from "@/components/sarafu/fee-comparison";
import { PrivacyBadge } from "@/components/sarafu/privacy-badge";
import { Button } from "@/components/ui/button";

const corridors = [
  "USD -> KES for Kenya",
  "USD -> NGN for Nigeria",
  "USD -> PHP for the Philippines",
  "EUR -> XOF across West Africa",
];

const tracks = [
  "Best Agent on Celo",
  "Private Agents, Trusted Actions",
  "Agent Services on Base via x402",
  "Status Network gasless qualifier",
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-10 rounded-[2rem] border border-white/10 bg-slate-950/70 px-6 py-12 shadow-2xl shadow-black/20 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        <div>
          <PrivacyBadge />
          <h1 className="mt-6 max-w-3xl font-[family:var(--font-display)] text-5xl font-semibold leading-[1.02] text-white sm:text-6xl">
            Cross-border remittances should feel like sending a message.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Sarafu is an autonomous AI agent that quotes, confirms, and settles remittances on Celo using Mento stablecoins, with Venice handling private intent processing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/chat">
                Try the chat demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://synthesis.md/" target="_blank" rel="noreferrer">
                Hackathon context
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <Timer className="h-6 w-6 text-emerald-300" />
            <div className="mt-4 text-3xl font-semibold text-white">&lt; 2 sec</div>
            <p className="mt-2 text-sm text-slate-400">One-block settlement on Celo for demo-ready remittance flows.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <Coins className="h-6 w-6 text-amber-300" />
            <div className="mt-4 text-3xl font-semibold text-white">&lt; $0.001</div>
            <p className="mt-2 text-sm text-slate-400">Sub-cent network fees, without the hidden FX spread legacy providers add.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <Globe2 className="h-6 w-6 text-sky-300" />
            <div className="mt-4 text-3xl font-semibold text-white">15+ rails</div>
            <p className="mt-2 text-sm text-slate-400">Local stablecoins for corridors that matter to migrants and families.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <Shield className="h-6 w-6 text-emerald-300" />
            <div className="mt-4 text-3xl font-semibold text-white">Private intent</div>
            <p className="mt-2 text-sm text-slate-400">Venice handles user intent with zero-retention positioning and no automatic local transcript saves.</p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
          <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Supported corridors</div>
          <ul className="mt-5 space-y-3">
            {corridors.map((corridor) => (
              <li key={corridor} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                {corridor}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
          <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Fee comparison</div>
          <div className="mt-5">
            <FeeComparison />
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Currency coverage</div>
            <h2 className="mt-2 font-[family:var(--font-display)] text-3xl font-semibold text-white">Mento local stablecoins</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Sarafu focuses on real remittance corridors rather than generic dollar transfers. The supported currency registry below is shared by the CLI, API routes, and frontend.
          </p>
        </div>
        <div className="mt-6">
          <CurrencyGrid />
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
          <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Privacy model</div>
          <h2 className="mt-3 font-[family:var(--font-display)] text-3xl font-semibold text-white">Private where it matters, verifiable where it counts.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            User intent is handled by Venice through an OpenAI-compatible tool-calling flow. Transaction settlement and audit traces happen onchain. Local conversation export is manual and redacted.
          </p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
          <div className="text-sm uppercase tracking-[0.24em] text-slate-400">Track alignment</div>
          <ul className="mt-5 space-y-3">
            {tracks.map((track) => (
              <li key={track} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                {track}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
