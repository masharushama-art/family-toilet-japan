import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Naha & Okinawa Family Travel Tips — Traveling with Baby & Kids 2026 | Family Toilet Japan",
  description: "Complete guide to traveling in Okinawa (Naha) with babies and young children. Beaches, Churaumi Aquarium, Kokusai Street, and tips for island travel with a stroller.",
  keywords: [
    "okinawa with baby",
    "naha family travel",
    "okinawa travel with kids",
    "okinawa baby changing room",
    "churaumi aquarium baby",
    "kokusai street stroller",
    "okinawa beach with toddler",
    "ryukyu family travel",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/naha-okinawa-family-travel-tips" },
};

const sections = [
  {
    title: "Best Family-Friendly Spots",
    icon: "🗺️",
    items: [
      { name: "Okinawa Churaumi Aquarium (Motobu)", desc: "One of the world's great aquariums — the Kuroshio Sea tank with whale sharks is jaw-dropping for children of any age. Fully barrier-free with stroller access throughout. Baby care room on each floor, nursing chairs near the main tank viewing area. Book online — queues at peak season (July/August) can be 90 minutes. Plan for a full day: dolphin shows, the beach adjacent to the park, and a manatee watching area." },
      { name: "Kokusai Street (Naha)", desc: "Okinawa's main tourist shopping street — wide, flat, and covered in parts. Well-suited to stroller navigation. Souvenir shops all have steps at the entrance, but most have side ramps. Makishi Public Market (the 2-story indoor market) has elevators. Mornings are calm; evenings are busy with live Eisa drumming near Hotel Ryu Kyun." },
      { name: "Shuri Castle (Naha)", desc: "UNESCO World Heritage site currently undergoing restoration after the 2019 fire. The free outer grounds are open and flat — the stone-paved Keisei-ron approach is manageable with a sturdy stroller. Some inner paths are steep cobblestone — a carrier may be better for narrow stone sections. The views of Naha from the hill are worth the visit." },
      { name: "Cape Manzamo & Maeda Flats (Onna Village)", desc: "For beach lovers with babies: Maeda Flats has calm shallow water and easy car access. Cape Manzamo has dramatic coastal views from a flat observation path — one of the only cliff-top scenic spots in Japan that's genuinely stroller-accessible. Nirai Beach (private resort beach, day fee) has a baby changing room in its beach house." },
    ],
  },
  {
    title: "Baby Changing Facilities",
    icon: "🍼",
    items: [
      { name: "Naha Airport", desc: "Naha Airport has excellent family facilities — baby rooms in both the domestic and international terminals with 4 changing tables, private nursing rooms, and microwave for heating formula. The domestic arrivals hall has a multi-purpose room that can be used by nursing mothers without accessing the departure side. Well signposted." },
      { name: "Naha Bus Terminal & DFS Galleria", desc: "The underground bus terminal at Naha has clean accessible toilets with changing tables. The DFS Galleria Okinawa (5 minutes walk) has a full baby room with nursing chairs on the 4F. Often less crowded than the airport." },
      { name: "AEON Mall Okinawa Rycom", desc: "The largest mall in the Ryukyu Islands (30 minutes north of Naha by bus) — the dedicated baby room on the 2F is exceptional: 8 changing tables, multiple private nursing booths, play area, microwave, and a baby food preparation station. Stroller rental available at the information desk. Closest base for families visiting Churaumi Aquarium." },
      { name: "Churaumi Aquarium (Ocean Expo Park)", desc: "Baby room in the main aquarium building and a family rest house in the adjacent park. Changing tables, nursing chairs, and a quiet room for settling babies. One of the best-equipped baby facilities in Okinawa outside of Naha." },
    ],
  },
  {
    title: "Eating Out with Kids",
    icon: "🍽️",
    items: [
      { name: "Okinawa Soba with Baby", desc: "The local answer to ramen — mild pork broth with thick flat noodles. Ideal for traveling parents as the broth is less salty than mainland ramen and the thick noodles cool faster. Yufuin Nagahama Soba (Kokusai Street) and Yunangi (Makishi) both have high chairs and a relaxed atmosphere. Kids often enjoy the tender pork belly toppings." },
      { name: "Makishi Public Market Food Stalls", desc: "Buy fresh fish on the 1F, take it upstairs to a restaurant to have it cooked — a uniquely Okinawan experience that kids find fascinating. The 2F restaurants are informal and accommodating. Look for the restaurants with toy or picture menus for children. Stroller access via the lift between floors." },
      { name: "Family Restaurants (Gusto/Joyfull)", desc: "Mainland chain family restaurants are everywhere in Okinawa — Gusto and Joyfull are near-universal, with kids' menus, high chairs, and play corners at most branches. Good reliable fallback when babies need a calm meal. Both have apps with location finders." },
      { name: "Blue Seal Ice Cream", desc: "Okinawa's beloved local ice cream brand started by US military post-war. Mango, beni-imo (purple sweet potato), and shikuwasa (local citrus) flavours. Branches everywhere on the island — most have seating inside with AC (a priority in summer heat). The kids' cup size is generous." },
    ],
  },
  {
    title: "Getting Around Okinawa",
    icon: "🚇",
    items: [
      { name: "Yui Rail (Naha Monorail)", desc: "Naha's only rail line runs 17km from the airport to Tedako-Uranishi — elevated monorail with elevators at all stations. Strollers board without folding. Limited to Naha city; for most Okinawan attractions you'll need a bus or rental car." },
      { name: "Renting a Car in Okinawa", desc: "Strongly recommended for families. Most Okinawan attractions (Churaumi Aquarium, Nakagusuku Castle, beach areas) are not well-served by public transport. Rental car companies at Naha Airport all stock child car seats (must reserve in advance — Nippon Rent-a-Car has a good track record). Driving in Okinawa is on the left; roads outside Naha are relaxed and easy." },
      { name: "Bus to Churaumi Aquarium", desc: "High-speed buses from Naha Bus Terminal to Motobu (for Churaumi) take 2 hours. Route 111 Express is the most direct. Low-floor buses on most intercity routes — strollers fold and go in the overhead luggage area. Timetable is limited (6–7 round trips per day) so check before you go." },
      { name: "Weather & Season Planning", desc: "June–September is very hot and humid (typhoon season peaks August–September). Consider a covered carrier over a stroller in typhoon-risk months. November–March is mild (20–25°C) and less crowded — arguably the best time for families with babies. UV levels are high year-round; SPF 50 sun cream and UV-blocking hats are essential even in winter." },
    ],
  },
];

export default function NahaFamilyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Naha & Okinawa Family Travel Tips</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Turquoise water, whale sharks, purple sweet potato ice cream — Japan&apos;s tropical islands are surprisingly baby-friendly.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">🐠</span>
          <p className="text-sm text-sky-800">
            <strong>Okinawa is one of Japan&apos;s best destinations for families with young children.</strong> The culture is warm and welcoming to babies, facilities at major tourist spots are excellent, and the subtropical climate makes outdoor exploration comfortable outside the hottest months. Plan around the Churaumi Aquarium and a beach day — the rest fills itself in.
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
          <h2 className="font-bold text-gray-800 mb-3">Find Toilets in Okinawa (Naha)</h2>
          <p className="text-sm text-gray-600 mb-4">
            Browse family-friendly toilets in Naha with baby changing tables, wheelchair access, and location details.
          </p>
          <Link
            href="/okinawa"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Okinawa Toilet Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/hiroshima-family-travel-tips" className="text-sky-600 hover:underline">← Hiroshima Family Guide</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/fukuoka-family-travel-tips" className="text-sky-600 hover:underline">Fukuoka Family Guide →</Link>
        </div>
      </div>
    </div>
  );
}
