import ClientPage from "./client-page";
import { HomeContent } from "./home-content";
import {
  buildBreadcrumbJsonLd,
  buildHomeWebPageJsonLd,
  buildMenuJsonLd,
  buildRestaurantJsonLd,
  buildWebsiteJsonLd,
  jsonLd,
  siteUrl,
} from "./seo";

export default function Home() {
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebsiteJsonLd(false),
      buildRestaurantJsonLd(false),
      buildHomeWebPageJsonLd(false),
      buildMenuJsonLd(),
      buildBreadcrumbJsonLd([{ name: "Ana Sayfa", url: siteUrl }], siteUrl, false),
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
