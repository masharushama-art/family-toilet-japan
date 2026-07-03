import type { NextConfig } from "next";

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

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
