import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Baby Changing Facilities in Osaka — Area by Area Guide 2026 | Family Toilet Japan",
  description: "Find the best baby changing rooms and nursing facilities in Osaka. Namba, Umeda, Tennoji, Osaka Station, and shopping malls — detailed guide for traveling parents.",
  keywords: [
    "baby changing room osaka",
    "osaka nursing room",
    "osaka baby facilities",
    "namba baby changing",
    "umeda baby room",
    "osaka station baby changing",
    "osaka diaper changing",
    "osaka family facilities",
  ],
  alternates: { canonical: "https://family-toilet-japan.vercel.app/guide/best-baby-changing-facilities-osaka" },
};

const sections = [
  {
    title: "Namba / Dotonbori Area",
    icon: "🏯",
    items: [
      { name: "Namba Parks (3F & 5F)", desc: "The best baby room in the Namba area. The 3F baby lounge has 6 changing tables, 4 private nursing booths with curtains, a microwave, and a hot water dispenser. The 5F has a smaller facility near the rooftop garden. Both are clean, spacious, and rarely crowded on weekdays. Elevator access from the Nankai Railway Namba Station concourse. Open until 9pm." },
      { name: "Takashimaya Osaka (Namba)", desc: "The department store attached to Namba Station has an excellent baby room on the 6F — 8 changing tables, private nursing rooms with rocking chairs, a baby weighing scale, and a toddler play corner. One of the best-equipped facilities in all of Osaka. The staff are especially helpful and will heat formula or baby food for you at the information desk." },
      { name: "Namba CITY", desc: "Underground shopping mall connected to Nankai Namba Station. Baby room on the B1F near the south exit — 3 changing tables, nursing chairs, and a small rest area. More compact than Namba Parks but conveniently located if you're transiting through the station. Clean and well-maintained." },
      { name: "Dotonbori Area (Limited)", desc: "Dotonbori itself has very few dedicated baby facilities — the tourist street is mostly small shops and restaurants. Your best bet is to duck into the nearby Shinsaibashi OPA mall (baby room 4F) or walk 5 minutes south to Namba Parks. Don Quijote Dotonbori has accessible toilets but no proper baby changing facility. Plan your Dotonbori visit knowing facilities are a short walk away." },
    ],
  },
  {
    title: "Umeda / Osaka Station Area",
    icon: "🚉",
    items: [
      { name: "LUCUA / LUCUA 1100 (Osaka Station)", desc: "The twin shopping malls inside Osaka Station have baby rooms on multiple floors. LUCUA 1100 (the newer building) has the best facility on the 5F — 6 changing tables, 5 private nursing booths, a microwave, hot water, and a toddler play area with books. Clean, modern, and very well-maintained. Open 10am-9pm. Directly connected to the JR Osaka Station ticket gates via elevator." },
      { name: "Grand Front Osaka", desc: "Connected to the north side of Osaka Station. Baby rooms in both the North Building (4F) and South Building (3F). The South Building facility is newer and larger — 4 changing tables, nursing chairs, and a stroller parking area. The North Building has a dedicated family lounge with a microwave and comfortable seating. Both are well signposted from the main atrium." },
      { name: "HEP FIVE / Hankyu Department Store", desc: "HEP FIVE (with the red Ferris wheel) has a baby room on the 6F — compact but functional with 2 changing tables and a nursing area. The Hankyu Department Store (main building) has a superior facility on the 11F — a full baby lounge with changing tables, nursing rooms, a play area, and a rest zone for parents. Hankyu is connected to the Hankyu Umeda Station by elevator." },
      { name: "Yodobashi Camera Umeda", desc: "The massive electronics store north of Osaka Station has a surprisingly good baby room on the 5F — 4 changing tables, nursing chairs, and a clean quiet space. Useful if you're shopping for electronics or just need a convenient stop near the station. Open 9:30am-10pm — one of the latest-closing baby facilities in the Umeda area." },
    ],
  },
  {
    title: "Tennoji / Abeno Area",
    icon: "🗼",
    items: [
      { name: "Abeno Harukas (Japan's Tallest Building)", desc: "The massive Kintetsu department store inside Harukas has baby rooms on the 5F, 9F, and 12F. The 9F facility is the largest with 6 changing tables, private nursing rooms, a microwave, and a baby food preparation area. The observation deck (Harukas 300) on the 60F has a compact baby room too — change your baby while looking at all of Osaka from 300 meters up." },
      { name: "Tennoji MIO", desc: "Shopping mall attached to JR Tennoji Station. Baby room on the 6F — 4 changing tables, nursing booths, and a small play area. Convenient if you're transiting through Tennoji (hub for JR, subway, and Kintetsu lines). The facility is quieter than the Harukas baby rooms and rarely has a queue." },
      { name: "Tennoji Zoo Area", desc: "Tennoji Zoo itself has a baby room near the main entrance — 2 changing tables and a nursing area. The adjacent Tennoji Park (Tenshiba) has public toilets with accessible facilities. For a better experience, use the Abeno Harukas baby room before or after your zoo visit — it's a 5-minute walk from the zoo entrance." },
      { name: "Q's Mall (Abeno)", desc: "Large shopping mall south of Tennoji Station. Baby room on the 3F with 4 changing tables, nursing chairs, a microwave, and hot water. Also has a children's play area on the same floor — useful for letting toddlers burn energy between sightseeing stops. Open 10am-9pm." },
    ],
  },
  {
    title: "Other Key Locations",
    icon: "📍",
    items: [
      { name: "Osaka Castle Area", desc: "Osaka Castle Park is large and the castle itself has limited baby facilities. The JO-TERRACE commercial complex at the park entrance has accessible toilets with changing tables. Inside the castle tower, there is a small changing facility on the 1F but no nursing room. For a proper baby room, the nearest option is the OBP (Osaka Business Park) Twin21 building, a 10-minute walk east of the castle." },
      { name: "Kansai Airport (KIX)", desc: "Excellent baby facilities throughout the airport. Terminal 1 has baby rooms in both the domestic and international areas — 6 changing tables, private nursing rooms, a microwave, hot water, stroller rental, and even a small crib for napping. Terminal 2 (Peach Aviation) has a smaller but clean baby room on the 2F. Buy Japanese diapers and baby supplies at the terminal drug stores before leaving the airport." },
      { name: "Universal Studios Japan (USJ)", desc: "Baby rooms near the entrance (Family Services) and in the Wonderland area. Both have changing tables, nursing rooms, microwave, and hot water for formula. Stroller rental is available (¥1,300/day). The Wonderland zone is specifically designed for families with toddlers. Baby food is allowed into the park — bring your own as options inside are limited for babies." },
      { name: "Expo City (Suita)", desc: "The large entertainment complex north of Osaka (home of NIFREL aquarium and the Tower of the Sun). Baby room in the LaLaport shopping mall — 6 changing tables, nursing rooms, and a play area. NIFREL itself has a baby room on the 1F. The complex is very family-oriented and stroller-accessible throughout. About 30 minutes from Umeda on the Osaka Monorail." },
    ],
  },
];

export default function OsakaBabyChangingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">Best Baby Changing Facilities in Osaka</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">
          Area-by-area guide to the best baby rooms, nursing facilities, and changing tables across Osaka.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-sky-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">🍼</span>
          <p className="text-sm text-sky-800">
            <strong>Osaka is one of the best cities in Japan for baby facilities.</strong> Every major department store and shopping mall has a dedicated baby room (赤ちゃん休憩室) with changing tables, private nursing booths, and often a microwave for heating formula. This guide maps out the best ones by area so you always know where the nearest clean facility is.
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
          <h2 className="font-bold text-gray-800 mb-3">Find All Toilets in Osaka</h2>
          <p className="text-sm text-gray-600 mb-4">
            Browse all family-friendly toilets in Osaka with real-time filters for changing tables and wheelchair access.
          </p>
          <Link
            href="/osaka"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            📍 Osaka Toilet Map
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/guide/best-baby-changing-facilities-tokyo" className="text-sky-600 hover:underline">← Tokyo Baby Changing Guide</Link>
          <span className="text-gray-300">·</span>
          <Link href="/guide/osaka-family-travel-tips" className="text-sky-600 hover:underline">Osaka Family Travel Tips →</Link>
        </div>
      </div>
    </div>
  );
}
