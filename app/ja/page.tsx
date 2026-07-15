import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "日本のファミリートイレ・おむつ替え台マップ | Family Toilet Japan",
  description: "赤ちゃん連れ・子連れ旅行に便利。日本全国47都道府県、16,000件以上のファミリートイレ・おむつ替え台の場所を無料で検索。東京・大阪・京都・名古屋など主要都市対応。",
  keywords: [
    "おむつ替え台 場所",
    "ファミリートイレ 東京",
    "赤ちゃん連れ トイレ 日本",
    "子連れ 観光 トイレ",
    "授乳室 トイレ 日本",
    "おむつ替え 公衆トイレ",
    "ベビールーム 日本",
  ],
  alternates: {
    canonical: "https://familytoiletjapan.com/ja",
    languages: {
      "en":        "https://familytoiletjapan.com",
      "ja":        "https://familytoiletjapan.com/ja",
      "zh-TW":     "https://familytoiletjapan.com/zh",
      "ko":        "https://familytoiletjapan.com/ko",
      "x-default": "https://familytoiletjapan.com",
    },
  },
};

const cities = [
  { slug: "tokyo",    name: "東京",    icon: "🗼", count: "3,400+" },
  { slug: "osaka",    name: "大阪",    icon: "🏯", count: "1,200+" },
  { slug: "kyoto",    name: "京都",    icon: "⛩️", count: "800+"  },
  { slug: "nagoya",   name: "名古屋",  icon: "🏰", count: "900+"  },
  { slug: "yokohama", name: "横浜",    icon: "🌉", count: "1,000+" },
  { slug: "fukuoka",  name: "福岡",    icon: "🌸", count: "300+"  },
  { slug: "sapporo",  name: "札幌",    icon: "❄️", count: "200+"  },
  { slug: "nara",     name: "奈良",    icon: "🦌", count: "150+"  },
];

