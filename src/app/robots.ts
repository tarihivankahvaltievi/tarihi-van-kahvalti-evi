import type { MetadataRoute } from "next";
import { siteUrl } from "./seo";

const aiDiscoveryBots = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Anthropic-ai",
  "Applebot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "CCBot",
  "YouBot",
  "cohere-ai",
];

const yandexBots = [
  "Yandex",
  "YandexBot",
  "YandexImages",
  "YandexMobileBot",
  "YandexAccessibilityBot",
];

export default function robots(): MetadataRoute.Robots {
  const siteHost = new URL(siteUrl).host;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/server/"],
      },
      {
        userAgent: yandexBots,
        allow: ["/", "/sitemap.xml", "/business-profile.json", "/zavtrak-taksim-stambul"],
        disallow: ["/api/", "/_next/server/"],
      },
      {
        userAgent: aiDiscoveryBots,
        allow: ["/", "/llms.txt", "/llms-full.txt", "/business-profile.json"],
        disallow: ["/api/", "/_next/server/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteHost,
  };
}
