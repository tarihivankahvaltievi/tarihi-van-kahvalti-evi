import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tarihivankahvaltievi.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://tarihivankahvaltievi.com/#menu",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://tarihivankahvaltievi.com/#faq",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }
  ];
}
