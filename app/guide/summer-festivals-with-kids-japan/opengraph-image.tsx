import { ogCard, OG_SIZE } from "../../lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return ogCard({
    eyebrow: "TRAVEL GUIDE",
    title: "Summer Festivals & Fireworks with Kids",
    titleSize: 52,
    badges: ["🎆 Crowd tips", "🚽 Toilet finder"],
    footer: "Free map · No sign-up · Works offline",
  });
}
