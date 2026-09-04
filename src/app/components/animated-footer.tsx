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
          <Link href="/" aria-label="Hamour">
            <Image
              src="/hamour/logo-vector-icon.png"
              alt="Hamour"
              width={75}
              height={50}
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
          <Link href="/" aria-label="Hamour">
            <Image
              src="/hamour/logo_logo.png"
              alt="Hamour"
              width={260}
              height={55}
              className={styles.brandLogoImg}
            />
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
              ? "The Longed-for Flavors Are at Hamour!"
              : "Hamour’da Özlenen O Lezzetler Var!"}
          </h4>
          <p className={styles.textParagraph}>
            {isEn
              ? "Hamour was born with the dream of eliminating the need to travel to far countries to pursue the taste of freshly baked breads and cakes that leave a lasting mark on our palate. Embracing this idea with great passion, it turned into a unique place where our guests will feel like they are on a magical street in Paris and discover Hamour's authentic delicacies!"
              : "Hamour, fırından çıkan taptaze ekmek kokusunu, damağımızda iz bırakan pastaların lezzetini ve bu tatların peşine düşmek için uzak ülkelere gitme gerekliliğini ortadan kaldırma hayaliyle doğdu. Büyük bir tutkuyla sahiplendiğimiz bu fikir, misafirlerimizin kendilerini Paris’in büyülü bir caddesinde hissedecekleri ve Hamour’un özgün lezzetlerini keşfedecekleri eşsiz bir mekana dönüştü!"}
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
                href="https://www.instagram.com/hamour.ist"
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
                href="https://www.facebook.com/hamour.ist"
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
