import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, getAllBlogs } from "@/lib/supabase/server";
import { ArticleJsonLd } from "@/components/seo/JsonLd";
import { Calendar, ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.meta_title || `${post.title} | 3G Real Estate Blog`,
    description: post.meta_description || post.excerpt?.slice(0, 160) || "",
    keywords: post.focus_keyword || undefined,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || undefined,
      images: post.featured_image ? [{ url: post.featured_image }] : [],
      type: "article",
    },
    alternates: {
      canonical: `https://3guae.com/${post.slug}`,
    },
  };
}

export const revalidate = 600;

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) return notFound();

  // Redirect /blog/[slug] to /[slug] for canonical WordPress-style URLs
  redirect(`/${post.slug}`);
}
