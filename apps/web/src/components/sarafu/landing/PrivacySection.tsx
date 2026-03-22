import { privacyContent } from "@/data/mockData";

interface PrivacySectionProps {
  readonly className?: string;
}

export default function PrivacySection({ className }: PrivacySectionProps) {
  return (
    <section className={`py-32 relative overflow-hidden ${className ?? ""}`} id="security">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="w-full aspect-square bg-surface-container-low rounded-3xl flex items-center justify-center border border-outline-variant/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span
              className="material-symbols-outlined text-[120px] text-primary-container/20"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              encrypted
            </span>
            <div className="absolute inset-x-12 bottom-12 p-6 glass-panel rounded-xl border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></div>
                <span className="text-[10px] font-bold tracking-widest uppercase">{privacyContent.attestationLabel}</span>
              </div>
              <p className="text-xs text-on-surface-variant font-mono">{privacyContent.attestationValue}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-primary-container font-black tracking-widest uppercase text-xs">{privacyContent.badge}</span>
          </div>
          <h2 className="text-5xl font-black font-headline leading-tight mb-8">{privacyContent.title}</h2>
          <div className="space-y-6">
            {privacyContent.features.map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <span className="material-symbols-outlined text-primary-container">{feature.icon}</span>
                <div>
                  <h4 className="font-bold mb-1">{feature.title}</h4>
                  <p className="text-on-surface-variant text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
