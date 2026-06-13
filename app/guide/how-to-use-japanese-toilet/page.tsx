import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Use a Japanese Toilet — Complete Guide for Tourists | Family Toilet Japan",
  description: "Step-by-step guide to using Japanese toilets, including washlets, bidet buttons, and squat toilets. Perfect for first-time visitors to Japan with kids.",
  keywords: [
    "how to use japanese toilet",
    "japanese toilet guide",
    "washlet how to use",
    "japan toilet buttons",
    "japanese bidet tourist guide",
    "squat toilet japan",
  ],
  openGraph: {
    title: "How to Use a Japanese Toilet — Complete Guide",
    description: "Everything you need to know about Japanese toilets — washlets, buttons, and tips for families.",
  },
};

const buttons = [
  { symbol: "おしり / 後", label: "Rear wash (bidet)", desc: "Washes the rear. Most commonly used button.", safe: true },
  { symbol: "ビデ", label: "Front wash (bidet)", desc: "For female hygiene use.", safe: true },
  { symbol: "流す / 大 / 小", label: "Flush (large / small)", desc: "Large flush for solids, small for liquids. Saves water.", safe: true },
  { symbol: "止", label: "Stop", desc: "Stops the water spray immediately.", safe: true },
  { symbol: "音楽 / 音消し", label: "Sound masking", desc: "Plays music or water sounds for privacy.", safe: true },
  { symbol: "乾燥", label: "Warm air dry", desc: "Dries with warm air after washing.", safe: true },
  { symbol: "便座", label: "Seat temperature", desc: "Adjusts heated seat temperature.", safe: true },
];

export default function HowToUseJapaneseToilet() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-sky-600 text-white px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-sky-200 text-sm hover:text-white">← Family Toilet Japan</Link>
          <h1 className="text-2xl font-bold mt-3 mb-2">
            How to Use a Japanese Toilet
          </h1>
          <p className="text-sky-100 text-sm">
            Complete guide for tourists — washlets, buttons, and family tips
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-10">

        {/* Intro */}
        <section>
          <p className="text-gray-700 leading-relaxed">
            Japanese toilets are famous worldwide for their advanced features. If you&apos;re visiting Japan with your family,
            don&apos;t be intimidated by the control panel — this guide explains everything you need to know.
          </p>
        </section>

        {/* Types */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Types of Toilets in Japan</h2>
          <div className="space-y-4">
            {[
              {
                icon: "🚽",
                title: "Western-style toilet with washlet",
                desc: "The most common type in hotels, shopping malls, train stations, and convenience stores. Has a heated seat and built-in bidet. Perfect for families.",
                freq: "~80% of public toilets",
              },
              {
                icon: "🪑",
                title: "Basic western toilet",
                desc: "Standard western toilet without extra features. Found in older buildings and some budget accommodations.",
                freq: "~15% of public toilets",
              },
              {
                icon: "⬛",
                title: "Squat toilet (和式 / washiki)",
                desc: "Traditional Japanese toilet. Face toward the hood, squat over it. Rarely found in new facilities but may appear in older parks or rural areas.",
                freq: "~5% — becoming rare",
              },
            ].map((t) => (
              <div key={t.title} className="border border-gray-100 rounded-xl p-4 flex gap-4">
                <span className="text-3xl">{t.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{t.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t.desc}</p>
                  <span className="text-xs text-sky-600 font-medium mt-1 block">{t.freq}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step by step */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Step-by-Step: Using a Washlet</h2>
          <ol className="space-y-3">
            {[
              "Sit down on the seat — it will likely be warm (heated seat is standard).",
              "Do your business as normal.",
              "Press おしり (rear wash) or ビデ (front wash) on the side panel or remote control.",
              "Adjust water pressure with + / − buttons if desired.",
              "Press 止 (stop) to stop the spray.",
              "Optionally press 乾燥 (dry) for warm air drying.",
              "Press 流す or the flush button/lever to flush.",
              "Wash hands — sinks are always nearby.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="bg-sky-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-700 text-sm">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Button guide */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Common Button Guide</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sky-50">
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Japanese</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700">Meaning</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-700 hidden sm:table-cell">Description</th>
                </tr>
              </thead>
              <tbody>
                {buttons.map((b) => (
                  <tr key={b.symbol} className="border-b border-gray-100">
                    <td className="px-3 py-2 font-medium text-sky-700 whitespace-nowrap">{b.symbol}</td>
                    <td className="px-3 py-2 text-gray-800">{b.label}</td>
                    <td className="px-3 py-2 text-gray-500 hidden sm:table-cell">{b.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Family tips */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">🍼 Tips for Families with Young Children</h2>
          <div className="bg-sky-50 rounded-2xl p-5 space-y-3">
            {[
              "Look for the 🍼 baby changing table symbol — most train stations, department stores, and shopping malls have dedicated family restrooms (多目的トイレ / ファミリートイレ).",
              "Family restrooms (ファミリートイレ) are large, private rooms with changing tables, a baby seat on the wall, and sometimes a children's toilet.",
              "Children may be startled by the automatic flushing — tell them in advance and hold their hand.",
              "Carry a small pack of tissues — some older public toilets don't provide toilet paper.",
              "Convenience stores (7-Eleven, Lawson, FamilyMart) always have clean, free toilets open 24/7.",
              "Department store (デパート) restrooms are usually the cleanest and best-equipped for families.",
            ].map((tip, i) => (
              <div key={i} className="flex gap-2 items-start text-sm text-gray-700">
                <span className="text-sky-500 font-bold shrink-0">•</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-50 rounded-2xl p-6 text-center">
          <p className="text-gray-700 font-medium mb-3">Find family-friendly toilets near you in Japan</p>
          <Link
            href="/map"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3 rounded-full transition-colors"
          >
            📍 Open Map
          </Link>
          <div className="mt-4 flex justify-center gap-4 text-sm text-gray-500">
            <Link href="/tokyo" className="hover:text-sky-600">Tokyo</Link>
            <Link href="/osaka" className="hover:text-sky-600">Osaka</Link>
            <Link href="/kyoto" className="hover:text-sky-600">Kyoto</Link>
          </div>
        </section>

      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Use a Japanese Toilet",
            description: "Step-by-step guide to using Japanese washlet toilets for tourists",
            step: [
              { "@type": "HowToStep", text: "Sit on the heated seat." },
              { "@type": "HowToStep", text: "Press おしり for rear wash or ビデ for front wash." },
              { "@type": "HowToStep", text: "Press 止 to stop the spray." },
              { "@type": "HowToStep", text: "Press 流す to flush." },
            ],
          }),
        }}
      />
    </div>
  );
}
