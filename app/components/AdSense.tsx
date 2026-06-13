"use client";

import Script from "next/script";

// AdSenseアカウント取得後にここを更新
const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || "";

export default function AdSense() {
  if (!PUBLISHER_ID) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}

/** インライン広告ユニット（マップ画面下部等に配置） */
export function AdUnit({ slot }: { slot: string }) {
  if (!PUBLISHER_ID) return null;

  return (
    <div className="w-full overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
