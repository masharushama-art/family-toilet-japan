import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CITIES,
  getToilet,
  getNearbyToilets,
  getAllDetailPageParams,
  type CitySlug,
} from "../../../lib/toilet-data";
import { AdUnit } from "../../../components/AdSense";
import { getNearbySpots } from "../../../lib/spots";
import { CITY_GUIDE_SLUGS } from "../../../components/SpotPageView";

const BASE = "https://family-toilet-japan.vercel.app";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDetailPageParams();
}

type Params = Promise<{ city: string; id: string }>;

function displayName(t: { nameEn?: string; name?: string }, cityName: string) {
  return t.nameEn || t.name || `Family Toilet in ${cityName}`;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city, id } = await params;
  const c = CITIES[city as CitySlug];
  if (!c) return {};
  const toilet = getToilet(city as CitySlug, id);
  if (!toilet) return {};
  const name = displayName(toilet, c.name);
  const title = `${name} — Baby Changing Table in ${c.name} | Family Toilet Japan`;
  const description = `${name} in ${c.name}, Japan has a baby changing table${toilet.wheelchair ? " and wheelchair access" : ""}${toilet.fee === false ? ", free to use" : ""}. Address, opening hours, map and directions.`;
  return {
    title,
    description,
    alternates: { canonical: `${BASE}/toilet/${city}/${id}` },
    openGraph: { title, description, url: `${BASE}/toilet/${city}/${id}` },
  };
}

function FeatureRow({ icon, label, value, positive }: { icon: string; label: string; value: string; positive?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-gray-500 text-sm flex items-center gap-2">
        <span>{icon}</span>
        <span>{label}</span>
      </span>
      <span className={`text-sm font-medium ${positive ? "text-green-600" : "text-gray-700"}`}>{value}</span>
    </div>
  );
}