export default function JaPage() {
  return (
    <>
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-sky-600 text-white px-6 py-14 text-center">
        <div className="text-5xl mb-3">🚽</div>
        <h1 className="text-3xl font-bold mb-3">日本のファミリートイレ検索</h1>
        <p className="text-sky-100 max-w-md mx-auto mb-2">
          赤ちゃん・子連れ旅行をもっと快適に。
        </p>
        <p className="text-sky-100 max-w-md mx-auto mb-6">
          全国47都道府県・<strong>16,000件以上</strong>のおむつ替え台付きトイレを無料で検索できます。
        </p>
        <Link
          href="/map"
          className="inline-block bg-white text-sky-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors"
        >
          📍 近くのトイレを探す
        </Link>
        <p className="text-sky-200 text-xs mt-3">無料・登録不要・オフライン対応</p>
      </div>

      {/* Features */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="grid grid-cols-3 gap-4 mb-10 text-center">
          {[
            { icon: "🍼", label: "おむつ替え台" },
            { icon: "♿", label: "車椅子対応" },
            { icon: "🕐", label: "24時間トイレ" },
          ].map(({ icon, label }) => (
            <div key={label} className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl py-4 px-2">
              <div className="text-3xl mb-1">{icon}</div>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">{label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">主要都市から探す</h2>
        <div className="grid grid-cols-4 gap-2 mb-10">
          {cities.map(({ slug, name, icon, count }) => (
            <Link
              key={slug}
              href={`/ja/${slug}`}
              className="border border-gray-100 dark:border-gray-800 hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-gray-800 rounded-xl py-3 text-center transition-colors"
            >
              <div className="text-2xl mb-0.5">{icon}</div>
              <p className="font-medium text-gray-800 dark:text-gray-100 text-xs">{name}</p>
              <p className="text-gray-400 text-[10px] mt-0.5">{count}</p>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">お役立ちガイド</h2>
        <div className="space-y-3 mb-10">
          {[
            { slug: "best-baby-changing-facilities-tokyo", icon: "🗼", title: "東京のおむつ替え・授乳室ガイド", desc: "新宿・渋谷・上野・銀座・東京駅のおすすめベビールーム" },
            { slug: "best-baby-changing-facilities-osaka", icon: "🏯", title: "大阪のおむつ替え・授乳室ガイド", desc: "なんば・梅田・天王寺・USJ周辺のベビー設備を網羅" },
            { slug: "kyoto-with-baby", icon: "⛩️", title: "赤ちゃん連れ京都観光ガイド", desc: "ベビーカーで回れる観光地・移動手段・子連れグルメ" },
            { slug: "japan-travel-with-baby", icon: "👶", title: "赤ちゃん連れ日本旅行ガイド", desc: "おむつ替え場所の探し方・持ち物・移動のコツ" },
            { slug: "japan-train-travel-with-stroller", icon: "🚅", title: "ベビーカーで電車・新幹線に乗るコツ", desc: "新幹線の座席選び・多目的室・宅急便の活用術" },
            { slug: "japan-family-restaurants-guide", icon: "🍽️", title: "子連れ外食完全ガイド", desc: "ファミレス比較・回転寿司・うどんチェーンの子連れ攻略" },
            { slug: "traveling-japan-with-toddler-checklist", icon: "🧳", title: "子連れ旅行の持ち物チェックリスト", desc: "持っていくもの・現地で買うもの・季節別の準備" },
            { slug: "summer-festivals-with-kids-japan", icon: "🎆", title: "子連れ夏祭り・花火大会攻略ガイド", desc: "混雑回避・熱中症対策・トイレの探し方" },
            { slug: "autumn-foliage-with-kids-japan", icon: "🍁", title: "子連れ紅葉狩りガイド", desc: "見頃の時期・穴場スポット・防寒対策" },
            { slug: "cherry-blossoms-with-kids-japan", icon: "🌸", title: "子連れ花見・桜スポットガイド", desc: "見頃の時期・穴場スポット・混雑回避" },
            { slug: "tokyo-with-baby-winter", icon: "🧣", title: "冬の東京を赤ちゃんと楽しむ", desc: "イルミネーション・屋内スポット・防寒対策" },
            { slug: "yokohama-family-travel-tips", icon: "🌉", title: "子連れ横浜観光ガイド", desc: "アンパンマンミュージアム・みなとみらい・中華街" },
            { slug: "osaka-family-travel-tips", icon: "🎡", title: "子連れ大阪観光ガイド", desc: "ファミリー向けエリア・USJ・ベビーカー移動のコツ" },
            { slug: "nagoya-family-travel-tips", icon: "🏰", title: "子連れ名古屋観光ガイド", desc: "レゴランド・名古屋港水族館・名古屋めし攻略" },
            { slug: "fukuoka-family-travel-tips", icon: "🌸", title: "子連れ福岡観光ガイド", desc: "キャナルシティ・動植物園・子連れラーメン攻略" },
            { slug: "sapporo-family-travel-tips", icon: "❄️", title: "子連れ札幌観光ガイド", desc: "円山動物園・雪まつり・冬の赤ちゃん防寒対策" },
            { slug: "sendai-family-travel-tips", icon: "🌿", title: "子連れ仙台観光ガイド", desc: "八木山動物公園・うみの杜水族館・松島日帰り旅行" },
            { slug: "hiroshima-family-travel-tips", icon: "⛩️", title: "子連れ広島観光ガイド", desc: "宮島・平和記念公園・お好み焼き子連れ攻略" },
            { slug: "naha-okinawa-family-travel-tips", icon: "🌺", title: "子連れ沖縄・那覇観光ガイド", desc: "美ら海水族館・レンタカー・赤ちゃん連れビーチ" },
          ].map(({ slug, icon, title, desc }) => (
            <Link
              key={slug}
              href={`/ja/guide/${slug}`}
              className="flex items-start gap-3 border border-gray-100 dark:border-gray-800 hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-gray-800 rounded-xl p-4 transition-colors"
            >
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{title}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">よくある質問</h2>
        <div className="space-y-4 mb-10">
          {[
            { q: "どうやって使うの？", a: "マップを開いて現在地ボタンを押すと、近くのおむつ替え台付きトイレが表示されます。青いピンがおむつ替え台ありのトイレです。" },
            { q: "データはどこから？", a: "OpenStreetMapと各自治体のオープンデータを使用しています。全国16,000件以上を収録。" },
            { q: "オフラインで使える？", a: "PWAとしてインストールすれば、一度開いたエリアはオフラインでも地図が表示されます。" },
            { q: "無料で使える？", a: "完全無料・会員登録不要です。" },
          ].map(({ q, a }) => (
            <div key={q} className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-4">
              <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1">Q. {q}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">A. {a}</p>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-gray-400 space-x-3">
          <Link href="/" className="hover:underline">English</Link>
          <Link href="/zh" className="hover:underline">中文</Link>
          <Link href="/ko" className="hover:underline">한국어</Link>
          <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
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
            { "@type": "Question", name: "どうやって使うの？", acceptedAnswer: { "@type": "Answer", text: "マップを開いて現在地ボタンを押すと、近くのおむつ替え台付きトイレが表示されます。青いピンがおむつ替え台ありのトイレです。" } },
            { "@type": "Question", name: "データはどこから？", acceptedAnswer: { "@type": "Answer", text: "OpenStreetMapと各自治体のオープンデータを使用しています。全国16,000件以上を収録。" } },
            { "@type": "Question", name: "オフラインで使える？", acceptedAnswer: { "@type": "Answer", text: "PWAとしてインストールすれば、一度開いたエリアはオフラインでも地図が表示されます。" } },
            { "@type": "Question", name: "無料で使える？", acceptedAnswer: { "@type": "Answer", text: "完全無料・会員登録不要です。" } },
          ],
        }),
      }}
    />
    </>
  );
}
