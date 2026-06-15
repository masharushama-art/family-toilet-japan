import Link from "next/link";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import CitySearch from "./components/CitySearch";
import { AdUnit } from "./components/AdSense";

function getCityCount(slug: string): number {
  try {
    const file = path.join(process.cwd(), "public", "data", "cities", `${slug}.json`);
    const data = JSON.parse(fs.readFileSync(file, "utf-8")) as unknown[];
    return data.length;
  } catch {
    return 0;
  }
}

const OG_IMAGE = "https://family-toilet-japan.vercel.app/og-image.png";

export const metadata: Metadata = {
  title: "Family Toilet Japan — Find Family-Friendly Toilets with Baby Changing Tables",
  description: "Free map of 16,000+ family-friendly toilets in Japan. Find toilets with baby changing tables, wheelchair access, and 24-hour facilities in Tokyo, Osaka, Kyoto, Nagoya & Yokohama.",
  keywords: [
    "family friendly toilet japan",
    "baby changing room tokyo",
    "baby changing table japan",
    "public toilet japan map",
    "toilet with baby chair japan",
    "clean public toilet japan",
    "public toilet yokohama",
  ],
  openGraph: {
    title: "Family Toilet Japan — Find Family-Friendly Toilets with Baby Changing Tables",
    description: "Free map of 16,000+ family-friendly toilets in Japan. Find toilets with baby changing tables, wheelchair access, and 24-hour facilities in Tokyo, Osaka, Kyoto, Nagoya & Yokohama.",
    type: "website",
    url: "https://family-toilet-japan.vercel.app",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Family Toilet Japan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Family Toilet Japan — Find Family-Friendly Toilets with Baby Changing Tables",
    description: "Free map of 6,000+ family-friendly toilets in Japan.",
    images: [OG_IMAGE],
  },
};

const cityGroups = [
  {
    region: "Kanto",
    cities: [
      { slug: "tokyo",    name: "Tokyo",    icon: "🗼" },
      { slug: "yokohama", name: "Yokohama", icon: "🌉" },
      { slug: "chiba",    name: "Chiba",    icon: "🎡" },
      { slug: "saitama",  name: "Saitama",  icon: "🏙️" },
      { slug: "ibaraki",  name: "Mito",     icon: "⚔️" },
      { slug: "tochigi",  name: "Utsunomiya", icon: "🍓" },
      { slug: "gunma",    name: "Maebashi", icon: "♨️" },
    ],
  },
  {
    region: "Kansai",
    cities: [
      { slug: "osaka",    name: "Osaka",    icon: "🏯" },
      { slug: "kyoto",    name: "Kyoto",    icon: "⛩️" },
      { slug: "nara",     name: "Nara",     icon: "🦌" },
      { slug: "kobe",     name: "Kobe",     icon: "🌉" },
      { slug: "shiga",    name: "Otsu",     icon: "🚣" },
      { slug: "wakayama", name: "Wakayama", icon: "🏯" },
    ],
  },
  {
    region: "Chubu",
    cities: [
      { slug: "nagoya",   name: "Nagoya",   icon: "🏰" },
      { slug: "shizuoka", name: "Shizuoka", icon: "🗻" },
      { slug: "kanazawa", name: "Kanazawa", icon: "🏯" },
      { slug: "niigata",  name: "Niigata",  icon: "🌾" },
      { slug: "nagano",   name: "Nagano",   icon: "⛷️" },
      { slug: "gifu",     name: "Gifu",     icon: "🦅" },
      { slug: "toyama",   name: "Toyama",   icon: "🏔️" },
      { slug: "fukui",    name: "Fukui",    icon: "🦕" },
      { slug: "yamanashi",name: "Kofu",     icon: "🍇" },
      { slug: "mie",      name: "Tsu",      icon: "⛩️" },
    ],
  },
  {
    region: "Tohoku",
    cities: [
      { slug: "sendai",   name: "Sendai",   icon: "🌿" },
      { slug: "aomori",   name: "Aomori",   icon: "🍎" },
      { slug: "iwate",    name: "Morioka",  icon: "🐴" },
      { slug: "akita",    name: "Akita",    icon: "🐕" },
      { slug: "yamagata", name: "Yamagata", icon: "🍒" },
      { slug: "fukushima",name: "Fukushima",icon: "🍑" },
    ],
  },
  {
    region: "Hokkaido",
    cities: [
      { slug: "sapporo",  name: "Sapporo",  icon: "❄️" },
    ],
  },
  {
    region: "Chugoku",
    cities: [
      { slug: "hiroshima",name: "Hiroshima",icon: "🕊️" },
      { slug: "okayama",  name: "Okayama",  icon: "🍑" },
      { slug: "yamaguchi",name: "Yamaguchi",icon: "🐡" },
      { slug: "tottori",  name: "Tottori",  icon: "🏖️" },
      { slug: "shimane",  name: "Matsue",   icon: "🏯" },
    ],
  },
  {
    region: "Shikoku",
    cities: [
      { slug: "kagawa",   name: "Takamatsu",icon: "🍜" },
      { slug: "ehime",    name: "Matsuyama",icon: "🍊" },
      { slug: "kochi",    name: "Kochi",    icon: "🐟" },
      { slug: "tokushima",name: "Tokushima",icon: "💃" },
    ],
  },
  {
    region: "Kyushu & Okinawa",
    cities: [
      { slug: "fukuoka",  name: "Fukuoka",  icon: "🌸" },
      { slug: "kumamoto", name: "Kumamoto", icon: "🏯" },
      { slug: "nagasaki", name: "Nagasaki", icon: "⛪" },
      { slug: "kagoshima",name: "Kagoshima",icon: "🌋" },
      { slug: "oita",     name: "Oita",     icon: "♨️" },
      { slug: "miyazaki", name: "Miyazaki", icon: "🌴" },
      { slug: "saga",     name: "Saga",     icon: "🏺" },
      { slug: "okinawa",  name: "Naha",     icon: "🐠" },
    ],
  },
];

