import Link from "next/link";

// /map のサーバー出力（クローラーが見る内容）。
// 地図本体は MapPageClient が dynamic(ssr:false) で読み込むため、SSRのHTMLには
// dynamic の loading コンポーネントが出力される。従来は「Loading map…」だけで
// サイトの中核ページなのに約12語しか無かったため、地図の使い方・アイコンの意味・
// データ出典など実際に役立つ説明を置く（2026-09-06、AdSense対策・ROADMAP.md参照）。
// hooks を使わないプレーンな JSX なので、サーバー/クライアント双方から利用できる。
export default function MapIntro() {
  return (
    <div className="min-h-screen bg-sky-50 px-6 py-12">
      <div className="max-w-2xl mx-auto text-gray-700">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🗺️</div>
          <h1 className="text-2xl font-bold text-sky-800 mb-2">Family Toilet Map of Japan</h1>
          <p className="text-sky-700 text-sm">Loading the interactive map… If it does not appear, please enable JavaScript.</p>
        </div>

        <h2 className="font-bold text-gray-800 mb-2">What this map shows</h2>
        <p className="text-sm leading-relaxed mb-5">
          Over 14,000 public toilets across all 47 prefectures of Japan, with the ones that matter most to
          parents highlighted: toilets with a <strong>baby changing table</strong> (🍼), <strong>wheelchair-accessible</strong>
          facilities (♿) and <strong>free-to-use</strong> toilets (💚). Each pin opens a detail card with the address,
          opening hours where known, the nearest station, and one-tap walking directions.
        </p>

        <h2 className="font-bold text-gray-800 mb-2">How to use it</h2>
        <ul className="text-sm leading-relaxed list-disc pl-5 space-y-1 mb-5">
          <li>Tap the <strong>locate</strong> button to jump to your current position and see the closest toilets sorted by distance.</li>
          <li>Use the <strong>filters</strong> to show only changing tables, wheelchair access or free toilets.</li>
          <li>Search a city or station name to move the map — or start from a city page below.</li>
          <li>Install the site as an app (PWA): areas you have already viewed keep working offline, useful with a limited travel SIM.</li>
        </ul>

        <h2 className="font-bold text-gray-800 mb-2">Where the data comes from</h2>
        <p className="text-sm leading-relaxed mb-6">
          Locations are compiled from OpenStreetMap (ODbL) and municipal open data (CC BY) and refreshed monthly.
          Coverage is best in large cities and around train stations; department stores and shopping malls almost
          always have the cleanest family restrooms, and convenience stores are open around the clock. Details and
          licensing are on our <Link href="/attribution" className="text-sky-600 underline">data sources</Link> page.
        </p>

        <h2 className="font-bold text-gray-800 mb-2">Start from a city</h2>
        <div className="flex flex-wrap gap-3 text-sm mb-6">
          {[["tokyo","Tokyo"],["osaka","Osaka"],["kyoto","Kyoto"],["nagoya","Nagoya"],["yokohama","Yokohama"],["fukuoka","Fukuoka"],["sapporo","Sapporo"],["nara","Nara"]].map(([slug, name]) => (
            <Link key={slug} href={`/${slug}`} className="text-sky-600 underline">{name}</Link>
          ))}
        </div>
        <p className="text-sm">
          Planning a trip? Read our <Link href="/#guides" className="text-sky-600 underline">family travel guides</Link> for
          city-by-city tips on baby rooms, strollers on trains and where to find the best facilities.
        </p>
      </div>
    </div>
  );
}
