import type { MenuCategory, MenuItem } from "./menu-data";

export type MenuLocale = "tr" | "en";

type ItemTranslation = Pick<MenuItem, "name" | "description" | "story" | "imageAlt" | "details">;

const englishCategories: Record<string, Pick<MenuCategory, "label" | "shortLabel" | "description" | "imageAlt">> = {
  sofra: {
    label: "Van Breakfast Tables",
    shortLabel: "Breakfast",
    description: "Shared Van breakfast spreads, regional cheeses, preserves and plates for the whole table.",
    imageAlt: "Traditional Van breakfast spread seen from above",
  },
  sicaklar: {
    label: "Hot Copper Pans",
    shortLabel: "Hot dishes",
    description: "Eggs and regional specialities served while the butter is still sizzling.",
    imageAlt: "Eggs with sucuk served hot in a copper pan",
  },
  vandan: {
    label: "Specialities from Van",
    shortLabel: "From Van",
    description: "Herb cheese, kete and other flavours rooted in Van's breakfast culture.",
    imageAlt: "Traditional layered Van kete pastry",
  },
  icecekler: {
    label: "Tea & Coffee",
    shortLabel: "Drinks",
    description: "Fresh Turkish tea for the table and coffees prepared by Kafka Cafe.",
    imageAlt: "Fresh Turkish tea served in tulip-shaped glasses",
  },
};

