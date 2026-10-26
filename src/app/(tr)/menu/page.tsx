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
import { buildMenuSchema } from "../../menu/menu-schema";
import { getOrderingQuestions } from "../../menu/ordering-questions";

const menuTitle = "Van Kahvaltısı Menü ve Fiyatları | Taksim, Beyoğlu";
const menuDescription =
  "Taksim, Beyoğlu’nda Van kahvaltısı: serpme, tek kişilik tabaklar ve sıcak seçenekler. Güncel kişi başı fiyatları, dahil içerikler ve masa talebi bilgileri.";

export const metadata: Metadata = {
  title: { absolute: menuTitle },
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
    title: menuTitle,
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
    title: menuTitle,
    description: menuDescription,
    images: [absoluteUrl("/images/og/menu.jpg")],
  },
};

export default async function MenuPage() {
  const { categories, items, lastUpdated } = await getPublicMenuData();

  const menuSchema = buildMenuSchema({
    categories, items, locale: "tr", url: menuUrl, description: menuDescription,
  });

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
