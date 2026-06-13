export const locales = ["en", "zh-TW", "zh-CN", "ko"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  "zh-TW": "繁中",
  "zh-CN": "简中",
  ko: "한국어",
};
