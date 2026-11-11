import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { db, MEDIA_BUCKET } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  const client = db();
  if (!client) return NextResponse.json({ error: "Supabase is not connected." }, { status: 500 });

  const form = await request.formData();
  const file = form.get("file");
  const folder = String(form.get("folder") ?? "misc").toLowerCase().replace(/[^a-z0-9-]+/g, "-").slice(0, 80) || "misc";
  if (!(file instanceof File)) return NextResponse.json({ error: "No file received." }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "Only images are allowed." }, { status: 400 });
  if (file.size > 4 * 1024 * 1024) return NextResponse.json({ error: "Image is too large (max 4 MB)." }, { status: 413 });

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `projects/${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await client.storage.from(MEDIA_BUCKET).upload(path, await file.arrayBuffer(), {
    contentType: file.type,
    cacheControl: "31536000",
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const { data } = client.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
