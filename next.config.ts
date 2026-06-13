import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    // OSMマップタイルをキャッシュ（オフライン地図）
    {
      urlPattern: /^https:\/\/[abc]\.tile\.openstreetmap\.org\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "osm-tiles",
        expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 * 30 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    // トイレデータJSONをキャッシュ
    {
      urlPattern: /\/data\/toilets\.json$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "toilet-data",
        expiration: { maxEntries: 1, maxAgeSeconds: 60 * 60 * 24 * 7 },
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
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);
