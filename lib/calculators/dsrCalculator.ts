import { FINANCIAL_RULES } from "../../config/financialRules.ts";
import { calculateMonthlyPayment, calculatePrincipalFromPayment } from "./loan.ts";

export type LoanInput = { name: string; principalWon: number; ratePercent: number; years: number };
export type DsrResult = {
  dsrPercent: number;
  annualDebtPaymentWon: number;
  additionalLoanCapacityWon: number;
  status: "안정" | "주의" | "위험";
  loans: Array<LoanInput & { annualPaymentWon: number }>;
};

export function calculateDsr(annualIncomeWon: number, loans: LoanInput[], limitPercent = FINANCIAL_RULES.dsr.defaultLimitPercent): DsrResult {
  const income = Math.max(0, Number.isFinite(annualIncomeWon) ? annualIncomeWon : 0);
  const normalized = loans.map((loan) => ({
    ...loan,
    principalWon: Math.max(0, Number.isFinite(loan.principalWon) ? loan.principalWon : 0),
    ratePercent: Math.max(0, Number.isFinite(loan.ratePercent) ? loan.ratePercent : 0),
    years: Math.max(0, Number.isFinite(loan.years) ? loan.years : 0),
    annualPaymentWon: calculateMonthlyPayment(loan.principalWon, loan.ratePercent, loan.years) * 12,
  }));
  const annualDebtPaymentWon = normalized.reduce((sum, loan) => sum + loan.annualPaymentWon, 0);
  const dsrPercent = income > 0 ? annualDebtPaymentWon / income * 100 : 0;
  const remainingAnnual = Math.max(0, income * limitPercent / 100 - annualDebtPaymentWon);
  const additionalLoanCapacityWon = calculatePrincipalFromPayment(
    remainingAnnual / 12,
    FINANCIAL_RULES.dsr.additionalLoanRatePercent,
    FINANCIAL_RULES.dsr.additionalLoanTermYears,
  );
  const status = dsrPercent <= FINANCIAL_RULES.dsr.safePercent ? "안정" : dsrPercent <= FINANCIAL_RULES.dsr.cautionPercent ? "주의" : "위험";
  return { dsrPercent, annualDebtPaymentWon, additionalLoanCapacityWon, status, loans: normalized };
}
