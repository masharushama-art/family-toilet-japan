import { ogCard, OG_SIZE } from "../../lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return ogCard({
    eyebrow: "TRAVEL GUIDE",
    title: "How to Use a Japanese Toilet",
    titleSize: 56,
    badges: ["🚽 Washlets", "🧻 Etiquette"],
    footer: "Free map · No sign-up · Works offline",
  });
}
