import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import GuideAreaLinks from "../../../components/GuideAreaLinks";
import GuideScrollTracker from "../../../components/GuideScrollTracker";
import { AdUnit } from "../../../components/AdSense";
import { JA_GUIDES, JA_GUIDE_SLUGS } from "../../../lib/guides-ja";

const BASE = "https://family-toilet-japan.vercel.app";

export const dynamicParams = false;

export function generateStaticParams() {
  return JA_GUIDE_SLUGS.map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const g = JA_GUIDES[slug];
  if (!g) return {};
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    keywords: g.keywords,
    alternates: {
      canonical: `${BASE}/ja/guide/${slug}`,
      languages: {
        en: `${BASE}/guide/${slug}`,
        ja: `${BASE}/ja/guide/${slug}`,
      },
    },
  };
}

export default async function JaGuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const g = JA_GUIDES[slug];
  if (!g) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <GuideScrollTracker slug={slug} lang="ja" />
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/ja" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">{g.title}</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">{g.heroDesc}</p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* 言語切替 */}
        <div className="mb-6 text-xs text-gray-400">
          <Link href={`/guide/${slug}`} className="hover:text-sky-600 underline">English version</Link>
        </div>

        <div className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <span className="text-2xl">{g.introIcon}</span>
          <p className="text-sm text-sky-800 dark:text-sky-200">{g.intro}</p>
        </div>

        {g.sections.map(({ title, icon, items }, sectionIndex) => (
          <div key={title} className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{icon} {title}</h2>
            <div className="space-y-3">
              {items.map(({ name, desc }) => (
                <div key={name} className="border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1">📍 {name}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            {sectionIndex === 1 && <AdUnit slot="guide-mid" />}
          </div>
        ))}

        <GuideAreaLinks slug={slug} lang="ja" />

        <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-3">{g.mapTitle}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{g.mapDesc}</p>
          <Link
            href={g.mapHref}
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            {g.mapLabel}
          </Link>
        </div>

        {/* 他の日本語ガイド */}
        <div className="mb-8">
          <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-sm">他のガイド</h2>
          <div className="flex flex-wrap gap-2">
            {JA_GUIDE_SLUGS.filter((s) => s !== slug).map((s) => (
              <Link
                key={s}
                href={`/ja/guide/${s}`}
                className="text-xs bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 px-3 py-1.5 rounded-full hover:bg-sky-100 transition-colors"
              >
                {JA_GUIDES[s].title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: g.title,
            description: g.metaDescription,
            inLanguage: "ja",
            url: `${BASE}/ja/guide/${slug}`,
          }),
        }}
      />
    </div>
  );
}
