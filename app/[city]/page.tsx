import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CITIES, CATEGORIES, getCityStats, type CitySlug } from "../lib/toilet-data";

const CITY_META: Record<string, { keywords: string[]; tips: string[] }> = {
  tokyo: {
    keywords: ["Shinjuku", "Shibuya", "Ueno", "Ginza", "Tokyo Station", "Akihabara"],
    tips: [
      "Shinjuku and Shibuya stations have large, clean restrooms with baby facilities",
      "Department stores in Ginza and Ikebukuro have excellent family restrooms",
      "Ueno Park and Yoyogi Park have multiple toilet blocks",
      "Convenience stores (7-Eleven, Lawson, FamilyMart) are always open",
    ],
  },
  osaka: {
    keywords: ["Namba", "Umeda", "Shinsaibashi", "Dotonbori", "Shin-Osaka"],
    tips: [
      "Namba and Umeda stations have well-maintained family restrooms",
      "Dotonbori area shopping malls offer clean facilities with changing tables",
      "Universal Studios Japan has baby care rooms throughout the park",
      "Osaka Castle Park and Tennoji Zoo have family toilet blocks",
    ],
  },
  kyoto: {
    keywords: ["Kyoto Station", "Gion", "Arashiyama", "Kinkakuji", "Fushimi Inari"],
    tips: [
      "Kyoto Station has family restrooms on multiple floors",
      "Major temple complexes (Kinkakuji, Kiyomizudera) have on-site toilets",
      "Arashiyama has public toilets near the bamboo grove",
      "Nishiki Market area has facilities in nearby shopping centers",
    ],
  },
  nagoya: {
    keywords: ["Nagoya Station", "Sakae", "Osu", "Fushimi", "Yabachō", "Nagoya Castle"],
    tips: [
      "Nagoya Station's Takashimaya and JR Gate Tower have excellent family restrooms",
      "Sakae underground mall (Central Park) has spacious facilities",
      "Osu Shopping District has public restrooms at multiple points",
      "Nagoya Castle and Higashiyama Zoo have well-maintained family toilet blocks",
    ],
  },
};

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
  return {
    title: `Family Friendly Toilets in ${c.name}, Japan | Family Toilet Japan`,
    description: `Find clean, family-friendly toilets with baby changing tables in ${c.name}, Japan. Free map with ${getCityStats(city as CitySlug).total}+ locations including wheelchair access.`,
    keywords: [
      `family friendly toilet ${c.name.toLowerCase()}`,
      `baby changing room ${c.name.toLowerCase()}`,
      `public toilet ${c.name.toLowerCase()} japan`,
      `clean toilet ${c.name.toLowerCase()}`,
      ...(CITY_META[city]?.keywords.map((k) => `toilet ${k.toLowerCase()} japan`) ?? []),
    ],
    openGraph: {
      title: `Family Friendly Toilets in ${c.name} | Family Toilet Japan`,
      description: `Find ${getCityStats(city as CitySlug).total}+ toilets in ${c.name} with baby changing tables and wheelchair access.`,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  if (!(city in CITIES)) notFound();

  const c = CITIES[city as CitySlug];
  const stats = getCityStats(city as CitySlug);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-3xl font-bold mb-2">
          Family Friendly Toilets in {c.name}
        </h1>
        <p className="text-sky-100 max-w-lg mx-auto">
          Find clean, safe toilets with baby changing facilities in {c.name}, Japan.
          Perfect for families traveling with young children.
        </p>
        <Link
          href={`/map?city=${city}`}
          className="mt-6 inline-block bg-white text-sky-600 font-bold px-8 py-3 rounded-full hover:bg-sky-50 transition-colors"
        >
          📍 Open Map
        </Link>
      </div>

      {/* Stats */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          {c.name} Toilet Stats
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-10">
          {[
            { label: "Total Toilets", value: stats.total, icon: "🚽" },
            { label: "Baby Changing Table", value: stats.withChangingTable, icon: "🍼" },
            { label: "Wheelchair Accessible", value: stats.wheelchair, icon: "♿" },
            { label: "Free to Use", value: stats.free, icon: "💚" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-sky-50 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">{icon}</div>
              <div className="text-2xl font-bold text-sky-700">{value.toLocaleString()}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Browse by Feature</h2>
        <div className="space-y-3 mb-10">
          {Object.entries(CATEGORIES).map(([slug, cat]) => (
            <Link
              key={slug}
              href={`/${city}/${slug}`}
              className="flex items-center justify-between bg-gray-50 hover:bg-sky-50 rounded-xl px-5 py-4 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <div className="font-semibold text-gray-800">{cat.name}</div>
                  <div className="text-sm text-gray-500">{cat.description}</div>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="font-bold text-amber-800 mb-2">💡 Tips for families in {c.name}</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            {(CITY_META[city]?.tips ?? [
              "Department stores and shopping malls have the best facilities",
              "Train station toilets are clean and usually free",
              "Look for the 🍼 icon to find baby changing tables",
              "Convenience stores (7-Eleven, Lawson, FamilyMart) are always open",
            ]).map((tip) => (
              <li key={tip}>• {tip}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Family Friendly Toilets in ${c.name}`,
            description: `Find ${stats.total}+ family-friendly toilets in ${c.name}, Japan`,
            url: `https://family-toilet-japan.vercel.app/${city}`,
          }),
        }}
      />
    </div>
  );
}
