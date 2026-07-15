import type { Metadata } from "next";
import Link from "next/link";
import { CITIES } from "../lib/toilet-data";

const BASE = "https://familytoiletjapan.com";

export const metadata: Metadata = {
  title: "Embed a Free Toilet Map Widget — Family Toilet Japan",
  description: "Embed a free, interactive map of family-friendly toilets in Japan on your travel blog or website. No sign-up, no API key — just copy one line of HTML.",
  alternates: { canonical: `${BASE}/widget` },
};

const EXAMPLE_CITIES = ["tokyo", "osaka", "kyoto", "yokohama", "fukuoka", "sapporo"] as const;

export default function WidgetPage() {
  const snippet = (city: string) =>
    `<iframe src="${BASE}/map?city=${city}&embed=1" width="100%" height="480" style="border:1px solid #e5e7eb;border-radius:12px" loading="lazy" title="Family Toilet Japan — ${city} map"></iframe>`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Embed Our Toilet Map on Your Site</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Writing about traveling Japan with kids? Add a free interactive map of baby-changing toilets to your blog — one line of HTML, no API key.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">How it works</h2>
        <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-8 list-decimal list-inside">
          <li>Copy the embed code for the city you&apos;re writing about</li>
          <li>Paste it into your blog post or page (any platform that allows iframes)</li>
          <li>Your readers get a live, zoomable map of family-friendly toilets — filters included</li>
        </ol>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Embed codes</h2>
        <div className="space-y-4 mb-10">
          {EXAMPLE_CITIES.map((city) => (
            <div key={city} className="border border-gray-100 dark:border-gray-800 rounded-xl p-4">
              <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-2">
                {CITIES[city].name}
              </p>
              <pre className="bg-gray-50 dark:bg-gray-800/40 rounded-lg p-3 text-xs text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-pre-wrap break-all">{snippet(city)}</pre>
            </div>
          ))}
          <p className="text-xs text-gray-400">
            Works for all 47 prefectures — just change the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">city=</code> parameter to any city slug (e.g. nagoya, hiroshima, okinawa).
          </p>
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Live preview</h2>
        <iframe
          src="/map?city=tokyo&embed=1"
          className="w-full h-96 border border-gray-200 dark:border-gray-700 rounded-xl"
          loading="lazy"
          title="Family Toilet Japan — Tokyo map preview"
        />

        <div className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-5 mt-8 text-sm text-sky-800 dark:text-sky-200">
          <p className="font-semibold mb-1">Terms of use</p>
          <p>
            The widget is free for any website. Map data © OpenStreetMap contributors (ODbL). We&apos;d appreciate a link back to Family Toilet Japan, but the widget already includes one. Questions? Use our <a href="https://forms.gle/rs3vP7d6srW1pGHs7" className="underline" target="_blank" rel="noopener noreferrer">contact form</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
