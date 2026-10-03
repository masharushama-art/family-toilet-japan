"use client";

import Link from "next/link";
import { trackEvent } from "../lib/analytics";

const T = {
  en: {
    button: "📍 Find the nearest toilet",
    note: "Uses your location · free, no sign-up",
    title: "Need a toilet right now?",
    desc: "Open the map and it jumps to where you are, showing the closest toilets first.",
  },
  ja: {
    button: "📍 いちばん近いトイレを探す",
    note: "現在地を使用・無料・登録不要",
    title: "いますぐトイレが必要ですか？",
    desc: "地図を開くと現在地に移動し、近くのトイレが見つかります。",
  },
};

interface Props {
  city: string;
  lang: "en" | "ja";
  variant: "hero" | "card";
  href?: string;
}

export default function NearestToiletCta({ city, lang, variant, href }: Props) {
  const t = T[lang];
  const target = href ?? `/map?city=${city}`;
  const onClick = () => trackEvent("city_nearest_cta", { city, lang, variant });

  if (variant === "hero") {
    return (
      <div className="mt-6">
        <Link
          href={target}
          onClick={onClick}
          className="inline-block bg-white text-sky-600 font-bold px-8 py-3 rounded-full hover:bg-sky-50 transition-colors"
        >
          {t.button}
        </Link>
        <p className="text-sky-100 text-xs mt-2">{t.note}</p>
      </div>
    );
  }

  return (
    <div className="bg-sky-50 dark:bg-sky-900/20 rounded-2xl p-5 mb-10 text-center">
      <p className="font-bold text-gray-800 dark:text-gray-100 mb-1">{t.title}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t.desc}</p>
      <Link
        href={target}
        onClick={onClick}
        className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3 rounded-full transition-colors"
      >
        {t.button}
      </Link>
      <p className="text-xs text-gray-400 mt-2">{t.note}</p>
    </div>
  );
}
