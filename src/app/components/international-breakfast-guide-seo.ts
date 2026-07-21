import type { Metadata } from "next";
import {
  absoluteUrl,
  arabicBreakfastBlogUrl,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  englishBreakfastBlogUrl,
  jsonLd,
  koreanHoneyKaymakBlogUrl,
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
  ko: koreanHoneyKaymakBlogUrl,
  "x-default": englishBreakfastBlogUrl,
} as const;

const keywords = {
  en: ["Turkish breakfast Istanbul", "Van breakfast", "breakfast near Taksim", "traditional Turkish breakfast", "Beyoğlu breakfast"],
  ru: ["турецкий завтрак Стамбул", "ванский завтрак", "завтрак рядом с Таксим", "где позавтракать в Стамбуле", "завтрак Бейоглу"],
  ar: ["فطور تركي في إسطنبول", "فطور فان", "فطور قريب من تقسيم", "مطعم فطور إسطنبول", "فطور بيوغلو"],
  ko: ["이스탄불 발 카이막", "터키 카이막 맛집", "이스탄불 카이막 맛집", "탁심 아침 식사", "탁심 카이막", "베요글루 아침 식사", "터키식 아침 식사", "반 아침 식사", "꿀 카이막"],
} as const;

export function buildGuideMetadata(guide: GuideContent): Metadata {
  const canonical = absoluteUrl(guide.path);
  const image = absoluteUrl(guide.media?.og ?? "/images/og/van-kahvaltisi.jpg");

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
    ...(guide.travelerBrief ? [
      guide.travelerBrief.intro,
      ...guide.travelerBrief.facts.flatMap((fact) => [fact.label, fact.value]),
      ...guide.travelerBrief.comparison.rows.flatMap((row) => [row.name, row.texture, row.taste]),
      ...guide.travelerBrief.phrases.items.flatMap((phrase) => [phrase.turkish, phrase.korean]),
    ] : []),
  ].join(" ");

  return copy.trim().split(/\s+/u).length;
}

export function buildGuideJsonLd(guide: GuideContent) {
  const pageUrl = absoluteUrl(guide.path);
  const primaryImage = absoluteUrl(guide.media?.og ?? "/images/og/van-kahvaltisi.jpg");
  const articleImages = [
    primaryImage,
    absoluteUrl(guide.media?.hero ?? "/images/hero-parallax/overhead-feast.webp"),
    absoluteUrl(guide.media?.article ?? "/images/hands-table.webp"),
  ];
  const defaultAbout = [
    { "@type": "Thing", name: "Van breakfast", sameAs: guide.sources.items[0].url },
    { "@type": "Place", name: "Beyoğlu, Istanbul" },
  ];
  const defaultMentions = [
    { "@type": "Thing", name: guide.table.items[0].name, sameAs: guide.sources.items[1].url },
    { "@type": "Thing", name: guide.table.items[1].name, sameAs: guide.sources.items[2].url },
    { "@type": "Thing", name: guide.table.items[2].name, sameAs: guide.sources.items[3].url },
  ];

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
        articleSection: guide.seo?.articleSection ?? "Turkish breakfast guide",
        keywords: keywords[guide.locale].join(", "),
        citation: guide.sources.items.map((source) => source.url),
        image: articleImages,
        author: {
          "@type": "Organization",
          "@id": `${siteUrl}/#restaurant`,
          name: siteName,
          url: siteUrl,
        },
        publisher: { "@id": `${siteUrl}/#restaurant` },
        about: guide.seo?.about.map((name) => ({ "@type": "Thing", name })) ?? defaultAbout,
        mentions: [
          ...(guide.seo?.mentions.map((name) => ({ "@type": "Thing", name })) ?? defaultMentions),
          ...(guide.seo?.menuItem ? [{
            "@type": "MenuItem",
            name: guide.seo.menuItem.name,
            description: guide.seo.menuItem.description,
            url: absoluteUrl(guide.seo.menuItem.url),
            image: absoluteUrl(guide.media?.article ?? "/images/hands-table.webp"),
          }] : []),
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: guide.title,
        description: guide.description,
        inLanguage: guide.languageTag,
        dateModified: modifiedDate,
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
      buildBreadcrumbJsonLd(
        pageUrl,
        guide.title,
        false,
        siteName,
        guide.locale === "en" ? `${siteUrl}/en` : siteUrl,
      ),
      buildFaqJsonLd(guide.faq.items, pageUrl, false, guide.languageTag),
    ],
  };

  return jsonLd(document);
}
