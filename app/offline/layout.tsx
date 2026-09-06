import type { Metadata } from "next";

// offline/page.tsx は "use client" のため、この Server Component の
// layout.tsx から metadata(canonical)を付与する
export const metadata: Metadata = {
  alternates: { canonical: "https://familytoiletjapan.com/offline" },
  // PWAのオフライン用フォールバック文書。検索対象にする意味が無いため noindex（2026-09-06）
  robots: { index: false, follow: true },
};

export default function OfflineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
