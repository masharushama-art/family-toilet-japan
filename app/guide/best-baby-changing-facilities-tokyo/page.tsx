import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Baby Changing Facilities in Tokyo 2026 | Family Toilet Japan",
  description: "Complete guide to the best baby changing rooms and diaper changing facilities in Tokyo. Shinjuku, Shibuya, Ueno, Ginza, and more — with exact locations and tips.",
  keywords: [
    "baby changing facilities tokyo",
    "diaper changing station tokyo",
    "baby changing room shinjuku",
    "baby changing shibuya",
    "tokyo with baby",
    "nursing room tokyo",
    "baby room tokyo station",
    "changing table tokyo department store",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/best-baby-changing-facilities-tokyo" },
};

const spots = [
  {
    area: "Shinjuku",
    icon: "🏙️",
    places: [
      { name: "Isetan Shinjuku", tip: "6F baby room with nursing station, changing tables, and kids' meal area. One of the best in Tokyo." },
      { name: "Shinjuku Station (JR)", tip: "Multiple accessible restrooms with changing tables on the south, east, and west exits." },
      { name: "Takashimaya Times Square", tip: "7F family restroom with spacious changing area. Open until 8PM." },
    ],
  },
  {
    area: "Shibuya",
    icon: "🛍️",
    places: [
      { name: "Shibuya Hikarie", tip: "5F has a large baby room with 4 changing tables, nursing chairs, and a kids' wash area." },
      { name: "Tokyu Department Store", tip: "B1F and 7F family restrooms. The 7F baby room is quieter and well-equipped." },
      { name: "Shibuya Station (mark)", tip: "Look for 多目的トイレ signs — all have fold-down changing tables." },
    ],
  },
  {
    area: "Ueno",
    icon: "🦁",
    places: [
      { name: "Ueno Zoo", tip: "Baby care rooms near the main gate and the west garden with changing tables and microwave." },
      { name: "Ueno Park (public toilets)", tip: "Several toilet blocks throughout the park have changing facilities. The one near the fountain is newest." },
      { name: "Marui Department Store Ueno", tip: "5F baby room open to non-shoppers. Clean and rarely crowded." },
    ],
  },
  {
    area: "Ginza",
    icon: "✨",
    places: [
      { name: "Ginza Six", tip: "5F has an excellent baby room with 6 changing tables, nursing rooms, and a play area." },
      { name: "Matsuya Ginza", tip: "7F family restroom with changing tables. Request the baby room key at the service counter." },
      { name: "Itoya Stationery (B1F)", tip: "Clean public restroom with changing table — useful when in the Ginza shopping area." },
    ],
  },
  {
    area: "Tokyo Station",
    icon: "🚄",
    places: [
      { name: "Tokyo Station (Marunouchi side)", tip: "Accessible restroom near the north exit has a changing table. Also check the B1F corridor." },
      { name: "Kitte Mall (JP Tower)", tip: "B1F has a well-maintained baby room with multiple changing stations and vending machines for baby supplies." },
      { name: "Gran Sta (underground mall)", tip: "Several accessible restrooms throughout — look for the 🍼 icon on signs." },
    ],
  },
];

export default function TokyoBabyChangingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Best Baby Changing Facilities in Tokyo</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          A neighborhood-by-neighborhood guide to Tokyo&apos;s best diaper changing rooms for families traveling with babies and toddlers.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="text-sm text-sky-800">
            <p className="font-semibold mb-1">Quick Tips</p>
            <ul className="space-y-1 text-sky-700">
              <li>• Department stores (&quot;depato&quot;) have the best facilities — usually free, clean, and open to non-shoppers</li>
              <li>• Look for <strong>多目的トイレ</strong> (multipurpose restroom) or <strong>ベビールーム</strong> (baby room) signs</li>
              <li>• Convenience stores (7-Eleven, Lawson) are always open and usually have changing tables</li>
              <li>• Use our map to find the nearest toilet with 🍼 icon</li>
            </ul>
          </div>
        </div>

        {spots.map(({ area, icon, places }) => (
          <div key={area} className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{icon} {area}</h2>
            <div className="space-y-3">
              {places.map(({ name, tip }) => (
                <div key={name} className="border border-gray-100 rounded-xl p-4">
                  <p className="font-semibold text-gray-800 text-sm mb-1">📍 {name}</p>
                  <p className="text-gray-600 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-gray-800 mb-3">Find More on the Map</h2>
          <p className="text-sm text-gray-600 mb-4">
            Use our interactive map to find all 3,400+ toilets in Tokyo with baby changing tables — including real-time distance from your location.
          </p>
          <Link
            href="/map?city=tokyo"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Open Tokyo Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/guide/japan-travel-with-baby" className="text-sky-600 hover:underline">← Japan Travel with Baby</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/osaka-family-travel-tips" className="text-sky-600 hover:underline">Osaka Family Tips →</Link>
        </div>
      </div>
    </div>
  );
}
