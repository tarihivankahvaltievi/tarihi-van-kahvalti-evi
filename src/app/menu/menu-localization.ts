import type { MenuCategory, MenuItem } from "./menu-data";

export type MenuLocale = "tr" | "en";

const englishPriceNotes: Record<string, string> = {
  "kişi başı": "per person",
  ekstra: "add-on",
};

const englishTags: Record<string, string> = {
  "Öne çıkan": "Featured",
  Tavsiye: "Recommended",
  Vejetaryen: "Vegetarian",
  Yeni: "New",
};

export function localizeMenuData(
  locale: MenuLocale,
  categories: MenuCategory[],
  items: MenuItem[],
) {
  if (locale === "tr") return { categories, items };

  return {
    categories: categories.map((category) => {
      const translation = category.translations?.en;
      return translation ? { ...category, ...translation } : category;
    }),
    items: items.map((item) => {
      const translation = item.translations?.en;
      return {
        ...item,
        ...(translation ?? {}),
        priceNote: item.priceNote ? englishPriceNotes[item.priceNote] ?? item.priceNote : undefined,
        tags: item.tags.map((tag) => englishTags[tag] ?? tag),
      };
    }),
  };
}

export function localizeMenuDate(locale: MenuLocale, value: string) {
  if (locale === "tr") return value;
  const months: Record<string, string> = {
    Ocak: "January", Şubat: "February", Mart: "March", Nisan: "April", Mayıs: "May", Haziran: "June",
    Temmuz: "July", Ağustos: "August", Eylül: "September", Ekim: "October", Kasım: "November", Aralık: "December",
  };
  return Object.entries(months).reduce((date, [turkish, english]) => date.replace(turkish, english), value);
}
