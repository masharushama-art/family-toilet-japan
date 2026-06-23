import type { MetadataRoute } from "next";

const BASE_URL = "https://family-toilet-japan.vercel.app";

const CITY_SLUGS = [
  "tokyo","yokohama","chiba","saitama","ibaraki","tochigi","gunma",
  "osaka","kyoto","nara","kobe","shiga","wakayama",
  "nagoya","niigata","toyama","kanazawa","fukui","yamanashi","nagano","shizuoka","gifu","mie",
  "sendai","aomori","iwate","akita","yamagata","fukushima",
  "sapporo",
  "hiroshima","okayama","tottori","shimane","yamaguchi",
  "kagawa","ehime","kochi","tokushima",
  "fukuoka","saga","nagasaki","kumamoto","oita","miyazaki","kagoshima",
  "okinawa",
];

const CATEGORY_SLUGS = ["changing-table", "wheelchair", "free"];

const ZH_KO_CITIES = ["tokyo","osaka","kyoto","nagoya","yokohama","fukuoka","sapporo","nara","kobe","hiroshima","sendai","kanazawa","okinawa","chiba","saitama"];

const GUIDE_SLUGS = [
  "how-to-use-japanese-toilet",
  "japan-travel-with-baby",
  "best-baby-changing-facilities-tokyo",
  "japan-toilet-etiquette",
  "osaka-family-travel-tips",
  "nagoya-family-travel-tips",
  "kyoto-with-baby",
  "sapporo-family-travel-tips",
  "fukuoka-family-travel-tips",
  "sendai-family-travel-tips",
  "hiroshima-family-travel-tips",
  "naha-okinawa-family-travel-tips",
  "yokohama-family-travel-tips",
  "tokyo-with-baby-winter",
  "japan-train-travel-with-stroller",
  "best-baby-changing-facilities-osaka",
  "japan-family-restaurants-guide",
  "traveling-japan-with-toddler-checklist",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const cityPages = CITY_SLUGS.map((city) => ({
    url: `${BASE_URL}/${city}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryPages = CITY_SLUGS.flatMap((city) =>
    CATEGORY_SLUGS.map((cat) => ({
      url: `${BASE_URL}/${city}/${cat}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  const guidePages = GUIDE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/guide/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const jaCityPages = CITY_SLUGS.map((city) => ({
    url: `${BASE_URL}/ja/${city}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const zhCityPages = ZH_KO_CITIES.map((city) => ({
    url: `${BASE_URL}/zh/${city}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const koCityPages = ZH_KO_CITIES.map((city) => ({
    url: `${BASE_URL}/ko/${city}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const langPages = ["ja", "zh", "ko"].map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/map`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/attribution`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ...langPages,
    ...guidePages,
    ...cityPages,
    ...jaCityPages,
    ...zhCityPages,
    ...koCityPages,
    ...categoryPages,
  ];
}
