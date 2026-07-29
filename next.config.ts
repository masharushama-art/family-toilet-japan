import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";
import { toLegacyToiletId } from "./app/lib/ward-mapping";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    // Esriマップタイルをキャッシュ（閲覧済みエリアはオフラインでも表示）
    {
      urlPattern: /^https:\/\/server\.arcgisonline\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "esri-tiles",
        expiration: { maxEntries: 1000, maxAgeSeconds: 60 * 60 * 24 * 30 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    // 都市別トイレデータJSON（訪問済み都市はオフラインでも使える・30日保持）
    {
      urlPattern: /\/data\/cities\/.+\.json$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "toilet-data-cities",
        expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    // 翻訳ファイルをキャッシュ
    {
      urlPattern: /\/locales\/.+\/common\.json$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "i18n",
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    // LeafletのCDNアイコン画像をキャッシュ
    {
      urlPattern: /^https:\/\/unpkg\.com\/leaflet.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "leaflet-assets",
        expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
  ],
  fallbacks: {
    document: "/offline",
  },
});

type LegacyToiletRedirect = {
  source: string;
  destination: string;
  statusCode: 301;
  locale: false;
};

/**
 * 東京オープンデータ由来トイレの旧ID（区名が生の日本語）URLから、新ID（区名がローマ字）
 * URLへの301リダイレクトを、現在のトイレデータから機械的に生成する。
 *
 * 対象になり得るURL: 旧IDが生きていた期間（2026-06-14のデータ追加〜2026-07-13の
 * Cloudflare移行）にGoogle/Bingにインデックスされていた可能性があるほか、
 * 現行の /map?id=旧ID 深いリンク（シェアボタン等）が既に外部で共有されている可能性がある。
 *
 * 注意: `source` は旧IDをそのまま（生のUnicode文字列として）書くのではなく、
 * encodeURIComponent でパーセントエンコードした形で書く必要がある。
 * OpenNext(Cloudflare)のルーティング層はリクエストパス（常にパーセントエンコード
 * された状態で届く）をデコードせずにマッチングするため、Unicodeリテラルのままだと
 * 絶対にマッチしない（今回404の根本原因になった挙動と同じ）。
 */
function buildLegacyTokyoToiletRedirects(): LegacyToiletRedirect[] {
  const filePath = path.join(process.cwd(), "public", "data", "cities", "tokyo.json");
  const toilets: { id: string; city: string; changingTable?: boolean }[] = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  const redirects: LegacyToiletRedirect[] = [];
  for (const t of toilets) {
    if (t.city !== "tokyo" || !t.changingTable || !t.id.startsWith("opendata_tokyo_")) continue;
    const legacyId = toLegacyToiletId(t.id);
    if (legacyId === t.id) continue; // 変換対象外（万一マッピングに無い区名等）
    const encodedLegacyId = encodeURIComponent(legacyId);
    redirects.push(
      {
        source: `/toilet/tokyo/${encodedLegacyId}`,
        destination: `/toilet/tokyo/${t.id}`,
        statusCode: 301,
        locale: false,
      },
      {
        source: `/ja/toilet/tokyo/${encodedLegacyId}`,
        destination: `/ja/toilet/tokyo/${t.id}`,
        statusCode: 301,
        locale: false,
      }
    );
  }
  return redirects;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return buildLegacyTokyoToiletRedirects();
  },
  async headers() {
    return [
      {
        // トイレデータJSONは月次更新のみなので長期キャッシュ（PSI「効率的なキャッシュ保存期間」対策）
        source: "/data/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=2592000" },
        ],
      },
      {
        // アイコン等の静的画像も同様
        source: "/icons/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, immutable" },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
