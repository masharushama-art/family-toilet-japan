import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Japan Toilet Etiquette Guide for Tourists 2026 | Family Toilet Japan",
  description: "Everything you need to know about toilet etiquette in Japan — slippers, flushing sounds, squat toilets, and washlet buttons explained. Perfect for first-time visitors.",
  keywords: [
    "japan toilet etiquette",
    "japanese toilet manners",
    "toilet slippers japan",
    "squat toilet japan",
    "japan public toilet rules",
    "japanese bathroom etiquette",
    "toilet sound machine japan",
    "otohime japan",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/japan-toilet-etiquette" },
};

const rules = [
  {
    icon: "🥿",
    title: "Toilet Slippers",
    content: "In many traditional ryokan (inns) and some homes, you will find a separate pair of slippers outside the bathroom door. Always change into these before entering, and remember to change back when you leave. Forgetting is a common tourist mistake!",
  },
  {
    icon: "🔊",
    title: "The Sound Princess (音姫 Otohime)",
    content: "Many Japanese toilets have a button or sensor that plays a flushing sound to mask embarrassing noises. Look for the 音姫 button or wave your hand near the sensor. This saves water compared to flushing repeatedly, and is completely normal to use.",
  },
  {
    icon: "🚿",
    title: "Washlet (Bidet) Buttons",
    content: "Japanese washlets have bidet and warm water spray functions. The 小 (small) button is for a gentle wash, 大 (large) for a stronger spray, and おしり (oshiri) means bottom wash. Start with the lowest pressure and adjust. The ノズル (nozzle) button cleans the nozzle itself.",
  },
  {
    icon: "🧻",
    title: "Toilet Paper — Always Flush It",
    content: "Unlike many countries in Asia, Japan's sewage system is designed for toilet paper. Always flush it — never put it in the bin. The only exception is tissue paper (ティッシュ), which is NOT flushable and should go in the trash.",
  },
  {
    icon: "🚽",
    title: "Squat Toilets (和式 Washiki)",
    content: "Western-style toilets are now standard in most modern buildings, but older train stations and temples may still have squat toilets. Face the hood (the raised end) and squat down. Keep your feet on the raised platforms on either side. Most locations with squat toilets also have at least one Western-style stall.",
  },
  {
    icon: "🧼",
    title: "Handwashing",
    content: "Many Japanese toilets have a small sink built into the top of the tank — water used to fill the tank first flows through this sink for handwashing. It is perfectly hygienic. Soap dispensers are always provided in public restrooms.",
  },
  {
    icon: "🚪",
    title: "Locking the Door",
    content: "Public restroom stalls typically show 空 (aki = vacant, usually in green) and 使用中 (shiyou-chuu = occupied, usually in red) indicators above or on the door. Make sure the indicator shows red/occupied when you are inside.",
  },
  {
    icon: "👶",
    title: "Baby Changing Tables",
    content: "Look for the 🍼 icon or ベビーチェア/おむつ替え台 signs. Changing tables are often located in accessible (多目的) restrooms or dedicated baby rooms (ベビールーム). Use our map to find nearby toilets with changing facilities.",
  },
];

export default function ToiletEtiquettePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Japan Toilet Etiquette Guide</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Everything tourists need to know about using toilets in Japan — from washlets to squat toilets, slippers to sound machines.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <p className="text-amber-800 text-sm">
            <strong>Good news:</strong> Japan has some of the cleanest and most well-maintained public toilets in the world. Most are free, stocked with toilet paper, and feature high-tech amenities you won&apos;t find elsewhere.
          </p>
        </div>

        <div className="space-y-5 mb-10">
          {rules.map(({ icon, title, content }) => (
            <div key={title} className="border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{icon}</span>
                <h2 className="font-bold text-gray-800">{title}</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-gray-800 mb-3">Find Clean Toilets Near You</h2>
          <p className="text-sm text-gray-600 mb-4">
            Use our map to find family-friendly public toilets across all 47 prefectures of Japan — with baby changing tables, wheelchair access, and 24-hour availability.
          </p>
          <Link
            href="/map"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Find Toilets Near Me
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/how-to-use-japanese-toilet" className="text-sky-600 hover:underline">← How to Use a Japanese Toilet</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/japan-travel-with-baby" className="text-sky-600 hover:underline">Japan Travel with Baby →</Link>
        </div>
      </div>
    </div>
  );
}
