import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: [
      "https://familytoiletjapan.com/sitemap.xml",
      "https://familytoiletjapan.com/sitemap-toilets.xml",
    ],
  };
}
