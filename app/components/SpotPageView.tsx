import Link from "next/link";
import type { Spot } from "../lib/spots";
import { spotDistanceKm, getSpotsByCity } from "../lib/spots";
import { CITIES, getToiletsByCity, type CitySlug } from "../lib/toilet-data";
import { AdUnit } from "./AdSense";
import PageViewTracker from "./PageViewTracker";
import { ActivityAffiliateBox } from "./AffiliateBox";

// チケット予約需要のある大型観光施設のみKlookボックスを出す（駅・商店街等は対象外）
const TICKETED_SPOTS: Record<string, string> = {
  "universal-studios-japan": "Universal Studios Japan",
  "maihama-disney": "Tokyo Disney Resort",
  "tokyo-skytree": "Tokyo Skytree",
  "shuri-castle": "Shuri Castle Okinawa",
  "nara-park": "Nara Park deer",
  "kenrokuen": "Kenroku-en Kanazawa",
  "fushimi-inari": "Kyoto tour",
  "arashiyama": "Arashiyama bamboo tour",
};

const BASE = "https://family-toilet-japan.vercel.app";

export type SpotLang = "en" | "ja" | "zh" | "ko";

const STRINGS: Record<SpotLang, Record<string, string>> = {
  en: {
    back: "Family Toilet Japan",
    toiletsNear: "toilets within 1 km",
    changingTables: "with baby changing tables",
    wheelchair: "wheelchair accessible",
    free: "free to use",
    listTitle: "Nearest toilets with baby changing tables",
    otherTitle: "Other nearby toilets",
    openMap: "📍 Open this area on the map",
    mapDesc: "See all toilets around this spot on the interactive map with GPS distance.",
    nearbySpots: "Other areas in",
    guides: "Travel guides",
    detail: "Details",
    distAway: "away",
    changingBadge: "🍼 Changing table",
    wheelchairBadge: "♿ Accessible",
    freeBadge: "💚 Free",
    cityMap: "toilet map",
  },
  ja: {
    back: "Family Toilet Japan",
    toiletsNear: "件のトイレ（1km圏内）",
    changingTables: "おむつ交換台あり",
    wheelchair: "車いす対応",
    free: "無料",
    listTitle: "最寄りのおむつ交換台付きトイレ",
    otherTitle: "その他の近隣トイレ",
    openMap: "📍 このエリアを地図で開く",
    mapDesc: "このスポット周辺のすべてのトイレを、現在地からの距離付きの地図で確認できます。",
    nearbySpots: "他のエリア：",
    guides: "関連ガイド",
    detail: "詳細",
    distAway: "",
    changingBadge: "🍼 おむつ交換台",
    wheelchairBadge: "♿ 車いす対応",
    freeBadge: "💚 無料",
    cityMap: "のトイレマップ",
  },
  zh: {
    back: "Family Toilet Japan",
    toiletsNear: "處廁所（1公里內）",
    changingTables: "設有換尿布台",
    wheelchair: "無障礙設施",
    free: "免費",
    listTitle: "最近的換尿布台廁所",
    otherTitle: "其他鄰近廁所",
    openMap: "📍 在地圖上開啟此區域",
    mapDesc: "在互動地圖上查看此景點周邊的所有廁所，並顯示與您的距離。",
    nearbySpots: "其他區域：",
    guides: "相關指南",
    detail: "詳情",
    distAway: "",
    changingBadge: "🍼 換尿布台",
    wheelchairBadge: "♿ 無障礙",
    freeBadge: "💚 免費",
    cityMap: "廁所地圖",
  },
  ko: {
    back: "Family Toilet Japan",
    toiletsNear: "곳의 화장실(1km 이내)",
    changingTables: "기저귀 교환대 있음",
    wheelchair: "휠체어 이용 가능",
    free: "무료",
    listTitle: "가장 가까운 기저귀 교환대 화장실",
    otherTitle: "그 외 주변 화장실",
    openMap: "📍 이 지역을 지도에서 열기",
    mapDesc: "이 명소 주변의 모든 화장실을 거리 표시와 함께 지도에서 확인할 수 있습니다.",
    nearbySpots: "다른 지역:",
    guides: "관련 가이드",
    detail: "상세",
    distAway: "",
    changingBadge: "🍼 기저귀 교환대",
    wheelchairBadge: "♿ 휠체어",
    freeBadge: "💚 무료",
    cityMap: " 화장실 지도",
  },
};

