import Link from "next/link";
import { displayAddress, displayPhone, mapsUrl, openingHours, telUrl, tripadvisorUrl } from "../seo";
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
          <p><a href={tripadvisorUrl} target="_blank" rel="noopener noreferrer" data-analytics-purpose="review_source" data-analytics-surface="home_tripadvisor_source">{isEn ? "Our Zambak Street business profile on Tripadvisor" : "Tripadvisor’da Zambak Sokak işletme profilimiz"}</a></p>
          <p>{isEn
            ? "For a wheelchair or stroller visit, call ahead about the entrance, steps, seating and toilet access. Mention your needs in your table request."
            : "Tekerlekli sandalye veya bebek arabasıyla ziyaret için giriş, basamaklar, oturma alanı ve tuvalete erişimi gelmeden önce telefonla teyit edin. İhtiyaçlarınızı masa talebine ekleyebilirsiniz."}</p>
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
