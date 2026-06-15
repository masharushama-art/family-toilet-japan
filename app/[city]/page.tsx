import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CITIES, CATEGORIES, getCityStats, getToiletsByCity, type CitySlug } from "../lib/toilet-data";
import { cityAlternates, BASE } from "../lib/lang-cities";
import ShareButtons from "../components/ShareButtons";
import { AdUnit } from "../components/AdSense";

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
  yokohama: {
    keywords: ["Yokohama Station", "Minato Mirai", "Chinatown", "Kannai", "Motomachi"],
    tips: [
      "Minato Mirai shopping malls (Mark Is, Queen's Square) have excellent family restrooms",
      "Yokohama Station has clean facilities on multiple floors",
      "Yamashita Park and Rinko Park have public toilet blocks",
      "Chinatown area shopping centers have baby-friendly facilities nearby",
    ],
  },
  fukuoka: {
    keywords: ["Hakata Station", "Tenjin", "Canal City", "Ohori Park", "Fukuoka Tower"],
    tips: [
      "Hakata Station and Tenjin have clean family restrooms across multiple floors",
      "Canal City Hakata shopping mall has well-maintained baby facilities",
      "Ohori Park has public toilet blocks throughout the grounds",
      "Fukuoka Tower and Seaside Momochi area have family-friendly facilities",
    ],
  },
  nara: {
    keywords: ["Nara Park", "Todaiji", "Kasuga Taisha", "Kintetsu Nara Station", "Deer Park"],
    tips: [
      "Nara Park has multiple public toilet blocks — essential with young children",
      "Kintetsu Nara Station area has clean family restrooms",
      "Todaiji and Kasuga Taisha have on-site facilities",
      "Deer are friendly but watch food — keep snacks in bags",
    ],
  },
  chiba: {
    keywords: ["Tokyo Disneyland", "Tokyo DisneySea", "Makuhari Messe", "Chiba Station", "Inage Seaside Park"],
    tips: [
      "Tokyo Disneyland and DisneySea have excellent baby care centers throughout",
      "Chiba Station area shopping malls (Sogo, Mio) have family restrooms",
      "Inage Seaside Park has public toilet blocks near the beach",
      "Makuhari Messe area has clean facilities at the convention center",
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
    alternates: {
      canonical: `${BASE}/${city}`,
      languages: cityAlternates(city),
    },
    openGraph: {
      title: `Family Friendly Toilets in ${c.name} | Family Toilet Japan`,
      description: `Find ${getCityStats(city as CitySlug).total}+ toilets in ${c.name} with baby changing tables and wheelchair access.`,
      images: [{ url: `${BASE}/${city}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Family Friendly Toilets in ${c.name} | Family Toilet Japan`,
      description: `Find ${getCityStats(city as CitySlug).total}+ toilets in ${c.name} with baby changing tables.`,
      images: [`${BASE}/${city}/opengraph-image`],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  if (!(city in CITIES)) notFound();

  const c = CITIES[city as CitySlug];
  const stats = getCityStats(city as CitySlug);
  const topToilets = getToiletsByCity(city as CitySlug)
    .filter((t) => t.changingTable)
    .slice(0, 10);

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
        <div className="mt-4 flex justify-center">
          <ShareButtons
            url={`https://family-toilet-japan.vercel.app/${city}`}
            text={`Find family-friendly toilets in ${c.name}, Japan — ${stats.total}+ locations with baby changing tables 🍼`}
          />
        </div>
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

        {/* Ad */}
        <AdUnit slot="2847361905" label="City page — between categories and tips" />

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
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Family Toilet Japan", item: "https://family-toilet-japan.vercel.app" },
                { "@type": "ListItem", position: 2, name: c.name, item: `https://family-toilet-japan.vercel.app/${city}` },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: `Family Friendly Toilets in ${c.name}`,
              description: `Find ${stats.total}+ family-friendly toilets in ${c.name}, Japan`,
              url: `https://family-toilet-japan.vercel.app/${city}`,
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: `Family-friendly toilets with baby changing tables in ${c.name}`,
              numberOfItems: topToilets.length,
              itemListElement: topToilets.map((t, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "CivicStructure",
                  name: t.nameEn || t.name || `Public Toilet ${i + 1}`,
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: t.lat,
                    longitude: t.lon,
                  },
                  ...(t.address ? { address: t.address } : {}),
                  amenityFeature: [
                    { "@type": "LocationFeatureSpecification", name: "Baby Changing Table", value: true },
                    ...(t.wheelchair ? [{ "@type": "LocationFeatureSpecification", name: "Wheelchair Accessible", value: true }] : []),
                    ...(t.fee === false ? [{ "@type": "LocationFeatureSpecification", name: "Free", value: true }] : []),
                  ],
                },
              })),
            },
          ]),
        }}
      />
    </div>
  );
}
