import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Family Toilet Japan | Find Baby Changing Tables in Japan",
  description: "Frequently asked questions about finding family-friendly toilets and baby changing tables in Japan. How to use the map, what data we have, and tips for traveling with babies.",
  alternates: { canonical: "https://family-toilet-japan.vercel.app/faq" },
};

const faqs = [
  {
    q: "How do I find a toilet with a baby changing table near me?",
    a: "Open the map and tap the 📍 location button. The map will center on your current position and show nearby toilets. Blue dots indicate toilets with baby changing tables — tap any dot to see details.",
  },
  {
    q: "Are all 47 prefectures in Japan covered?",
    a: "Yes. Family Toilet Japan covers all 47 prefectures with over 16,000 locations including Tokyo, Osaka, Kyoto, Nagoya, Yokohama, Sapporo, Fukuoka, and more.",
  },
  {
    q: "Is this app free to use?",
    a: "Completely free. No registration, no login, no subscription. Just open the site and start searching.",
  },
  {
    q: "Can I use it offline?",
    a: 'Yes. Install Family Toilet Japan as a PWA (tap "Add to Home Screen" on your phone). Once installed, areas you\'ve previously viewed are cached and work without internet.',
  },
  {
    q: "What does the blue dot vs grey dot mean on the map?",
    a: "Blue dots (🔵) indicate toilets confirmed to have a baby changing table. Grey dots are regular public toilets without confirmed changing facilities. Amber dashed circles indicate approximate locations.",
  },
  {
    q: "Where does the data come from?",
    a: "Our data comes from OpenStreetMap (ODbL license) and municipal open data published by local governments across Japan. We update the dataset regularly.",
  },
  {
    q: "How accurate are the toilet locations?",
    a: "Most locations are precise GPS coordinates contributed by OpenStreetMap volunteers. A small number (shown with amber dashed markers) are geocoded to district-level and may not be exact — always verify on arrival.",
  },
  {
    q: "What is a 'family toilet' in Japan?",
    a: "A family toilet (多目的トイレ or ファミリートイレ) in Japan is a larger, private stall designed for families with young children. They typically include a baby changing table, extra space for a stroller, and sometimes a baby seat for when you need both hands free.",
  },
  {
    q: "Do Japanese public toilets cost money?",
    a: "Most public toilets in Japan are completely free, including those in train stations, parks, and government buildings. Some toilets in tourist areas or private facilities may charge a small fee (¥100–¥200).",
  },
  {
    q: "Can I save my favorite toilets?",
    a: "Yes. Tap the ♡ heart icon on any toilet detail to save it as a favorite. Favorites are stored on your device and accessible via the ♥ button on the map.",
  },
  {
    q: "The toilet information seems wrong — how can I fix it?",
    a: "Our data comes from OpenStreetMap. If you find an error, you can edit it directly on OpenStreetMap.org — your fix will be reflected in our next update. We also have a link to the OSM page in each toilet's detail view.",
  },
  {
    q: "Does it work in rural Japan, not just cities?",
    a: "Yes, though coverage varies. Major cities have dense data. Rural areas and smaller towns have fewer entries but are still included where OpenStreetMap contributors have mapped them.",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-sky-100 text-sm max-w-md mx-auto">
          Everything you need to know about finding family-friendly toilets in Japan.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-10">
        <div className="space-y-4 mb-12">
          {faqs.map(({ q, a }) => (
            <div key={q} className="border border-gray-100 rounded-2xl p-5">
              <p className="font-semibold text-gray-900 text-sm mb-2">Q. {q}</p>
              <p className="text-gray-600 text-sm leading-relaxed">A. {a}</p>
            </div>
          ))}
        </div>

        <div className="bg-sky-50 rounded-2xl p-6 text-center mb-8">
          <p className="text-sky-800 font-semibold mb-1">Still have a question?</p>
          <p className="text-sky-700 text-sm mb-4">Check our travel guides for more detailed information.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/guide/japan-travel-with-baby" className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
              👶 Japan with Baby
            </Link>
            <Link href="/guide/how-to-use-japanese-toilet" className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
              🚽 Using Japanese Toilets
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link href="/map" className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-4 rounded-full transition-colors">
            📍 Open the Map
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }}
      />
    </div>
  );
}
