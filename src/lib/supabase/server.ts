import { createClient } from "@supabase/supabase-js";
import type { Property, BlogPost, Community } from "@/types";

const SUPABASE_URL = "https://kkygtvbunikkyrotvqom.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtreWd0dmJ1bmlra3lyb3R2cW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4Nzk5OTMsImV4cCI6MjA5OTQ1NTk5M30.RankgMxzSylkrlt-2KFsuBf6SUVSvT5CLnUOLqJY2k0";

export function getServerClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// ─── Properties ───

export async function getAllProperties(): Promise<Property[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("listed_properties")
    .select("*")
    .eq("is_published", true)
    .eq("hidden", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
  return data || [];
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("listed_properties")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error("Error fetching property:", error);
    return null;
  }
  return data;
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("listed_properties")
    .select("*")
    .eq("is_published", true)
    .eq("hidden", false)
    .eq("show_in_hero", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Error fetching featured properties:", error);
    return [];
  }
  return data || [];
}

export async function getExclusiveProperties(): Promise<Property[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("listed_properties")
    .select("*")
    .eq("is_published", true)
    .eq("hidden", false)
    .eq("project_status", "ready")
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    console.error("Error fetching exclusive properties:", error);
    return [];
  }
  return data || [];
}

// ─── Communities ───

export async function getAllCommunities(): Promise<Community[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .eq("status", "published")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching communities:", error);
    return [];
  }
  return data || [];
}

export async function getCommunityBySlug(slug: string): Promise<Community | null> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching community:", error);
    return null;
  }
  return data;
}

// ─── Blogs ───

export async function getAllBlogs(): Promise<BlogPost[]> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
  return data || [];
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
  return data;
}
