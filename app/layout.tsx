import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "./i18n/provider";
import InstallBanner from "./components/InstallBanner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  themeColor: "#0ea5e9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* hreflang: 多言語SEO */}
        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="ja" href={`${BASE_URL}/ja`} />
        <link rel="alternate" hrefLang="zh-TW" href={`${BASE_URL}/zh`} />
        <link rel="alternate" hrefLang="zh-CN" href={`${BASE_URL}/zh`} />
        <link rel="alternate" hrefLang="ko" href={`${BASE_URL}/ko`} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Family Toilet Japan" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9686216801075877"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <I18nProvider>{children}</I18nProvider>
        <InstallBanner />
      </body>
    </html>
  );
}
