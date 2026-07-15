import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı",
  description: "Aradığınız sayfa bulunamadı. Ana sayfadaki menüye, iletişim bilgilerine veya sık sorulan sorulara dönebilirsiniz.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main id="main-content" className="seo-page theme-breakfast">
      <section className="seo-answer-box" aria-labelledby="not-found-title">
        <span className="seo-eyebrow">404</span>
        <h1 id="not-found-title">Bu sayfa artık sofrada değil.</h1>
        <p>Bağlantı değişmiş veya sayfa kaldırılmış olabilir.</p>
        <div className="seo-related" aria-label="Devam bağlantıları">
          <Link href="/">Ana sayfaya dön</Link>
          <Link href="/#menu">Menüyü incele</Link>
          <Link href="/#contact">İletişim ve yol tarifi</Link>
        </div>
      </section>
    </main>
  );
}
