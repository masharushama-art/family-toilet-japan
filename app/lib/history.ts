"use client";

const HISTORY_KEY = "ftj_history";
const MAX = 5;

export function addToHistory(id: string): void {
  try {
    const prev: string[] = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    const next = [id, ...prev.filter((x) => x !== id)].slice(0, MAX);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  } catch { /* ignore */ }
}

export function getHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch { return []; }
}
