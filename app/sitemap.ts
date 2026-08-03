import type { MetadataRoute } from "next";
import { absoluteUrl, tools } from "@/lib/site";

// Required for `output: export` — emit a static sitemap.xml at build time.
export const dynamic = "force-static";

/** Static sitemap covering every indexable page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about/", priority: 0.5, changeFrequency: "yearly" },
    { path: "/disclaimer/", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy/", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms/", priority: 0.3, changeFrequency: "yearly" },
    { path: "/do-not-sell/", priority: 0.3, changeFrequency: "yearly" },
  ];

  const toolPages = tools.map((t) => ({
    path: `/${t.slug}/`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...toolPages].map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
