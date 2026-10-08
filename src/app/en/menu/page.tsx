import type { Metadata } from "next";
import ClientPage from "../../client-page";
import { AnimatedFooter } from "../../components/animated-footer";
import { localizeMenuData } from "../../menu/menu-localization";
import { MenuExperience } from "../../menu/menu-experience";
import { getPublicMenuData } from "../../menu/public-menu-data";
import { getMenuOrderNote } from "../../menu/menu-rules";
import { getOrderingQuestions } from "../../menu/ordering-questions";
import { BreakfastComparison } from "../../components/breakfast-comparison";
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

  const menuSchema = {
    "@type": "Menu",
    "@id": `${englishMenuUrl}#menu`,
    name: `${siteName} English Menu`,
    description: pageDescription,
    url: englishMenuUrl,
    inLanguage: "en",
    isBasedOn: { "@id": `${menuUrl}#menu` },
    hasMenuSection: localized.categories.map((category) => ({
      "@type": "MenuSection",
      name: category.label,
      description: category.description,
      hasMenuItem: localized.items
        .filter((item) => item.category === category.id)
        .map((item) => {
          const original = items.find((candidate) => candidate.id === item.id);
          const numericPrice = item.price.match(/^₺?(\d+)/)?.[1];
          return {
            "@type": "MenuItem",
            "@id": `${englishMenuUrl}#${item.id}`,
            url: `${englishMenuUrl}#${item.id}`,
            name: item.name,
            alternateName: original?.name,
            description: item.description,
            image: item.image ? absoluteUrl(item.image) : undefined,
            offers: numericPrice ? {
              "@type": "Offer",
              price: numericPrice,
              priceCurrency: "TRY",
              description: [item.priceNote, getMenuOrderNote(item.id, "en")].filter(Boolean).join(" ") || undefined,
              url: `${englishMenuUrl}#${item.id}`,
            } : undefined,
          };
        }),
    })),
  };

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
          comparison={<BreakfastComparison items={localized.items} locale="en" lastUpdated={lastUpdated} surface="menu_comparison" />}
        />
        <AnimatedFooter locale="en" />
      </ClientPage>
    </>
  );
}
