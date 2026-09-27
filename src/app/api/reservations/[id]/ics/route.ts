import { NextResponse } from "next/server";
import { getReservationById } from "@/app/reservations/reservation-storage";
import { generateSingleReservationIcs } from "@/app/reservations/ical-helper";

export async function GET(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const reservation = await getReservationById(id);

    const url = new URL(_request.url);
    const localeParam = (url.searchParams.get("locale") || url.searchParams.get("lang") || "tr") as "tr" | "en";

    if (!reservation) return new NextResponse("Rezervasyon bulunamadı", { status: 404 });

    const icsContent = generateSingleReservationIcs(
      reservation,
      localeParam === "en" ? "en" : "tr"
    );

    const dlParam = url.searchParams.get("dl");
    const disposition = dlParam === "1" ? "attachment" : "inline";
    const filenamePrefix = localeParam === "en" ? "reservation" : "rezervasyon";

    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8; method=PUBLISH",
        "Content-Disposition": `${disposition}; filename="${filenamePrefix}-${id}.ics"`,
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("ICS generation error:", error);
    return new NextResponse("Takvim dosyası oluşturulamadı", { status: 500 });
  }
}
