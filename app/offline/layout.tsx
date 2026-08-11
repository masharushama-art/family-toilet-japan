import type { Metadata } from "next";

// offline/page.tsx は "use client" のため、この Server Component の
// layout.tsx から metadata(canonical)を付与する
export const metadata: Metadata = {
  alternates: { canonical: "https://familytoiletjapan.com/offline" },
};

export default function OfflineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
