// Mento stablecoin addresses on Celo Mainnet
// Rebranded in late 2025: cUSD -> USDm, cKES -> KESm, etc.
// Contract addresses remain the same

export const TOKENS = {
  // Core stablecoins
  USDm: "0x765DE816845861e75A25fCA122bb6898B8B1282a",   // US Dollar (formerly cUSD)
  EURm: "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73",   // Euro (formerly cEUR)
  BRLm: "0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787",   // Brazilian Real (formerly cREAL)
  KESm: "0x456a3D042C0DbD3db53D5489e98dFb038553B0d0",   // Kenyan Shilling (formerly cKES)
  COPm: "0x8A567e2aE79CA692Bd748aB832081C45de4041eA",   // Colombian Peso (formerly cCOP)
  XOFm: "0x73F93dcc49cB8A239e2032663e9475dd5ef29A08",   // West African CFA (formerly eXOF)
  GBPm: "0xCCF663b1fF11028f0b19058d0f7B674004a40746",   // British Pound
  NGNm: "0xE2702Bd97ee33c88c8f6f92DA3B733608aa76F71",   // Nigerian Naira
  PHPm: "0x105d4A9306D2E55a71d2Eb95B81553AE1dC20d7B",   // Philippine Peso
  ZARm: "0x4c35853A3B4e647fD266f4de678dCc8fEC410BF6",   // South African Rand
  JPYm: "0xc45eCF20f3CD864B32D9794d6f76814aE8892e20",   // Japanese Yen
  CHFm: "0xb55a79F398E759E43C95b979163f30eC87Ee131D",   // Swiss Franc
  AUDm: "0x7175504C455076F15c04A2F90a8e352281F492F9",   // Australian Dollar
  CADm: "0xff4Ab19391af240c311c54200a492233052B6325",   // Canadian Dollar
  GHSm: "0xfAeA5F3404bbA20D3cc2f8C4B0A888F55a3c7313",   // Ghanaian Cedi

  // Other tokens
  CELO: "0x471EcE3750Da237f93B8E339c536989b8978a438",
  USDC: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
} as const;

// Human-readable currency mapping
export const CURRENCY_TO_TOKEN: Record<string, keyof typeof TOKENS> = {
  "usd": "USDm",
  "dollar": "USDm",
  "dollars": "USDm",
  "eur": "EURm",
  "euro": "EURm",
  "euros": "EURm",
  "brl": "BRLm",
  "real": "BRLm",
  "reais": "BRLm",
  "kes": "KESm",
  "shilling": "KESm",
  "shillings": "KESm",
  "cop": "COPm",
  "peso": "COPm",
  "pesos": "COPm",
  "xof": "XOFm",
  "cfa": "XOFm",
  "gbp": "GBPm",
  "pound": "GBPm",
  "pounds": "GBPm",
  "ngn": "NGNm",
  "naira": "NGNm",
  "php": "PHPm",
  "zar": "ZARm",
  "rand": "ZARm",
  "jpy": "JPYm",
  "yen": "JPYm",
  "chf": "CHFm",
  "franc": "CHFm",
  "aud": "AUDm",
  "cad": "CADm",
  "ghs": "GHSm",
  "cedi": "GHSm",
  "usdc": "USDC",
  "celo": "CELO",
};

// Country to default currency
export const COUNTRY_TO_CURRENCY: Record<string, string> = {
  "kenya": "kes",
  "nigeria": "ngn",
  "philippines": "php",
  "brazil": "brl",
  "colombia": "cop",
  "south africa": "zar",
  "uk": "gbp",
  "united kingdom": "gbp",
  "england": "gbp",
  "japan": "jpy",
  "switzerland": "chf",
  "australia": "aud",
  "canada": "cad",
  "ghana": "ghs",
  "senegal": "xof",
  "ivory coast": "xof",
  "mali": "xof",
  "europe": "eur",
  "france": "eur",
  "germany": "eur",
  "spain": "eur",
  "italy": "eur",
  "india": "usd", // No INR on Mento yet, default to USD
  "usa": "usd",
  "united states": "usd",
  "mexico": "usd", // No MXN on Mento yet
};

// Mento protocol addresses
export const MENTO = {
  BROKER: "0x777A8255cA72412f0d706dc03C9D1987306B4CaD",
  BIPOOL_MANAGER: "0x22d9db95E6Ae61c104A7B6F6C78D7993B94ec901",
} as const;
