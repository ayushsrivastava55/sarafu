import { listSupportedCurrencies } from "@sarafu/core/client";

export function CurrencyGrid() {
  const currencies = listSupportedCurrencies();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {currencies.map((currency) => (
        <div
          key={currency.code}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-sm"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{currency.code}</div>
          <div className="mt-2 text-base font-semibold text-white">{currency.name}</div>
          <div className="mt-1 text-sm text-slate-400">{currency.tokenSymbol}</div>
        </div>
      ))}
    </div>
  );
}
