import type { Metadata } from "next";
import { Suspense } from "react";
import ClientPage from "../../client-page";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildRestaurantJsonLd,
  englishReservationUrl,
  englishUrl,
  jsonLd,
  reservationUrl,
  siteName,
  siteUrl,
} from "../../seo";
import { ReservationExperience } from "../../rezervasyon/reservation-experience";

const pageTitle = "Table Reservation | Tarihi Van Kahvaltı Evi Taksim Istanbul";
const pageDescription =
  "Request your table at Tarihi Van Kahvaltı Evi near Taksim Square. Instant WhatsApp confirmation for traditional Turkish Van breakfast, herb cheese and hot copper dishes.";

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
    alternateLocale: ["tr_TR"],
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/og/home.jpg"),
        width: 1200,
        height: 630,
        alt: "Traditional Turkish breakfast table reservation at Tarihi Van Kahvaltı Evi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [absoluteUrl("/images/og/home.jpg")],
  },
};

export default function EnglishReservationPage() {
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
        inLanguage: "en",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#restaurant` },
        translationOfWork: { "@id": `${reservationUrl}#webpage` },
        potentialAction: {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: englishReservationUrl,
            inLanguage: "en",
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
          result: {
            "@type": "FoodEstablishmentReservation",
            name: "Turkish Breakfast Table Reservation",
          },
        },
      },
      buildBreadcrumbJsonLd(englishReservationUrl, "Table Reservation", false, "Home", englishUrl),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(reservationJsonLd) }}
      />
      <ClientPage locale="en">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#f4ecdf]" lang="en">
              <p className="font-serif text-lg text-[#7a1b22]">Loading table reservation…</p>
            </div>
          }
        >
          <ReservationExperience locale="en" />
        </Suspense>
      </ClientPage>
    </>
  );
}
