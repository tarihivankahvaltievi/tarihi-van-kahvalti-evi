import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  defaultOgImagePath,
  pageOgImagePath,
  seoPages,
  siteUrl,
} from "./seo";

// Yalnızca sayfa içeriği gerçekten değiştiğinde güncelleyin. Google, doğru ve
// tutarlı lastmod değerini kullanır; her derlemede "şimdi" yazmak yanıltıcıdır.
const contentLastModified = "2026-07-15";

function uniqueImages(images: string[]) {
  return [...new Set(images)];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: contentLastModified,
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
    lastModified: contentLastModified,
    images: uniqueImages([absoluteUrl(pageOgImagePath(page.slug)), absoluteUrl(page.image)]),
  }));

  return [...staticRoutes, ...seoRoutes];
}
