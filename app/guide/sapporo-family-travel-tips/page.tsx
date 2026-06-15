import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sapporo Family Travel Tips — Traveling with Baby & Kids 2026 | Family Toilet Japan",
  description: "Complete guide to traveling in Sapporo with babies and young children. Best family-friendly spots, baby changing rooms, winter travel tips, and getting around Hokkaido with kids.",
  keywords: [
    "sapporo with baby",
    "sapporo family travel",
    "hokkaido travel with kids",
    "sapporo baby changing room",
    "sapporo zoo stroller",
    "hokkaido winter baby",
    "sapporo kids travel tips",
    "odori park baby",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/sapporo-family-travel-tips" },
};

const sections = [
  {
    title: "Best Family-Friendly Spots",
    icon: "🗺️",
    items: [
      { name: "Maruyama Zoo", desc: "One of Hokkaido's top family attractions. Flat, paved paths throughout — stroller-friendly. Baby room near the main entrance with changing tables and nursing chairs. Polar bears and red pandas are kids' favorites." },
      { name: "Sapporo Factory (Shopping Mall)", desc: "Large indoor mall excellent in winter. Baby room on the 2F with 3 changing tables, nursing chairs, and a kids' play corner. Food court has high chairs. Free parking with validation." },
      { name: "Hokkaido Museum (Sapporo)", desc: "Modern, accessible museum about Hokkaido's nature and history. Elevators throughout, ramps at all entrances, dedicated stroller parking. The hands-on exhibit area is perfect for toddlers." },
      { name: "Odori Park", desc: "Wide, flat park in the heart of Sapporo — ideal for strollers in summer. Baby room in the TV Tower nearby. In winter, the Snow Festival (early February) has accessible paths but dress babies in full winter gear." },
    ],
  },
  {
    title: "Baby Changing Facilities",
    icon: "🍼",
    items: [
      { name: "JR Sapporo Station (Stellar Place)", desc: "Best facilities in the city — 6F baby room with 4 changing tables, nursing rooms, bottle warmers, and microwave. Open to non-shoppers. Direct elevator from the station concourse." },
      { name: "Sapporo Aeon Mall Sapporo", desc: "Large mall on the outskirts with excellent family rooms on every floor. Kids' play area, large food court with high chairs. Accessible by subway (Hiragishi Station) + free shuttle bus." },
      { name: "New Chitose Airport", desc: "If arriving by air, New Chitose Airport has exceptional baby facilities — private nursing rooms, changing tables, and a kids' play zone on the 2F departure level. Plan 30 extra minutes for families." },
      { name: "Sapporo Dome", desc: "For families visiting events or concerts. Baby room on the 2F with changing tables and nursing chairs. Stroller check-in available at the entrance (free)." },
    ],
  },
  {
    title: "Winter Travel with a Baby",
    icon: "❄️",
    items: [
      { name: "Dressing for Hokkaido Winters", desc: "Sapporo winters (December–March) are serious — temperatures reach -10°C. Layer babies with thermal base layer, fleece mid-layer, and waterproof outer jacket. Mittens and hat essential. Baby carriers keep babies warmer than strollers in extreme cold." },
      { name: "Strollers vs Baby Carriers in Snow", desc: "Strollers struggle on snowy/icy sidewalks. Use a stroller in malls and indoors. Outdoors, a structured baby carrier under your coat keeps baby warm and your hands free. Nordic-style bundle bags work well over a carrier." },
      { name: "Indoor Itinerary Planning", desc: "Plan indoor activities for midday and use heated underground passages (Sapporo has an extensive network called Aurora Town and Pole Town). You can walk from Sapporo Station to Odori underground without going outside." },
      { name: "Baby Supplies in Sapporo", desc: "Diapers, formula, and baby food are widely available at drugstores (マツモトキヨシ, サンドラッグ) and convenience stores. Formula brands differ from overseas — Meiji and Morinaga are the main Japanese brands, widely trusted." },
    ],
  },
  {
    title: "Getting Around Sapporo",
    icon: "🚇",
    items: [
      { name: "Sapporo Subway", desc: "3 lines, all fully accessible with elevators. The Namboku Line (green) runs from Sapporo Station to Maruyama Zoo (Maruyama Koen Station). IC cards (Suica/Kitaca) accepted. Warm carriages — great with a baby in winter." },
      { name: "Sapporo City Trams", desc: "The historic loop tram (路面電車) is accessible with a stroller — use the middle door. Good for Nakajima Park and Susukino area. Not ideal in heavy snow." },
      { name: "Taxi", desc: "Abundant and affordable in Sapporo. All taxis are metered. Standard taxi fits one collapsed stroller. In winter, always use taxis for late-night travel with a baby — it's simply too cold to wait." },
      { name: "Rental Car", desc: "For families exploring Hokkaido beyond Sapporo (Otaru, Noboribetsu, Furano), renting a car is recommended. Child seats must be requested in advance. Winter tires are mandatory on rental cars in Hokkaido from November." },
    ],
  },
];

export default function SapporoFamilyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Sapporo Family Travel Tips</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Hokkaido&apos;s capital city with a baby or toddler — from summer festivals to winter snow, practical tips for families.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">❄️</span>
          <p className="text-sm text-sky-800">
            <strong>Sapporo is a year-round family destination.</strong> The zoo, the Snow Festival, and the summer lavender fields make it special in every season. The city is modern and well-equipped — baby facilities at major attractions are excellent.
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
          <h2 className="font-bold text-gray-800 mb-3">Find Toilets in Sapporo</h2>
          <p className="text-sm text-gray-600 mb-4">
            Browse 200+ family-friendly toilets in Sapporo with baby changing tables, wheelchair access, and opening hours.
          </p>
          <Link
            href="/sapporo"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Sapporo Toilet Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/fukuoka-family-travel-tips" className="text-sky-600 hover:underline">Fukuoka Family Guide →</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/japan-travel-with-baby" className="text-sky-600 hover:underline">Japan Travel with Baby →</Link>
        </div>
      </div>
    </div>
  );
}
