import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, UtensilsCrossed } from "lucide-react";
import ClientPage from "../client-page";
import { AnimatedFooter } from "../components/animated-footer";
import styles from "./van-breakfast.module.css";
import {
  address,
  absoluteUrl,
  breakfastGuideUrl,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  coordinates,
  displayAddress,
  jsonLd,
  mapsUrl,
  siteName,
  siteUrl,
} from "../seo";

const guideTitle = "Taksim'de Van Kahvaltısı | Beyoğlu Rehberi";
const guideDescription =
  "Taksim ve Beyoğlu'nda geleneksel Van kahvaltısı için rehber: Zambak Sokak adresi, M2 erişimi, çalışma saatleri, güncel menü ve yöresel tatlar.";

const guideFaqItems = [
  {
    question: "Van kahvaltısını diğer kahvaltılardan ayıran nedir?",
    answer:
      "Van kahvaltısı tek bir tabaktan çok, tatlı ve tuzlu yöresel ürünlerin aynı anda paylaşıldığı uzun bir sofra geleneğidir. Otlu peynir, murtuğa, kavut, kete ve demli çay bu karakterin öne çıkan parçalarıdır.",
  },
  {
    question: "Murtuğa ve kavut aynı şey mi?",
    answer:
      "Hayır. Murtuğa un, tereyağı ve yumurtayla hazırlanan sıcak ve doyurucu bir yemektir. Kavut ise kavrulmuş un ve tereyağı temelli, daha tatlı ve tok kıvamlı bir Van lezzetidir.",
  },
  {
    question: "Serpme Van kahvaltısı kaç kişilik servis edilir?",
    answer:
      "Tarihi Van Kahvaltı Evi'nde geleneksel serpme Van kahvaltısı en az iki kişilik servis edilir. Güncel porsiyon, içerik ve kişi başı fiyat bilgisi canlı menü sayfasında yer alır.",
  },
  {
    question: "Van kahvaltısında vejetaryen seçenekler var mı?",
    answer:
      "Menüde otlu peynir, bal-kaymak, reçel, kete, pişi, murtuğa, kavut ve bazı yumurtalı seçenekler gibi vejetaryen ürünler bulunur. İçerik, alerjen ve günlük uygunluk için sipariş öncesinde ekibe danışılmalıdır.",
  },
  {
    question: "Taksim'de Van kahvaltısı için ne zaman gelmeli?",
    answer:
      "İşletme her gün 08:00–18:00 saatleri arasında açıktır. Hafta sonu veya kalabalık grup ziyaretinde masa uygunluğunu telefon ya da WhatsApp üzerinden önceden sormak önerilir.",
  },
  {
    question: "Taksim Metro'dan Tarihi Van Kahvaltı Evi'ne nasıl gidilir?",
    answer:
      "M2 Taksim durağından Sıraselviler yönüne çıkıp Zambak Sokak'a yürüyerek ulaşabilirsiniz. İlk kez gelecek misafirler güncel rota için Google Haritalar bağlantısını kullanabilir.",
  },
] as const;

const glossary = [
  ["Otlu peynir", "Van'a özgü aromatik otlarla karakter kazanan, sofranın tuzlu omurgasını kuran yöresel peynir."],
  ["Murtuğa", "Un, tereyağı ve yumurtayla tavada hazırlanan; sıcak, yoğun ve doyurucu Van klasiği."],
  ["Kavut", "Kavrulmuş un ve tereyağının tok aromasıyla hazırlanan, hafif tatlı sıcak lezzet."],
  ["Kete", "Kat kat dokusu ve tereyağlı içiyle çaya, bala ve peynire eşlik eden yöresel hamur işi."],
  ["Van cacığı", "Süzme yoğurt, salatalık ve taze otlarla daha yoğun kıvamda hazırlanan kahvaltılık."],
  ["Demli çay", "Sofra boyunca tazelenen ince belli bardak çayı; uzun kahvaltının ritmini koruyan eşlikçi."],
] as const;

