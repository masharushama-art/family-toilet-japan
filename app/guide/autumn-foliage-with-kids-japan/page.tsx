import type { Metadata } from "next";
import Link from "next/link";
import GuideAreaLinks from "../../components/GuideAreaLinks";
import GuideScrollTracker from "../../components/GuideScrollTracker";

export const metadata: Metadata = {
  title: "Autumn Foliage (Koyo) with Kids in Japan — 2026 Guide | Family Toilet Japan",
  description: "Complete guide to viewing Japan's autumn foliage (koyo) with babies and toddlers. Best timing, stroller-friendly spots, layering for the cold, and finding toilets near temples and parks.",
  keywords: [
    "japan autumn foliage with kids",
    "koyo with baby",
    "japan fall colors toddler",
    "kyoto autumn leaves stroller",
    "japan momiji baby",
    "autumn foliage toilet japan",
  ],
  alternates: {
    canonical: "https://family-toilet-japan.vercel.app/guide/autumn-foliage-with-kids-japan",
    languages: {
      en: "https://family-toilet-japan.vercel.app/guide/autumn-foliage-with-kids-japan",
      ja: "https://family-toilet-japan.vercel.app/ja/guide/autumn-foliage-with-kids-japan",
      "zh-TW": "https://family-toilet-japan.vercel.app/zh/guide/autumn-foliage-with-kids-japan",
      ko: "https://family-toilet-japan.vercel.app/ko/guide/autumn-foliage-with-kids-japan",
    },
  },
};

const sections = [
  {
    title: "Timing It Right",
    icon: "🍁",
    items: [
      { name: "Foliage moves south and downhill", desc: "Colors peak in Hokkaido from late September, in northern Tohoku and mountain areas (Nikko, Nagano) from mid-October, and in Tokyo, Kyoto, and Osaka from mid-November into early December. Check a koyo forecast site 2-3 weeks before your trip since peak timing shifts year to year." },
      { name: "Weekday mornings are calmest", desc: "Famous spots like Kyoto's Arashiyama or Tofuku-ji get extremely crowded on weekend afternoons during peak week. Visiting on a weekday, arriving within an hour of opening, is dramatically easier with a stroller — paths are wide enough to move freely and toilet lines are short." },
      { name: "Illuminated night viewing isn't stroller-friendly", desc: "Many temples and gardens offer special nighttime foliage illumination (yakei) during peak season. These are beautiful but involve uneven stone paths in the dark, tight one-way crowd flow, and no stroller access at many venues — better suited to a carrier, and only if your child's bedtime allows it." },
    ],
  },
  {
    title: "Stroller-Friendly Viewing Spots",
    icon: "🍂",
    items: [
      { name: "Parks over temple gardens", desc: "Large public parks (Tokyo's Showa Kinen Park, Kyoto's Kamo River banks, Osaka Castle Park) have paved, wide paths ideal for strollers, plus playgrounds to break up the walk. Traditional temple gardens often have gravel paths, steps, and narrow gates that make stroller access difficult or impossible." },
      { name: "Ropeway and cable car options", desc: "Spots like Mt. Takao (near Tokyo) or Arashiyama's Kameyama area let you cover elevation by ropeway or cable car rather than climbing, which is much easier with a baby carrier. Check in advance whether strollers are allowed onboard — most require folding them." },
      { name: "Riverside walks", desc: "Kyoto's Kamogawa, Nagano's Zenkoji approach, and similar riverside paths offer long, flat, foliage-lined walks without an entrance fee or crowd bottleneck — a good low-stress option with a toddler who needs to run around." },
    ],
  },
  {
    title: "Dressing for the Cold",
    icon: "🧣",
    items: [
      { name: "Layer more than you think", desc: "Peak koyo season (November) brings 8-18°C swings between morning and midday depending on region — much cooler than summer trips. Dress your baby in removable layers: a base layer, fleece, and a windproof outer shell, plus a hat since heat loss through the head is significant for infants." },
      { name: "Stroller footmuff or blanket", desc: "A stroller footmuff (blanket that zips around the seat and legs) keeps a baby much warmer than loose blankets, which tend to slip off during walks on uneven ground. Many babywearing/baby stores in Japan (Akachan Honpo, Nishimatsuya) stock these seasonally from October." },
      { name: "Warm drinks and hand warmers", desc: "Vending machines switch to hot drinks (look for the red temperature label) from October — warm milk tea or hot barley tea in a thermos works well for a toddler on a chilly walk. Disposable hand warmers (kairo) are sold everywhere and can be tucked into a stroller pocket, not directly against skin." },
    ],
  },
  {
    title: "Finding Toilets",
    icon: "🚽",
    items: [
      { name: "Popular temples have long toilet lines in peak week", desc: "At major koyo destinations during peak week, toilet queues can rival the crowds at the viewing spot itself. Use the map to identify a second or third option near your route rather than relying on the one at the entrance." },
      { name: "Convenience stores near stations are a reliable backup", desc: "Since many koyo spots are in less central areas, a station or convenience store toilet on the way in or out is often cleaner and faster than the on-site facilities, especially for a diaper change." },
      { name: "Mountain and ropeway areas have fewer facilities", desc: "Spots reached by ropeway or a hiking path (Mt. Takao, some Nikko areas) may have only one toilet near the base station. Plan bathroom breaks before heading up, and check our map in advance for the nearest baby-changing table." },
    ],
  },
];

export default function AutumnFoliagePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <GuideScrollTracker slug="autumn-foliage-with-kids-japan" lang="en" />
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Autumn Foliage (Koyo) with Kids</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Red maples, golden ginkgo, and crisp air — a practical guide to enjoying Japan&apos;s autumn foliage season with babies and toddlers.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">🍁</span>
          <p className="text-sm text-sky-800 dark:text-sky-200">
            Autumn foliage season (mid-October to early December, depending on region) is one of the most comfortable times to travel Japan with kids — cooler than summer, fewer crowds than cherry blossom season, and stunning scenery. A little planning around timing and layering makes it even easier.
          </p>
        </div>

        {sections.map(({ title, icon, items }) => (
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

        <GuideAreaLinks slug="autumn-foliage-with-kids-japan" lang="en" />

        <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Find Toilets Near Foliage Spots</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Check baby-changing toilets near temples, parks, and ropeway stations in advance on our interactive map.
          </p>
          <Link
            href="/map"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Open Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/guide/kyoto-with-baby" className="text-sky-600 hover:underline">← Kyoto with Baby</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/traveling-japan-with-toddler-checklist" className="text-sky-600 hover:underline">Packing Checklist →</Link>
        </div>
      </div>
    </div>
  );
}
