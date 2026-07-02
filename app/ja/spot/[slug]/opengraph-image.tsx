import { ogCard, OG_SIZE } from "../../../lib/og";
import { getSpot, spotDistanceKm } from "../../../lib/spots";
import { getToiletsByCity, type CitySlug } from "../../../lib/toilet-data";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spot = getSpot(slug);
  if (!spot) return new Response("Not found", { status: 404 });
  const near = getToiletsByCity(spot.city as CitySlug).filter(
    (t) => spotDistanceKm(spot.lat, spot.lon, t.lat, t.lon) <= 1.0
  );
  const ct = near.filter((t) => t.changingTable).length;
  return ogCard({
    eyebrow: "エリアガイド",
    title: (spot.type === "station" ? "🚉 " : "📍 ") + spot.names.ja,
    badges: ["🚻 " + near.length + "件のトイレ", "🍼 " + ct + "台のおむつ交換台"],
    footer: "無料・登録不要・オフライン対応",
  });
}
