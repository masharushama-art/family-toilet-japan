import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "./i18n/provider";
import AdSense from "./components/AdSense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Family Toilet Japan" />
      </head>
      <body className="min-h-full flex flex-col">
        <AdSense />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
