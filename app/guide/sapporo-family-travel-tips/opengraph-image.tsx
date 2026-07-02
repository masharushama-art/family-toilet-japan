import { ogCard, OG_SIZE } from "../../lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return ogCard({
    eyebrow: "TRAVEL GUIDE",
    title: "Sapporo Family Travel Tips",
    titleSize: 56,
    badges: ["❄️ Winter tips", "🐻 Maruyama Zoo"],
    footer: "Free map · No sign-up · Works offline",
  });
}
