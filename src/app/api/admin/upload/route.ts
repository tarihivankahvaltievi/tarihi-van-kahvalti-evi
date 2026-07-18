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
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
    }

    const sanitizedFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    // 3. Handle Supabase Upload
    if (isSupabaseConfigured()) {
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      const bucketName = "menu-images";

      const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucketName}/${sanitizedFilename}`;
      const bytes = await file.arrayBuffer();

      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          apikey: supabaseKey || "",
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": file.type,
        },
        body: bytes,
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
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, sanitizedFilename);
    await fs.writeFile(filePath, buffer);

    const fileUrl = `/uploads/${sanitizedFilename}`;
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: "Yükleme sırasında hata oluştu" }, { status: 500 });
  }
}
