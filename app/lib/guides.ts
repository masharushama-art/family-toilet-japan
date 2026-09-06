import { CITY_GUIDE_SLUGS } from "../components/SpotPageView";

export type GuideLink = { slug: string; en: string; ja: string; zh: string; ko: string };
export type GuideLang = "en" | "ja" | "zh" | "ko";

// 都市→地方。専用ガイドの無い都市には同じ地方の都市向けガイドを優先して出す
const CITY_REGION: Record<string, string> = {
  tokyo: "kanto", yokohama: "kanto", chiba: "kanto", saitama: "kanto", ibaraki: "kanto", tochigi: "kanto", gunma: "kanto",
  osaka: "kansai", kyoto: "kansai", nara: "kansai", kobe: "kansai", shiga: "kansai", wakayama: "kansai",
  nagoya: "chubu", niigata: "chubu", toyama: "chubu", kanazawa: "chubu", fukui: "chubu", yamanashi: "chubu", nagano: "chubu", shizuoka: "chubu", gifu: "chubu", mie: "chubu",
  sendai: "tohoku", aomori: "tohoku", iwate: "tohoku", akita: "tohoku", yamagata: "tohoku", fukushima: "tohoku",
  sapporo: "hokkaido",
  hiroshima: "chugoku", okayama: "chugoku", tottori: "chugoku", shimane: "chugoku", yamaguchi: "chugoku",
  kagawa: "shikoku", ehime: "shikoku", kochi: "shikoku", tokushima: "shikoku",
  fukuoka: "kyushu", saga: "kyushu", nagasaki: "kyushu", kumamoto: "kyushu", oita: "kyushu", miyazaki: "kyushu", kagoshima: "kyushu",
  okinawa: "okinawa",
};

// 都市を問わず役立つ汎用ガイド。4言語すべてに存在するslugのみ載せること
// (how-to-use-japanese-toilet 等のEN専用ガイドは ja/zh/ko ページから404になるため不可)
const GENERAL_GUIDES: GuideLink[] = [
  { slug: "japan-travel-with-baby", en: "Japan Travel with Baby & Toddler", ja: "赤ちゃん連れ日本旅行ガイド", zh: "帶寶寶遊日本指南", ko: "아기와 함께하는 일본 여행 가이드" },
  { slug: "japan-train-travel-with-stroller", en: "Japan Train Travel with a Stroller", ja: "ベビーカーで電車・新幹線に乗るコツ", zh: "推車搭乘電車・新幹線攻略", ko: "유모차로 전철・신칸센 타는 팁" },
  { slug: "traveling-japan-with-toddler-checklist", en: "Japan Toddler Travel Checklist", ja: "子連れ旅行の持ち物チェックリスト", zh: "親子旅行行李清單", ko: "아이와 여행 준비물 체크리스트" },
  { slug: "japan-family-restaurants-guide", en: "Japan Family Restaurants Guide", ja: "子連れ外食完全ガイド", zh: "親子外食完整指南", ko: "아이와 함께하는 외식 완벽 가이드" },
];

const MAX_FALLBACK_GUIDES = 3;

export function guideHref(lang: GuideLang, slug: string): string {
  return lang === "en" ? `/guide/${slug}` : `/${lang}/guide/${slug}`;
}

// 都市ページに出すガイド一覧。専用ガイドがあればそれを、無ければ
// 同じ地方の都市向けガイド→汎用ガイドの順で最大3本返す(必ず1本以上返る)。
export function getGuidesForCity(city: string): GuideLink[] {
  const own = CITY_GUIDE_SLUGS[city] ?? [];
  if (own.length > 0) return own;

  const region = CITY_REGION[city];
  const regional = region
    ? Object.entries(CITY_GUIDE_SLUGS)
        .filter(([c]) => CITY_REGION[c] === region)
        .flatMap(([, guides]) => guides)
    : [];

  const seen = new Set<string>();
  return [...regional, ...GENERAL_GUIDES]
    .filter((g) => !seen.has(g.slug) && seen.add(g.slug))
    .slice(0, MAX_FALLBACK_GUIDES);
}
