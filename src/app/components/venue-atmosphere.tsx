import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Phone } from "lucide-react";
import styles from "./venue-atmosphere.module.css";

export function VenueAtmosphere({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";

  return (
    <section className={styles.section4} id="keyif-dolu-anlar">
      {/* Top Anchor Notch */}
      <div className={styles.topAnchor} aria-hidden="true">
        <Image
          src="/hamour/anchor-2.png"
          alt=""
          width={74}
          height={41}
          className={styles.topAnchorImg}
          priority
        />
      </div>

      {/* Atmospheric Background Image - Tarihi Van Kahvaltı Evi Authentic Establishment Photo */}
      <div className={styles.bgWrapper} aria-hidden="true">
        <Image
          src="/images/balcony-breakfast.webp"
          alt={isEn ? "Historic Greek Townhouse & Breakfast on the Balcony - Tarihi Van Kahvaltı Evi" : "Tarihi Rum Konağı Balkonunda Kahvaltı Keyfi - Tarihi Van Kahvaltı Evi"}
          fill
          priority
          sizes="100vw"
          quality={85}
          className={styles.bgImg}
        />
      </div>

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.eyebrow} data-aos="fade-up">
          <span>{isEn ? "BEYOĞLU · SINCE 1978" : "BEYOĞLU · 1978'DEN BERİ"}</span>
        </div>

        <div className={styles.head}>
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
            className={styles.title}
          >
            {isEn ? (
              <>Delightful Moments<br />Await You!</>
            ) : (
              <>Keyif Dolu Anlar<br />Sizi Bekliyor!</>
            )}
          </h2>
          <p
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="200"
            className={styles.subtitle}
          >
            {isEn
              ? "The enchanting ambience of our historic townhouse meets the timeless flavors of Van."
              : "Tarihi Rum konağımızın büyüleyici atmosferi, Van’ın eşsiz lezzetleriyle buluşuyor."}
          </p>
        </div>

        <div className={styles.article} data-aos="fade-up" data-aos-delay="120">
          <div
            className={styles.richtext}
          >
            <p>
              {isEn
                ? "In our historic rooms and at our street-side tables, the generous spirit of Van meets the warmth of Beyoğlu."
                : "Tarihi salonlarımızda ya da sokak masalarımızda, Van sofrasının cömertliği Beyoğlu'nun sıcaklığıyla buluşuyor."}
            </p>
          </div>
          <div className={styles.actions}>
            <Link href="tel:+905415252868" className={`${styles.btn} ${styles.primaryBtn}`}>
              <Phone aria-hidden="true" />
              {isEn ? "Call us" : "Bizi ara"}
            </Link>
            <Link href={isEn ? "/en/rezervasyon" : "/rezervasyon"} className={styles.btn}>
              <CalendarDays aria-hidden="true" />
              {isEn ? "Book a table" : "Masa ayırt"}
              <ArrowUpRight aria-hidden="true" className={styles.arrow} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
