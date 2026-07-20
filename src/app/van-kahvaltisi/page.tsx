import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, UtensilsCrossed } from "lucide-react";
import ClientPage from "../client-page";
import { AnimatedFooter } from "../components/animated-footer";
import styles from "../components/editorial-page.module.css";
import {
  absoluteUrl,
  breakfastGuideUrl,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  jsonLd,
  siteName,
  siteUrl,
} from "../seo";

const guideTitle = "Van Kahvaltısı Nedir? Lezzet Rehberi";
const guideDescription =
  "Van kahvaltısında neler olur? Otlu peynir, murtuğa, kavut, kete, cacık, bal-kaymak ve çay geleneğini; servis biçimini ve Taksim ziyaretini keşfedin.";

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
  title: guideTitle,
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
        about: [
          { "@type": "Thing", name: "Van kahvaltısı" },
          { "@id": `${siteUrl}/#restaurant` },
        ],
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
              <div>
                <p className={styles.eyebrow}>Yöresel sofra rehberi</p>
                <h1>
                  Van kahvaltısı
                  <span>nedir?</span>
                </h1>
                <p className={styles.lead}>
                  Van kahvaltısı, birkaç tabağın yan yana gelmesinden fazlasıdır: otlu peynirin, sıcak yöresel
                  lezzetlerin, hamur işlerinin, bal-kaymağın ve durmadan tazelenen çayın birlikte kurduğu paylaşım sofrasıdır.
                  Bu rehberde sofranın temel tatlarını ve Taksim&apos;deki ziyaretinizi planlarken bilmeniz gerekenleri bulabilirsiniz.
                </p>
                <div className={styles.actions}>
                  <Link className={styles.primaryAction} href="/menu#geleneksel-van-kahvaltisi">
                    <UtensilsCrossed size={18} aria-hidden="true" /> Güncel menü ve fiyatlar
                  </Link>
                  <Link className={styles.secondaryAction} href="/konum">
                    <MapPin size={18} aria-hidden="true" /> Taksim&apos;den yol tarifi
                  </Link>
                </div>
              </div>
              <div className={styles.heroVisual}>
                <figure className={styles.heroImage}>
                  <Image
                    src="/images/breakfast-spread.webp"
                    alt="Peynirler, reçeller, sıcak sahanlar ve çayla kurulu geleneksel Van kahvaltısı"
                    fill
                    priority
                    sizes="(max-width: 820px) calc(100vw - 2rem), 44vw"
                    quality={80}
                  />
                </figure>
                <p className={styles.imageNote}>Tatlı ve tuzlu tabaklar birlikte gelir; sofra paylaşarak ve acele etmeden yenir.</p>
              </div>
            </header>

            <nav className={styles.quickNav} aria-label="Van kahvaltısı rehberi bölümleri">
              <div className={styles.quickNavInner}>
                <strong>Bu rehberde</strong>
                <a href="#sofrada-neler-var">Sofrada neler var?</a>
                <a href="#nasil-servis-edilir">Nasıl servis edilir?</a>
                <a href="#ziyaret-plani">Ziyaret planı</a>
                <a href="#sorular">Kısa cevaplar</a>
              </div>
            </nav>

            <section id="sofrada-neler-var" className={styles.section} aria-labelledby="glossary-title">
              <header className={styles.sectionHeader}>
                <div>
                  <p className={styles.sectionLabel}>Sofranın sözlüğü</p>
                  <h2 id="glossary-title">Van&apos;dan gelen temel tatlar</h2>
                </div>
                <p>
                  Her ürünün sofrada ayrı bir rolü vardır. Tuzlu, sıcak, tatlı ve hamur işi tabakları aynı anda
                  paylaşılır; ürünlerin günlük veya mevsimlik bulunabilirliği değişebilir.
                </p>
              </header>
              <dl className={styles.termGrid}>
                {glossary.map(([term, definition]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{definition}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="nasil-servis-edilir" className={styles.splitSection} aria-labelledby="service-title">
              <figure className={styles.insetImage}>
                <Image
                  src="/images/hands-table.webp"
                  alt="Van kahvaltısı sofrasında tabakları paylaşan misafirlerin elleri"
                  fill
                  sizes="(max-width: 820px) calc(100vw - 2rem), 43vw"
                  quality={80}
                />
              </figure>
              <div className={styles.splitCopy}>
                <p className={styles.sectionLabel}>Bir tabak değil, sofra</p>
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
                <p className={styles.note}>
                  <strong>Güncel bilgi:</strong> Serpme kahvaltı en az iki kişilik servis edilir. İçerik ve fiyatlar
                  değişebileceği için ziyaret öncesinde <Link href="/menu">canlı menüyü</Link> kontrol edin.
                </p>
              </div>
            </section>

            <figure className={styles.wideImage}>
              <Image
                src="/images/hero-parallax/overhead-classic.webp"
                alt="Yukarıdan görülen geleneksel Van kahvaltısı masası"
                fill
                sizes="calc(100vw - 2rem)"
                quality={80}
              />
              <figcaption>Otlu peynirden sıcak sahanlara uzanan sofra, farklı tatların birlikte paylaşılması için kurulur.</figcaption>
            </figure>

            <section id="ziyaret-plani" className={styles.section} aria-labelledby="visit-title">
              <header className={styles.sectionHeader}>
                <div>
                  <p className={styles.sectionLabel}>Beyoğlu&apos;nda kahvaltı</p>
                  <h2 id="visit-title">Taksim&apos;de Van sofrasını planlayın</h2>
                </div>
                <p>
                  Tarihi Van Kahvaltı Evi, Zambak Sokak&apos;ta; Taksim Meydanı, İstiklal Caddesi ve M2 Taksim
                  durağından yürüyerek ulaşılabilen bir konumdadır.
                </p>
              </header>
              <div className={styles.principleGrid}>
                <article>
                  <h3>Güncel menü</h3>
                  <p>Serpme kahvaltı, sıcak sahanlar, yöresel ürünler ve içeceklerin güncel fiyatlarını tek kaynaktan inceleyin.</p>
                  <div className={styles.actions}><Link className={styles.secondaryAction} href="/menu">Menüye git <ArrowUpRight size={16} /></Link></div>
                </article>
                <article>
                  <h3>Konum ve saat</h3>
                  <p>Her gün 08:00–18:00. Metro, yürüyüş ve güncel Google Haritalar rotasını konum sayfasında görün.</p>
                  <div className={styles.actions}><Link className={styles.secondaryAction} href="/konum">Konumu aç <ArrowUpRight size={16} /></Link></div>
                </article>
              </div>
            </section>

            <section id="sorular" className={styles.section} aria-labelledby="guide-faq-title">
              <header className={styles.sectionHeader}>
                <div>
                  <p className={styles.sectionLabel}>Kısa cevaplar</p>
                  <h2 id="guide-faq-title">Van kahvaltısı hakkında merak edilenler</h2>
                </div>
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
            <p className={styles.sectionLabel}>Sıradaki adım</p>
            <h2 id="guide-next-title">Sofrayı ekranda değil, masada keşfedin</h2>
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
