import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CITIES, getCityStats, type CitySlug } from "../../lib/toilet-data";

const ZH_NAMES: Partial<Record<CitySlug, string>> = {
  tokyo: "東京", osaka: "大阪", kyoto: "京都", nagoya: "名古屋",
  yokohama: "橫濱", fukuoka: "福岡", sapporo: "札幌", nara: "奈良",
  kobe: "神戶", hiroshima: "廣島", sendai: "仙台", kanazawa: "金澤",
  okinawa: "那霸", chiba: "千葉", saitama: "埼玉",
};

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return Object.keys(ZH_NAMES).map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  if (!(city in CITIES) || !(city in ZH_NAMES)) return {};
  const c = CITIES[city as CitySlug];
  const zhName = ZH_NAMES[city as CitySlug]!;
  const stats = getCityStats(city as CitySlug);
  const BASE = "https://family-toilet-japan.vercel.app";
  return {
    title: `${zhName}嬰兒換尿布台・親子廁所 ${stats.withChangingTable}處 | Family Toilet Japan`,
    description: `在${zhName}尋找有換尿布台的廁所。收錄${stats.total}處以上，免費使用，無需註冊。帶嬰兒旅遊的必備工具。`,
    keywords: [
      `${zhName} 換尿布台`,
      `${zhName} 親子廁所`,
      `帶嬰兒 ${zhName}`,
      `${zhName} 育嬰室`,
      `日本 ${zhName} 廁所`,
    ],
    alternates: {
      canonical: `${BASE}/zh/${city}`,
      languages: { "en": `${BASE}/${city}`, "zh-TW": `${BASE}/zh/${city}`, "ja": `${BASE}/ja/${city}` },
    },
    openGraph: {
      title: `${zhName}嬰兒換尿布台・親子廁所`,
      description: `在${zhName}尋找有換尿布台的廁所，共${stats.withChangingTable}處。`,
      url: `${BASE}/zh/${city}`,
    },
  };
}

export default async function ZhCityPage({ params }: Props) {
  const { city } = await params;
  if (!(city in CITIES) || !(city in ZH_NAMES)) notFound();

  const c = CITIES[city as CitySlug];
  const zhName = ZH_NAMES[city as CitySlug]!;
  const stats = getCityStats(city as CitySlug);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/zh" className="text-sky-200 text-sm mb-4 block hover:text-white">← 日本家庭廁所</Link>
        <h1 className="text-3xl font-bold mb-2">{zhName}嬰兒換尿布台・親子廁所</h1>
        <p className="text-sky-100 text-sm max-w-md mx-auto mb-6">
          在{zhName}尋找有換尿布台的廁所。免費使用，無需註冊，支援離線。
        </p>
        <Link
          href={`/map?city=${city}`}
          className="inline-block bg-white text-sky-600 font-bold px-7 py-3.5 rounded-full text-base hover:bg-sky-50 transition-colors"
        >
          📍 開啟地圖
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-10">
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { label: "換尿布台", value: stats.withChangingTable, icon: "🍼" },
            { label: "輪椅無障礙", value: stats.wheelchair, icon: "♿" },
            { label: "免費廁所", value: stats.free, icon: "💚" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-sky-50 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">{icon}</div>
              <div className="text-xl font-bold text-sky-700">{value.toLocaleString()}</div>
              <div className="text-xs text-gray-600 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">常見問題</h2>
        <div className="space-y-3 mb-10">
          {[
            { q: `在${zhName}哪裡有換尿布台？`, a: `開啟地圖並點擊定位按鈕，${zhName}附近有換尿布台的廁所會以藍色標記顯示。目前收錄${stats.withChangingTable}處。` },
            { q: "可以離線使用嗎？", a: "安裝為 PWA 後，曾開啟過的區域可離線瀏覽地圖，非常適合在日本使用當地 SIM 卡時使用。" },
            { q: "需要付費嗎？", a: "完全免費，無需註冊。" },
          ].map(({ q, a }) => (
            <div key={q} className="border border-gray-100 rounded-xl p-4">
              <p className="font-semibold text-gray-800 text-sm mb-1">Q. {q}</p>
              <p className="text-gray-600 text-sm leading-relaxed">A. {a}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 text-center text-sm text-gray-500">
          <p className="mb-2">English version</p>
          <Link href={`/${city}`} className="text-sky-600 hover:underline font-medium">
            Family-friendly toilets in {c.name} (English) →
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "日本家庭廁所", item: "https://family-toilet-japan.vercel.app/zh" },
              { "@type": "ListItem", position: 2, name: `${zhName}親子廁所`, item: `https://family-toilet-japan.vercel.app/zh/${city}` },
            ],
          }),
        }}
      />
    </div>
  );
}
