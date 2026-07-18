import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BusFront, Clock3, MapPin, Navigation, TrainFront, Utensils } from "lucide-react";
import ClientPage from "../client-page";
import { AnimatedFooter } from "../components/animated-footer";
import {
  absoluteUrl,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  displayAddress,
  displayPhone,
  jsonLd,
  mapsUrl,
  openingHours,
  siteName,
  siteUrl,
  telUrl,
} from "../seo";
import { LocationMap } from "./location-map";
import styles from "./location.module.css";

const locationUrl = `${siteUrl}/konum`;
const locationTitle = "Tarihi Van Kahvaltı Evi Konum | Beyoğlu Taksim";
const locationDescription =
  "Tarihi Van Kahvaltı Evi adresi, Beyoğlu Taksim yol tarifi ve ulaşım bilgileri. Zambak Sokak'taki mekânı haritada görün; metro ve yürüyüş rotasını inceleyin.";

const locationFaqItems = [
  {
    question: "Tarihi Van Kahvaltı Evi nerede?",
    answer: `${siteName}, ${displayAddress} adresindedir. Taksim Meydanı ve İstiklal Caddesi çevresinden yürüyerek ulaşılabilir.`,
  },
  {
    question: "Taksim Metro'dan Tarihi Van Kahvaltı Evi'ne nasıl gidilir?",
    answer:
      "M2 Taksim istasyonundan Sıraselviler yönüne çıkın. Sıraselviler Caddesi üzerinden Zambak Sokak'a ilerleyerek mekâna ulaşabilirsiniz. Güncel yaya rotası için sayfadaki Google Haritalar bağlantısını kullanın.",
  },
  {
    question: "Toplu taşımayla ulaşım mümkün mü?",
    answer:
      "Evet. M2 Taksim Metro İstasyonu ve Taksim çevresindeki otobüs durakları mekâna yürüyüş mesafesindedir. Sefer ve yaya rotası trafik koşullarına göre değişebileceği için çıkmadan önce güncel rotayı kontrol edin.",
  },
  {
    question: "Tarihi Van Kahvaltı Evi hangi saatlerde açık?",
    answer: `${siteName} haftanın her günü 08:00–18:00 saatleri arasında açıktır. Hafta sonu yoğunluğu için gelmeden önce ${displayPhone} numarasından bilgi alabilirsiniz.`,
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: locationTitle },
  description: locationDescription,
  alternates: { canonical: locationUrl },
  openGraph: {
    title: locationTitle,
    description: locationDescription,
    url: locationUrl,
    siteName,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/street-table.webp"),
        width: 1200,
        height: 800,
        alt: "Tarihi Van Kahvaltı Evi'nin Zambak Sokak'taki masaları",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: locationTitle,
    description: locationDescription,
    images: [absoluteUrl("/images/street-table.webp")],
  },
};

