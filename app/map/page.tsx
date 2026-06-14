import { Suspense } from "react";
import type { Metadata } from "next";
import MapPageClient from "../components/MapPageClient";

export const metadata: Metadata = {
  title: "Map — Find Family Toilets Near You | Family Toilet Japan",
  description:
    "Interactive map of 6,000+ family-friendly toilets in Japan with baby changing tables. Find the nearest clean toilet in Tokyo, Osaka, and Kyoto.",
  keywords: [
    "family toilet map japan",
    "baby changing table map tokyo",
    "find toilet japan",
    "nearest toilet japan map",
  ],
};

const MapFallback = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-sky-50 px-6 text-center">
    <div className="text-5xl mb-4">🗺️</div>
    <p className="text-sky-700 font-semibold text-lg mb-2">Loading map…</p>
    <p className="text-gray-500 text-sm mb-6">6,000+ family-friendly toilets in Tokyo, Osaka &amp; Kyoto</p>
    <div className="flex gap-3 text-sm">
      <a href="/tokyo" className="text-sky-600 underline">Tokyo</a>
      <a href="/osaka" className="text-sky-600 underline">Osaka</a>
      <a href="/kyoto" className="text-sky-600 underline">Kyoto</a>
    </div>
  </div>
);

export default function MapPage() {
  return (
    <Suspense fallback={<MapFallback />}>
      <MapPageClient />
    </Suspense>
  );
}
