import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, Clock3, MapPin, Phone } from "lucide-react";
import { displayPhone, mapsUrl, openingHours, telUrl } from "../seo";
import styles from "./animated-footer.module.css";

export function AnimatedFooter({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";

  return (
    <footer className={`${styles.footer} footer-reimagined`} id="hamour-footer">
      <div className={styles.container}>
        {/* Flower Vector Emblem */}
        <div
          className={styles.footerVector}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="100"
        >
          <Link href="/" aria-label="Tarihi Van Kahvaltı Evi">
            <Image
              src="/images/brand-emblem-colored.png"
              alt="Tarihi Van Kahvaltı Evi"
              width={75}
              height={51}
              className={styles.vectorImg}
            />
          </Link>
        </div>

        {/* Brand Typography Logo */}
        <div
          className={styles.footerLogo}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="100"
        >
          <Link href="/" aria-label="Tarihi Van Kahvaltı Evi" className={styles.brandTitleLink}>
            <span className={styles.brandProvenance}>1978 · BEYOĞLU</span>
            <span className={styles.brandName}>TARİHİ VAN KAHVALTI EVİ</span>
          </Link>
        </div>

        {/* Text Section */}
        <div
          className={styles.footerText}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="100"
        >
          <h4 className={styles.textTitle}>
            {isEn
              ? "The timeless flavors of Van, in Beyoğlu"
              : "Van sofrasının özlenen lezzetleri Beyoğlu’nda"}
          </h4>
          <p className={styles.textParagraph}>
            {isEn
              ? "A generous Van breakfast table, served with the warmth of a family home in the heart of Beyoğlu."
              : "Beyoğlu'nun kalbinde, aile sıcaklığıyla kurulan cömert bir Van kahvaltısı sofrası."}
          </p>
        </div>

        <div className={styles.quickLinks} data-aos="fade-up" data-aos-delay="160">
          <a href={telUrl} className={styles.quickLink}><Phone aria-hidden="true" /><span><small>{isEn ? "Call" : "Telefon"}</small>{displayPhone}</span></a>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.quickLink}><MapPin aria-hidden="true" /><span><small>{isEn ? "Location" : "Konum"}</small>{isEn ? "Get directions" : "Yol tarifi al"}</span><ArrowUpRight aria-hidden="true" className={styles.quickArrow} /></a>
          <div className={styles.quickLink}><Clock3 aria-hidden="true" /><span><small>{isEn ? "Opening hours" : "Çalışma saatleri"}</small>{openingHours.short}</span></div>
        </div>

        {/* Navigation Menu */}
        <div className={styles.footerMenu}>
          <nav
            className={styles.nav}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
          >
            <Link href="/hikayemiz">{isEn ? "Our Story" : "Hikâyemiz"}</Link>
            <Link href="/menu">{isEn ? "Menu" : "Menü"}</Link>
            <Link href="/konum">{isEn ? "Contact" : "İletişim"}</Link>
          </nav>
          <a href="https://www.instagram.com/tarihivankahvaltievi/" target="_blank" rel="noopener noreferrer" className={styles.instagramLink}><Camera aria-hidden="true" /> Instagram</a>
        </div>

        {/* Bottom Legal / Copyright */}
        <div
          className={styles.footerBot}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="100"
        >
          <span>2026 © Tüm hakları saklıdır.</span>
          <Link href="/gizlilik">Kullanım Koşulları</Link>
          <Link href="/gizlilik">Gizlilik</Link>
          <Link href="/cerez-politikasi">Çerez Tercihleri</Link>
          <Link href="/van-kahvaltisi" className={styles.seoHiddenLink}>Van Kahvaltısı</Link>
          <Link href="/van-kahvaltisi-nedir" className={styles.seoHiddenLink}>Van Kahvaltısı Nedir</Link>
        </div>
      </div>
    </footer>
  );
}
