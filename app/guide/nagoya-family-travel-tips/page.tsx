import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nagoya Family Travel Tips — Traveling with Baby & Kids 2026 | Family Toilet Japan",
  description: "Complete guide to traveling in Nagoya with babies and young children. Best family-friendly spots, baby changing rooms, stroller access, and eating out with kids in Nagoya.",
  keywords: [
    "nagoya with baby",
    "nagoya family travel",
    "nagoya travel with kids",
    "nagoya baby changing room",
    "nagoya castle stroller",
    "legoland japan baby",
    "nagoya kids travel tips",
    "nagoya aquarium baby",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/nagoya-family-travel-tips" },
};

const sections = [
  {
    title: "Best Family-Friendly Areas",
    icon: "🗺️",
    items: [
      { name: "Nagoya Station (Meieki)", desc: "The best starting point. JR Gate Tower, Takashimaya, and Midland Square all have top-tier baby rooms. Wide underground passages are stroller-friendly with elevators throughout." },
      { name: "Sakae", desc: "Nagoya's main shopping district. Oasis 21 has a baby room and is very stroller-friendly. The underground Sakae-Hirokoji mall has elevators and clean family restrooms." },
      { name: "Port of Nagoya (Nagoya Port)", desc: "Great for families — the Aquarium, Italian Village, and Garden Pier are all walkable. The aquarium has dedicated baby rooms near the entrance. Relatively uncrowded on weekdays." },
      { name: "Osu Shopping District", desc: "Quirky and fun for older kids, though crowded. Strollers manageable outside peak hours. Several restaurants have high chairs. Public toilets at Osu Kannon temple." },
    ],
  },
  {
    title: "Baby Changing Facilities by Spot",
    icon: "🍼",
    items: [
      { name: "JR Gate Tower (Nagoya Station)", desc: "13F baby room is one of the best in the city — nursing chairs, 4 changing tables, bottle warmer, microwave. Open to non-shoppers. Elevator from the station concourse." },
      { name: "LEGOLAND Japan", desc: "Baby care center near the main gate with changing tables, nursing room, and baby play area. Full-day admission — strollers available for rent at the entrance (¥500/day)." },
      { name: "Nagoya Port Aquarium", desc: "Baby room on the 1F near the entrance. Bring your own diapers. The outdoor whale watching area has benches for nursing. Coin lockers available for bulky baby gear." },
      { name: "Aeon Mall Nagoya Noritake Garden", desc: "Large, newer mall with excellent family restrooms on every floor. Kids' play area, food court with high chairs, and a supermarket for baby supplies." },
    ],
  },
  {
    title: "Eating Out with Kids",
    icon: "🍜",
    items: [
      { name: "Nagoya Meshi (Local Cuisine)", desc: "Miso katsu, hitsumabushi, and tebasaki (chicken wings) are Nagoya's famous dishes. Most restaurants serving these are family-friendly with high chairs available on request." },
      { name: "Family Restaurant Chains", desc: "Gusto, Denny's, and Coco's are abundant around Nagoya Station and Sakae. All have kids' menus, high chairs, and family restrooms. Order from tablets — no language barrier." },
      { name: "Midland Square Food Hall", desc: "5F restaurant floor with city views. Multiple cuisine options, most with high chairs. The lunch sets are better value than dinner. Weekend waits can be 30+ minutes." },
      { name: "Atsuta Jingu Area", desc: "Near the famous Atsuta Shrine, several traditional restaurants serve Hitsumabushi. Eat early (open from 11AM) to avoid queues with a baby in arms." },
    ],
  },
  {
    title: "Getting Around Nagoya with a Stroller",
    icon: "🚇",
    items: [
      { name: "Nagoya Municipal Subway", desc: "All stations on the main lines have elevators. Download the Nagoya Subway app for accessible route planning. The Higashiyama Line (yellow) connects Nagoya Station to Osu and the zoo." },
      { name: "Meitetsu & JR Lines", desc: "Both have elevators at major stations. For LEGOLAND, take the Aonami Line from Nagoya Station — stroller-friendly carriages. Journey is only 25 minutes." },
      { name: "Sightseeing Buses", desc: "The 'Me-Guru' loop bus covers Nagoya Castle, Atsuta Shrine, and the Toyota Museum. One step boarding — fold stroller for safety. One-day pass is good value for families." },
      { name: "Taxis", desc: "Plentiful around Nagoya Station. Standard taxis fit one collapsed stroller. Japan Taxi app (app-based) allows advance booking and is reliable with baby gear." },
    ],
  },
];

export default function NagoyaFamilyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Nagoya Family Travel Tips</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Everything you need for a stress-free family trip to Nagoya — baby facilities, stroller access, family dining, and getting around with kids.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">⭐</span>
          <p className="text-sm text-sky-800">
            <strong>Nagoya is an underrated family destination.</strong> LEGOLAND Japan, the Port Aquarium, and Nagoya Castle make it a great city for kids. The infrastructure is modern, uncrowded compared to Tokyo and Osaka, and navigation with a stroller is straightforward.
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
          <h2 className="font-bold text-gray-800 mb-3">Find Toilets in Nagoya</h2>
          <p className="text-sm text-gray-600 mb-4">
            Browse 900+ family-friendly toilets in Nagoya with baby changing tables, wheelchair access, and opening hours.
          </p>
          <Link
            href="/nagoya"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Nagoya Toilet Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/osaka-family-travel-tips" className="text-sky-600 hover:underline">← Osaka Family Guide</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/kyoto-with-baby" className="text-sky-600 hover:underline">Kyoto with Baby →</Link>
        </div>
      </div>
    </div>
  );
}
