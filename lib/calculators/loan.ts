/** 원리금균등 방식의 월 납입액을 계산합니다. */
export function calculateMonthlyPayment(principal: number, annualRatePercent: number, years: number): number {
  if (!Number.isFinite(principal) || principal <= 0 || !Number.isFinite(years) || years <= 0) return 0;
  const months = Math.max(1, Math.round(years * 12));
  const monthlyRate = Math.max(0, annualRatePercent) / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  const factor = (1 + monthlyRate) ** months;
  const payment = principal * (monthlyRate * factor) / (factor - 1);
  return Number.isFinite(payment) ? payment : 0;
}

/** 감당 가능한 월 납입액을 기준으로 대출 원금을 역산합니다. */
export function calculatePrincipalFromPayment(monthlyPayment: number, annualRatePercent: number, years: number): number {
  if (!Number.isFinite(monthlyPayment) || monthlyPayment <= 0 || !Number.isFinite(years) || years <= 0) return 0;
  const months = Math.max(1, Math.round(years * 12));
  const monthlyRate = Math.max(0, annualRatePercent) / 100 / 12;
  if (monthlyRate === 0) return monthlyPayment * months;
  const factor = (1 + monthlyRate) ** months;
  const principal = monthlyPayment * (factor - 1) / (monthlyRate * factor);
  return Number.isFinite(principal) ? principal : 0;
}
