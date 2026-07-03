import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { HotelAffiliateBox } from "../../../components/AffiliateBox";
import { getCityForGuideSlug } from "../../../components/GuideAreaLinks";
import { CITIES, type CitySlug } from "../../../lib/toilet-data";
import ShareButtons from "../../../components/ShareButtons";
import GuideAreaLinks from "../../../components/GuideAreaLinks";
import GuideScrollTracker from "../../../components/GuideScrollTracker";
import { AdUnit } from "../../../components/AdSense";
import { KO_GUIDES, KO_GUIDE_SLUGS } from "../../../lib/guides-ko";

const BASE = "https://family-toilet-japan.vercel.app";

export const dynamicParams = false;

export function generateStaticParams() {
  return KO_GUIDE_SLUGS.map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const g = KO_GUIDES[slug];
  if (!g) return {};
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    keywords: g.keywords,
    alternates: {
      canonical: `${BASE}/ko/guide/${slug}`,
      languages: {
        en: `${BASE}/guide/${slug}`,
        ko: `${BASE}/ko/guide/${slug}`,
      },
    },
  };
}

export default async function KoGuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const g = KO_GUIDES[slug];
  if (!g) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <GuideScrollTracker slug={slug} lang="ko" />
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href="/ko" className="text-sky-200 text-sm mb-4 block hover:text-white">← Family Toilet Japan</Link>
        <h1 className="text-2xl font-bold mb-2">{g.title}</h1>
        <p className="text-sky-100 max-w-lg mx-auto text-sm">{g.heroDesc}</p>
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-4">
        <ShareButtons url={`${BASE}/ko/guide/${slug}`} text={g.title} imageUrl={`${BASE}/ko/guide/${slug}/opengraph-image`} />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
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

        <HotelAffiliateBox cityNameJa={(() => { const c = getCityForGuideSlug(slug); return c ? CITIES[c as CitySlug].jaName : ""; })()} lang="ko" />

        <GuideAreaLinks slug={slug} lang="ko" />

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

        <div className="mb-8">
          <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-sm">다른 가이드</h2>
          <div className="flex flex-wrap gap-2">
            {KO_GUIDE_SLUGS.filter((s) => s !== slug).map((s) => (
              <Link
                key={s}
                href={`/ko/guide/${s}`}
                className="text-xs bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 px-3 py-1.5 rounded-full hover:bg-sky-100 transition-colors"
              >
                {KO_GUIDES[s].title}
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
            inLanguage: "ko",
            url: `${BASE}/ko/guide/${slug}`,
          }),
        }}
      />
    </div>
  );
}
