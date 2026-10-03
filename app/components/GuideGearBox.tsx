import { GearAffiliateBox } from "./AffiliateBox";
import { GUIDE_GEAR } from "../lib/guide-gear";

export default function GuideGearBox({ slug, lang }: { slug: string; lang: "en" | "ja" }) {
  const items = GUIDE_GEAR[slug]?.[lang];
  if (!items) return null;
  return <GearAffiliateBox lang={lang} items={items} />;
}
