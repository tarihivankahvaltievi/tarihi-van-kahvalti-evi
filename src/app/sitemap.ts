import type { MetadataRoute } from "next";
import { absoluteUrl, seoPages, siteUrl } from "./seo";

const lastModified = new Date("2026-07-04T00:00:00+03:00");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        absoluteUrl("/images/hero-table.jpg"),
        absoluteUrl("/images/breakfast-spread.jpg"),
        absoluteUrl("/images/balcony-breakfast.jpg"),
      ],
    },
    {
      url: absoluteUrl("/llms.txt"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/llms-full.txt"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const seoRoutes: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: absoluteUrl(page.slug),
    lastModified,
    changeFrequency:
      page.slug === "menu" || page.slug === "kahvalti-fiyatlari" ? "weekly" : "monthly",
    priority: page.slug === "menu" || page.slug === "iletisim" ? 0.9 : 0.75,
    images: [absoluteUrl(page.image)],
  }));

  return [...staticRoutes, ...seoRoutes];
}
