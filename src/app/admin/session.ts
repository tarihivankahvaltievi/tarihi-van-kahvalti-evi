import crypto from "node:crypto";

export const sessionLifetimeSeconds = 60 * 60 * 24 * 7;

export function safeEqual(value: string, expected: string): boolean {
  const actual = Buffer.from(value);
  const target = Buffer.from(expected);
  return actual.length === target.length && crypto.timingSafeEqual(actual, target);
}

function signature(payload: string, password: string, secret: string) {
  // Password rotation invalidates existing sessions even with a separate secret.
  return crypto.createHmac("sha256", secret).update(JSON.stringify([payload, password])).digest("hex");
}

export function createSession(password: string, secret: string, now = Date.now()): string {
  const expires = Math.floor(now / 1000) + sessionLifetimeSeconds;
  const payload = `v1.${expires}.${crypto.randomBytes(24).toString("hex")}`;
  return `${payload}.${signature(payload, password, secret)}`;
}

export function verifySession(token: string, password: string, secret: string, now = Date.now()): boolean {
  const match = /^v1\.(\d{10})\.([a-f0-9]{48})\.([a-f0-9]{64})$/.exec(token);
  if (!match) return false;
  const expires = Number(match[1]);
  const current = Math.floor(now / 1000);
  if (expires <= current || expires > current + sessionLifetimeSeconds) return false;
  const payload = token.slice(0, token.lastIndexOf("."));
  return safeEqual(match[3], signature(payload, password, secret));
}
