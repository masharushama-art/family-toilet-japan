import { getAllDetailPageParams } from "../lib/toilet-data";

const BASE = "https://family-toilet-japan.vercel.app";

// ビルド時に静的生成（fs はビルド時のみ実行される）
export const dynamic = "force-static";

export function GET() {
  const urls = getAllDetailPageParams()
    .map(
      ({ city, id }) =>
        `<url><loc>${BASE}/toilet/${city}/${id}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
