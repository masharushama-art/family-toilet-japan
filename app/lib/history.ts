"use client";

const HISTORY_KEY = "ftj_history_v2";
const MAX = 20;

export interface HistoryEntry {
  id: string;
  city: string;
  nameEn?: string;
  name?: string;
  changingTable?: boolean;
  wheelchair?: boolean;
  lat: number;
  lon: number;
  ts: number;
}

export function addToHistory(entry: Omit<HistoryEntry, "ts">): void {
  try {
    const prev: HistoryEntry[] = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    const next = [
      { ...entry, ts: Date.now() },
      ...prev.filter((x) => x.id !== entry.id),
    ].slice(0, MAX);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  } catch { /* ignore */ }
}

export function getHistory(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch { return []; }
}

export function clearHistory(): void {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
}

export function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}
