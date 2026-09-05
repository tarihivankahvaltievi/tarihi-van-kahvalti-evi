import Image from "next/image";
import styles from "./atmosphere-banner.module.css";

export function AtmosphereBanner({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";
  const heading = isEn ? "A Van Table in Beyoğlu" : "Van Sofrası Beyoğlu'nda";

  return (
    <section className={styles.section2} id="atmosphere-banner">
      <div className={styles.bgWrapper} aria-hidden="true">
        <Image
          src="/images/atmosphere-banner-bg.webp"
          alt="Tarihi Van Kahvaltı Evi Nostaljik Atmosfer"
          fill
          priority
          sizes="100vw"
          quality={85}
          className={styles.bgImg}
        />
      </div>

      <div className={styles.overlay} />

      <div className={styles.textContainer}>
        <h2 className={styles.heading}>
          {heading}
        </h2>
      </div>
    </section>
  );
}
