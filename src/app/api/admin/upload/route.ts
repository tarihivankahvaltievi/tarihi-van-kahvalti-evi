import sharp from "sharp";
import { randomUUID } from "node:crypto";
import { readBoundedBody, RequestError } from "@/app/api/request-security";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { isAdminAuthenticated } from "@/app/admin/auth-helper";
import { isSupabaseConfigured } from "@/app/menu/menu-storage";

export async function POST(request: Request) {
  try {
    // 1. Authenticate
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Yetkisiz işlem" }, { status: 401 });
    }

    // 2. Parse form data
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().startsWith("multipart/form-data;")) {
      throw new RequestError("Form verisi gereklidir.", 415);
    }
    const payload = await readBoundedBody(request, 6 * 1024 * 1024);
    let formData: FormData;
    try {
      formData = await new Response(new Uint8Array(payload), { headers: { "Content-Type": contentType } }).formData();
    } catch {
      throw new RequestError("Geçersiz form verisi.", 400);
    }
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
    }

    if (!file.size || file.size > 5 * 1024 * 1024) {
      throw new RequestError("Görsel en fazla 5 MB olabilir.", 413);
    }
    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) {
      throw new RequestError("Yalnız JPEG, PNG, WebP veya AVIF görsel yükleyebilirsiniz.", 415);
    }
    // Decode real pixels and re-encode: neither the filename nor the MIME
    // declaration is trusted. SVG/HTML and embedded metadata never reach storage.
    let buffer: Buffer;
    try {
      const image = sharp(await file.arrayBuffer(), { limitInputPixels: 16_000_000, animated: false });
      const metadata = await image.metadata();
      if (!["jpeg", "png", "webp", "avif", "heif"].includes(metadata.format || "")) throw new Error("unsupported format");
      buffer = await image.rotate().resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
    } catch {
      throw new RequestError("Görsel okunamadı veya çözünürlüğü çok büyük.", 400);
    }
    const sanitizedFilename = `${randomUUID()}.webp`;

    // 3. Handle Supabase Upload
    if (isSupabaseConfigured()) {
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      const bucketName = "menu-images";

      const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucketName}/${sanitizedFilename}`;

      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          apikey: supabaseKey || "",
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "image/webp",
        },
        body: new Uint8Array(buffer),
        signal: AbortSignal.timeout(10_000),
      });

      if (res.ok) {
        // Return the public URL of the uploaded image
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${sanitizedFilename}`;
        return NextResponse.json({ url: publicUrl });
      } else {
        console.error("Supabase Storage upload failed:", res.status, await res.text());
        // If Supabase upload fails, fall back to local disk
      }
    }

    // 4. Handle Local Upload (Fallback)
    const uploadDir = process.env.UPLOAD_DIRECTORY ? path.resolve(process.env.UPLOAD_DIRECTORY) : path.join(process.cwd(), "public/uploads");

    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, sanitizedFilename);
    await fs.writeFile(filePath, buffer);

    const fileUrl = `/uploads/${sanitizedFilename}`;
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    if (error instanceof RequestError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "Yükleme sırasında hata oluştu" }, { status: 500 });
  }
}
