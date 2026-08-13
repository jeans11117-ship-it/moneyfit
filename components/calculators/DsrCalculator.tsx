"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { calculateDsr, type DsrResult } from "@/lib/calculators/dsrCalculator";
import { formatKoreanMoney, manwonToWon } from "@/utils/formatMoney";
import { FINANCIAL_RULES } from "@/config/financialRules";
import { MoneyInput } from "@/components/ui/MoneyInput";
import { NumberInput } from "@/components/ui/NumberInput";
import { CalculatorActions } from "@/components/ui/CalculatorActions";
import { RecentTracker } from "@/components/ui/RecentTracker";

type LoanKey = "mortgage" | "credit" | "car" | "other";
const loanLabels: Record<LoanKey, string> = { mortgage: "주택담보대출", credit: "신용대출", car: "자동차 할부", other: "기타 대출" };
type LoanForm = { amount: number; rate: number; years: number };

export function DsrCalculator() {
  const [income, setIncome] = useState(6000);
  const [loans, setLoans] = useState<Record<LoanKey, LoanForm>>({
    mortgage: { amount: 25000, rate: 4.2, years: 30 }, credit: { amount: 2000, rate: 6.2, years: 5 },
    car: { amount: 1200, rate: 5.5, years: 4 }, other: { amount: 0, rate: 5, years: 5 },
  });
  const [result, setResult] = useState<DsrResult | null>(null);
  const updateLoan = (key: LoanKey, field: keyof LoanForm, value: number) => setLoans((current) => ({ ...current, [key]: { ...current[key], [field]: value } }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setResult(calculateDsr(manwonToWon(income), (Object.keys(loans) as LoanKey[]).map((key) => ({ name: loanLabels[key], principalWon: manwonToWon(loans[key].amount), ratePercent: loans[key].rate, years: loans[key].years }))));
  };
  const statusCopy = result?.status === "안정" ? "소득 대비 원리금 부담이 비교적 안정적인 구간입니다." : result?.status === "주의" ? "DSR 40%에 가까워 금리 상승과 추가 대출을 신중히 살펴야 합니다." : "일반적인 DSR 기준을 넘는 구간입니다. 부채 상환 계획을 먼저 점검해 보세요.";
  const gaugeWidth = Math.min(100, (result?.dsrPercent ?? 0) / 60 * 100);

  return (
    <>
      <RecentTracker item={{ slug: "dsr", name: "DSR 계산기", href: "/calculator/dsr" }} />
      <div className="calculator-grid">
        <form className="card form-card form-grid" onSubmit={submit}>
          <div className="form-title"><span>소득과 대출</span><small>모든 대출을 빠짐없이 입력하세요</small></div>
          <MoneyInput id="annual-income" label="연소득" value={income} onChange={setIncome} hint="세전 연소득 기준" />
          <div className="loan-list">
            {(Object.keys(loans) as LoanKey[]).map((key) => (
              <fieldset className="loan-row" key={key}>
                <legend>{loanLabels[key]}</legend>
                <MoneyInput id={`${key}-amount`} label="잔액" value={loans[key].amount} onChange={(value) => updateLoan(key, "amount", value)} />
                <NumberInput id={`${key}-rate`} label="금리" value={loans[key].rate} onChange={(value) => updateLoan(key, "rate", value)} suffix="%" max={30} />
                <NumberInput id={`${key}-years`} label="남은 기간" value={loans[key].years} onChange={(value) => updateLoan(key, "years", value)} suffix="년" max={50} step={1} />
              </fieldset>
            ))}
          </div>
          <button className="primary-button calculate-button" type="submit">내 DSR 계산하기</button>
          <p className="rule-caption">현재 적용 기준: {FINANCIAL_RULES.effectiveYear}년 · DSR {FINANCIAL_RULES.dsr.defaultLimitPercent}% 비교</p>
        </form>

        <div className="result-sticky" aria-live="polite">
          <section className="card result-card">
            {!result ? <div className="result-empty"><div><div className="result-empty-mark">%</div><strong>대출 조건을 입력해 보세요</strong><p>대출별 원리금을 합산해<br />소득 대비 부담을 보여드립니다.</p></div></div> : (
              <div className="result-content">
                <div className="result-heading"><div><span className="result-kicker">계산 결과</span><h2>나의 예상 DSR</h2></div><span className={`status-chip ${result.status}`}>● {result.status}</span></div>
                <div className="dsr-score"><strong>{result.dsrPercent.toFixed(1)}<small>%</small></strong><span>기준선 40%</span></div>
                <div className="gauge" role="meter" aria-label={`예상 DSR ${result.dsrPercent.toFixed(1)}퍼센트`} aria-valuenow={result.dsrPercent} aria-valuemin={0} aria-valuemax={60}>
                  <div className={`gauge-fill ${result.status}`} style={{ width: `${gaugeWidth}%` }} /><span className="gauge-limit" style={{ left: "66.67%" }}><i />40%</span>
                </div>
                <div className="gauge-labels"><span>안정 0~30%</span><span>주의 30~40%</span><span>위험 40% 초과</span></div>
                <div className="metric-grid dsr-metrics">
                  <div className="metric"><span className="metric-label">연간 원리금</span><div className="metric-value">{formatKoreanMoney(result.annualDebtPaymentWon)}</div></div>
                  <div className="metric"><span className="metric-label">추가 대출 여력 추정</span><div className="metric-value">{formatKoreanMoney(result.additionalLoanCapacityWon)}</div></div>
                </div>
                <div className="insight-box"><span aria-hidden="true">i</span><p><strong>{result.status} 단계</strong>{statusCopy} 추가 대출 여력은 연 4.2%, 30년 원리금균등을 가정한 참고값입니다.</p></div>
                <div className="loan-breakdown"><h3>대출별 연간 원리금</h3>{result.loans.filter((loan) => loan.principalWon > 0).map((loan) => <div key={loan.name}><span>{loan.name}</span><b>{formatKoreanMoney(loan.annualPaymentWon)}</b></div>)}</div>
                <CalculatorActions slug="dsr" name="DSR 계산기" />
              </div>
            )}
          </section>
          {result && <Link className="next-calculator" href="/calculator/house-budget"><span><small>다음 계산</small><b>이 DSR로 살 수 있는 집 확인하기</b></span><span aria-hidden="true">→</span></Link>}
        </div>
      </div>
    </>
  );
}
