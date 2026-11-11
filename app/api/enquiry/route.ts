import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";

export const runtime = "nodejs";

const clip = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);

/** Stores a contact-form enquiry so it shows in the admin inbox. Email delivery is handled by the form itself. */
export async function POST(request: Request) {
  const client = db();
  if (!client) return NextResponse.json({ stored: false });
  try {
    const body = await request.json();
    if (body._honey) return NextResponse.json({ stored: false });
    const row = {
      name: clip(body.name, 160),
      phone: clip(body.phone, 60),
      email: clip(body.email, 200),
      interest: clip(body.interest, 80),
      message: clip(body.message, 5000),
    };
    if (!row.name || !row.email) return NextResponse.json({ stored: false }, { status: 400 });
    const { error } = await client.from("enquiries").insert(row);
    return NextResponse.json({ stored: !error });
  } catch {
    return NextResponse.json({ stored: false }, { status: 400 });
  }
}
