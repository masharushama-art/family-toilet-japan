import type { Metadata } from "next";
import Link from "next/link";
import { CITIES, getCityStats, type CitySlug } from "../lib/toilet-data";

const BASE = "https://family-toilet-japan.vercel.app";

export const metadata: Metadata = {
  title: "Data Coverage — Toilet Counts by City | Family Toilet Japan",
  description: "How many family-friendly toilets we cover in each Japanese city — total locations, baby changing tables, and wheelchair-accessible facilities, updated with every data refresh.",
  alternates: { canonical: `${BASE}/coverage` },
};

export default function CoveragePage() {
  const rows = (Object.keys(CITIES) as CitySlug[])
    .map((slug) => ({ slug, name: CITIES[slug].name, ...getCityStats(slug) }))
    .sort((a, b) => b.total - a.total);

  const totals = rows.reduce(
    (acc, r) => ({
      total: acc.total + r.total,
      ct: acc.ct + r.withChangingTable,
      wc: acc.wc + r.wheelchair,
    }),
    { total: 0, ct: 0, wc: 0 }
  );

  const updated = new Date().toISOString().slice(0, 10);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Data Coverage</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          {totals.total.toLocaleString()} toilets across Japan — {totals.ct.toLocaleString()} with baby changing tables, {totals.wc.toLocaleString()} wheelchair accessible.
        </p>
        <p className="text-sky-200 text-xs mt-2">Data refreshed with every deployment · Last build: {updated}</p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 text-xs border-b border-gray-100 dark:border-gray-800">
                <th className="py-2 pr-2">City</th>
                <th className="py-2 pr-2 text-right">Total</th>
                <th className="py-2 pr-2 text-right">🍼 Changing</th>
                <th className="py-2 text-right">♿ Accessible</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.slug} className="border-b border-gray-50">
                  <td className="py-2.5 pr-2">
                    <Link href={`/${r.slug}`} className="text-sky-600 hover:underline font-medium">
                      {r.name}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-2 text-right text-gray-700 dark:text-gray-300">{r.total.toLocaleString()}</td>
                  <td className="py-2.5 pr-2 text-right text-gray-700 dark:text-gray-300">{r.withChangingTable.toLocaleString()}</td>
                  <td className="py-2.5 text-right text-gray-700 dark:text-gray-300">{r.wheelchair.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-5 mt-8 text-sm text-gray-600 dark:text-gray-300">
          <p className="font-semibold text-gray-800 dark:text-gray-100 mb-1">About this data</p>
          <p>
            Sourced from OpenStreetMap (ODbL) and municipal open data across Japan, refreshed with each site deployment. Found something incorrect? Each toilet&apos;s detail page links to its OpenStreetMap entry where you can submit a fix. See <Link href="/attribution" className="text-sky-600 underline">data sources</Link> for licensing.
          </p>
        </div>
      </div>
    </div>
  );
}
