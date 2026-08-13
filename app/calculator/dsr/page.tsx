import type { Metadata } from "next";
import Link from "next/link";
import { DsrCalculator } from "@/components/calculators/DsrCalculator";
import { AdSlot } from "@/components/ads/AdSlot";

export const metadata: Metadata = {
  title: "DSR 계산기 2026 | 연봉별 대출 한도 쉽게 계산",
  description: "연봉과 주택담보대출, 신용대출, 자동차 할부를 입력하면 예상 DSR과 연간 원리금, 추가 대출 여력을 간편하게 계산합니다.",
  alternates: { canonical: "/calculator/dsr" },
  openGraph: { title: "DSR 계산기 2026 | 머니핏", description: "연봉과 기존 대출로 예상 DSR과 추가 대출 여력을 확인하세요." },
};

const faqs = [
  ["DSR 40%는 어떤 의미인가요?", "연소득이 6천만원이라면 모든 대출의 연간 원리금 합계가 2천4백만원 수준이라는 뜻입니다. 금융기관은 규제와 대출 종류에 따라 다른 기준을 적용할 수 있습니다."],
  ["신용대출도 DSR에 포함되나요?", "네. 주택담보대출뿐 아니라 신용대출, 자동차 할부, 카드론 등 원리금 상환 의무가 있는 부채가 포함될 수 있습니다."],
  ["전세대출과 중도금대출도 모두 입력해야 하나요?", "상품과 정책에 따라 DSR 산정 포함 여부나 방식이 다릅니다. 실제 심사 전에는 해당 금융기관의 적용 방식을 확인하고, 보수적인 계획을 위해 월 상환 부담이 있는 대출은 함께 점검하는 것이 좋습니다."],
  ["추가 대출 가능금액은 실제 한도인가요?", "아닙니다. 남은 DSR 여력을 연 4.2%, 30년 원리금균등 대출로 단순 환산한 참고값입니다. 담보가치, 신용점수, 스트레스 금리와 금융기관 심사가 추가됩니다."],
  ["DSR을 낮추려면 어떻게 해야 하나요?", "금리가 높은 단기 대출부터 상환하거나 기간을 조정하면 연간 원리금이 줄 수 있습니다. 다만 기간을 늘리면 총이자가 커질 수 있어 두 값을 함께 비교해야 합니다."],
];

export default function DsrPage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: "https://moneyfit.kr" }, { "@type": "ListItem", position: 2, name: "DSR 계산기", item: "https://moneyfit.kr/calculator/dsr" }] },
    { "@context": "https://schema.org", "@type": "WebApplication", name: "DSR 계산기", applicationCategory: "FinanceApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero"><div className="container"><div className="breadcrumb"><Link href="/">홈</Link><span>›</span><span>부동산</span><span>›</span><span>DSR</span></div><span className="eyebrow">DEBT SERVICE RATIO</span><h1>DSR 계산기</h1><p className="section-copy">주택담보대출부터 자동차 할부까지, 모든 대출의 연간 원리금을 더해 소득 대비 부담을 확인하세요.</p></div></section>
      <section className="calculator-area"><div className="container"><DsrCalculator /></div></section>
      <section className="section"><div className="container"><AdSlot position="calculator-bottom" /></div></section>
      <section className="section info-section"><div className="container"><article className="card content-card prose">
        <h2>DSR이란 무엇인가요?</h2>
        <p>DSR은 총부채원리금상환비율을 뜻하며, 한 해 동안 갚아야 하는 모든 대출의 원금과 이자를 연소득으로 나눈 값입니다. 예를 들어 연소득이 6천만원이고 연간 원리금이 1천8백만원이라면 예상 DSR은 30%입니다. 주택담보대출만 보는 지표가 아니라 신용대출, 자동차 할부와 기타 부채까지 종합해 상환 능력을 확인한다는 점이 핵심입니다.</p>
        <h2>DSR 40%의 실제 의미</h2>
        <p>DSR 40%는 소득의 40%가 대출 원리금 상환에 쓰인다는 의미입니다. 다만 40% 이하라고 해서 반드시 안전하거나 대출 승인이 보장되는 것은 아닙니다. 세후 월급에서 생활비, 보험료, 교육비와 저축을 제외하면 실제 가처분소득은 더 작기 때문입니다. 머니핏은 30% 이하를 안정, 30% 초과 40% 이하를 주의, 40% 초과를 위험 구간으로 나누지만 이는 이해를 돕기 위한 생활 금융 기준입니다.</p>
        <AdSlot position="content-middle" />
        <h2>대출마다 기간과 금리를 따로 입력해야 하는 이유</h2>
        <p>같은 3천만원 대출도 3년에 갚는 경우와 10년에 갚는 경우의 연간 원리금은 크게 다릅니다. 금리가 높을수록 이자 부담도 커집니다. 따라서 전체 잔액에 평균 금리 하나를 적용하면 DSR이 실제보다 낮거나 높게 왜곡될 수 있습니다. 주택담보대출, 신용대출, 자동차 할부와 기타 대출을 구분하고 각각의 남은 기간과 현재 금리를 입력해야 현재 현금흐름에 가까운 결과를 얻을 수 있습니다.</p>
        <h2>은행 심사와 차이가 생기는 이유</h2>
        <p>실제 금융기관은 인정소득, 대출별 만기 산정 방식, 스트레스 DSR, 거치기간, 변동금리 여부와 정책상 예외를 반영합니다. 또한 신용점수와 담보가치, 금융기관 내부 한도도 함께 봅니다. 계산 결과는 대출 상담 전 부채 구조를 점검하고 여러 시나리오를 비교하는 용도로 활용하세요. 금리를 1~2%포인트 올려 다시 계산하면 금리 상승 시 부담을 미리 확인할 수 있습니다.</p>
      </article></div></section>
      <section className="section faq-section"><div className="container content-card card"><span className="eyebrow">FAQ</span><h2 className="section-title">DSR 자주 묻는 질문</h2><div className="faq">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div><div style={{ marginTop: 28 }}><AdSlot position="faq-bottom" /></div></div></section>
      <section className="section related-section"><div className="container related-banner"><div><span>한 단계 더</span><h2>현재 DSR로 가능한 집값을 계산해 보세요</h2></div><Link className="primary-button" href="/calculator/house-budget">내 집 예산 계산하기 →</Link></div></section>
    </>
  );
}
