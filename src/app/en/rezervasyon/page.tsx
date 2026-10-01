import type { Metadata } from "next";
import { Suspense } from "react";
import { getPublicMenuData } from "../../menu/public-menu-data";
import { localizeMenuData } from "../../menu/menu-localization";
import { getOrderingQuestions } from "../../menu/ordering-questions";
import ClientPage from "../../client-page";
import { AnimatedFooter } from "../../components/animated-footer";
import {
  absoluteUrl,
  buildFaqJsonLd,
  buildRestaurantJsonLd,
  englishReservationUrl,
  jsonLd,
  reservationUrl,
  siteName,
  siteUrl,
} from "../../seo";
import { englishReservationFaqItems } from "../../rezervasyon/reservation-content";
import { ReservationView } from "../../rezervasyon/reservation-view";
import styles from "../../rezervasyon/reservation.module.css";

const pageTitle = "Table Reservation | Tarihi Van Breakfast House, Beyoğlu Taksim";
const pageDescription =
  "Reserve your table at Tarihi Van Kahvaltı Evi in Beyoğlu, Taksim. See breakfast choices, included drinks and visit details, then request a table.";

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: englishReservationUrl,
    languages: {
      tr: reservationUrl,
      en: englishReservationUrl,
      "x-default": reservationUrl,
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

export default async function EnglishReservationPage() {
  const menu = await getPublicMenuData();
  const orderingQuestions = getOrderingQuestions("en", localizeMenuData("en", menu.categories, menu.items).items);
  const reservationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "WebPage",
        "@id": `${englishReservationUrl}#webpage`,
        url: englishReservationUrl,
        name: pageTitle,
        description: pageDescription,
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        mainEntity: { "@id": `${siteUrl}/#restaurant` },
        potentialAction: {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: englishReservationUrl,
            actionPlatform: [
              "https://schema.org/DesktopWebPlatform",
              "https://schema.org/MobileWebPlatform",
            ],
          },
          result: {
            "@type": "FoodEstablishmentReservation",
            name: `${siteName} table reservation`,
          },
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
      buildFaqJsonLd([...englishReservationFaqItems, ...orderingQuestions], englishReservationUrl, false, "en-US"),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(reservationJsonLd) }}
      />
      <ClientPage locale="en">
        <main id="main-content" tabIndex={-1} className={styles.page} lang="en-US">
          <Suspense fallback={<div style={{ minHeight: "420px" }} />}>
            <ReservationView locale="en" orderingQuestions={orderingQuestions} />
          </Suspense>
        </main>
        <AnimatedFooter locale="en" />
      </ClientPage>
    </>
  );
}
