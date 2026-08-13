import { FINANCIAL_RULES } from "../../config/financialRules.ts";
import { calculateMonthlyPayment, calculatePrincipalFromPayment } from "./loan.ts";

export type HouseBudgetInput = {
  annualIncomeWon: number;
  cashWon: number;
  existingLoanBalanceWon: number;
  existingMonthlyPaymentWon: number;
  mortgageRatePercent: number;
  termYears: number;
  ltvPercent: number;
  dsrLimitPercent: number;
};

export type HouseBudgetResult = {
  maxHousePriceWon: number;
  maxMortgageWon: number;
  ownCapitalWon: number;
  monthlyPaymentWon: number;
  acquisitionCostsWon: number;
  recommendedMinWon: number;
  recommendedMaxWon: number;
  debtBalanceWon: number;
  bindingConstraint: "income" | "cash" | "ltv";
};

export function estimateAcquisitionCosts(priceWon: number): number {
  if (!Number.isFinite(priceWon) || priceWon <= 0) return 0;
  const band = FINANCIAL_RULES.housing.acquisitionCostBands.find((item) => priceWon <= item.upToWon)!;
  return priceWon * band.rate;
}

export function calculateHouseBudget(input: HouseBudgetInput): HouseBudgetResult {
  const income = Math.max(0, Number.isFinite(input.annualIncomeWon) ? input.annualIncomeWon : 0);
  const cash = Math.max(0, Number.isFinite(input.cashWon) ? input.cashWon : 0);
  const existingAnnualPayment = Math.max(0, input.existingMonthlyPaymentWon || 0) * 12;
  const dsrBudgetAnnual = Math.max(0, income * Math.max(0, input.dsrLimitPercent) / 100 - existingAnnualPayment);
  const dsrLoanLimit = calculatePrincipalFromPayment(dsrBudgetAnnual / 12, input.mortgageRatePercent, input.termYears);
  const ltv = Math.min(1, Math.max(0, input.ltvPercent / 100));

  // 현금(자기자본+부대비용), LTV, DSR을 모두 만족하는 최고 가격을 이분 탐색합니다.
  let low = 0;
  let high = FINANCIAL_RULES.housing.maxSearchPriceWon;
  for (let i = 0; i < 64; i += 1) {
    const price = (low + high) / 2;
    const loan = Math.min(dsrLoanLimit, price * ltv);
    const cashNeeded = price - loan + estimateAcquisitionCosts(price);
    if (cashNeeded <= cash) low = price;
    else high = price;
  }

  const maxHousePriceWon = Math.floor(low / 10_000) * 10_000;
  const maxMortgageWon = Math.min(dsrLoanLimit, maxHousePriceWon * ltv);
  const acquisitionCostsWon = estimateAcquisitionCosts(maxHousePriceWon);
  const ownCapitalWon = Math.max(0, maxHousePriceWon - maxMortgageWon);
  const cashOnlyLimit = cash / (1 + (maxHousePriceWon <= 600_000_000 ? 0.022 : maxHousePriceWon <= 900_000_000 ? 0.032 : 0.042));
  const bindingConstraint = dsrLoanLimit < maxHousePriceWon * ltv * 0.995 ? "income" : cashOnlyLimit < maxHousePriceWon * 0.995 ? "cash" : "ltv";

  return {
    maxHousePriceWon,
    maxMortgageWon,
    ownCapitalWon,
    monthlyPaymentWon: calculateMonthlyPayment(maxMortgageWon, input.mortgageRatePercent, input.termYears),
    acquisitionCostsWon,
    recommendedMinWon: maxHousePriceWon * 0.82,
    recommendedMaxWon: maxHousePriceWon * 0.92,
    debtBalanceWon: Math.max(0, input.existingLoanBalanceWon || 0),
    bindingConstraint,
  };
}
