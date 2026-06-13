import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CITIES, CATEGORIES,
  getToiletsByCityAndCategory,
  type CitySlug, type CategorySlug,
} from "../../lib/toilet-data";

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
  };
}

export default async function CityCategory({ params }: Props) {
  const { city, category } = await params;
  if (!(city in CITIES) || !(category in CATEGORIES)) notFound();

  const c = CITIES[city as CitySlug];
  const cat = CATEGORIES[category as CategorySlug];
  const toilets = getToiletsByCityAndCategory(city as CitySlug, category as CategorySlug);

  return (
    <div className="min-h-screen bg-white">
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

      {/* List */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          All locations ({toilets.length})
        </h2>
        <div className="space-y-2">
          {toilets.slice(0, 50).map((t) => (
            <div key={t.id} className="border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800 text-sm">
                  {t.name || "Public Toilet"}
                </p>
                <div className="flex gap-2 mt-0.5">
                  {t.changingTable && <span className="text-xs text-sky-600">🍼 Changing table</span>}
                  {t.wheelchair && <span className="text-xs text-green-600">♿ Wheelchair</span>}
                  {!t.fee && <span className="text-xs text-gray-500">Free</span>}
                </div>
              </div>
              <a
                href={`https://www.google.com/maps?q=${t.lat},${t.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-500 text-xs font-medium shrink-0 ml-2"
              >
                Map →
              </a>
            </div>
          ))}
        </div>
        {toilets.length > 50 && (
          <p className="text-center text-gray-500 text-sm mt-4">
            Showing 50 of {toilets.length}. <Link href={`/map?city=${city}&filter=${category}`} className="text-sky-600">View all on map →</Link>
          </p>
        )}
      </div>
    </div>
  );
}
