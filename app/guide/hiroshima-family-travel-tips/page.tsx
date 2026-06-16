import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hiroshima Family Travel Tips — Traveling with Baby & Kids 2026 | Family Toilet Japan",
  description: "Complete guide to traveling in Hiroshima with babies and young children. Miyajima Island, Hiroshima Peace Park, Onomichi, and Shinkansen travel tips for families.",
  keywords: [
    "hiroshima with baby",
    "hiroshima family travel",
    "miyajima with stroller",
    "hiroshima travel with kids",
    "hiroshima baby changing room",
    "chugoku region family travel",
    "onomichi family travel",
    "hiroshima peace park baby",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/hiroshima-family-travel-tips" },
};

const sections = [
  {
    title: "Best Family-Friendly Spots",
    icon: "🗺️",
    items: [
      { name: "Hiroshima Peace Memorial Park", desc: "A moving, important site that is also genuinely manageable with a stroller. Wide flat paths throughout the park, multiple toilets with accessible facilities. The Peace Memorial Museum has elevators and a stroller check-in area at the entrance. Mornings before 10AM are quietest — good for families with babies who need space." },
      { name: "Miyajima Island (Itsukushima)", desc: "One of Japan's most beautiful spots. The ferry from Miyajimaguchi is 10 minutes and stroller-friendly (board via the ramp). The main approach to Itsukushima Shrine is flat and paved. Be aware that friendly deer roam freely — exciting for older kids, potentially scary for toddlers. The ropeway to Mt. Misen is accessible but involves a 45-minute walk at the top." },
      { name: "Orizuru Tower", desc: "Modern observation tower in downtown Hiroshima with a paper crane folding hall and rooftop view of the A-Bomb Dome. Fully accessible via elevator. Family-friendly atmosphere with interactive exhibits. Good wet-weather option — the paper crane folding area keeps kids engaged." },
      { name: "Hiroshima City Museum of Contemporary Art (Hijiyama Park)", desc: "Situated in a hilltop park accessible by bus or a gentle 15-minute walk from Hijiyama-shita tram stop. Wide paved paths in the park, cherry blossom viewing area in spring, and a children's museum in the same complex. Baby care room in the main museum building." },
    ],
  },
  {
    title: "Baby Changing Facilities",
    icon: "🍼",
    items: [
      { name: "Hiroshima Station (ekie Shopping Center)", desc: "The ekie shopping center inside Hiroshima Station has a baby room on the 3F with 4 changing tables, private nursing rooms, and toddler play equipment. Well signposted from the Shinkansen concourse. Open until 9PM — useful for late arrivals." },
      { name: "T-Site Hiroshima (Daikyo)", desc: "Tsutaya Books in the Daikyo building west of the station — modern family lounge with changing tables, nursing chairs, a play corner, and a book nook for older kids. The attached café allows strollers. A hidden gem for families needing a calm break." },
      { name: "Peace Memorial Museum", desc: "Baby room in the basement of the main museum — changing tables, nursing chairs, and a small play area. Free to use whether or not you enter the museum. Clean and quiet." },
      { name: "Miyajima Ferry Terminal (Miyajimaguchi)", desc: "The JR ferry terminal has a dedicated baby room on the 2F with 2 changing tables. The Hiroden (tram) terminal adjacent to it has accessible toilets. Worth using before boarding the ferry as there are no changing facilities on the island's first stretch." },
    ],
  },
  {
    title: "Eating Out with Kids",
    icon: "🍽️",
    items: [
      { name: "Okonomiyaki in Hiroshima", desc: "Hiroshima-style okonomiyaki (layered with noodles) is one of Japan's great family foods. Okonomimura building in central Hiroshima has 25+ stalls on 3 floors — compact but the ground floor is best for strollers. Recommend Hassei or Micchan (branches outside the building) for slightly more space and high chairs." },
      { name: "Momiji Manju on Miyajima", desc: "The island's signature maple-leaf shaped cakes are everywhere. Perfect toddler snack. Bakeries on the main street often have viewing windows — kids love watching the automated moulding machines. The seasonal cream and chocolate fillings are most popular." },
      { name: "Restaurant Lemon Tree (Rihga Royal Hotel)", desc: "The all-day restaurant at the Rihga Royal Hotel has a children's menu, high chairs, and patient staff. Good for families needing a reliable sit-down meal in a calm environment. Near the Peace Park area." },
      { name: "Sogo Department Store Food Hall", desc: "The basement food hall of Sogo (15 minutes walk from the station) has every major Hiroshima food style with take-away options — great for assembling a picnic for the Peace Park. Accessible entrances and toilets with changing tables on B2F." },
    ],
  },
  {
    title: "Getting Around Hiroshima",
    icon: "🚇",
    items: [
      { name: "Hiroshima Tram (Hiroden)", desc: "Hiroshima has the largest tram network in Japan — low-floor 'Green Mover' trams on most lines are accessible and accept strollers. Avoid the older single-car trams on Route 7 (no low floor). Hiroshima Day Pass covers unlimited trams and the ferry to Miyajima — best value for families sightseeing." },
      { name: "Hiroshima Bus Center", desc: "Direct buses to Miyajima, Onomichi, and Itsukichi (for the Contemporary Art Museum) are stroller-friendly. Low-floor buses on all airport routes. The bus center has good baby facilities — toilets with changing tables on the 3F." },
      { name: "Day Trip: Onomichi", desc: "40 minutes by Shinkansen then local train — a hilly port town famous for ramen and Naomi Kawase films. The flat waterfront promenade is very stroller-friendly. The temple walk on the hillside involves steep stairs and is not suitable for strollers with young children. The Onomichi ferry to Mukaishima island is a fun 5-minute toddler adventure." },
      { name: "Shinkansen with a Baby", desc: "Hiroshima Station is a major Shinkansen stop. Reserve the rear seat in the last car of the direction you're traveling — it has a small space behind it for a folded stroller. Nozomi trains are fastest but don't accept JR Passes. With a baby or toddler, Hikari or Sakura trains give more time to get settled." },
    ],
  },
];

export default function HiroshimaFamilyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Hiroshima Family Travel Tips</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Peace, history, and the iconic torii gate — a city with depth that is gentler for families than it first appears.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">🕊️</span>
          <p className="text-sm text-sky-800">
            <strong>Hiroshima rewards slow travel with families.</strong> Combine one day at the Peace Park and A-Bomb Dome (age-appropriate discussions are your call as a parent) with a ferry to Miyajima for the Itsukushima Shrine torii gate at high tide. The city is flat, the tram system is excellent, and deer on Miyajima are an instant hit with toddlers.
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
          <h2 className="font-bold text-gray-800 mb-3">Find Toilets in Hiroshima</h2>
          <p className="text-sm text-gray-600 mb-4">
            Browse family-friendly toilets in Hiroshima with baby changing tables, wheelchair access, and location details.
          </p>
          <Link
            href="/hiroshima"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Hiroshima Toilet Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/sendai-family-travel-tips" className="text-sky-600 hover:underline">← Sendai Family Guide</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/naha-okinawa-family-travel-tips" className="text-sky-600 hover:underline">Naha / Okinawa Family Guide →</Link>
        </div>
      </div>
    </div>
  );
}
