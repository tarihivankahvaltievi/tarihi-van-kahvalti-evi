import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/admin/auth-helper";
import {
  getReservationData,
  addReservation,
  type ServiceType,
} from "@/app/reservations/reservation-storage";
import { displayAddress, siteUrl } from "@/app/seo";

export async function GET() {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Yetkisiz işlem" }, { status: 401 });
    }

    const data = await getReservationData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Reservations GET API error:", error);
    return NextResponse.json(
      { error: "Rezervasyon verileri alınamadı" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      date,
      time,
      guests,
      serviceType,
      note,
      honeypot,
    } = body;

    // Spam honeypot protection
    if (honeypot) {
      return NextResponse.json({ success: true, message: "İşlem tamamlandı" });
    }

    const normalizedName = String(customerName ?? "").trim();
    const normalizedPhone = String(customerPhone ?? "").trim();
    const normalizedDate = String(date ?? "").trim();
    const normalizedTime = String(time ?? "").trim();
    const phoneDigits = normalizedPhone.replace(/\D/g, "");
    const todayParts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Istanbul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const todayPart = (type: "year" | "month" | "day") =>
      todayParts.find((part) => part.type === type)?.value ?? "";
    const todayInIstanbul = `${todayPart("year")}-${todayPart("month")}-${todayPart("day")}`;

    // Validate server-side as well as in the browser. This protects the admin
    // calendar from malformed or past entries sent directly to the endpoint.
    if (
      normalizedName.length < 2 ||
      normalizedName.length > 70 ||
      phoneDigits.length < 10 ||
      phoneDigits.length > 15 ||
      !/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate) ||
      !/^\d{2}:\d{2}$/.test(normalizedTime)
    ) {
      return NextResponse.json(
        { error: "Ad, telefon, tarih veya saat bilgisi geçersiz." },
        { status: 400 }
      );
    }

    const parsedDate = new Date(`${normalizedDate}T${normalizedTime}:00+03:00`);
    const [year, month, day] = normalizedDate.split("-").map(Number);
    const [hours, minutes] = normalizedTime.split(":").map(Number);
    const calendarDate = new Date(Date.UTC(year, month - 1, day));
    const isRealCalendarDate =
      calendarDate.getUTCFullYear() === year &&
      calendarDate.getUTCMonth() === month - 1 &&
      calendarDate.getUTCDate() === day;
    if (
      !Number.isFinite(parsedDate.getTime()) ||
      !isRealCalendarDate ||
      normalizedDate < todayInIstanbul ||
      hours < 7 ||
      hours > 22 ||
      (hours === 22 && minutes > 0) ||
      minutes < 0 ||
      minutes > 59
    ) {
      return NextResponse.json(
        { error: "Lütfen bugünden sonraki geçerli bir tarih ve çalışma saatleri içinde bir saat seçin." },
        { status: 400 },
      );
    }

    const guestCount = Math.max(1, Math.min(40, Math.trunc(Number(guests) || 2)));
    const validServiceType: ServiceType =
      serviceType === "cafe" ? "cafe" : "breakfast";

    const newReservation = await addReservation({
      customerName: normalizedName,
      customerPhone: normalizedPhone,
      customerEmail: customerEmail ? String(customerEmail).trim().slice(0, 100) : undefined,
      date: normalizedDate,
      time: normalizedTime,
      guests: guestCount,
      serviceType: validServiceType,
      note: note ? String(note).trim().slice(0, 300) : undefined,
      status: "pending",
    });

    const baseUrl = siteUrl || "https://www.tarihivankahvaltievi.com";
    const icsUrl = `${baseUrl}/api/reservations/${newReservation.id}/ics`;

    // Google Calendar direct template link
    const [reservationYear, reservationMonth, reservationDay] = newReservation.date.split("-");
    const [hour, min] = newReservation.time.split(":");
    const startStr = `${reservationYear}${reservationMonth}${reservationDay}T${hour}${min}00`;
    // 2 hours end
    const startDate = new Date(
      Number(reservationYear),
      Number(reservationMonth) - 1,
      Number(reservationDay),
      Number(hour),
      Number(min),
    );
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    const pad = (n: number) => String(n).padStart(2, "0");
    const endStr = `${endDate.getFullYear()}${pad(endDate.getMonth() + 1)}${pad(endDate.getDate())}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}00`;

    const gCalTitle = encodeURIComponent(`🍳 Tarihi Van Kahvaltı Evi Rezervasyonu (${newReservation.guests} Kişi)`);
    const gCalDetails = encodeURIComponent(`Rezervasyon No: ${newReservation.id}\nAd: ${newReservation.customerName}\nKişi: ${newReservation.guests}\nNot: ${newReservation.note || "-"}\nAdres: ${displayAddress}`);
    const gCalLocation = encodeURIComponent(`Tarihi Van Kahvaltı Evi, ${displayAddress}`);
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gCalTitle}&dates=${startStr}/${endStr}&details=${gCalDetails}&location=${gCalLocation}&ctz=Europe/Istanbul`;

    return NextResponse.json({
      success: true,
      reservation: newReservation,
      icsUrl,
      googleCalendarUrl,
    });
  } catch (error) {
    console.error("Reservation POST API error:", error);
    return NextResponse.json(
      { error: "Rezervasyon oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
}
