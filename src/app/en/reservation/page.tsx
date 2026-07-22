import type { Metadata } from "next";
import ClientPage from "../../client-page";
import { siteName, siteUrl } from "../../seo";
import { ReservationExperience } from "../../rezervasyon/reservation-experience";

const englishReservationUrl = `${siteUrl}/en/reservation`;

export const metadata: Metadata = {
  title: { absolute: `Request a Table | ${siteName}` },
  description: "Choose a date, time and party size to request a table at Tarihi Van Kahvaltı Evi via WhatsApp.",
  alternates: {
    canonical: englishReservationUrl,
    languages: {
      tr: `${siteUrl}/rezervasyon`,
      en: englishReservationUrl,
      "x-default": `${siteUrl}/rezervasyon`,
    },
  },
};

export default function EnglishReservationPage() {
  return (
    <ClientPage locale="en">
      <ReservationExperience locale="en" />
    </ClientPage>
  );
}
