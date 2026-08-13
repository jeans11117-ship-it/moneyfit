/** 금융 규정은 정책 변경에 대응할 수 있도록 계산식과 분리합니다. */
export const FINANCIAL_RULES = {
  effectiveYear: 2026,
  dsr: {
    defaultLimitPercent: 40,
    safePercent: 30,
    cautionPercent: 40,
    additionalLoanRatePercent: 4.2,
    additionalLoanTermYears: 30,
  },
  housing: {
    defaultLtvPercent: 70,
    defaultMortgageRatePercent: 4.2,
    defaultTermYears: 30,
    maxSearchPriceWon: 5_000_000_000,
    acquisitionCostBands: [
      { upToWon: 600_000_000, rate: 0.022 },
      { upToWon: 900_000_000, rate: 0.032 },
      { upToWon: Number.POSITIVE_INFINITY, rate: 0.042 },
    ],
  },
} as const;