// 都市→関連ガイドのマッピング（言語別のリンク先はレンダリング側で調整）
export const CITY_GUIDE_SLUGS: Record<string, { slug: string; en: string; ja: string; zh: string; ko: string }[]> = {
  tokyo: [
    { slug: "best-baby-changing-facilities-tokyo", en: "Best Baby Changing Facilities in Tokyo", ja: "東京のおむつ替え・授乳室ガイド", zh: "東京換尿布台・哺乳室指南", ko: "도쿄 기저귀 교환대・수유실 가이드" },
    { slug: "tokyo-with-baby-winter", en: "Tokyo with Baby in Winter", ja: "冬の東京を赤ちゃんと楽しむ", zh: "冬季帶寶寶遊東京", ko: "겨울철 아기와 함께하는 도쿄" },
  ],
  osaka: [
    { slug: "best-baby-changing-facilities-osaka", en: "Best Baby Changing Facilities in Osaka", ja: "大阪のおむつ替え・授乳室ガイド", zh: "大阪換尿布台・哺乳室指南", ko: "오사카 기저귀 교환대・수유실 가이드" },
    { slug: "osaka-family-travel-tips", en: "Osaka Family Travel Tips", ja: "子連れ大阪観光ガイド", zh: "大阪親子旅遊指南", ko: "오사카 가족 여행 가이드" },
  ],
  kyoto: [{ slug: "kyoto-with-baby", en: "Kyoto with Baby & Toddler", ja: "赤ちゃん連れ京都観光ガイド", zh: "帶寶寶遊京都指南", ko: "아기와 함께하는 교토 여행 가이드" }],
  nagoya: [{ slug: "nagoya-family-travel-tips", en: "Nagoya Family Travel Tips", ja: "子連れ名古屋観光ガイド", zh: "名古屋親子旅遊指南", ko: "나고야 가족 여행 가이드" }],
  fukuoka: [{ slug: "fukuoka-family-travel-tips", en: "Fukuoka Family Travel Tips", ja: "子連れ福岡観光ガイド", zh: "福岡親子旅遊指南", ko: "후쿠오카 가족 여행 가이드" }],
  sapporo: [{ slug: "sapporo-family-travel-tips", en: "Sapporo Family Travel Tips", ja: "子連れ札幌観光ガイド", zh: "札幌親子旅遊指南", ko: "삿포로 가족 여행 가이드" }],
  sendai: [{ slug: "sendai-family-travel-tips", en: "Sendai Family Travel Tips", ja: "子連れ仙台観光ガイド", zh: "仙台親子旅遊指南", ko: "센다이 가족 여행 가이드" }],
  hiroshima: [{ slug: "hiroshima-family-travel-tips", en: "Hiroshima Family Travel Tips", ja: "子連れ広島観光ガイド", zh: "廣島親子旅遊指南", ko: "히로시마 가족 여행 가이드" }],
  okinawa: [{ slug: "naha-okinawa-family-travel-tips", en: "Naha & Okinawa Family Travel Tips", ja: "子連れ沖縄・那覇観光ガイド", zh: "沖繩・那霸親子旅遊指南", ko: "오키나와・나하 가족 여행 가이드" }],
  yokohama: [{ slug: "yokohama-family-travel-tips", en: "Yokohama Family Travel Tips", ja: "子連れ横浜観光ガイド", zh: "橫濱親子旅遊指南", ko: "요코하마 가족 여행 가이드" }],
};

function guideHref(lang: SpotLang, slug: string): string {
  return lang === "en" ? `/guide/${slug}` : `/${lang}/guide/${slug}`;
}

