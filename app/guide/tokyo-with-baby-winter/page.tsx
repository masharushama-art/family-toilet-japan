import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tokyo with Baby in Winter — Cold Weather Family Travel Guide 2026 | Family Toilet Japan",
  description: "Guide to visiting Tokyo with a baby or toddler in winter (December-February). Indoor attractions, warm stroller tips, illuminations, onsen, and how to dress your baby for Japan's winter.",
  keywords: [
    "tokyo winter baby",
    "tokyo with baby december",
    "tokyo winter toddler",
    "tokyo indoor attractions baby",
    "japan winter travel baby",
    "tokyo illumination stroller",
    "tokyo christmas with baby",
    "japan onsen with baby",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/tokyo-with-baby-winter" },
};

const sections = [
  {
    title: "Indoor Attractions for Families",
    icon: "🏛️",
    items: [
      { name: "teamLab Planets / Borderless", desc: "Two of Tokyo's most magical indoor experiences. teamLab Planets (Toyosu) involves walking through water — not suitable for babies in strollers, but fine with a carrier (you walk barefoot). teamLab Borderless (Azabudai Hills) is fully stroller-accessible and the ever-changing digital art mesmerizes babies and toddlers. Both are climate-controlled and perfect for cold days. Book online — they sell out." },
      { name: "Tokyo Skytree & Solamachi", desc: "The observation deck is warm and offers stunning winter views — on clear days you can see Mt. Fuji. The Solamachi shopping mall at the base has a large baby room on the 4F, a children's play area, and a food court with high chairs. The Sumida Aquarium inside Solamachi is excellent for toddlers — small enough to explore in an hour without overwhelm." },
      { name: "Kidzania Tokyo (Toyosu)", desc: "A miniature city where kids aged 3-15 can try 100+ jobs — firefighter, pilot, baker, doctor. Fully indoor and heated. While technically for ages 3+, toddlers (2+) can participate in some activities with a parent. The facility is enormous with a baby lounge, changing rooms, and a nursing area. Half-day tickets are available. Weekday mornings are much less hectic." },
      { name: "National Museum of Nature and Science (Ueno)", desc: "One of Tokyo's best rainy/cold-day museums for families. The dinosaur skeletons, the 360-degree theater, and the interactive science floor keep toddlers engaged for 2-3 hours. Fully stroller-accessible with elevators, and the baby room on the B1F has changing tables and nursing chairs. Free for children under 18. Adjacent to Ueno Zoo if the weather improves mid-day." },
    ],
  },
  {
    title: "Winter Illuminations with a Stroller",
    icon: "✨",
    items: [
      { name: "Roppongi Hills Keyakizaka Illumination", desc: "A stunning blue LED tunnel along Keyakizaka Street — one of Tokyo's most photogenic winter scenes. The path is flat, wide, and completely stroller-friendly. Runs from mid-November to late December, 5pm-11pm. Combine with a visit to the Mori Art Museum observation deck (warm indoor views) and dinner at the Roppongi Hills food court." },
      { name: "Marunouchi Illumination", desc: "The Marunouchi Nakadori street near Tokyo Station is lined with champagne-gold LEDs from November to February. Wide sidewalks, flat terrain, and the entire area is stroller-paradise. Walk from Tokyo Station Marunouchi exit along the street — it connects to the KITTE commercial complex which has excellent baby facilities on the 5F." },
      { name: "Caretta Shiodome Illumination", desc: "Known for elaborate themed light shows set to music. The shows run every 15-20 minutes and last about 6 minutes — perfect attention span for toddlers. The Caretta Shiodome mall has indoor viewing areas and a baby room. Less crowded than Roppongi on weeknights. Runs late November through mid-February." },
      { name: "Yebisu Garden Place Baccarat Chandelier", desc: "A giant Baccarat crystal chandelier displayed outdoors from November to early January. Smaller scale than other illuminations but genuinely beautiful and less crowded. The adjacent Mitsukoshi department store has a baby room. The surrounding Yebisu Garden Place is calm, stroller-friendly, and has several family restaurants." },
    ],
  },
  {
    title: "Dressing Your Baby for Winter",
    icon: "🧥",
    items: [
      { name: "Layering System", desc: "Tokyo winter temperatures range from 2-12°C. The key challenge is that outdoor temps are cold but indoor spaces (trains, malls, restaurants) are warm. Dress your baby in removable layers: a cotton base layer, a fleece or wool mid layer, and a windproof outer jacket. Avoid bulky one-piece snowsuits — you'll spend half the day unzipping in overheated department stores." },
      { name: "Stroller Warmth", desc: "A stroller footmuff or fleece blanket is essential — the wind chill in a moving stroller is significant. Japanese baby stores (Akachan Honpo, Nishimatsuya) sell clip-on stroller blankets for about ¥2,000-3,000. A rain cover also doubles as a wind shield. Warm socks and a hat are more important than gloves for babies — they'll pull gloves off immediately anyway." },
      { name: "Buy Warm Baby Clothes in Japan", desc: "Uniqlo HEATTECH baby range (from ¥790) is excellent — thin thermal layers that don't add bulk. Akachan Honpo and Nishimatsuya sell warm baby outerwear at very reasonable prices. If you're visiting Hokkaido or heading to snowy areas, upgrade to a proper snowsuit — available at any baby store in those regions." },
      { name: "Indoor Temperature Warning", desc: "Japanese indoor heating can be aggressive — trains, department stores, and restaurants are often 24-28°C in winter. A baby who is perfectly dressed for outside will overheat within 10 minutes indoors. Always have a plan for quickly removing layers: zip-up jackets over pullover sweaters, snap-button base layers, and an easy-to-access spot in your stroller bag for shed clothing." },
    ],
  },
  {
    title: "Winter-Specific Tips",
    icon: "❄️",
    items: [
      { name: "Onsen / Hot Springs with a Baby", desc: "Most public onsen do NOT allow babies in diapers. However, many ryokan (traditional inns) and onsen facilities offer private family baths (貸切風呂 / kashikiri-buro) where babies are welcome. LaQua Spa (Tokyo Dome) has family-friendly facilities. Ooedo-Onsen Monogatari in Odaiba was family-friendly but has closed — check current alternatives. The foot baths (ashiyu) at many onsen areas are always baby-friendly." },
      { name: "New Year's in Tokyo (Dec 31 – Jan 3)", desc: "Tokyo transforms during New Year — most shops close Dec 31-Jan 1, and shrines are packed for hatsumode (first shrine visit). Meiji Jingu gets 3+ million visitors in the first 3 days — avoid it with a stroller. Instead, visit a smaller local shrine for a calmer experience. Department store fukubukuro (lucky bags) go on sale Jan 1-2 — baby brands like Miki House offer great value packs." },
      { name: "Dry Air & Baby Skin", desc: "Tokyo winter air is very dry (20-40% humidity). Babies with sensitive skin may develop dry patches within days. Bring or buy a rich baby moisturizer — Japanese brands like Pigeon and Mama&Kids are excellent. Apply after every bath. Hotel rooms are especially dry — request a humidifier at check-in, most hotels have them available." },
      { name: "Flu Season Precautions", desc: "Influenza peaks in January-February in Japan. You'll notice many people wearing masks — this is normal Japanese practice. Carry hand sanitizer and wipe down stroller handles and high chairs. Japanese pharmacies sell baby-safe hand sanitizer gel. If your baby gets sick, hotel reception can direct you to the nearest pediatric clinic (小児科 / shounika)." },
    ],
  },
];

export default function TokyoWinterBabyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Tokyo with Baby in Winter</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          December through February — illuminations, indoor attractions, and keeping your baby warm in Japan&apos;s cold season.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">❄️</span>
          <p className="text-sm text-sky-800">
            <strong>Winter is actually an underrated time to visit Tokyo with a baby.</strong> The crowds are thinner than cherry blossom season, the air is crisp and clear (best views of Mt. Fuji), and Tokyo&apos;s world-class indoor attractions mean you&apos;re never stuck without something to do. The illuminations are magical from a stroller, and the challenge of dressing for cold weather is easily managed with the right layers.
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
          <h2 className="font-bold text-gray-800 mb-3">Find Toilets in Tokyo</h2>
          <p className="text-sm text-gray-600 mb-4">
            Browse family-friendly toilets in Tokyo with baby changing tables, wheelchair access, and 24-hour facilities.
          </p>
          <Link
            href="/tokyo"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Tokyo Toilet Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/best-baby-changing-facilities-tokyo" className="text-sky-600 hover:underline">← Tokyo Baby Changing Guide</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/yokohama-family-travel-tips" className="text-sky-600 hover:underline">Yokohama Family Guide →</Link>
        </div>
      </div>
    </div>
  );
}
