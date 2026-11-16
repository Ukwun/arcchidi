import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-origin";
import { projects } from "@/data/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteOrigin = await getSiteOrigin();

  return [
    {
      url: siteOrigin.toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, siteOrigin).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
