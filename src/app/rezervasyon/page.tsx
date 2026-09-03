import type { Metadata } from "next";
import { Suspense } from "react";
import ClientPage from "../client-page";
import { AnimatedFooter } from "../components/animated-footer";
import {
  absoluteUrl,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  englishReservationUrl,
  jsonLd,
  reservationUrl,
  siteName,
  siteUrl,
} from "../seo";
import { reservationFaqItems } from "./reservation-content";
import { ReservationView } from "./reservation-view";
import styles from "./reservation.module.css";

const pageTitle = "Masa Rezervasyonu | Tarihi Van Kahvaltı Evi, Beyoğlu Taksim";
const pageDescription =
  "Tarihi Van Kahvaltı Evi'nde masanızı ayırtın. Beyoğlu Zambak Sokak'ta Van kahvaltısı, otlu peynir, murtuğa ve semaver çayı için WhatsApp ile masa rezervasyonu.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: reservationUrl,
    languages: {
      tr: reservationUrl,
      en: englishReservationUrl,
      "x-default": reservationUrl,
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
        mainEntity: { "@id": `${siteUrl}/#restaurant` },
        potentialAction: {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: reservationUrl,
            actionPlatform: [
              "https://schema.org/DesktopWebPlatform",
              "https://schema.org/MobileWebPlatform",
            ],
          },
          result: {
            "@type": "FoodEstablishmentReservation",
            name: `${siteName} masa rezervasyonu`,
          },
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
        <main id="main-content" className={styles.page} lang="tr-TR">
          <Suspense fallback={<div style={{ minHeight: "420px" }} />}>
            <ReservationView locale="tr" />
          </Suspense>
        </main>
        <AnimatedFooter locale="tr" />
      </ClientPage>
    </>
  );
}
