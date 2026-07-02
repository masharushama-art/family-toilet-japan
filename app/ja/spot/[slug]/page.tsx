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
    title: `${spot.names.ja}周辺のおむつ交換台付きトイレ | Family Toilet Japan`,
    description: `${spot.names.ja}周辺のおむつ交換台・授乳設備のあるトイレを距離付きで一覧表示。車いす対応・無料トイレのフィルターも。子連れのお出かけに。`,
    alternates: {
      canonical: `${BASE}/ja/spot/${slug}`,
      languages: {
        en: `${BASE}/spot/${slug}`,
        ja: `${BASE}/ja/spot/${slug}`,
        "zh-TW": `${BASE}/zh/spot/${slug}`,
        ko: `${BASE}/ko/spot/${slug}`,
      },
    },
  };
}

export default async function JaSpotPage({ params }: { params: Params }) {
  const { slug } = await params;
  const spot = getSpot(slug);
  if (!spot) notFound();
  return <SpotPageView spot={spot} lang="ja" />;
}
