import type { Metadata } from "next";
import DataReport from "../components/DataReport";

const BASE = "https://familytoiletjapan.com";

// 旧版は47都市×4列の数値表のみで noindex だった（2026-09-06）。データの出どころ・網羅度・限界・
// 更新履歴を示すデータレポートに作り替え、インデックス対象にした（2026-09-23、ROADMAP.md参照）
export const metadata: Metadata = {
  title: "Japan Family Toilet Data Report — Sources, Coverage & Monthly Updates | Family Toilet Japan",
  description:
    "How many public toilets with baby changing tables and wheelchair access we map in Japan, where the data comes from (OpenStreetMap and municipal open data), its limits, and how it changes every month.",
  alternates: {
    canonical: `${BASE}/coverage`,
    languages: { en: `${BASE}/coverage`, ja: `${BASE}/ja/coverage`, "x-default": `${BASE}/coverage` },
  },
};

export default function CoveragePage() {
  return <DataReport lang="en" />;
}
