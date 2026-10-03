import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://twolumi.com";

  const routes = [
    "",
    "/games",
    "/photo-booth",
    "/would-you-rather-questions-for-couples",
    "/this-or-that-for-couples",
    "/couple-questions",
    "/couple-quiz",
    "/couple-compatibility-test",
    "/long-distance-couple-games",
    "/long-distance-date-ideas",
    "/questions-for-long-distance-couples",
    "/date-night-games",
    "/about",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === ""
        ? "weekly"
        : "monthly",
    priority:
      route === ""
        ? 1
        : 0.8,
  }));
}
