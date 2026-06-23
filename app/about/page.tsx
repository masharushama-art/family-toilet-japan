import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Family Toilet Japan — Our Mission & Data Sources",
  description: "Learn about Family Toilet Japan — why we built it, how our data works, and our mission to help families traveling Japan find clean, safe toilets with baby changing facilities.",
  alternates: { canonical: "https://family-toilet-japan.vercel.app/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">About Family Toilet Japan</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Helping families find safe, clean toilets with baby changing facilities across Japan.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Why We Built This</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Traveling in Japan with a baby is an incredible experience — the country is safe, clean, and welcoming to families. But one challenge kept coming up: finding toilets with baby changing tables, especially outside major tourist areas.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Department stores and train stations often have excellent baby rooms, but knowing which ones and where they are requires local knowledge that most visitors don&apos;t have. Google Maps shows toilet locations but doesn&apos;t tell you whether they have changing tables or wheelchair access.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Family Toilet Japan was built to solve this problem. We combined data from OpenStreetMap and municipal open data sources to create a comprehensive, free, and offline-capable map of family-friendly toilets across all 47 prefectures.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">How Our Data Works</h2>
          <div className="space-y-3">
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="font-semibold text-gray-800 text-sm mb-1">OpenStreetMap (OSM)</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                The majority of our toilet data comes from OpenStreetMap, the world&apos;s largest open mapping project. OSM contributors across Japan have mapped thousands of public toilets with detailed attributes including baby changing tables, wheelchair access, opening hours, and fees. This data is licensed under ODbL.
              </p>
            </div>
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="font-semibold text-gray-800 text-sm mb-1">Municipal Open Data</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                We supplement OSM data with official open data published by Japanese municipalities. Cities like Tokyo, Osaka, and Yokohama publish datasets of public toilet facilities under Creative Commons (CC BY) licenses. This data often includes details not available in OSM, such as operator names and facility-specific notes.
              </p>
            </div>
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="font-semibold text-gray-800 text-sm mb-1">Data Quality & Updates</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our database is updated regularly to reflect changes in OSM and municipal datasets. Currently we cover 16,000+ locations across Japan. Some locations are approximate (geocoded from addresses rather than GPS coordinates) — these are marked with a note in the detail view. If you find incorrect data, you can report it directly to OpenStreetMap through the link on each toilet&apos;s detail page.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Features</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "🍼", title: "Baby Changing Filter", desc: "Find toilets with diaper changing tables" },
              { icon: "♿", title: "Wheelchair Access", desc: "Filter for accessible facilities" },
              { icon: "📴", title: "Works Offline", desc: "PWA — use without internet after first load" },
              { icon: "🌍", title: "4 Languages", desc: "English, Japanese, Chinese, Korean" },
              { icon: "📍", title: "GPS Location", desc: "Find the nearest toilet to your current position" },
              { icon: "🔗", title: "Share Links", desc: "Send a direct link to any specific toilet" },
              { icon: "🔔", title: "Proximity Alerts", desc: "Get notified when near a family-friendly toilet" },
              { icon: "🌙", title: "Dark Mode", desc: "Automatic dark mode for nighttime use" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="border border-gray-100 rounded-xl p-4">
                <div className="text-2xl mb-1">{icon}</div>
                <p className="font-semibold text-gray-800 text-sm">{title}</p>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "Is Family Toilet Japan free?", a: "Yes, completely free. No registration, no account needed. The app works in your browser and can be installed as a PWA on your phone's home screen." },
              { q: "Does it work without internet?", a: "Yes. After visiting the map once for a city, the data is cached and available offline. This is especially useful in subway stations and rural areas with poor signal." },
              { q: "How accurate is the data?", a: "Most locations are mapped with GPS-level accuracy from OpenStreetMap. Some locations derived from municipal address data are approximate — these are clearly marked. We recommend verifying with the map before visiting." },
              { q: "Can I contribute or fix data?", a: "Yes! Each toilet's detail page has a link to edit the corresponding OpenStreetMap entry. OSM is a community project and corrections from local users make the data better for everyone." },
              { q: "Does it cover rural areas?", a: "We cover all 47 prefectures, but rural areas naturally have fewer data points than cities. OpenStreetMap coverage continues to grow as more contributors map their local areas." },
            ].map(({ q, a }) => (
              <div key={q} className="border border-gray-100 rounded-xl p-4">
                <p className="font-semibold text-gray-800 text-sm mb-1">{q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Contact</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Have a question, suggestion, or found a bug? We&apos;d love to hear from you.
          </p>
          <div className="border border-gray-100 rounded-xl p-4">
            <p className="text-gray-600 text-sm">
              Email: <a href="mailto:masharu.shama@gmail.com" className="text-sky-600 hover:underline">masharu.shama@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-gray-800 mb-3">Start Finding Toilets</h2>
          <p className="text-sm text-gray-600 mb-4">
            Browse 16,000+ family-friendly toilets across Japan — free, offline-capable, no sign-up.
          </p>
          <Link
            href="/map"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Find Toilets Near Me
          </Link>
        </div>

        <div className="text-center text-xs text-gray-400 space-x-3">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/faq" className="hover:underline">FAQ</Link>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/attribution" className="hover:underline">Data Sources</Link>
        </div>
      </div>
    </div>
  );
}
