"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { adminConfigured, createSessionToken, isAdmin, passwordMatches, SESSION_COOKIE, sessionCookieOptions } from "@/lib/admin-auth";
import { CONTENT_KEYS, type ContentKey } from "@/lib/content";
import { db } from "@/lib/supabase";

export type Result = { ok: true } | { ok: false; error: string };

export async function login(_prev: Result | null, formData: FormData): Promise<Result> {
  if (!adminConfigured()) return { ok: false, error: "ADMIN_PASSWORD is not set on the server." };
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { ok: false, error: "Incorrect password." };
  }
  (await cookies()).set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);
  revalidatePath("/admin");
  return { ok: true };
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  revalidatePath("/admin");
}

const text = (value: unknown, max = 8000) => String(value ?? "").trim().slice(0, max);
const list = (value: unknown, max = 200) => (Array.isArray(value) ? value.slice(0, max) : []);
const STATUSES = ["Available now", "Completed", "Ongoing", "Executed", "Coming soon"];

function clean(key: ContentKey, items: unknown[]): unknown[] | string {
  switch (key) {
    case "projects": {
      const slugs = new Set<string>();
      const out = [];
      for (const raw of items as Record<string, unknown>[]) {
        const slug = text(raw.slug, 120).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
        if (!slug) return "Every project needs a title (it is used to build the web address).";
        if (slugs.has(slug)) return `Two projects share the web address "${slug}". Change one of the titles.`;
        slugs.add(slug);
        const project: Record<string, unknown> = {
          slug,
          title: text(raw.title, 200),
          location: text(raw.location, 200),
          status: STATUSES.includes(String(raw.status)) ? String(raw.status) : "Completed",
          type: text(raw.type, 120),
          summary: text(raw.summary, 400),
          description: text(raw.description),
          features: list(raw.features, 40).map((f) => text(f, 300)).filter(Boolean),
          gallery: list(raw.gallery, 80).map((g) => text(g, 600)).filter(Boolean),
        };
        for (const optional of ["client", "contractSum", "completedYear"] as const) {
          const value = text(raw[optional], 120);
          if (value) project[optional] = value;
        }
        if (!project.title) return "Every project needs a title.";
        out.push(project);
      }
      return out;
    }
    case "team":
      return (items as Record<string, unknown>[])
        .map((raw) => ({
          name: text(raw.name, 120),
          role: text(raw.role, 160),
          initials: text(raw.initials, 4).toUpperCase(),
          bio: text(raw.bio, 12000),
        }))
        .filter((member) => member.name);
    case "services":
      return (items as Record<string, unknown>[])
        .map((raw) => ({ title: text(raw.title, 160), description: text(raw.description, 1500) }))
        .filter((service) => service.title);
    case "equipment":
      return (items as Record<string, unknown>[]).map((raw) => ({ name: text(raw.name, 160) })).filter((item) => item.name);
  }
}

export async function saveContent(key: ContentKey, items: unknown[]): Promise<Result> {
  if (!(await isAdmin())) return { ok: false, error: "Your session expired. Please log in again." };
  if (!CONTENT_KEYS.includes(key)) return { ok: false, error: "Unknown content type." };
  const client = db();
  if (!client) return { ok: false, error: "Supabase is not connected yet (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing)." };
  const value = clean(key, list(items, 500));
  if (typeof value === "string") return { ok: false, error: value };
  const { error } = await client.from("content").upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) return { ok: false, error: `Could not save: ${error.message}` };
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function setEnquiryHandled(id: string, handled: boolean): Promise<Result> {
  if (!(await isAdmin())) return { ok: false, error: "Session expired." };
  const client = db();
  if (!client) return { ok: false, error: "Supabase is not connected." };
  const { error } = await client.from("enquiries").update({ handled }).eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function deleteEnquiry(id: string): Promise<Result> {
  if (!(await isAdmin())) return { ok: false, error: "Session expired." };
  const client = db();
  if (!client) return { ok: false, error: "Supabase is not connected." };
  const { error } = await client.from("enquiries").delete().eq("id", id);
  return error ? { ok: false, error: error.message } : { ok: true };
}
