import Image from "next/image";
import styles from "./atmosphere-banner.module.css";

export function AtmosphereBanner({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";

  const words = isEn
    ? ["Elegance", "and", "Flavor", "Meet", "at Hamour!"]
    : ["Zarafet", "ve", "Lezzet", "Hamour’da", "Buluşuyor!"];

  return (
    <section className={styles.section2} id="atmosphere-banner">
      <div className={styles.topAnchor} aria-hidden="true">
        <Image
          src="/hamour/anchor-1.png"
          alt=""
          width={70}
          height={35}
          className={styles.anchorImg}
          priority
        />
      </div>

      <div className={styles.overlay} />

      <div className={styles.textContainer}>
        <h2 className={styles.heading}>
          {words.map((word, index) => (
            <span
              key={index}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
              data-aos-delay={(index + 1) * 100}
              className={styles.wordSpan}
            >
              {word}&nbsp;
            </span>
          ))}
        </h2>
      </div>

      <div className={styles.botAnchor} aria-hidden="true">
        <Image
          src="/hamour/anchor-1.png"
          alt=""
          width={70}
          height={35}
          className={styles.anchorImgRotated}
        />
      </div>
    </section>
  );
}
