import Link from "next/link";
import { getEditorialSpots, getSpotEditorial } from "../lib/spot-editorial";

// 公式情報つきで index 対象にしている日本語スポットページ（app/lib/spot-editorial.ts）への内部リンク。
// トップ・都市ページ・スポットページどうしから張り、Googleが見つけてクロールしやすくする
// （noindex のスポットページ（英語・多言語）へのリンクはリンクの力が無駄になるため、こちらを優先する）。
export default function EditorialSpotLinks({
  city,
  excludeSlug,
  heading = "📍 駅・エリア別の授乳室・ベビー休憩室",
  className = "mb-10",
}: {
  city?: string;
  excludeSlug?: string;
  heading?: string;
  className?: string;
}) {
  const spots = getEditorialSpots(city, excludeSlug);
  if (spots.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">{heading}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        公式サイトで確認できた授乳室・ベビー休憩室の場所をまとめています。
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {spots.map((s) => {
          const n = getSpotEditorial(s.slug)?.facilities.length ?? 0;
          return (
            <Link
              key={s.slug}
              href={`/ja/spot/${s.slug}`}
              className="border border-gray-100 dark:border-gray-800 hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-gray-800 rounded-xl px-3 py-3 transition-colors"
            >
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {s.type === "station" ? "🚉" : "📍"} {s.names.ja}
              </p>
              {n > 0 && <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{n}か所の公式情報</p>}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
