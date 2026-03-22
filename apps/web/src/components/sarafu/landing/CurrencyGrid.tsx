import { countries, currencySectionContent } from "@/data/mockData";

interface CurrencyGridProps {
  readonly className?: string;
}

export default function CurrencyGrid({ className }: CurrencyGridProps) {
  return (
    <section className={`py-32 ${className ?? ""}`} id="currencies">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-black font-headline mb-4">{currencySectionContent.title}</h2>
            <p className="text-on-surface-variant">{currencySectionContent.subtitle}</p>
          </div>
          <div className="flex items-center gap-4 text-primary-container font-bold group cursor-pointer">
            {currencySectionContent.ctaText} <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {countries.map((country) => (
            <div
              key={country.name}
              className="bg-surface-container-low hover:bg-surface-bright p-6 rounded-xl transition-colors cursor-default border border-transparent hover:border-outline-variant/20 flex items-center gap-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={country.alt}
                className="w-8 h-8 rounded-full object-cover"
                data-alt={country.dataAlt}
                src={country.src}
              />
              <span className="font-bold">{country.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
