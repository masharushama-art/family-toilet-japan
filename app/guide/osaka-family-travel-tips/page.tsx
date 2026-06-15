import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Osaka Family Travel Tips — Traveling with Baby & Kids 2026 | Family Toilet Japan",
  description: "Complete guide to traveling in Osaka with babies and young children. Best family-friendly spots, baby changing rooms, stroller access, and eating out with kids in Osaka.",
  keywords: [
    "osaka with baby",
    "osaka family travel",
    "osaka travel with kids",
    "osaka baby changing room",
    "osaka stroller friendly",
    "dotonbori with baby",
    "universal studios japan baby",
    "osaka kids travel tips",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/osaka-family-travel-tips" },
};

const sections = [
  {
    title: "Best Family-Friendly Areas",
    icon: "🗺️",
    items: [
      { name: "Namba & Dotonbori", desc: "The most tourist-friendly area. All major department stores have excellent baby rooms. The underground malls (Namba Walk) are stroller-friendly with elevators throughout." },
      { name: "Umeda (Osaka Station)", desc: "Grand Front Osaka and Lucua 1100 have top-tier baby rooms with nursing chairs, changing tables, and formula hot water dispensers. Lots of elevator access." },
      { name: "Tempozan & Osaka Aquarium", desc: "Great for toddlers. The aquarium has a baby room near the entrance. Stroller rental available. The nearby Marketplace has clean family restrooms." },
      { name: "Osaka Castle Park", desc: "Wide open paths suitable for strollers. Multiple public toilet blocks with changing tables. The castle itself has elevators to upper floors." },
    ],
  },
  {
    title: "Baby Changing Facilities by Area",
    icon: "🍼",
    items: [
      { name: "Takashimaya Namba", desc: "6F baby room — one of Osaka's best. 5 changing tables, nursing rooms, kids' meal heating, play mat. Open to non-shoppers." },
      { name: "Grand Front Osaka (North)", desc: "Multiple floors with baby rooms. The 3F room is most accessible from the main entrance." },
      { name: "Universal Studios Japan", desc: "Baby care centers near the main entrance and in multiple zones. Bring diapers — USJ's are pricey. Reserve baby strollers at the entrance." },
      { name: "Tennoji Zoo & Shitennoji", desc: "Baby rooms inside the zoo. The Abeno Harukas department store nearby has excellent facilities on the 14F." },
    ],
  },
  {
    title: "Eating Out with Kids",
    icon: "🍜",
    items: [
      { name: "Family Restaurants", desc: "Coco's, Gusto, and Joyfull chains are baby-friendly with high chairs, kids' menus, and changing tables in restrooms. Look for ファミレス signs." },
      { name: "Food Halls (Depachika)", desc: "Basement food halls in department stores are perfect — take-away options, seating areas, and always have baby rooms on upper floors." },
      { name: "Dotonbori Street Food", desc: "Many stalls are not stroller-friendly due to crowds. Visit early morning (before 10AM) for much less congestion. Avoid lunch and dinner peak hours." },
      { name: "Namba Parks & Ion Mall", desc: "Both have food courts with high chairs and family seating. Ion Mall Tsurumi has a large indoor play area for toddlers." },
    ],
  },
  {
    title: "Getting Around Osaka with a Stroller",
    icon: "🚇",
    items: [
      { name: "Osaka Metro", desc: "All major stations have elevators. Download the Osaka Metro app and use the 'elevator route' option when navigating. Avoid rush hours (7:30-9AM, 5:30-7PM)." },
      { name: "Stroller-friendly buses", desc: "City buses have space for one stroller near the front door. Fold and hold during very busy times. Bus stops are announced in English." },
      { name: "Taxis", desc: "Standard taxis fit one collapsed stroller in the trunk. For larger families, book a jumbo taxi (ジャンボタクシー) in advance — fits stroller plus luggage." },
      { name: "Day Pass", desc: "The Osaka 1-Day Pass (大阪周遊パス) covers trains and entry to major sights. Families save significantly compared to individual tickets." },
    ],
  },
];

export default function OsakaFamilyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Osaka Family Travel Tips</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Everything you need for a stress-free family trip to Osaka — baby facilities, stroller access, family dining, and getting around with kids.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">⭐</span>
          <p className="text-sm text-sky-800">
            <strong>Osaka is one of Japan&apos;s most family-friendly cities.</strong> Department stores, shopping malls, and major tourist attractions all have excellent baby facilities. The people of Osaka are famously warm and helpful to families with young children.
          </p>
        </div>

        {sections.map(({ title, icon, items }) => (
          <div key={title} className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{icon} {title}</h2>
            <div className="space-y-3">
              {items.map(({ name, desc }) => (
                <div key={name} className="border border-gray-100 rounded-xl p-4">
                  <p className="font-semibold text-gray-800 text-sm mb-1">{name}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-gray-800 mb-3">Find Toilets in Osaka</h2>
          <p className="text-sm text-gray-600 mb-4">
            Browse 1,200+ family-friendly toilets in Osaka with baby changing tables, wheelchair access, and opening hours.
          </p>
          <Link
            href="/osaka"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Osaka Toilet Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/best-baby-changing-facilities-tokyo" className="text-sky-600 hover:underline">← Tokyo Baby Changing Guide</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/japan-travel-with-baby" className="text-sky-600 hover:underline">Japan Travel with Baby →</Link>
        </div>
      </div>
    </div>
  );
}
