import Link from "next/link";
import { heroContent, liveMetrics } from "@/data/mockData";

interface HeroSectionProps {
  readonly className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={`max-w-7xl mx-auto px-6 mb-32 relative ${className ?? ""}`}>
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-tertiary-container/5 blur-[100px] rounded-full"></div>
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-6xl md:text-7xl font-extrabold font-headline leading-[1.1] mb-6 tracking-tight text-secondary">
            {heroContent.headlineWhite}<span className="text-primary-container">{heroContent.headlineGold}</span>
          </h1>
          <p className="text-xl text-on-surface-variant mb-10 leading-relaxed max-w-lg">
            {heroContent.subtext}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/chat"
              className="gold-gradient text-on-primary-container px-8 py-4 rounded-xl font-bold text-lg active:scale-95 transition-transform"
            >
              {heroContent.ctaPrimary}
            </Link>
            <button className="bg-surface-container-high px-8 py-4 rounded-xl font-semibold border border-outline-variant/20 hover:bg-surface-bright transition-colors">
              {heroContent.ctaSecondary}
            </button>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="glass-panel p-8 rounded-full border border-outline-variant/10 glow-subtle relative overflow-hidden">
            <div className="flex items-center justify-between mb-12">
              <span className="text-sm font-bold tracking-widest text-primary-container uppercase">Live Metrics</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></div>
                <span className="text-xs text-on-surface-variant">Venice AI Processing</span>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-on-surface-variant text-sm mb-1 uppercase tracking-tighter">Sarafu Fee</p>
                  <p className="text-4xl font-black font-headline text-secondary">{liveMetrics.sarafuFee}</p>
                </div>
                <div className="text-right">
                  <p className="text-on-surface-variant text-sm mb-1 uppercase tracking-tighter">TradFi Fee</p>
                  <p className="text-2xl font-bold font-headline text-error line-through decoration-2 opacity-60">{liveMetrics.tradFiFee}</p>
                </div>
              </div>
              <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary-container w-[1%]"></div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-on-surface-variant text-sm mb-1 uppercase tracking-tighter">Settlement</p>
                  <p className="text-4xl font-black font-headline text-secondary">{liveMetrics.settlement}</p>
                </div>
                <div className="text-right">
                  <p className="text-on-surface-variant text-sm mb-1 uppercase tracking-tighter">Standard</p>
                  <p className="text-2xl font-bold font-headline text-on-surface-variant">{liveMetrics.standard}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
