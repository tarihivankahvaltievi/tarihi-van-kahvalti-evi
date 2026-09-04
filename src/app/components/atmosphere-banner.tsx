import Image from "next/image";
import styles from "./atmosphere-banner.module.css";

export function AtmosphereBanner({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";

  return (
    <section className={styles.section2} id="atmosphere-banner">
      {/* Top White Arch Notch Dipping from Section 1 into Section 2 */}
      <div className={styles.topAnchor} aria-hidden="true">
        <Image
          src="/hamour/anchor-1_3.png"
          alt=""
          width={74}
          height={51}
          className={styles.anchorImg}
          priority
        />
        <div className={styles.notchLogoWrap}>
          <Image
            src="/images/brand-logo-burgundy.png"
            alt="Tarihi Van Kahvaltı Evi"
            width={54}
            height={37}
            className={styles.notchLogo}
            priority
          />
        </div>
      </div>

      <div className={styles.overlay} />

      <div className={styles.textContainer}>
        <h2 className={styles.heading}>
          <span
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
            className={styles.line}
          >
            {isEn ? "Elegance and Flavor" : "Zarafet ve Lezzet"}
          </span>
          <br />
          <span
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="300"
            className={styles.line}
          >
            {isEn ? "Meet at Hamour!" : "Hamour’da Buluşuyor!"}
          </span>
        </h2>
      </div>
    </section>
  );
}
