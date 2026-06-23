import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Japan Train Travel with a Stroller — Complete Guide 2026 | Family Toilet Japan",
  description: "Everything you need to know about taking trains in Japan with a baby stroller. Shinkansen tips, elevator access, IC cards, luggage forwarding, and which carriages to choose.",
  keywords: [
    "japan train stroller",
    "shinkansen with baby",
    "japan train baby",
    "stroller on train japan",
    "japan rail pass baby",
    "elevator train station japan",
    "japan travel stroller tips",
    "bullet train with stroller",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/japan-train-travel-with-stroller" },
};

const sections = [
  {
    title: "Strollers on Regular Trains",
    icon: "🚃",
    items: [
      { name: "You Do NOT Need to Fold Your Stroller", desc: "Despite what some guides say, strollers are allowed on all Japanese trains without folding. There is no rule requiring you to fold. Staff and passengers are generally understanding. On crowded rush-hour trains (7:30-9:30am in Tokyo/Osaka), consider folding if possible or simply avoid those time slots — off-peak trains are comfortable with a stroller." },
      { name: "Where to Stand with a Stroller", desc: "Position yourself at the end of the carriage near the doors. Most trains have a small open space between the last seat and the wall — this is the ideal spot for a stroller. On newer trains (Yamanote Line, Chuo Line), look for the wheelchair/stroller priority areas marked with floor stickers near the doors. These spaces are wider and designated for your use." },
      { name: "Elevators at Stations", desc: "Every JR and major private railway station has at least one elevator connecting the ticket gates to the platforms. Look for the ♿ signs or ask station staff — they will walk you to the elevator if needed. The elevator is often at one end of the platform, so you may need to walk. Some older private railway stations (small local lines) may not have elevators, but these are increasingly rare in cities." },
      { name: "IC Cards (Suica / Pasmo / ICOCA)", desc: "Buy an IC card at the airport or any station. Tap in and tap out — no need to buy individual tickets. Children under 6 ride free on all trains (no IC card needed for them). The IC card also works at convenience stores, vending machines, and lockers. If you lose it, you can get a replacement at any station office with your passport." },
    ],
  },
  {
    title: "Shinkansen (Bullet Train) with a Baby",
    icon: "🚅",
    items: [
      { name: "Best Seats for Families", desc: "Reserve the LAST ROW of any carriage — the space behind the last row seats is the only place on the Shinkansen where a folded stroller fits without blocking anyone. On the Tokaido Shinkansen (Tokyo-Osaka), Row 13 in cars 1-3 and Row 20 in cars 4-16 are the last rows. Book these seats early on the SmartEX app or at a JR ticket office." },
      { name: "Multi-Purpose Room (Tahoku Shitsu)", desc: "Most Shinkansen trains have a multi-purpose room (多目的室) — a small private room you can use for nursing. It is locked by default; ask the conductor (車掌) to open it for you. On the Tokaido Shinkansen it is typically in Car 11. On the Tohoku/Hokkaido Shinkansen it varies. It has a fold-down bed and curtain — perfect for breastfeeding or calming a crying baby." },
      { name: "Changing Diapers on the Shinkansen", desc: "All Shinkansen trains have a large accessible toilet with a fold-down changing table. It is usually located near the multi-purpose room. The space is generous — much bigger than an airplane toilet. Bring your own changing pad for hygiene. There is no dedicated baby room, but the accessible toilet is the standard solution and works well." },
      { name: "Timing Your Journey", desc: "For families with babies, the ideal Shinkansen departure times are mid-morning (10-11am) or early afternoon (1-2pm) — after rush hour but before the evening commuter wave. Nozomi trains are fastest but do NOT accept the Japan Rail Pass. Hikari and Kodama trains are slightly slower but often emptier and more relaxed for families." },
    ],
  },
  {
    title: "Luggage & Equipment Tips",
    icon: "🧳",
    items: [
      { name: "Luggage Forwarding (Takkyubin)", desc: "Japan's luggage forwarding service is a game-changer for families. Drop your suitcase at a convenience store or hotel reception, and it arrives at your next hotel the next day for about ¥2,000-3,000 per bag. Yamato Transport (Kuroneko) is the most popular service. This means you only carry a small bag and the stroller — transforming multi-city trips from stressful to easy." },
      { name: "Coin Lockers at Stations", desc: "Major stations (Tokyo, Shinjuku, Kyoto, Osaka) have coin lockers in multiple sizes. Large lockers (¥700-800/day) fit a carry-on suitcase. IC cards work as the key — tap to lock, tap to unlock. Lockers near popular exits fill up by mid-morning on weekends, so use the ones deeper inside the station or at less popular exits." },
      { name: "Which Stroller to Bring", desc: "A lightweight, compact stroller (under 7kg) is strongly recommended for Japan. Cobblestone temple paths, narrow restaurant entrances, and train platform gaps all favor smaller wheels and a compact fold. The Cybex Libelle, Babyzen YOYO, and Pockit are popular choices among families traveling Japan. If yours is too bulky, consider renting one — some hotels and airports offer stroller rental." },
      { name: "Baby Carrier as Backup", desc: "Even with a stroller, pack a baby carrier (Ergobaby, BabyBjorn, etc.) for situations where strollers are impractical: temple stairs, crowded festivals, rush-hour trains, and small izakaya restaurants. Many parents find themselves using the carrier 30-40% of the time. The combination of stroller + carrier gives you maximum flexibility across Japan's varied terrain." },
    ],
  },
  {
    title: "Practical Tips",
    icon: "💡",
    items: [
      { name: "Station Staff Are Incredibly Helpful", desc: "If you are lost, stuck, or need help with the elevator, ask any station staff member. They will often physically walk you to where you need to go. At major stations, look for the green JR uniform or the information desk. Many staff at tourist-heavy stations speak basic English. In our experience, Japanese station staff go above and beyond for families with babies." },
      { name: "Platform Gaps", desc: "The gap between the train and the platform is usually small (2-5cm) at major stations, but can be larger at curved platforms or older stations. Tilt the stroller back onto its rear wheels and roll it across the gap. Station staff sometimes place a ramp for wheelchairs — they will do the same for strollers if you ask. The newest stations (Shibuya, Shinagawa) have virtually no gap." },
      { name: "Nursing on Trains", desc: "There is no dedicated nursing space on regular trains (only Shinkansen have the multi-purpose room). Most mothers use a nursing cover on the train — this is socially accepted and nobody will bother you. For more privacy, step off at a larger station and use the baby room — most stations along the Yamanote Line have them." },
      { name: "Children's Fares", desc: "Children under 6 ride free on all trains (reserved Shinkansen seats require a child ticket). Children aged 6-11 pay half fare. On Shinkansen, a baby on your lap is free; if you want a separate seat for your baby/toddler, you need to buy a child ticket. IC cards can be loaded with child fares at any ticket machine — ask station staff to set it up." },
    ],
  },
];

export default function TrainStrollerPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Japan Train Travel with a Stroller</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Everything you need to know about taking trains, Shinkansen, and subways in Japan with a baby and stroller.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">🚅</span>
          <p className="text-sm text-sky-800">
            <strong>Japan&apos;s train system is more stroller-friendly than most people expect.</strong> Every major station has elevators, strollers are allowed without folding, and the Shinkansen has changing tables and a private nursing room. The key is knowing which seats to book, where the elevators are, and when to avoid rush hour. This guide covers everything.
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
          <h2 className="font-bold text-gray-800 mb-3">Find Toilets Near Any Station</h2>
          <p className="text-sm text-gray-600 mb-4">
            Use our free map to find toilets with baby changing tables near train stations across Japan.
          </p>
          <Link
            href="/map"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Find Toilets Near Me
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/japan-travel-with-baby" className="text-sky-600 hover:underline">← Japan Travel with Baby</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/japan-family-restaurants-guide" className="text-sky-600 hover:underline">Japan Family Restaurants Guide →</Link>
        </div>
      </div>
    </div>
  );
}
