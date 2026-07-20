import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, UtensilsCrossed } from "lucide-react";
import ClientPage from "../client-page";
import { AnimatedFooter } from "../components/animated-footer";
import styles from "../components/editorial-page.module.css";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildRestaurantJsonLd,
  jsonLd,
  siteName,
  siteUrl,
  storyUrl,
} from "../seo";

const storyTitle = "1978'den Beri Van Sofrası | Hikâyemiz";
const storyDescription =
  "Tarihi Van Kahvaltı Evi'nin 1978'den bugüne aile sofrası yolculuğu; Zambak Sokak'taki tarihi Beyoğlu dokusu, günlük hazırlık ve Van kahvaltısı geleneği.";

export const metadata: Metadata = {
  title: storyTitle,
  description: storyDescription,
  alternates: { canonical: storyUrl },
  openGraph: {
    title: `${storyTitle} | ${siteName}`,
    description: storyDescription,
    url: storyUrl,
    siteName,
    locale: "tr_TR",
    type: "article",
    images: [
      {
        url: absoluteUrl("/images/historic-mirror.webp"),
        width: 1200,
        height: 800,
        alt: "Tarihi Van Kahvaltı Evi'nin oymalı aynası ve tuğla duvar dokusu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${storyTitle} | ${siteName}`,
    description: storyDescription,
    images: [absoluteUrl("/images/historic-mirror.webp")],
  },
};

export default function StoryPage() {
  const storyJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "AboutPage",
        "@id": `${storyUrl}#webpage`,
        url: storyUrl,
        name: `${storyTitle} | ${siteName}`,
        description: storyDescription,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        mainEntity: { "@id": `${siteUrl}/#restaurant` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/historic-mirror.webp"),
        },
      },
      buildBreadcrumbJsonLd(storyUrl, "Hikâyemiz", false),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(storyJsonLd) }} />
      <ClientPage>
        <main id="main-content" className={styles.page}>
          <article>
            <header className={styles.hero}>
              <div>
                <p className={styles.eyebrow}>1978&apos;den beri bir aile sofrası</p>
                <h1>
                  Van&apos;dan
                  <span>Beyoğlu&apos;na</span>
                </h1>
                <p className={styles.lead}>
                  Tarihi Van Kahvaltı Evi&apos;nin hikâyesi, Van&apos;ın kahvaltı geleneğini paylaşma isteğiyle başlayan
                  bir aile yolculuğudur. Bugün aynı sofra kültürünü Zambak Sokak&apos;ta, Beyoğlu&apos;nun tarih taşıyan
                  dokusu içinde günlük emek ve misafirperverlikle sürdürüyoruz.
                </p>
                <div className={styles.actions}>
                  <Link className={styles.primaryAction} href="/menu">
                    <UtensilsCrossed size={18} aria-hidden="true" /> Bugünün menüsü
                  </Link>
                  <Link className={styles.secondaryAction} href="/konum">
                    <MapPin size={18} aria-hidden="true" /> Zambak Sokak&apos;ı bulun
                  </Link>
                </div>
              </div>
              <div className={styles.heroVisual}>
                <figure className={styles.heroImage}>
                  <Image
                    src="/images/historic-mirror.webp"
                    alt="Tarihi Van Kahvaltı Evi'nde oymalı ayna, tuğla duvar ve nostaljik iç mekân"
                    fill
                    priority
                    sizes="(max-width: 820px) calc(100vw - 2rem), 44vw"
                    quality={80}
                  />
                </figure>
                <p className={styles.imageNote}>Eski aynalar, tuğla duvarlar ve sokağa açılan masalar Beyoğlu&apos;ndaki mekânın hafızasını taşır.</p>
              </div>
            </header>

            <nav className={styles.quickNav} aria-label="Hikâyemiz bölümleri">
              <div className={styles.quickNavInner}>
                <strong>Hikâyemiz</strong>
                <a href="#1978den-bugune">1978&apos;den bugüne</a>
                <a href="#mekan">Zambak Sokak</a>
                <a href="#yaklasim">Sofra yaklaşımı</a>
              </div>
            </nav>

            <section id="1978den-bugune" className={styles.section} aria-labelledby="journey-title">
              <header className={styles.sectionHeader}>
                <div>
                  <p className={styles.sectionLabel}>Süren bir gelenek</p>
                  <h2 id="journey-title">1978&apos;den bugüne aynı sofra fikri</h2>
                </div>
                <p>
                  Değişmeyen fikir basit: Van kahvaltısını tek tek ürünlerden oluşan hızlı bir öğün olarak değil,
                  masadaki herkesin paylaştığı uzun bir buluşma olarak yaşatmak.
                </p>
              </header>
              <div className={styles.principleGrid}>
                <article>
                  <h3>Yöresel hafıza</h3>
                  <p>Otlu peynir, murtuğa, kavut, kete ve cacık gibi tatlar menüde yalnız isim değil; Van sofrasının birbirini tamamlayan parçalarıdır.</p>
                </article>
                <article>
                  <h3>Birlikte yenilen masa</h3>
                  <p>Serpme servis, tatlı ve tuzlu tabakları aynı anda paylaşmaya; sıcakları beklerken çayı ve sohbeti tazelemeye dayanır.</p>
                </article>
                <article>
                  <h3>Günlük hazırlık</h3>
                  <p>Reçellerden sıcak pişiye, bakır sahandan çaya uzanan servis her gün yeniden hazırlanır ve ürün bulunabilirliği buna göre değişebilir.</p>
                </article>
                <article>
                  <h3>Bugünün şeffaflığı</h3>
                  <p>Güncel ürün ve fiyatları ayrı bir canlı menüde tutuyor; misafirlerin ziyaret öncesinde doğru bilgiyi görmesini önemsiyoruz.</p>
                </article>
              </div>
            </section>

            <section id="mekan" className={styles.splitSection} aria-labelledby="place-story-title">
              <figure className={styles.insetImage}>
                <Image
                  src="/images/interior-chair.webp"
                  alt="Tarihi Beyoğlu binasında tuğla duvar, eski ayna ve sandalye"
                  fill
                  sizes="(max-width: 820px) calc(100vw - 2rem), 43vw"
                  quality={80}
                />
              </figure>
              <div className={styles.splitCopy}>
                <p className={styles.sectionLabel}>Mekânın karakteri</p>
                <h2 id="place-story-title">Zambak Sokak&apos;ta Beyoğlu&apos;nun içinde</h2>
                <p>
                  Mekânımız, Şehit Muhtar Mahallesi&apos;nde Zambak Sokak No:8&apos;de yer alıyor. Tuğla duvarlar,
                  eski aynalar, iç mekân köşeleri ve sokağa açılan masalar; Van sofrasını Beyoğlu&apos;nun gündelik
                  hayatıyla buluşturuyor.
                </p>
                <p>
                  Taksim Meydanı, İstiklal Caddesi ve M2 Taksim durağından yürüyerek ulaşılabilen konumumuz,
                  hem İstanbul&apos;da yaşayanlar hem de şehri gezen misafirler için erişilebilir bir buluşma noktasıdır.
                </p>
                <div className={styles.actions}>
                  <Link className={styles.secondaryAction} href="/konum">
                    Konum ve yol tarifi <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </section>

            <figure className={styles.wideImage}>
              <Image
                src="/images/street-table.webp"
                alt="Beyoğlu Zambak Sokak'ta Tarihi Van Kahvaltı Evi'nin dışarıdaki masaları"
                fill
                sizes="calc(100vw - 2rem)"
                quality={80}
              />
              <figcaption>Zambak Sokak&apos;taki masalar, kahvaltıyı Beyoğlu&apos;nun sokak ritmine açar.</figcaption>
            </figure>

            <section id="yaklasim" className={styles.section} aria-labelledby="approach-title">
              <header className={styles.sectionHeader}>
                <div>
                  <p className={styles.sectionLabel}>Bugünkü yaklaşımımız</p>
                  <h2 id="approach-title">Sofrayı canlı tutan üç şey</h2>
                </div>
                <p>
                  Bir geleneği korumak, onu dondurmak değildir. Doğru ürünü, günlük emeği ve açık bilgiyi aynı masada buluşturmaktır.
                </p>
              </header>
              <ol className={styles.numberedList}>
                <li><strong>Yöresel karakter:</strong> Van&apos;a ait lezzetleri adları ve hazırlık biçimleriyle görünür kılmak.</li>
                <li><strong>Özenli servis:</strong> Sıcak sahanı sıcak, çayı taze, paylaşımlık sofrayı dengeli sunmak.</li>
                <li><strong>Açık bilgi:</strong> Menü, fiyat, adres, saat ve ulaşım bilgisini ziyaret öncesinde kolayca bulunur tutmak.</li>
              </ol>
            </section>
          </article>

          <section className={styles.closing} aria-labelledby="story-next-title">
            <p className={styles.sectionLabel}>Sofra devam ediyor</p>
            <h2 id="story-next-title">Hikâyenin bugünkü hâli menüde</h2>
            <p>Van kahvaltısının temel tatlarını rehberde tanıyın, güncel menüden sofranızı seçin.</p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/van-kahvaltisi">Van kahvaltısı rehberi</Link>
              <Link className={styles.secondaryAction} href="/menu">Menü ve fiyatlar</Link>
            </div>
          </section>
        </main>
        <AnimatedFooter />
      </ClientPage>
    </>
  );
}
