import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const siteUrl = "https://moneyfit.kr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "머니핏 | 직장인 돈 계산을 더 쉽게",
    template: "%s | 머니핏",
  },
  description: "연봉, 집, 자동차, 투자까지 내 월급과 자산으로 어디까지 가능한지 쉽고 빠르게 계산하세요.",
  applicationName: "머니핏",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "머니핏",
    title: "머니핏 | 내 월급으로 어디까지 가능할까?",
    description: "연봉, 집, 자동차, 투자까지 복잡한 돈 계산을 쉽고 빠르게 확인하세요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "머니핏 | 내 월급으로 어디까지 가능할까?",
    description: "직장인을 위한 생활 금융 시뮬레이션",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main-content">본문으로 바로가기</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
