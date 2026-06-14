import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Family Toilet Japan — Find family-friendly toilets in Japan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 60%, #38bdf8 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <div style={{ fontSize: 120, marginBottom: 24 }}>🚽</div>
        <div style={{ fontSize: 64, fontWeight: 800, marginBottom: 16, textAlign: "center" }}>
          Family Toilet Japan
        </div>
        <div style={{ fontSize: 32, opacity: 0.85, textAlign: "center", maxWidth: 800 }}>
          6,000+ family-friendly toilets with baby changing tables
        </div>
        <div style={{ fontSize: 24, opacity: 0.6, marginTop: 16 }}>
          Tokyo · Osaka · Kyoto — Free & No Sign-up
        </div>
      </div>
    ),
    { ...size }
  );
}
