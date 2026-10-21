import type { MetadataRoute } from "next";

// /map?… は地図の単一ピン表示などの派生URLで、noindex・canonical=/map の対象（価値がない）。
// 動的ルート(/map)はWorkers無料枠のCPU時間を食うため、クローラーには取得させない。
// 2026-10-20、Anthropic社の検索用クローラー Claude-SearchBot が /map を大量取得して
// CPU時間制限を超過した（ROADMAP.md「Workers CPU時間超過」参照）。
// Anthropicのbotはrobots.txtと非標準のCrawl-delayを守る（公式ヘルプ）。
// Claude-SearchBot は検索結果に載る流入元になりうるため全面拒否はせず、/map? の除外と取得間隔で抑える。
// （UAごとにグループを分けると、そのUAは"*"グループを使わないので、Disallowを再掲する）
const DISALLOW = ["/api/", "/_next/", "/map?"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: "Claude-SearchBot", allow: "/", disallow: DISALLOW, crawlDelay: 30 },
    ],
    sitemap: ["https://familytoiletjapan.com/sitemap.xml"],
  };
}
