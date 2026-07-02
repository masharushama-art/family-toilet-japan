import { ogCard, OG_SIZE } from "../../lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return ogCard({
    eyebrow: "TRAVEL GUIDE",
    title: "Best Baby Changing Facilities in Osaka",
    titleSize: 56,
    badges: ["🚉 Umeda", "🗼 Tennoji"],
    footer: "Free map · No sign-up · Works offline",
  });
}
