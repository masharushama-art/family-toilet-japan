import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fukuoka Family Travel Tips — Traveling with Baby & Kids 2026 | Family Toilet Japan",
  description: "Complete guide to traveling in Fukuoka with babies and young children. Best family-friendly spots, baby changing rooms, ramen with kids, and getting around Kyushu with a stroller.",
  keywords: [
    "fukuoka with baby",
    "fukuoka family travel",
    "fukuoka travel with kids",
    "fukuoka baby changing room",
    "canal city with stroller",
    "fukuoka zoo baby",
    "hakata with kids",
    "kyushu family travel",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/fukuoka-family-travel-tips" },
};

const sections = [
  {
    title: "Best Family-Friendly Spots",
    icon: "🗺️",
    items: [
      { name: "Canal City Hakata", desc: "Fukuoka's most family-friendly shopping complex. Multiple baby rooms (2F and 4F), wide corridors for strollers, a fountains show that toddlers love. Indoor and outdoor spaces — great in any weather." },
      { name: "Fukuoka City Zoo & Botanical Garden", desc: "Large, flat zoo with paved paths throughout. Stroller rental available at the entrance (¥300). Baby room near the entrance with changing tables and nursing chairs. The bird house and petting zoo are toddler favorites." },
      { name: "Ohori Park", desc: "Beautiful central park around a large lake. Completely flat with wide paved paths — perfect for stroller walks. Pedal boats in summer (toddlers free). Public toilet with changing table on the east side of the park." },
      { name: "Marine World Umi-no-Nakamichi", desc: "Fukuoka's aquarium — excellent for families. Baby room near the entrance, stroller rental available, whale shark feeding at set times. Take the ferry from Bayside Place (20 min) or drive." },
    ],
  },
  {
    title: "Baby Changing Facilities",
    icon: "🍼",
    items: [
      { name: "Hakata Station (AMU Plaza)", desc: "Best station facilities in Kyushu. AMU Plaza 7F baby room with 3 changing tables, private nursing rooms, and bottle warmers. Accessible directly from the Shinkansen concourse via elevator." },
      { name: "Tenjin Underground Mall (Tenjin Chikagai)", desc: "The 600m underground shopping street has a family room mid-way with changing tables and nursing chairs. Stay underground in summer heat or rainy season — it's air-conditioned and stroller-accessible throughout." },
      { name: "Aeon Mall Fukuoka", desc: "Large suburban mall with family rooms on every floor. Kids' play area on the 3F, supermarket for baby supplies. Accessible by bus from Hakata Station (30 min) or by car." },
      { name: "Fukuoka Airport", desc: "Surprisingly good for families — domestic terminal has a baby room with changing tables, nursing rooms, and a kids' corner. International terminal also well-equipped. 5 minutes by subway from Hakata Station." },
    ],
  },
  {
    title: "Eating Out with Kids",
    icon: "🍜",
    items: [
      { name: "Hakata Ramen with Baby", desc: "Fukuoka's tonkotsu ramen is rich and filling. Most ramen shops are compact and not ideal for strollers — go early (before 11:30AM) for space. Ichiran Hakata has semi-private booths that work surprisingly well with a sleeping baby." },
      { name: "Yatai (Street Food Stalls)", desc: "Fukuoka's famous open-air yatai stalls along the river are a cultural experience but not stroller-friendly — sit on stools with the baby on your lap. Go at dusk for the atmosphere. Most vendors are welcoming to families." },
      { name: "Kawabata Shopping Arcade", desc: "Covered arcade near Nakasu with family-friendly restaurants including Italian chains, sushi conveyor belt restaurants, and Japanese family dining. High chairs widely available. Good for rainy days." },
      { name: "Seaside Momochi Area", desc: "Near Fukuoka Tower, this bayside area has several family restaurants with outdoor seating. The Hilton Fukuoka Sea Hawk hotel's buffet is excellent value for families and very baby-friendly." },
    ],
  },
  {
    title: "Getting Around Fukuoka",
    icon: "🚇",
    items: [
      { name: "Fukuoka City Subway", desc: "3 lines, all accessible with elevators. The Kuko Line (airport line) connects the airport to Hakata and Tenjin in minutes. Strollers allowed at all times. IC cards (Suica/Nimoca) accepted." },
      { name: "Nishitetsu Buses", desc: "Extensive bus network covering areas the subway misses. Low-floor buses on main routes are stroller-accessible. The BRT (Bus Rapid Transit) along the waterfront is very smooth with a stroller." },
      { name: "Day Trips by Shinkansen", desc: "From Fukuoka, Hiroshima is 1h by Shinkansen — perfect for a family day trip. Kumamoto (45 min) has a great castle and bear mascot. Book in advance for reserved seats with child accommodation." },
      { name: "Taxi & Ride Share", desc: "GO app (タクシーGO) works in Fukuoka for booking taxis in advance — useful with baby gear. Standard taxis fit one stroller. For the airport run with family luggage, book a large vehicle (大型) via the app." },
    ],
  },
];

export default function FukuokaFamilyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Fukuoka Family Travel Tips</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Kyushu&apos;s gateway city with ramen, beaches, and great facilities for families traveling with babies and young children.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">🌸</span>
          <p className="text-sm text-sky-800">
            <strong>Fukuoka is one of Japan&apos;s most livable cities — and very family-friendly.</strong> It&apos;s compact, the infrastructure is modern, and the people of Kyushu are famously warm and welcoming. Canal City and the zoo make excellent full-day family outings.
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
          <h2 className="font-bold text-gray-800 mb-3">Find Toilets in Fukuoka</h2>
          <p className="text-sm text-gray-600 mb-4">
            Browse 300+ family-friendly toilets in Fukuoka with baby changing tables, wheelchair access, and opening hours.
          </p>
          <Link
            href="/fukuoka"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Fukuoka Toilet Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/sapporo-family-travel-tips" className="text-sky-600 hover:underline">← Sapporo Family Guide</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/osaka-family-travel-tips" className="text-sky-600 hover:underline">Osaka Family Guide →</Link>
        </div>
      </div>
    </div>
  );
}
