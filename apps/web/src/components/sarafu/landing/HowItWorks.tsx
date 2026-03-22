import { howItWorksContent, howItWorksSteps } from "@/data/mockData";

interface HowItWorksProps {
  readonly className?: string;
}

export default function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section className={`bg-surface-container-low py-32 ${className ?? ""}`} id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-black font-headline mb-4">{howItWorksContent.title}</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">{howItWorksContent.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-surface p-10 rounded-xl border border-outline-variant/10 flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full ${howItWorksSteps[0].iconBgClass} flex items-center justify-center mb-8 ${howItWorksSteps[0].iconTextClass}`}>
              <span className="material-symbols-outlined text-4xl">{howItWorksSteps[0].icon}</span>
            </div>
            <h3 className="text-xl font-bold font-headline mb-4">{howItWorksSteps[0].title}</h3>
            <div className="w-full bg-surface-container-high p-4 rounded-lg text-left text-sm font-mono text-on-surface-variant mb-4">
              {howItWorksSteps[0].example}
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">{howItWorksSteps[0].description}</p>
          </div>

          {/* Step 2 */}
          <div className="bg-surface p-10 rounded-xl border border-outline-variant/10 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="text-[10px] font-bold text-primary-container px-2 py-1 bg-primary-container/10 rounded">{howItWorksSteps[1].badge}</span>
            </div>
            <div className={`w-16 h-16 rounded-full ${howItWorksSteps[1].iconBgClass} flex items-center justify-center mb-8 ${howItWorksSteps[1].iconTextClass}`}>
              <span className="material-symbols-outlined text-4xl">{howItWorksSteps[1].icon}</span>
            </div>
            <h3 className="text-xl font-bold font-headline mb-4">{howItWorksSteps[1].title}</h3>
            <div className="space-y-2 w-full">
              {howItWorksSteps[1].fxData?.map((row) => (
                <div
                  key={row.label}
                  className={`flex justify-between text-xs py-2 ${row.label === "USD/KES" ? "border-b border-outline-variant/10" : ""}`}
                >
                  <span>{row.label}</span>
                  <span className={row.valueClass}>{row.value}</span>
                </div>
              ))}
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed mt-4">{howItWorksSteps[1].description}</p>
          </div>

          {/* Step 3 */}
          <div className="bg-surface p-10 rounded-xl border border-outline-variant/10 flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full ${howItWorksSteps[2].iconBgClass} flex items-center justify-center mb-8 ${howItWorksSteps[2].iconTextClass}`}>
              <span className="material-symbols-outlined text-4xl">{howItWorksSteps[2].icon}</span>
            </div>
            <h3 className="text-xl font-bold font-headline mb-4">{howItWorksSteps[2].title}</h3>
            <div className="flex items-center gap-2 mb-4 bg-surface-container-high px-4 py-2 rounded-full">
              <div className="w-6 h-6 bg-[#35D07F] rounded-full flex items-center justify-center text-[10px] text-white font-bold">C</div>
              <span className="text-xs font-bold uppercase tracking-widest">Celo Mainnet</span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">{howItWorksSteps[2].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
