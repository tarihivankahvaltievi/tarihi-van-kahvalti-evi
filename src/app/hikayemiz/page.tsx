import type { Metadata } from "next";
import ClientPage from "../client-page";
import { AnimatedFooter } from "../components/animated-footer";
import { StoryExperience } from "./story-experience";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildRestaurantJsonLd,
  jsonLd,
  siteName,
  siteUrl,
  storyUrl,
} from "../seo";

const storyTitle = "1978'den Beri Van Sofrası | Hikâyemiz";
const storyDescription =
  "Tarihi Van Kahvaltı Evi'nin 1978'den bugüne uzanan aile yolculuğu; tarihi Rum binası, Van kahvaltısı geleneği ve Beyoğlu'ndaki sofra kültürü.";

export const metadata: Metadata = {
  title: storyTitle,
  description: storyDescription,
  alternates: { canonical: storyUrl },
  openGraph: {
    title: `${storyTitle} | ${siteName}`,
    description: storyDescription,
    url: storyUrl,
    siteName,
    locale: "tr_TR",
    type: "article",
    images: [
      {
        url: absoluteUrl("/images/historic-mirror.webp"),
        width: 1200,
        height: 800,
        alt: "Tarihi Van Kahvaltı Evi'nin oymalı aynası ve tarihi iç mekânı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${storyTitle} | ${siteName}`,
    description: storyDescription,
    images: [absoluteUrl("/images/historic-mirror.webp")],
  },
};

export default function StoryPage() {
  const storyJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "AboutPage",
        "@id": `${storyUrl}#webpage`,
        url: storyUrl,
        name: `${storyTitle} | ${siteName}`,
        description: storyDescription,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        mainEntity: { "@id": `${siteUrl}/#restaurant` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/historic-mirror.webp"),
        },
      },
      buildBreadcrumbJsonLd(storyUrl, "Hikâyemiz", false),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(storyJsonLd) }} />
      <ClientPage>
        <StoryExperience />
        <AnimatedFooter />
      </ClientPage>
    </>
  );
}
