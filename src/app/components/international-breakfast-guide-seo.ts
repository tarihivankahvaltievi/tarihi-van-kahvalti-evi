import type { Metadata } from "next";
import {
  absoluteUrl,
  arabicBreakfastBlogUrl,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  englishBreakfastBlogUrl,
  jsonLd,
  russianBreakfastBlogUrl,
  siteName,
  siteUrl,
} from "../seo";
import type { GuideContent } from "./international-breakfast-guide-data";

const publishedDate = "2026-07-21T09:00:00+03:00";
const modifiedDate = "2026-07-21T15:00:00+03:00";

export const guideAlternates = {
  en: englishBreakfastBlogUrl,
  ru: russianBreakfastBlogUrl,
  ar: arabicBreakfastBlogUrl,
  "x-default": englishBreakfastBlogUrl,
} as const;

const keywords = {
  en: ["Turkish breakfast Istanbul", "Van breakfast", "breakfast near Taksim", "traditional Turkish breakfast", "Beyoğlu breakfast"],
  ru: ["турецкий завтрак Стамбул", "ванский завтрак", "завтрак рядом с Таксим", "где позавтракать в Стамбуле", "завтрак Бейоглу"],
  ar: ["فطور تركي في إسطنبول", "فطور فان", "فطور قريب من تقسيم", "مطعم فطور إسطنبول", "فطور بيوغلو"],
} as const;

export function buildGuideMetadata(guide: GuideContent): Metadata {
  const canonical = absoluteUrl(guide.path);
  const image = absoluteUrl("/images/og/van-kahvaltisi.jpg");

  return {
    title: { absolute: guide.title },
    description: guide.description,
    keywords: [...keywords[guide.locale]],
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "travel and food guide",
    alternates: {
      canonical,
      languages: guideAlternates,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: canonical,
      siteName,
      locale: guide.ogLocale,
      alternateLocale: guide.ogAlternateLocales,
      type: "article",
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: [siteName],
      tags: [...keywords[guide.locale]],
      images: [{
        url: image,
        width: 1200,
        height: 630,
        alt: guide.hero.imageAlt,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: [image],
    },
  };
}

function guideWordCount(guide: GuideContent) {
  const copy = [
    guide.hero.lead,
    ...guide.shortAnswer.paragraphs,
    guide.table.intro,
    ...guide.table.items.flatMap((item) => [item.name, item.role, item.description]),
    ...guide.tradition.paragraphs,
    guide.reasons.intro,
    ...guide.reasons.items.flatMap((item) => [item.title, item.text]),
    guide.firstVisit.intro,
    ...guide.firstVisit.steps.flatMap((step) => [step.title, step.text]),
    guide.practical.text,
    ...guide.faq.items.flatMap((item) => [item.question, item.answer]),
    guide.closing.text,
  ].join(" ");

  return copy.trim().split(/\s+/u).length;
}

export function buildGuideJsonLd(guide: GuideContent) {
  const pageUrl = absoluteUrl(guide.path);
  const primaryImage = absoluteUrl("/images/og/van-kahvaltisi.jpg");

  const document = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        headline: guide.title,
        description: guide.description,
        url: pageUrl,
        mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
        inLanguage: guide.languageTag,
        datePublished: publishedDate,
        dateModified: modifiedDate,
        wordCount: guideWordCount(guide),
        articleSection: "Turkish breakfast guide",
        keywords: keywords[guide.locale].join(", "),
        image: [
          primaryImage,
          absoluteUrl("/images/hero-parallax/overhead-feast.webp"),
          absoluteUrl("/images/hands-table.webp"),
        ],
        author: {
          "@type": "Organization",
          "@id": `${siteUrl}/#restaurant`,
          name: siteName,
          url: siteUrl,
        },
        publisher: { "@id": `${siteUrl}/#restaurant` },
        about: [
          { "@type": "Thing", name: "Turkish breakfast" },
          { "@type": "Thing", name: "Van breakfast" },
          { "@type": "Place", name: "Beyoğlu, Istanbul" },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: guide.title,
        description: guide.description,
        inLanguage: guide.languageTag,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        mainEntity: { "@id": `${pageUrl}#article` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: primaryImage,
          width: 1200,
          height: 630,
          caption: guide.hero.imageAlt,
        },
      },
      buildBreadcrumbJsonLd(pageUrl, guide.title, false, siteName, guide.locale === "en" ? `${siteUrl}/en` : siteUrl),
      buildFaqJsonLd(guide.faq.items, pageUrl, false, guide.languageTag),
    ],
  };

  return jsonLd(document);
}
