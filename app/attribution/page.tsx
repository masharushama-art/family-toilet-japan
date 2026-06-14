import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Sources & Attribution | Family Toilet Japan",
  description: "Open data sources, licenses, and attribution for Family Toilet Japan.",
};

const sources = [
  {
    name: "OpenStreetMap",
    license: "Open Database License (ODbL) 1.0",
    licenseUrl: "https://opendatacommons.org/licenses/odbl/",
    url: "https://www.openstreetmap.org/copyright",
    description: "Toilet locations for Tokyo (渋谷区・港区), Kyoto, Nagoya (OSM portion), and all cities.",
    icon: "🗺️",
  },
  {
    name: "Tokyo Metropolitan Area — 16 Ward Open Data",
    license: "Creative Commons Attribution 4.0 (CC BY 4.0)",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    url: "https://catalog.data.metro.tokyo.lg.jp/",
    description:
      "公衆トイレ一覧 CSVs from 千代田区, 中央区, 新宿区, 文京区, 台東区, 墨田区, 江東区, 品川区, 目黒区, 大田区, 世田谷区, 渋谷区 (partial), 中野区, 杉並区, 豊島区, 北区. Published under 自治体標準オープンデータセット 13-column format.",
    icon: "🗼",
  },
  {
    name: "Osaka Prefecture Open Data — 大阪府オープンデータ",
    license: "Creative Commons Attribution 4.0 (CC BY 4.0)",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    url: "https://www.pref.osaka.lg.jp/",
    description: "公衆トイレ一覧 CSV provided by Osaka Prefecture.",
    icon: "🏯",
  },
  {
    name: "マップナビおおさか",
    license: "Creative Commons Attribution 4.0 (CC BY 4.0)",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    url: "https://www.mapnavi.pref.osaka.lg.jp/",
    description: "Osaka city accessible toilet locations (車椅子対応公衆便所).",
    icon: "♿",
  },
  {
    name: "名古屋市 BODIK オープンデータ",
    license: "Creative Commons Attribution 4.0 (CC BY 4.0)",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    url: "https://www.city.nagoya.jp/",
    description: "名古屋市 public toilet CSV (892 records). Coordinates approximated via GSI geocoding for records without lat/lon.",
    icon: "🏰",
  },
  {
    name: "国土地理院 (GSI) 住所検索 API",
    license: "国土地理院コンテンツ利用規約 (Attribution required)",
    licenseUrl: "https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html",
    url: "https://msearch.gsi.go.jp/address-search/AddressSearch",
    description:
      "Used for geocoding Nagoya municipal addresses to approximate coordinates (chome-level centroid). Records using GSI geocoding are shown with dashed markers and an 'Approximate location' note.",
    icon: "📍",
  },
];

export default function AttributionPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/" className="text-sky-600 text-sm hover:underline">← Home</Link>

        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">Data Sources &amp; Attribution</h1>
        <p className="text-gray-600 text-sm mb-8">
          Family Toilet Japan combines data from multiple open-data providers under open licenses.
          We gratefully acknowledge each source below.
        </p>

        <div className="space-y-5">
          {sources.map((s) => (
            <div key={s.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-900 text-sm leading-tight">
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-sky-700">
                      {s.name}
                    </a>
                  </h2>
                  <a
                    href={s.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-600 hover:underline mt-0.5 inline-block"
                  >
                    {s.license}
                  </a>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{s.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-sky-50 border border-sky-100 rounded-xl p-5">
          <h2 className="font-semibold text-sky-800 text-sm mb-2">Map Tiles</h2>
          <p className="text-xs text-gray-600">
            Map tiles © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">OpenStreetMap contributors</a>, served via the OpenStreetMap tile server (usage subject to <a href="https://operations.osmfoundation.org/policies/tiles/" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">OSM tile usage policy</a>).
          </p>
        </div>

        <p className="text-xs text-gray-400 mt-8 text-center">
          Family Toilet Japan is not affiliated with any data provider listed above.
        </p>
      </div>
    </main>
  );
}
