import type { Metadata } from "next";
import { Suspense } from "react";
import ReservationCalendarPage from "@/app/rezervasyon/takvim/[id]/page";
import { siteName } from "@/app/seo";

export const metadata: Metadata = {
  title: `Add Reservation to Calendar | ${siteName}`,
  description: "Add your table reservation at Tarihi Van Breakfast House directly to your iPhone, Apple Calendar, or Google Calendar.",
  robots: {
    index: false,
    follow: false,
  },
};

interface EnglishCalendarPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function EnglishCalendarWrapper({
  params,
  searchParams,
}: EnglishCalendarPageProps) {
  const sp = (await searchParams) || {};
  const enSearchParams = Promise.resolve({
    ...sp,
    lang: "en",
    locale: "en",
  });

  return (
    <ReservationCalendarPage
      params={params}
      searchParams={enSearchParams}
    />
  );
}

export default function EnglishReservationCalendarPage(props: EnglishCalendarPageProps) {
  return (
    <Suspense fallback={null}>
      <EnglishCalendarWrapper {...props} />
    </Suspense>
  );
}
