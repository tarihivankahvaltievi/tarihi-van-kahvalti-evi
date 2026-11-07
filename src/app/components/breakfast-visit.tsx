import Link from "next/link";
import { getPublicMenuData } from "../menu/public-menu-data";
import { localizeMenuData, localizeMenuDate } from "../menu/menu-localization";
import { breakfastSubtotal } from "../menu/menu-price";
import { openingHours } from "../seo";
import type { SiteLocale } from "../home-localization";
import styles from "./breakfast-visit.module.css";

export async function BreakfastVisit({ locale }: { locale: SiteLocale }) {
  const isEn = locale === "en";
  const menuPath = isEn ? "/en/menu" : "/menu";
  const data = await getPublicMenuData();
  const { items } = localizeMenuData(locale, data.categories, data.items);
  const choices = ["serpme-fix-menu", "van-golu-tabagi"]
    .map((id) => items.find((item) => item.id === id))
    .filter((item) => item !== undefined);
  if (!choices.length) return null;
  const serpme = data.items.find((item) => item.id === "serpme-fix-menu");
  const price = breakfastSubtotal(serpme, 2);
  const total = price === undefined ? null : new Intl.NumberFormat(isEn ? "en-GB" : "tr-TR", {
    style: "currency", currency: "TRY", maximumFractionDigits: 2,
  }).format(Number(price));

  return (
    <section id="plan-breakfast" className={styles.section} aria-labelledby="plan-breakfast-title" data-analytics-surface="home_breakfast">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id="plan-breakfast-title">{isEn ? "Your Turkish breakfast near Taksim" : "Taksim’de serpme kahvaltı sofranız"}</h2>
          <p>{isEn ? "A shared Van breakfast or a plate for one. Choose from the current menu, then request your table."
            : "Paylaşmalı Van sofrası ya da tek kişilik bir tabak. Güncel menüden seçin, masanızı birlikte planlayalım."}</p>
          <p className={styles.facts}>{isEn ? "Zambak Street No:8, Beyoğlu · Walk from Taksim Square" : "Zambak Sokak No:8, Beyoğlu · Taksim Meydanı’ndan yürüyerek"}<br />
            {isEn ? "Open daily" : "Her gün açık"} {openingHours.opens}–{openingHours.closes}</p>
          <Link href={isEn ? "/en/rezervasyon" : "/rezervasyon"} className={styles.primary}>
            {isEn ? "Request a table" : "Masa talebi gönder"} →
          </Link>
          <p className={styles.note}>{isEn ? "Send your WhatsApp message; the restaurant confirms availability." : "WhatsApp mesajınızı gönderin; masa uygunluğunu ekibimiz teyit etsin."}</p>
          <Link href={isEn ? "/en/location" : "/konum"} className={styles.link}>{isEn ? "Walking directions & address" : "Yürüyüş rotası ve adres"} →</Link>
        </div>
        <div>
          {choices.map((item) => (
            <article key={item.id} className={styles.choice} data-breakfast-choice={item.id}>
              <div className={styles.row}>
                <h3>{item.name}</h3>
                <p className={styles.price}>{item.price}<span>{item.priceNote || (isEn ? "per plate" : "tabak fiyatı")}</span></p>
              </div>
              <p>{item.id === "serpme-fix-menu"
                ? (isEn ? "Shared breakfast · Minimum 2 people." : "Paylaşmalı kahvaltı · En az 2 kişilik sipariş.")
                : (isEn ? "An individual breakfast plate." : "Tek kişilik kahvaltı tabağı.")}</p>
              <p>{item.description}</p>
              <ul className={styles.inclusions}>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              {item.id === "serpme-fix-menu" && total && <p className={styles.subtotal}>{isEn ? "Breakfast subtotal for two" : "İki kişi için kahvaltı ara toplamı"}: {total}</p>}
              <Link href={`${menuPath}#${item.id}`} className={styles.link} data-analytics-purpose="menu_compare" data-analytics-item={item.id}>
                {isEn ? "See contents & included drinks" : "İçerikleri ve dahil içecekleri gör"} →
              </Link>
            </article>
          ))}
          <p className={styles.note}>{isEn ? "Prices in Turkish lira (TRY). Extras are separate. Confirm availability and any service or cover charge before ordering."
            : "Fiyatlar Türk lirası (TL). Ekstralar ayrıdır. Ürün uygunluğunu ve varsa servis/kuver koşullarını sipariş öncesinde teyit edin."}</p>
          {data.lastUpdated && <p className={styles.note}>{isEn ? "Menu record updated" : "Menü kaydı güncelleme"}: {localizeMenuDate(locale, data.lastUpdated)}</p>}
          <Link href={menuPath} className={styles.link}>{isEn ? "View the full English menu" : "Tüm menüyü incele"} →</Link>
        </div>
      </div>
    </section>
  );
}
