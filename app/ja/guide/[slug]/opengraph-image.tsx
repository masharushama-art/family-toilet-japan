import { ogCard, OG_SIZE } from "../../../lib/og";
import { JA_GUIDES } from "../../../lib/guides-ja";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = JA_GUIDES[slug];
  if (!g) return new Response("Not found", { status: 404 });
  return ogCard({
    eyebrow: "ガイド",
    title: g.title,
    titleSize: 56,
    badges: g.sections.slice(0, 2).map((s) => s.icon + " " + s.title),
    footer: "無料・登録不要・オフライン対応",
  });
}
