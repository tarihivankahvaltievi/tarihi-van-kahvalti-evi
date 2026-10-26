import { absoluteUrl, menuUrl, siteName } from "../seo";
import type { MenuCategory, MenuItem } from "./menu-data";
import type { MenuLocale } from "./menu-localization";
import { menuSchemaPrice } from "./menu-price";
import { getMenuOrderNote } from "./menu-rules";

// Both language pages describe the same live dishes. Keep price parsing and
// serving conditions together so machines receive the same facts as guests.
export function buildMenuSchema({ categories, items, originalItems, locale, url, description }: {
  categories: MenuCategory[];
  items: MenuItem[];
  originalItems?: MenuItem[];
  locale: MenuLocale;
  url: string;
  description: string;
}) {
  const originals = new Map(originalItems?.map((item) => [item.id, item]));
  return {
    "@type": "Menu",
    "@id": `${url}#menu`,
    name: `${siteName} ${locale === "en" ? "English Menu" : "Menüsü"}`,
    description,
    url,
    inLanguage: locale === "en" ? "en" : "tr-TR",
    ...(locale === "en" ? { isBasedOn: { "@id": `${menuUrl}#menu` } } : {}),
    hasMenuSection: categories.map((category) => ({
      "@type": "MenuSection",
      name: category.label,
      description: category.description,
      hasMenuItem: items.filter((item) => item.category === category.id).map((item) => {
        const price = menuSchemaPrice(item.price);
        return {
          "@type": "MenuItem",
          "@id": `${url}#${item.id}`,
          url: `${url}#${item.id}`,
          name: item.name,
          alternateName: originals.get(item.id)?.name,
          description: item.description,
          image: item.image ? absoluteUrl(item.image) : undefined,
          offers: price !== undefined ? {
            "@type": "Offer",
            price,
            priceCurrency: "TRY",
            description: [item.priceNote, getMenuOrderNote(item.id, locale), ...item.details].filter(Boolean).join(" ") || undefined,
            url: `${url}#${item.id}`,
          } : undefined,
        };
      }),
    })),
  };
}
