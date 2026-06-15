// zh-TW・ko 言語ページが存在する都市スラッグ
export const ZH_KO_CITIES = new Set([
  "tokyo","osaka","kyoto","nagoya","yokohama","fukuoka",
  "sapporo","nara","kobe","hiroshima","sendai","kanazawa",
  "okinawa","chiba","saitama",
]);

export const BASE = "https://family-toilet-japan.vercel.app";

/** 都市に応じた hreflang languages オブジェクトを返す */
export function cityAlternates(city: string) {
  const langs: Record<string, string> = {
    "en":        `${BASE}/${city}`,
    "ja":        `${BASE}/ja/${city}`,
    "x-default": `${BASE}/${city}`,
  };
  if (ZH_KO_CITIES.has(city)) {
    langs["zh-TW"] = `${BASE}/zh/${city}`;
    langs["ko"]    = `${BASE}/ko/${city}`;
  }
  return langs;
}
