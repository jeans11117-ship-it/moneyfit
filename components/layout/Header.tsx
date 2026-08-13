"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
  { label: "홈", href: "/" },
  { label: "내 집 마련", href: "/calculator/house-budget" },
  { label: "DSR", href: "/calculator/dsr" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="머니핏 홈">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span>머니핏</span>
        </Link>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          <span aria-hidden="true">{open ? "닫기" : "메뉴"}</span>
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" className="mobile-nav" aria-label="모바일 메뉴">
          <div className="container">
            {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<span aria-hidden="true">→</span></Link>)}
          </div>
        </nav>
      )}
    </header>
  );
}
