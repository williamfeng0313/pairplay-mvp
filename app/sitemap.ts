import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = [
    "",
    "/games",
    "/would-you-rather-questions-for-couples",
    "/this-or-that-for-couples",
    "/couple-questions",
    "/couple-quiz",
    "/couple-compatibility-test",
    "/long-distance-couple-games",
    "/date-night-games",
    "/about",
    "/privacy",
    "/terms"
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
