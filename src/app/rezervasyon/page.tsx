import type { Metadata } from "next";
import { Suspense } from "react";
import ClientPage from "../client-page";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildRestaurantJsonLd,
  englishReservationUrl,
  jsonLd,
  reservationUrl,
  siteName,
  siteUrl,
} from "../seo";
import { ReservationExperience } from "./reservation-experience";

const pageTitle = "Masa Rezervasyonu | Tarihi Van Kahvaltı Evi Taksim Beyoğlu";
const pageDescription =
  "Tarihi Van Kahvaltı Evi'nde masanızı anında ayırtın. Taksim Beyoğlu'nda otlu peynir, murtuğa, sıcak sahanlar ve demli çay eşliğinde serpme Van kahvaltısı için online masa talebi.";

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
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: absoluteUrl("/images/og/home.jpg"),
        width: 1200,
        height: 630,
        alt: "Tarihi Van Kahvaltı Evi serpme kahvaltı masası ve rezervasyon",
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
        potentialAction: {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: reservationUrl,
            inLanguage: "tr-TR",
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
          result: {
            "@type": "FoodEstablishmentReservation",
            name: "Van Kahvaltısı Masa Rezervasyonu",
          },
        },
      },
      buildBreadcrumbJsonLd(reservationUrl, "Masa Rezervasyonu", false),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(reservationJsonLd) }}
      />
      <ClientPage locale="tr">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#f4ecdf]">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#7a1b22] border-t-transparent" />
            </div>
          }
        >
          <ReservationExperience locale="tr" />
        </Suspense>
      </ClientPage>
    </>
  );
}
