"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallBanner() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("pwa-banner-dismissed")) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!prompt || dismissed) return null;

  const handleInstall = async () => {
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted" || outcome === "dismissed") {
      setDismissed(true);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-banner-dismissed", "1");
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[2000] bg-white border-t border-gray-200 shadow-lg px-4 py-3 flex items-center gap-3">
      <span className="text-2xl">🚽</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 text-sm">Add to Home Screen</p>
        <p className="text-xs text-gray-500">Works offline · No registration</p>
      </div>
      <button
        onClick={handleInstall}
        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors flex-shrink-0"
      >
        Install
      </button>
      <button
        onClick={handleDismiss}
        className="text-gray-400 hover:text-gray-600 text-xl flex-shrink-0"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
