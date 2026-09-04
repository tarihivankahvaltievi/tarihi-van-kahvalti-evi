"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  ArrowUp,
  Award,
} from "lucide-react";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
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

  // Check if currently within operating hours (07:00 - 22:00 Istanbul time)
  const [isOpenNow, setIsOpenNow] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istanbulTime = new Date(utc + 3600000 * 3);
      const hour = istanbulTime.getHours();
      return hour >= 7 && hour < 22;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      try {
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const istanbulTime = new Date(utc + 3600000 * 3);
        const hour = istanbulTime.getHours();
        setIsOpenNow(hour >= 7 && hour < 22);
      } catch {
        // preserve current state
      }
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`${styles.footer} footer-reimagined`} role="contentinfo" aria-label="Site altbilgisi">
      {/* Decorative Top Anchor / Transition from light section */}
      <div className={styles.topAnchor} aria-hidden="true">
        <svg viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.anchorSvg}>
          <path d="M0 0C30 0 45 28 60 28C75 28 90 0 120 0H0Z" fill="#fcfaf7" />
        </svg>
      </div>

      <div className={styles.container}>
        {/* Top Vector Brand Crest (Hamour style) */}
        <div className={styles.vectorWrapper}>
          <button
            type="button"
            onClick={scrollToTop}
            className={styles.crestLink}
            aria-label={footer.backToTop}
          >
            <Image
              src="/images/brand-icon-small.png"
              alt="Tarihi Van Kahvaltı Evi"
              width={64}
              height={80}
              className={styles.vectorImg}
              loading="lazy"
            />
          </button>
        </div>

        {/* Brand Typographic Identity */}
        <div className={styles.brandTitleWrap}>
          <h2 className={styles.brandTitle}>TARİHİ VAN KAHVALTI EVİ</h2>
          <span className={styles.brandSubtitle}>BEYOĞLU • İSTANBUL • 1978</span>
        </div>

        {/* Brand Manifesto & Philosophy (Hamour footer-text style) */}
        <div className={styles.manifestoWrapper}>
          <h3 className={styles.manifestoHeading}>
            {footer.manifesto} <span>{footer.manifestoEmphasis}</span>
          </h3>
          <p className={styles.manifestoText}>{footer.description}</p>
        </div>

        {/* Social & Direct Contact Buttons (Hamour footer-social style) */}
        <div className={styles.socialGroup}>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="Instagram"
          >
            <InstagramIcon size={20} />
            <span className={styles.socialLabel}>Instagram</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label={footer.whatsapp}
          >
            <MessageCircle size={20} />
            <span className={styles.socialLabel}>WhatsApp</span>
          </a>

          <a
            href={telUrl}
            className={styles.socialIcon}
            aria-label={`Telefon: ${displayPhone}`}
          >
            <Phone size={20} />
            <span className={styles.socialLabel}>{displayPhone}</span>
          </a>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
            aria-label="Google Haritalar"
          >
            <MapPin size={20} />
            <span className={styles.socialLabel}>Harita / Yol Tarifi</span>
          </a>
        </div>

        {/* Refined Navigation Menu (Hamour footer-menu style) */}
        <nav className={styles.nav} aria-label="Altbilgi menüsü">
          <Link href={messages.aboutHref} className={styles.navLink}>
            {isTr ? "Hikâyemiz" : "Our Story"}
          </Link>
          <Link href={messages.menuHref} className={styles.navLink}>
            {isTr ? "Menü & Fiyatlar" : "Menu & Prices"}
          </Link>
          <Link
            href={isTr ? "/rezervasyon" : "/en/rezervasyon"}
            className={styles.navLink}
          >
            {isTr ? "Rezervasyon" : "Reservation"}
          </Link>
          <Link href={messages.galleryHref} className={styles.navLink}>
            {isTr ? "Mekân Galerisi" : "Gallery"}
          </Link>
          <Link href="/van-kahvaltisi" className={styles.navLink}>
            {isTr ? "Van Kahvaltısı Nedir?" : "Van Breakfast Guide"}
          </Link>
          <Link href="/konum" className={styles.navLink}>
            {isTr ? "Konum & İletişim" : "Location"}
          </Link>
          <Link href={messages.faqHref} className={styles.navLink}>
            {isTr ? "Sıkça Sorulanlar" : "FAQ"}
          </Link>
        </nav>

        {/* Concierge & Heritage Badges Bar */}
        <div className={styles.conciergeBar}>
          <div className={styles.conciergeItem}>
            <Award className={styles.conciergeIcon} size={22} />
            <div>
              <span className={styles.conciergeTitle}>{footer.listedTitle}</span>
              <span className={styles.conciergeSub}>{footer.listedSubtitle}</span>
            </div>
          </div>

          <div className={styles.conciergeDivider} aria-hidden="true" />

          <div className={styles.conciergeItem}>
            <Clock className={styles.conciergeIcon} size={22} />
            <div>
              <span className={styles.conciergeTitle}>
                {footer.hours}: {openingHours.opens} – {openingHours.closes}
              </span>
              <span className={styles.conciergeSub}>
                <span
                  className={`${styles.statusDot} ${isOpenNow ? styles.statusOpen : styles.statusClosed}`}
                  aria-hidden="true"
                />
                {isOpenNow
                  ? isTr ? "Şu an açık • Masanız hazır" : "Open now • Table ready"
                  : isTr ? "Şu an kapalı • Sabah 07:00'de açılıyor" : "Closed now • Opens at 07:00"}
              </span>
            </div>
          </div>

          <div className={styles.conciergeDivider} aria-hidden="true" />

          <div className={styles.conciergeItem}>
            <MapPin className={styles.conciergeIcon} size={22} />
            <div>
              <span className={styles.conciergeTitle}>Zambak Sokak No:16/A</span>
              <span className={styles.conciergeSub}>Beyoğlu / Taksim, İstanbul</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip (Copyright & Legal) */}
        <div className={styles.bot}>
          <span className={styles.copyright}>
            {footer.copyright}
          </span>

          <div className={styles.botLinks}>
            <Link href="/gizlilik" className={styles.botLink}>
              {footer.privacy}
            </Link>
            <Link href="/cerez-politikasi" className={styles.botLink}>
              {footer.cookies}
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className={styles.backToTopBtn}
              aria-label={footer.backToTop}
            >
              <span>{footer.backToTop}</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
