import Link from "next/link";
import { ctaContent } from "@/data/mockData";

interface CtaSectionProps {
  readonly className?: string;
}

export default function CtaSection({ className }: CtaSectionProps) {
  return (
    <section className={`max-w-7xl mx-auto px-6 mb-32 ${className ?? ""}`}>
      <div className="bg-primary-container/5 rounded-3xl p-16 md:p-24 text-center border border-primary-container/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-black font-headline mb-8">{ctaContent.title}</h2>
          <p className="text-on-surface-variant text-xl mb-12 max-w-xl mx-auto">{ctaContent.subtitle}</p>
          <Link
            href="/chat"
            className="gold-gradient text-on-primary-container px-12 py-5 rounded-xl font-bold text-xl active:scale-95 transition-transform inline-block"
          >
            {ctaContent.buttonText}
          </Link>
          <p className="mt-8 text-sm text-on-surface-variant/60">{ctaContent.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
