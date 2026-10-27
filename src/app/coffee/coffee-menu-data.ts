import type { MenuItem } from "../menu/menu-data";
import { menuSchemaPrice } from "../menu/menu-price";
import { absoluteUrl, siteUrl } from "../seo";
import { coffeePaths, type CoffeeLocale } from "./coffee-localization";

export const featuredCoffeeIds = ["turk-kahvesi", "espresso", "americano", "latte", "flat-white", "cold-brew"] as const;
type FeaturedCoffeeId = typeof featuredCoffeeIds[number];
const translatedNames: Partial<Record<CoffeeLocale, Record<FeaturedCoffeeId, string>>> = {
  ru: { "turk-kahvesi": "Турецкий кофе", espresso: "Эспрессо", americano: "Американо", latte: "Латте", "flat-white": "Флэт уайт", "cold-brew": "Колд брю" },
  ar: { "turk-kahvesi": "قهوة تركية", espresso: "إسبريسو", americano: "أمريكانو", latte: "لاتيه", "flat-white": "فلات وايت", "cold-brew": "كولد برو" },
  ko: { "turk-kahvesi": "터키식 커피", espresso: "에스프레소", americano: "아메리카노", latte: "라테", "flat-white": "플랫 화이트", "cold-brew": "콜드 브루" },
  "zh-cn": { "turk-kahvesi": "土耳其咖啡", espresso: "浓缩咖啡", americano: "美式咖啡", latte: "拿铁", "flat-white": "馥芮白", "cold-brew": "冷萃咖啡" },
};
export const coffeeMenuCopy = {
  tr: { title: "Kahve menüsü ve fiyatları.", note: "Menümüzden seçili kahveler. Fiyatlar Türk lirası (TRY) olarak gösterilir.", all: "Tüm kahveler ve fiyatlar" },
  en: { title: "Coffee menu & prices.", note: "Selected coffees from our menu. Prices are in Turkish lira (TRY).", all: "All coffees and prices" },
  ru: { title: "Кофе и цены.", note: "Несколько позиций из нашего меню. Цены указаны в турецких лирах (TRY).", all: "Все виды кофе и цены · EN" },
  ar: { title: "قائمة القهوة والأسعار", note: "مجموعة مختارة من قائمتنا. الأسعار بالليرة التركية (TRY).", all: "جميع أنواع القهوة والأسعار · EN" },
  ko: { title: "커피 메뉴와 가격", note: "메뉴에서 고른 커피입니다. 가격은 터키 리라(TRY)로 표시됩니다.", all: "전체 커피와 가격 · 영문 메뉴" },
  "zh-cn": { title: "咖啡菜单与价格", note: "菜单中的部分咖啡。价格以土耳其里拉（TRY）显示。", all: "全部咖啡与价格 · 英文菜单" },
} as const;

export function getFeaturedCoffees(items: MenuItem[], locale: CoffeeLocale) {
  const source = new Map(items.map((item) => [item.id, item]));
  const menu = locale === "tr" ? "/menu" : "/en/menu";
  return featuredCoffeeIds.flatMap((id) => {
    const item = source.get(id);
    if (!item) return [];
    const name = translatedNames[locale]?.[id] ?? (locale === "tr" ? item.name : item.translations?.en?.name ?? item.name);
    return [{ id, name, price: item.price, priceNote: item.priceNote, numericPrice: menuSchemaPrice(item.price), href: `${menu}#${id}` }];
  });
}
export type FeaturedCoffee = ReturnType<typeof getFeaturedCoffees>[number];

/** References the same menu item identities; no fabricated stock/rating/discount claims. */
export function buildCoffeeMenuList(items: FeaturedCoffee[], locale: CoffeeLocale) {
  return {
    "@type": "ItemList", "@id": `${absoluteUrl(coffeePaths[locale])}#coffee-menu`,
    name: coffeeMenuCopy[locale].title, numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1,
      item: { "@type": "MenuItem", "@id": absoluteUrl(item.href), url: absoluteUrl(item.href), name: item.name,
        offers: item.numericPrice === undefined ? undefined : { "@type": "Offer", price: item.numericPrice, priceCurrency: "TRY", description: item.priceNote, url: absoluteUrl(item.href), seller: { "@id": `${siteUrl}/#restaurant` } },
      },
    })),
  };
}
