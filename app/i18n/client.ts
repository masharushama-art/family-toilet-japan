"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { defaultLocale } from "./settings";

const resources: Record<string, Record<string, Record<string, string>>> = {};

export async function initI18n(locale: string) {
  if (i18n.isInitialized && i18n.language === locale) return i18n;

  if (!resources[locale]) {
    const mod = await fetch(`/locales/${locale}/common.json`);
    resources[locale] = { common: await mod.json() };
  }

  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      lng: locale,
      fallbackLng: defaultLocale,
      resources: Object.fromEntries(
        Object.entries(resources).map(([lng, ns]) => [lng, ns])
      ),
      ns: ["common"],
      defaultNS: "common",
      interpolation: { escapeValue: false },
    });
  } else {
    i18n.changeLanguage(locale);
    if (!i18n.hasResourceBundle(locale, "common")) {
      i18n.addResourceBundle(locale, "common", resources[locale].common);
    }
  }

  return i18n;
}

export { i18n };
