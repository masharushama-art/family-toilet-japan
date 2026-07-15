import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SpotPageView from "../../../components/SpotPageView";
import { getSpot, SPOT_SLUGS } from "../../../lib/spots";

const BASE = "https://familytoiletjapan.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return SPOT_SLUGS.map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const spot = getSpot(slug);
  if (!spot) return {};
  return {
    title: `${spot.names.ko} 주변 기저귀 교환대 화장실 | Family Toilet Japan`,
    description: `${spot.names.ko} 주변의 기저귀 교환대가 있는 화장실을 거리와 함께 확인하세요. 휠체어 접근, 무료 화장실 필터 지원. 아기와 나들이 필수.`,
    alternates: {
      canonical: `${BASE}/ko/spot/${slug}`,
      languages: {
        en: `${BASE}/spot/${slug}`,
        ja: `${BASE}/ja/spot/${slug}`,
        "zh-TW": `${BASE}/zh/spot/${slug}`,
        ko: `${BASE}/ko/spot/${slug}`,
      },
    },
  };
}

export default async function KoSpotPage({ params }: { params: Params }) {
  const { slug } = await params;
  const spot = getSpot(slug);
  if (!spot) notFound();
  return <SpotPageView spot={spot} lang="ko" />;
}
