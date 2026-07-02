import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "일본 가족 화장실・기저귀 교환대 지도 | Family Toilet Japan",
  description: "아기와 함께하는 일본 여행 필수 앱! 일본 전국 47개 도도부현, 16,000곳 이상의 기저귀 교환대 위치를 무료로 검색. 도쿄, 오사카, 교토, 나고야 등 주요 도시 수록. 회원가입 불필요.",
  keywords: [
    "일본 기저귀 교환대",
    "일본 가족 화장실",
    "아기와 일본 여행",
    "도쿄 기저귀",
    "오사카 가족 화장실",
    "일본 육아 시설",
    "일본 공중화장실 지도",
    "아이와 일본 관광",
  ],
  alternates: {
    canonical: "https://family-toilet-japan.vercel.app/ko",
    languages: {
      "en":        "https://family-toilet-japan.vercel.app",
      "ja":        "https://family-toilet-japan.vercel.app/ja",
      "zh-TW":     "https://family-toilet-japan.vercel.app/zh",
      "ko":        "https://family-toilet-japan.vercel.app/ko",
      "x-default": "https://family-toilet-japan.vercel.app",
    },
  },
};

const cities = [
  { slug: "tokyo",    name: "도쿄",   icon: "🗼" },
  { slug: "osaka",    name: "오사카", icon: "🏯" },
  { slug: "kyoto",    name: "교토",   icon: "⛩️" },
  { slug: "nagoya",   name: "나고야", icon: "🏰" },
  { slug: "yokohama", name: "요코하마", icon: "🌉" },
  { slug: "fukuoka",  name: "후쿠오카", icon: "🌸" },
  { slug: "sapporo",  name: "삿포로", icon: "❄️" },
  { slug: "nara",     name: "나라",   icon: "🦌" },
];

