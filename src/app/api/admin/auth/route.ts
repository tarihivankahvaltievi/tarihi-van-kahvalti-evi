import { readJsonObject, RequestError } from "@/app/api/request-security";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminPassword, getSessionHash, safeEqual } from "@/app/admin/auth-helper";

export async function POST(request: Request) {
  try {
    const { password } = await readJsonObject(request, 4096);

    const expectedPassword = getAdminPassword();
    if (typeof password === "string" && safeEqual(password, expectedPassword)) {
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
    if (error instanceof RequestError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
