import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "日本親子廁所地圖・換尿布台查詢 | Family Toilet Japan",
  description: "帶寶寶遊日本必備！全日本47都道府縣、超過16,000處親子廁所及換尿布台位置，免費查詢。東京、大阪、京都、名古屋等主要城市皆有收錄。無需註冊。",
  keywords: [
    "日本換尿布台",
    "日本親子廁所",
    "帶嬰兒去日本",
    "日本嬰兒設施",
    "東京換尿布",
    "大阪親子廁所",
    "日本旅遊 嬰兒",
    "日本公共廁所地圖",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/zh" },
};

const cities = [
  { slug: "tokyo",    name: "東京",  icon: "🗼" },
  { slug: "osaka",    name: "大阪",  icon: "🏯" },
  { slug: "kyoto",    name: "京都",  icon: "⛩️" },
  { slug: "nagoya",   name: "名古屋", icon: "🏰" },
  { slug: "yokohama", name: "橫濱",  icon: "🌉" },
  { slug: "fukuoka",  name: "福岡",  icon: "🌸" },
  { slug: "sapporo",  name: "札幌",  icon: "❄️" },
  { slug: "nara",     name: "奈良",  icon: "🦌" },
];

export default function ZhPage() {
  return (
    <>
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-14 text-center">
        <div className="text-5xl mb-3">🚽</div>
        <h1 className="text-3xl font-bold mb-3">日本親子廁所・換尿布台地圖</h1>
        <p className="text-sky-100 max-w-md mx-auto mb-6">
          帶寶寶遊日本不用擔心！全日本 <strong>16,000+</strong> 處換尿布台位置，
          涵蓋47都道府縣，免費使用，無需登錄。
        </p>
        <Link
          href="/map"
          className="inline-block bg-white text-sky-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-sky-50 transition-colors"
        >
          📍 搜尋附近廁所
        </Link>
        <p className="text-sky-200 text-xs mt-3">免費 · 無需註冊 · 支援離線使用</p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="grid grid-cols-3 gap-4 mb-10 text-center">
          {[
            { icon: "🍼", label: "換尿布台" },
            { icon: "♿", label: "無障礙設施" },
            { icon: "🕐", label: "24小時廁所" },
          ].map(({ icon, label }) => (
            <div key={label} className="bg-sky-50 rounded-2xl py-4 px-2">
              <div className="text-3xl mb-1">{icon}</div>
              <p className="text-xs text-gray-600 font-medium">{label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">依城市搜尋</h2>
        <div className="grid grid-cols-4 gap-2 mb-10">
          {cities.map(({ slug, name, icon }) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="border border-gray-100 hover:border-sky-300 hover:bg-sky-50 rounded-xl py-3 text-center transition-colors"
            >
              <div className="text-2xl mb-0.5">{icon}</div>
              <p className="font-medium text-gray-800 text-xs">{name}</p>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">常見問題</h2>
        <div className="space-y-4 mb-10">
          {[
            { q: "如何使用？", a: "開啟地圖，點擊定位按鈕，即可看到附近有換尿布台的廁所。藍色標記代表有換尿布台的廁所。" },
            { q: "資料來源？", a: "資料來自 OpenStreetMap 及各地方政府開放資料，全日本收錄超過 16,000 處。" },
            { q: "可以離線使用嗎？", a: "安裝為 PWA 後，曾開啟過的區域可離線瀏覽地圖。" },
            { q: "需要付費嗎？", a: "完全免費，無需註冊。" },
          ].map(({ q, a }) => (
            <div key={q} className="bg-gray-50 rounded-xl p-4">
              <p className="font-semibold text-gray-800 text-sm mb-1">Q. {q}</p>
              <p className="text-gray-600 text-sm">A. {a}</p>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-gray-400 space-x-3">
          <Link href="/" className="hover:underline">English</Link>
          <Link href="/ja" className="hover:underline">日本語</Link>
          <Link href="/ko" className="hover:underline">한국어</Link>
          <Link href="/privacy" className="hover:underline">隱私政策</Link>
        </div>
      </div>
    </div>

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "如何使用？", acceptedAnswer: { "@type": "Answer", text: "開啟地圖，點擊定位按鈕，即可看到附近有換尿布台的廁所。藍色標記代表有換尿布台的廁所。" } },
            { "@type": "Question", name: "資料來源？", acceptedAnswer: { "@type": "Answer", text: "資料來自 OpenStreetMap 及各地方政府開放資料，全日本收錄超過 16,000 處。" } },
            { "@type": "Question", name: "可以離線使用嗎？", acceptedAnswer: { "@type": "Answer", text: "安裝為 PWA 後，曾開啟過的區域可離線瀏覽地圖。" } },
            { "@type": "Question", name: "需要付費嗎？", acceptedAnswer: { "@type": "Answer", text: "完全免費，無需註冊。" } },
          ],
        }),
      }}
    />
    </>
  );
}
