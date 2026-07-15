import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SpotPageView from "../../components/SpotPageView";
import { getSpot, SPOT_SLUGS } from "../../lib/spots";
import { CITIES, type CitySlug } from "../../lib/toilet-data";

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
  const cityName = CITIES[spot.city as CitySlug].name;
  return {
    title: `Baby Changing Toilets near ${spot.names.en} (${cityName}) | Family Toilet Japan`,
    description: `Find toilets with baby changing tables near ${spot.names.en} in ${cityName}, Japan. Distances, wheelchair access, and a free interactive map for families.`,
    alternates: {
      canonical: `${BASE}/spot/${slug}`,
      languages: {
        en: `${BASE}/spot/${slug}`,
        ja: `${BASE}/ja/spot/${slug}`,
        "zh-TW": `${BASE}/zh/spot/${slug}`,
        ko: `${BASE}/ko/spot/${slug}`,
      },
    },
  };
}

export default async function SpotPage({ params }: { params: Params }) {
  const { slug } = await params;
  const spot = getSpot(slug);
  if (!spot) notFound();
  return <SpotPageView spot={spot} lang="en" />;
}
