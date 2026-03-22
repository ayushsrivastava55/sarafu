import type { SarafuNetworkKey, SupportedCurrency } from "./types.js";

const MAINNET_TOKENS = {
  USDm: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  EURm: "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73",
  BRLm: "0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787",
  KESm: "0x456a3D042C0DbD3db53D5489e98dFb038553B0d0",
  COPm: "0x8A567e2aE79CA692Bd748aB832081C45de4041eA",
  XOFm: "0x73F93dcc49cB8A239e2032663e9475dd5ef29A08",
  GBPm: "0xCCF663b1fF11028f0b19058d0f7B674004a40746",
  NGNm: "0xE2702Bd97ee33c88c8f6f92DA3B733608aa76F71",
  PHPm: "0x105d4A9306D2E55a71d2Eb95B81553AE1dC20d7B",
  ZARm: "0x4c35853A3B4e647fD266f4de678dCc8fEC410BF6",
  JPYm: "0xc45eCF20f3CD864B32D9794d6f76814aE8892e20",
  CHFm: "0xb55a79F398E759E43C95b979163f30eC87Ee131D",
  AUDm: "0x7175504C455076F15c04A2F90a8e352281F492F9",
  CADm: "0xff4Ab19391af240c311c54200a492233052B6325",
  GHSm: "0xfAeA5F3404bbA20D3cc2f8C4B0A888F55a3c7313",
  CELO: "0x471EcE3750Da237f93B8E339c536989b8978a438",
  USDC: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
} as const;

const TESTNET_TOKENS = {
  USDm: "0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b",
  EURm: "0xA99dC247d6b7B2E3ab48a1fEE101b83cD6aCd82a",
  BRLm: "0x2294298942fdc79417DE9E0D740A4957E0e7783a",
  KESm: "0xC7e4635651E3e3Af82b61d3E23c159438daE3BbF",
  COPm: "0x5F8d55c3627d2dc0a2B4afa798f877242F382F67",
  XOFm: "0x5505b70207aE3B826c1A7607F19F3Bf73444A082",
  GBPm: "0x85F5181Abdbf0e1814Fc4358582Ae07b8eBA3aF3",
  NGNm: "0x3d5ae86F34E2a82771496D140daFAEf3789dF888",
  PHPm: "0x0352976d940a2C3FBa0C3623198947Ee1d17869E",
  ZARm: "0x10CCfB235b0E1Ed394bACE4560C3ed016697687e",
  JPYm: "0x85Bee67D435A39f7467a8a9DE34a5B73D25Df426",
  CHFm: "0x284E9b7B623eAE866914b7FA0eB720C2Bb3C2980",
  AUDm: "0x5873Faeb42F3563dcD77F0fbbdA818E6d6DA3139",
  CADm: "0xF151c9a13b78C84f93f50B8b3bC689fedc134F60",
  GHSm: "0x5e94B8C872bD47BC4255E60ECBF44D5E66e7401C",
  CELO: "0x471EcE3750Da237f93B8E339c536989b8978a438",
  USDC: "0x0000000000000000000000000000000000000000",
} as const;

export type TokenRegistry = Record<string, `0x${string}`>;

const SUPPORTED_CURRENCIES: SupportedCurrency[] = [
  { code: "USD", name: "US Dollar", tokenSymbol: "USDm" },
  { code: "EUR", name: "Euro", tokenSymbol: "EURm" },
  { code: "GBP", name: "British Pound", tokenSymbol: "GBPm" },
  { code: "BRL", name: "Brazilian Real", tokenSymbol: "BRLm" },
  { code: "KES", name: "Kenyan Shilling", tokenSymbol: "KESm" },
  { code: "NGN", name: "Nigerian Naira", tokenSymbol: "NGNm" },
  { code: "PHP", name: "Philippine Peso", tokenSymbol: "PHPm" },
  { code: "ZAR", name: "South African Rand", tokenSymbol: "ZARm" },
  { code: "COP", name: "Colombian Peso", tokenSymbol: "COPm" },
  { code: "XOF", name: "West African CFA Franc", tokenSymbol: "XOFm" },
  { code: "GHS", name: "Ghanaian Cedi", tokenSymbol: "GHSm" },
  { code: "JPY", name: "Japanese Yen", tokenSymbol: "JPYm" },
  { code: "CHF", name: "Swiss Franc", tokenSymbol: "CHFm" },
  { code: "AUD", name: "Australian Dollar", tokenSymbol: "AUDm" },
  { code: "CAD", name: "Canadian Dollar", tokenSymbol: "CADm" },
];

const CURRENCY_TO_TOKEN: Record<string, keyof TokenRegistry> = {
  usd: "USDm",
  dollar: "USDm",
  dollars: "USDm",
  eur: "EURm",
  euro: "EURm",
  euros: "EURm",
  gbp: "GBPm",
  pound: "GBPm",
  pounds: "GBPm",
  brl: "BRLm",
  real: "BRLm",
  reais: "BRLm",
  kes: "KESm",
  shilling: "KESm",
  shillings: "KESm",
  ngn: "NGNm",
  naira: "NGNm",
  php: "PHPm",
  zar: "ZARm",
  rand: "ZARm",
  cop: "COPm",
  xof: "XOFm",
  cfa: "XOFm",
  ghs: "GHSm",
  cedi: "GHSm",
  jpy: "JPYm",
  yen: "JPYm",
  chf: "CHFm",
  franc: "CHFm",
  aud: "AUDm",
  cad: "CADm",
};

const COUNTRY_TO_CURRENCY: Record<string, string> = {
  kenya: "KES",
  nigeria: "NGN",
  philippines: "PHP",
  brazil: "BRL",
  colombia: "COP",
  "south africa": "ZAR",
  ghana: "GHS",
  japan: "JPY",
  switzerland: "CHF",
  australia: "AUD",
  canada: "CAD",
  france: "EUR",
  germany: "EUR",
  spain: "EUR",
  italy: "EUR",
  "united kingdom": "GBP",
  uk: "GBP",
  england: "GBP",
  senegal: "XOF",
  mali: "XOF",
  "ivory coast": "XOF",
  "united states": "USD",
  usa: "USD",
};

export function getTokenRegistry(network: SarafuNetworkKey): TokenRegistry {
  return network === "celo-mainnet" ? MAINNET_TOKENS : TESTNET_TOKENS;
}

export function listSupportedCurrencies(): SupportedCurrency[] {
  return SUPPORTED_CURRENCIES;
}

export function normalizeCurrency(input: string): string | null {
  const normalized = input.trim().toLowerCase();
  const direct = CURRENCY_TO_TOKEN[normalized];
  if (direct) {
    return direct.replace("m", "").toUpperCase();
  }

  return COUNTRY_TO_CURRENCY[normalized] || null;
}

export function resolveCurrencyFromCountry(input: string): string | null {
  return COUNTRY_TO_CURRENCY[input.trim().toLowerCase()] || null;
}

export function resolveTokenAddress(currency: string, network: SarafuNetworkKey): `0x${string}` | null {
  const normalized = normalizeCurrency(currency);
  if (!normalized) {
    return null;
  }

  const tokenRegistry = getTokenRegistry(network);
  const tokenKey = `${normalized}m`;
  return tokenRegistry[tokenKey] || null;
}
