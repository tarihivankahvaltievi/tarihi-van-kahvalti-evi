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
    const nameParam = url.searchParams.get("name");
    const phoneParam = url.searchParams.get("phone");
    const dateParam = url.searchParams.get("date");
    const timeParam = url.searchParams.get("time");
    const guestsParam = url.searchParams.get("guests");
    const serviceParam = url.searchParams.get("service");
    const noteParam = url.searchParams.get("note");

    let effectiveReservation = reservation;
    if (!effectiveReservation && (nameParam || dateParam)) {
      effectiveReservation = {
        id,
        customerName: nameParam || "Misafir",
        customerPhone: phoneParam || "",
        date: dateParam || new Date().toISOString().slice(0, 10),
        time: timeParam || "10:00",
        guests: Number(guestsParam) || 2,
        serviceType: serviceParam === "cafe" ? "cafe" : "breakfast",
        note: noteParam || undefined,
        status: "confirmed",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    if (!effectiveReservation) {
      return new NextResponse("Rezervasyon bulunamadı", { status: 404 });
    }

    const icsContent = generateSingleReservationIcs(effectiveReservation);

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
