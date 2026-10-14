import { cookies } from "next/headers";
import { verifySession } from "./session";

export { createSession, safeEqual, sessionLifetimeSeconds } from "./session";

export function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password && process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_PASSWORD canlı ortamda tanımlanmalıdır.");
  }
  return password || "development-only-admin-password";
}

export function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || getAdminPassword();
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session) return false;
  return verifySession(session, getAdminPassword(), getSessionSecret());
}
