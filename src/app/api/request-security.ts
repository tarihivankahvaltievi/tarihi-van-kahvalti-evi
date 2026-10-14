export class RequestError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Enforce the limit while streaming too: Content-Length is optional and cannot
// be trusted as the only protection against oversized JSON bodies.
export async function readBoundedBody(request: Request, maxBytes: number) {
  if (Number(request.headers.get("content-length")) > maxBytes) {
    throw new RequestError("İstek boyutu çok büyük.", 413);
  }
  const reader = request.body?.getReader();
  if (!reader) throw new RequestError("İstek gövdesi eksik.", 400);
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new RequestError("İstek boyutu çok büyük.", 413);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks);
}

export async function readJsonObject(request: Request, maxBytes = 16 * 1024) {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    throw new RequestError("JSON içerik türü gereklidir.", 415);
  }
  const bytes = await readBoundedBody(request, maxBytes);
  try {
    const body = JSON.parse(bytes.toString("utf8"));
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("object required");
    return body as Record<string, unknown>;
  } catch {
    throw new RequestError("Geçersiz JSON verisi.", 400);
  }
}
