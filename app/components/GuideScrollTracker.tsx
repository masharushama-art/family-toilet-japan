"use client";

import { useEffect, useRef } from "react";
import { track } from "../lib/analytics";

/** ガイドページのスクロール90%到達を1回だけ計測（読了率の指標） */
export default function GuideScrollTracker({ slug, lang }: { slug: string; lang: string }) {
  const fired = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (fired.current) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= 0.9) {
        fired.current = true;
        track.guideScrollComplete(slug, lang);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, lang]);

  return null;
}
