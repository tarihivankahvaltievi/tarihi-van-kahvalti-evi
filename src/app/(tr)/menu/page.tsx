import type { Metadata } from "next";
import ClientPage from "../../client-page";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  englishMenuUrl,
  jsonLd,
  menuUrl,
  siteName,
  siteUrl,
} from "../../seo";
import { AnimatedFooter } from "../../components/animated-footer";
import { MenuExperience } from "../../menu/menu-experience";
import { getPublicMenuData } from "../../menu/public-menu-data";
import { getMenuOrderNote } from "../../menu/menu-rules";
import { getOrderingQuestions } from "../../menu/ordering-questions";

const menuDescription =
  "Tarihi Van Kahvaltı Evi güncel menü ve fiyatları: serpme Van kahvaltısı, bakır sahanlar, yöresel lezzetler, çay ve kahve seçenekleri.";

export const metadata: Metadata = {
  title: { absolute: "Van Kahvaltı Menüsü ve Fiyatları | Beyoğlu Taksim" },
  description: menuDescription,
  alternates: {
    canonical: menuUrl,
    languages: {
      tr: menuUrl,
      en: englishMenuUrl,
      "x-default": menuUrl,
    },
  },
  openGraph: {
    title: "Van Kahvaltı Menüsü ve Fiyatları | Beyoğlu Taksim",
    description: menuDescription,
    url: menuUrl,
    siteName,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/og/menu.jpg"),
        width: 1200,
        height: 630,
        alt: "Tarihi Van Kahvaltı Evi serpme kahvaltı menüsü",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Van Kahvaltı Menüsü ve Fiyatları | Beyoğlu Taksim",
    description: menuDescription,
    images: [absoluteUrl("/images/og/menu.jpg")],
  },
};

export default async function MenuPage() {
  const { categories, items, lastUpdated } = await getPublicMenuData();

  const menuSchema = {
    "@type": "Menu",
    "@id": `${menuUrl}#menu`,
    name: `${siteName} Menüsü`,
    description: menuDescription,
    url: menuUrl,
    inLanguage: "tr-TR",
    hasMenuSection: categories.map((category) => ({
      "@type": "MenuSection",
      name: category.label,
      description: category.description,
      hasMenuItem: items
        .filter((item) => item.category === category.id)
        .map((item) => {
          const numericPrice = item.price.match(/^₺?(\d+)/)?.[1];
          return {
            "@type": "MenuItem",
            "@id": `${menuUrl}#${item.id}`,
            url: `${menuUrl}#${item.id}`,
            name: item.name,
            description: item.description,
            image: item.image ? absoluteUrl(item.image) : undefined,
            offers: numericPrice
              ? {
                  "@type": "Offer",
                  price: numericPrice,
                  priceCurrency: "TRY",
                  description: [item.priceNote, getMenuOrderNote(item.id, "tr")].filter(Boolean).join(" ") || undefined,
                  url: `${menuUrl}#${item.id}`,
                }
              : undefined,
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
        "@id": `${menuUrl}#webpage`,
        url: menuUrl,
        name: `Menü ve Güncel Fiyatlar | ${siteName}`,
        description: menuDescription,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        mainEntity: { "@id": `${menuUrl}#menu` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/og/menu.jpg"),
          width: 1200,
          height: 630,
        },
      },
      buildBreadcrumbJsonLd(menuUrl, "Menü ve fiyatlar", false),
      buildFaqJsonLd(getOrderingQuestions("tr", items), menuUrl, false, "tr"),
      menuSchema,
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(menuJsonLd) }} />
      <ClientPage>
        <MenuExperience
          initialItems={items}
          initialCategories={categories}
          lastUpdated={lastUpdated}
        />
        <AnimatedFooter locale="tr" />
      </ClientPage>
    </>
  );
}
