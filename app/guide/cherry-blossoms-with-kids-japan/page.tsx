import type { Metadata } from "next";
import Link from "next/link";
import GuideAreaLinks from "../../components/GuideAreaLinks";
import GuideScrollTracker from "../../components/GuideScrollTracker";

export const metadata: Metadata = {
  title: "Cherry Blossoms (Sakura) with Kids in Japan — 2026 Guide | Family Toilet Japan",
  description: "Complete guide to viewing Japan's cherry blossoms (sakura) with babies and toddlers. Best timing, stroller-friendly hanami spots, crowd avoidance, and finding toilets.",
  keywords: [
    "japan cherry blossom with kids",
    "sakura with baby",
    "hanami stroller",
    "japan cherry blossom toddler",
    "kyoto sakura baby",
    "cherry blossom toilet japan",
  ],
  alternates: {
    canonical: "https://family-toilet-japan.vercel.app/guide/cherry-blossoms-with-kids-japan",
    languages: {
      en: "https://family-toilet-japan.vercel.app/guide/cherry-blossoms-with-kids-japan",
      ja: "https://family-toilet-japan.vercel.app/ja/guide/cherry-blossoms-with-kids-japan",
      "zh-TW": "https://family-toilet-japan.vercel.app/zh/guide/cherry-blossoms-with-kids-japan",
      ko: "https://family-toilet-japan.vercel.app/ko/guide/cherry-blossoms-with-kids-japan",
    },
  },
};

const sections = [
  {
    title: "Timing It Right",
    icon: "🌸",
    items: [
      { name: "The bloom window is short and moves north", desc: "Full bloom typically lasts only about a week, and the flowers are gone within two. Okinawa blooms as early as January, Tokyo and Kyoto usually late March to early April, and Hokkaido not until early-to-mid May. Check the official forecast (kishou-ken or a sakura tracker site) 2-3 weeks out — dates shift by a week or more year to year and are hard to predict far in advance." },
      { name: "Weekday mornings beat weekend afternoons by far", desc: "Famous spots like Ueno Park or Kyoto's Philosopher's Path become extremely packed on weekend afternoons during peak bloom, with shoulder-to-shoulder crowds that make stroller access nearly impossible. A weekday morning visit, ideally before 10am, is dramatically calmer." },
      { name: "Build in a backup week", desc: "Because peak bloom is unpredictable and brief, and often coincides with spring rain or wind that scatters petals fast, avoid planning a trip around a single specific date. If your schedule allows a few days of flexibility, you have a much better chance of catching it." },
    ],
  },
  {
    title: "Stroller-Friendly Hanami Spots",
    icon: "🌷",
    items: [
      { name: "Large parks over narrow riverside paths", desc: "Spots like Tokyo's Yoyogi Park, Ueno Park, and Osaka Castle Park have wide paved paths and open lawns — ideal for spreading a picnic sheet and letting a toddler move around. Narrow, popular riverside paths (like parts of Meguro River) get so crowded during peak bloom that stroller movement is very difficult." },
      { name: "Go early to claim a spot with shade and space", desc: "Hanami culture involves picnicking under the trees for hours. Arrive by mid-morning to find a spot with some open space around it — this matters more with a baby than for adults, since you'll need room for a stroller, diaper changes, and a napping child." },
      { name: "Consider a boat ride instead of walking", desc: "Some famous spots (Chidorigafuchi in Tokyo, parts of Kyoto) offer rowboat rental beneath the blossoms — a nice option that avoids crowded paths entirely and often entertains a toddler more than walking does. Life jackets in child sizes are usually available; check age/weight minimums in advance." },
    ],
  },
  {
    title: "Weather & Comfort",
    icon: "🧥",
    items: [
      { name: "Spring weather swings widely", desc: "Late March to early April temperatures range roughly 8-20°C, with cool mornings and evenings even on warm days. Dress your baby in layers — a light jacket or cardigan that's easy to remove as the day warms up." },
      { name: "Pollen season overlaps with sakura season", desc: "Japan's cedar and cypress pollen season (kafunsho) peaks February through April, overlapping almost exactly with cherry blossom season. If your child has any pollen or seasonal allergy sensitivity, pack antihistamines and consider a light scarf to cover the stroller during especially windy, high-pollen days." },
      { name: "Spring rain can end a bloom early", desc: "A single day of strong rain or wind can strip a tree of blossoms. Keep an eye on the forecast and be ready to move your hanami day earlier if rain is coming — a compact stroller rain cover is worth having regardless." },
    ],
  },
  {
    title: "Finding Toilets",
    icon: "🚽",
    items: [
      { name: "Toilet lines rival the crowds at peak spots", desc: "At famous hanami parks during peak weekend, toilet queues can be 15-20 minutes long. Use the map to find a second option a short walk away — nearby train stations, convenience stores, or department stores are often faster and cleaner." },
      { name: "Temporary event toilets are common but basic", desc: "Popular hanami spots often add portable toilets during peak season, but these rarely have baby-changing tables. Plan diaper changes around a station or shopping facility on your route rather than relying on the park's temporary facilities." },
      { name: "Picnic spots are often far from the nearest toilet", desc: "Once you've claimed a hanami spot under a tree, walking to a toilet and back can take a while if the closest one is at the park entrance. Check the map for a facility close to where you're planning to sit before you unpack your picnic sheet." },
    ],
  },
];

export default function CherryBlossomsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <GuideScrollTracker slug="cherry-blossoms-with-kids-japan" lang="en" />
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Cherry Blossoms (Sakura) with Kids</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Pink petals, picnics, and Japan&apos;s most famous season — a practical guide to enjoying hanami with babies and toddlers.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">🌸</span>
          <p className="text-sm text-sky-800 dark:text-sky-200">
            Cherry blossom season (roughly late March to early April in Tokyo and Kyoto, earlier or later elsewhere) is one of the most beautiful — and most crowded — times to visit Japan. A little planning around timing and crowds makes hanami with a baby much more relaxing.
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

        <GuideAreaLinks slug="cherry-blossoms-with-kids-japan" lang="en" />

        <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Find Toilets Near Hanami Spots</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Check baby-changing toilets near parks and picnic spots in advance on our interactive map.
          </p>
          <Link
            href="/map"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Open Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/guide/autumn-foliage-with-kids-japan" className="text-sky-600 hover:underline">← Autumn Foliage Guide</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/traveling-japan-with-toddler-checklist" className="text-sky-600 hover:underline">Packing Checklist →</Link>
        </div>
      </div>
    </div>
  );
}
