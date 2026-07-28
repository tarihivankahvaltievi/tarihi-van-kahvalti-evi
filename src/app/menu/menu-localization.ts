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

export const menuMessages = {
  tr: {
    pageLanguage: "tr",
    heroMenu: "Menü",
    navigationAria: "Menüde gezinme",
    searchLabel: "Menüde ara",
    searchPlaceholder: "Menüde lezzet ara…",
    clearSearch: "Aramayı temizle",
    categoriesAria: "Menü kategorileri",
    showCategory: (label: string) => `${label} kategorisini göster`,
    searchResult: (query: string, count: number) => `“${query}” için ${count} sonuç`,
    showing: (count: number) => `${count} lezzet gösteriliyor`,
    prices: "Fiyatlar ₺ olarak gösterilir",
    optionCount: (count: number) => `${count} seçenek`,
    cardAria: (name: string, price: string) => `${name}: ${price}. Ayrıntıları gör`,
    daily: "Günlük hazırlanır",
    featuredTag: "Öne çıkan",
    newTag: "Yeni",
    emptyTitle: "Bu isimde bir lezzet bulamadık.",
    emptyText: "Başka bir kelime deneyin veya tüm sofraya geri dönün.",
    showAll: "Tüm menüyü göster",
    updated: "Menü güncelleme",
    availability: "Ürün uygunluğu mevsime ve günlük hazırlığa göre değişebilir. Alerjen bilgisi için ekibimize danışabilirsiniz.",
    sheetClose: "Ürün ayrıntılarını kapat",
    close: "Kapat",
    onThisPlate: "Ürün detayları",
    backToMenu: "Menüye dön",
  },
  en: {
    pageLanguage: "en",
    heroMenu: "Menu",
    navigationAria: "Browse the menu",
    searchLabel: "Search the menu",
    searchPlaceholder: "Search dishes…",
    clearSearch: "Clear search",
    categoriesAria: "Menu categories",
    showCategory: (label: string) => `Show ${label}`,
    searchResult: (query: string, count: number) => `${count} result${count === 1 ? "" : "s"} for “${query}”`,
    showing: (count: number) => `${count} item${count === 1 ? "" : "s"} shown`,
    prices: "Prices are shown in Turkish lira (₺)",
    optionCount: (count: number) => `${count} option${count === 1 ? "" : "s"}`,
    cardAria: (name: string, price: string) => `${name}: ${price}. View details`,
    daily: "Prepared daily",
    featuredTag: "Featured",
    newTag: "New",
    emptyTitle: "We could not find a matching dish.",
    emptyText: "Try another word or return to the full menu.",
    showAll: "Show the full menu",
    updated: "Menu updated",
    availability: "Availability may vary with the season and daily preparation. Please ask our team about allergens.",
    sheetClose: "Close item details",
    close: "Close",
    onThisPlate: "Item details",
    backToMenu: "Back to menu",
  },
} as const;

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
