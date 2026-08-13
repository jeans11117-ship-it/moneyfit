import type { Metadata } from "next";
import Link from "next/link";
import { HomeRecent } from "@/components/home/HomeRecent";

export const metadata: Metadata = {
  title: "내 월급으로 어디까지 가능할까?",
  description: "연봉과 자산을 기준으로 내 집 마련 가능금액과 DSR을 쉽고 빠르게 계산하는 생활 금융 시뮬레이션, 머니핏.",
  alternates: { canonical: "/" },
};

const calculators = [
  { icon: "집", title: "내 연봉으로 살 수 있는 집", copy: "소득·현금·대출을 함께 반영한 현실적인 주택 예산", href: "/calculator/house-budget", active: true, tone: "mint" },
  { icon: "%", title: "DSR 계산기", copy: "모든 대출의 연간 원리금과 소득 대비 부담을 한눈에", href: "/calculator/dsr", active: true, tone: "blue" },
  { icon: "₩", title: "주택담보대출 계산기", copy: "상환 방식별 월 납입금과 총이자 비교", active: false, tone: "violet" },
  { icon: "입", title: "분양 필요자금 계산기", copy: "계약부터 입주까지 시점별 필요 현금", active: false, tone: "orange" },
  { icon: "월", title: "연봉 실수령액 계산기", copy: "4대 보험과 세금을 반영한 예상 월급", active: false, tone: "sky" },
  { icon: "차", title: "내 연봉에 맞는 자동차", copy: "생활비와 저축을 지키는 적정 구매 가격", active: false, tone: "rose" },
  { icon: "↗", title: "주식 수익률 계산기", copy: "현재 손익과 목표·손절 가격 시뮬레이션", active: false, tone: "green" },
];

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "머니핏",
    url: "https://moneyfit.kr",
    description: "직장인을 위한 생활 금융 계산기",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="hero-pill">생활 금융 시뮬레이션</span>
            <h1 className="display">내 월급으로<br /><em>어디까지 가능할까?</em></h1>
            <p>연봉, 집, 자동차, 투자까지<br />복잡한 돈 계산을 쉽고 빠르게 확인하세요.</p>
            <Link className="primary-button hero-cta" href="/calculator/house-budget">내 돈 계산해보기 <span aria-hidden="true">→</span></Link>
            <div className="hero-trust"><span>✓ 로그인 없이 바로</span><span>✓ 입력정보 저장 안 함</span><span>✓ 2026년 기준</span></div>
          </div>
          <div className="hero-visual" aria-label="머니핏 계산 결과 미리보기">
            <div className="visual-top"><span>내 집 마련 가능금액</span><span className="live-dot">계산 완료</span></div>
            <p>내가 감당 가능한 예상 집값</p>
            <strong>4억 8,000만원</strong>
            <div className="visual-bar"><span style={{ width: "67%" }} /></div>
            <div className="visual-metrics">
              <div><span>예상 주담대</span><b>3억 2,000만원</b></div>
              <div><span>월 예상 상환액</span><b>143만 2,532원</b></div>
            </div>
            <div className="floating-note">현금과 DSR을 함께 계산했어요</div>
          </div>
        </div>
      </section>

      <HomeRecent />

      <section className="section calculator-section" id="calculators">
        <div className="container">
          <div className="section-heading-row">
            <div><span className="eyebrow">MONEY TOOLS</span><h2 className="section-title">지금 필요한 계산부터</h2><p className="section-copy">숫자를 넣으면 결과의 의미까지 함께 알려드려요.</p></div>
            <span className="tool-count">7가지 생활 금융 도구</span>
          </div>
          <div className="calculator-cards">
            {calculators.map((calculator) => calculator.active ? (
              <Link key={calculator.title} href={calculator.href!} className={`calculator-card ${calculator.tone}`}>
                <span className="calculator-icon" aria-hidden="true">{calculator.icon}</span>
                <div><h3>{calculator.title}</h3><p>{calculator.copy}</p></div>
                <span className="card-arrow" aria-hidden="true">→</span>
              </Link>
            ) : (
              <article key={calculator.title} className={`calculator-card ${calculator.tone} upcoming`}>
                <span className="calculator-icon" aria-hidden="true">{calculator.icon}</span>
                <div><span className="coming-label">순차 공개</span><h3>{calculator.title}</h3><p>{calculator.copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section how-section">
        <div className="container how-grid">
          <div><span className="eyebrow">WHY MONEYFIT</span><h2 className="section-title">계산보다 중요한 건<br />가능한 선택을 아는 것</h2></div>
          <div className="how-list">
            <div><span>01</span><h3>조건을 함께 봅니다</h3><p>연봉 하나만 보지 않고 현금, 기존 대출, 금리와 기간을 함께 반영합니다.</p></div>
            <div><span>02</span><h3>결과를 쉽게 풉니다</h3><p>큰 숫자와 단계별 해석으로 지금 가장 중요한 기준을 빠르게 파악합니다.</p></div>
            <div><span>03</span><h3>다음 계산으로 이어집니다</h3><p>집 예산에서 DSR로, 다시 대출 상환 계획으로 자연스럽게 연결됩니다.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
