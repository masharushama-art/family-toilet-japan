import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kyoto with Baby & Toddler — Family Travel Guide 2026 | Family Toilet Japan",
  description: "Complete guide to visiting Kyoto with a baby or toddler. Baby changing facilities at temples, stroller-friendly routes, family restaurants, and getting around Kyoto with young children.",
  keywords: [
    "kyoto with baby",
    "kyoto with toddler",
    "kyoto family travel",
    "kyoto baby changing room",
    "arashiyama with stroller",
    "fushimi inari with baby",
    "kyoto temple baby facilities",
    "kyoto kids travel tips",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/kyoto-with-baby" },
};

const sections = [
  {
    title: "Stroller-Friendly Sights",
    icon: "🛺",
    items: [
      { name: "Nishiki Market", desc: "Narrow but manageable with a compact stroller early morning (before 10AM). Most stalls have samples — great for curious toddlers. Avoid lunch hours when it becomes impassable." },
      { name: "Arashiyama Bamboo Grove", desc: "The grove itself is a 5-minute walk on flat paved ground — stroller fine. However, Tenryuji garden has gravel paths that are difficult. Rickshaw rides are a fun alternative for toddlers." },
      { name: "Nijo Castle", desc: "Mostly flat grounds with paved paths. The castle interior has steps but the gardens are stroller-friendly. Baby room inside the visitor center near the main gate." },
      { name: "Fushimi Inari", desc: "The famous torii gates start on a steep, uneven path — not suitable for strollers beyond the first 10 minutes. Best visited with a baby carrier. Go very early (6-7AM) to avoid crowds." },
    ],
  },
  {
    title: "Baby Changing Facilities",
    icon: "🍼",
    items: [
      { name: "Kyoto Station (Isetan)", desc: "Best baby room in Kyoto — 7F of Isetan department store. Nursing chairs, 5 changing tables, bottle warmer, and play mat. Open to non-shoppers. Accessible via elevator from the station." },
      { name: "Kyoto Tower Sando", desc: "Baby room on the basement level. Clean, modern, with 2 changing tables and a nursing chair. Convenient if arriving by Shinkansen — 3-minute walk from Kyoto Station." },
      { name: "Arashiyama (Togetsu-kyo Bridge area)", desc: "A multi-use restroom with changing table is located near the bridge parking lot. Look for the 多目的トイレ sign. Not luxurious but functional." },
      { name: "Gion Shijo area", desc: "Takashimaya Kyoto (on Shijo Street) has an excellent baby room on the 6F. Best facilities in the Gion area. Also has a kids' floor with toys." },
    ],
  },
  {
    title: "Eating Out with Kids",
    icon: "🍱",
    items: [
      { name: "Kaiseki (Traditional Multi-course)", desc: "Most high-end kaiseki restaurants do not accommodate young children. Book a private room (個室, Koshitsu) if you want to try — toddlers can be seated on the tatami. Lunch kaiseki is far cheaper than dinner." },
      { name: "Ramen & Noodle Shops", desc: "Kyoto ramen (light soy-based broth) is well-loved by toddlers. Most ramen shops have high chairs or counter seats — call ahead to confirm. Chains like Ichiran are counter-only and not stroller-friendly." },
      { name: "Nishiki Market Food Stalls", desc: "Great for snacking with toddlers — tamagoyaki (egg), pickles, and skewers. No need to sit down. Take-away friendly. Wash hands at the market's hand-washing stations." },
      { name: "Portopia Hotel Kyoto & Family Restaurants", desc: "Near Kyoto Station: Gusto, Joyfull, and Saizeriya have kids' menus, high chairs, and baby-friendly restrooms. Use these as a reliable fallback when toddlers are tired and need to eat fast." },
    ],
  },
  {
    title: "Getting Around Kyoto with a Stroller",
    icon: "🚌",
    items: [
      { name: "City Buses", desc: "Kyoto's bus network is extensive but buses get extremely crowded. Fold the stroller and hold your baby during peak times. Use IC card (Suica/ICOCA) for easy tap-in. The 101 and 111 buses cover major sights." },
      { name: "Subway (Karasuma & Tozai Lines)", desc: "The two subway lines are stroller-friendly with elevators at all stations. Ideal for getting from Kyoto Station to Nijo Castle (Tozai line) or Kitaoji (Karasuma line)." },
      { name: "Taxi", desc: "The most stress-free option with a stroller. Kyoto has abundant taxis — just hail one on the street. Major sightseeing spots have taxi stands. MK Taxi offers fixed-price sightseeing tours for families." },
      { name: "Rent a Bicycle (with child seat)", desc: "Many rental shops near Kyoto Station offer bikes with front or rear child seats (for ages 1-6). Flat areas like the Imperial Palace Park and Fushimi are great by bike. Avoid busy Shijo Street." },
    ],
  },
];

export default function KyotoWithBabyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Kyoto with Baby & Toddler</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Temples, bamboo groves, and geisha districts — with a stroller. Everything families need for a smooth Kyoto trip.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <p className="text-sm text-amber-800">
            <strong>Kyoto is beautiful but challenging with a stroller.</strong> Many temples have gravel paths, steps, and narrow lanes. Plan your route carefully — a baby carrier is often more practical than a stroller for temple visits.
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
          <h2 className="font-bold text-gray-800 mb-3">Find Toilets in Kyoto</h2>
          <p className="text-sm text-gray-600 mb-4">
            Browse 800+ family-friendly toilets in Kyoto with baby changing tables, wheelchair access, and opening hours.
          </p>
          <Link
            href="/kyoto"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Kyoto Toilet Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/nagoya-family-travel-tips" className="text-sky-600 hover:underline">← Nagoya Family Guide</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/osaka-family-travel-tips" className="text-sky-600 hover:underline">Osaka Family Guide →</Link>
        </div>
      </div>
    </div>
  );
}
