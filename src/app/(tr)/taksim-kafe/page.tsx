import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ClientPage from "../../client-page";
import { AnimatedFooter } from "../../components/animated-footer";
import { CoffeeScene } from "../../coffee/coffee-interactions";
import { absoluteUrl, buildBreadcrumbJsonLd, buildRestaurantJsonLd, jsonLd, mapsUrl, siteName, siteUrl } from "../../seo";
import styles from "../../coffee/coffee.module.css";

// The shared navigation reads the current pathname. Keep one complete HTML
// document instead of duplicating the page inside a streaming fallback.
export const instant = false;

const url = absoluteUrl("/taksim-kafe");
const title = "Taksim’de Kahve Keyfi | Tarihi Van Kahvaltı Evi";
const description = "Taksim, Beyoğlu Zambak Sokak’ta tarihi atmosferde kahve keyfi. Türk kahvesi, latte ve soğuk kahveler için menüyü keşfedin, yol tarifi alın.";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName, locale: "tr_TR", type: "website", images: [{ url: absoluteUrl("/images/coffee/coffee-og.jpg"), width: 1200, height: 630, alt: "Tarihi Van Kahvaltı Evi — tarihi atmosferde kahve keyfi" }] },
  twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/images/coffee/coffee-og.jpg")] },
};

function CoffeeContent() {
  return <main id="main-content" className={styles.page} tabIndex={-1}>
    <section className={styles.hero} aria-labelledby="coffee-heading">
      <CoffeeScene />
      <div className={styles.heroCopy}>
        <h1 id="coffee-heading">Tarihi atmosferde<br /><span>kahve keyfi.</span></h1>
        <p>Taksim’in kalbinde, Tarihi Van’da.</p>
        <a href="#kahve-hikayesi" className={styles.discover} aria-label="Kahve sayfasını keşfedin"><ArrowDown size={21} strokeWidth={1.3} /></a>
      </div>
    </section>

    <section id="kahve-hikayesi" className={styles.story} aria-labelledby="coffee-story-title">
      <div className={styles.engraving} aria-hidden="true" />
      <div className={styles.storyIntro}>
        <Image src="/images/brand-emblem-colored.png" alt="" width={85} height={58} className={styles.emblem} />
        <h2 id="coffee-story-title">Bir kahve, biraz sohbet.<br /><span>Bir de Beyoğlu.</span></h2>
        <p>Oymalı aynalar, ahşap sandalyeler, sokağa açılan masalar…<br className={styles.desktopBreak} /> Kahvaltıyla başlayan sohbet, bir fincan kahveyle devam eder.</p>
        <Link href="/menu#sicak-kahveler" className={styles.menuLink}>Kahve menümüz <ArrowUpRight size={17} /></Link>
      </div>
      <div className={styles.frames}>
        <figure className={styles.frameLeft} data-aos="fade-right">
          <div className={styles.framedPhoto}>
            <Image src="/images/interior-chair.webp" alt="Tarihi Van’ın antika koltuğu, oymalı aynası ve eski telefonu" fill sizes="(max-width: 600px) 42vw, 360px" className={styles.venuePhoto} />
            <Image src="/images/coffee/antique-frame.webp" alt="" fill sizes="(max-width: 600px) 45vw, 390px" className={styles.pictureFrame} />
          </div>
          <figcaption>Her köşesinde bir hikâye.</figcaption>
        </figure>
        <figure className={styles.frameRight} data-aos="fade-left">
          <div className={styles.framedPhoto}>
            <Image src="/images/coffee-moment.webp" alt="Tarihi Van’da masada paylaşılan Türk kahvesi" fill sizes="(max-width: 600px) 42vw, 360px" className={styles.venuePhoto} />
            <Image src="/images/coffee/antique-frame.webp" alt="" fill sizes="(max-width: 600px) 45vw, 390px" className={styles.pictureFrame} />
          </div>
          <figcaption>Fincanlarda biriken sohbet.</figcaption>
        </figure>
      </div>
    </section>

    <section className={styles.venue} aria-labelledby="coffee-venue-title">
      <Image src="/hamour/anchor-2.png" alt="" width={74} height={41} className={styles.sectionAnchor} />
      <Image src="/images/atmosphere-banner-bg.webp" alt="Tarihi Van Kahvaltı Evi’nde eski radyo, televizyon, tablolar ve ahşap masalarla iç mekân" fill sizes="100vw" quality={84} className={styles.venueBackground} />
      <div className={styles.venueContent}>
        <div><h2 id="coffee-venue-title">Tarihi Van, Beyoğlu.</h2><p>Zambak Sokak No:8 · Taksim</p></div>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.directions}>Yol tarifi al <ArrowUpRight size={18} /></a>
      </div>
    </section>
  </main>;
}

export default function CoffeePage() {
  const schema = { "@context": "https://schema.org", "@graph": [buildRestaurantJsonLd(false),
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "tr-TR", isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": `${siteUrl}/#restaurant` } },
    buildBreadcrumbJsonLd(url, "Kahve keyfi", false),
  ] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <ClientPage><CoffeeContent /><AnimatedFooter /></ClientPage>
  </>;
}
