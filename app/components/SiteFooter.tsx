"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 全ページ共通フッター（2026-09-06、AdSense対策・ROADMAP.md参照）。
// 従来は共通ヘッダー/フッターが無く、About・Privacy・お問い合わせへのリンクが
// ほぼ全ページから辿れなかった（JA/ZH/KO配下はポリシーページ自体が無い）ため、
// 全言語のページから同じ導線でポリシー・連絡先・出典に到達できるようにする。
// /map は全画面アプリ（ウィジェット埋め込みでも使用）のため対象外。

export const CONTACT_FORM_URL = "https://forms.gle/rs3vP7d6srW1pGHs7";

type Lang = "en" | "ja" | "zh" | "ko";

export function detectLang(pathname: string): Lang {
  if (pathname === "/ja" || pathname.startsWith("/ja/")) return "ja";
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return "zh";
  if (pathname === "/ko" || pathname.startsWith("/ko/")) return "ko";
  return "en";
}

export function isChromeless(pathname: string): boolean {
  return pathname === "/map" || pathname === "/offline";
}

const T: Record<Lang, {
  home: string; map: string; guides: string; faq: string; about: string;
  privacy: string; attribution: string; contact: string;
  tagline: string; disclosure: string; data: string; policyNote: string;
}> = {
  en: {
    home: "Home", map: "Toilet Map", guides: "Travel Guides", faq: "FAQ", about: "About",
    privacy: "Privacy Policy", attribution: "Data Sources & Attribution", contact: "Contact",
    tagline: "Clean, family-friendly toilets with baby changing tables across Japan — built by a parent living in Japan.",
    disclosure: "Family Toilet Japan participates in Google AdSense and affiliate programs (Rakuten, Klook, Amazon). Links marked as ads may earn us a commission at no extra cost to you.",
    data: "Toilet data © OpenStreetMap contributors (ODbL) and municipal open data (CC BY).",
    policyNote: "",
  },
  ja: {
    home: "ホーム", map: "トイレマップ", guides: "旅行ガイド", faq: "よくある質問", about: "サイトについて",
    privacy: "プライバシーポリシー", attribution: "データ出典", contact: "お問い合わせ",
    tagline: "日本全国のおむつ替え台付き・子連れにやさしいトイレを探せる地図。日本在住の親が運営しています。",
    disclosure: "当サイトはGoogle AdSenseおよびアフィリエイトプログラム（楽天・Klook・Amazon）を利用しています。広告表記のあるリンクから手数料を得る場合があります。",
    data: "トイレデータ © OpenStreetMap contributors（ODbL）および自治体オープンデータ（CC BY）。",
    policyNote: "（サイト情報・ポリシーページは英語です）",
  },
  zh: {
    home: "首頁", map: "廁所地圖", guides: "旅遊指南", faq: "常見問題", about: "關於本站",
    privacy: "隱私權政策", attribution: "資料來源", contact: "聯絡我們",
    tagline: "尋找日本各地設有換尿布台、適合親子的乾淨廁所，由居住在日本的家長營運。",
    disclosure: "本站使用 Google AdSense 及聯盟行銷計畫（樂天、Klook、Amazon）。標示為廣告的連結可能為本站帶來佣金，您無需額外付費。",
    data: "廁所資料 © OpenStreetMap 貢獻者（ODbL）及各地方政府開放資料（CC BY）。",
    policyNote: "（網站資訊與政策頁面為英文）",
  },
  ko: {
    home: "홈", map: "화장실 지도", guides: "여행 가이드", faq: "자주 묻는 질문", about: "사이트 소개",
    privacy: "개인정보 처리방침", attribution: "데이터 출처", contact: "문의하기",
    tagline: "일본 전역의 기저귀 교환대가 있는 가족 친화적 화장실을 찾는 지도. 일본에 거주하는 부모가 운영합니다.",
    disclosure: "본 사이트는 Google AdSense 및 제휴 프로그램(라쿠텐, Klook, Amazon)을 이용합니다. 광고 표시가 있는 링크를 통해 추가 비용 없이 수수료를 받을 수 있습니다.",
    data: "화장실 데이터 © OpenStreetMap 기여자(ODbL) 및 지방자치단체 공개 데이터(CC BY).",
    policyNote: "(사이트 정보 및 정책 페이지는 영어입니다)",
  },
};

export default function SiteFooter() {
  const pathname = usePathname() ?? "/";
  if (isChromeless(pathname)) return null;
  const lang = detectLang(pathname);
  const t = T[lang];
  const home = lang === "en" ? "/" : `/${lang}`;
  const year = new Date().getFullYear();

  const linkCls = "text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors";

  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm">
      <div className="max-w-5xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-bold text-gray-800 dark:text-gray-100 mb-2">🚻 Family Toilet Japan</p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.tagline}</p>
        </div>
        <nav aria-label="Site" className="grid grid-cols-2 gap-x-6 gap-y-2">
          <Link href={home} className={linkCls}>{t.home}</Link>
          <Link href="/map" className={linkCls}>{t.map}</Link>
          <Link href={`${home}#guides`} className={linkCls}>{t.guides}</Link>
          <Link href="/faq" className={linkCls}>{t.faq}</Link>
          <Link href="/about" className={linkCls}>{t.about}</Link>
          <Link href="/privacy" className={linkCls}>{t.privacy}</Link>
          <Link href="/attribution" className={linkCls}>{t.attribution}</Link>
          <a href={CONTACT_FORM_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>{t.contact} ↗</a>
          {t.policyNote && <p className="col-span-2 text-xs text-gray-400 mt-1">{t.policyNote}</p>}
        </nav>
        <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed space-y-2">
          <p>{t.disclosure}</p>
          <p>{t.data}</p>
          <p>© {year} Family Toilet Japan</p>
        </div>
      </div>
    </footer>
  );
}
