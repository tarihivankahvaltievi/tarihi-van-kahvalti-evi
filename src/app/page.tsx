import ClientPage from "./client-page";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMenuJsonLd,
  buildRestaurantJsonLd,
  jsonLd,
  siteUrl,
} from "./seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildRestaurantJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({ "@context": "https://schema.org", ...buildMenuJsonLd() }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(buildFaqJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(buildBreadcrumbJsonLd([{ name: "Ana Sayfa", url: siteUrl }])),
        }}
      />
      <ClientPage />
    </>
  );
}
