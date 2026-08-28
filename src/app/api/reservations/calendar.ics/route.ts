import { NextRequest, NextResponse } from "next/server";
import {
  getReservationData,
  isValidCalendarFeedToken,
} from "@/app/reservations/reservation-storage";
import { generateCalendarFeedIcs } from "@/app/reservations/ical-helper";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get("key") || searchParams.get("token");

  if (!isValidCalendarFeedToken(key)) {
    return new NextResponse("Yetkisiz takvim erişimi. Geçersiz güvenlik anahtarı.", {
      status: 401,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  try {
    const data = await getReservationData();
    const icsFeed = generateCalendarFeedIcs(data.reservations);

    return new NextResponse(icsFeed, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'inline; filename="tarihi-van-rezervasyonlar.ics"',
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
        "X-Published-TTL": "PT15M",
      },
    });
  } catch (error) {
    console.error("Calendar Feed generation error:", error);
    return new NextResponse("Takvim akışı oluşturulurken bir hata meydana geldi.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
