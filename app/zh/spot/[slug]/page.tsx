import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SpotPageView from "../../../components/SpotPageView";
import { getSpot, SPOT_SLUGS } from "../../../lib/spots";

const BASE = "https://family-toilet-japan.vercel.app";

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
    title: `${spot.names.zh}附近的換尿布台廁所 | Family Toilet Japan`,
    description: `查詢${spot.names.zh}附近設有換尿布台的廁所，附距離顯示。無障礙設施、免費廁所篩選。帶寶寶出遊必備。`,
    alternates: {
      canonical: `${BASE}/zh/spot/${slug}`,
      languages: {
        en: `${BASE}/spot/${slug}`,
        ja: `${BASE}/ja/spot/${slug}`,
        "zh-TW": `${BASE}/zh/spot/${slug}`,
        ko: `${BASE}/ko/spot/${slug}`,
      },
    },
  };
}

export default async function ZhSpotPage({ params }: { params: Params }) {
  const { slug } = await params;
  const spot = getSpot(slug);
  if (!spot) notFound();
  return <SpotPageView spot={spot} lang="zh" />;
}
