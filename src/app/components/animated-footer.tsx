import Image from "next/image";
import Link from "next/link";
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
              ? "The Timeless Flavors of Van Breakfast in Beyoğlu"
              : "Van Sofrasının Özlenen Lezzetleri Beyoğlu’nda!"}
          </h4>
          <p className={styles.textParagraph}>
            {isEn
              ? "Since 1978, in our historic Greek townhouse in Taksim, our family has brought the genuine flavors, generosity, and warmth of Van breakfast culture to Istanbul. From protected-origin herb cheese to wild Karakovan honeycomb and oven-warm kete, we invite you to experience an authentic morning feast."
              : "1978 yılından bu yana, Taksim'in tarihi Rum konağında aile emeğiyle kurduğumuz sofralarda; Van yaylalarının hakiki lezzetlerini, cömertliğini ve samimiyetini yaşatıyoruz. Otlu peynirden karakovan balına, sıcak Van ketesinden sahanda lezzetlerimize kadar her anı bir kutlamaya dönüştürmek için sizleri bekliyoruz."}
          </p>
        </div>

        {/* Social Icons */}
        <div className={styles.footerSocial}>
          <ul className={styles.socialList}>
            <li
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
              data-aos-delay="100"
            >
              <a
                href="https://www.instagram.com/tarihivankahvaltievi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Image
                  src="/hamour/instagram.png"
                  alt="Instagram"
                  width={42}
                  height={42}
                />
              </a>
            </li>
            <li
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
              data-aos-delay="200"
            >
              <a
                href="https://www.google.com/maps?cid=10380797280962926014"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
              >
                <Image
                  src="/hamour/facebook.png"
                  alt="Harita ve Konum"
                  width={42}
                  height={42}
                />
              </a>
            </li>
          </ul>
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
            <Link href="/hikayemiz">{isEn ? "Our Story" : "Hikayemiz"}</Link>
            <Link href="/menu">{isEn ? "Menu" : "Menü"}</Link>
            <Link href="/konum">{isEn ? "Contact" : "İletişim"}</Link>
          </nav>
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
