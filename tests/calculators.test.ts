import assert from "node:assert/strict";
import test from "node:test";
import { calculateMonthlyPayment } from "../lib/calculators/loan.ts";
import { calculateDsr } from "../lib/calculators/dsrCalculator.ts";
import { calculateHouseBudget } from "../lib/calculators/houseBudgetCalculator.ts";

test("원리금균등 월 납입액은 유효한 양수로 계산된다", () => {
  const payment = calculateMonthlyPayment(300_000_000, 4.2, 30);
  assert.ok(payment > 1_400_000 && payment < 1_500_000);
});

test("0원과 잘못된 기간은 안전하게 0을 반환한다", () => {
  assert.equal(calculateMonthlyPayment(0, 4, 30), 0);
  assert.equal(calculateMonthlyPayment(100_000_000, 4, 0), 0);
  assert.equal(calculateMonthlyPayment(Number.NaN, 4, 30), 0);
});

test("DSR은 모든 대출의 연간 원리금을 합산한다", () => {
  const result = calculateDsr(60_000_000, [
    { name: "주택담보대출", principalWon: 200_000_000, ratePercent: 4, years: 30 },
    { name: "신용대출", principalWon: 20_000_000, ratePercent: 6, years: 5 },
  ]);
  assert.ok(result.dsrPercent > 0);
  assert.equal(result.loans.length, 2);
  assert.ok(Number.isFinite(result.additionalLoanCapacityWon));
});

test("연소득 0원도 Infinity 없이 처리한다", () => {
  const result = calculateDsr(0, [{ name: "대출", principalWon: 10_000_000, ratePercent: 5, years: 3 }]);
  assert.equal(result.dsrPercent, 0);
  assert.ok(Number.isFinite(result.dsrPercent));
});

test("주택 예산은 현금과 대출 제약을 동시에 만족한다", () => {
  const result = calculateHouseBudget({
    annualIncomeWon: 60_000_000,
    cashWon: 150_000_000,
    existingLoanBalanceWon: 30_000_000,
    existingMonthlyPaymentWon: 450_000,
    mortgageRatePercent: 4.2,
    termYears: 30,
    ltvPercent: 70,
    dsrLimitPercent: 40,
  });
  assert.ok(result.maxHousePriceWon > 0);
  assert.ok(result.maxMortgageWon <= result.maxHousePriceWon * 0.7 + 1);
  assert.ok(Number.isFinite(result.monthlyPaymentWon));
});
