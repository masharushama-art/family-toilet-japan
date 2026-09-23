import type { Metadata } from "next";
import DataReport from "../../components/DataReport";

const BASE = "https://familytoiletjapan.com";

export const metadata: Metadata = {
  title: "日本のファミリートイレ・データレポート — データの出どころ・網羅度・毎月の更新 | Family Toilet Japan",
  description:
    "当サイトが収録するおむつ交換台付き・車いす対応トイレの件数、データの出どころ（OpenStreetMap・自治体オープンデータ）、分かること・分からないこと、毎月の更新履歴を公開しています。",
  alternates: {
    canonical: `${BASE}/ja/coverage`,
    languages: { en: `${BASE}/coverage`, ja: `${BASE}/ja/coverage`, "x-default": `${BASE}/coverage` },
  },
};

export default function JaCoveragePage() {
  return <DataReport lang="ja" />;
}