export default function KoPage() {
  return (
    <>
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="bg-sky-600 text-white px-6 py-14 text-center">
        <div className="text-5xl mb-3">🚽</div>
        <h1 className="text-3xl font-bold mb-3">일본 가족 화장실 지도</h1>
        <p className="text-sky-100 max-w-md mx-auto mb-6">
          아기와 함께하는 일본 여행이 더 편해집니다.<br />
          전국 <strong>16,000곳 이상</strong>의 기저귀 교환대 위치를
          무료로 검색하세요.
        </p>
        <Link
          href="/map"
          className="inline-block bg-white text-sky-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors"
        >
          📍 근처 화장실 찾기
        </Link>
        <p className="text-sky-200 text-xs mt-3">무료 · 회원가입 불필요 · 오프라인 지원</p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="grid grid-cols-3 gap-4 mb-10 text-center">
          {[
            { icon: "🍼", label: "기저귀 교환대" },
            { icon: "♿", label: "휠체어 접근" },
            { icon: "🕐", label: "24시간 화장실" },
          ].map(({ icon, label }) => (
            <div key={label} className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl py-4 px-2">
              <div className="text-3xl mb-1">{icon}</div>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">{label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">도시별 검색</h2>
        <div className="grid grid-cols-4 gap-2 mb-10">
          {cities.map(({ slug, name, icon }) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="border border-gray-100 dark:border-gray-800 hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-gray-800 rounded-xl py-3 text-center transition-colors"
            >
              <div className="text-2xl mb-0.5">{icon}</div>
              <p className="font-medium text-gray-800 dark:text-gray-100 text-xs">{name}</p>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">유용한 가이드</h2>
        <div className="space-y-3 mb-10">
          {[
            { slug: "best-baby-changing-facilities-tokyo", icon: "🗼", title: "도쿄 기저귀 교환대・수유실 가이드", desc: "신주쿠, 시부야, 우에노, 긴자, 도쿄역 추천 육아실" },
            { slug: "best-baby-changing-facilities-osaka", icon: "🏯", title: "오사카 기저귀 교환대・수유실 가이드", desc: "난바, 우메다, 텐노지, USJ 주변 육아 시설 총정리" },
            { slug: "kyoto-with-baby", icon: "⛩️", title: "아기와 함께하는 교토 여행 가이드", desc: "유모차 친화 명소・이동 방법・아이와 외식" },
            { slug: "japan-travel-with-baby", icon: "👶", title: "아기와 함께하는 일본 여행 가이드", desc: "기저귀 교환 시설 찾는 법・준비물・이동 팁" },
            { slug: "japan-train-travel-with-stroller", icon: "🚅", title: "유모차로 전철・신칸센 타는 팁", desc: "신칸센 좌석 선택・다목적실・택배 활용법" },
            { slug: "japan-family-restaurants-guide", icon: "🍽️", title: "아이와 함께하는 외식 완벽 가이드", desc: "패밀리 레스토랑 비교・회전초밥・우동 체인 공략법" },
            { slug: "traveling-japan-with-toddler-checklist", icon: "🧳", title: "아이와 여행 준비물 체크리스트", desc: "가져갈 것・현지 구매・계절별 준비" },
            { slug: "tokyo-with-baby-winter", icon: "🧣", title: "겨울철 아기와 함께하는 도쿄", desc: "일루미네이션・실내 명소・방한 대책" },
            { slug: "yokohama-family-travel-tips", icon: "🌉", title: "요코하마 가족 여행 가이드", desc: "호빵맨 뮤지엄・미나토미라이・차이나타운" },
            { slug: "osaka-family-travel-tips", icon: "🎡", title: "오사카 가족 여행 가이드", desc: "가족 친화 지역・USJ・유모차 이동 팁" },
            { slug: "nagoya-family-travel-tips", icon: "🏰", title: "나고야 가족 여행 가이드", desc: "레고랜드・나고야항 수족관・나고야 명물 요리" },
            { slug: "fukuoka-family-travel-tips", icon: "🌸", title: "후쿠오카 가족 여행 가이드", desc: "캐널시티・동식물원・아이와 라멘 공략법" },
            { slug: "sapporo-family-travel-tips", icon: "❄️", title: "삿포로 가족 여행 가이드", desc: "마루야마 동물원・눈축제・겨울 아기 방한" },
            { slug: "sendai-family-travel-tips", icon: "🌿", title: "센다이 가족 여행 가이드", desc: "야기야마 동물공원・바다의 숲 수족관・마츠시마" },
            { slug: "hiroshima-family-travel-tips", icon: "⛩️", title: "히로시마 가족 여행 가이드", desc: "미야지마・평화기념공원・오코노미야키 공략법" },
            { slug: "naha-okinawa-family-travel-tips", icon: "🌺", title: "오키나와・나하 가족 여행 가이드", desc: "츄라우미 수족관・렌터카・아기와 해변" },
          ].map(({ slug, icon, title, desc }) => (
            <Link
              key={slug}
              href={`/ko/guide/${slug}`}
              className="flex items-start gap-3 border border-gray-100 dark:border-gray-800 hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-gray-800 rounded-xl p-4 transition-colors"
            >
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{title}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">자주 묻는 질문</h2>
        <div className="space-y-4 mb-10">
          {[
            { q: "어떻게 사용하나요?", a: "지도를 열고 위치 버튼을 누르면 근처의 기저귀 교환대가 있는 화장실이 표시됩니다. 파란 핀이 기저귀 교환대가 있는 화장실입니다." },
            { q: "데이터 출처는?", a: "OpenStreetMap과 각 지자체 공개 데이터를 사용합니다. 전국 16,000곳 이상 수록." },
            { q: "오프라인에서 사용 가능한가요?", a: "PWA로 설치하면 한 번 열었던 지역은 오프라인에서도 지도를 볼 수 있습니다." },
            { q: "유료인가요?", a: "완전 무료이며 회원가입이 필요 없습니다." },
          ].map(({ q, a }) => (
            <div key={q} className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-4">
              <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1">Q. {q}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">A. {a}</p>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-gray-400 space-x-3">
          <Link href="/" className="hover:underline">English</Link>
          <Link href="/ja" className="hover:underline">日本語</Link>
          <Link href="/zh" className="hover:underline">中文</Link>
          <Link href="/privacy" className="hover:underline">개인정보처리방침</Link>
        </div>
      </div>
    </div>

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "어떻게 사용하나요?", acceptedAnswer: { "@type": "Answer", text: "지도를 열고 위치 버튼을 누르면 근처의 기저귀 교환대가 있는 화장실이 표시됩니다. 파란 핀이 기저귀 교환대가 있는 화장실입니다." } },
            { "@type": "Question", name: "데이터 출처는?", acceptedAnswer: { "@type": "Answer", text: "OpenStreetMap과 각 지자체 공개 데이터를 사용합니다. 전국 16,000곳 이상 수록." } },
            { "@type": "Question", name: "오프라인에서 사용 가능한가요?", acceptedAnswer: { "@type": "Answer", text: "PWA로 설치하면 한 번 열었던 지역은 오프라인에서도 지도를 볼 수 있습니다." } },
            { "@type": "Question", name: "유료인가요?", acceptedAnswer: { "@type": "Answer", text: "완전 무료이며 회원가입이 필요 없습니다." } },
          ],
        }),
      }}
    />
    </>
  );
}
