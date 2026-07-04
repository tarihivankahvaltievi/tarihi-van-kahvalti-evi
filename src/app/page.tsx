import ClientPage from "./client-page";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildHomeWebPageJsonLd,
  buildImageGalleryJsonLd,
  buildLocalPagesItemListJsonLd,
  buildMenuJsonLd,
  buildRestaurantJsonLd,
  buildWebsiteJsonLd,
  faqItems,
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
      buildImageGalleryJsonLd(false),
      buildLocalPagesItemListJsonLd(false),
      buildFaqJsonLd(faqItems, siteUrl, false),
      buildBreadcrumbJsonLd([{ name: "Ana Sayfa", url: siteUrl }], siteUrl, false),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(homeJsonLd) }}
      />
      <ClientPage />
    </>
  );
}
