import { cookies } from "next/headers";
import crypto from "crypto";

export function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password && process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_PASSWORD canlı ortamda tanımlanmalıdır.");
  }
  return password || "development-only-admin-password";
}

export function getSessionHash(password: string): string {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET || getAdminPassword();
  return crypto.createHmac("sha256", sessionSecret).update(password).digest("hex");
}

export function safeEqual(value: string, expected: string): boolean {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return valueBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(valueBuffer, expectedBuffer);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session) return false;

  const expectedPassword = getAdminPassword();
  const expectedHash = getSessionHash(expectedPassword);

  return safeEqual(session, expectedHash);
}
