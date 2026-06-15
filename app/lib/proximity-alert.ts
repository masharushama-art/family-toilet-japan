import type { Toilet } from "../types/toilet";
import { calcDistance } from "./distance";

const ALERT_RADIUS_M = 150;
const COOLDOWN_MS = 5 * 60 * 1000; // 5分は同じトイレを再通知しない
const notified = new Map<string, number>(); // toiletId → last notified timestamp

export async function requestNotificationPermission(): Promise<boolean> {
  if (!("Notification" in window)) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  return result === "granted";
}

export function checkProximity(
  userLat: number,
  userLon: number,
  toilets: Toilet[]
): void {
  if (!("Notification" in window) || Notification.permission !== "granted") return;

  const now = Date.now();
  for (const toilet of toilets) {
    if (!toilet.changingTable) continue;
    const dist = calcDistance(userLat, userLon, toilet.lat, toilet.lon);
    if (dist > ALERT_RADIUS_M) continue;

    const last = notified.get(toilet.id) ?? 0;
    if (now - last < COOLDOWN_MS) continue;

    notified.set(toilet.id, now);
    const name = toilet.nameEn || toilet.name || "Public Toilet";
    new Notification("🍼 Baby-friendly toilet nearby!", {
      body: `${name} — ${Math.round(dist)}m away`,
      icon: "/icons/icon-192x192.png",
      tag: `ftj-${toilet.id}`,
      silent: false,
    });
    if ("vibrate" in navigator) navigator.vibrate([100, 50, 100]);
    break; // 一度に1件だけ通知
  }
}
