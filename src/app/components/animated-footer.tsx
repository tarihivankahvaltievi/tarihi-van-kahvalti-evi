"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import {
  displayPhone,
  mapsUrl,
  openingHours,
  telUrl,
  whatsappUrl,
  instagramUrl,
} from "../seo";
import { messagesFor, type SiteLocale } from "../home-localization";
import styles from "./animated-footer.module.css";

export function AnimatedFooter({ locale = "tr" }: { locale?: SiteLocale }) {
  const messages = messagesFor(locale);
  const footer = messages.footer;
  const isTr = locale === "tr";

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className={`${styles.footer} footer-reimagined`} role="contentinfo" aria-label="Site altbilgisi">
      <div className={styles.imageWash} aria-hidden="true" />
      <div className={styles.container}>
        <button type="button" onClick={scrollToTop} className={styles.crestLink} aria-label={footer.backToTop}>
          <Image
            src="/images/brand-icon-small.png"
            alt="Tarihi Van Kahvaltı Evi"
            width={65}
            height={80}
            className={styles.crest}
            loading="lazy"
          />
        </button>

        <div className={styles.brandLockup}>
          <p>{isTr ? "1978 · BEYOĞLU" : "EST. 1978 · BEYOĞLU"}</p>
          <h2>TARİHİ VAN KAHVALTI EVİ</h2>
        </div>

        <section className={styles.manifesto} aria-label={footer.manifesto}>
          <h3>{footer.manifesto} <em>{footer.manifestoEmphasis}</em></h3>
          <p>{footer.description}</p>
        </section>

        <div className={styles.contactLine}>
          <a href={telUrl}>{displayPhone}</a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">{isTr ? "Yol Tarifi" : "Directions"}</a>
          <span>{openingHours.opens}–{openingHours.closes}</span>
        </div>

        <div className={styles.lower}>
          <nav className={styles.nav} aria-label="Altbilgi menüsü">
            <Link href={messages.aboutHref}>{isTr ? "Hikâyemiz" : "Our Story"}</Link>
            <Link href={messages.menuHref}>{isTr ? "Menü" : "Menu"}</Link>
            <Link href={isTr ? "/rezervasyon" : "/en/rezervasyon"}>{isTr ? "Rezervasyon" : "Reservation"}</Link>
            <Link href="/konum">{isTr ? "İletişim" : "Contact"}</Link>
          </nav>
          <a className={styles.social} href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>

        <div className={styles.legal}>
          <span>{footer.copyright}</span>
          <div>
            <Link href="/gizlilik">{footer.privacy}</Link>
            <Link href="/cerez-politikasi">{footer.cookies}</Link>
            <button type="button" onClick={scrollToTop} aria-label={footer.backToTop}>
              <span>{footer.backToTop}</span><ArrowUp size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
