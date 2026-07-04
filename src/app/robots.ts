import type { MetadataRoute } from "next";
import { siteUrl } from "./seo";

const aiDiscoveryBots = [
  "OAI-SearchBot",
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
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/server/"],
      },
      {
        userAgent: aiDiscoveryBots,
        allow: ["/", "/llms.txt", "/llms-full.txt", "/business-profile.json"],
        disallow: ["/api/", "/_next/server/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
