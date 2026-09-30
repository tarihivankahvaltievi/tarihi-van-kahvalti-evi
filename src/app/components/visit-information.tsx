import Link from "next/link";
import { displayAddress, displayPhone, mapsUrl, openingHours, telUrl } from "../seo";
import type { SiteLocale } from "../home-localization";
import styles from "./visit-information.module.css";

export function VisitInformation({ locale = "tr" }: { locale?: SiteLocale }) {
  const isEn = locale === "en";

  return (
    <section id="location" className={styles.section} aria-labelledby="visit-title">
      <div className={styles.inner}>
        <div>
          <p className={styles.eyebrow}>Zambak Sokak · Beyoğlu / Taksim</p>
          <h2 id="visit-title">{isEn ? "Find our table in Beyoğlu" : "Beyoğlu’ndaki soframıza gelin"}</h2>
          <address>{displayAddress}</address>
          <p>{isEn ? `Open every day ${openingHours.opens}–${openingHours.closes}` : openingHours.short}</p>
          <p>{isEn
            ? "Look for Tarihi Van Kahvaltı Evi on Zambak Street, No:8. Open our Google Maps listing for a route from your starting point."
            : "Tarihi Van Kahvaltı Evi, Zambak Sokak No:8’de. Bulunduğunuz noktadan güncel rota için Google Haritalar kaydımızı açın."}</p>
        </div>
        <nav className={styles.actions} aria-label={isEn ? "Directions and contact" : "Yol tarifi ve iletişim"}>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" data-analytics-surface="home_location">
            {isEn ? "Get directions on Google Maps" : "Google Haritalar’da yol tarifi"}
          </a>
          <a href={telUrl} data-analytics-surface="home_location">{isEn ? "Call" : "Ara"}: {displayPhone}</a>
          <Link href={isEn ? "/en/menu" : "/menu"}>{isEn ? "Menu & prices" : "Menü ve fiyatlar"}</Link>
          <Link href={isEn ? "/en/rezervasyon" : "/rezervasyon"}>{isEn ? "Request a reservation" : "Rezervasyon talebi oluştur"}</Link>
          <p>{isEn ? "Your table is confirmed after the restaurant replies. For a visit today, call to check availability." : "Masanız işletmenin yanıtıyla kesinleşir. Bugün gelmek için telefonla masa uygunluğunu öğrenebilirsiniz."}</p>
        </nav>
      </div>
    </section>
  );
}
