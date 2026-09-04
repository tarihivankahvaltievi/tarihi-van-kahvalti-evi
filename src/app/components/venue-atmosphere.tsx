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

      {/* Atmospheric Background Image */}
      <div className={styles.bgOverlay} aria-hidden="true">
        <Image
          src="/hamour/back1_section-4-img.jpg"
          alt={isEn ? "Delightful Moments Await You!" : "Keyif Dolu Anlar Sizi Bekliyor!"}
          fill
          className={styles.bgImg}
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
              ? "Hamour'un büyüleyici atmosferi lezzetleriyle birleşiyor!"
              : "Hamour'un büyüleyici atmosferi lezzetleriyle birleşiyor!"}
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
                ? "Bringing together the culture of patisserie, brasserie and bistro, Hamour proudly presents an authentic taste experience to its guests. We invite you to Hamour to experience delightful moments in this unique atmosphere!"
                : "Hamour, patiseri, brasserie ve bistro kültürünü bir araya getirerek, özgün bir lezzet deneyimini misafirlerine iftiharla sunuyor. Bu eşsiz atmosferde, keyif dolu anlar yaşamak için sizleri Hamour'a bekliyoruz!"}
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
