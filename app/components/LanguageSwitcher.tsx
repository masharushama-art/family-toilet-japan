"use client";

import { useState } from "react";
import { locales, localeNames, type Locale } from "../i18n/settings";

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<Locale>("en");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
      >
        {localeNames[locale]} ▾
      </button>
      {open && (
        <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg py-1 z-10 min-w-[80px]">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => { setLocale(l); setOpen(false); }}
              className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 ${l === locale ? "text-sky-600 font-medium" : "text-gray-700"}`}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
