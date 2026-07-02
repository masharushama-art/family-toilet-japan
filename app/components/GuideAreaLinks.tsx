import Link from "next/link";
import { getSpotsByCity } from "../lib/spots";
import { CITY_GUIDE_SLUGS, type SpotLang } from "./SpotPageView";
import { AdUnit } from "./AdSense";

// ガイドslug→都市の逆引き
export function getCityForGuideSlug(slug: string): string | undefined {
  for (const [city, guides] of Object.entries(CITY_GUIDE_SLUGS)) {
    if (guides.some((g) => g.slug === slug)) return city;
  }
  return undefined;
}

const HEADINGS: Record<SpotLang, string> = {
  en: "🚻 Find toilets by area",
  ja: "🚻 エリア別トイレページ",
  zh: "🚻 依區域尋找廁所",
  ko: "🚻 지역별 화장실 페이지",
};

/** ガイドページ下部：関連エリアのスポットページへの内部リンク＋広告 */
export default function GuideAreaLinks({ slug, lang }: { slug: string; lang: SpotLang }) {
  const city = getCityForGuideSlug(slug);
  const spots = city ? getSpotsByCity(city) : [];

  return (
    <>
      <AdUnit slot="guide-bottom" />
      {spots.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold text-gray-800 mb-3 text-sm">{HEADINGS[lang]}</h2>
          <div className="flex flex-wrap gap-2">
            {spots.map((s) => (
              <Link
                key={s.slug}
                href={lang === "en" ? `/spot/${s.slug}` : `/${lang}/spot/${s.slug}`}
                className="text-xs bg-gray-50 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                {s.type === "station" ? "🚉" : "📍"} {s.names[lang]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
