"use client";

import Image from "next/image";
import { messagesFor, type SiteLocale } from "../home-localization";
import styles from "./atmosphere-banner.module.css";

export function AtmosphereBanner({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);
  const atmosphere = messages.atmosphere;

  return (
    <section className={styles.section} aria-label={atmosphere.locationBadge}>
      {/* Decorative Arched Top Anchor Motif */}
      <div className={styles.topAnchor} aria-hidden="true">
        <svg viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.anchorSvg}>
          <path
            d="M0 0C30 0 45 28 60 28C75 28 90 0 120 0H0Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Atmospheric Background with Warm Overlay */}
      <div className={styles.bg}>
        <Image
          src="/images/hero-parallax/terrace-table.webp"
          alt="Tarihi Van Kahvaltı Evi Beyoğlu Zambak Sokak"
          fill
          priority={false}
          className={styles.bgImage}
          quality={80}
        />
        <div className={styles.bgOverlay} />
        <div className={styles.bgVignette} />
      </div>

      {/* Atmospheric Content */}
      <div className={styles.container}>
        <div className={styles.badgeWrapper}>
          <span className={styles.locationBadge}>{atmosphere.locationBadge}</span>
        </div>

        <h2 className={styles.title}>
          {atmosphere.words.map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              className={idx === 1 || idx === 3 ? styles.wordGold : styles.wordIvory}
            >
              {word}{" "}
            </span>
          ))}
        </h2>

        <p className={styles.lead}>{atmosphere.lead}</p>
        <p className={styles.subtext}>{atmosphere.subtext}</p>
      </div>
    </section>
  );
}
