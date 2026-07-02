import { ogCard, OG_SIZE } from "../../lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return ogCard({
    eyebrow: "TRAVEL GUIDE",
    title: "Yokohama Family Travel Tips",
    titleSize: 56,
    badges: ["🍜 Cup Noodles Museum", "🌉 Minato Mirai"],
    footer: "Free map · No sign-up · Works offline",
  });
}