export default async function ToiletPage({ params }: { params: Params }) {
  const { city, id } = await params;
  const c = CITIES[city as CitySlug];
  if (!c) notFound();
  const toilet = getToilet(city as CitySlug, id);
  if (!toilet) notFound();

  const name = displayName(toilet, c.name);
  const nearby = getNearbyToilets(city as CitySlug, toilet);
  const bboxD = 0.004;
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${toilet.lon - bboxD}%2C${toilet.lat - bboxD}%2C${toilet.lon + bboxD}%2C${toilet.lat + bboxD}&layer=mapnik&marker=${toilet.lat}%2C${toilet.lon}`;
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${toilet.lat},${toilet.lon}&travelmode=walking`;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-5 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-sky-600">Home</Link>
          <span>›</span>
          <Link href={`/${city}`} className="hover:text-sky-600">{c.name}</Link>
          <span>›</span>
          <Link href={`/${city}/changing-table`} className="hover:text-sky-600">Baby Changing</Link>
          <span>›</span>
          <span className="text-gray-500 truncate max-w-[180px]">{name}</span>
        </nav>

        <h1 className="text-xl font-bold text-gray-900 leading-tight">{name}</h1>
        {toilet.name && toilet.nameEn && toilet.name !== toilet.nameEn && (
          <p className="text-sm text-gray-400 mt-0.5">{toilet.name}</p>
        )}

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="bg-sky-100 text-sky-700 text-xs px-2.5 py-1 rounded-full font-medium">🍼 Baby Changing Table</span>
          {toilet.wheelchair && (
            <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium">♿ Wheelchair Accessible</span>
          )}
          {toilet.fee === false && (
            <span className="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">💚 Free</span>
          )}
        </div>

        {toilet.geocoded && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-amber-700 text-xs">
            📍 This location is approximate (geocoded from address). Verify on the map before visiting.
          </div>
        )}

        {/* Map */}
        <div className="mt-5 rounded-2xl overflow-hidden border border-gray-100">
          <iframe
            src={embedUrl}
            title={`Map showing ${name}`}
            className="w-full h-64 border-0"
            loading="lazy"
          />
        </div>
        <p className="text-[10px] text-gray-400 mt-1 text-right">
          © <a href="https://www.openstreetmap.org/copyright" className="underline" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>
        </p>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            🗺️ Directions
          </a>
          <Link
            href={`/map?id=${toilet.id}&city=${city}`}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            📍 Open in App Map
          </Link>
        </div>

        {/* Details */}
        <div className="mt-6 border border-gray-100 rounded-2xl px-5 py-2">
          <FeatureRow icon="🍼" label="Baby changing table" value="✓ Available" positive />
          <FeatureRow icon="♿" label="Wheelchair access" value={toilet.wheelchair ? "✓ Yes" : "Unknown"} positive={toilet.wheelchair} />
          <FeatureRow icon="💴" label="Fee" value={toilet.fee === true ? "Paid" : toilet.fee === false ? "Free" : "Unknown"} positive={toilet.fee === false} />
          {toilet.openingHours && <FeatureRow icon="🕐" label="Opening hours" value={toilet.openingHours} />}
          {toilet.address && <FeatureRow icon="📮" label="Address" value={toilet.address} />}
          {toilet.operator && <FeatureRow icon="🏢" label="Operator" value={toilet.operator} />}
          <FeatureRow
            icon="🌐"
            label="Data source"
            value={toilet.source === "opendata" ? "Municipal Open Data (CC BY)" : "OpenStreetMap (ODbL)"}
          />
        </div>

        <AdUnit slot="toilet-detail" />

        {/* Nearby */}
        {nearby.length > 0 && (
          <div className="mt-8">
            <h2 className="font-bold text-gray-800 mb-3">Nearby toilets with baby changing tables</h2>
            <div className="space-y-2">
              {nearby.map((n) => (
                <Link
                  key={n.id}
                  href={`/toilet/${city}/${n.id}`}
                  className="block border border-gray-100 rounded-xl px-4 py-3 hover:border-sky-200 hover:bg-sky-50 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-800 truncate">{displayName(n, c.name)}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {n.wheelchair && "♿ "}
                    {n.fee === false && "Free · "}
                    {n.address || `${c.name}, Japan`}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Nearby areas & guides — internal linking */}
        {(() => {
          const spots = getNearbySpots(toilet.lat, toilet.lon, city);
          const guides = CITY_GUIDE_SLUGS[city] ?? [];
          if (spots.length === 0 && guides.length === 0) return null;
          return (
            <div className="mt-8">
              {spots.length > 0 && (
                <>
                  <h2 className="font-bold text-gray-800 mb-3 text-sm">📍 Nearby areas</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {spots.map((s) => (
                      <Link key={s.slug} href={`/spot/${s.slug}`} className="text-xs bg-gray-50 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
                        {s.type === "station" ? "🚉" : "📍"} {s.names.en}
                      </Link>
                    ))}
                  </div>
                </>
              )}
              {guides.length > 0 && (
                <>
                  <h2 className="font-bold text-gray-800 mb-3 text-sm">📖 Travel guides for {c.name}</h2>
                  <div className="flex flex-wrap gap-2">
                    {guides.map((g) => (
                      <Link key={g.slug} href={`/guide/${g.slug}`} className="text-xs bg-sky-50 text-sky-700 px-3 py-1.5 rounded-full hover:bg-sky-100 transition-colors">
                        {g.en}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })()}

        <div className="mt-8 bg-gray-50 rounded-2xl p-5 text-center">
          <p className="text-sm text-gray-600 mb-3">
            Browse all {c.name} toilets with baby changing tables on the interactive map.
          </p>
          <Link
            href={`/${city}/changing-table`}
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
          >
            🍼 All Baby Changing Toilets in {c.name}
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Family Toilet Japan", item: BASE },
                { "@type": "ListItem", position: 2, name: c.name, item: `${BASE}/${city}` },
                { "@type": "ListItem", position: 3, name, item: `${BASE}/toilet/${city}/${id}` },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "CivicStructure",
              name,
              url: `${BASE}/toilet/${city}/${id}`,
              geo: { "@type": "GeoCoordinates", latitude: toilet.lat, longitude: toilet.lon },
              ...(toilet.address ? { address: toilet.address } : {}),
              ...(toilet.openingHours ? { openingHours: toilet.openingHours } : {}),
              isAccessibleForFree: toilet.fee !== true,
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Baby Changing Table", value: true },
                ...(toilet.wheelchair
                  ? [{ "@type": "LocationFeatureSpecification", name: "Wheelchair Accessible", value: true }]
                  : []),
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
