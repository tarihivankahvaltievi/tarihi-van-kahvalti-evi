import type { Metadata } from "next";
import { Suspense } from "react";
import ClientPage from "../../client-page";
import { AnimatedFooter } from "../../components/animated-footer";
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
} from "../../seo";
import { ReservationView } from "../../rezervasyon/reservation-view";
import styles from "../../rezervasyon/reservation.module.css";

const pageTitle = "Table Reservation | Tarihi Van Breakfast House, Beyoğlu Taksim";
const pageDescription =
  "Reserve your table at Tarihi Van Kahvaltı Evi in Beyoğlu, Taksim. Fresh Van breakfast spread, artisanal cheeses, honey kaymak, hot pans and endless Turkish tea.";

const reservationFaqItems = [
  {
    question: "How is my reservation confirmed?",
    answer:
      "When you send your request, details are sent to our restaurant WhatsApp line and confirmed within 5–10 minutes.",
  },
  {
    question: "Is there any fee or deposit required?",
    answer:
      "No, table reservations are completely free and no deposit is required.",
  },
  {
    question: "How can I change or cancel my reservation?",
    answer:
      "Simply send us a message on WhatsApp or call us at +90 541 525 2868 to update your time or party size.",
  },
] as const;

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: englishReservationUrl,
    languages: {
      "tr-TR": reservationUrl,
      "en-US": englishReservationUrl,
    },
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: englishReservationUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/breakfast-spread.webp"),
        width: 1200,
        height: 800,
        alt: "Tarihi Van Breakfast Table",
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

export default function EnglishReservationPage() {
  const reservationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(true),
      {
        "@type": "WebPage",
        "@id": `${englishReservationUrl}#webpage`,
        url: englishReservationUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "en-US",
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
        "@id": `${englishReservationUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/en` },
          { "@type": "ListItem", position: 2, name: "Reservation", item: englishReservationUrl },
        ],
      },
      buildFaqJsonLd(reservationFaqItems, englishReservationUrl, true),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(reservationJsonLd) }}
      />
      <ClientPage locale="en">
        <main id="main-content" className={styles.page}>
          <Suspense fallback={<div style={{ minHeight: "420px" }} />}>
            <ReservationView locale="en" />
          </Suspense>
        </main>
        <AnimatedFooter locale="en" />
      </ClientPage>
    </>
  );
}