export default function LocationPage() {
  const locationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "WebPage",
        "@id": `${locationUrl}#webpage`,
        url: locationUrl,
        name: locationTitle,
        description: locationDescription,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        mainEntity: { "@id": `${siteUrl}/#restaurant` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/street-table.webp"),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${locationUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Konum", item: locationUrl },
        ],
      },
      buildFaqJsonLd(locationFaqItems, locationUrl, false),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(locationJsonLd) }} />
      <ClientPage>
        <main id="main-content" className={styles.page}>
          <section className={styles.hero} aria-labelledby="location-title">
            <div className={styles.heroCopy}>
              <p className={styles.routeLabel}>Konum ve yol tarifi</p>
              <h1 id="location-title">
                Tarihi Van Kahvaltı Evi&apos;ne
                <span>nasıl gelinir?</span>
              </h1>
              <p className={styles.heroLead}>
                Tarihi Van Kahvaltı Evi, Beyoğlu&apos;nda Zambak Sokak No:8&apos;de yer alır. Taksim Meydanı ve İstiklal Caddesi çevresinden yürüyerek ulaşabilir; güncel güzergâh için haritadan yol tarifi alabilirsiniz.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation size={18} aria-hidden="true" />
                  Yol tarifi al
                </a>
                <a className={styles.secondaryAction} href={telUrl}>
                  Gelmeden önce ara
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
              <dl className={styles.heroFacts}>
                <div>
                  <dt><MapPin size={17} aria-hidden="true" /> Adres</dt>
                  <dd>{displayAddress}</dd>
                </div>
                <div>
                  <dt><Clock3 size={17} aria-hidden="true" /> Açık</dt>
                  <dd>{openingHours.short}</dd>
                </div>
              </dl>
            </div>

            <div className={styles.heroVisual} aria-label="Mekândan görüntüler">
              <figure className={styles.streetPhoto}>
                <Image
                  src="/images/street-table.webp"
                  alt="Zambak Sokak'ta Tarihi Van Kahvaltı Evi'nin dış mekân masaları"
                  fill
                  priority
                  sizes="(max-width: 760px) 92vw, 48vw"
                  quality={80}
                />
              </figure>
              <figure className={styles.interiorPhoto}>
                <Image
                  src="/images/interior-chair.webp"
                  alt="Tarihi Rum binasının tuğla duvarlı iç mekânı"
                  fill
                  sizes="(max-width: 760px) 38vw, 230px"
                  quality={75}
                />
              </figure>
              <p className={styles.photoNote}>Zambak Sokak No:8</p>
            </div>
          </section>

          <section className={styles.arrival} aria-labelledby="arrival-title">
            <header className={styles.sectionHead}>
              <h2 id="arrival-title">Ulaşım seçenekleri</h2>
              <p>
                M2 Taksim Metro İstasyonu, çevredeki otobüs durakları ve araçla ulaşım için temel bilgileri aşağıda bulabilirsiniz. Güncel güzergâh için haritayı kullanın.
              </p>
            </header>
            <ol className={styles.routes}>
              <li>
                <span className={styles.routeIcon}><TrainFront size={24} aria-hidden="true" /></span>
                <div>
                  <h3>M2 Taksim Metro&apos;dan</h3>
                  <p>Sıraselviler yönündeki çıkışı kullanın; Sıraselviler Caddesi üzerinden Zambak Sokak&apos;a ilerleyin.</p>
                </div>
                <span className={styles.routeMode}>Metro + yürüyüş</span>
              </li>
              <li>
                <span className={styles.routeIcon}><BusFront size={24} aria-hidden="true" /></span>
                <div>
                  <h3>Toplu taşımayla</h3>
                  <p>Taksim çevresindeki otobüs duraklarından Sıraselviler yönüne yürüyerek mekâna ulaşabilirsiniz.</p>
                </div>
                <span className={styles.routeMode}>Otobüs + yürüyüş</span>
              </li>
              <li>
                <span className={styles.routeIcon}><Navigation size={24} aria-hidden="true" /></span>
                <div>
                  <h3>Özel araç veya taksiyle</h3>
                  <p>Hedefe Zambak Sokak No:8 yazın. Beyoğlu&apos;ndaki güncel trafik ve çevre otopark durumunu yola çıkmadan kontrol edin.</p>
                </div>
                <span className={styles.routeMode}>Canlı rota önerilir</span>
              </li>
            </ol>
          </section>

          <section className={styles.mapSection} aria-labelledby="map-title">
            <div className={styles.mapIntro}>
              <div>
                <p className={styles.mapIndex}>Zambak Sokak No:8</p>
                <h2 id="map-title">Haritada konum</h2>
              </div>
              <p>
                İşaretçiye dokunarak adres kartını açın. Haritayı hareket ettirebilir veya tek dokunuşla işletme konumuna geri dönebilirsiniz.
              </p>
            </div>
            <LocationMap />
          </section>

          <section className={styles.placeStory} aria-labelledby="place-title">
            <div className={styles.placeImage}>
              <Image
                src="/images/historic-mirror.webp"
                alt="Tarihi Van Kahvaltı Evi'nin oymalı aynası ve tuğla duvarı"
                fill
                sizes="(max-width: 760px) 100vw, 42vw"
                quality={80}
              />
            </div>
            <div className={styles.placeCopy}>
              <Utensils size={30} aria-hidden="true" />
              <h2 id="place-title">Zambak Sokak&apos;taki mekân</h2>
              <p>
                Tarihi Rum binasındaki mekânımız tuğla duvarları, eski aynaları ve sokağa açılan masalarıyla Beyoğlu&apos;nun karakterini taşır. Van kahvaltısını sakin, rahat ve özenli bir ortamda servis ediyoruz.
              </p>
              <Link href="/menu">Menüyü incele <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
          </section>

          <section className={styles.faq} aria-labelledby="location-faq-title">
            <div className={styles.faqHead}>
              <h2 id="location-faq-title">Konum hakkında kısa cevaplar</h2>
              <p>Yola çıkmadan önce en çok sorulanlar.</p>
            </div>
            <div className={styles.faqList}>
              {locationFaqItems.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </main>
        <AnimatedFooter />
      </ClientPage>
    </>
  );
}
