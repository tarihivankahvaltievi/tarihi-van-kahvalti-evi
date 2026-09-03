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

    // Validation
    if (!customerName || !customerPhone || !date || !time) {
      return NextResponse.json(
        { error: "Lütfen ad soyad, telefon, tarih ve saat alanlarını doldurunuz." },
        { status: 400 }
      );
    }

    const guestCount = Math.max(1, Math.min(50, Number(guests) || 2));
    const validServiceType: ServiceType =
      serviceType === "cafe" ? "cafe" : "breakfast";

    const newReservation = await addReservation({
      customerName: String(customerName).trim().slice(0, 100),
      customerPhone: String(customerPhone).trim().slice(0, 30),
      customerEmail: customerEmail ? String(customerEmail).trim().slice(0, 100) : undefined,
      date: String(date).trim(),
      time: String(time).trim(),
      guests: guestCount,
      serviceType: validServiceType,
      note: note ? String(note).trim().slice(0, 300) : undefined,
      status: "pending",
    });

    const baseUrl = siteUrl || "https://www.tarihivankahvaltievi.com";
    const icsUrl = `${baseUrl}/api/reservations/${newReservation.id}/ics`;

    // Google Calendar direct template link
    const [year, month, day] = newReservation.date.split("-");
    const [hour, min] = newReservation.time.split(":");
    const startStr = `${year}${month}${day}T${hour}${min}00`;
    // 2 hours end
    const startDate = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(min));
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
