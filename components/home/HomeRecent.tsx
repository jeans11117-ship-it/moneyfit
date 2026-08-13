"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { RecentItem } from "@/components/ui/RecentTracker";

const known: Record<string, RecentItem> = {
  "house-budget": { slug: "house-budget", name: "내 집 마련 가능금액", href: "/calculator/house-budget" },
  dsr: { slug: "dsr", name: "DSR 계산기", href: "/calculator/dsr" },
};

export function HomeRecent() {
  const subscribe = (onChange: () => void) => {
    window.addEventListener("moneyfit-storage", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("moneyfit-storage", onChange);
      window.removeEventListener("storage", onChange);
    };
  };
  const snapshot = useSyncExternalStore(
    subscribe,
    () => `${localStorage.getItem("moneyfit:favorites") ?? "[]"}\n${localStorage.getItem("moneyfit:recent") ?? "[]"}`,
    () => "[]\n[]",
  );
  const [favoriteJson, recentJson] = snapshot.split("\n");
  const favorites = JSON.parse(favoriteJson) as string[];
  const recent = JSON.parse(recentJson) as RecentItem[];
  const items = [...favorites.map((slug) => known[slug]).filter(Boolean), ...recent].filter((item, index, all) => all.findIndex((other) => other.slug === item.slug) === index).slice(0, 3);
  if (!items.length) return null;
  return (
    <section className="recent-section" aria-label="최근 사용한 계산기">
      <div className="container recent-inner">
        <strong>최근·즐겨찾기</strong>
        <div>{items.map((item) => <Link href={item.href} key={item.slug}>{favorites.includes(item.slug) ? "★" : "↻"} {item.name}<span>→</span></Link>)}</div>
      </div>
    </section>
  );
}
