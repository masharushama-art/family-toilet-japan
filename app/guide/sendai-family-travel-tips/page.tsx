import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sendai Family Travel Tips — Traveling with Baby & Kids 2026 | Family Toilet Japan",
  description: "Complete guide to traveling in Sendai with babies and young children. Tanabata Festival, Zuihoden Mausoleum, Sendai City Zoo, and getting around Tohoku with a stroller.",
  keywords: [
    "sendai with baby",
    "sendai family travel",
    "sendai travel with kids",
    "sendai baby changing room",
    "tanabata festival with stroller",
    "tohoku family travel",
    "sendai zoo baby",
    "miyagi family travel",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/sendai-family-travel-tips" },
};

const sections = [
  {
    title: "Best Family-Friendly Spots",
    icon: "🗺️",
    items: [
      { name: "Sendai City Zoo (Yagiyama Zoological Park)", desc: "One of Japan's best zoos for families. Flat paved paths suitable for strollers throughout. Baby room near the main entrance with changing tables and nursing chairs. The elephant zone and bird garden are especially popular with toddlers. Stroller rental available at the gate." },
      { name: "Sendai Umino-Mori Aquarium", desc: "Modern aquarium opened in 2015 — barrier-free throughout with lifts and wide corridors. Baby care room on the 1F with changing tables, nursing chairs, and a microwave. The dolphin show is timed perfectly for nap schedules if you plan the 11AM showing." },
      { name: "Nishi Park & Hirose River Greenway", desc: "Flat riverside park running through central Sendai — ideal for stroller walks. Cherry blossoms in April are spectacular. Multiple toilet blocks along the route, some with changing facilities. Safe cycling paths if you have a child seat on your bike." },
      { name: "Sendai Mediatheque", desc: "Award-winning public library and media center in the city center. Stroller-accessible throughout, with a children's floor featuring low shelves and reading nooks. Clean family toilet on each floor. Free entry — great rainy-day option." },
    ],
  },
  {
    title: "Baby Changing Facilities",
    icon: "🍼",
    items: [
      { name: "Sendai Station (S-PAL Sendai)", desc: "The main station shopping mall has a baby room on B1F with 4 changing tables, private nursing rooms, and a play corner for toddlers. Accessible via elevator from all platforms. A milk warmer is available — just ask the staff at the information desk." },
      { name: "Loft Sendai / AER Building", desc: "The AER building connected to the station has a baby room on the 26F observation floor (free entry). Panoramic city views while nursing. The Loft department store on Jozenji Street has a family room on the 3F." },
      { name: "Izumi Premium Outlets", desc: "30 minutes by bus from Sendai Station — large outlet mall with a dedicated baby room featuring 3 changing tables, a nursing lounge, and a toddler play area. Good for stocking up on Japanese baby goods at outlet prices." },
      { name: "Sendai Airport", desc: "Compact international airport with clean baby rooms in both the domestic and international terminals. Well signposted. The airport is 25 minutes from the city on the Airport Railway — strollers fold easily in the train vestibule area." },
    ],
  },
  {
    title: "Eating Out with Kids",
    icon: "🍽️",
    items: [
      { name: "Gyutan (Beef Tongue) with Baby", desc: "Sendai's signature dish. The top gyutan restaurants around the station are compact, so book ahead or go at 11AM when they open. Rikyu and Kisuke near Sendai Station have high chairs and slightly more space. The beef tongue set includes oxtail soup — rich and warming for parents." },
      { name: "Ichibancho Shopping Arcade", desc: "Sendai's covered shopping street is stroller-friendly and packed with family restaurants — conveyor-belt sushi, udon, katsu — all with high chairs. On rainy days it's completely sheltered for over 300m. Toilet blocks at both ends of the arcade." },
      { name: "PARCO 2 Food Floor", desc: "Modern shopping mall food floor near the station with international and Japanese options. Several restaurants have dedicated family sections with high chairs. Clean toilets with changing tables on the same floor." },
      { name: "Tanabata Festival Food Stalls (August)", desc: "Sendai's Tanabata Festival (August 6–8) transforms the city with bamboo decorations. Street food stalls are everywhere — yakitori, taiyaki, kakigori. Wide pedestrianized streets make it manageable with a stroller, though evening crowds are dense." },
    ],
  },
  {
    title: "Getting Around Sendai",
    icon: "🚇",
    items: [
      { name: "Sendai City Subway", desc: "Two lines — the Namboku Line and Tozai Line — both fully accessible with elevators. Strollers allowed at all times without folding. IC cards (Suica/Sendai IC) work throughout. Stations are clean and staff are helpful with strollers." },
      { name: "Loople Sendai Bus", desc: "Tourist bus loop connecting Zuihoden, Sendai Castle ruins, and the city center. Low-floor buses are stroller-accessible. One-day pass is good value if sightseeing. Some stops are on hills — factor in stroller navigation before planning." },
      { name: "Bicycle Rental (DATE BIKE)", desc: "Sendai's city bike-share is flat-terrain friendly. If your child is 3+, a rented child seat attachment is available at some ports. The Hirose River greenway is perfect for a family cycling morning." },
      { name: "Day Trips from Sendai", desc: "Matsushima (Japan's 'three views') is 40 minutes by train — flat coastal walkways are very stroller-friendly and the boat cruise has indoor seating. Yamadera temple involves steep stairs and is NOT suitable for strollers. Zao (skiing/onsen) is 90 minutes by bus — family onsen with private family baths available." },
    ],
  },
];

export default function SendaiFamilyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Sendai Family Travel Tips</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Tohoku&apos;s largest city — gateway to Matsushima, Zao, and some of Japan&apos;s most atmospheric festivals.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">🌿</span>
          <p className="text-sm text-sky-800">
            <strong>Sendai is a green, compact city that&apos;s easy to navigate with a family.</strong> Known as the &quot;City of Trees&quot;, it has wide boulevards lined with zelkova trees and a relaxed pace compared to Tokyo. The Tanabata Festival in August is one of Japan&apos;s most spectacular — and surprisingly manageable with a stroller.
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
          <h2 className="font-bold text-gray-800 mb-3">Find Toilets in Sendai</h2>
          <p className="text-sm text-gray-600 mb-4">
            Browse 300+ family-friendly toilets in Sendai with baby changing tables, wheelchair access, and opening hours.
          </p>
          <Link
            href="/sendai"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Sendai Toilet Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/sapporo-family-travel-tips" className="text-sky-600 hover:underline">← Sapporo Family Guide</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/hiroshima-family-travel-tips" className="text-sky-600 hover:underline">Hiroshima Family Guide →</Link>
        </div>
      </div>
    </div>
  );
}
