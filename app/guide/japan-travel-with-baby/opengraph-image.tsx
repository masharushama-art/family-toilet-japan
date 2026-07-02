import { ogCard, OG_SIZE } from "../../lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return ogCard({
    eyebrow: "TRAVEL GUIDE",
    title: "Japan Travel with Baby & Toddler",
    titleSize: 56,
    badges: ["🍼 Changing rooms", "🚃 Strollers"],
    footer: "Free map · No sign-up · Works offline",
  });
}
