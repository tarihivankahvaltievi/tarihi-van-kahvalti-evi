import Image from "next/image";
import Link from "next/link";
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

      {/* Atmospheric Background Image - Tarihi Van Kahvaltı Evi Authentic Venue Photo */}
      <div className={styles.bgOverlay} aria-hidden="true">
        <Image
          src="/images/balcony-breakfast.webp"
          alt={isEn ? "Historic Greek Townhouse & Balcony Breakfast - Tarihi Van Kahvaltı Evi" : "Tarihi Rum Konağı Balkonunda Kahvaltı - Tarihi Van Kahvaltı Evi"}
          fill
          sizes="100vw"
          quality={85}
          className={styles.bgImg}
          priority
        />
      </div>

      <div className={styles.container}>
        <div className={styles.head}>
          <h2
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
            className={styles.title}
          >
            {isEn ? "Delightful Moments Await You!" : "Keyif Dolu Anlar Sizi Bekliyor!"}
          </h2>
          <p
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="200"
            className={styles.subtitle}
          >
            {isEn
              ? "The enchanting atmosphere of Tarihi Van Kahvaltı Evi meets authentic flavors!"
              : "Tarihi Van Kahvaltı Evi'nin büyüleyici atmosferi lezzetleriyle birleşiyor!"}
          </p>
        </div>

        <div className={styles.article}>
          <div
            className={styles.richtext}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="300"
          >
            <p>
              {isEn
                ? "In our historic rooms and at our street-side tables, the generous spirit of Van meets the warmth of Beyoğlu. We invite you to Tarihi Van Kahvaltı Evi to experience delightful moments in this unique atmosphere!"
                : "Tarihi salonlarımızda ya da sokak masalarımızda, Van sofrasının cömertliği Beyoğlu'nun sıcaklığıyla buluşuyor. Bu eşsiz atmosferde, keyif dolu anlar yaşamak için sizleri Tarihi Van Kahvaltı Evi'ne bekliyoruz!"}
            </p>
          </div>
          <Link
            href="tel:+905415252868"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="400"
            className={styles.btn}
          >
            {isEn ? "Call Us" : "Bizi Ara"}
          </Link>
        </div>
      </div>
    </section>
  );
}
