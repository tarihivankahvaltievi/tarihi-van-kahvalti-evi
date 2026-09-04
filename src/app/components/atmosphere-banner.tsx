"use client";

import Image from "next/image";
import { messagesFor, type SiteLocale } from "../home-localization";
import styles from "./atmosphere-banner.module.css";

export function AtmosphereBanner({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);
  const atmosphere = messages.atmosphere;

  return (
    <section className={styles.section} aria-label={atmosphere.locationBadge}>
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

      <div className={styles.container}>
        <p className={styles.locationBadge}>{atmosphere.locationBadge}</p>
        <h2 className={styles.title}>
          {atmosphere.words.map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              className={idx === 1 || idx === 3 ? styles.wordAccent : undefined}
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
