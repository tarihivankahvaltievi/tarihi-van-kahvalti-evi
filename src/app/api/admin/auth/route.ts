import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionHash } from "@/app/admin/auth-helper";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const expectedPassword = process.env.ADMIN_PASSWORD || "tarihivan1978";
    if (password === expectedPassword) {
      const hash = getSessionHash(expectedPassword);
      const cookieStore = await cookies();

      cookieStore.set({
        name: "admin_session",
        value: hash,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Hatalı şifre" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
