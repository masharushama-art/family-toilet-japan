import { ImageResponse } from "next/og";
import { CITIES, getCityStats, type CitySlug } from "../lib/toilet-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = CITIES[city as CitySlug];
  if (!c) return new Response("Not found", { status: 404 });

  const stats = getCityStats(city as CitySlug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 60%, #38bdf8 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
          position: "relative",
        }}
      >
        {/* 背景装飾 */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -80, left: -40, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex" }} />

        {/* アプリ名 */}
        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.75)", marginBottom: 16, letterSpacing: 2, display: "flex" }}>
          🚽 FAMILY TOILET JAPAN
        </div>

        {/* 都市名 */}
        <div style={{ fontSize: 80, fontWeight: 900, marginBottom: 16, display: "flex" }}>
          {c.name}
        </div>

        {/* 件数バッジ */}
        <div style={{
          display: "flex",
          gap: 20,
          marginBottom: 32,
        }}>
          <div style={{
            background: "rgba(255,255,255,0.2)",
            borderRadius: 16,
            padding: "12px 28px",
            fontSize: 28,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            🚽 {stats.total.toLocaleString()} toilets
          </div>
          <div style={{
            background: "rgba(255,255,255,0.2)",
            borderRadius: 16,
            padding: "12px 28px",
            fontSize: 28,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            🍼 {stats.withChangingTable.toLocaleString()} changing tables
          </div>
        </div>

        {/* サブタイトル */}
        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", display: "flex" }}>
          Free map · No sign-up · Works offline
        </div>
      </div>
    ),
    { ...size }
  );
}
