"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { detectLang, isChromeless } from "./SiteFooter";

// 全ページ共通の簡易ナビ（2026-09-06、AdSense対策・ROADMAP.md参照）。
// 各ページのヒーローにある「← Family Toilet Japan」戻りリンクは残し、
// その上に主要導線（地図・ガイド・FAQ・About）を1行で出す。

const NAV = {
  en: { map: "Map", guides: "Guides", faq: "FAQ", about: "About" },
  ja: { map: "地図", guides: "ガイド", faq: "FAQ", about: "About" },
  zh: { map: "地圖", guides: "指南", faq: "FAQ", about: "關於" },
  ko: { map: "지도", guides: "가이드", faq: "FAQ", about: "소개" },
} as const;

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  if (isChromeless(pathname)) return null;
  const lang = detectLang(pathname);
  const t = NAV[lang];
  const home = lang === "en" ? "/" : `/${lang}`;
  const linkCls = "text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors";

  return (
    <header className="border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur text-sm">
      <div className="max-w-5xl mx-auto px-4 h-11 flex items-center justify-between gap-4">
        <Link href={home} className="font-bold text-gray-800 dark:text-gray-100 whitespace-nowrap">🚻 Family Toilet Japan</Link>
        <nav aria-label="Primary" className="flex items-center gap-4">
          <Link href="/map" className={linkCls}>{t.map}</Link>
          <Link href={`${home}#guides`} className={linkCls}>{t.guides}</Link>
          <Link href="/faq" className={linkCls}>{t.faq}</Link>
          <Link href="/about" className={linkCls}>{t.about}</Link>
        </nav>
      </div>
    </header>
  );
}
