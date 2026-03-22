import { feeComparisonContent, feeRows } from "@/data/mockData";

interface FeeTableProps {
  readonly className?: string;
}

export default function FeeTable({ className }: FeeTableProps) {
  return (
    <section className={`bg-surface-container-low py-32 overflow-hidden ${className ?? ""}`} id="comparison">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black font-headline mb-4">{feeComparisonContent.title}</h2>
          <p className="text-on-surface-variant">{feeComparisonContent.subtitle}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-on-surface-variant uppercase text-xs tracking-[0.2em] font-bold">
                <th className="px-8 py-4">Provider</th>
                <th className="px-8 py-4">Est. Fee</th>
                <th className="px-8 py-4">Speed</th>
                <th className="px-8 py-4">Transparency</th>
              </tr>
            </thead>
            <tbody>
              {feeRows.map((row) =>
                row.highlighted ? (
                  <tr key={row.provider} className="bg-surface-container-high rounded-xl glow-subtle border border-primary-container/20">
                    <td className="px-8 py-6 rounded-l-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                        <span className="font-black font-headline text-lg">{row.provider}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-bold text-primary-container">{row.fee}</td>
                    <td className="px-8 py-6 font-bold">{row.speed}</td>
                    <td className="px-8 py-6 rounded-r-xl font-medium text-tertiary-fixed-dim">{row.transparency}</td>
                  </tr>
                ) : (
                  <tr key={row.provider} className="bg-surface p-4">
                    <td className="px-8 py-6 rounded-l-xl font-bold opacity-60">{row.provider}</td>
                    <td className={`px-8 py-6 opacity-60 ${row.provider === "Western Union" ? "text-error" : ""}`}>{row.fee}</td>
                    <td className="px-8 py-6 opacity-60">{row.speed}</td>
                    <td className="px-8 py-6 rounded-r-xl opacity-60">{row.transparency}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
