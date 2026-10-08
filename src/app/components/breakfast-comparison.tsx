import Link from "next/link";
import type { MenuItem } from "../menu/menu-data";
import { localizeMenuDate, type MenuLocale } from "../menu/menu-localization";
import { getMenuOrderNote } from "../menu/menu-rules";
import styles from "./breakfast-comparison.module.css";

// Render this on the server and pass it as a slot to the interactive menu.
// Names, prices and inclusions always use the same record as the full menu.
export function BreakfastComparison({ items, locale = "tr", lastUpdated, surface }: {
  items: MenuItem[];
  locale?: MenuLocale;
  lastUpdated: string;
  surface: "menu_comparison" | "breakfast_guide";
}) {
  const isEn = locale === "en";
  const menuPath = isEn ? "/en/menu" : "/menu";
  const choices = ["serpme-fix-menu", "van-golu-tabagi", "pisi-tabagi", "yumurtali-ekmek-tabagi"]
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is MenuItem => Boolean(item));
  if (!choices.length) return null;

  return (
    <section id="breakfast-options" className={styles.section} aria-labelledby="breakfast-options-title">
      <header className={styles.intro}>
        <h2 id="breakfast-options-title">{isEn ? "Shared breakfast or a plate for one?" : "Serpme sofra mı, tek kişilik tabak mı?"}</h2>
        <p>{isEn
          ? "Serpme Fix Menu has a minimum order for two people. Compare the individual plates below if you are visiting alone."
          : "Serpme Fix Menü en az iki kişi için servis edilir. Tek kişi geliyorsanız aşağıdaki bireysel tabakları karşılaştırabilirsiniz."}</p>
      </header>
      <div className={styles.choices}>
        {choices.map((item) => (
          <div key={item.id} className={styles.choice}>
            <div>
              <h3>{item.name}</h3>
              {getMenuOrderNote(item.id, locale) && <p className={styles.rule}>{getMenuOrderNote(item.id, locale)}</p>}
            </div>
            <p className={styles.price}>{item.price}<span>{item.priceNote || (isEn ? "per plate" : "tabak fiyatı")}</span></p>
            <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            <Link href={`${menuPath}#${item.id}`} className={styles.detailLink}
              data-analytics-surface={surface} data-analytics-purpose="menu_compare" data-analytics-item={item.id}>
              {isEn ? "Full contents" : "Tüm içerikler"}<span className="sr-only">: {item.name}</span> →
            </Link>
          </div>
        ))}
      </div>
      <p className={styles.note}>{isEn
        ? "Prices are in Turkish lira (TRY). Extras are listed separately. Confirm availability and any service or cover charge with the team before ordering."
        : "Fiyatlar Türk lirası (TL) cinsindedir. Ek ürünler ayrıca listelenir. Ürün uygunluğunu ve varsa servis/kuver koşullarını sipariş öncesinde ekibimizle netleştirin."}</p>
      {lastUpdated && <p className={styles.updated}>{isEn ? "Price record updated" : "Fiyat kaydı güncelleme"}: {localizeMenuDate(locale, lastUpdated)}</p>}
      <div className={styles.actions}>
        <Link href={isEn ? "/en/rezervasyon" : "/rezervasyon"} className={styles.primaryLink} data-analytics-surface={surface}>
          {isEn ? "Request a table" : "Masa talebi gönder"} →
        </Link>
        <a href={surface === "breakfast_guide" ? "#sorular" : "#ordering-guide"} className={styles.secondaryLink}>
          {isEn ? "Serving and visit questions" : "Servis ve ziyaret soruları"}
        </a>
      </div>
      <p className={styles.note}>{isEn ? "A table request is confirmed after the restaurant replies." : "Masa talebi işletmenin yanıtından sonra kesinleşir."}</p>
    </section>
  );
}
