import type { Metadata } from "next";
import { Suspense } from "react";
import { cookies } from "next/headers";
import ClientPage from "../client-page";
import { absoluteUrl, jsonLd, siteName, siteUrl } from "../seo";
import { MenuExperience } from "./menu-experience";
import { getMenuData } from "./menu-storage";

const menuUrl = `${siteUrl}/menu`;
const menuDescription =
  "Tarihi Van Kahvaltı Evi güncel menü ve fiyatları: serpme Van kahvaltısı, bakır sahanlar, yöresel lezzetler, çay ve kahve seçenekleri.";

export const metadata: Metadata = {
  title: "Menü ve Güncel Fiyatlar",
  description: menuDescription,
  alternates: { canonical: menuUrl },
  openGraph: {
    title: `Menü ve Güncel Fiyatlar | ${siteName}`,
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
    title: `Menü ve Güncel Fiyatlar | ${siteName}`,
    description: menuDescription,
    images: [absoluteUrl("/images/og/menu.jpg")],
  },
};

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f4ecdf]">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-800 border-t-transparent" />
        </div>
      }
    >
      <MenuContainer />
    </Suspense>
  );
}

async function MenuContainer() {
  await cookies(); // Force dynamic request-time execution in Next.js 16
  const { categories, items, lastUpdated } = await getMenuData();

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
            name: item.name,
            description: item.description,
            image: absoluteUrl(item.image),
            offers: numericPrice
              ? {
                  "@type": "Offer",
                  price: numericPrice,
                  priceCurrency: "TRY",
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
      {
        "@type": "BreadcrumbList",
        "@id": `${menuUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Menü ve fiyatlar", item: menuUrl },
        ],
      },
      menuSchema,
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(menuJsonLd) }} />
      <ClientPage>
        <MenuExperience
          initialCategories={categories}
          initialItems={items}
          initialLastUpdated={lastUpdated}
        />
      </ClientPage>
    </>
  );
}
