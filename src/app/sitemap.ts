import type { MetadataRoute } from "next";
import {
  absoluteUrl,
  defaultOgImagePath,
  siteUrl,
} from "./seo";

// Yalnızca sayfa içeriği gerçekten değiştiğinde güncelleyin. Google, doğru ve
// tutarlı lastmod değerini kullanır; her derlemede "şimdi" yazmak yanıltıcıdır.
const contentLastModified = "2026-07-15";

function uniqueImages(images: string[]) {
  return [...new Set(images)];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
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
}