const englishItems: Record<string, ItemTranslation> = {
  "geleneksel-van-kahvaltisi": {
    name: "Traditional Van Breakfast",
    description: "Herb cheese, murtuğa, kavut, cacık, kete, honey and clotted cream, plus unlimited Turkish tea.",
    story: "Our shared Van breakfast has been served at the centre of the table since 1978. Regional produce, homemade touches and hot copper-pan dishes complete the spread.",
    imageAlt: "Traditional Van breakfast with cheeses, hot dishes and Turkish tea",
    details: ["Minimum two guests", "Unlimited fresh Turkish tea", "Daily prepared accompaniments"],
  },
  "iki-kisilik-van-sofrasi": {
    name: "Van Breakfast for Two",
    description: "A compact shared table with one hot dish, regional cheeses, homemade preserves and freshly brewed tea.",
    story: "For two guests who prefer a more compact Van breakfast, we bring hot and cold favourites together in balanced portions.",
    imageAlt: "Van breakfast table prepared for two guests",
    details: ["Serves two", "One hot copper-pan dish", "Unlimited tea for two"],
  },
  "peynir-zeytin-seckisi": {
    name: "Cheese & Olive Selection",
    description: "Van herb cheese, daily cheeses, green olives and black olives.",
    story: "Herb cheese gives a Van breakfast its character. We pair cheeses of different textures with green and black olives for balance in every bite.",
    imageAlt: "Van herb cheese, assorted cheeses and olives",
    details: ["Van herb cheese", "Daily cheese selection", "Green and black olives"],
  },
  "bal-kaymak-recel": {
    name: "Honey, Clotted Cream & Preserves",
    description: "Strained honey, buffalo clotted cream and two homemade seasonal preserves.",
    story: "The sweet side of the table is built around contrasts: strained honey with clotted cream, and homemade preserves with warm pastries.",
    imageAlt: "Homemade apricot preserve with honey and clotted cream",
    details: ["Strained honey", "Buffalo clotted cream", "Two seasonal homemade preserves"],
  },
  "sucuklu-yumurta": {
    name: "Eggs with Sucuk",
    description: "Turkish beef sausage and village eggs, served hot in a copper pan.",
    story: "We brown the sucuk first, add the village eggs, and serve the pan while the yolk is still soft and the edges are sizzling.",
    imageAlt: "Eggs with sliced sucuk in a copper pan",
    details: ["Turkish beef sausage", "Village eggs", "Served in a copper pan"],
  },
  murtuga: {
    name: "Murtuğa",
    description: "A filling Van speciality prepared with flour, butter and egg.",
    story: "Murtuğa is a fine example of Van cuisine creating a generous dish from simple ingredients. We cook it until the butter becomes aromatic and serve it hot.",
    imageAlt: "Murtuğa among traditional Van breakfast dishes",
    details: ["Butter", "Egg", "Traditional Van recipe"],
  },
  kavut: {
    name: "Kavut",
    description: "A gently sweet, rich warm dish made with toasted flour and butter.",
    story: "Kavut has a long regional history behind its simple appearance. Toasted flour and butter give it a rich aroma and satisfying texture.",
    imageAlt: "Kavut served as part of a Van breakfast",
    details: ["Toasted flour", "Butter", "Served warm"],
  },
  menemen: {
    name: "Menemen with Butter",
    description: "Tomato, village peppers and eggs, kept soft and juicy in a copper pan.",
    story: "We briefly cook tomatoes and peppers in butter before adding the eggs, keeping the menemen juicy enough to enjoy with bread.",
    imageAlt: "Menemen with butter served in a copper pan",
    details: ["Village peppers", "Fresh tomatoes", "Served in a copper pan"],
  },
  "kavurmali-yumurta": {
    name: "Eggs with Braised Beef",
    description: "Braised beef and village eggs cooked with butter in a copper pan.",
    story: "Tender braised beef is warmed in butter and finished with village eggs for a rich hot dish made to share.",
    imageAlt: "Braised beef and eggs cooked in a copper pan",
    details: ["Braised beef", "Village eggs", "Cooked with butter"],
  },
  "otlu-peynirli-omlet": {
    name: "Van Herb Cheese Omelette",
    description: "A soft omelette with Van herb cheese and fresh greens.",
    story: "The distinctive flavour of Van herb cheese is balanced with softly cooked eggs and fresh greens, served hot and fluffy.",
    imageAlt: "Van herb cheese omelette served with greens and olives",
    details: ["Van herb cheese", "Village eggs", "Fresh greens"],
  },
  "van-otlu-peyniri": {
    name: "Van Herb Cheese",
    description: "Van's signature cheese, matured with the aroma of regional herbs.",
    story: "Herb cheese is more than an accompaniment; it carries the memory of Van breakfast. Its bold aroma pairs naturally with greens and Turkish tea.",
    imageAlt: "Sliced Van herb cheese on a breakfast plate",
    details: ["Regional herb aroma", "Matured cheese", "A speciality from Van"],
  },
  kete: {
    name: "Van Kete",
    description: "A layered regional pastry with a rich, buttery filling.",
    story: "We warm the kete gently so its layers remain distinct and the centre stays soft. It is especially memorable with honey and clotted cream.",
    imageAlt: "Traditional Van kete showing its layered texture",
    details: ["Buttery pastry", "Layered texture", "Served warm"],
  },
  "pisi-sepeti": {
    name: "Warm Pişi Basket",
    description: "Four pieces of freshly fried dough, lightly crisp outside and soft inside.",
    story: "Pişi is fried to order, rested briefly and served hot. It is a favourite companion to honey, clotted cream and cheese.",
    imageAlt: "Warm pişi on a wooden serving board",
    details: ["Four pieces", "Prepared to order", "Served hot"],
  },
  "van-cacigi": {
    name: "Van-Style Cacık",
    description: "A thick breakfast dip with strained yoghurt, cucumber and fresh herbs.",
    story: "Unlike a drinkable cacık, the Van version is thick enough to spread on bread. Cucumber and fresh herbs bring freshness to the table.",
    imageAlt: "Thick Van-style cacık served with fresh greens",
    details: ["Strained yoghurt", "Fresh cucumber", "Seasonal herbs"],
  },
  "simit-ekmek-sepeti": {
    name: "Simit & Warm Bread",
    description: "Crisp sesame simit, warm bread and butter for the table.",
    story: "Kept warm for the table, this bread basket brings together cheeses, preserves and hot copper-pan dishes.",
    imageAlt: "Sesame simit and warm breakfast bread on a wooden board",
    details: ["Crisp sesame simit", "Warm bread", "Butter"],
  },
  "sinirsiz-cay": {
    name: "Unlimited Fresh Turkish Tea",
    description: "Strong Turkish tea, refreshed in a tulip-shaped glass throughout the meal.",
    story: "For us, breakfast lasts as long as the tea stays fresh. We refill the glasses throughout the meal so conversation never needs to hurry.",
    imageAlt: "Freshly brewed Turkish tea in tulip-shaped glasses",
    details: ["Freshly brewed", "Unlimited refills", "Traditional tea glass"],
  },
  "turk-kahvesi": {
    name: "Traditional Turkish Coffee",
    description: "Foamy Turkish coffee slowly brewed in a copper cezve pot.",
    story: "At our Kafka Cafe corner, Turkish coffee is brewed slowly to preserve its foam—a small but memorable finish after a long breakfast.",
    imageAlt: "Foamy Turkish coffee served after breakfast",
    details: ["Brewed in a copper cezve", "Served with foam", "Kafka Cafe selection"],
  },
  "sutlu-turk-kahvesi": {
    name: "Turkish Coffee with Milk",
    description: "A softer Turkish coffee slowly prepared with milk.",
    story: "Milk softens the intensity of classic Turkish coffee while its foam is carefully preserved and served in a small cup.",
    imageAlt: "Foamy Turkish coffee prepared with milk",
    details: ["Brewed with milk", "Mellow taste", "Served with foam"],
  },
  "filtre-kahve": {
    name: "Filter Coffee of the Day",
    description: "A clean, balanced cup prepared with Kafka Cafe's daily beans.",
    story: "The day's beans are brewed to protect their aroma, creating a balanced cup for conversation after breakfast.",
    imageAlt: "Hot filter coffee served at a terrace table",
    details: ["Daily coffee beans", "Freshly brewed", "Kafka Cafe selection"],
  },
  "ev-limonatasi": {
    name: "Homemade Lemonade",
    description: "Fresh lemon, light sugar and seasonal herbs, served cold.",
    story: "Fresh lemon and aromatic peel meet just enough sugar for a cool, refreshing companion to the hot breakfast dishes.",
    imageAlt: "Cold homemade lemonade served at the breakfast table",
    details: ["Fresh lemon", "Lightly sweetened", "Served cold"],
  },
};

const englishPriceNotes: Record<string, string> = {
  "kişi başı · en az 2 kişilik": "per person · minimum 2 guests",
  "iki kişilik": "serves two",
  "4 adet": "4 pieces",
  "serpme kahvaltıya dahil": "included with the shared breakfast",
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
    onThisPlate: "Bu tabakta",
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
    onThisPlate: "What's included",
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
    categories: categories.map((category) => ({ ...category, ...englishCategories[category.id] })),
    items: items.map((item) => ({
      ...item,
      ...englishItems[item.id],
      priceNote: item.priceNote ? englishPriceNotes[item.priceNote] ?? item.priceNote : undefined,
      tags: item.tags.map((tag) => englishTags[tag] ?? tag),
    })),
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
