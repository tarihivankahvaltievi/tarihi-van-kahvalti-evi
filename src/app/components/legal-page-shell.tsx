import Link from "next/link";
import { displayAddress, displayPhone, email, siteName, telUrl } from "../seo";
import styles from "./legal-page.module.css";

export function LegalPageShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/">{siteName}</Link>
        <nav aria-label="Yasal sayfalar menüsü">
          <Link href="/gizlilik">Gizlilik</Link>
          <Link href="/cerez-politikasi">Çerezler</Link>
          <Link href="/menu">Menü</Link>
        </nav>
      </header>
      <main id="main-content" className={styles.main}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.updated}>Son güncelleme: 19 Temmuz 2026</p>
        <div className={styles.content}>{children}</div>
        <aside className={styles.contact} aria-label="İletişim bilgileri">
          <h2>İletişim</h2>
          <address>{siteName}<br />{displayAddress}<br />Türkiye</address>
          <a href={telUrl}>{displayPhone}</a>
          <a href={`mailto:${email}`}>{email}</a>
        </aside>
      </main>
      <footer className={styles.footer}>
        <Link href="/">Ana sayfaya dön</Link>
        <span>© 2026 {siteName}</span>
      </footer>
    </div>
  );
}
