import type { MetadataRoute } from "next";
import { CITIES, CATEGORIES } from "./lib/toilet-data";

const BASE_URL = "https://family-toilet-japan.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const cityPages = Object.keys(CITIES).map((city) => ({
    url: `${BASE_URL}/${city}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryPages = Object.keys(CITIES).flatMap((city) =>
    Object.keys(CATEGORIES).map((category) => ({
      url: `${BASE_URL}/${city}/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  const guidePages = [
    "how-to-use-japanese-toilet",
    "japan-travel-with-baby",
    "best-baby-changing-facilities-tokyo",
    "japan-toilet-etiquette",
    "osaka-family-travel-tips",
    "nagoya-family-travel-tips",
    "kyoto-with-baby",
    "sapporo-family-travel-tips",
    "fukuoka-family-travel-tips",
  ].map((slug) => ({
    url: `${BASE_URL}/guide/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const jaCityPages = Object.keys(CITIES).map((city) => ({
    url: `${BASE_URL}/ja/${city}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const zhKoCities = ["tokyo","osaka","kyoto","nagoya","yokohama","fukuoka","sapporo","nara","kobe","hiroshima","sendai","kanazawa","okinawa","chiba","saitama"];
  const zhCityPages = zhKoCities.map((city) => ({
    url: `${BASE_URL}/zh/${city}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
  const koCityPages = zhKoCities.map((city) => ({
    url: `${BASE_URL}/ko/${city}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const langPages = ["ja", "zh", "ko"].map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/map`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...langPages,
    ...jaCityPages,
    ...zhCityPages,
    ...koCityPages,
    ...guidePages,
    ...cityPages,
    ...categoryPages,
  ];
}
