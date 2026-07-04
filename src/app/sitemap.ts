import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  dateModifiedIso,
  defaultOgImagePath,
  pageOgImagePath,
  seoPages,
  siteUrl,
} from "./seo";

const lastModified = new Date(dateModifiedIso);

function languageAlternates(url: string) {
  return {
    languages: {
      "tr-TR": url,
      tr: url,
      "x-default": url,
    },
  };
}

function uniqueImages(images: string[]) {
  return [...new Set(images)];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: languageAlternates(siteUrl),
      images: uniqueImages([
        absoluteUrl(defaultOgImagePath),
        absoluteUrl("/images/hero-table.jpg"),
        absoluteUrl("/images/breakfast-spread.jpg"),
        absoluteUrl("/images/balcony-breakfast.jpg"),
      ]),
    },
  ];

  const seoRoutes: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: absoluteUrl(page.slug),
    lastModified,
    changeFrequency:
      page.slug === "menu" || page.slug === "kahvalti-fiyatlari" ? "weekly" : "monthly",
    priority: page.slug === "menu" || page.slug === "iletisim" ? 0.9 : 0.75,
    alternates: languageAlternates(absoluteUrl(page.slug)),
    images: uniqueImages([absoluteUrl(pageOgImagePath(page.slug)), absoluteUrl(page.image)]),
  }));

  return [...staticRoutes, ...seoRoutes];
}
