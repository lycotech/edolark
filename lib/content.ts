import { db } from "./supabase";
import { equipment as defaultEquipment, projects as defaultProjects, services as defaultServices, team as defaultTeam } from "./data";
import type { Project, TeamMember } from "./data";

export type Service = { title: string; description: string };
export type EquipmentItem = { name: string };

export const CONTENT_KEYS = ["projects", "team", "services", "equipment"] as const;
export type ContentKey = (typeof CONTENT_KEYS)[number];

async function load<T>(key: ContentKey, fallback: T): Promise<T> {
  const client = db();
  if (!client) return fallback;
  try {
    const { data, error } = await client.from("content").select("value").eq("key", key).maybeSingle();
    if (error || !data || !Array.isArray(data.value)) return fallback;
    return data.value as T;
  } catch {
    return fallback;
  }
}

export const getProjects = () => load<Project[]>("projects", defaultProjects);
export const getTeam = () => load<TeamMember[]>("team", defaultTeam);
export const getServices = () => load<Service[]>("services", defaultServices);
export const getEquipment = () => load<EquipmentItem[]>("equipment", defaultEquipment);

export const defaults = {
  projects: defaultProjects,
  team: defaultTeam,
  services: defaultServices,
  equipment: defaultEquipment,
};
