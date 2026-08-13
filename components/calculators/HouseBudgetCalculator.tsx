"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { FINANCIAL_RULES } from "@/config/financialRules";
import { calculateHouseBudget, type HouseBudgetResult } from "@/lib/calculators/houseBudgetCalculator";
import { formatKoreanMoney, manwonToWon } from "@/utils/formatMoney";
import { MoneyInput } from "@/components/ui/MoneyInput";
import { NumberInput } from "@/components/ui/NumberInput";
import { CalculatorActions } from "@/components/ui/CalculatorActions";
import { RecentTracker } from "@/components/ui/RecentTracker";

const defaults = {
  income: 6000,
  cash: 15000,
  debtBalance: 3000,
  debtMonthly: 45,
  rate: FINANCIAL_RULES.housing.defaultMortgageRatePercent,
  years: FINANCIAL_RULES.housing.defaultTermYears,
  ltv: FINANCIAL_RULES.housing.defaultLtvPercent,
  dsr: FINANCIAL_RULES.dsr.defaultLimitPercent,
};

export function HouseBudgetCalculator() {
  const [form, setForm] = useState(defaults);
  const [result, setResult] = useState<HouseBudgetResult | null>(null);

  const update = (key: keyof typeof form) => (value: number) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setResult(calculateHouseBudget({
      annualIncomeWon: manwonToWon(form.income), cashWon: manwonToWon(form.cash), existingLoanBalanceWon: manwonToWon(form.debtBalance),
      existingMonthlyPaymentWon: manwonToWon(form.debtMonthly), mortgageRatePercent: form.rate, termYears: form.years,
      ltvPercent: form.ltv, dsrLimitPercent: form.dsr,
    }));
  };

  const constraintText = result?.bindingConstraint === "income" ? "현재는 소득 대비 원리금 부담(DSR)이 한도를 결정하고 있어요." : result?.bindingConstraint === "cash" ? "현재는 보유 현금이 가능한 집값을 결정하는 가장 큰 기준이에요." : "현재는 적용한 LTV 기준이 대출 한도를 결정하고 있어요.";

  return (
    <>
      <RecentTracker item={{ slug: "house-budget", name: "내 집 마련 가능금액", href: "/calculator/house-budget" }} />
      <div className="calculator-grid">
        <form className="card form-card form-grid" onSubmit={submit}>
          <div className="form-title"><span>나의 조건</span><small>만원 단위로 입력하세요</small></div>
          <MoneyInput id="income" label="연봉" value={form.income} onChange={update("income")} hint="세전 연소득 기준" />
          <MoneyInput id="cash" label="보유 현금" value={form.cash} onChange={update("cash")} hint="주택 구입에 실제 사용할 수 있는 금액" />
          <div className="field-row">
            <MoneyInput id="debt-balance" label="기존 대출 잔액" value={form.debtBalance} onChange={update("debtBalance")} />
            <MoneyInput id="debt-monthly" label="기존 월 상환액" value={form.debtMonthly} onChange={update("debtMonthly")} suffix="만원/월" />
          </div>
          <div className="field-row">
            <NumberInput id="mortgage-rate" label="예상 주담대 금리" value={form.rate} onChange={update("rate")} suffix="%" max={20} />
            <NumberInput id="term" label="대출 기간" value={form.years} onChange={update("years")} suffix="년" max={50} step={1} />
          </div>
          <div className="field-row">
            <NumberInput id="ltv" label="LTV" value={form.ltv} onChange={update("ltv")} suffix="%" max={100} step={1} />
            <NumberInput id="dsr" label="DSR 기준" value={form.dsr} onChange={update("dsr")} suffix="%" max={100} step={1} />
          </div>
          <button className="primary-button calculate-button" type="submit">내 집 마련 가능금액 계산하기</button>
          <p className="rule-caption">현재 적용 기준: {FINANCIAL_RULES.effectiveYear}년 · 원리금균등 상환 가정</p>
        </form>

        <div className="result-sticky" aria-live="polite">
          <section className="card result-card">
            {!result ? (
              <div className="result-empty"><div><div className="result-empty-mark">₩</div><strong>나의 조건을 입력해 보세요</strong><p>현금, LTV, DSR을 함께 반영해<br />현실적인 주택 예산을 계산합니다.</p></div></div>
            ) : (
              <div className="result-content">
                <div className="result-heading"><div><span className="result-kicker">계산 결과</span><h2>내 집 마련 예산</h2></div><span className="result-badge">참고용</span></div>
                <div className="metric-grid">
                  <div className="metric primary"><span className="metric-label">내가 감당 가능한 예상 집값</span><div className="metric-value">{formatKoreanMoney(result.maxHousePriceWon)}</div><small>추천 범위 {formatKoreanMoney(result.recommendedMinWon)} ~ {formatKoreanMoney(result.recommendedMaxWon)}</small></div>
                  <div className="metric"><span className="metric-label">예상 주담대</span><div className="metric-value">{formatKoreanMoney(result.maxMortgageWon)}</div></div>
                  <div className="metric"><span className="metric-label">필요 자기자본</span><div className="metric-value">{formatKoreanMoney(result.ownCapitalWon)}</div></div>
                  <div className="metric"><span className="metric-label">월 예상 상환액</span><div className="metric-value">{formatKoreanMoney(result.monthlyPaymentWon)}</div></div>
                  <div className="metric"><span className="metric-label">취득 관련 비용</span><div className="metric-value">약 {formatKoreanMoney(result.acquisitionCostsWon)}</div></div>
                </div>
                <div className="insight-box"><span aria-hidden="true">i</span><p><strong>결과 해석</strong>{constraintText} 추천 범위 안에서 예산을 잡으면 금리 상승이나 이사 비용에 대비할 여유를 확보하기 좋습니다.</p></div>
                {result.maxHousePriceWon === 0 && <p className="error-note">현재 입력 조건에서는 DSR 범위 안의 신규 대출 여력이 없습니다. 기존 월 상환액이나 목표 LTV를 확인해 주세요.</p>}
                <CalculatorActions slug="house-budget" name="내 집 마련 가능금액" shareParams={{ rate: form.rate, years: form.years, ltv: form.ltv, dsr: form.dsr }} />
              </div>
            )}
          </section>
          {result && <Link className="next-calculator" href="/calculator/dsr"><span><small>다음 계산</small><b>내 DSR을 더 자세히 확인하기</b></span><span aria-hidden="true">→</span></Link>}
        </div>
      </div>
    </>
  );
}
