import { cookies } from "next/headers";
import crypto from "crypto";

export function getSessionHash(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session) return false;

  const expectedPassword = process.env.ADMIN_PASSWORD || "tarihivan1978";
  const expectedHash = getSessionHash(expectedPassword);

  return session === expectedHash;
}