function spotHref(lang: SpotLang, slug: string): string {
  return lang === "en" ? `/spot/${slug}` : `/${lang}/spot/${slug}`;
}

export default function SpotPageView({ spot, lang }: { spot: Spot; lang: SpotLang }) {
  const t = STRINGS[lang];
  const c = CITIES[spot.city as CitySlug];
  const cityName = lang === "ja" ? c.jaName : c.name;
  const spotName = spot.names[lang];

  const all = getToiletsByCity(spot.city as CitySlug)
    .map((toilet) => ({ toilet, d: spotDistanceKm(spot.lat, spot.lon, toilet.lat, toilet.lon) }))
    .filter(({ d }) => d <= 1.0)
    .sort((a, b) => a.d - b.d);

  const withCT = all.filter(({ toilet }) => toilet.changingTable).slice(0, 12);
  const others = all.filter(({ toilet }) => !toilet.changingTable).slice(0, 8);
  const stats = {
    total: all.length,
    ct: all.filter(({ toilet }) => toilet.changingTable).length,
    wc: all.filter(({ toilet }) => toilet.wheelchair).length,
  };

  const nearbySpots = getSpotsByCity(spot.city).filter((s) => s.slug !== spot.slug).slice(0, 5);
  const guides = CITY_GUIDE_SLUGS[spot.city] ?? [];
  const homeHref = lang === "en" ? "/" : `/${lang}`;

  const fmtDist = (d: number) => (d < 1 ? `${Math.round(d * 1000)}m` : `${d.toFixed(1)}km`);

  const row = ({ toilet, d }: { toilet: (typeof all)[number]["toilet"]; d: number }) => {
    const name = toilet.nameEn || toilet.name || `${spotName} toilet`;
    const inner = (
      <>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{name}</p>
          <span className="text-xs text-gray-400 shrink-0">{fmtDist(d)} {t.distAway}</span>
        </div>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {toilet.changingTable && <span className="text-[10px] bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 px-1.5 py-0.5 rounded-full">{t.changingBadge}</span>}
          {toilet.wheelchair && <span className="text-[10px] bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-1.5 py-0.5 rounded-full">{t.wheelchairBadge}</span>}
          {toilet.fee === false && <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-full">{t.freeBadge}</span>}
        </div>
      </>
    );
    if (toilet.changingTable) {
      return (
        <Link key={toilet.id} href={`/toilet/${spot.city}/${toilet.id}`} className="block border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 hover:border-sky-200 hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors">
          {inner}
        </Link>
      );
    }
    return (
      <Link key={toilet.id} href={`/map?id=${toilet.id}&city=${spot.city}`} className="block border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 hover:border-sky-200 hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors">
        {inner}
      </Link>
    );
  };

  // FAQ構造化データ用の質問・回答を実データから組み立てる（言語ごと）
  const faqText: Record<SpotLang, { q1: string; a1: string; q2: string; a2: string; q3: string; a3: string }> = {
    en: {
      q1: `Is there a toilet with a baby changing table near ${spotName}?`,
      a1: stats.ct > 0
        ? `Yes. There are ${stats.ct} toilets with baby changing tables within 1 km of ${spotName}.`
        : `We haven't mapped a toilet with a baby changing table within 1 km of ${spotName} yet — check the interactive map for the closest one.`,
      q2: `How many toilets are near ${spotName}?`,
      a2: `There are ${stats.total} public toilets within 1 km of ${spotName}, including ${stats.wc} that are wheelchair accessible.`,
      q3: `Is ${spotName} wheelchair accessible for toilets?`,
      a3: stats.wc > 0
        ? `Yes, ${stats.wc} of the nearby toilets are wheelchair accessible.`
        : `We don't have confirmed wheelchair-accessible toilets near ${spotName} yet — please check the map for the latest data.`,
    },
    ja: {
      q1: `${spotName}周辺におむつ交換台付きのトイレはありますか？`,
      a1: stats.ct > 0
        ? `はい。${spotName}から1km圏内に、おむつ交換台付きのトイレが${stats.ct}件あります。`
        : `${spotName}から1km圏内には、おむつ交換台付きのトイレのデータがまだありません。地図で最寄りの設備をご確認ください。`,
      q2: `${spotName}周辺にトイレはいくつありますか？`,
      a2: `${spotName}から1km圏内に${stats.total}件の公衆トイレがあり、うち${stats.wc}件が車いす対応です。`,
      q3: `${spotName}周辺のトイレは車いすで利用できますか？`,
      a3: stats.wc > 0
        ? `はい。周辺トイレのうち${stats.wc}件が車いす対応です。`
        : `${spotName}周辺で車いす対応が確認されているトイレは現在ありません。最新情報は地図でご確認ください。`,
    },
    zh: {
      q1: `${spotName}附近有設有換尿布台的廁所嗎？`,
      a1: stats.ct > 0
        ? `有的，${spotName}方圓1公里內共有${stats.ct}處設有換尿布台的廁所。`
        : `目前${spotName}方圓1公里內尚未收錄設有換尿布台的廁所資料，請於地圖上查詢最近的設施。`,
      q2: `${spotName}附近有多少廁所？`,
      a2: `${spotName}方圓1公里內共有${stats.total}處公共廁所，其中${stats.wc}處為無障礙設施。`,
      q3: `${spotName}附近的廁所是否有無障礙設施？`,
      a3: stats.wc > 0
        ? `是的，附近共有${stats.wc}處廁所設有無障礙設施。`
        : `目前${spotName}附近尚未確認有無障礙廁所，請於地圖查詢最新資料。`,
    },
    ko: {
      q1: `${spotName} 근처에 기저귀 교환대가 있는 화장실이 있나요?`,
      a1: stats.ct > 0
        ? `네. ${spotName} 반경 1km 이내에 기저귀 교환대가 있는 화장실이 ${stats.ct}곳 있습니다.`
        : `${spotName} 반경 1km 이내에 기저귀 교환대가 있는 화장실 정보가 아직 없습니다. 지도에서 가장 가까운 시설을 확인해 보세요.`,
      q2: `${spotName} 근처에는 화장실이 몇 곳 있나요?`,
      a2: `${spotName} 반경 1km 이내에 공중화장실 ${stats.total}곳이 있으며, 그중 ${stats.wc}곳이 휠체어 이용 가능합니다.`,
      q3: `${spotName} 근처 화장실은 휠체어로 이용할 수 있나요?`,
      a3: stats.wc > 0
        ? `네, 근처 화장실 중 ${stats.wc}곳이 휠체어 이용 가능합니다.`
        : `${spotName} 근처에 휠체어 이용 가능이 확인된 화장실이 아직 없습니다. 최신 정보는 지도에서 확인해 주세요.`,
    },
  };
  const faq = faqText[lang];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageViewTracker event="spot_view" params={{ spot_slug: spot.slug, city: spot.city, lang }} />
      <div className="max-w-2xl mx-auto px-5 py-8">
        <nav className="text-xs text-gray-400 mb-4 flex items-center gap-1.5 flex-wrap">
          <Link href={homeHref} className="hover:text-sky-600">{t.back}</Link>
          <span>›</span>
          <Link href={lang === "ja" ? `/ja/${spot.city}` : `/${spot.city}`} className="hover:text-sky-600">{cityName}</Link>
          <span>›</span>
          <span className="text-gray-500 dark:text-gray-400">{spotName}</span>
        </nav>

        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {spot.type === "station" ? "🚉" : "📍"} {spotName}
        </h1>

        <div className="flex items-center gap-3 mt-3 flex-wrap text-xs text-gray-600 dark:text-gray-300">
          <span className="bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full font-medium">{stats.total} {t.toiletsNear}</span>
          <span className="bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 px-2.5 py-1 rounded-full font-medium">🍼 {stats.ct} {t.changingTables}</span>
          <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2.5 py-1 rounded-full font-medium">♿ {stats.wc} {t.wheelchair}</span>
        </div>

        {/* Mini map */}
        <div className="mt-5 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${spot.lon - 0.008}%2C${spot.lat - 0.005}%2C${spot.lon + 0.008}%2C${spot.lat + 0.005}&layer=mapnik&marker=${spot.lat}%2C${spot.lon}`}
            title={`Map of ${spot.names.en}`}
            className="w-full h-56 border-0"
            loading="lazy"
          />
        </div>
        <p className="text-[10px] text-gray-400 mt-1 text-right">
          © <a href="https://www.openstreetmap.org/copyright" className="underline" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>
        </p>

        {/* Ticket affiliate (Klook) — 対象スポットのみ */}
        {TICKETED_SPOTS[spot.slug] && (
          <ActivityAffiliateBox query={TICKETED_SPOTS[spot.slug]} lang={lang} />
        )}

        {/* Map CTA */}
        <div className="mt-4 bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-5">
          <p className="text-sm text-sky-800 dark:text-sky-200 mb-3">{t.mapDesc}</p>
          <Link
            href={`/map?city=${spot.city}&lat=${spot.lat}&lon=${spot.lon}`}
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
          >
            {t.openMap}
          </Link>
        </div>

        {/* Changing table list */}
        {withCT.length > 0 && (
          <div className="mt-8">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-3">🍼 {t.listTitle}</h2>
            <div className="space-y-2">{withCT.map(row)}</div>
          </div>
        )}

        <AdUnit slot="spot-page" />

        {/* Others */}
        {others.length > 0 && (
          <div className="mt-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-3">🚻 {t.otherTitle}</h2>
            <div className="space-y-2">{others.map(row)}</div>
          </div>
        )}

        {/* FAQ（構造化データと同じ内容を可視表示） */}
        <div className="mt-8 space-y-3">
          {[[faq.q1, faq.a1], [faq.q2, faq.a2], [faq.q3, faq.a3]].map(([q, a]) => (
            <div key={q} className="border border-gray-100 dark:border-gray-800 rounded-xl p-4">
              <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1">Q. {q}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">A. {a}</p>
            </div>
          ))}
        </div>

        {/* Guides */}
        {guides.length > 0 && (
          <div className="mt-8">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-sm">📖 {t.guides}</h2>
            <div className="flex flex-wrap gap-2">
              {guides.map((g) => (
                <Link key={g.slug} href={guideHref(lang, g.slug)} className="text-xs bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 px-3 py-1.5 rounded-full hover:bg-sky-100 transition-colors">
                  {g[lang]}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Nearby spots */}
        {nearbySpots.length > 0 && (
          <div className="mt-6 mb-8">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-sm">{t.nearbySpots} {cityName}</h2>
            <div className="flex flex-wrap gap-2">
              {nearbySpots.map((s) => (
                <Link key={s.slug} href={spotHref(lang, s.slug)} className="text-xs bg-gray-50 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  {s.type === "station" ? "🚉" : "📍"} {s.names[lang]}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Family Toilet Japan", item: BASE },
                { "@type": "ListItem", position: 2, name: c.name, item: `${BASE}/${spot.city}` },
                { "@type": "ListItem", position: 3, name: spot.names.en, item: `${BASE}${spotHref(lang, spot.slug)}` },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: `Baby changing toilets near ${spot.names.en}`,
              numberOfItems: withCT.length,
              itemListElement: withCT.map(({ toilet }, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "CivicStructure",
                  name: toilet.nameEn || toilet.name || `Public toilet near ${spot.names.en}`,
                  geo: { "@type": "GeoCoordinates", latitude: toilet.lat, longitude: toilet.lon },
                },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                { "@type": "Question", name: faq.q1, acceptedAnswer: { "@type": "Answer", text: faq.a1 } },
                { "@type": "Question", name: faq.q2, acceptedAnswer: { "@type": "Answer", text: faq.a2 } },
                { "@type": "Question", name: faq.q3, acceptedAnswer: { "@type": "Answer", text: faq.a3 } },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
