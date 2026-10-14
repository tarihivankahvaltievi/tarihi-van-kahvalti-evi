import assert from "node:assert/strict";
import { readJsonObject, RequestError } from "../src/app/api/request-security.ts";

const request = (parts, headers = {}) => new Request("http://localhost/api", {
  method: "POST",
  headers: { "Content-Type": "application/json", ...headers },
  body: new ReadableStream({
    start(controller) {
      for (const part of parts) controller.enqueue(new TextEncoder().encode(part));
      controller.close();
    },
  }),
  duplex: "half",
});

assert.deepEqual(await readJsonObject(request(['{"a":', '"b"}']), 10), { a: "b" });
for (const headers of [{}, { "Content-Length": "1" }]) {
  await assert.rejects(readJsonObject(request(['{"a":"', "x".repeat(30), '"}'], headers), 10),
    (error) => error instanceof RequestError && error.status === 413);
}
for (const payload of ["[]", "null", "{", "true"]) {
  await assert.rejects(readJsonObject(request([payload])), (error) => error.status === 400);
}
await assert.rejects(readJsonObject(request(["{}"], { "Content-Type": "text/plain" })),
  (error) => error.status === 415);
console.log("JSON güvenliği: akışta boyut sınırı, sahte/eksik Content-Length ve geçersiz gövdeler doğrulandı.");

// A copied cookie must expire on the server, regardless of browser Max-Age.
const { createSession, verifySession, sessionLifetimeSeconds } = await import("../src/app/admin/session.ts");
const now = Date.parse("2026-10-15T10:00:00Z");
const token = createSession("test-password", "test-secret", now);
assert.ok(verifySession(token, "test-password", "test-secret", now));
assert.notEqual(token, createSession("test-password", "test-secret", now));
assert.ok(verifySession(token, "test-password", "test-secret", now + sessionLifetimeSeconds * 1000 - 1));
assert.equal(verifySession(token, "test-password", "test-secret", now + sessionLifetimeSeconds * 1000), false);
for (const [value, password, secret] of [
  [token + "extra", "test-password", "test-secret"],
  [token.replace("v1.", "v2."), "test-password", "test-secret"],
  [token.replace(/\.[a-f0-9]{64}$/, "." + "0".repeat(64)), "test-password", "test-secret"],
  [token, "rotated-password", "test-secret"],
  [token, "test-password", "rotated-secret"],
  ["0".repeat(64), "test-password", "test-secret"],
]) assert.equal(verifySession(value, password, secret, now), false);
assert.equal(verifySession(token, "test-password", "test-secret", now - 2000), false);
console.log("Oturum güvenliği: sunucuda süre sonu, rastgele token, imza, parola/anahtar değişimi ve eski token reddi doğrulandı.");
