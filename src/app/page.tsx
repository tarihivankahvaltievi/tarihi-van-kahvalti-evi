import type { Metadata } from "next";
import ClientPage from "./client-page";
import { HomeContent } from "./home-content";
import {
  buildFaqJsonLd,
  buildHomeWebPageJsonLd,
  buildRestaurantJsonLd,
  buildWebsiteJsonLd,
  faqItems,
  jsonLd,
  siteUrl,
} from "./seo";

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
};

export default function Home() {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebsiteJsonLd(false),
      buildRestaurantJsonLd(false),
      buildHomeWebPageJsonLd(false),
      buildFaqJsonLd(faqItems, siteUrl, false),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homeJsonLd) }}
      />
      <ClientPage>
        <HomeContent />
      </ClientPage>
    </>
  );
}
