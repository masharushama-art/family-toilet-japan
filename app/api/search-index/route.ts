import { NextResponse } from "next/server";
import { CITIES, getDetailPageToilets, type CitySlug } from "../../lib/toilet-data";
import { SPOTS } from "../../lib/spots";

// サイト内検索用の軽量インデックス。ビルド時に静的生成され、
// トップページの検索ボックスがフォーカス時に一度だけ取得する。
export const dynamic = "force-static";

// ガイドの検索用タイトル（EN/JA）。新しいガイドを追加したらここにも追記する
const GUIDES: { slug: string; en: string; ja: string }[] = [
  { slug: "how-to-use-japanese-toilet", en: "How to Use a Japanese Toilet", ja: "日本のトイレの使い方" },
  { slug: "japan-travel-with-baby", en: "Japan Travel with Baby & Toddler", ja: "赤ちゃん連れ日本旅行ガイド" },
  { slug: "best-baby-changing-facilities-tokyo", en: "Best Baby Changing Facilities in Tokyo", ja: "東京のおむつ替え・授乳室ガイド" },
  { slug: "japan-toilet-etiquette", en: "Japan Toilet Etiquette Guide", ja: "日本のトイレマナー" },
  { slug: "osaka-family-travel-tips", en: "Osaka Family Travel Tips", ja: "子連れ大阪観光ガイド" },
  { slug: "nagoya-family-travel-tips", en: "Nagoya Family Travel Tips", ja: "子連れ名古屋観光ガイド" },
  { slug: "kyoto-with-baby", en: "Kyoto with Baby & Toddler", ja: "赤ちゃん連れ京都観光ガイド" },
  { slug: "sapporo-family-travel-tips", en: "Sapporo Family Travel Tips", ja: "子連れ札幌観光ガイド" },
  { slug: "fukuoka-family-travel-tips", en: "Fukuoka Family Travel Tips", ja: "子連れ福岡観光ガイド" },
  { slug: "sendai-family-travel-tips", en: "Sendai Family Travel Tips", ja: "子連れ仙台観光ガイド" },
  { slug: "hiroshima-family-travel-tips", en: "Hiroshima Family Travel Tips", ja: "子連れ広島観光ガイド" },
  { slug: "naha-okinawa-family-travel-tips", en: "Naha & Okinawa Family Travel Tips", ja: "子連れ沖縄・那覇観光ガイド" },
  { slug: "yokohama-family-travel-tips", en: "Yokohama Family Travel Tips", ja: "子連れ横浜観光ガイド" },
  { slug: "tokyo-with-baby-winter", en: "Tokyo with Baby in Winter", ja: "冬の東京を赤ちゃんと楽しむ" },
  { slug: "japan-train-travel-with-stroller", en: "Japan Train Travel with a Stroller", ja: "ベビーカーで電車・新幹線に乗るコツ" },
  { slug: "best-baby-changing-facilities-osaka", en: "Best Baby Changing Facilities in Osaka", ja: "大阪のおむつ替え・授乳室ガイド" },
  { slug: "japan-family-restaurants-guide", en: "Japan Family Restaurants Guide", ja: "子連れ外食完全ガイド" },
  { slug: "traveling-japan-with-toddler-checklist", en: "Japan Toddler Travel Checklist", ja: "子連れ旅行の持ち物チェックリスト" },
  { slug: "summer-festivals-with-kids-japan", en: "Summer Festivals & Fireworks with Kids", ja: "子連れ夏祭り・花火大会攻略ガイド" },
  { slug: "autumn-foliage-with-kids-japan", en: "Autumn Foliage (Koyo) with Kids", ja: "子連れ紅葉狩りガイド" },
  { slug: "cherry-blossoms-with-kids-japan", en: "Cherry Blossoms (Sakura) with Kids", ja: "子連れ花見・桜スポットガイド" },
];

export interface SearchIndexEntry {
  /** 表示名（英語優先） */
  n: string;
  /** 日本語名（英語名と異なる場合のみ） */
  j?: string;
  /** 遷移先パス */
  u: string;
  /** 種別: city | spot | guide | toilet */
  t: "city" | "spot" | "guide" | "toilet";
}

export async function GET() {
  const entries: SearchIndexEntry[] = [];

  for (const [slug, c] of Object.entries(CITIES)) {
    entries.push({ n: c.name, j: c.jaName, u: `/${slug}`, t: "city" });
  }

  for (const s of SPOTS) {
    entries.push({
      n: s.names.en,
      j: s.names.ja !== s.names.en ? s.names.ja : undefined,
      u: `/spot/${s.slug}`,
      t: "spot",
    });
  }

  for (const g of GUIDES) {
    entries.push({ n: g.en, j: g.ja, u: `/guide/${g.slug}`, t: "guide" });
  }

  // トイレは名前があるもののみ（無名の「Public Toilet」は検索対象として意味がない）
  for (const city of Object.keys(CITIES) as CitySlug[]) {
    for (const t of getDetailPageToilets(city)) {
      const en = t.nameEn;
      const ja = t.name;
      if (!en && !ja) continue;
      entries.push({
        n: en || ja!,
        j: ja && ja !== en ? ja : undefined,
        u: `/toilet/${city}/${t.id}`,
        t: "toilet",
      });
    }
  }

  return NextResponse.json(entries, {
    headers: { "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800" },
  });
}
