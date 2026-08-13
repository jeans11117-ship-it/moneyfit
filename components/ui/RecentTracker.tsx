"use client";

import { useEffect } from "react";

export type RecentItem = { slug: string; name: string; href: string };

export function RecentTracker({ item }: { item: RecentItem }) {
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("moneyfit:recent") ?? "[]") as RecentItem[];
    localStorage.setItem("moneyfit:recent", JSON.stringify([item, ...saved.filter((savedItem) => savedItem.slug !== item.slug)].slice(0, 3)));
    window.dispatchEvent(new Event("moneyfit-storage"));
  }, [item]);
  return null;
}
