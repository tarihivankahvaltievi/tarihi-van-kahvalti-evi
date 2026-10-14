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
