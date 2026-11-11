import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { getEquipment, getProjects, getServices, getTeam } from "@/lib/content";
import { db } from "@/lib/supabase";
import { LoginForm } from "./login-form";
import { AdminApp, type Enquiry } from "./admin-app";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) return <LoginForm configured={adminConfigured()} />;

  const client = db();
  const [projects, team, services, equipment] = await Promise.all([getProjects(), getTeam(), getServices(), getEquipment()]);

  let enquiries: Enquiry[] = [];
  if (client) {
    const { data } = await client.from("enquiries").select("*").order("created_at", { ascending: false }).limit(200);
    enquiries = (data ?? []) as Enquiry[];
  }

  return <AdminApp connected={Boolean(client)} projects={projects} team={team} services={services} equipment={equipment} enquiries={enquiries} />;
}
