import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { getEquipment, getProjects, getServices, getTeam } from "@/lib/content";
import { db, MEDIA_BUCKET } from "@/lib/supabase";
import { LoginForm } from "./login-form";
import { AdminApp, type Enquiry } from "./admin-app";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) return <LoginForm configured={adminConfigured()} />;

  const client = db();
  const [projects, team, services, equipment] = await Promise.all([getProjects(), getTeam(), getServices(), getEquipment()]);

  let enquiries: Enquiry[] = [];
  const problems: string[] = [];
  if (!process.env.SUPABASE_URL) problems.push("SUPABASE_URL is not set in this deployment.");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const similar = Object.keys(process.env).filter((name) => /supa|service|secret/i.test(name) && !name.startsWith("npm_"));
    problems.push(
      `SUPABASE_SERVICE_ROLE_KEY is not set in this deployment. Supabase-like variables this deployment can see: ${similar.length ? similar.join(", ") : "none"}. Environment: ${process.env.VERCEL_ENV ?? "unknown"}, build ${(process.env.VERCEL_GIT_COMMIT_SHA ?? "unknown").slice(0, 7)}.`
    );
  }
  if (client) {
    const content = await client.from("content").select("key").limit(1);
    if (content.error) problems.push(`Table "content": ${content.error.message}`);
    const inbox = await client.from("enquiries").select("*").order("created_at", { ascending: false }).limit(200);
    if (inbox.error) problems.push(`Table "enquiries": ${inbox.error.message}`);
    else enquiries = (inbox.data ?? []) as Enquiry[];
    const bucket = await client.storage.getBucket(MEDIA_BUCKET);
    if (bucket.error) problems.push(`Storage bucket "${MEDIA_BUCKET}": ${bucket.error.message}`);
  }

  return <AdminApp connected={Boolean(client) && problems.length === 0} problems={problems} projects={projects} team={team} services={services} equipment={equipment} enquiries={enquiries} />;
}
