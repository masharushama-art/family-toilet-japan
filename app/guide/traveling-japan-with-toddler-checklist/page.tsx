import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Japan Toddler Travel Checklist — What to Pack 2026 | Family Toilet Japan",
  description: "Complete packing checklist for traveling Japan with a baby or toddler. What to bring, what to buy in Japan, stroller recommendations, and essential items for every season.",
  keywords: [
    "japan baby packing list",
    "japan toddler travel checklist",
    "what to pack japan baby",
    "japan travel baby essentials",
    "baby supplies japan",
    "diapers in japan",
    "baby formula japan",
    "japan travel with toddler packing",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/traveling-japan-with-toddler-checklist" },
};

const sections = [
  {
    title: "Essentials to Pack from Home",
    icon: "🧳",
    items: [
      { name: "Passport & Insurance Documents", desc: "Your baby needs their own passport for Japan entry. Print copies of travel insurance documents (not just digital) — hospital reception desks in Japan strongly prefer paper. If your baby has a medical condition, carry a translated summary from your doctor. Japan's healthcare is excellent but English-speaking doctors are mainly in Tokyo and Osaka — your embassy can provide a list." },
      { name: "Lightweight Stroller", desc: "A compact, lightweight stroller (under 7kg) makes Japan infinitely easier. Top picks: Cybex Libelle (4.2kg fold), Babyzen YOYO2 (6.2kg), GB Pockit (4.3kg). Key requirements: one-hand fold, cabin-bag size when folded, decent wheels for cobblestone paths at temples. Avoid heavy jogging strollers — they won't fit through narrow restaurant doors or on escalators." },
      { name: "Baby Carrier (Ergobaby / BabyBjorn)", desc: "Essential for temple stairs, crowded festivals, and rush-hour trains. You'll use it 30-40% of the time even with a stroller. A structured carrier with lumbar support is worth the extra weight for long days. Front-facing carriers are popular for sightseeing — babies love watching the world from this position. Pack it in your carry-on for the flight too." },
      { name: "Medications & First Aid", desc: "Bring a small kit: baby paracetamol/ibuprofen (Tylenol/Nurofen), oral rehydration sachets, antihistamine, thermometer, plasters, and any prescription medications. Japanese pharmacies are well-stocked but product names differ and staff may not speak English. Bring enough of your regular medications for the entire trip plus 3 extra days." },
    ],
  },
  {
    title: "Buy in Japan (Don't Pack These)",
    icon: "🛒",
    items: [
      { name: "Diapers (Omutsu)", desc: "Japanese diapers are the best in the world — seriously. Merries, Moony, and Goo.N are softer, more absorbent, and better fitting than most Western brands. Available at every drug store (Matsumoto Kiyoshi, Sundrug, Welcia) and supermarket. A pack of 50-60 costs ¥1,000-1,500. Don't waste luggage space bringing diapers from home — buy a pack on your first day." },
      { name: "Baby Wipes & Supplies", desc: "Japanese baby wipes (おしりふき / oshiri-fuki) are thick, moist, and often contain moisturizing ingredients. Available everywhere for about ¥200-300 per pack. Drug stores also stock baby lotion, sunscreen (SPF50 baby formulas), and cotton pads at reasonable prices. The baby aisle at any Matsumoto Kiyoshi is comprehensive and clearly labeled with age ranges." },
      { name: "Baby Food Pouches", desc: "Kewpie and Wakodo sell excellent shelf-stable baby food from 5 months+. Flavors include dashi rice porridge, pumpkin, sweet potato, fish, and udon. About ¥150-300 per pouch at any drug store or supermarket. These are perfect for train rides and restaurant meals where the menu doesn't suit a baby. The quality is genuinely higher than most Western baby food brands." },
      { name: "Rain Gear", desc: "Japan is rainy — especially June-July (rainy season) and September (typhoon season). Buy a cheap transparent umbrella at any convenience store for ¥500. For the stroller, a rain cover from a baby store (Akachan Honpo, Nishimatsuya) costs about ¥1,000 and fits most compact strollers. A lightweight rain jacket for yourself is essential year-round." },
    ],
  },
  {
    title: "Season-Specific Packing",
    icon: "🌸",
    items: [
      { name: "Spring (March–May)", desc: "Temperatures: 10-22°C. Layering is key — mornings are cool, afternoons warm. Pack: light jacket, long-sleeve shirts, one warm fleece for evenings. Cherry blossom season (late March–mid April) brings crowds — a baby carrier is more practical than a stroller at popular hanami spots. Pollen allergy season peaks in March-April; bring antihistamines if your baby is sensitive." },
      { name: "Summer (June–September)", desc: "Temperatures: 25-38°C with extreme humidity. Pack: breathable cotton clothes, UV-protection hat, SPF50 baby sunscreen, portable fan (clip-on for stroller), reusable water bottle. Cooling towels (ひんやりタオル) from any convenience store are a lifesaver — wet them and drape over the stroller. Stay hydrated — vending machines with baby-safe barley tea (mugicha) are everywhere." },
      { name: "Autumn (October–November)", desc: "Temperatures: 12-22°C. The best season for family travel — comfortable temperatures, low humidity, beautiful foliage. Pack: medium jacket, layers, comfortable walking shoes. This is peak tourist season so book Shinkansen seats and hotels well in advance. Autumn foliage (koyo) is stunning at temples in Kyoto and Nikko — similar to cherry blossoms but with fewer crowds." },
      { name: "Winter (December–February)", desc: "Temperatures: 0-10°C (colder in Hokkaido/Tohoku). Pack: warm jacket, thermal layers, warm hat and gloves for baby, stroller blanket or footmuff. Japanese indoor spaces are well heated — dress in layers you can remove. If visiting Hokkaido for snow, waterproof outer layers are essential. Onsen (hot springs) are wonderful in winter — some ryokan have private family baths where babies are welcome." },
    ],
  },
  {
    title: "Tech & Comfort Items",
    icon: "📱",
    items: [
      { name: "Portable WiFi / eSIM", desc: "Essential for navigation (Google Maps), translation (Google Translate camera mode), and finding toilets (Family Toilet Japan works offline as a PWA too). Pocket WiFi rental from the airport is about ¥800-1,000/day. eSIM options (Ubigi, Airalo) are cheaper at about ¥1,500-3,000 for 2 weeks. Download offline maps and translation packs before your trip as backup." },
      { name: "Portable Charger", desc: "Your phone will be your map, translator, and camera all day — a portable charger (10,000mAh+) is essential. Japan is a USB-A country, so bring appropriate cables. If you forget, convenience stores sell disposable chargers for about ¥1,000. Many Shinkansen seats have power outlets, and most hotels have USB charging ports by the bed." },
      { name: "White Noise Machine / App", desc: "A small white noise machine or app (Hatch, Marpac) helps babies sleep in unfamiliar hotel rooms. Japanese hotels are generally quiet, but the thin walls and different sounds (station announcements, vending machines outside) can wake light sleepers. Start using it a week before the trip so it becomes a familiar sleep cue." },
      { name: "Ziplock Bags (Multiple Sizes)", desc: "The most underrated baby travel item. Use them for: dirty diapers when no bin is available, wet clothes, snack storage, organizing small items in your bag, keeping phone dry in rain. Pack 10-15 in various sizes — they weigh nothing and you'll use them daily. Japan's cleanliness means you'll always want to bag dirty items rather than contaminating your bag." },
    ],
  },
];

export default function ToddlerChecklistPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Japan Toddler Travel Checklist</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          What to pack, what to buy in Japan, and what to leave at home — the complete list for traveling Japan with a baby or toddler.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">✅</span>
          <p className="text-sm text-sky-800">
            <strong>The golden rule: pack less than you think you need.</strong> Japan has the best baby supplies in the world — diapers, wipes, baby food, and clothing are all superior quality and available at every drug store and convenience store. Focus your luggage space on things you can&apos;t easily buy there: medications, your preferred carrier, and a good stroller.
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
          <h2 className="font-bold text-gray-800 mb-3">Find Toilets Anywhere in Japan</h2>
          <p className="text-sm text-gray-600 mb-4">
            16,000+ family-friendly toilets with baby changing tables across all 47 prefectures.
          </p>
          <Link
            href="/map"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Find Toilets Near Me
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/japan-family-restaurants-guide" className="text-sky-600 hover:underline">← Family Restaurants Guide</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/japan-travel-with-baby" className="text-sky-600 hover:underline">Japan Travel with Baby →</Link>
        </div>
      </div>
    </div>
  );
}
