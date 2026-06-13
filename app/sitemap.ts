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

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/map`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    ...cityPages,
    ...categoryPages,
  ];
}
