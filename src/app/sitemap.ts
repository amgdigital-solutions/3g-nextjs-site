import { MetadataRoute } from "next";
import { getAllProperties, getAllCommunities, getAllBlogs } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, communities, blogs] = await Promise.all([
    getAllProperties(),
    getAllCommunities(),
    getAllBlogs(),
  ]);

  const staticPages = [
    { url: "https://3guae.com/", priority: 1.0, changeFrequency: "daily" as const },
    { url: "https://3guae.com/properties", priority: 0.9, changeFrequency: "daily" as const },
    { url: "https://3guae.com/communities", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "https://3guae.com/blog", priority: 0.8, changeFrequency: "daily" as const },
    { url: "https://3guae.com/developers", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "https://3guae.com/golden-visa", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "https://3guae.com/property-management", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "https://3guae.com/about", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const propertyPages = properties.map((p) => ({
    url: `https://3guae.com/property/${p.slug}`,
    lastModified: new Date(p.updated_at),
    priority: 0.8,
    changeFrequency: "weekly" as const,
  }));

  const communityPages = communities.map((c) => ({
    url: `https://3guae.com/community/${c.slug}`,
    lastModified: new Date(c.updated_at),
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const blogPages = blogs.map((b) => ({
    url: `https://3guae.com/${b.slug}`,
    lastModified: new Date(b.updated_at),
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...propertyPages, ...communityPages, ...blogPages];
}
