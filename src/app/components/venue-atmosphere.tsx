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
                ? "Blending our heritage breakfast tradition since 1978 with the historic charm of Beyoğlu, we offer an authentic culinary gathering place. Whether under the high ceilings of our heritage rooms or at our lively street-side tables, we invite you to experience heartwarming breakfast moments at Tarihi Van Kahvaltı Evi!"
                : "1978'den beri süregelen sofra kültürümüzü, Beyoğlu'nun yaşayan tarihi ve sıcacık misafirperverliğimizle harmanlayarak misafirlerimize unutulmaz bir deneyim sunuyoruz. Yüksek tavanlı ferah salonlarımızda veya sokak masalarımızda, dostlarınızla ve ailenizle keyif dolu anlar yaşamak için sizleri Tarihi Van Kahvaltı Evi'ne bekliyoruz!"}
            </p>
          </div>
          <Link
            href="tel:+905320502717"
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
