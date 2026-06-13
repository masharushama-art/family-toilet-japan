import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Japan Travel with Baby & Toddler — Complete Family Guide | Family Toilet Japan",
  description: "Essential tips for traveling in Japan with a baby or toddler — diaper changing rooms, stroller access, baby-friendly facilities, and family restroom locations.",
  keywords: [
    "japan travel with baby",
    "traveling japan with toddler",
    "baby changing room japan",
    "family travel japan tips",
    "japan stroller friendly",
    "diaper change japan",
    "family friendly japan",
  ],
};

export default function JapanTravelWithBaby() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-sky-200 text-sm hover:text-white">← Family Toilet Japan</Link>
          <h1 className="text-2xl font-bold mt-3 mb-2">Japan Travel with Baby & Toddler</h1>
          <p className="text-sky-100 text-sm">Everything families need to know for a smooth trip</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-10">

        <section>
          <p className="text-gray-700 leading-relaxed">
            Japan is one of the most family-friendly travel destinations in the world.
            Clean public facilities, helpful locals, and excellent infrastructure make traveling with
            babies and toddlers surprisingly smooth — if you know where to look.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">🍼 Finding Baby Changing Rooms</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>Japan has one of the highest densities of baby changing facilities in Asia. Here&apos;s where to find them:</p>
            <div className="space-y-2">
              {[
                { place: "Department stores (デパート)", detail: "Best facilities — family rooms with changing tables, baby seats, nursing rooms, and children&apos;s toilets. Usually on B1 or upper floors." },
                { place: "Train stations", detail: "Major stations (Shinjuku, Shibuya, Osaka, Kyoto) have multi-purpose restrooms with changing tables. Look for the 🍼 or 多目的 sign." },
                { place: "Shopping malls", detail: "Almost always have dedicated family restrooms with excellent facilities." },
                { place: "Convenience stores", detail: "Smaller stores may not have changing tables, but larger format stores often do." },
                { place: "Parks and tourist sites", detail: "Major attractions like Tokyo Disneyland, Universal Studios Japan, and national parks have family restrooms." },
              ].map(({ place, detail }) => (
                <div key={place} className="border-l-4 border-sky-300 pl-4 py-1">
                  <p className="font-semibold text-gray-800">{place}</p>
                  <p dangerouslySetInnerHTML={{ __html: detail }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">🛒 What to Pack</h2>
          <div className="grid grid-cols-1 gap-2">
            {[
              { item: "Diapers & wipes", note: "Available everywhere in Japan (Merries, Pampers). Prices are similar to home." },
              { item: "Portable changing mat", note: "Some smaller facilities may not have a dedicated table." },
              { item: "Small pack of tissues", note: "Older public toilets may not provide toilet paper." },
              { item: "Hand sanitizer", note: "Most restrooms have soap but sanitizer is handy." },
              { item: "Stroller rain cover", note: "Japan weather can be unpredictable, especially in spring/fall." },
              { item: "Baby carrier", note: "Essential for narrow shopping streets, crowded trains, and steps." },
            ].map(({ item, note }) => (
              <div key={item} className="flex gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-green-500 font-bold shrink-0">✓</span>
                <div className="text-sm">
                  <span className="font-medium text-gray-800">{item}</span>
                  <span className="text-gray-500"> — {note}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">🚃 Getting Around with a Stroller</h2>
          <div className="space-y-2 text-sm text-gray-700">
            {[
              "Most major train stations have elevators — look for the ♿ or EV signs on station maps.",
              "Folding your stroller on crowded trains is expected — practice folding quickly.",
              "IC cards (Suica, ICOCA) make fare gates much easier with a stroller.",
              "Taxis in Japan have large trunks and are very clean — a good option when tired.",
              "Many tourist attractions offer stroller rentals at the entrance.",
            ].map((tip, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-sky-500 shrink-0">•</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">🍜 Eating with Kids</h2>
          <div className="space-y-2 text-sm text-gray-700">
            {[
              "Family restaurants (ファミレス) like Saizeriya, Gusto, and Denny's Japan are great for kids — high chairs, kids menus, and long hours.",
              "Conveyor belt sushi (回転寿司) is a huge hit with children.",
              "Ramen shops often have counter seating — request a table (テーブル席) for strollers.",
              "7-Eleven and convenience stores sell baby food, onigiri, and soft snacks perfect for toddlers.",
            ].map((tip, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-sky-500 shrink-0">•</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 rounded-2xl p-6 text-center">
          <p className="font-medium text-gray-800 mb-1">Find changing tables & family toilets near you</p>
          <p className="text-sm text-gray-500 mb-4">6,000+ locations across Tokyo, Osaka & Kyoto</p>
          <Link href="/map" className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3 rounded-full">
            📍 Open Map
          </Link>
          <div className="mt-4 flex justify-center gap-4 text-sm">
            <Link href="/tokyo/changing-table" className="text-sky-600 hover:underline">Tokyo changing tables</Link>
            <Link href="/osaka/changing-table" className="text-sky-600 hover:underline">Osaka changing tables</Link>
          </div>
        </section>

      </div>
    </div>
  );
}
