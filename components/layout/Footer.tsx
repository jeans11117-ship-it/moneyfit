import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">머니핏</div>
          <p>직장인의 돈 계산을 더 쉽게.</p>
        </div>
        <nav className="footer-links" aria-label="하단 메뉴">
          <Link href="/calculator/house-budget">계산기</Link>
          <Link href="/about">서비스 소개</Link>
          <Link href="/terms">이용약관</Link>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/contact">문의</Link>
          <Link href="/disclaimer">면책 고지</Link>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p>이 사이트의 계산 결과는 참고용이며 실제 금융기관, 세무기관, 정부기관의 산정 결과와 다를 수 있습니다.</p>
        <span>© MoneyFit. All rights reserved.</span>
      </div>
    </footer>
  );
}
