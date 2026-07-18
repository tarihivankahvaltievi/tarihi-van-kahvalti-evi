import type { MetadataRoute } from "next";
import { absoluteUrl, defaultOgImagePath, englishUrl, siteUrl } from "./seo";

// Yalnızca sayfa içeriği gerçekten değiştiğinde güncelleyin. Google, doğru ve
// tutarlı lastmod değerini kullanır; her derlemede "şimdi" yazmak yanıltıcıdır.
const contentLastModified = "2026-07-19T00:00:00+03:00";

const homeLanguageAlternates = {
  languages: {
    tr: siteUrl,
    en: englishUrl,
    "x-default": siteUrl,
  },
};

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
        absoluteUrl("/images/breakfast-spread.webp"),
        absoluteUrl("/images/balcony-breakfast.webp"),
        absoluteUrl("/images/hands-table.webp"),
      ]),
      alternates: homeLanguageAlternates,
    },
    {
      url: `${siteUrl}/menu`,
      lastModified: contentLastModified,
      images: uniqueImages([
        absoluteUrl("/images/og/menu.jpg"),
        absoluteUrl("/images/breakfast-spread.webp"),
        absoluteUrl("/images/sucuk-egg.webp"),
        absoluteUrl("/images/kete-detail.jpg"),
      ]),
    },
    {
      url: `${siteUrl}/konum`,
      lastModified: contentLastModified,
      images: uniqueImages([
        absoluteUrl("/images/street-table.webp"),
        absoluteUrl("/images/interior-chair.webp"),
        absoluteUrl("/images/historic-mirror.webp"),
      ]),
    },
    {
      url: englishUrl,
      lastModified: contentLastModified,
      images: uniqueImages([
        absoluteUrl("/images/og/van-kahvaltisi.jpg"),
        absoluteUrl("/images/breakfast-spread.webp"),
        absoluteUrl("/images/street-table.webp"),
      ]),
      alternates: homeLanguageAlternates,
    },
  ];
}
