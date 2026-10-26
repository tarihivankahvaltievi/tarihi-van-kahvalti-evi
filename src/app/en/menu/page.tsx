import type { Metadata } from "next";
import ClientPage from "../../client-page";
import { AnimatedFooter } from "../../components/animated-footer";
import { localizeMenuData } from "../../menu/menu-localization";
import { MenuExperience } from "../../menu/menu-experience";
import { getPublicMenuData } from "../../menu/public-menu-data";
import { buildMenuSchema } from "../../menu/menu-schema";
import { getOrderingQuestions } from "../../menu/ordering-questions";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  englishMenuUrl,
  englishUrl,
  jsonLd,
  menuUrl,
  siteName,
  siteUrl,
} from "../../seo";

const pageTitle = "Turkish Breakfast Menu & Prices | Taksim, Istanbul";
const pageDescription =
  "See the current English menu and prices for traditional Van breakfast near Taksim: shared breakfast, herb cheese, murtuğa, kavut, hot dishes, tea and coffee.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: englishMenuUrl,
    languages: {
      tr: menuUrl,
      en: englishMenuUrl,
      "x-default": menuUrl,
    },
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: englishMenuUrl,
    siteName,
    locale: "en_US",
    alternateLocale: ["tr_TR"],
    type: "website",
    images: [{
      url: absoluteUrl("/images/og/menu.jpg"),
      width: 1200,
      height: 630,
      alt: "Traditional Van breakfast menu with shared dishes and Turkish tea",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [absoluteUrl("/images/og/menu.jpg")],
  },
};

export default async function EnglishMenuPage() {
  const { categories, items, lastUpdated } = await getPublicMenuData();
  const localized = localizeMenuData("en", categories, items);

  const menuSchema = buildMenuSchema({
    categories: localized.categories, items: localized.items, originalItems: items,
    locale: "en", url: englishMenuUrl, description: pageDescription,
  });

  const menuJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "WebPage",
        "@id": `${englishMenuUrl}#webpage`,
        url: englishMenuUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "en",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        mainEntity: { "@id": `${englishMenuUrl}#menu` },
        translationOfWork: { "@id": `${menuUrl}#webpage` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/og/menu.jpg"),
          width: 1200,
          height: 630,
        },
      },
      buildBreadcrumbJsonLd(englishMenuUrl, "English menu and prices", false, "Visitor guide", englishUrl),
      buildFaqJsonLd(getOrderingQuestions("en", localized.items), englishMenuUrl, false, "en"),
      menuSchema,
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(menuJsonLd) }} />
      <ClientPage locale="en">
        <MenuExperience
          locale="en"
          initialItems={localized.items}
          initialCategories={localized.categories}
          lastUpdated={lastUpdated}
        />
        <AnimatedFooter locale="en" />
      </ClientPage>
    </>
  );
}
