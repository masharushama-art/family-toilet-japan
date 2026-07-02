import { ogCard, OG_SIZE } from "../../lib/og";
import { getSpot, spotDistanceKm } from "../../lib/spots";
import { getToiletsByCity, type CitySlug } from "../../lib/toilet-data";

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
    eyebrow: "AREA GUIDE",
    title: (spot.type === "station" ? "🚉 " : "📍 ") + spot.names.en,
    badges: ["🚻 " + near.length + " toilets nearby", "🍼 " + ct + " changing tables"],
    footer: "Free map · No sign-up · Works offline",
  });
}
