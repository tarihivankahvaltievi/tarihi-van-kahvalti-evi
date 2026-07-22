import type { Metadata } from "next";
import { Suspense } from "react";
import ClientPage from "../../client-page";
import { buildBreadcrumbJsonLd, buildRestaurantJsonLd, jsonLd, siteName, siteUrl } from "../../seo";
import { ReservationExperience } from "../../rezervasyon/reservation-experience";

const reservationUrl = `${siteUrl}/en/reservation`;

export const metadata: Metadata = {
  title: { absolute: `Reservations | ${siteName}` },
  description: "Choose a date, time and party size, then send your table request to Tarihi Van Kahvaltı Evi directly on WhatsApp.",
  alternates: {
    canonical: reservationUrl,
    languages: {
      tr: `${siteUrl}/rezervasyon`,
      en: reservationUrl,
      "x-default": `${siteUrl}/rezervasyon`,
    },
  },
};

export default function EnglishReservationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const reservationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildRestaurantJsonLd(false),
      {
        "@type": "WebPage",
        "@id": `${reservationUrl}#webpage`,
        url: reservationUrl,
        name: `Reservations | ${siteName}`,
        description: "Request a table at Tarihi Van Kahvaltı Evi and confirm availability on WhatsApp.",
        inLanguage: "en",
        about: { "@id": `${siteUrl}/#restaurant` },
      },
      buildBreadcrumbJsonLd(reservationUrl, "Reservations", false, "Home", siteUrl),
    ],
  };

  return (
    <ClientPage locale="en">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(reservationJsonLd) }} />
      <Suspense fallback={<div className="min-h-screen bg-[#f4ecdf]" />}>
        <EnglishReservationContent searchParams={searchParams} />
      </Suspense>
    </ClientPage>
  );
}

async function EnglishReservationContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialService = Array.isArray(params.service) ? params.service[0] : params.service;
  const initialItem = Array.isArray(params.item) ? params.item[0] : params.item;
  return <ReservationExperience locale="en" initialService={initialService} initialItem={initialItem} />;
}
