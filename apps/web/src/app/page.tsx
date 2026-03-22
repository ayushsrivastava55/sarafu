import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Shield,
  Globe,
  Code,
} from "lucide-react";

import { CurrencyGrid } from "@/components/sarafu/currency-grid";
import { FeeComparison } from "@/components/sarafu/fee-comparison";
import { PrivacyBadge } from "@/components/sarafu/privacy-badge";

const countries = [
  { name: "Kenya", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg2gcCAPr8tCBGEylUNl8BbRXdiK7T-7pCD7s4cgeI8M9QwwRKW8r-otPHY3g3MyqI1x4USssidxPcq7uTQ85BjtAe2wP788DpfDL4j2JpX-x10WjGhFqKbIiWQMTyhFqUOSmrAiXCNeSvuQQyXu8X81xWFijuPNdKSCyR2Y1zT4oXgqrsrEjkBDl9rwF6lpHxMhWE4tmBHGoaZMeZkt6mc_qaE6lEMTFGU8dQoCn72sv-qFV1Ymfqz0akREztJ0k42ez3AcoFdzk9" },
  { name: "Nigeria", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuABV3f3_tmSW78lYuocEukRV_61StZmtI4X_JUbjqsbKMjW9hCjUavT7-2wrhSe5OBy18rfzDSij_6BGNMQoD4aWdNSEKDq0HNpz13VNVx-cwiaYkDT3vXTIluonL85nybhyXWdFmXPf4ZMsvCAdZsgs0HQtlY-oRMTKYOoIieLyikiGF8B0ejhVfxaPmztblBbboFiYXHwygd0-WnyMyHIVXG9YHb4ZoBEd_MopkwzKS9beTLpcukfcnRPNI0amif8RsscskvY_rrV" },
  { name: "Philippines", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1Fh8Ds7hJreFZoSL0eYAQHFxX9M3iLw-L6Cu81VKudZ_eRAR2fYycC0fP5cCEpeGBNIaJBpasbeKEiynD9uyOytNMoZq8i01YLpjAJXNgc0aeV_lFkQUYXijLONNKnloFT_jPBVJ6q0yGAGWGvv7Y3pvXo1otwbYov_x4pDRsT3SMBjn6Gvmlvh-_HX3K7fzDh8oyW3LBQLVEcMdMaFXiMZ_KgVBecVYR-PFbhWz4On_cu6DGSiRlq7fwF9xdcV9MOzzjCE7NHJEB" },
  { name: "Brazil", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVKAd7sTnLS8HQHKltyq7ppCu9NNo54XQP7ckKvAhHMDBuKM1wjPOF0ieRsB4AvxzhdUjr7dSJo781QLqnU7BQRL4bFLKgS-ltTGdvcThqDkcudfLWHB6QiIhSd5p-sTqoLiWv7SYklUDBBBQ1BYM66DupzA3vqbfIfXbIh2-mPccQqlnvCZynVsRKoF1KvDhj-_VqOaLSXmHUQJttSO6byXpkdOHt0BxRPU_fziJpHtQR0x-t3VxpC17OrEeRMbld6MqsZfImAoGQ" },
  { name: "Ghana", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBNivFtVQPlSQGdXT_g_cNgkOjhq38HE8PbbvKk1JvX9ut2On7cyon14Oh_vOgQOqs8hsmDc682lOPOyJJ1EAN9zNs_5Ee5puq3Gf8lOWJWme3IdECL_OGG32Hz7zmfjet5q3RENo8v6bcFxtAlH-MgyFEmpVDFgUEYrm-YO_fBWkqVHl-HavDvAl-uLnpQ2lPHgyMOJDRcgC_RRixputArDuUozrMiyuN2g6OqBfsfmP9ZxpYLL2awcuvUwq_MM-yb2TWx0tLofTC" },
  { name: "South Africa", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuAg1mYDyd90ktyEbib3jxSfcxLLKj6_j3zBCYbutIawz_R4NU_ScvBFmN2Ol4tvMGPKvFXPDxF9FkPpvtnJMvqmmfvhbux2mKaGHYOn5H0UyiKGQ_dsV12EXXddhVShaFop24FT9-CRLyAhCyqwXp0cHbL4CXeWGa0hZqfGlL4k--vxV0Xz3eW7b-EoX15foW9okDVN7gvaHWZ2GtgXQEebYibf0Du4worrSM6bdkkhKTs5IZycAxeb8Y2wJfMfcDJFA4RMZrbwH1km" },
  { name: "Colombia", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKK_ovYRaw5jD2mgEKz4z-_gva1wWNItimsjb9VZSzBDYllh1Y2guz_-6Az9U2i0Je8efxdUr9H3Mr3hYkWaqlIHzEXw6hYr9wGadP8wOk9WwYMyV_w9UczJjc1cUddsst2J2Li1A6zVge0afhCL6zLShcByIIawLChCClj5Arp2PKLqgKeHiISXobNJLQdx4ooHZaWWKiC35umefHu0aK5TRetwOWrSGNDA_bQPmfQFo4R_TNB7GBcEpUudlGEDTYpfQRJxDc1o7F" },
  { name: "UK", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMxFQNEVsd4tdL0BT1II73FJb6QkAwLAy4zRJ4I96QCjmpgQWsx8xcz_BifM9WQf2BL7ZKTIl71Cu0DsTqdnsNmT3s-GLmmwVCSSRKc2oSxDP2Wl_rtMj80tVCKs2ju8n8lK5VRYK4aeiCUdpXinW5x7Hf8DsQHDJjVr0fLHwjqsEZWqr9EbeV-WLlSSXcKi_K5n6Gk5_HaHC1tPaUFjHI2xfdjjEnkFG2L_YPBCZysOLOeEfGGWv3c-8m44Wg3f24KJ8GpB8J-hSr" },
  { name: "Japan", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHzWEGmvdNQuhbj1OggDdgaKJpWy2KLq5Z_78RhqlUTqyLnJHqX4toPxrCCGV4jTKLYIXUuG0iRR5tNmSn-3EFtgTYenCpGW_N8JR2yLRAIaTQzF58DftJ5K0S8OVW1ijgHoKRC1c21bDy4yKmvtGgJ48rlSKaa_vgHYAtVAdOU6rgcUPn-9Cauz6UIwxA9TTV_0KL6233CpKjLFRukg8O4Gjbq-0ZIV3FEW6KhLfzsf9ABVhYsMh5LwvSrhSJRcLLUpAM2t0uFn5v" },
  { name: "UAE", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK_QtLQfCGIANQ-2IY8ulVnXlVNgYZfYFRZJeXBsQKqqnO235NGs7yLCIPBcISBtjshjWro1ImUeVIrJ9aN9D_4h8peJBYWTQQ2exYp1vfPx_2L079b3XujrDJUMwPLRcBHmraA0kF0UdOXMTMrk3pc6yNwWekuDFpPFo3nvxxY3ziyX4QvPN1xv5M2bc2YGYEdXIhg450w2A_XZrvWNa6sN0-Mzwx8n2AOJOuV_Qerl-Abz94hnDFYZlTljF-lWiuFDghVGfGWJEf" },
  { name: "Argentina", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkiPe0SfvjqI6QGRwgITP4qFuD1O7LQQ2cvxDm5H7ZXcp_Hb8MQCIIwIv0VCRFWSIv1HJI1hXa0bhleYJb2tOrHifXcLsrzWJmiI_y9-KfRrlzTb54rF4J1-3guo2fxzxIGwDVy3eBHW95siK2J3qorllKJ6fmpN3c9_EfH9wdJBcKvT3RJYegKvqqalfO2utIhTe52inTVIsSLxwDSw1vX665rYt_3T_3SmkOI-jIhF21kFTj27U9t-iXm2smpr_rgYpyLJog_8wh" },
  { name: "Mexico", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuOSWdHshVbJafR33ijRQlz-wlgoOqMk2Zq1bRVy3dgjVw36bb8unzVABtG2guPu6wZKg85qLnCUatKX-kvnzuGHGB3-HlrLTgtnm2iNczTyzKRofqIwRcUVMI4sCcHSH7Xa8X0TroN2jZ53-MtFaL5CBvI6zmE9WSq6-_kD7xAfyPHZCTUHYcJSr7wlhIhcUSDu3D_RXGR7JoX1SUeWXuJYpSASj9DXYK6GhzpLuGEqiSBrl3O9MMq0_OpVo_GQZO2s1wJXpRv7Yt" },
  { name: "Egypt", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0N0_7OJvvXKmIPYIo5DwmqsOdH2gCRXMEDLgvClNTfApde7piuQCTJTOZYPJZHBOFHIWvtWaR-5-mWHWLbCY7vpDZ6JEfxxil0IJsEZmwi_9hM4v2J8G3K9mC9zpUWt3MRqddK2FPmNqRTujGUu2oi_rlB9vosfMCONRrs2XuxC5DzTGosoS9WjmmtYCgLAEVrBrAcvVcsI6weWu1ejWU8gGDhI5joopTguRZKcYJB7vTha_O-Hn9xtpJywz0Y0lMoMuEwAwXq8l8" },
  { name: "India", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxDZBDbm1FjOWCoxhxDDV_7Uzn-SDe7wSV9LdMWgGIiOoclvIstDOKtLOu5Bk59osAWV7xpYC9cxwhH2SvB3PzTL4FBhufVfeeZ-SuFiYLhkox2vSgQ0CBqI-5cXDGjmW4ZWN8kJU-PW3zZrz-EKeLKImYeAvbJvkeNKhggMb123V5BBsg3TcGjj_hYmMoWJ9sAPw2k_aJf1CAuwGQL9NuHuLLybhJiGc9D1FshfQj61vTZlDJlyiTTFecfIqHTwBtsLTTNZjwhmeC" },
  { name: "Vietnam", flag: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjCTnn5mu-0CJGgXZvvbgw7qaeg5My_o-krD0EPam7csd1nZIR_GIoLVqwhszMScCfgTkyYUXCcokd9b0Kc3QWZaZXdcZ8GVY9cyGowMaEtJprb4UTcc52cOBKq_bJHEQK9d8HaMdlHDSpgMBzKVd8RS9b0y6-R-uAgGBnvlLG9eH9nKx0rKddlQUSWCL-q7UidHZK8jmq9tVdQUOtM9Dkwht2GuHJlTXsp86w8q6awJ-UvZy8qICKNGViHaeVEVmC4vPbWCSkiidu" },
];

const feeRows = [
  { provider: "Sarafu", fee: "$0.001", speed: "2 Seconds", transparency: "100% Private (Venice AI)", highlight: true },
  { provider: "Wise", fee: "$4+", speed: "1+ Day", transparency: "Transparent but slower", highlight: false },
  { provider: "Western Union", fee: "$14+", speed: "3+ Days", transparency: "6.35% Global Avg Cost", highlight: false },
  { provider: "Bank Wire", fee: "$25+", speed: "5+ Days", transparency: "Manual and slow", highlight: false },
];

export default function Home() {
  return (
    <div className="pt-32">
      {/* ── Hero ── */}
      <section className="relative mx-auto mb-32 max-w-7xl px-6">
        {/* ambient glows */}
        <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-[#ffe2ab]/5 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#00d9fc]/5 blur-[100px]" />

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* left */}
          <div>
            <PrivacyBadge />
            <h1 className="mb-6 mt-6 font-headline text-6xl font-extrabold leading-[1.1] tracking-tight text-[#fff9ef] md:text-7xl">
              Send money home.{" "}
              <span className="text-[#FFBF00]">
                Instant, invisible, $0.001 fee.
              </span>
            </h1>
            <p className="mb-10 max-w-lg text-xl leading-relaxed text-[#d4c5ab]">
              AI-powered remittance settled in 2 seconds via the Celo
              blockchain. Sovereign payments, finally accessible to everyone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/chat"
                className="gold-gradient inline-flex items-center rounded-xl px-8 py-4 text-lg font-bold text-[#131313] transition-transform active:scale-95"
              >
                Try Sarafu
              </Link>
              <a
                href="https://synthesis.md/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl border border-[#504532]/20 bg-[#2a2a2a] px-8 py-4 font-semibold text-[#e5e2e1] transition-colors hover:bg-[#3a3939]"
              >
                View Documentation
              </a>
            </div>
          </div>

          {/* right: live metrics card */}
          <div className="relative group">
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[#ffe2ab]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="glass-panel glow-subtle relative overflow-hidden rounded-3xl border border-[#504532]/10 p-8">
              <div className="mb-12 flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-widest text-[#FFBF00]">
                  Live Metrics
                </span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-[#FFBF00]" />
                  <span className="text-xs text-[#d4c5ab]">
                    Venice AI Processing
                  </span>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="mb-1 text-sm uppercase tracking-tighter text-[#d4c5ab]">
                      Sarafu Fee
                    </p>
                    <p className="font-headline text-4xl font-black text-[#fff9ef]">
                      $0.001
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="mb-1 text-sm uppercase tracking-tighter text-[#d4c5ab]">
                      TradFi Fee
                    </p>
                    <p className="font-headline text-2xl font-bold text-[#ffb4ab] line-through decoration-2 opacity-60">
                      $14.00
                    </p>
                  </div>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-[#353534]">
                  <div className="h-full w-[1%] bg-[#FFBF00]" />
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="mb-1 text-sm uppercase tracking-tighter text-[#d4c5ab]">
                      Settlement
                    </p>
                    <p className="font-headline text-4xl font-black text-[#fff9ef]">
                      2 Seconds
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="mb-1 text-sm uppercase tracking-tighter text-[#d4c5ab]">
                      Standard
                    </p>
                    <p className="font-headline text-2xl font-bold text-[#d4c5ab]">
                      3 Days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="bg-[#1c1b1b] py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 text-center">
            <h2 className="mb-4 font-headline text-4xl font-black text-[#e5e2e1]">
              The New Standard of Transfer
            </h2>
            <p className="mx-auto max-w-xl text-[#d4c5ab]">
              Three steps to global financial freedom, powered by decentralized
              intelligence.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="flex flex-col items-center rounded-xl border border-[#504532]/10 bg-[#131313] p-10 text-center">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe2ab]/10 text-[#FFBF00]">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="mb-4 font-headline text-xl font-bold">
                Type your intent
              </h3>
              <div className="mb-4 w-full rounded-lg bg-[#2a2a2a] p-4 text-left font-mono text-sm text-[#d4c5ab]">
                &quot;Send $50 to my friend in Kenya&quot;
              </div>
              <p className="text-sm leading-relaxed text-[#d4c5ab]">
                Simply state what you want to do. Our AI handles the routing
                logic across chains.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center overflow-hidden rounded-xl border border-[#504532]/10 bg-[#131313] p-10 text-center">
              <div className="absolute right-0 top-0 p-4">
                <span className="rounded bg-[#FFBF00]/10 px-2 py-1 text-[10px] font-bold text-[#FFBF00]">
                  MENTO ORACLE
                </span>
              </div>
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#00d9fc]/10 text-[#00d9fc]">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h3 className="mb-4 font-headline text-xl font-bold">
                AI fetches FX quote
              </h3>
              <div className="w-full space-y-2">
                <div className="flex justify-between border-b border-[#504532]/10 py-2 text-xs">
                  <span>USD/KES</span>
                  <span className="font-bold text-[#FFBF00]">132.45</span>
                </div>
                <div className="flex justify-between py-2 text-xs">
                  <span>Slippage</span>
                  <span className="text-[#00d9fc]">0.01%</span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#d4c5ab]">
                Real-time on-chain oracle rates ensure you get the absolute best
                price.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center rounded-xl border border-[#504532]/10 bg-[#131313] p-10 text-center">
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFBF00]/10 text-[#FFBF00]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mb-4 font-headline text-xl font-bold">
                Money arrives
              </h3>
              <div className="mb-4 flex items-center gap-2 rounded-full bg-[#2a2a2a] px-4 py-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#35D07F] text-[10px] font-bold text-white">
                  C
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Celo Mainnet
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#d4c5ab]">
                Funds are settled instantly. Secure, final, and globally
                decentralized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Supported Currencies (flags) ── */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="mb-4 font-headline text-4xl font-black text-[#e5e2e1]">
                Borderless from day one.
              </h2>
              <p className="text-[#d4c5ab]">
                Direct corridors to 15+ emerging and developed economies.
              </p>
            </div>
            <div className="flex cursor-pointer items-center gap-4 font-bold text-[#FFBF00] transition-transform hover:translate-x-1">
              View all corridors{" "}
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {countries.map((country) => (
              <div
                key={country.name}
                className="flex cursor-default items-center gap-4 rounded-xl border border-transparent bg-[#1c1b1b] p-6 transition-colors hover:border-[#504532]/20 hover:bg-[#3a3939]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`${country.name} Flag`}
                  src={country.flag}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="font-bold">{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mento Currency Registry (reuses CurrencyGrid component) ── */}
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="rounded-3xl border border-[#504532]/10 bg-[#1c1b1b] p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.24em] text-[#d4c5ab]">
                Currency coverage
              </div>
              <h2 className="mt-2 font-headline text-3xl font-black text-[#e5e2e1]">
                Mento local stablecoins
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#d4c5ab]">
              Sarafu focuses on real remittance corridors rather than generic
              dollar transfers. The supported currency registry below is shared
              by the CLI, API routes, and frontend.
            </p>
          </div>
          <div className="mt-6">
            <CurrencyGrid />
          </div>
        </div>
      </section>

      {/* ── Fee Comparison Table ── */}
      <section className="overflow-hidden bg-[#1c1b1b] py-32">
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-headline text-4xl font-black text-[#e5e2e1]">
              No contest.
            </h2>
            <p className="text-[#d4c5ab]">
              The data speaks for itself. We&apos;ve eliminated the friction of
              moving value.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-4 text-left">
              <thead>
                <tr className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4c5ab]">
                  <th className="px-8 py-4">Provider</th>
                  <th className="px-8 py-4">Est. Fee</th>
                  <th className="px-8 py-4">Speed</th>
                  <th className="px-8 py-4">Transparency</th>
                </tr>
              </thead>
              <tbody>
                {feeRows.map((row) => (
                  <tr
                    key={row.provider}
                    className={
                      row.highlight
                        ? "glow-subtle rounded-xl border border-[#FFBF00]/20 bg-[#2a2a2a]"
                        : "bg-[#131313]"
                    }
                  >
                    <td className="rounded-l-xl px-8 py-6">
                      {row.highlight ? (
                        <div className="flex items-center gap-3">
                          <div className="h-3 w-3 rounded-full bg-[#FFBF00]" />
                          <span className="font-headline text-lg font-black">
                            {row.provider}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold opacity-60">
                          {row.provider}
                        </span>
                      )}
                    </td>
                    <td
                      className={`px-8 py-6 ${
                        row.highlight
                          ? "font-bold text-[#FFBF00]"
                          : row.provider === "Western Union"
                            ? "text-[#ffb4ab] opacity-60"
                            : "opacity-60"
                      }`}
                    >
                      {row.fee}
                    </td>
                    <td
                      className={`px-8 py-6 ${row.highlight ? "font-bold" : "opacity-60"}`}
                    >
                      {row.speed}
                    </td>
                    <td
                      className={`rounded-r-xl px-8 py-6 ${
                        row.highlight
                          ? "font-medium text-[#00d9fc]"
                          : "opacity-60"
                      }`}
                    >
                      {row.transparency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reuse FeeComparison component */}
          <div className="mt-16">
            <FeeComparison />
          </div>
        </div>
      </section>

      {/* ── Privacy Section ── */}
      <section className="relative overflow-hidden py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">
          {/* visual */}
          <div className="relative">
            <div className="group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-[#504532]/10 bg-[#1c1b1b]">
              <div className="absolute inset-0 bg-[#ffe2ab]/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <Shield className="h-[120px] w-[120px] text-[#FFBF00]/20" />
              <div className="glass-panel absolute inset-x-12 bottom-12 rounded-xl border border-[#504532]/20 p-6">
                <div className="mb-2 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#00d9fc]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    TEE Attestation Active
                  </span>
                </div>
                <p className="font-mono text-xs text-[#d4c5ab]">
                  0x4F...92: Computation Verified by Secure Enclave
                </p>
              </div>
            </div>
          </div>

          {/* text */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#FFBF00]">
                Privacy by Venice AI
              </span>
            </div>
            <h2 className="mb-8 font-headline text-5xl font-black leading-tight text-[#e5e2e1]">
              Your financial data is processed and forgotten.
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-[#FFBF00]" />
                <div>
                  <h4 className="mb-1 font-bold">Zero Data Retention</h4>
                  <p className="text-sm text-[#d4c5ab]">
                    We never store your personal data, transaction history, or
                    intents. Your path is your own.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Shield className="mt-1 h-6 w-6 shrink-0 text-[#FFBF00]" />
                <div>
                  <h4 className="mb-1 font-bold">TEE Attestation</h4>
                  <p className="text-sm text-[#d4c5ab]">
                    Our AI runs in Trusted Execution Environments, ensuring no
                    human can ever peek inside the computation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="mx-auto mb-32 max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#FFBF00]/10 bg-[#FFBF00]/5 p-16 text-center md:p-24">
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#ffe2ab]/10 blur-[100px]" />
          <div className="relative z-10">
            <h2 className="mb-8 font-headline text-5xl font-black text-[#e5e2e1] md:text-6xl">
              Ready to send?
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-xl text-[#d4c5ab]">
              Experience the invisible global banking system today.
            </p>
            <Link
              href="/chat"
              className="gold-gradient inline-flex items-center rounded-xl px-12 py-5 text-xl font-bold text-[#131313] transition-transform active:scale-95"
            >
              Try Sarafu
            </Link>
            <p className="mt-8 text-sm text-[#d4c5ab]/60">
              No credit card required. Only Celo-compatible wallet needed.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="w-full border-t border-[#353534]/30 bg-[#131313] py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="mb-4 block font-headline text-xl font-black text-[#fff9ef]">
              Sarafu
            </span>
            <p className="text-sm leading-relaxed text-[#d4c5ab]">
              Sovereign remittances powered by Venice AI. Decentralizing the
              flow of value for everyone, everywhere.
            </p>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#FFBF00]">
              Platform
            </h4>
            <div className="flex flex-col gap-4">
              <Link href="#" className="text-sm text-[#d4c5ab] transition-colors hover:text-[#FFBF00]">How it Works</Link>
              <Link href="#" className="text-sm text-[#d4c5ab] transition-colors hover:text-[#FFBF00]">Supported Currencies</Link>
              <Link href="#" className="text-sm text-[#d4c5ab] transition-colors hover:text-[#FFBF00]">Security Model</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#FFBF00]">
              Resources
            </h4>
            <div className="flex flex-col gap-4">
              <Link href="#" className="text-sm text-[#d4c5ab] transition-colors hover:text-[#FFBF00]">API Documentation</Link>
              <Link href="#" className="text-sm text-[#d4c5ab] transition-colors hover:text-[#FFBF00]">Network Status</Link>
              <Link href="#" className="text-sm text-[#d4c5ab] transition-colors hover:text-[#FFBF00]">Support Center</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#FFBF00]">
              Legal
            </h4>
            <div className="flex flex-col gap-4">
              <Link href="#" className="text-sm text-[#d4c5ab] transition-colors hover:text-[#FFBF00]">Privacy Policy</Link>
              <Link href="#" className="text-sm text-[#d4c5ab] transition-colors hover:text-[#FFBF00]">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-[#353534]/30 px-6 pt-8 text-sm text-[#d4c5ab] md:flex-row">
          <p>&copy; 2024 Sarafu. Sovereign remittances powered by Venice AI.</p>
          <div className="flex gap-6">
            <Globe className="h-5 w-5 cursor-pointer transition-colors hover:text-[#FFBF00]" />
            <Shield className="h-5 w-5 cursor-pointer transition-colors hover:text-[#FFBF00]" />
            <Code className="h-5 w-5 cursor-pointer transition-colors hover:text-[#FFBF00]" />
          </div>
        </div>
      </footer>
    </div>
  );
}
