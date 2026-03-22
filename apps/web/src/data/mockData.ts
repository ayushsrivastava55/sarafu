// Static data extracted from the Sarafu landing page Stitch design

export const navLinks = [
  { label: "How it Works", href: "#how-it-works", active: true },
  { label: "Currencies", href: "#currencies", active: false },
  { label: "Security", href: "#security", active: false },
  { label: "Comparison", href: "#comparison", active: false },
];

export const heroContent = {
  headlineWhite: "Send money home. ",
  headlineGold: "Instant, invisible, $0.001 fee.",
  subtext:
    "AI-powered remittance settled in 2 seconds via the Celo blockchain. Sovereign payments, finally accessible to everyone.",
  ctaPrimary: "Try Sarafu",
  ctaSecondary: "View Documentation",
};

export const liveMetrics = {
  sarafuFee: "$0.001",
  tradFiFee: "$14.00",
  settlement: "2 Seconds",
  standard: "3 Days",
};

export const howItWorksContent = {
  title: "The New Standard of Transfer",
  subtitle:
    "Three steps to global financial freedom, powered by decentralized intelligence.",
};

export const howItWorksSteps = [
  {
    icon: "chat_bubble",
    title: "Type your intent",
    example: '"Send $50 to my friend in Kenya"',
    description:
      "Simply state what you want to do. Our AI handles the routing logic across chains.",
    iconBgClass: "bg-primary/10",
    iconTextClass: "text-primary-container",
    badge: null,
  },
  {
    icon: "analytics",
    title: "AI fetches FX quote",
    example: null,
    description:
      "Real-time on-chain oracle rates ensure you get the absolute best price.",
    iconBgClass: "bg-tertiary-fixed-dim/10",
    iconTextClass: "text-tertiary-fixed-dim",
    badge: "MENTO ORACLE",
    fxData: [
      { label: "USD/KES", value: "132.45", valueClass: "text-primary-container font-bold" },
      { label: "Slippage", value: "0.01%", valueClass: "text-tertiary-fixed-dim" },
    ],
  },
  {
    icon: "check_circle",
    title: "Money arrives",
    example: null,
    description:
      "Funds are settled instantly. Secure, final, and globally decentralized.",
    iconBgClass: "bg-secondary-container/10",
    iconTextClass: "text-secondary-container",
    badge: null,
    celoIndicator: true,
  },
];

export interface CountryFlag {
  name: string;
  alt: string;
  dataAlt: string;
  src: string;
}

