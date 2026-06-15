"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "ftj_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[2000] bg-gray-900 text-white px-5 py-4 shadow-2xl">
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        <p className="text-sm text-gray-200 leading-relaxed">
          🍪 We use cookies to improve your experience and show relevant ads.
          See our{" "}
          <Link href="/privacy" className="underline text-sky-300 hover:text-sky-200">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={decline}
            className="text-sm text-gray-400 hover:text-gray-200 px-4 py-2 rounded-lg transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm bg-sky-500 hover:bg-sky-400 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
