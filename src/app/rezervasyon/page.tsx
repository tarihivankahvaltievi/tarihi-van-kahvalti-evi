import type { Metadata } from "next";
import { Suspense } from "react";
import ClientPage from "../client-page";
import { AnimatedFooter } from "../components/animated-footer";
import {
  absoluteUrl,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  displayAddress,
  displayPhone,
  englishReservationUrl,
  jsonLd,
  reservationUrl,
  siteName,
  siteUrl,
} from "../seo";
import { ReservationView } from "./reservation-view";
import styles from "./reservation.module.css";

const pageTitle = "Masa Rezervasyonu | Tarihi Van Kahvaltı Evi, Beyoğlu Taksim";
const pageDescription =
  "Tarihi Van Kahvaltı Evi'nde masanızı ayırtın. Beyoğlu Zambak Sokak'ta serpme Van kahvaltısı, otlu peynir, murtuğa ve semaver çayı için WhatsApp ile hızlı masa rezervasyonu.";

const reservationFaqItems = [
  {
    question: "Rezervasyon nasıl onaylanır?",
    answer:
      "Talebinizi ilettiğinizde bilgileriniz restoran yetkilimizin WhatsApp hattına aktarılır ve ortalama 5–10 dakika içinde teyit edilir.",
  },
  {
    question: "Rezervasyon ücretli mi veya kapora gerekiyor mu?",
    answer:
      "Hayır, rezervasyonlarımız tamamen ücretsizdir ve kapora talep edilmez.",
  },
  {
    question: "Rezervasyonumu nasıl değiştirebilirim?",
    answer:
      "WhatsApp üzerinden mesaj göndererek veya +90 541 525 2868 numaralı telefonumuzdan bizi arayarak saati veya kişi sayısını güncelleyebilirsiniz.",
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: reservationUrl,
    languages: {
      "tr-TR": reservationUrl,
      "en-US": englishReservationUrl,
    },
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: reservationUrl,
    siteName,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/breakfast-spread.webp"),
        width: 1200,
        height: 800,
        alt: "Tarihi Van Kahvaltı Evi Masası",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [absoluteUrl("/images/breakfast-spread.webp")],
  },
};

export default function ReservationPage() {
  const reservationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "WebPage",
        "@id": `${reservationUrl}#webpage`,
        url: reservationUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "tr-TR",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        mainEntity: {
          "@type": "FoodEstablishment",
          "@id": `${siteUrl}/#restaurant`,
          name: siteName,
          acceptsReservations: "True",
          telephone: displayPhone,
          address: displayAddress,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/breakfast-spread.webp"),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${reservationUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ana sayfa", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Rezervasyon", item: reservationUrl },
        ],
      },
      buildFaqJsonLd(reservationFaqItems, reservationUrl, false),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(reservationJsonLd) }}
      />
      <ClientPage locale="tr">
        <main id="main-content" className={styles.page}>
          <div className={styles.container}>
            <header className={styles.header}>
              <p className={styles.kicker}>Beyoğlu Zambak Sokak</p>
              <h1 className={styles.title}>
                Masa Rezervasyonu
                <em>Tarihi Van</em>
              </h1>
              <p className={styles.lead}>
                Zambak Sokak&apos;taki tarihi Rum binamızda; otlu peynir, sıcak sahanlar, murtuğa ve eksilmeyen demli çayımız için masanızı ayırtın.
              </p>
            </header>

            <Suspense fallback={<div style={{ minHeight: "420px" }} />}>
              <ReservationView locale="tr" />
            </Suspense>
          </div>
        </main>
        <AnimatedFooter locale="tr" />
      </ClientPage>
    </>
  );
}
