import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Yokohama Family Travel Tips — Traveling with Baby & Kids 2026 | Family Toilet Japan",
  description: "Complete guide to Yokohama with babies and toddlers. Cup Noodles Museum, Chinatown, Cosmo World, Minato Mirai, and stroller-friendly routes through Japan's second-largest city.",
  keywords: [
    "yokohama with baby",
    "yokohama family travel",
    "cup noodles museum baby",
    "yokohama chinatown stroller",
    "minato mirai baby changing",
    "yokohama travel with kids",
    "cosmo world toddler",
    "yokohama baby friendly",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/yokohama-family-travel-tips" },
};

const sections = [
  {
    title: "Best Family-Friendly Spots",
    icon: "🗺️",
    items: [
      { name: "Cup Noodles Museum", desc: "One of Japan's most fun family museums. Kids aged 3+ can design their own cup noodle with custom flavors and decorations. The entire museum is barrier-free with elevators between floors. Baby care room on the 1F with changing tables, nursing chairs, and a hot water dispenser for formula. Book online — weekends sell out fast. Allow 2-3 hours for the full experience including the noodle-making workshop." },
      { name: "Yokohama Chinatown", desc: "The largest Chinatown in Japan with over 500 shops and restaurants. The main streets are wide and flat — very manageable with a stroller. Best food for kids: steamed buns (nikuman) from street stalls, which are easy to eat and not too spicy. The Kanteibyo temple at the center is free to enter and photogenic. Morning visits (before 11am) are calmer than afternoons." },
      { name: "Cosmo World (Minato Mirai)", desc: "A small amusement park right on the waterfront — no entry fee, you pay per ride. The giant Cosmo Clock 21 Ferris wheel offers spectacular views of the harbor and is accessible with a stroller (fold it at the entrance). Several toddler-friendly rides in the Kids Carnival Zone. The surrounding Minato Mirai area is ultra stroller-friendly with wide promenades and covered walkways." },
      { name: "Anpanman Children's Museum", desc: "A paradise for toddlers who love the Anpanman cartoon character. Interactive play areas, a theater with live shows, and an Anpanman-themed bakery that sells character-shaped bread. Fully accessible with stroller parking at the entrance. Baby care room with 6 changing tables and private nursing booths. Best for ages 1-5. Weekday mornings are much less crowded." },
    ],
  },
  {
    title: "Baby Changing Facilities",
    icon: "🍼",
    items: [
      { name: "Landmark Tower (Minato Mirai)", desc: "The tallest building in Yokohama has excellent family facilities. Baby room on the 3F of the Landmark Plaza mall — 5 changing tables, private nursing rooms, a play area, and a microwave. The Sky Garden observation deck on the 69F has a small baby room too. Elevators throughout and stroller-friendly entrances on all sides." },
      { name: "Yokohama Station (Sogo / Joinus)", desc: "Yokohama Station is a major hub connecting JR, Tokyu, Keikyu, and the subway. The attached Sogo department store has baby rooms on the 6F (8 changing tables, nursing chairs, baby food preparation area). Joinus shopping mall on the west side has a family room on the 3F. Both are well signposted from the station concourse." },
      { name: "Red Brick Warehouse", desc: "The iconic waterfront shopping complex has a baby room in Building 2 on the 1F — changing tables, nursing chairs, and a quiet area. The entire warehouse area is flat and paved, ideal for stroller walking. The grassy park between the warehouses is perfect for letting toddlers run around. Public toilets in the adjacent park also have accessible facilities." },
      { name: "World Porters Mall", desc: "Large shopping mall in Minato Mirai connected to Cosmo World. Baby room on the 3F with multiple changing tables and nursing booths. Also has a DAISO, Uniqlo, and a food court with kids' menus — good for stocking up on baby supplies. Rooftop garden has views of the Ferris wheel and is a nice spot for a stroller break." },
    ],
  },
  {
    title: "Eating Out with Kids",
    icon: "🍽️",
    items: [
      { name: "Shin-Yokohama Ramen Museum", desc: "A unique indoor food theme park recreating a 1958 Tokyo streetscape with 9 famous ramen shops from across Japan. Mini portions available at most shops — perfect for trying multiple flavors with kids. The narrow alleys and retro atmosphere fascinate toddlers. Stroller access is limited on the basement floors (use the elevator), but the recreation area is manageable. Baby changing in the museum restrooms." },
      { name: "Chinatown Family Restaurants", desc: "For a sit-down meal in Chinatown with kids, try Manchinro (est. 1892) or Heichinro — both have private rooms, kids' menus, and high chairs. Dim sum is perfect for families as dishes arrive in small portions that kids can pick at. For quick street food, the steamed buns and sesame balls from stalls along Chukagai-odori are toddler favorites." },
      { name: "Minato Mirai Food Courts", desc: "MARK IS (connected to the station) has a large food court on the 4F with high chairs and a kids' play area adjacent. World Porters also has a family-friendly food court on the 1F. Both offer Japanese, Chinese, and Western options. Useful for families who want variety without the stress of a formal restaurant." },
      { name: "Bills Yokohama (Red Brick)", desc: "The famous Australian cafe known for ricotta pancakes — hugely popular with families. Kids' menu available, high chairs provided, and the terrace has harbor views. Book for an early brunch (10am) to avoid the queue. The pancakes are genuinely worth the hype and toddlers love them." },
    ],
  },
  {
    title: "Getting Around Yokohama",
    icon: "🚇",
    items: [
      { name: "Minato Mirai Line", desc: "The most useful line for families — runs from Yokohama Station through Minato Mirai to Motomachi-Chukagai (Chinatown). All stations have elevators and platform gates. Strollers board without folding. From Shibuya, you can ride directly to Minato Mirai without changing trains (Tokyu Toyoko Line through-service). Journey from central Tokyo is about 30-40 minutes." },
      { name: "Sea Bass Water Bus", desc: "A fun 10-minute boat ride from Yokohama Station East Exit to Minato Mirai (Red Brick area). Kids love it and it avoids the walk from the station. Strollers board via the ramp. Runs every 15-20 minutes on weekends. One-way fare is about ¥700 for adults, children half price. A great alternative to the train for a scenic arrival." },
      { name: "Walking in Minato Mirai", desc: "The entire Minato Mirai district was designed for pedestrians — wide flat promenades, covered walkways between buildings, and waterfront paths. You can walk from Landmark Tower to Red Brick Warehouse to Cosmo World in about 20 minutes, all on flat, stroller-friendly surfaces. This is one of the most walkable districts in Japan for families." },
      { name: "Day Trip from Tokyo", desc: "Yokohama is an easy day trip from Tokyo — 25 minutes from Shibuya on the Tokyu Toyoko Line, or 30 minutes from Tokyo Station on the JR Tokaido Line. Start at Minato Mirai in the morning (Cup Noodles Museum + Cosmo World), walk to Chinatown for lunch, then Red Brick for the afternoon. Train back to Tokyo after dinner." },
    ],
  },
];

export default function YokohamaFamilyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Yokohama Family Travel Tips</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Japan&apos;s second-largest city is one of the best for families — waterfront parks, interactive museums, and the country&apos;s biggest Chinatown.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">🌉</span>
          <p className="text-sm text-sky-800">
            <strong>Yokohama is one of the easiest cities in Japan to navigate with a stroller.</strong> The Minato Mirai waterfront was purpose-built with wide pedestrian promenades, and the Cup Noodles Museum and Anpanman Museum are two of the best family attractions in the greater Tokyo area. Just 30 minutes from central Tokyo, it works perfectly as a day trip or a base for families who want a calmer alternative to Shinjuku.
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
          <h2 className="font-bold text-gray-800 mb-3">Find Toilets in Yokohama</h2>
          <p className="text-sm text-gray-600 mb-4">
            Browse family-friendly toilets in Yokohama with baby changing tables, wheelchair access, and location details.
          </p>
          <Link
            href="/yokohama"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Yokohama Toilet Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/best-baby-changing-facilities-tokyo" className="text-sky-600 hover:underline">← Tokyo Baby Changing Guide</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/nagoya-family-travel-tips" className="text-sky-600 hover:underline">Nagoya Family Guide →</Link>
        </div>
      </div>
    </div>
  );
}
