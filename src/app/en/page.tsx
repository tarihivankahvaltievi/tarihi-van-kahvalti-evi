import type { Metadata } from "next";
import ClientPage from "../client-page";
import { HomeContent } from "../home-content";
import { englishFaqItems } from "../home-localization";
import {
  absoluteUrl,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  englishUrl,
  jsonLd,
  koreanUrl,
  siteName,
  siteUrl,
} from "../seo";

const englishTitle = "Turkish Breakfast Near Taksim, Istanbul | Tarihi Van";
const englishDescription =
  "Traditional Van breakfast in Beyoğlu, a short walk from Taksim Square: herb cheese, murtuğa, kavut, hot dishes and Turkish tea. See prices, hours and directions.";

export const metadata: Metadata = {
  title: { absolute: englishTitle },
  description: englishDescription,
  alternates: {
    canonical: englishUrl,
    languages: {
      tr: siteUrl,
      en: englishUrl,
      ko: koreanUrl,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    title: englishTitle,
    description: englishDescription,
    url: englishUrl,
    siteName,
    locale: "en_US",
    alternateLocale: ["tr_TR", "ko_KR"],
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/og/van-kahvaltisi.jpg"),
        width: 1200,
        height: 630,
        alt: "Traditional Van breakfast table at Tarihi Van Kahvaltı Evi in Beyoğlu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: englishTitle,
    description: englishDescription,
    images: [absoluteUrl("/images/og/van-kahvaltisi.jpg")],
  },
};

export default function EnglishHomePage() {
  const englishJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "WebPage",
        "@id": `${englishUrl}#webpage`,
        url: englishUrl,
        name: englishTitle,
        description: englishDescription,
        inLanguage: "en",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        mainEntity: { "@id": `${siteUrl}/#restaurant` },
        translationOfWork: { "@id": `${siteUrl}/#webpage` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/og/van-kahvaltisi.jpg"),
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${englishUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Tarihi Van Kahvaltı Evi", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "English visitor guide", item: englishUrl },
        ],
      },
      buildFaqJsonLd(englishFaqItems, englishUrl, false, "en"),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(englishJsonLd) }} />
      <ClientPage locale="en">
        <HomeContent locale="en" />
      </ClientPage>
    </>
  );
}
