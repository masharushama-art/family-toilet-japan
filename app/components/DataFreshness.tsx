import type { CityFreshness } from "../lib/data-report";

const TEXT = {
  en: {
    updated: (date: string) => `Data last updated ${date}`,
    delta: (n: number) => `+${n.toLocaleString()} toilets added since last update`,
  },
  ja: {
    updated: (date: string) => `データ最終更新日: ${date}`,
    delta: (n: number) => `前回更新から${n.toLocaleString()}件のトイレを追加`,
  },
};

export default function DataFreshness({ lang, freshness }: { lang: "en" | "ja"; freshness: CityFreshness | undefined }) {
  if (!freshness) return null;
  const t = TEXT[lang];
  return (
    <p className="text-xs text-gray-400 dark:text-gray-500 -mt-6 mb-8 text-center">
      🔄 {t.updated(freshness.updatedDate)}
      {freshness.delta > 0 && <> · {t.delta(freshness.delta)}</>}
    </p>
  );
}
