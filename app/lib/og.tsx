import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** 共通OGPカード（青グラデ＋バッジ2つ） */
export function ogCard(opts: {
  eyebrow: string;
  title: string;
  titleSize?: number;
  badges: string[];
  footer: string;
}) {
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
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -80, left: -40, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.05)", display: "flex" }} />

        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.75)", marginBottom: 16, letterSpacing: 2, display: "flex" }}>
          🚽 FAMILY TOILET JAPAN — {opts.eyebrow}
        </div>

        <div
          style={{
            fontSize: opts.titleSize ?? 64,
            fontWeight: 900,
            marginBottom: 28,
            display: "flex",
            textAlign: "center",
            maxWidth: 1050,
            lineHeight: 1.15,
            justifyContent: "center",
          }}
        >
          {opts.title}
        </div>

        <div style={{ display: "flex", gap: 20, marginBottom: 32, flexWrap: "wrap", justifyContent: "center" }}>
          {opts.badges.map((b) => (
            <div
              key={b}
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: 16,
                padding: "12px 28px",
                fontSize: 26,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {b}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.8)", display: "flex" }}>
          {opts.footer}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
