import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CITIES, CATEGORIES,
  getToiletsByCityAndCategory,
  type CitySlug, type CategorySlug,
} from "../../lib/toilet-data";
import { getSpotsByCity } from "../../lib/spots";
import { AdUnit } from "../../components/AdSense";

const BASE = "https://family-toilet-japan.vercel.app";

interface Props {
  params: Promise<{ city: string; category: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CITIES).flatMap((city) =>
    Object.keys(CATEGORIES).map((category) => ({ city, category }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, category } = await params;
  if (!(city in CITIES) || !(category in CATEGORIES)) return {};
  const c = CITIES[city as CitySlug];
  const cat = CATEGORIES[category as CategorySlug];
  const count = getToiletsByCityAndCategory(city as CitySlug, category as CategorySlug).length;
  return {
    title: `${cat.name} in ${c.name} Japan — ${count} locations | Family Toilet Japan`,
    description: `Find ${count} toilets with ${cat.description.toLowerCase()} in ${c.name}, Japan. Free interactive map for families and tourists.`,
    keywords: [
      `${category.replace("-", " ")} ${c.name.toLowerCase()} japan`,
      `baby changing room ${c.name.toLowerCase()} japan`,
      `family toilet ${c.name.toLowerCase()}`,
    ],
    alternates: { canonical: `${BASE}/${city}/${category}` },
  };
}

const INTRO_TEXT: Record<CategorySlug, (cityName: string, count: number) => string> = {
  "changing-table": (name, count) =>
    `Traveling in ${name} with a baby or toddler? Here are ${count} toilets confirmed to have a baby changing table (おむつ交換台) — from department stores and train stations to parks and shopping malls. Tap any listing below to see the exact location, opening hours, and directions.`,
  wheelchair: (name, count) =>
    `${count} wheelchair-accessible public toilets in ${name}, Japan. Each listing includes GPS coordinates so you can navigate directly from your phone. Data is sourced from OpenStreetMap and municipal open data.`,
  free: (name, count) =>
    `${count} free public toilets in ${name} — no fee, no purchase required. Most public toilets in Japan are free, but this filter excludes the small number of paid facilities in tourist areas.`,
};

export default async function CityCategory({ params }: Props) {
  const { city, category } = await params;
  if (!(city in CITIES) || !(category in CATEGORIES)) notFound();

  const c = CITIES[city as CitySlug];
  const cat = CATEGORIES[category as CategorySlug];
  const toilets = getToiletsByCityAndCategory(city as CitySlug, category as CategorySlug);
  const spots = getSpotsByCity(city).slice(0, 6);
  const intro = INTRO_TEXT[category as CategorySlug](c.name, toilets.length);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-sky-600 text-white px-6 py-10 text-center">
        <Link href={`/${city}`} className="text-sky-200 text-sm mb-3 block hover:text-white">
          ← {c.name} Toilets
        </Link>
        <div className="text-4xl mb-2">{cat.icon}</div>
        <h1 className="text-2xl font-bold mb-1">
          {cat.name} in {c.name}
        </h1>
        <p className="text-sky-100 text-sm">
          {toilets.length} locations found
        </p>
        <Link
          href={`/map?city=${city}&filter=${category}`}
          className="mt-5 inline-block bg-white text-sky-600 font-bold px-6 py-3 rounded-full text-sm hover:bg-sky-50"
        >
          📍 View on Map
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Intro copy — SEO対策とユーザーへの説明 */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{intro}</p>

        {/* エリアショートカット */}
        {spots.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">Browse by area</h2>
            <div className="flex flex-wrap gap-2">
              {spots.map((s) => (
                <Link
                  key={s.slug}
                  href={`/spot/${s.slug}`}
                  className="text-xs bg-gray-50 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {s.type === "station" ? "🚉" : "📍"} {s.names.en}
                </Link>
              ))}
            </div>
          </div>
        )}

        <AdUnit slot="city-category-top" />

        {/* List */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
          All locations ({toilets.length})
        </h2>
        <div className="space-y-2">
          {toilets.slice(0, 50).map((t) => {
            // おむつ交換台付きは個別SSGページが存在するのでそちらへ内部リンクする
            const hasDetailPage = t.changingTable;
            const href = hasDetailPage ? `/toilet/${city}/${t.id}` : `/map?id=${t.id}&city=${city}`;
            return (
              <Link
                key={t.id}
                href={href}
                className="border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 flex items-center justify-between hover:border-sky-200 hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">
                    {t.nameEn || t.name || "Public Toilet"}
                  </p>
                  <div className="flex gap-2 mt-0.5">
                    {t.changingTable && <span className="text-xs text-sky-600 dark:text-sky-400">🍼 Changing table</span>}
                    {t.wheelchair && <span className="text-xs text-green-600 dark:text-green-400">♿ Wheelchair</span>}
                    {!t.fee && <span className="text-xs text-gray-500 dark:text-gray-400">Free</span>}
                  </div>
                </div>
                <span className="text-sky-500 text-xs font-medium shrink-0 ml-2">
                  {hasDetailPage ? "Details →" : "Map →"}
                </span>
              </Link>
            );
          })}
        </div>
        {toilets.length > 50 && (
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
            Showing 50 of {toilets.length}. <Link href={`/map?city=${city}&filter=${category}`} className="text-sky-600">View all on map →</Link>
          </p>
        )}

        {/* Other categories in this city */}
        <div className="mt-10">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">Other filters in {c.name}</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORIES)
              .filter(([slug]) => slug !== category)
              .map(([slug, otherCat]) => (
                <Link
                  key={slug}
                  href={`/${city}/${slug}`}
                  className="text-xs bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 px-3 py-1.5 rounded-full hover:bg-sky-100 transition-colors"
                >
                  {otherCat.icon} {otherCat.name}
                </Link>
              ))}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Family Toilet Japan", item: BASE },
              { "@type": "ListItem", position: 2, name: c.name, item: `${BASE}/${city}` },
              { "@type": "ListItem", position: 3, name: cat.name, item: `${BASE}/${city}/${category}` },
            ],
          }),
        }}
      />
    </div>
  );
}
