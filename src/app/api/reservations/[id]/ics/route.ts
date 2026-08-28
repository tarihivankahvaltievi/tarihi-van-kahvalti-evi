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

    if (!reservation) {
      return new NextResponse("Rezervasyon bulunamadı", { status: 404 });
    }

    const icsContent = generateSingleReservationIcs(reservation);

    return new NextResponse(icsContent, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="rezervasyon-${id}.ics"`,
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("ICS generation error:", error);
    return new NextResponse("Takvim dosyası oluşturulamadı", { status: 500 });
  }
}
