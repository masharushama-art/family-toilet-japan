"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "pwa-banner-dismissed-until";
const DISMISS_DAYS = 7;

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window as unknown as Record<string, unknown>).MSStream;
}

function isInStandaloneMode() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true;
}

export default function InstallBanner() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOS, setShowIOS] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isInStandaloneMode()) return; // 既にインストール済み

    const dismissedUntil = localStorage.getItem(DISMISS_KEY);
    if (dismissedUntil && Date.now() < Number(dismissedUntil)) return;

    if (isIOS()) {
      // iOSはbeforeinstallpromptが発火しないので手動表示
      setTimeout(() => setShowIOS(true), 3000);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    if (prompt || showIOS) {
      setTimeout(() => setVisible(true), 100); // アニメーション用の遅延
    }
  }, [prompt, showIOS]);

  const dismiss = () => {
    const until = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(DISMISS_KEY, String(until));
    setVisible(false);
    setTimeout(() => { setPrompt(null); setShowIOS(false); }, 300);
  };

  const handleInstall = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem(DISMISS_KEY, String(Date.now() + 365 * 24 * 60 * 60 * 1000));
    }
    dismiss();
  };

  if (!prompt && !showIOS) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[2000] transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl mx-0 rounded-t-2xl px-5 py-4">
        {/* ハンドル */}
        <div className="flex justify-center mb-3">
          <div className="w-8 h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>

        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center text-2xl flex-shrink-0 shadow">
            🚽
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 dark:text-white text-base">Family Toilet Japan</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Works offline · 16,000+ toilets · No sign-up
            </p>
            <div className="flex gap-3 mt-2 text-xs text-sky-600 dark:text-sky-400 font-medium">
              <span>🍼 Baby changing</span>
              <span>♿ Wheelchair</span>
              <span>📍 GPS</span>
            </div>
          </div>
          <button
            onClick={dismiss}
            aria-label="Dismiss install banner"
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg flex-shrink-0 -mt-1"
          >✕</button>
        </div>

        {showIOS ? (
          /* iOS 用：手順説明 */
          <div className="bg-sky-50 dark:bg-sky-900/30 rounded-xl px-4 py-3 mb-3">
            <p className="text-sm font-semibold text-sky-800 dark:text-sky-300 mb-2">
              Add to Home Screen
            </p>
            <div className="space-y-1 text-xs text-sky-700 dark:text-sky-400">
              <p>1. Tap <span className="font-bold">Share</span> <span className="text-base">⬆️</span> in Safari</p>
              <p>2. Scroll down and tap <span className="font-bold">Add to Home Screen</span></p>
              <p>3. Tap <span className="font-bold">Add</span> — done!</p>
            </div>
          </div>
        ) : (
          /* Android 用：インストールボタン */
          <button
            onClick={handleInstall}
            className="w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
          >
            📲 Add to Home Screen — Free
          </button>
        )}

        <p className="text-center text-xs text-gray-400 mt-2">
          We&apos;ll ask again in {DISMISS_DAYS} days if you skip
        </p>
      </div>
    </div>
  );
}
