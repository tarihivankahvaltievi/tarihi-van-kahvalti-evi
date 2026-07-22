import type { Metadata } from "next";
import { Suspense } from "react";
import ClientPage from "../client-page";
import { buildBreadcrumbJsonLd, buildRestaurantJsonLd, jsonLd, siteName, siteUrl } from "../seo";
import { ReservationExperience } from "./reservation-experience";

const reservationUrl = `${siteUrl}/rezervasyon`;

export const metadata: Metadata = {
  title: { absolute: `Rezervasyon | ${siteName}` },
  description: "Tarih, saat ve kişi sayısını seçerek Tarihi Van Kahvaltı Evi için WhatsApp üzerinden rezervasyon talebi oluşturun.",
  alternates: {
    canonical: reservationUrl,
    languages: {
      tr: reservationUrl,
      en: `${siteUrl}/en/reservation`,
      "x-default": reservationUrl,
    },
  },
};

export default function ReservationPage({
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
        name: `Rezervasyon | ${siteName}`,
        description: "Tarihi Van Kahvaltı Evi için WhatsApp üzerinden masa ayırtma talebi oluşturun.",
        inLanguage: "tr-TR",
        about: { "@id": `${siteUrl}/#restaurant` },
      },
      buildBreadcrumbJsonLd(reservationUrl, "Rezervasyon", false),
    ],
  };

  return (
    <ClientPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(reservationJsonLd) }} />
      <Suspense fallback={<div className="min-h-screen bg-[#f4ecdf]" />}>
        <ReservationContent searchParams={searchParams} />
      </Suspense>
    </ClientPage>
  );
}

async function ReservationContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialService = Array.isArray(params.service) ? params.service[0] : params.service;
  const initialItem = Array.isArray(params.item) ? params.item[0] : params.item;
  return <ReservationExperience initialService={initialService} initialItem={initialItem} />;
}