export const countries: CountryFlag[] = [
  {
    name: "Kenya",
    alt: "Kenya Flag",
    dataAlt: "Flag of Kenya",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg2gcCAPr8tCBGEylUNl8BbRXdiK7T-7pCD7s4cgeI8M9QwwRKW8r-otPHY3g3MyqI1x4USssidxPcq7uTQ85BjtAe2wP788DpfDL4j2JpX-x10WjGhFqKbIiWQMTyhFqUOSmrAiXCNeSvuQQyXu8X81xWFijuPNdKSCyR2Y1zT4oXgqrsrEjkBDl9rwF6lpHxMhWE4tmBHGoaZMeZkt6mc_qaE6lEMTFGU8dQoCn72sv-qFV1Ymfqz0akREztJ0k42ez3AcoFdzk9",
  },
  {
    name: "Nigeria",
    alt: "Nigeria Flag",
    dataAlt: "Flag of Nigeria",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuABV3f3_tmSW78lYuocEukRV_61StZmtI4X_JUbjqsbKMjW9hCjUavT7-2wrhSe5OBy18rfzDSij_6BGNMQoD4aWdNSEKDq0HNpz13VNVx-cwiaYkDT3vXTIluonL85nybhyXWdFmXPf4ZMsvCAdZsgs0HQtlY-oRMTKYOoIieLyikiGF8B0ejhVfxaPmztblBbboFiYXHwygd0-WnyMyHIVXG9YHb4ZoBEd_MopkwzKS9beTLpcukfcnRPNI0amif8RsscskvY_rrV",
  },
  {
    name: "Philippines",
    alt: "Philippines Flag",
    dataAlt: "Flag of Philippines",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1Fh8Ds7hJreFZoSL0eYAQHFxX9M3iLw-L6Cu81VKudZ_eRAR2fYycC0fP5cCEpeGBNIaJBpasbeKEiynD9uyOytNMoZq8i01YLpjAJXNgc0aeV_lFkQUYXijLONNKnloFT_jPBVJ6q0yGAGWGvv7Y3pvXo1otwbYov_x4pDRsT3SMBjn6Gvmlvh-_HX3K7fzDh8oyW3LBQLVEcMdMaFXiMZ_KgVBecVYR-PFbhWz4On_cu6DGSiRlq7fwF9xdcV9MOzzjCE7NHJEB",
  },
  {
    name: "Brazil",
    alt: "Brazil Flag",
    dataAlt: "Flag of Brazil",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVKAd7sTnLS8HQHKltyq7ppCu9NNo54XQP7ckKvAhHMDBuKM1wjPOF0ieRsB4AvxzhdUjr7dSJo781QLqnU7BQRL4bFLKgS-ltTGdvcThqDkcudfLWHB6QiIhSd5p-sTqoLiWv7SYklUDBBBQ1BYM66DupzA3vqbfIfXbIh2-mPccQqlnvCZynVsRKoF1KvDhj-_VqOaLSXmHUQJttSO6byXpkdOHt0BxRPU_fziJpHtQR0x-t3VxpC17OrEeRMbld6MqsZfImAoGQ",
  },
  {
    name: "Ghana",
    alt: "Ghana Flag",
    dataAlt: "Flag of Ghana",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBNivFtVQPlSQGdXT_g_cNgkOjhq38HE8PbbvKk1JvX9ut2On7cyon14Oh_vOgQOqs8hsmDc682lOPOyJJ1EAN9zNs_5Ee5puq3Gf8lOWJWme3IdECL_OGG32Hz7zmfjet5q3RENo8v6bcFxtAlH-MgyFEmpVDFgUEYrm-YO_fBWkqVHl-HavDvAl-uLnpQ2lPHgyMOJDRcgC_RRixputArDuUozrMiyuN2g6OqBfsfmP9ZxpYLL2awcuvUwq_MM-yb2TWx0tLofTC",
  },
  {
    name: "South Africa",
    alt: "South Africa Flag",
    dataAlt: "Flag of South Africa",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAg1mYDyd90ktyEbib3jxSfcxLLKj6_j3zBCYbutIawz_R4NU_ScvBFmN2Ol4tvMGPKvFXPDxF9FkPpvtnJMvqmmfvhbux2mKaGHYOn5H0UyiKGQ_dsV12EXXddhVShaFop24FT9-CRLyAhCyqwXp0cHbL4CXeWGa0hZqfGlL4k--vxV0Xz3eW7b-EoX15foW9okDVN7gvaHWZ2GtgXQEebYibf0Du4worrSM6bdkkhKTs5IZycAxeb8Y2wJfMfcDJFA4RMZrbwH1km",
  },
  {
    name: "Colombia",
    alt: "Colombia Flag",
    dataAlt: "Flag of Colombia",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKK_ovYRaw5jD2mgEKz4z-_gva1wWNItimsjb9VZSzBDYllh1Y2guz_-6Az9U2i0Je8efxdUr9H3Mr3hYkWaqlIHzEXw6hYr9wGadP8wOk9WwYMyV_w9UczJjc1cUddsst2J2Li1A6zVge0afhCL6zLShcByIIawLChCClj5Arp2PKLqgKeHiISXobNJLQdx4ooHZaWWKiC35umefHu0aK5TRetwOWrSGNDA_bQPmfQFo4R_TNB7GBcEpUudlGEDTYpfQRJxDc1o7F",
  },
  {
    name: "UK",
    alt: "UK Flag",
    dataAlt: "Flag of United Kingdom",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMxFQNEVsd4tdL0BT1II73FJb6QkAwLAy4zRJ4I96QCjmpgQWsx8xcz_BifM9WQf2BL7ZKTIl71Cu0DsTqdnsNmT3s-GLmmwVCSSRKc2oSxDP2Wl_rtMj80tVCKs2ju8n8lK5VRYK4aeiCUdpXinW5x7Hf8DsQHDJjVr0fLHwjqsEZWqr9EbeV-WLlSSXcKi_K5n6Gk5_HaHC1tPaUFjHI2xfdjjEnkFG2L_YPBCZysOLOeEfGGWv3c-8m44Wg3f24KJ8GpB8J-hSr",
  },
  {
    name: "Japan",
    alt: "Japan Flag",
    dataAlt: "Flag of Japan",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHzWEGmvdNQuhbj1OggDdgaKJpWy2KLq5Z_78RhqlUTqyLnJHqX4toPxrCCGV4jTKLYIXUuG0iRR5tNmSn-3EFtgTYenCpGW_N8JR2yLRAIaTQzF58DftJ5K0S8OVW1ijgHoKRC1c21bDy4yKmvtGgJ48rlSKaa_vgHYAtVAdOU6rgcUPn-9Cauz6UIwxA9TTV_0KL6233CpKjLFRukg8O4Gjbq-0ZIV3FEW6KhLfzsf9ABVhYsMh5LwvSrhSJRcLLUpAM2t0uFn5v",
  },
  {
    name: "UAE",
    alt: "UAE Flag",
    dataAlt: "Flag of UAE",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK_QtLQfCGIANQ-2IY8ulVnXlVNgYZfYFRZJeXBsQKqqnO235NGs7yLCIPBcISBtjshjWro1ImUeVIrJ9aN9D_4h8peJBYWTQQ2exYp1vfPx_2L079b3XujrDJUMwPLRcBHmraA0kF0UdOXMTMrk3pc6yNwWekuDFpPFo3nvxxY3ziyX4QvPN1xv5M2bc2YGYEdXIhg450w2A_XZrvWNa6sN0-Mzwx8n2AOJOuV_Qerl-Abz94hnDFYZlTljF-lWiuFDghVGfGWJEf",
  },
  {
    name: "Argentina",
    alt: "Argentina Flag",
    dataAlt: "Flag of Argentina",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkiPe0SfvjqI6QGRwgITP4qFuD1O7LQQ2cvxDm5H7ZXcp_Hb8MQCIIwIv0VCRFWSIv1HJI1hXa0bhleYJb2tOrHifXcLsrzWJmiI_y9-KfRrlzTb54rF4J1-3guo2fxzxIGwDVy3eBHW95siK2J3qorllKJ6fmpN3c9_EfH9wdJBcKvT3RJYegKvqqalfO2utIhTe52inTVIsSLxwDSw1vX665rYt_3T_3SmkOI-jIhF21kFTj27U9t-iXm2smpr_rgYpyLJog_8wh",
  },
  {
    name: "Mexico",
    alt: "Mexico Flag",
    dataAlt: "Flag of Mexico",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuOSWdHshVbJafR33ijRQlz-wlgoOqMk2Zq1bRVy3dgjVw36bb8unzVABtG2guPu6wZKg85qLnCUatKX-kvnzuGHGB3-HlrLTgtnm2iNczTyzKRofqIwRcUVMI4sCcHSH7Xa8X0TroN2jZ53-MtFaL5CBvI6zmE9WSq6-_kD7xAfyPHZCTUHYcJSr7wlhIhcUSDu3D_RXGR7JoX1SUeWXuJYpSASj9DXYK6GhzpLuGEqiSBrl3O9MMq0_OpVo_GQZO2s1wJXpRv7Yt",
  },
  {
    name: "Egypt",
    alt: "Egypt Flag",
    dataAlt: "Flag of Egypt",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0N0_7OJvvXKmIPYIo5DwmqsOdH2gCRXMEDLgvClNTfApde7piuQCTJTOZYPJZHBOFHIWvtWaR-5-mWHWLbCY7vpDZ6JEfxxil0IJsEZmwi_9hM4v2J8G3K9mC9zpUWt3MRqddK2FPmNqRTujGUu2oi_rlB9vosfMCONRrs2XuxC5DzTGosoS9WjmmtYCgLAEVrBrAcvVcsI6weWu1ejWU8gGDhI5joopTguRZKcYJB7vTha_O-Hn9xtpJywz0Y0lMoMuEwAwXq8l8",
  },
  {
    name: "India",
    alt: "India Flag",
    dataAlt: "Flag of India",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxDZBDbm1FjOWCoxhxDDV_7Uzn-SDe7wSV9LdMWgGIiOoclvIstDOKtLOu5Bk59osAWV7xpYC9cxwhH2SvB3PzTL4FBhufVfeeZ-SuFiYLhkox2vSgQ0CBqI-5cXDGjmW4ZWN8kJU-PW3zZrz-EKeLKImYeAvbJvkeNKhggMb123V5BBsg3TcGjj_hYmMoWJ9sAPw2k_aJf1CAuwGQL9NuHuLLybhJiGc9D1FshfQj61vTZlDJlyiTTFecfIqHTwBtsLTTNZjwhmeC",
  },
  {
    name: "Vietnam",
    alt: "Vietnam Flag",
    dataAlt: "Flag of Vietnam",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjCTnn5mu-0CJGgXZvvbgw7qaeg5My_o-krD0EPam7csd1nZIR_GIoLVqwhszMScCfgTkyYUXCcokd9b0Kc3QWZaZXdcZ8GVY9cyGowMaEtJprb4UTcc52cOBKq_bJHEQK9d8HaMdlHDSpgMBzKVd8RS9b0y6-R-uAgGBnvlLG9eH9nKx0rKddlQUSWCL-q7UidHZK8jmq9tVdQUOtM9Dkwht2GuHJlTXsp86w8q6awJ-UvZy8qICKNGViHaeVEVmC4vPbWCSkiidu",
  },
];

