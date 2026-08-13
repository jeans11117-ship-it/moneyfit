import type { Metadata } from "next";
import Link from "next/link";
import { HouseBudgetCalculator } from "@/components/calculators/HouseBudgetCalculator";
import { AdSlot } from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "내 연봉으로 살 수 있는 집 계산기 2026",
  description: "연봉, 보유 현금, 기존 대출, LTV와 DSR을 반영해 내가 감당 가능한 집값과 예상 주택담보대출을 계산합니다.",
  alternates: { canonical: "/calculator/house-budget" },
  openGraph: { title: "내 연봉으로 살 수 있는 집 계산기 2026 | 머니핏", description: "소득과 현금, 대출 조건을 함께 반영한 현실적인 내 집 마련 예산" },
};

const faqs = [
  ["계산 결과와 실제 은행 대출 한도가 다른 이유는 무엇인가요?", "은행은 소득 인정 방식, 신용점수, 담보가치, 스트레스 금리, 대출 종류와 규제 지역 등을 추가로 심사합니다. 머니핏은 입력한 DSR·LTV와 원리금균등 조건을 바탕으로 한 사전 시뮬레이션입니다."],
  ["보유 현금은 전부 입력해야 하나요?", "주택 구매에 실제로 사용할 수 있는 금액만 입력하세요. 비상금과 최소 3~6개월 생활비는 제외하는 편이 안전합니다."],
  ["취득 관련 비용에는 무엇이 포함되나요?", "취득세와 지방교육세, 중개보수, 등기 관련 비용 등을 묶어 가격대별 예상 비율로 계산합니다. 주택 수와 면적, 지역에 따라 실제 금액은 달라집니다."],
  ["추천 주택가격 범위가 최대 금액보다 낮은 이유는 무엇인가요?", "최대치는 입력 조건상 가능한 상한에 가깝습니다. 금리 상승, 수리비, 이사비와 생활 변화에 대응할 여유를 위해 최대치의 82~92%를 추천 범위로 보여줍니다."],
];

export default function HouseBudgetPage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: "https://moneyfit.kr" }, { "@type": "ListItem", position: 2, name: "내 집 마련 가능금액", item: "https://moneyfit.kr/calculator/house-budget" }] },
    { "@context": "https://schema.org", "@type": "WebApplication", name: "내 연봉으로 살 수 있는 집 계산기", applicationCategory: "FinanceApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero"><div className="container"><div className="breadcrumb"><Link href="/">홈</Link><span>›</span><span>부동산</span><span>›</span><span>내 집 마련 가능금액</span></div><span className="eyebrow">HOUSE BUDGET</span><h1>내 연봉으로 살 수 있는 집</h1><p className="section-copy">소득만 보지 않습니다. 보유 현금과 기존 대출, LTV와 DSR을 함께 반영해 현실적인 집 예산을 계산해 보세요.</p></div></section>
      <section className="calculator-area"><div className="container"><HouseBudgetCalculator /></div></section>
      <section className="section"><div className="container"><AdSlot position="calculator-bottom" /></div></section>
      <section className="section info-section"><div className="container"><article className="card content-card prose">
        <h2>내 집 마련 가능금액, 왜 연봉만으로 정할 수 없을까요?</h2>
        <p>집을 살 수 있는 금액은 연봉의 몇 배처럼 한 가지 숫자로 정해지지 않습니다. 같은 연봉이라도 보유 현금이 많으면 자기자본 비중을 높일 수 있고, 기존 신용대출이나 자동차 할부의 월 상환액이 크면 새 주택담보대출에 쓸 수 있는 원리금 여력이 줄어듭니다. 머니핏은 현금으로 충당해야 하는 집값과 취득 관련 비용, LTV에 따른 담보대출 상한, DSR에 따른 소득 기반 대출 상한을 동시에 비교해 가장 낮은 지점을 예상 최대 주택가격으로 계산합니다.</p>
        <h2>LTV와 DSR은 어떻게 다를까요?</h2>
        <p>LTV는 주택가격 대비 담보대출 비율입니다. 5억원 주택에 LTV 70%를 적용하면 담보가치 기준 대출 상한은 3억 5천만원입니다. 반면 DSR은 연소득 대비 모든 대출의 연간 원리금 상환액 비율입니다. 담보가 충분해도 기존 대출이 많거나 소득이 낮으면 DSR 때문에 실제 한도가 더 작아질 수 있습니다. 그래서 두 기준 중 하나만 보는 계산은 실제 자금 계획과 차이가 커질 수 있습니다.</p>
        <AdSlot position="content-middle" />
        <h2>최대 금액보다 추천 범위를 보는 이유</h2>
        <p>계산된 최대 집값은 입력한 조건이 유지된다는 가정 아래의 상한선입니다. 실제 주택 매수에는 중개보수, 세금, 법무 비용, 이사와 수리 비용이 따르고 변동금리를 선택하면 월 납입액이 늘 수 있습니다. 비상자금까지 모두 자기자본으로 사용하면 작은 소득 변화에도 생활이 흔들릴 수 있습니다. 머니핏은 최대치보다 낮은 추천 범위를 함께 제시해 계약 이후의 현금흐름까지 고려하도록 돕습니다.</p>
        <h2>결과를 실전 자금 계획으로 바꾸는 방법</h2>
        <p>먼저 보유 현금에서 비상금과 3~6개월 생활비를 제외해 다시 계산하세요. 다음으로 금리를 현재 예상치보다 1%포인트 높여 월 상환액이 감당 가능한지 확인합니다. 마지막으로 DSR 계산기에서 주택담보대출뿐 아니라 신용대출, 자동차 할부와 기타 대출을 각각 입력해 부채 구조를 점검하세요. 이 세 번의 확인을 통과한 가격대라면 보다 안정적인 임장과 매물 비교 기준으로 사용할 수 있습니다.</p>
      </article></div></section>
      <section className="section faq-section"><div className="container content-card card"><span className="eyebrow">FAQ</span><h2 className="section-title">자주 묻는 질문</h2><div className="faq">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div><div style={{ marginTop: 28 }}><AdSlot position="faq-bottom" /></div></div></section>
      <section className="section related-section"><div className="container related-banner"><div><span>계산을 더 정확하게</span><h2>기존 대출을 포함한 DSR을 확인해 보세요</h2></div><Link className="primary-button" href="/calculator/dsr">DSR 계산하기 →</Link></div></section>
    </>
  );
}
