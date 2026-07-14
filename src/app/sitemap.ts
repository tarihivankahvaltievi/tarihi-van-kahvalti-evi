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

function uniqueImages(images: string[]) {
  return [...new Set(images)];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
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
    images: uniqueImages([absoluteUrl(pageOgImagePath(page.slug)), absoluteUrl(page.image)]),
  }));

  return [...staticRoutes, ...seoRoutes];
}
