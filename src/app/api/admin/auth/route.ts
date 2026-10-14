import { readJsonObject, RequestError } from "@/app/api/request-security";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminPassword, getSessionSecret, createSession, safeEqual, sessionLifetimeSeconds } from "@/app/admin/auth-helper";

export async function POST(request: Request) {
  try {
    const { password } = await readJsonObject(request, 4096);

    const expectedPassword = getAdminPassword();
    if (typeof password === "string" && safeEqual(password, expectedPassword)) {
      const session = createSession(expectedPassword, getSessionSecret());
      const cookieStore = await cookies();

      cookieStore.set({
        name: "admin_session",
        value: session,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: sessionLifetimeSeconds,
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
