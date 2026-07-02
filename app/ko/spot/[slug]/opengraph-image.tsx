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
    eyebrow: "지역 가이드",
    title: (spot.type === "station" ? "🚉 " : "📍 ") + spot.names.ko,
    badges: ["🚻 " + near.length + "곳의 화장실", "🍼 " + ct + "개 기저귀 교환대"],
    footer: "무료・가입 불필요・오프라인 지원",
  });
}
