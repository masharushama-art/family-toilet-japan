import { ogCard, OG_SIZE } from "../../../lib/og";
import { getSpot, spotDistanceKm, SPOT_SLUGS } from "../../../lib/spots";
import { getToiletsByCity, type CitySlug } from "../../../lib/toilet-data";

export const size = OG_SIZE;
export const contentType = "image/png";

// ビルド時に静的生成する（fsを使うためedge runtimeでは動かせない）
export function generateStaticParams() {
  return SPOT_SLUGS.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spot = getSpot(slug);
  if (!spot) return new Response("Not found", { status: 404 });
  const near = getToiletsByCity(spot.city as CitySlug).filter(
    (t) => spotDistanceKm(spot.lat, spot.lon, t.lat, t.lon) <= 1.0
  );
  const ct = near.filter((t) => t.changingTable).length;
  return ogCard({
    eyebrow: "區域指南",
    title: (spot.type === "station" ? "🚉 " : "📍 ") + spot.names.zh,
    badges: ["🚻 " + near.length + "處廁所", "🍼 " + ct + "個換尿布台"],
    footer: "免費・無需註冊・支援離線",
  });
}
