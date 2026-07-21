import type { MetadataRoute } from "next";
import { siteUrl } from "./seo";

export default function robots(): MetadataRoute.Robots {
  const siteHost = new URL(siteUrl).host;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /admin is intentionally crawlable so bots can read its noindex
        // response. Blocking it here could leave the bare URL indexed.
        disallow: ["/api/admin/", "/_next/server/"],
      },
      {
        // Arama ve cevap-grounding botları wildcard kuralına zaten uyar;
        // açık grup, ileride başka genel bot politikaları eklense de keşif
        // erişimlerinin yanlışlıkla kapanmasını önler.
        userAgent: ["Googlebot", "Bingbot", "YandexBot", "Applebot", "OAI-SearchBot", "PerplexityBot"],
        allow: "/",
        disallow: ["/api/admin/", "/_next/server/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteHost,
  };
}
