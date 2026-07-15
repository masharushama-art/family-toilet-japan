import type { Metadata } from "next";
import Link from "next/link";
import GuideAreaLinks from "../../components/GuideAreaLinks";
import GuideScrollTracker from "../../components/GuideScrollTracker";

export const metadata: Metadata = {
  title: "Summer Festivals & Fireworks with Kids in Japan — 2026 Guide | Family Toilet Japan",
  description: "Complete guide to enjoying Japanese summer festivals (matsuri) and fireworks displays (hanabi) with babies and toddlers. Crowd avoidance, heatstroke prevention, and finding toilets.",
  keywords: [
    "japan summer festival with kids",
    "hanabi fireworks with baby",
    "matsuri stroller",
    "japan fireworks toddler",
    "heatstroke prevention kids japan",
    "summer festival toilet japan",
  ],
  alternates: {
    canonical: "https://familytoiletjapan.com/guide/summer-festivals-with-kids-japan",
    languages: {
      en: "https://familytoiletjapan.com/guide/summer-festivals-with-kids-japan",
      ja: "https://familytoiletjapan.com/ja/guide/summer-festivals-with-kids-japan",
      "zh-TW": "https://familytoiletjapan.com/zh/guide/summer-festivals-with-kids-japan",
      ko: "https://familytoiletjapan.com/ko/guide/summer-festivals-with-kids-japan",
    },
  },
};

const sections = [
  {
    title: "Avoiding the Crowds",
    icon: "🎐",
    items: [
      { name: "Arrive 1-2 hours early", desc: "Fireworks displays get most crowded right before the show starts. Arrive early, lay out a picnic sheet, browse the food stalls, then settle into your spot. Moving a stroller through the crowd within 2 hours of start time becomes very difficult — bring a baby carrier as backup." },
      { name: "Find a quieter viewing spot", desc: "Riverside areas and parks slightly away from the main venue often still offer a great view of the fireworks. Ask locals for hidden viewing spots — these are usually far more comfortable for families than the main crowd." },
      { name: "The walk home is the hardest part", desc: "Stations become nearly impassable right after fireworks end. Leaving 5-10 minutes before the finale ('mikiri' — cutting your losses) is standard practice for families. Missing the last few minutes beats being stuck at a station for an hour." },
      { name: "Bring shade as well as a sheet", desc: "If you'll be outdoors from late afternoon, a folding umbrella or small pop-up shade tent makes a huge difference to a baby's stamina. Ground reflection heat is intense too — use a thick picnic sheet." },
    ],
  },
  {
    title: "Festival Food Stalls with Kids",
    icon: "🍧",
    items: [
      { name: "Kakigori (Shaved Ice)", desc: "A festival classic and great for cooling down. Shops offering a choice of syrup flavors make it easy to suit a child's taste. It's ice, so watch portion sizes for toddlers." },
      { name: "Takoyaki & Okonomiyaki", desc: "Cut into small pieces and let cool before giving to toddlers. Since stalls are near hot oil and open flames, it's safer to keep small children in the stroller while you order." },
      { name: "Candy apples & Cotton candy", desc: "Visually appealing but sugar-heavy — give toddlers small amounts. Stick-based snacks carry a choking/fall risk, so always have kids sit while eating." },
      { name: "Timing to avoid stall crowds", desc: "Food stalls are busiest 6-7pm. Buy your food right after arrival (4-5pm) so you can eat leisurely once you've secured your spot." },
    ],
  },
  {
    title: "Heat & Safety",
    icon: "🌡️",
    items: [
      { name: "Frequent hydration", desc: "Crowds at summer festivals raise the perceived temperature significantly. Freeze baby-safe barley tea or oral rehydration solution in a bottle before leaving — it doubles as an ice pack as it melts." },
      { name: "Cooling gear", desc: "Neck coolers, cooling towels with ice packs, and portable fans are essential. Lining the stroller seat with a cooling mat helps too." },
      { name: "Preventing lost children", desc: "Yukata and jinbei (traditional summer wear) look different from a child's everyday clothes, making them harder to spot if separated. Attach a small tag with your name and phone number to clothing or shoes. Taking a photo of what your child is wearing before you leave is also smart." },
      { name: "The fireworks noise", desc: "Loud bangs startle many babies into crying. Gently covering their ears or holding them close against your body helps. Noise-reducing baby ear muffs are widely sold and worth bringing." },
    ],
  },
  {
    title: "Finding Toilets",
    icon: "🚽",
    items: [
      { name: "Locate toilets immediately on arrival", desc: "Lines for toilets get very long during the main event. As soon as you arrive, note the nearest toilet location, and go once in the early evening before the rush really builds." },
      { name: "Check for changing tables in advance", desc: "Temporary event toilets almost never have baby changing tables. Check the map for baby rooms at nearby stations or shopping facilities before you go." },
      { name: "Consider a slightly farther station or convenience store", desc: "A short walk to a nearby station or convenience store toilet is often cleaner and less crowded than the venue's temporary toilets — especially useful if you need to change a diaper." },
    ],
  },
];

export default function SummerFestivalsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <GuideScrollTracker slug="summer-festivals-with-kids-japan" lang="en" />
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Summer Festivals & Fireworks with Kids</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Yukata, food stalls, and fireworks over the water — a practical guide to enjoying Japan&apos;s summer matsuri with babies and toddlers.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">🎆</span>
          <p className="text-sm text-sky-800 dark:text-sky-200">
            Summer festivals are a highlight of a Japan trip, but crowds, heat, and scarce toilets can make them tough with young kids. A little planning goes a long way.
          </p>
        </div>

        {sections.map(({ title, icon, items }, sectionIndex) => (
          <div key={title} className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{icon} {title}</h2>
            <div className="space-y-3">
              {items.map(({ name, desc }) => (
                <div key={name} className="border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1">{name}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <GuideAreaLinks slug="summer-festivals-with-kids-japan" lang="en" />

        <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Find Toilets Near Festival Venues</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Check baby-changing toilets near festival and fireworks venues in advance on our interactive map.
          </p>
          <Link
            href="/map"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Open Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/guide/japan-family-restaurants-guide" className="text-sky-600 hover:underline">← Family Restaurants Guide</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/traveling-japan-with-toddler-checklist" className="text-sky-600 hover:underline">Packing Checklist →</Link>
        </div>
      </div>
    </div>
  );
}
