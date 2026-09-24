"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { SEASONAL_GUIDES, getSeasonalSlugs, type SeasonLang } from "../lib/seasonal-guides";

const HEADING: Record<SeasonLang, { title: string; read: string }> = {
  en: { title: "🗓️ In season now", read: "Read the guide →" },
  ja: { title: "🗓️ いまの季節におすすめ", read: "ガイドを読む →" },
  zh: { title: "🗓️ 當季推薦", read: "閱讀指南 →" },
  ko: { title: "🗓️ 지금 시즌 추천", read: "가이드 보기 →" },
};

const noSubscribe = () => () => {};

// トップページは静的生成のため、ビルド時点の季節（initialSlugs）をHTMLに出しつつ、
// 閲覧時に日本時間の今日で選び直す。デプロイ頻度に関係なく正しい季節が表示される。
// スナップショットは参照が安定するよう文字列で返す
export default function SeasonalGuides({ lang, initialSlugs }: { lang: SeasonLang; initialSlugs: string[] }) {
  const key = useSyncExternalStore(
    noSubscribe,
    () => getSeasonalSlugs(new Date()).join(","),
    () => initialSlugs.join(",")
  );
  const slugs = key ? key.split(",") : [];

  const guides = slugs.map((s) => SEASONAL_GUIDES.find((g) => g.slug === s)).filter((g) => g !== undefined);
  if (guides.length === 0) return null;
  const t = HEADING[lang];

  return (
    <section className="mb-8" aria-label={t.title}>
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{t.title}</h2>
      <div className="space-y-3">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={lang === "en" ? `/guide/${g.slug}` : `/${lang}/guide/${g.slug}`}
            className="flex items-center gap-4 rounded-2xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 hover:border-amber-400 px-5 py-4 transition-colors"
          >
            <span className="text-4xl">{g.icon}</span>
            <div className="min-w-0">
              <p className="font-bold text-gray-800 dark:text-gray-100">{g.text[lang].title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{g.text[lang].desc}</p>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mt-1">{t.read}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
