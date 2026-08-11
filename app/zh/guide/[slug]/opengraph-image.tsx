import { ogCard, OG_SIZE } from "../../../lib/og";
import { ZH_GUIDES, ZH_GUIDE_SLUGS } from "../../../lib/guides-zh";

export const size = OG_SIZE;
export const contentType = "image/png";

// ビルド時に静的生成する（next-on-pagesの動的ルートedge runtime要件を回避）
export function generateStaticParams() {
  return ZH_GUIDE_SLUGS.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = ZH_GUIDES[slug];
  if (!g) return new Response("Not found", { status: 404 });
  return ogCard({
    eyebrow: "指南",
    title: g.title,
    titleSize: 56,
    badges: g.sections.slice(0, 2).map((s) => s.icon + " " + s.title),
    footer: "免費・無需註冊・支援離線",
  });
}
