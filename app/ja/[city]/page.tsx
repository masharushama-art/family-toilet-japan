import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CITIES, getCityStats, type CitySlug } from "../../lib/toilet-data";

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
  const BASE = "https://family-toilet-japan.vercel.app";
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
      languages: {
        "en": `${BASE}/${city}`,
        "ja": `${BASE}/ja/${city}`,
      },
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

        {/* よくある質問 */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">よくある質問</h2>
        <div className="space-y-3 mb-10">
          {[
            {
              q: `${c.jaName}でおむつ替え台があるトイレはどこ？`,
              a: `地図を開いて現在地ボタンを押すと、${c.jaName}近くのおむつ替え台付きトイレが青いピンで表示されます。現在${stats.withChangingTable}件収録済みです。`,
            },
            {
              q: `${c.jaName}のファミリートイレ情報は最新ですか？`,
              a: "データはOpenStreetMapと自治体オープンデータをもとに定期的に更新しています。情報が古い場合はOpenStreetMapから修正できます。",
            },
            {
              q: "オフラインでも使えますか？",
              a: "PWAとしてインストールすれば、一度開いたエリアはオフラインでも地図が表示されます。海外のSIMでも安心。",
            },
            {
              q: "無料で使えますか？",
              a: "完全無料・会員登録不要です。",
            },
          ].map(({ q, a }) => (
            <div key={q} className="border border-gray-100 rounded-xl p-4">
              <p className="font-semibold text-gray-800 text-sm mb-1">Q. {q}</p>
              <p className="text-gray-600 text-sm leading-relaxed">A. {a}</p>
            </div>
          ))}
        </div>

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
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "ファミリートイレジャパン", item: "https://family-toilet-japan.vercel.app/ja" },
                { "@type": "ListItem", position: 2, name: `${c.jaName}のファミリートイレ`, item: `https://family-toilet-japan.vercel.app/ja/${city}` },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: `${c.jaName}でおむつ替え台があるトイレはどこ？`,
                  acceptedAnswer: { "@type": "Answer", text: `地図を開いて現在地ボタンを押すと、${c.jaName}近くのおむつ替え台付きトイレが青いピンで表示されます。現在${stats.withChangingTable}件収録済みです。` },
                },
                {
                  "@type": "Question",
                  name: "オフラインでも使えますか？",
                  acceptedAnswer: { "@type": "Answer", text: "PWAとしてインストールすれば、一度開いたエリアはオフラインでも地図が表示されます。" },
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
