import Link from "next/link";
import { coffeeLanguageTags, coffeePaths, type CoffeeLocale } from "./coffee-localization";

const copy = {
  tr: ["Kahve molası da planlıyorsanız,", "Taksim’de kahve seçeneklerimizi ve fiyatlarını keşfedin."],
  en: ["Planning a coffee break too?", "Explore our coffees and prices near Taksim."],
  ru: ["Планируете кофейную паузу?", "Посмотрите наш кофе и цены рядом с Таксимом."],
  ar: ["هل تخططون لاستراحة قهوة أيضاً؟", "اكتشفوا القهوة والأسعار بالقرب من تقسيم."],
  ko: ["커피 한 잔도 계획하고 계신가요?", "탁심 근처 커피 종류와 가격을 확인해 보세요."],
  "zh-cn": ["也想安排一段咖啡时光？", "看看塔克西姆附近的咖啡选择与价格。"],
} as const;

/** Contextual discovery within each native visitor guide, not just a language switch. */
export function CoffeeDiscovery({ locale }: { locale: CoffeeLocale }) {
  const [text, label] = copy[locale];
  return <p data-analytics-surface="coffee_discovery">{text}{" "}<Link href={coffeePaths[locale]} hrefLang={coffeeLanguageTags[locale]}>{label}</Link></p>;
}
