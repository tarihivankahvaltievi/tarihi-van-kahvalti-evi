import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/admin/auth-helper";
import {
  updateReservation,
  deleteReservation,
  getReservationById,
} from "@/app/reservations/reservation-storage";

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

    const updated = await updateReservation(id, body);
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
