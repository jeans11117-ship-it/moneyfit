"use client";

import { useState, useSyncExternalStore } from "react";

type CalculatorActionsProps = { slug: string; name: string; shareParams?: Record<string, string | number> };

export function CalculatorActions({ slug, name, shareParams = {} }: CalculatorActionsProps) {
  const [copied, setCopied] = useState(false);
  const favoriteSnapshot = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("moneyfit-storage", onChange);
      window.addEventListener("storage", onChange);
      return () => {
        window.removeEventListener("moneyfit-storage", onChange);
        window.removeEventListener("storage", onChange);
      };
    },
    () => localStorage.getItem("moneyfit:favorites") ?? "[]",
    () => "[]",
  );
  const favorite = (JSON.parse(favoriteSnapshot) as string[]).includes(slug);

  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("moneyfit:favorites") ?? "[]") as string[];
    const next = saved.includes(slug) ? saved.filter((item) => item !== slug) : [...saved, slug];
    localStorage.setItem("moneyfit:favorites", JSON.stringify(next));
    window.dispatchEvent(new Event("moneyfit-storage"));
  };

  const share = async () => {
    const url = new URL(window.location.href);
    url.search = "";
    Object.entries(shareParams).forEach(([key, value]) => url.searchParams.set(key, String(value)));
    try {
      if (navigator.share) await navigator.share({ title: `${name} - 머니핏`, url: url.toString() });
      else await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { /* 사용자가 공유 창을 닫은 경우에는 상태를 유지합니다. */ }
  };

  return (
    <div className="actions">
      <button className="secondary-button" type="button" onClick={share}>{copied ? "링크 복사됨" : "결과 공유"}</button>
      <button className="secondary-button" type="button" aria-pressed={favorite} onClick={toggleFavorite}>{favorite ? "★ 즐겨찾기됨" : "☆ 즐겨찾기"}</button>
    </div>
  );
}
