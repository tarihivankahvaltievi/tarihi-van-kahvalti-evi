"use client";

import Image from "next/image";
import { Phone, Calendar } from "lucide-react";
import { BookingOpenButton } from "./booking-open-button";
import { displayPhone, telUrl } from "../seo";
import { messagesFor, type SiteLocale } from "../home-localization";
import styles from "./venue-atmosphere.module.css";

export function VenueAtmosphere({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);
  const venue = messages.venue;

  return (
    <section className={styles.section} aria-labelledby="venue-heading">
      <div className={styles.bg}>
        <Image
          src="/images/balcony-breakfast.webp"
          alt="Tarihi Van Kahvaltı Evi Balkon ve İç Mekan Atmosferi"
          fill
          sizes="100vw"
          className={styles.bgImage}
          quality={78}
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.headCol}>
            <p className={styles.badge}>{venue.badge}</p>
            <h2 id="venue-heading" className={styles.title}>
              {venue.title}
            </h2>
            <p className={styles.subtitle}>{venue.subtitle}</p>
          </div>

          <div className={styles.articleCol}>
            <p className={styles.desc}>{venue.description}</p>

            <div className={styles.actions}>
              <a href={telUrl} className={styles.phoneBtn}>
                <Phone size={18} aria-hidden="true" />
                <span>{venue.callAction} ({displayPhone})</span>
              </a>
              <BookingOpenButton className={styles.reserveBtn}>
                <Calendar size={18} aria-hidden="true" />
                <span>{venue.reservationAction}</span>
              </BookingOpenButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
