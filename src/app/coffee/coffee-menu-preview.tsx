import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { coffeeMenuCopy, type FeaturedCoffee } from "./coffee-menu-data";
import type { CoffeeLocale } from "./coffee-localization";
import styles from "./coffee.module.css";

export function CoffeeMenuPreview({ items, locale }: { items: FeaturedCoffee[]; locale: CoffeeLocale }) {
  if (!items.length) return null;
  const c = coffeeMenuCopy[locale];
  const menu = locale === "tr" ? "/menu" : "/en/menu";
  return <section id="coffee-menu" className={styles.menuPreview} aria-labelledby="coffee-price-title" data-analytics-surface="coffee_prices">
    <div className={styles.menuPreviewHeading}><h2 id="coffee-price-title">{c.title}</h2><p>{c.note}</p></div>
    <ul className={styles.menuPreviewItems}>
      {items.map((item) => <li key={item.id} data-coffee-item={item.id}><Link href={item.href} hrefLang={locale === "tr" ? "tr" : "en"}>
        <span>{item.name}{item.priceNote && <small lang="tr">{item.priceNote}</small>}</span><bdi dir="ltr">{item.price}</bdi><ArrowUpRight size={17} aria-hidden="true" />
      </Link></li>)}
    </ul>
    <Link className={styles.menuPreviewLink} href={`${menu}#sicak-kahveler`} hrefLang={locale === "tr" ? "tr" : "en"}>{c.all} <ArrowUpRight size={17} aria-hidden="true" /></Link>
  </section>;
}
