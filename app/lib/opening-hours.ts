/**
 * OSM opening_hours 文字列をパースして現在開いているか判定する
 * 完全なパーサーではなく、よくあるパターンのみ対応
 */
export type OpenStatus = "open" | "closed" | "unknown";

export function getOpenStatus(openingHours?: string): OpenStatus {
  if (!openingHours) return "unknown";
  const oh = openingHours.trim().toLowerCase();
  if (oh === "24/7") return "open";

  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon...6=Sat
  const hhmm = now.getHours() * 60 + now.getMinutes();

  // "Mo-Su 08:00-20:00" 形式
  const simpleMatch = oh.match(/^(?:mo-su|mo-sa|mo-fr)?\s*(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/);
  if (simpleMatch) {
    const openMin = parseInt(simpleMatch[1]) * 60 + parseInt(simpleMatch[2]);
    const closeMin = parseInt(simpleMatch[3]) * 60 + parseInt(simpleMatch[4]);
    return hhmm >= openMin && hhmm < closeMin ? "open" : "closed";
  }

  return "unknown";
}

export function formatHours(openingHours?: string): string {
  if (!openingHours) return "";
  if (openingHours === "24/7") return "Open 24 hours";
  return openingHours;
}
