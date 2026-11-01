import { MetadataRoute } from "next";
import { company, projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.website;
  const routes = ["/", "/about", "/services", "/projects", "/team", "/contact"];
  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/projects" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...pages, ...projectPages];
}
