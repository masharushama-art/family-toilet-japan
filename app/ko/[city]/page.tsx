import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CITIES, getCityStats, type CitySlug } from "../../lib/toilet-data";

const KO_NAMES: Partial<Record<CitySlug, string>> = {
  tokyo: "도쿄", osaka: "오사카", kyoto: "교토", nagoya: "나고야",
  yokohama: "요코하마", fukuoka: "후쿠오카", sapporo: "삿포로", nara: "나라",
  kobe: "고베", hiroshima: "히로시마", sendai: "센다이", kanazawa: "가나자와",
  okinawa: "나하", chiba: "지바", saitama: "사이타마",
};

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return Object.keys(KO_NAMES).map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  if (!(city in CITIES) || !(city in KO_NAMES)) return {};
  const c = CITIES[city as CitySlug];
  const koName = KO_NAMES[city as CitySlug]!;
  const stats = getCityStats(city as CitySlug);
  const BASE = "https://family-toilet-japan.vercel.app";
  return {
    title: `${koName} 기저귀 교환대・가족 화장실 ${stats.withChangingTable}곳 | Family Toilet Japan`,
    description: `${koName}에서 기저귀 교환대가 있는 화장실을 지도로 검색. ${stats.total}곳 이상 수록, 무료・회원가입 불필요. 아기와 함께하는 일본 여행 필수 앱.`,
    keywords: [
      `${koName} 기저귀 교환대`,
      `${koName} 가족 화장실`,
      `아기와 ${koName}`,
      `${koName} 수유실`,
      `일본 ${koName} 화장실`,
    ],
    alternates: {
      canonical: `${BASE}/ko/${city}`,
      languages: { "en": `${BASE}/${city}`, "ko": `${BASE}/ko/${city}`, "ja": `${BASE}/ja/${city}` },
    },
    openGraph: {
      title: `${koName} 기저귀 교환대・가족 화장실`,
      description: `${koName}에서 기저귀 교환대가 있는 화장실 ${stats.withChangingTable}곳을 지도로 검색.`,
      url: `${BASE}/ko/${city}`,
    },
  };
}

export default async function KoCityPage({ params }: Props) {
  const { city } = await params;
  if (!(city in CITIES) || !(city in KO_NAMES)) notFound();

  const c = CITIES[city as CitySlug];
  const koName = KO_NAMES[city as CitySlug]!;
  const stats = getCityStats(city as CitySlug);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/ko" className="text-sky-200 text-sm mb-4 block hover:text-white">← 패밀리 토일렛 재팬</Link>
        <h1 className="text-3xl font-bold mb-2">{koName} 기저귀 교환대・가족 화장실</h1>
        <p className="text-sky-100 text-sm max-w-md mx-auto mb-6">
          {koName}에서 기저귀 교환대가 있는 화장실을 검색하세요. 무료・회원가입 불필요・오프라인 지원.
        </p>
        <Link
          href={`/map?city=${city}`}
          className="inline-block bg-white text-sky-600 font-bold px-7 py-3.5 rounded-full text-base hover:bg-sky-50 transition-colors"
        >
          📍 지도 열기
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-10">
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { label: "기저귀 교환대", value: stats.withChangingTable, icon: "🍼" },
            { label: "휠체어 접근 가능", value: stats.wheelchair, icon: "♿" },
            { label: "무료 화장실", value: stats.free, icon: "💚" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-sky-50 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-1">{icon}</div>
              <div className="text-xl font-bold text-sky-700">{value.toLocaleString()}</div>
              <div className="text-xs text-gray-600 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">자주 묻는 질문</h2>
        <div className="space-y-3 mb-10">
          {[
            { q: `${koName}에서 기저귀 교환대는 어디에 있나요?`, a: `지도를 열고 위치 버튼을 누르면 ${koName} 근처의 기저귀 교환대가 있는 화장실이 파란색 핀으로 표시됩니다. 현재 ${stats.withChangingTable}곳이 등록되어 있습니다.` },
            { q: "오프라인에서 사용할 수 있나요?", a: "PWA로 설치하면 한 번 열었던 지역은 오프라인에서도 지도를 볼 수 있습니다. 일본 현지 SIM 사용 시에도 안심." },
            { q: "유료인가요?", a: "완전 무료이며 회원가입이 필요 없습니다." },
          ].map(({ q, a }) => (
            <div key={q} className="border border-gray-100 rounded-xl p-4">
              <p className="font-semibold text-gray-800 text-sm mb-1">Q. {q}</p>
              <p className="text-gray-600 text-sm leading-relaxed">A. {a}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 text-center text-sm text-gray-500">
          <p className="mb-2">English version</p>
          <Link href={`/${city}`} className="text-sky-600 hover:underline font-medium">
            Family-friendly toilets in {c.name} (English) →
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "패밀리 토일렛 재팬", item: "https://family-toilet-japan.vercel.app/ko" },
              { "@type": "ListItem", position: 2, name: `${koName} 가족 화장실`, item: `https://family-toilet-japan.vercel.app/ko/${city}` },
            ],
          }),
        }}
      />
    </div>
  );
}
