import type { Metadata } from "next";
import ClientPage from "./client-page";
import { HomeContent } from "./home-content";
import {
  buildHomeWebPageJsonLd,
  buildRestaurantJsonLd,
  buildWebsiteJsonLd,
  jsonLd,
  siteUrl,
} from "./seo";

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

export default function Home() {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebsiteJsonLd(false),
      buildRestaurantJsonLd(false),
      buildHomeWebPageJsonLd(false),
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