const guides = [
  {
    href: "/guide/how-to-use-japanese-toilet",
    title: "How to Use a Japanese Toilet",
    desc: "Washlet buttons, bidet guide, and tips for first-timers",
    icon: "🚽",
  },
  {
    href: "/guide/japan-travel-with-baby",
    title: "Japan Travel with Baby & Toddler",
    desc: "Changing rooms, strollers, eating out, and packing tips",
    icon: "👶",
  },
  {
    href: "/guide/best-baby-changing-facilities-tokyo",
    title: "Best Baby Changing Facilities in Tokyo",
    desc: "Shinjuku, Shibuya, Ginza, Ueno — area by area guide",
    icon: "🗼",
  },
  {
    href: "/guide/japan-toilet-etiquette",
    title: "Japan Toilet Etiquette Guide",
    desc: "Slippers, sound machines, washlets, and squat toilets explained",
    icon: "🥿",
  },
  {
    href: "/guide/osaka-family-travel-tips",
    title: "Osaka Family Travel Tips",
    desc: "Baby facilities, stroller access, and family dining in Osaka",
    icon: "🏯",
  },
];

const allCities = cityGroups.flatMap(({ region, cities }) =>
  cities.map((c) => ({ ...c, region }))
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-sky-600 text-white px-6 py-14 text-center">
        <div className="text-5xl mb-3">🚽</div>
        <h1 className="text-3xl font-bold mb-3">Family Toilet Japan</h1>
        <p className="text-sky-100 max-w-md mx-auto mb-6">
          Find family-friendly toilets with baby changing tables across Japan.
          16,000+ locations · all 47 prefectures — free &amp; no sign-up.
        </p>
        <Link
          href="/map"
          className="inline-block bg-white text-sky-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-sky-50 transition-colors"
        >
          📍 Find Toilets Near Me
        </Link>
        <p className="text-sky-200 text-xs mt-3">Works offline · PWA · No registration</p>
        <CitySearch cities={allCities} />
      </div>

      {/* Features */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="grid grid-cols-3 gap-4 mb-12 text-center">
          {[
            { icon: "🍼", label: "Baby changing tables" },
            { icon: "♿", label: "Wheelchair access" },
            { icon: "🕐", label: "24-hour toilets" },
          ].map(({ icon, label }) => (
            <div key={label} className="bg-sky-50 rounded-2xl py-4 px-2">
              <div className="text-3xl mb-1">{icon}</div>
              <p className="text-xs text-gray-600 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Popular Cities */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Cities</h2>
        <div className="grid grid-cols-4 gap-2 mb-12">
          {[
            { slug: "tokyo",    name: "Tokyo",    icon: "🗼" },
            { slug: "osaka",    name: "Osaka",    icon: "🏯" },
            { slug: "kyoto",    name: "Kyoto",    icon: "⛩️" },
            { slug: "nagoya",   name: "Nagoya",   icon: "🏰" },
            { slug: "yokohama", name: "Yokohama", icon: "🌉" },
            { slug: "fukuoka",  name: "Fukuoka",  icon: "🌸" },
            { slug: "sapporo",  name: "Sapporo",  icon: "❄️" },
            { slug: "nara",     name: "Nara",     icon: "🦌" },
          ].map(({ slug, name, icon }) => {
            const count = getCityCount(slug);
            return (
              <Link
                key={slug}
                href={`/${slug}`}
                className="border-2 border-sky-100 hover:border-sky-400 hover:bg-sky-50 rounded-xl py-3 text-center transition-colors"
              >
                <div className="text-2xl mb-0.5">{icon}</div>
                <p className="font-semibold text-gray-800 text-xs leading-tight">{name}</p>
                {count > 0 && (
                  <p className="text-sky-500 text-[10px] mt-0.5 font-medium">{count.toLocaleString()}</p>
                )}
              </Link>
            );
          })}
        </div>

        {/* Cities by region */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Browse by Region</h2>
        <div className="space-y-6 mb-12">
          {cityGroups.map(({ region, cities }) => (
            <div key={region}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{region}</h3>
              <div className="grid grid-cols-4 gap-2">
                {cities.map(({ slug, name, icon }) => {
                  const count = getCityCount(slug);
                  return (
                    <Link
                      key={slug}
                      href={`/${slug}`}
                      className="border border-gray-100 hover:border-sky-300 hover:bg-sky-50 rounded-xl py-3 text-center transition-colors"
                    >
                      <div className="text-2xl mb-0.5">{icon}</div>
                      <p className="font-medium text-gray-800 text-xs leading-tight">{name}</p>
                      {count > 0 && (
                        <p className="text-gray-400 text-[10px] mt-0.5">{count.toLocaleString()}</p>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Ad */}
        <AdUnit slot="7391048265" label="Top page — between regions and guides" />

        {/* Guides */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Travel Guides</h2>
        <div className="space-y-3 mb-12">
          {guides.map(({ href, title, desc, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 border border-gray-100 hover:border-sky-300 hover:bg-sky-50 rounded-2xl px-5 py-4 transition-colors"
            >
              <span className="text-3xl">{icon}</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <span className="text-gray-400 ml-auto">›</span>
            </Link>
          ))}
        </div>

        {/* About */}
        <div className="bg-gray-50 rounded-2xl p-6 text-sm text-gray-600">
          <h2 className="font-bold text-gray-800 mb-2">About Family Toilet Japan</h2>
          <p className="mb-2">
            Family Toilet Japan helps foreign families traveling in Japan quickly find
            safe, clean toilets with baby-friendly facilities. All data comes from
            OpenStreetMap and is updated regularly.
          </p>
          <p className="text-xs text-gray-400">
            Last updated: June 2026 · 16,277 locations
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Data: © OpenStreetMap contributors (ODbL) + Municipal Open Data (CC BY) ·{" "}
            <Link href="/attribution" className="underline hover:text-gray-600">Data sources &amp; attribution</Link>
            {" "}·{" "}
            <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>
            {" "}· Free to use · No tracking
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Family Toilet Japan",
            url: "https://family-toilet-japan.vercel.app",
            description: "Find family-friendly toilets with baby changing tables in Japan",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://family-toilet-japan.vercel.app/map",
            },
          }),
        }}
      />
    </div>
  );
}
