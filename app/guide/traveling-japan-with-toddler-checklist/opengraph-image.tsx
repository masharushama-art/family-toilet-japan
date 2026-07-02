import { ogCard, OG_SIZE } from "../../lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return ogCard({
    eyebrow: "TRAVEL GUIDE",
    title: "Japan with Toddler — Packing Checklist",
    titleSize: 56,
    badges: ["🎒 What to pack", "🛒 Buy in Japan"],
    footer: "Free map · No sign-up · Works offline",
  });
}
