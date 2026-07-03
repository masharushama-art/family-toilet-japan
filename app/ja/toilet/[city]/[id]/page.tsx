import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CITIES,
  getToilet,
  getNearbyToilets,
  getAllDetailPageParams,
  getToiletAreaContext,
  type CitySlug,
} from "../../../../lib/toilet-data";
import { AdUnit } from "../../../../components/AdSense";
import { getNearbySpots, spotDistanceKm } from "../../../../lib/spots";
import { CITY_GUIDE_SLUGS } from "../../../../components/SpotPageView";
import PageViewTracker from "../../../../components/PageViewTracker";
import CleanlinessVote from "../../../../components/CleanlinessVote";

const BASE = "https://family-toilet-japan.vercel.app";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDetailPageParams();
}

type Params = Promise<{ city: string; id: string }>;

// 日本語ページでは日本語名を優先表示する
function displayName(t: { name?: string; nameEn?: string }, cityJaName: string) {
  return t.name || t.nameEn || `${cityJaName}のファミリートイレ`;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city, id } = await params;
  const c = CITIES[city as CitySlug];
  if (!c) return {};
  const toilet = getToilet(city as CitySlug, id);
  if (!toilet) return {};
  const name = displayName(toilet, c.jaName);
  const title = `${name} — ${c.jaName}のおむつ替え台付きトイレ | Family Toilet Japan`;
  const description = `${c.jaName}の「${name}」はおむつ交換台あり${toilet.wheelchair ? "・車いす対応" : ""}${toilet.fee === false ? "・無料" : ""}。住所・営業時間・地図・経路案内はこちら。`;
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE}/ja/toilet/${city}/${id}`,
      languages: {
        en: `${BASE}/toilet/${city}/${id}`,
        ja: `${BASE}/ja/toilet/${city}/${id}`,
      },
    },
    openGraph: { title, description, url: `${BASE}/ja/toilet/${city}/${id}` },
  };
}

function FeatureRow({ icon, label, value, positive }: { icon: string; label: string; value: string; positive?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
        <span>{icon}</span>
        <span>{label}</span>
      </span>
      <span className={`text-sm font-medium ${positive ? "text-green-600" : "text-gray-700 dark:text-gray-300"}`}>{value}</span>
    </div>
  );
}

export default async function JaToiletPage({ params }: { params: Params }) {
  const { city, id } = await params;
  const c = CITIES[city as CitySlug];
  if (!c) notFound();
  const toilet = getToilet(city as CitySlug, id);
  if (!toilet) notFound();

  const name = displayName(toilet, c.jaName);
  const nearby = getNearbyToilets(city as CitySlug, toilet);
  const bboxD = 0.004;
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${toilet.lon - bboxD}%2C${toilet.lat - bboxD}%2C${toilet.lon + bboxD}%2C${toilet.lat + bboxD}&layer=mapnik&marker=${toilet.lat}%2C${toilet.lon}`;
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${toilet.lat},${toilet.lon}&travelmode=walking`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <PageViewTracker event="toilet_detail_open" params={{ toilet_id: toilet.id, city, source: "direct", lang: "ja" }} />
      <div className="max-w-2xl mx-auto px-5 py-8">
        {/* パンくず */}
        <nav className="text-xs text-gray-400 mb-4 flex items-center gap-1.5 flex-wrap">
          <Link href="/ja" className="hover:text-sky-600">ホーム</Link>
          <span>›</span>
          <Link href={`/${city}`} className="hover:text-sky-600">{c.jaName}</Link>
          <span>›</span>
          <span className="text-gray-500 dark:text-gray-400 truncate max-w-[180px]">{name}</span>
        </nav>

        <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{name}</h1>
        {toilet.nameEn && toilet.name && toilet.name !== toilet.nameEn && (
          <p className="text-sm text-gray-400 mt-0.5">{toilet.nameEn}</p>
        )}

        {/* 言語切替 */}
        <div className="mt-2 text-xs text-gray-400">
          <Link href={`/toilet/${city}/${id}`} className="hover:text-sky-600 underline">English version</Link>
        </div>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-xs px-2.5 py-1 rounded-full font-medium">🍼 おむつ交換台あり</span>
          {toilet.wheelchair && (
            <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs px-2.5 py-1 rounded-full font-medium">♿ 車いす対応</span>
          )}
          {toilet.fee === false && (
            <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs px-2.5 py-1 rounded-full font-medium">💚 無料</span>
          )}
        </div>

        {toilet.geocoded && (
          <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-2.5 text-amber-700 dark:text-amber-300 text-xs">
            📍 この位置は住所からの推定です。訪問前に地図でご確認ください。
          </div>
        )}

        {/* エリアコンテキスト（ページ固有の数値入り説明文 — thin content対策） */}
        {(() => {
          const ctx = getToiletAreaContext(city as CitySlug, toilet);
          const nearestSpot = getNearbySpots(toilet.lat, toilet.lon, city, 1)[0];
          const distText = nearestSpot
            ? (() => {
                const km = spotDistanceKm(toilet.lat, toilet.lon, nearestSpot.lat, nearestSpot.lon);
                return km < 1 ? `約${Math.max(50, Math.round((km * 1000) / 50) * 50)}m` : `約${km.toFixed(1)}km`;
              })()
            : null;
          return (
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {name}は{c.jaName}にあるおむつ交換台付きの公衆トイレです。
                {nearestSpot && distText && <>{nearestSpot.names.ja}から{distText}の場所にあります。</>}
                {ctx.changingTablesWithin500m > 0
                  ? `混雑時には、徒歩500m圏内に他${ctx.changingTablesWithin500m}ヶ所のおむつ交換台付きトイレがあります。`
                  : "500m圏内でおむつ交換台があるのはここだけなので、計画的な利用がおすすめです。"}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {c.jaName}全体: 🍼 交換台{ctx.cityStats.withChangingTable.toLocaleString()}ヶ所 · ♿ 車いす対応{ctx.cityStats.wheelchair.toLocaleString()}ヶ所 · 💚 無料{ctx.cityStats.free.toLocaleString()}ヶ所（登録トイレ{ctx.cityStats.total.toLocaleString()}件中）
              </p>
            </div>
          );
        })()}

        {/* 地図 */}
        <div className="mt-5 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
          <iframe
            src={embedUrl}
            title={`${name}の地図`}
            className="w-full h-64 border-0"
            loading="lazy"
          />
        </div>
        <p className="text-[10px] text-gray-400 mt-1 text-right">
          © <a href="https://www.openstreetmap.org/copyright" className="underline" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>
        </p>

        {/* アクション */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            🗺️ 経路案内
          </a>
          <Link
            href={`/map?id=${toilet.id}&city=${city}`}
            className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            📍 アプリ地図で開く
          </Link>
        </div>

        {/* 設備詳細 */}
        <div className="mt-6 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-2">
          <FeatureRow icon="🍼" label="おむつ交換台" value="✓ あり" positive />
          {toilet.changingTableLocation && (
            <FeatureRow
              icon="🚻"
              label="交換台の場所"
              value={
                toilet.changingTableLocation === "male" ? "男性トイレにもあり"
                  : toilet.changingTableLocation === "unisex" ? "男女共用"
                  : toilet.changingTableLocation === "dedicated_room" ? "専用室"
                  : toilet.changingTableLocation
              }
              positive
            />
          )}
          {toilet.level && <FeatureRow icon="🏢" label="フロア" value={`${toilet.level}F`} />}
          {toilet.ostomate && <FeatureRow icon="🩹" label="オストメイト対応" value="✓ あり" positive />}
          <FeatureRow icon="♿" label="車いす対応" value={toilet.wheelchair ? "✓ あり" : "不明"} positive={toilet.wheelchair} />
          <FeatureRow icon="💴" label="利用料金" value={toilet.fee === true ? "有料" : toilet.fee === false ? "無料" : "不明"} positive={toilet.fee === false} />
          {toilet.openingHours && <FeatureRow icon="🕐" label="利用可能時間" value={toilet.openingHours} />}
          {toilet.address && <FeatureRow icon="📮" label="住所" value={toilet.address} />}
          {toilet.operator && <FeatureRow icon="🏢" label="管理者" value={toilet.operator} />}
          <FeatureRow
            icon="🌐"
            label="データ出典"
            value={toilet.source === "opendata" ? "自治体オープンデータ (CC BY)" : "OpenStreetMap (ODbL)"}
          />
        </div>

        <CleanlinessVote toiletId={toilet.id} />

        <AdUnit slot="toilet-detail" />

        {/* 近くのトイレ */}
        {nearby.length > 0 && (
          <div className="mt-8">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-3">近くのおむつ交換台付きトイレ</h2>
            <div className="space-y-2">
              {nearby.map((n) => (
                <Link
                  key={n.id}
                  href={`/ja/toilet/${city}/${n.id}`}
                  className="block border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 hover:border-sky-200 hover:bg-sky-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{displayName(n, c.jaName)}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {n.wheelchair && "♿ "}
                    {n.fee === false && "無料 · "}
                    {n.address || `${c.jaName}`}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 周辺エリア・ガイドへの内部リンク */}
        {(() => {
          const spots = getNearbySpots(toilet.lat, toilet.lon, city);
          const guides = CITY_GUIDE_SLUGS[city] ?? [];
          if (spots.length === 0 && guides.length === 0) return null;
          return (
            <div className="mt-8">
              {spots.length > 0 && (
                <>
                  <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-sm">📍 周辺エリア</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {spots.map((s) => (
                      <Link key={s.slug} href={`/ja/spot/${s.slug}`} className="text-xs bg-gray-50 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        {s.type === "station" ? "🚉" : "📍"} {s.names.ja}
                      </Link>
                    ))}
                  </div>
                </>
              )}
              {guides.length > 0 && (
                <>
                  <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-sm">📖 {c.jaName}の子連れ観光ガイド</h2>
                  <div className="flex flex-wrap gap-2">
                    {guides.map((g) => (
                      <Link key={g.slug} href={`/ja/guide/${g.slug}`} className="text-xs bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 px-3 py-1.5 rounded-full hover:bg-sky-100 transition-colors">
                        {g.ja}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })()}

        <div className="mt-8 bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-5 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {c.jaName}のおむつ交換台付きトイレを地図でまとめて見られます。
          </p>
          <Link
            href={`/${city}/changing-table`}
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
          >
            🍼 {c.jaName}のおむつ替えトイレ一覧
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
                { "@type": "ListItem", position: 1, name: "Family Toilet Japan", item: `${BASE}/ja` },
                { "@type": "ListItem", position: 2, name: c.jaName, item: `${BASE}/${city}` },
                { "@type": "ListItem", position: 3, name, item: `${BASE}/ja/toilet/${city}/${id}` },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "CivicStructure",
              name,
              url: `${BASE}/ja/toilet/${city}/${id}`,
              inLanguage: "ja",
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
