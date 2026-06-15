import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "./i18n/provider";
import InstallBanner from "./components/InstallBanner";
import CookieConsent from "./components/CookieConsent";

const BASE_URL = "https://family-toilet-japan.vercel.app";

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
      </head>
      <body className="min-h-full flex flex-col">
        <I18nProvider>{children}</I18nProvider>
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
