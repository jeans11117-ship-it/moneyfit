export function sanitizeNumber(value: number, fallback = 0): number {
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export function formatWon(value: number): string {
  const won = Math.max(0, Math.round(Number.isFinite(value) ? value : 0));
  return `${won.toLocaleString("ko-KR")}원`;
}

export function formatKoreanMoney(value: number): string {
  const won = Math.max(0, Math.round(Number.isFinite(value) ? value : 0));
  const eok = Math.floor(won / 100_000_000);
  const man = Math.floor((won % 100_000_000) / 10_000);
  const rest = won % 10_000;
  const parts: string[] = [];
  if (eok) parts.push(`${eok.toLocaleString("ko-KR")}억`);
  if (man) parts.push(`${man.toLocaleString("ko-KR")}만`);
  if (!eok && !man && rest) parts.push(rest.toLocaleString("ko-KR"));
  return `${parts.join(" ") || "0"}원`;
}

export function manwonToWon(value: number): number {
  return Math.max(0, Number.isFinite(value) ? value : 0) * 10_000;
}