export const currencySectionContent = {
  title: "Borderless from day one.",
  subtitle: "Direct corridors to 15+ emerging and developed economies.",
  ctaText: "View all corridors",
};

export const feeComparisonContent = {
  title: "No contest.",
  subtitle:
    "The data speaks for itself. We've eliminated the friction of moving value.",
};

export interface FeeRow {
  provider: string;
  fee: string;
  speed: string;
  transparency: string;
  highlighted: boolean;
}

export const feeRows: FeeRow[] = [
  {
    provider: "Sarafu",
    fee: "$0.001",
    speed: "2 Seconds",
    transparency: "100% Private (Venice AI)",
    highlighted: true,
  },
  {
    provider: "Wise",
    fee: "$4+",
    speed: "1+ Day",
    transparency: "Transparent but slower",
    highlighted: false,
  },
  {
    provider: "Western Union",
    fee: "$14+",
    speed: "3+ Days",
    transparency: "6.35% Global Avg Cost",
    highlighted: false,
  },
  {
    provider: "Bank Wire",
    fee: "$25+",
    speed: "5+ Days",
    transparency: "Manual and slow",
    highlighted: false,
  },
];

export const privacyContent = {
  badge: "Privacy by Venice AI",
  title: "Your financial data is processed and forgotten.",
  attestationLabel: "TEE Attestation Active",
  attestationValue: "0x4F...92: Computation Verified by Secure Enclave",
  features: [
    {
      icon: "verified_user",
      title: "Zero Data Retention",
      description:
        "We never store your personal data, transaction history, or intents. Your path is your own.",
    },
    {
      icon: "shield",
      title: "TEE Attestation",
      description:
        "Our AI runs in Trusted Execution Environments, ensuring no human can ever peek inside the computation.",
    },
  ],
};

export const ctaContent = {
  title: "Ready to send?",
  subtitle: "Experience the invisible global banking system today.",
  buttonText: "Try Sarafu",
  disclaimer: "No credit card required. Only Celo-compatible wallet needed.",
};

export const footerContent = {
  brand: "Sarafu",
  tagline:
    "Sovereign remittances powered by Venice AI. Decentralizing the flow of value for everyone, everywhere.",
  copyright: "\u00a9 2024 Sarafu. Sovereign remittances powered by Venice AI.",
  columns: [
    {
      title: "Platform",
      links: [
        { label: "How it Works", href: "#" },
        { label: "Supported Currencies", href: "#" },
        { label: "Security Model", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "API Documentation", href: "#" },
        { label: "Network Status", href: "#" },
        { label: "Support Center", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ],
  socialIcons: ["public", "shield", "code"],
};
