import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "./i18n/provider";
import InstallBanner from "./components/InstallBanner";
import CookieConsent from "./components/CookieConsent";
import SiteHeader from "./components/SiteHeader";
import SiteFooter, { CONTACT_FORM_URL } from "./components/SiteFooter";

const BASE_URL = "https://familytoiletjapan.com";

// 運営者の識別情報（AdSense対策・ROADMAP.md参照）
const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Family Toilet Japan",
      url: BASE_URL,
      logo: `${BASE_URL}/icons/icon-192.png`,
      contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: CONTACT_FORM_URL },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Family Toilet Japan",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: ["en", "ja", "zh-TW", "ko"],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  verification: {
    google: "CPvNg7WeDBQDJVze4wOc7083G_Tfpk43NKhqxIKPqd4",
  },
  title: "Family Toilet Japan",
  description: "Find family-friendly toilets with baby changing tables in Japan",
  manifest: "/manifest.json",
  keywords: ["family friendly toilet japan", "baby changing room japan", "toilet with baby chair japan"],
  openGraph: {
    title: "Family Toilet Japan",
    description: "Find family-friendly toilets with baby changing tables in Japan",
    type: "website",
    url: BASE_URL,
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Family Toilet Japan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Family Toilet Japan",
    description: "Find family-friendly toilets with baby changing tables in Japan",
    images: [`${BASE_URL}/og-image.png`],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0ea5e9" },
    { media: "(prefers-color-scheme: dark)",  color: "#1f2937" },
  ],
  width: "device-width",
  initialScale: 1,
  // maximumScale は指定しない → Lighthouse アクセシビリティ改善・ユーザーのピンチズームを許可
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Family Toilet Japan" />
        {/* 主要都市データの先読み */}
        {["tokyo","osaka","kyoto","nagoya","yokohama","fukuoka","sapporo","nara"].map((c) => (
          <link key={c} rel="prefetch" href={`/data/cities/${c}.json`} as="fetch" crossOrigin="anonymous" />
        ))}
        {/* Google Consent Mode v2 — GA4/AdSenseより前に既定値を設定する。
            未同意(または拒否)なら denied、過去にAcceptしていれば granted。
            CookieConsent.tsx の Accept/Decline で gtag('consent','update') を呼ぶ。 */}
        <Script id="consent-default" strategy="beforeInteractive">{`
          window.dataLayer=window.dataLayer||[];
          function gtag(){dataLayer.push(arguments);}
          var c=null;try{c=localStorage.getItem('ftj_cookie_consent');}catch(e){}
          var g=(c==='accepted')?'granted':'denied';
          gtag('consent','default',{ad_storage:g,ad_user_data:g,ad_personalization:g,analytics_storage:g,wait_for_update:500});
        `}</Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSON_LD) }} />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <I18nProvider>{children}</I18nProvider>
        <SiteFooter />
        <InstallBanner />
        <CookieConsent />
        {/* GA4 — afterInteractive でメインスレッドをブロックしない */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0QLENNWYR2"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer=window.dataLayer||[];
          function gtag(){dataLayer.push(arguments);}
          gtag('js',new Date());
          gtag('config','G-0QLENNWYR2');
        `}</Script>
        {/* AdSense — lazyOnload でページ読み込みへの影響を最小化 */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9686216801075877"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
