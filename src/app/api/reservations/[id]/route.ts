import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/admin/auth-helper";
import {
  updateReservation,
  deleteReservation,
  getReservationById,
} from "@/app/reservations/reservation-storage";
import { getIstanbulDate } from "@/app/rezervasyon/reservation-time";

export async function GET(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Yetkisiz işlem" }, { status: 401 });
    }

    const { id } = await props.params;
    const reservation = await getReservationById(id);
    if (!reservation) {
      return NextResponse.json({ error: "Rezervasyon bulunamadı" }, { status: 404 });
    }
    return NextResponse.json({ reservation });
  } catch (error) {
    console.error("Get reservation error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Yetkisiz işlem" }, { status: 401 });
    }

    const { id } = await props.params;
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body) ||
        !Object.keys(body).length || Object.keys(body).some((key) => !["status", "attendance"].includes(key)) ||
        ("status" in body && !["pending", "confirmed", "cancelled"].includes(body.status)) ||
        ("attendance" in body && body.attendance !== null && !["arrived", "no_show"].includes(body.attendance))) {
      return NextResponse.json({ error: "Geçersiz durum veya ziyaret sonucu." }, { status: 400 });
    }
    const existing = await getReservationById(id);
    if (!existing) return NextResponse.json({ error: "Rezervasyon bulunamadı" }, { status: 404 });
    const status = body.status ?? existing.status;
    if (body.attendance && (status !== "confirmed" || existing.date > getIstanbulDate(new Date()) ||
        (body.attendance === "no_show" && Date.parse(`${existing.date}T${existing.time}:00+03:00`) > Date.now()))) {
      return NextResponse.json({ error: "Ziyaret sonucu yalnız tarihi gelmiş, onaylı bir kayıt için işlenebilir." }, { status: 400 });
    }
    const updated = await updateReservation(id, { status, ...("attendance" in body ? { attendance: body.attendance } : {}) });
    if (!updated) {
      return NextResponse.json({ error: "Rezervasyon bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ success: true, reservation: updated });
  } catch (error) {
    console.error("Update reservation error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Yetkisiz işlem" }, { status: 401 });
    }

    const { id } = await props.params;
    const deleted = await deleteReservation(id);
    if (!deleted) {
      return NextResponse.json({ error: "Rezervasyon bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete reservation error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
