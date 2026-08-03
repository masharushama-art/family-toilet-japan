import { Suspense } from "react";
import type { Metadata } from "next";
import MapPageClient from "../components/MapPageClient";

const BASE = "https://familytoiletjapan.com";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  // id/city付きは単一ピンを表示するだけの薄い派生URLで、Search Consoleで
  // 「重複しています。ユーザーにより、正規ページとして選択されていません」多発の原因になっていたため非インデックス化
  const isDeepLink = params.id !== undefined || params.city !== undefined;
  return {
    title: "Map — Find Family Toilets Near You | Family Toilet Japan",
    description:
      "Interactive map of 7,000+ family-friendly toilets in Japan with baby changing tables. Find the nearest clean toilet in Tokyo, Osaka, Kyoto, and Nagoya.",
    keywords: [
      "family toilet map japan",
      "baby changing table map tokyo",
      "find toilet japan",
      "nearest toilet japan map",
    ],
    // クエリ付き(id/city)もbareな /map に正規化する(deep linkは上のnoindexと合わせて二重に対策)
    alternates: { canonical: `${BASE}/map` },
    ...(isDeepLink ? { robots: { index: false, follow: true } } : {}),
  };
}

const MapFallback = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-sky-50 px-6 text-center">
    <div className="text-5xl mb-4">🗺️</div>
    <p className="text-sky-700 font-semibold text-lg mb-2">Loading map…</p>
    <p className="text-gray-500 text-sm mb-6">7,000+ family-friendly toilets in Tokyo, Osaka, Kyoto &amp; Nagoya</p>
    <div className="flex gap-3 text-sm">
      <a href="/tokyo" className="text-sky-600 underline">Tokyo</a>
      <a href="/osaka" className="text-sky-600 underline">Osaka</a>
      <a href="/kyoto" className="text-sky-600 underline">Kyoto</a>
      <a href="/nagoya" className="text-sky-600 underline">Nagoya</a>
    </div>
  </div>
);

export default function MapPage() {
  return (
    <>
      {/* 地図タイル取得のDNS+TLSを先行確立（LCP短縮） */}
      <link rel="preconnect" href="https://server.arcgisonline.com" />
      <Suspense fallback={<MapFallback />}>
        <MapPageClient />
      </Suspense>
    </>
  );
}
