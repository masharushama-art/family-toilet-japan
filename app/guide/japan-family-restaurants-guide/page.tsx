import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Japan Family Restaurants Guide — Eating Out with Baby & Kids 2026 | Family Toilet Japan",
  description: "Where to eat in Japan with a baby or toddler. Family restaurants, conveyor belt sushi, food courts, convenience store meals, and tips for high chairs, kids menus, and allergies.",
  keywords: [
    "japan restaurant with baby",
    "japan family restaurant",
    "eating out with baby japan",
    "japan kids menu",
    "japan high chair restaurant",
    "japan food allergy baby",
    "conveyor belt sushi kids japan",
    "japan convenience store baby food",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/japan-family-restaurants-guide" },
};

const sections = [
  {
    title: "Family Restaurant Chains (ファミレス)",
    icon: "🍽️",
    items: [
      { name: "Gusto / Bamiyan / Jonathan's", desc: "The Skylark Group operates Japan's most family-friendly restaurant chains. Every location has high chairs, kids' menus with small portions (¥300-500), and a drink bar. Gusto serves Western-Japanese fusion, Bamiyan is Chinese, and Jonathan's is slightly upscale Western. All have tablet ordering — no language barrier. Baby changing tables in the restrooms at most locations. Open late (until 11pm-2am) which is a lifesaver for jet-lagged families." },
      { name: "Saizeriya", desc: "Italy-themed family restaurant with incredibly low prices — a kids' meal with drink is about ¥500. The pizza and pasta are genuinely good for the price. High chairs at every location, spacious seating, and a relaxed atmosphere where nobody minds a fussy baby. Popular with Japanese families for a reason. Over 1,000 locations nationwide — you'll find one near any hotel." },
      { name: "Coco's / Royal Host / Denny's Japan", desc: "Mid-range family chains with slightly better food quality. Royal Host has the best desserts (their parfaits are famous). All three have kids' menus, high chairs, and accessible toilets. Coco's has a particularly good baby-friendly setup with plastic tableware and bibs available on request. Denny's Japan is nothing like the American version — it's genuinely good Japanese-Western food." },
      { name: "Joyfull / Yayoi-ken", desc: "Budget family restaurants found mainly in western Japan and Kyushu. Joyfull is Kyushu's answer to Gusto — high chairs, kids' menus, and 24-hour service at many locations. Yayoi-ken specializes in set meals (teishoku) and is excellent value. Both are less crowded than the big chains and often have more spacious seating — good for families who need breathing room." },
    ],
  },
  {
    title: "Kid-Friendly Japanese Food",
    icon: "🍱",
    items: [
      { name: "Conveyor Belt Sushi (Kaitenzushi)", desc: "The single best restaurant type for families in Japan. Kids love watching plates go by and choosing their own food. Sushiro, Kura Sushi, and Hamazushi are the major chains — all have high chairs, kids' menus, and tablet ordering in English. Kura Sushi has a prize game (gacha) for every 5 plates — instant toddler entertainment. Most items are ¥100-150 per plate. Baby-friendly items: tamago (egg), inari (sweet tofu pocket), edamame, corn sushi." },
      { name: "Udon Restaurants", desc: "Udon (thick wheat noodles) is the most baby-friendly Japanese food — soft texture, mild flavor, easy to cut into small pieces. Marugame Seimen is a nationwide chain where you order at a counter and watch the noodles being made — kids are fascinated. A plain udon (kake udon) is about ¥300 and suitable for babies 9+ months. Ask for 'nurukunshite kudasai' (make it lukewarm) for a baby." },
      { name: "Curry Restaurants (CoCo Ichibanya)", desc: "CoCo Ichibanya (CoCo Ichi) is Japan's largest curry chain with over 1,200 locations. They have a kids' curry plate with mild sauce — genuinely not spicy at all. Specify '甘口' (amakuchi / mild) or ask for the children's curry. High chairs available, and the staff are very accommodating. Japanese curry is thicker and milder than Indian curry, making it naturally suitable for toddlers." },
      { name: "Ramen with a Baby", desc: "Ramen shops are often small and crowded — not ideal for strollers. But chain ramen shops (Ichiran, Ippudo, Tenkaippin) are more spacious and have high chairs. Ichiran has private booths that are actually great for nursing. For babies, plain rice (shiro gohan) is usually available as a side for ¥100-200. The broth can be too salty for babies — don't share yours with children under 1." },
    ],
  },
  {
    title: "Quick & Easy Options",
    icon: "⚡",
    items: [
      { name: "Convenience Stores (Konbini)", desc: "7-Eleven, FamilyMart, and Lawson are a parent's secret weapon in Japan. Onigiri (rice balls, ¥120-180) are perfect toddler food — easy to hold, no mess. Pre-made sandwiches, boiled eggs, banana, and yogurt are always available. Most convenience stores have a microwave for heating — ask 'atatamete kudasai'. Some larger locations have eat-in corners with seats. Stock up before train rides." },
      { name: "Department Store Food Halls (Depachika)", desc: "The basement food floors of department stores (Takashimaya, Isetan, Daimaru) sell incredible take-away meals — bento boxes, sushi, fried chicken, salads, and desserts. Higher quality than convenience stores but still affordable (¥500-1,500 per box). Perfect for assembling a hotel room dinner after a long day. Most are open until 8pm and mark items down 20-50% after 7pm." },
      { name: "Food Courts in Shopping Malls", desc: "Every major shopping mall has a food court — these are the most stress-free dining option for families. High chairs are always available, the noise level is already high (a crying baby won't stand out), and you can order different cuisines for different family members. AEON Mall, LaLaport, and Ito-Yokado food courts are consistently good across Japan." },
      { name: "Baby Food in Japan", desc: "Japanese baby food (離乳食 / rinyuushoku) is excellent and widely available at drug stores (Matsumoto Kiyoshi, Sundrug) and supermarkets. The Kewpie and Wakodo brands sell shelf-stable pouches from 5 months+ in flavors like dashi-seasoned rice, pumpkin, and fish. About ¥150-300 per pouch. These are lifesavers for travel days when you can't prepare fresh food." },
    ],
  },
  {
    title: "Practical Tips",
    icon: "💡",
    items: [
      { name: "Allergies & Dietary Restrictions", desc: "Japanese law requires labeling of 8 major allergens (wheat, egg, milk, shrimp, crab, peanut, buckwheat, tree nuts) on packaged foods. Restaurant menus at chains usually list allergens too. For communicating allergies at non-chain restaurants, print an allergy card in Japanese — free templates are available by searching 'Japan allergy card'. Gluten-free is challenging in Japan as soy sauce (contains wheat) is in almost everything." },
      { name: "Reservations & Timing", desc: "Family restaurants rarely need reservations. For regular restaurants, 11:30am lunch or 5:30pm dinner avoids the peak crowd. Many popular restaurants use tablet waitlist apps (like Tabelog or Hot Pepper) — your hotel reception can often help you book. Lunch sets (ランチセット) are almost always better value than dinner — same food, 30-50% cheaper." },
      { name: "High Chairs & Booster Seats", desc: "High chairs (子ども用いす / kodomo-yo isu) are available at virtually all family restaurants and most mid-range restaurants. Some traditional restaurants (tatami seating) provide a Bumbo-style floor seat instead. If you need a high chair, ask: 'kodomo-yo isu wa arimasu ka?' (Do you have a children's chair?). Bring a portable harness as backup for restaurants without them." },
      { name: "Tipping & Etiquette", desc: "No tipping in Japan — ever. This includes restaurants, taxis, and hotels. Trying to tip can cause confusion or embarrassment. At restaurants, you pay at the register near the exit, not at the table. Many family restaurants have tablet ordering and self-checkout, making the process completely stress-free even without Japanese." },
    ],
  },
];

export default function FamilyRestaurantsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Japan Family Restaurants Guide</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Where to eat in Japan with babies and toddlers — from conveyor belt sushi to convenience store hacks.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">🍜</span>
          <p className="text-sm text-sky-800">
            <strong>Eating out with a baby in Japan is easier than almost anywhere else in the world.</strong> Family restaurant chains are everywhere, conveyor belt sushi is instant entertainment for toddlers, convenience stores sell perfect on-the-go baby food, and nobody will judge you for a crying baby at dinner. The key is knowing which restaurant types to target and what to order.
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
          <h2 className="font-bold text-gray-800 mb-3">Find Nearby Toilets</h2>
          <p className="text-sm text-gray-600 mb-4">
            Find toilets with baby changing tables near restaurants across Japan.
          </p>
          <Link
            href="/map"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Find Toilets Near Me
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/japan-train-travel-with-stroller" className="text-sky-600 hover:underline">← Train Travel with Stroller</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/traveling-japan-with-toddler-checklist" className="text-sky-600 hover:underline">Toddler Travel Checklist →</Link>
        </div>
      </div>
    </div>
  );
}
