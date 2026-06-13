"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation as useI18nextTranslation } from "react-i18next";
import { locales, defaultLocale, type Locale } from "./settings";

let initialized = false;

async function loadResources(locale: Locale) {
  const res = await fetch(`/locales/${locale}/common.json`);
  return res.json();
}

async function ensureI18n(locale: Locale) {
  if (!initialized) {
    const translations = await loadResources(locale);
    await i18n.use(initReactI18next).init({
      lng: locale,
      fallbackLng: defaultLocale,
      resources: { [locale]: { common: translations } },
      ns: ["common"],
      defaultNS: "common",
      interpolation: { escapeValue: false },
    });
    initialized = true;
  } else {
    if (!i18n.hasResourceBundle(locale, "common")) {
      const translations = await loadResources(locale);
      i18n.addResourceBundle(locale, "common", translations);
    }
    await i18n.changeLanguage(locale);
  }
}

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    ensureI18n(locale).then(() => setReady(true));
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    ensureI18n(l);
  }, []);

  const t = useCallback((key: string): string => {
    if (!ready) return key;
    return i18n.t(key);
  }, [ready, locale]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