export const metadata: Metadata = {
  title: { absolute: guideTitle },
  description: guideDescription,
  alternates: { canonical: breakfastGuideUrl },
  openGraph: {
    title: `${guideTitle} | ${siteName}`,
    description: guideDescription,
    url: breakfastGuideUrl,
    siteName,
    locale: "tr_TR",
    type: "article",
    images: [
      {
        url: absoluteUrl("/images/og/van-kahvaltisi.jpg"),
        width: 1200,
        height: 630,
        alt: "Otlu peynir, sıcak sahanlar, reçeller ve çayla kurulu Van kahvaltısı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${guideTitle} | ${siteName}`,
    description: guideDescription,
    images: [absoluteUrl("/images/og/van-kahvaltisi.jpg")],
  },
};

export default function VanBreakfastGuidePage() {
  const guideJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "WebPage",
        "@id": `${breakfastGuideUrl}#webpage`,
        url: breakfastGuideUrl,
        name: `${guideTitle} | ${siteName}`,
        description: guideDescription,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${siteUrl}/#website` },
        dateModified: "2026-07-20",
        publisher: { "@id": `${siteUrl}/#restaurant` },
        about: [
          { "@type": "Thing", name: "Van kahvaltısı" },
          {
            "@type": "Place",
            name: "Taksim, Beyoğlu, İstanbul",
            address: {
              "@type": "PostalAddress",
              streetAddress: `${address.streetAddress}, ${address.neighborhood}`,
              addressLocality: address.locality,
              addressRegion: address.region,
              postalCode: address.postalCode,
              addressCountry: address.country,
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            },
          },
          { "@id": `${siteUrl}/#restaurant` },
        ],
        spatialCoverage: {
          "@type": "Place",
          name: "Beyoğlu, İstanbul",
          geo: {
            "@type": "GeoCoordinates",
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          },
        },
        mainEntity: { "@id": `${siteUrl}/#restaurant` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/og/van-kahvaltisi.jpg"),
          width: 1200,
          height: 630,
        },
      },
      buildBreadcrumbJsonLd(breakfastGuideUrl, "Van kahvaltısı rehberi", false),
      buildFaqJsonLd(guideFaqItems, breakfastGuideUrl, false),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(guideJsonLd) }} />
      <ClientPage>
        <main id="main-content" className={styles.page}>
          <article>
            <header className={styles.hero}>
              <div className={styles.heroInner}>
                <div className={styles.heroCopy}>
                  <p className={styles.kicker}>Taksim · Beyoğlu · 1978</p>
                  <h1>
                    Taksim&apos;de
                    <span>Van kahvaltısı</span>
                  </h1>
                  <p className={styles.lead}>
                    Tarihi Van Kahvaltı Evi, Taksim ve İstiklal Caddesi&apos;ne yürüme mesafesindeki Zambak Sokak&apos;ta;
                    otlu peynir, sıcak yöresel lezzetler, hamur işleri, bal-kaymak ve demli çayla kurulan paylaşım
                    sofrasını 1978&apos;den beri yaşatıyor.
                  </p>
                  <div className={styles.actions}>
                    <Link className={styles.primaryAction} href="/menu#geleneksel-van-kahvaltisi">
                      <UtensilsCrossed size={18} aria-hidden="true" /> Güncel menü ve fiyatlar
                    </Link>
                    <a className={styles.secondaryAction} href={mapsUrl} target="_blank" rel="noreferrer">
                      <MapPin size={18} aria-hidden="true" /> Google Haritalar&apos;da rota al
                    </a>
                  </div>
                  <dl className={styles.heroFacts}>
                    <div>
                      <dt>Adres</dt>
                      <dd>Zambak Sk. No:8, Beyoğlu</dd>
                    </div>
                    <div>
                      <dt>Ulaşım</dt>
                      <dd>M2 Taksim durağından yürüyerek</dd>
                    </div>
                    <div>
                      <dt>Çalışma saatleri</dt>
                      <dd>Her gün 08:00–18:00</dd>
                    </div>
                  </dl>
                </div>
                <figure className={styles.heroImage} style={{ position: "relative" }}>
                  <Image
                    src="/images/hero-table.jpg"
                    alt="Tarihi Van Kahvaltı Evi'nde peynir, sıcak sahanlar, pişi ve çayla kurulu Van kahvaltısı sofrası"
                    fill
                    priority
                    sizes="(max-width: 860px) 100vw, 50vw"
                    quality={82}
                  />
                  <figcaption>Tarihi Van Kahvaltı Evi · Taksim, Beyoğlu</figcaption>
                </figure>
              </div>
            </header>

            <nav className={styles.guideNav} aria-label="Van kahvaltısı rehberi bölümleri">
              <div className={styles.guideNavInner}>
                <strong>Yerel rehber</strong>
                <a href="#sofrada-neler-var">Sofrada neler var?</a>
                <a href="#nasil-servis-edilir">Nasıl servis edilir?</a>
                <a href="#ziyaret-plani">Adres ve ulaşım</a>
                <a href="#sorular">Kısa cevaplar</a>
              </div>
            </nav>

            <section id="sofrada-neler-var" className={styles.flavours} aria-labelledby="glossary-title">
              <header className={styles.sectionIntro}>
                <h2 id="glossary-title">Van&apos;dan gelen temel tatlar</h2>
                <p>
                  Her ürünün sofrada ayrı bir rolü vardır. Tuzlu, sıcak, tatlı ve hamur işi tabakları aynı anda
                  paylaşılır; ürünlerin günlük veya mevsimlik bulunabilirliği değişebilir.
                </p>
              </header>
              <dl className={styles.flavourList}>
                {glossary.map(([term, definition]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{definition}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="nasil-servis-edilir" className={styles.service} aria-labelledby="service-title">
              <figure className={styles.serviceImage} style={{ position: "relative" }}>
                <Image
                  src="/images/hands-table.webp"
                  alt="Van kahvaltısı sofrasında tabakları paylaşan misafirlerin elleri"
                  fill
                  sizes="(max-width: 820px) calc(100vw - 2rem), 43vw"
                  quality={80}
                />
              </figure>
              <div className={styles.serviceCopy}>
                <h2 id="service-title">Van kahvaltısı nasıl yenir?</h2>
                <p>
                  Serpme servis, masadaki herkesin aynı tatları kendi ritminde paylaşmasına dayanır. Soğuk tabaklar
                  sofrayı kurar; sıcak sahanlar hazır oldukça gelir; çay ise kahvaltı boyunca tazelenir.
                </p>
                <ol className={styles.numberedList}>
                  <li>Önce peynir, zeytin, cacık, bal-kaymak ve reçeller gibi paylaşımlık tabakları tanıyın.</li>
                  <li>Murtuğa, kavut ve yumurtalı sahanları sıcaklığını korurken ortaklaşa tadın.</li>
                  <li>Kete, pişi ve ekmekleri tatlı ve tuzlu eşlikçilerle farklı biçimlerde deneyin.</li>
                  <li>Çayı acele etmeden yenileyin; Van sofrasının özü uzun sohbet ve paylaşımda saklıdır.</li>
                </ol>
                <p className={styles.serviceNote}>
                  <strong>Güncel bilgi:</strong> Serpme kahvaltı en az iki kişilik servis edilir. İçerik ve fiyatlar
                  değişebileceği için ziyaret öncesinde <Link href="/menu">canlı menüyü</Link> kontrol edin.
                </p>
              </div>
            </section>

            <figure className={styles.tableMoment} style={{ position: "relative" }}>
              <Image
                src="/images/hero-parallax/overhead-classic.webp"
                alt="Yukarıdan görülen geleneksel Van kahvaltısı masası"
                fill
                sizes="calc(100vw - 2rem)"
                quality={80}
              />
              <figcaption>Otlu peynirden sıcak sahanlara uzanan sofra, farklı tatların birlikte paylaşılması için kurulur.</figcaption>
            </figure>

            <section id="ziyaret-plani" className={styles.visit} aria-labelledby="visit-title">
              <header className={styles.visitHeader}>
                <div>
                  <h2 id="visit-title">Beyoğlu&apos;nda kahvaltı için açık adres</h2>
                  <address className={styles.visitAddress}>
                    <strong>{siteName}</strong>
                    <span>{displayAddress}</span>
                  </address>
                </div>
                <p>
                  Taksim Meydanı, İstiklal Caddesi ve M2 Taksim durağından yürüyerek ulaşılabilen konumumuz;
                  Beyoğlu&apos;nda Van kahvaltısı planlayan misafirler için merkezi bir buluşma noktasıdır.
                </p>
              </header>
              <div className={styles.visitDetails}>
                <div className={styles.visitFacts}>
                  <p><Clock3 size={18} aria-hidden="true" /><span><strong>Her gün 08:00–18:00</strong>Hafta sonu ve kalabalık gruplar için ziyaret öncesinde masa uygunluğunu sormanız önerilir.</span></p>
                  <p><MapPin size={18} aria-hidden="true" /><span><strong>Taksim&apos;den yürüyerek ulaşım</strong>M2 Taksim durağından Sıraselviler yönüne çıkıp Zambak Sokak&apos;a ilerleyin.</span></p>
                </div>
                <div className={styles.visitActions}>
                  <Link className={styles.lightAction} href="/menu">Menü ve fiyatlar <ArrowUpRight size={16} aria-hidden="true" /></Link>
                  <a className={styles.outlineLightAction} href={mapsUrl} target="_blank" rel="noreferrer">Google Haritalar&apos;da aç <ArrowUpRight size={16} aria-hidden="true" /></a>
                </div>
              </div>
            </section>

            <section id="sorular" className={styles.faqSection} aria-labelledby="guide-faq-title">
              <header className={styles.sectionIntro}>
                <h2 id="guide-faq-title">Van kahvaltısı hakkında merak edilenler</h2>
                <p>İçerik, servis biçimi, vejetaryen seçenekler ve ziyaret zamanı hakkında doğrudan yanıtlar.</p>
              </header>
              <div className={styles.faq}>
                {guideFaqItems.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          <section className={styles.closing} aria-labelledby="guide-next-title">
            <h2 id="guide-next-title">Sofrayı ekranda değil, masada keşfedin.</h2>
            <p>{siteName}&apos;nin güncel menüsünü inceleyin veya Beyoğlu&apos;ndaki adresimize yol tarifi alın.</p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/menu">Menü ve fiyatlar</Link>
              <Link className={styles.secondaryAction} href="/hikayemiz">1978&apos;den beri hikâyemiz</Link>
            </div>
          </section>
        </main>
        <AnimatedFooter />
      </ClientPage>
    </>
  );
}
