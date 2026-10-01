import { googleMapsSnapshot } from "../seo";
import type { SiteLocale } from "../home-localization";
import styles from "./guest-reviews.module.css";

// Keep this optional section source-based. Undated legacy quotes and relative
// dates are not a verified review feed and must not be republished as current.
export function GuestReviews({ locale = "tr" }: { locale?: SiteLocale }) {
  const isEn = locale === "en";
  const date = new Intl.DateTimeFormat(isEn ? "en-GB" : "tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" })
    .format(new Date(`${googleMapsSnapshot.checkedAt}T12:00:00+03:00`));
  return (
    <section id="reviews" className={styles.section} aria-labelledby="guest-reviews-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="guest-reviews-title" className={styles.title}>{isEn ? "Guest reviews on Google Maps" : "Google Haritalar’da misafir değerlendirmeleri"}</h2>
          <p className={styles.intro}>
            {googleMapsSnapshot.rating.toLocaleString(isEn ? "en-US" : "tr-TR")}/5 · {googleMapsSnapshot.reviewCount.toLocaleString(isEn ? "en-US" : "tr-TR")} {isEn ? "reviews" : "değerlendirme"}. {isEn ? "Checked" : "Kontrol"}: <time dateTime={googleMapsSnapshot.checkedAt}>{date}</time>.
          </p>
          <a className={styles.viewAll} href={googleMapsSnapshot.sourceUrl} target="_blank" rel="noopener noreferrer" data-analytics-purpose="review_source" data-analytics-surface="guest_reviews">
            {isEn ? "Read the reviews and their dates at the source" : "Yorumları ve tarihlerini kaynağında okuyun"}
          </a>
        </header>
      </div>
    </section>
  );
}
