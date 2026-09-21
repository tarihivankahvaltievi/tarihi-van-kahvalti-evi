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
    heroMenu: "Van Sofrası & Güncel Menü",
    heroProvenance: "1978 · BEYOĞLU",
    heroIntro: "Asırlık Rum konağımızda tüten bakır sahanlar, Van yaylalarından süzülen peynirler ve semaverden bardaklara dolan tavşan kanı çay.",
    badgeSamovar: "Semaver Çayı İkramımızdır",
    badgeCheese: "Coğrafi İşaretli Otlu Peynir",
    badgePan: "Bakır Sahanda Sıcak Servis",
    badgeOven: "Taş Fırından Kete & Pişi",
    centerpieceBadge: "Geleneksel İmza Deneyim",
    centerpieceTitle: "Tarihi Serpme Van Kahvaltısı",
    centerpieceDesc: "Van yaylalarından coğrafi işaretli hakiki otlu peynir, Karakovan petek balı, manda sütü taze kaymak, bakır sahanda tereyağlı murtuğa ve kavut, organik sahanda yumurta, ev yapımı anne reçelleri, taş fırından sıcak kete ve sınırsız semaver çayı.",
    centerpieceBook: "Masa Ayırt",
    centerpieceDetails: "Tüm Masayı İncele",
    centerpiecePerPerson: "kişi başı",
    centerpieceMin: "En az 2 kişilik hazırlanır",
    navigationAria: "Menüde gezinme",
    searchLabel: "Menüde lezzet ara",
    searchPlaceholder: "Menüde bir lezzet veya malzeme ara… (ör. murtuğa, otlu peynir, menemen)",
    clearSearch: "Aramayı temizle",
    categoriesAria: "Menü kategorileri",
    showCategory: (label: string) => `${label} kategorisini göster`,
    searchResult: (query: string, count: number) => `“${query}” için ${count} sonuç`,
    showing: (count: number) => `${count} lezzet listeleniyor`,
    prices: "Tüm fiyatlar ₺ olarak günceldir",
    optionCount: (count: number) => `${count} lezzet`,
    cardAria: (name: string, price: string) => `${name}: ${price}. Tadım notlarını ve ayrıntıları gör`,
    daily: "Her sabah taze hazırlanır",
    featuredTag: "Öne çıkan",
    newTag: "Yeni",
    emptyTitle: "Aradığınız lezzet bulunamadı.",
    emptyText: "Farklı bir kelime deneyebilir veya tüm sofraya göz atabilirsiniz.",
    showAll: "Tüm Sofrayı Göster",
    updated: "Menü son güncelleme",
    availability: "Yöresel ürünlerimiz mevsime ve yayla tedariğine göre hazırlanır. Alerjen hassasiyetleriniz için servis ekibimize danışabilirsiniz.",
    sheetClose: "Ürün ayrıntılarını kapat",
    close: "Kapat",
    onThisPlate: "Tadım Notları & Sofra Detayı",
    backToMenu: "Menüye Dön",
    reserveDish: "Bu Lezzeti Masanıza Ayırtın",
    viewPlateDetails: "Tadım notları & ayrıntılar",
    atmosphereTitle: "Van Sofrasında Keyifli Bir Sabah",
    atmosphereDesc: "Tarihi Rum binamızın asırlık taş duvarları arasında, sevdiklerinizle telaşsız bir kahvaltı keyfi için sizi bekliyoruz.",
    atmosphereAction: "Masanızı Ayırtın",
  },
  en: {
    pageLanguage: "en",
    heroMenu: "The Van Table & Current Menu",
    heroProvenance: "SINCE 1978 · BEYOĞLU",
    heroIntro: "Sizzling copper pans, fragrant highland cheeses from Van, and slow-brewed samovar tea poured inside our registered 18th-century townhouse.",
    badgeSamovar: "Complimentary Samovar Tea",
    badgeCheese: "Authentic Van Herb Cheese",
    badgePan: "Served in Hot Copper Sahan",
    badgeOven: "Fresh Oven Kete & Hot Pişi",
    centerpieceBadge: "Traditional Signature Feast",
    centerpieceTitle: "Traditional Grand Van Breakfast",
    centerpieceDesc: "Authentic highland herb cheese, wild Karakovan honeycomb, clotted buffalo cream, sizzling buttery murtuğa and roasted kavut in copper pans, farm eggs, housemade jams, warm kete, and unlimited samovar tea.",
    centerpieceBook: "Reserve a Table",
    centerpieceDetails: "View Table Contents",
    centerpiecePerPerson: "per person",
    centerpieceMin: "Served for minimum 2 guests",
    navigationAria: "Browse menu categories",
    searchLabel: "Search dishes",
    searchPlaceholder: "Search dishes or ingredients… (e.g., murtuga, cheese, menemen)",
    clearSearch: "Clear search",
    categoriesAria: "Menu categories",
    showCategory: (label: string) => `Show ${label}`,
    searchResult: (query: string, count: number) => `${count} result${count === 1 ? "" : "s"} for “${query}”`,
    showing: (count: number) => `${count} dish${count === 1 ? "" : "es"} shown`,
    prices: "All prices are current in Turkish Lira (₺)",
    optionCount: (count: number) => `${count} dish${count === 1 ? "" : "es"}`,
    cardAria: (name: string, price: string) => `${name}: ${price}. View tasting notes and details`,
    daily: "Prepared fresh every morning",
    featuredTag: "Featured",
    newTag: "New",
    emptyTitle: "No matching dishes found.",
    emptyText: "Try another search term or explore the full table.",
    showAll: "Show Full Table",
    updated: "Menu updated",
    availability: "Our regional ingredients are prepared according to season and highland harvest. Please inform our team about any allergies.",
    sheetClose: "Close dish details",
    close: "Close",
    onThisPlate: "Tasting Notes & Serving Details",
    backToMenu: "Back to Menu",
    reserveDish: "Reserve This Dish for Your Table",
    viewPlateDetails: "Tasting notes & details",
    atmosphereTitle: "A Morning at the Van Table",
    atmosphereDesc: "Between the centuries-old stone walls of our historic townhouse, we welcome you to an unhurried, generous breakfast with your loved ones.",
    atmosphereAction: "Book Your Table Now",
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
