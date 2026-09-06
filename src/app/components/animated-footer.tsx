import Image from "next/image";
import Link from "next/link";
import styles from "./animated-footer.module.css";

export function AnimatedFooter({ locale = "tr" }: { locale?: string }) {
  const isEn = locale === "en";

  return (
    <footer className={styles.footer} id="hamour-footer">
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
              ? "The Longed-for Flavors Are at Van Kahvaltı Evi!"
              : "Van Kahvaltı Evi’nde Özlenen O Lezzetler Var!"}
          </h4>
          <p className={styles.textParagraph}>
            {isEn
              ? "Tarihi Van Kahvaltı Evi was born with the passion of bringing together the scent of oven-fresh golden pişi, the authentic flavors of highland herb cheeses, and the generous spirit of a family table without having to travel far. This family tradition has turned into an enchanting sanctuary in Beyoğlu where guests feel at home and discover centuries-old breakfast traditions."
              : "Tarihi Van Kahvaltı Evi, fırından yeni çıkan sıcacık pişi ve kete kokusunu, Doğu'nun bereketli yaylalarından süzülen hakiki otlu peynirin lezzetini ve bu tatların peşine düşmek için uzak diyarlara gitme gerekliliğini ortadan kaldırma hayaliyle doğdu. Büyük bir tutkuyla sahiplendiğimiz bu aile mirası, misafirlerimizin kendilerini Beyoğlu'nun tarihi dokusunda sıcacık bir Van evinde hissedecekleri ve kadim kahvaltı lezzetlerini keşfedecekleri eşsiz bir mekana dönüştü!"}
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
                href="https://www.facebook.com/tarihivankahvaltievi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Image
                  src="/hamour/facebook.png"
                  alt="Facebook"
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
            <Link href={isEn ? "/en#story" : "/hikayemiz"}>{isEn ? "Our Story" : "Hikayemiz"}</Link>
            <Link href={isEn ? "/en/menu" : "/menu"}>{isEn ? "Menu" : "Menü"}</Link>
            <Link href="/van-kahvaltisi">{isEn ? "Breakfast Guide" : "Van Kahvaltısı"}</Link>
            <Link href="/van-kahvaltisi-nedir">{isEn ? "Van Breakfast History" : "Van Kahvaltısı Nedir?"}</Link>
            <Link href={isEn ? "/en#location" : "/konum"}>{isEn ? "Contact" : "İletişim"}</Link>
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
          <Link href="/gizlilik">{isEn ? "Privacy Policy" : "Gizlilik Politikası"}</Link>
          <Link href="/cerez-politikasi">{isEn ? "Cookie Policy" : "Çerez Politikası"}</Link>
        </div>
      </div>
    </footer>
  );
}
