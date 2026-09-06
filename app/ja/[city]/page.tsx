import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CITIES, getCityStats, type CitySlug } from "../../lib/toilet-data";
import { cityAlternates, BASE } from "../../lib/lang-cities";
import { getGuidesForCity, guideHref } from "../../lib/guides";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  if (!(city in CITIES)) return {};
  const c = CITIES[city as CitySlug];
  const stats = getCityStats(city as CitySlug);
  const BASE = "https://familytoiletjapan.com";
  return {
    title: `${c.jaName}のおむつ替え台・ファミリートイレ ${stats.withChangingTable}件 | Family Toilet Japan`,
    description: `${c.jaName}のおむつ替え台付きトイレ・ファミリートイレを地図で検索。${stats.total}件以上収録、無料・登録不要。赤ちゃん連れ・子連れ旅行に。`,
    keywords: [
      `おむつ替え台 ${c.jaName}`,
      `ファミリートイレ ${c.jaName}`,
      `赤ちゃん連れ トイレ ${c.jaName}`,
      `子連れ ${c.jaName} トイレ`,
      `${c.jaName} 授乳室 トイレ`,
      `${c.jaName} 多目的トイレ`,
    ],
    alternates: {
      canonical: `${BASE}/ja/${city}`,
      languages: cityAlternates(city),
    },
    openGraph: {
      title: `${c.jaName}のおむつ替え台・ファミリートイレ`,
      description: `${c.jaName}のおむつ替え台付きトイレ${stats.withChangingTable}件を地図で検索。無料・登録不要。`,
      url: `${BASE}/ja/${city}`,
    },
  };
}

export default async function JaCityPage({ params }: Props) {
  const { city } = await params;
  if (!(city in CITIES)) notFound();

  const c = CITIES[city as CitySlug];
  const stats = getCityStats(city as CitySlug);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/ja" className="text-sky-200 text-sm mb-4 block hover:text-white">← ファミリートイレジャパン</Link>
        <h1 className="text-3xl font-bold mb-2">
          {c.jaName}のおむつ替え台・ファミリートイレ
        </h1>
        <p className="text-sky-100 text-sm max-w-md mx-auto mb-6">
          {c.jaName}のおむつ替え台付きトイレ・多目的トイレを地図で検索。
          赤ちゃん連れ・子連れ旅行をもっと快適に。
        </p>
        <Link
          href={`/map?city=${city}`}
          className="inline-block bg-white text-sky-600 font-bold px-7 py-3.5 rounded-full text-base hover:bg-sky-50 transition-colors"
        >
          📍 地図で探す
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* 関連ガイド記事 — 編集コンテンツを統計・FAQより前に置く（app/lib/guides.ts、ROADMAP.md参照） */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📖 {c.jaName}の旅行ガイド</h2>
          <div className="space-y-2">
            {getGuidesForCity(city).map((g) => (
              <Link
                key={g.slug}
                href={guideHref("ja", g.slug)}
                className="flex items-center justify-between border border-sky-100 bg-sky-50/50 hover:bg-sky-50 rounded-xl px-5 py-4 transition-colors"
              >
                <span className="text-sm font-medium text-gray-800">{g.ja}</span>
                <span className="text-gray-400">›</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 統計 */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { label: "おむつ替え台あり", value: stats.withChangingTable, icon: "🍼" },
            { label: "車椅子対応", value: stats.wheelchair, icon: "♿" },
            { label: "無料トイレ", value: stats.free, icon: "💚" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-sky-50 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">{icon}</div>
              <div className="text-xl font-bold text-sky-700">{value.toLocaleString()}</div>
              <div className="text-xs text-gray-600 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* 旧「よくある質問」ブロックは47都市で本文が同一（都市名のみ差し替え）の近似重複だったため、
            FAQPage構造化データともども除去（2026-09-06、AdSense対策・ROADMAP.md参照）。
            サイト共通のFAQは /faq を参照 */}

        {/* 英語版リンク */}
        <div className="bg-gray-50 rounded-2xl p-5 text-center text-sm text-gray-500">
          <p className="mb-2">英語版はこちら</p>
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
              { "@type": "ListItem", position: 1, name: "ファミリートイレジャパン", item: "https://familytoiletjapan.com/ja" },
              { "@type": "ListItem", position: 2, name: `${c.jaName}のファミリートイレ`, item: `https://familytoiletjapan.com/ja/${city}` },
            ],
          }),
        }}
      />
    </div>
  );
}
