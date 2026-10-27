import Image from "next/image";
import Link from "next/link";
import styles from "../components/animated-footer.module.css";
import { coffeeCopy, coffeeGuidePaths, coffeePaths, type CoffeeLocale } from "./coffee-localization";

export function CoffeeFooter({ locale }: { locale: CoffeeLocale }) {
  const c = coffeeCopy[locale];
  const menu = locale === "tr" ? "/menu" : "/en/menu";
  return <footer data-analytics-surface="coffee_footer" id="hamour-footer" className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.footerVector}><Link href={coffeePaths[locale]} aria-label="Tarihi Van Kahvaltı Evi"><Image src="/images/brand-emblem-colored.png" alt="" width={75} height={51} className={styles.vectorImg} /></Link></div>
      <div className={styles.footerLogo}><Link href={coffeePaths[locale]} className={styles.brandTitleLink}><bdi className={styles.brandName}>TARİHİ VAN KAHVALTI EVİ</bdi></Link></div>
      <div className={styles.footerText}><h2 className={styles.textTitle}>{c.footer.heading}</h2><p className={styles.textParagraph}>{c.footer.text}</p></div>
      <div className={styles.footerSocial}><ul className={styles.socialList}>
        <li><a href="https://www.instagram.com/tarihivankahvaltievi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Image src="/hamour/instagram.png" alt="" width={42} height={42} /></a></li>
        <li><a href="https://www.facebook.com/tarihivankahvaltievi/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Image src="/hamour/facebook.png" alt="" width={42} height={42} /></a></li>
      </ul></div>
      <div className={styles.footerMenu}><nav className={styles.nav}>
        <Link href={coffeePaths[locale]}>{c.nav.coffee}</Link><Link href={menu} hrefLang={locale === "tr" ? "tr" : "en"}>{c.nav.menu}</Link><Link href={coffeeGuidePaths[locale]}>{c.nav.guide}</Link>
      </nav></div>
      <div className={styles.footerBot}><span>2026 © {c.footer.rights}</span><Link href="/gizlilik" hrefLang="tr">{c.footer.privacy}</Link><Link href="/cerez-politikasi" hrefLang="tr">{c.footer.cookies}</Link></div>
    </div>
  </footer>;
}
