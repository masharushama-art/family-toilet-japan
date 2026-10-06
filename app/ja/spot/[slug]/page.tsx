import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SpotPageView from "../../../components/SpotPageView";
import { getSpot, SPOT_SLUGS } from "../../../lib/spots";
import { THIN_PAGES_NOINDEX } from "../../../lib/feature-flags";
import { getSpotEditorial } from "../../../lib/spot-editorial";

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
  // 公式情報で確認した固有コンテンツがあるスポットだけは、薄いページ対策中でも index 対象にする
  const editorial = getSpotEditorial(slug);
  return {
    title: editorial
      ? `${spot.names.ja}の授乳室・ベビー休憩室・おむつ替え台 | Family Toilet Japan`
      : `${spot.names.ja}周辺のおむつ交換台付きトイレ | Family Toilet Japan`,
    description: editorial
      ? `${spot.names.ja}周辺の授乳室・ベビー休憩室・おむつ替え設備を、公式サイトで確認した情報と地図付きでまとめました。子連れのお出かけに。`
      : `${spot.names.ja}周辺のおむつ交換台・授乳設備のあるトイレを距離付きで一覧表示。車いす対応・無料トイレのフィルターも。子連れのお出かけに。`,
    alternates: {
      canonical: `${BASE}/ja/spot/${slug}`,
      // 他言語版は noindex のため、index 対象の日本語ページからは hreflang で結ばない
      ...(editorial
        ? {}
        : {
            languages: {
              en: `${BASE}/spot/${slug}`,
              ja: `${BASE}/ja/spot/${slug}`,
              "zh-TW": `${BASE}/zh/spot/${slug}`,
              ko: `${BASE}/ko/spot/${slug}`,
            },
          }),
    },
    ...(THIN_PAGES_NOINDEX && !editorial ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function JaSpotPage({ params }: { params: Params }) {
  const { slug } = await params;
  const spot = getSpot(slug);
  if (!spot) notFound();
  return <SpotPageView spot={spot} lang="ja" />;
}
