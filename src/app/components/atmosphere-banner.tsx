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
          width={84}
          height={58}
          className={styles.anchorImg}
          priority
        />
        <div className={styles.notchLogoWrap}>
          <Image
            src="/images/brand-emblem-colored.png"
            alt="Tarihi Van Kahvaltı Evi"
            width={44}
            height={30}
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
          </span>
        </h2>
      </div>

      {/* Bottom Architectural Cutout Transition to Section 3 */}
      <div className={styles.bottomTransition} aria-hidden="true">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className={styles.transitionSvg}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle depth shadow ribbon along the curve */}
          <path
            d="M0,27 Q720,77 1440,27 L1440,90 L0,90 Z"
            fill="rgba(24, 12, 14, 0.25)"
          />
          {/* Subtle translucent highlight ribbon */}
          <path
            d="M0,31 Q720,81 1440,31 L1440,90 L0,90 Z"
            fill="rgba(255, 255, 255, 0.3)"
          />
          {/* Main solid beige arch connecting seamlessly into Section 3 */}
          <path
            d="M0,35 Q720,85 1440,35 L1440,90 L0,90 Z"
            fill="#f2e3d0"
          />
        </svg>
      </div>
    </section>
  );
}
