import type { Metadata } from "next";
import ClientPage from "../client-page";
import { siteName, siteUrl } from "../seo";
import { ReservationExperience } from "./reservation-experience";

const reservationUrl = `${siteUrl}/rezervasyon`;

export const metadata: Metadata = {
  title: { absolute: `Rezervasyon | ${siteName}` },
  description: "Tarihi Van Kahvaltı Evi için tarih, saat ve kişi sayısını seçerek WhatsApp üzerinden rezervasyon talebi oluşturun.",
  alternates: {
    canonical: reservationUrl,
    languages: {
      tr: reservationUrl,
      en: `${siteUrl}/en/reservation`,
      "x-default": reservationUrl,
    },
  },
};

export default function ReservationPage() {
  return (
    <ClientPage>
      <ReservationExperience />
    </ClientPage>
  );
}
