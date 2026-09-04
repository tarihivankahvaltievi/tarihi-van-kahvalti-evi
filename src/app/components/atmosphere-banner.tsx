import Image from "next/image";
import styles from "./atmosphere-banner.module.css";

export function AtmosphereBanner({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";

  return (
    <section className={styles.section2} id="atmosphere-banner">
      {/* Background Image optimized with Next.js priority fill */}
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

      {/* Top White Arch Notch Dipping from Section 1 into Section 2 */}
      <div className={styles.topAnchor} aria-hidden="true">
        <Image
          src="/hamour/anchor-1_3.png"
          alt=""
          width={96}
          height={66}
          className={styles.anchorImg}
          priority
        />
        <div className={styles.notchLogoWrap}>
          <Image
            src="/images/brand-emblem-colored.png"
            alt="Tarihi Van Kahvaltı Evi"
            width={72}
            height={49}
            className={styles.notchLogo}
            priority
          />
        </div>
      </div>

      <div className={styles.overlay} />

      <div className={styles.textContainer}>
        <h2 className={styles.heading}>
          <em
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
            className={styles.italicQuote}
          >
            {isEn ? (
              <>
                “Since 1978 in Beyoğlu,
                <br />
                the warmest family table shaped by authentic Van traditions.”
              </>
            ) : (
              <>
                “1978’den beri Beyoğlu’nda,
                <br />
                Van’ın kadim lezzetleriyle kurulan en sıcak aile sofrası.”
              </>
            )}
          </em>
        </h2>
      </div>

      {/* Bottom Architectural Cutout Transition to Section 3 (Non-wavy Bursa Heritage Arch) */}
      <div className={styles.bottomTransition} aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className={styles.transitionSvg}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 1: Subtle dark depth shadow ribbon along the arch */}
          <path
            d="M0,97 C380,97 560,24 720,17 C880,24 1060,97 1440,97 L1440,120 L0,120 Z"
            fill="rgba(24, 12, 14, 0.28)"
          />
          {/* Layer 2: Subtle translucent highlight ribbon */}
          <path
            d="M0,101 C380,101 560,28 720,21 C880,28 1060,101 1440,101 L1440,120 L0,120 Z"
            fill="rgba(255, 255, 255, 0.35)"
          />
          {/* Layer 3: Main solid warm beige arch connecting seamlessly into Section 3 */}
          <path
            d="M0,105 C380,105 560,32 720,25 C880,32 1060,105 1440,105 L1440,120 L0,120 Z"
            fill="#f2e3d0"
          />
        </svg>
      </div>
    </section>
  );
}
