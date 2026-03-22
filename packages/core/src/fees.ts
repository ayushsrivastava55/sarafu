import type { FeeComparison } from "./types.js";

const WORLD_BANK_AVG_PERCENT = 6.35;

export function buildFeeComparison(amount: number, sarafuFeeEstimate = "< $0.001"): FeeComparison {
  const worldBankFee = (amount * WORLD_BANK_AVG_PERCENT) / 100;
  const savings = Math.max(worldBankFee - 0.001, 0);

  return {
    amount,
    worldBankFeeUsd: worldBankFee.toFixed(2),
    worldBankPct: WORLD_BANK_AVG_PERCENT.toFixed(2),
    sarafuFeeEstimate,
    savingsUsd: savings.toFixed(2),
  };
}
