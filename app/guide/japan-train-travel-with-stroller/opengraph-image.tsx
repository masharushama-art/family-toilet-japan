import { ogCard, OG_SIZE } from "../../lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return ogCard({
    eyebrow: "TRAVEL GUIDE",
    title: "Japan Train Travel with a Stroller",
    titleSize: 56,
    badges: ["🚅 Shinkansen seats", "🧳 Luggage forwarding"],
    footer: "Free map · No sign-up · Works offline",
  });
}
