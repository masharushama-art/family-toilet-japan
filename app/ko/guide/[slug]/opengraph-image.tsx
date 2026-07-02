import { ogCard, OG_SIZE } from "../../../lib/og";
import { KO_GUIDES } from "../../../lib/guides-ko";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = KO_GUIDES[slug];
  if (!g) return new Response("Not found", { status: 404 });
  return ogCard({
    eyebrow: "가이드",
    title: g.title,
    titleSize: 56,
    badges: g.sections.slice(0, 2).map((s) => s.icon + " " + s.title),
    footer: "무료・가입 불필요・오프라인 지원",
  });
}
