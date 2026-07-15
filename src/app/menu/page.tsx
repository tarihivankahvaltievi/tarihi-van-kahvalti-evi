import type { Metadata } from "next";
import ClientPage from "../client-page";
import { absoluteUrl, jsonLd, siteName, siteUrl } from "../seo";
import { MenuExperience } from "./menu-experience";
import { menuCategories, menuItems } from "./menu-data";

const menuUrl = `${siteUrl}/menu`;
const menuDescription =
  "Tarihi Van Kahvaltı Evi QR menüsü: serpme Van kahvaltısı, bakır sahanlar, yöresel lezzetler, çay ve kahve seçenekleri.";

export const metadata: Metadata = {
  title: "QR Menü ve Fiyatlar",
  description: menuDescription,
  alternates: { canonical: menuUrl },
  openGraph: {
    title: `QR Menü ve Fiyatlar | ${siteName}`,
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
    title: `QR Menü ve Fiyatlar | ${siteName}`,
    description: menuDescription,
    images: [absoluteUrl("/images/og/menu.jpg")],
  },
};

export default function MenuPage() {
  const menuJsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${menuUrl}#menu`,
    name: `${siteName} QR Menüsü`,
    description: menuDescription,
    url: menuUrl,
    inLanguage: "tr-TR",
    hasMenuSection: menuCategories.map((category) => ({
      "@type": "MenuSection",
      name: category.label,
      description: category.description,
      hasMenuItem: menuItems
        .filter((item) => item.category === category.id)
        .map((item) => {
          const numericPrice = item.price.match(/^₺(\d+)/)?.[1];
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(menuJsonLd) }} />
      <ClientPage>
        <MenuExperience />
      </ClientPage>
    </>
  );
}
