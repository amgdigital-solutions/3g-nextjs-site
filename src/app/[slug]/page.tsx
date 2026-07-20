import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogBySlug, getAllBlogs } from "@/lib/supabase/server";
import { ArticleJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { Calendar, ArrowLeft, User, Clock, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
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

function getReadingTime(content?: string | null) {
  if (!content) return "3 min read";
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${Math.max(1, mins)} min read`;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) return notFound();

  const faqs = post.faqs || [];
  const readingTime = getReadingTime(post.content);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <ArticleJsonLd post={post} />
      {faqs.length > 0 && <FaqJsonLd faqs={faqs} />}

      {/* Modern Hero Section */}
      <div className="bg-navy-900 relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
        
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gold/30" />

        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 sm:py-20 relative z-10">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/50 text-sm mb-8 hover:text-gold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Category */}
          {post.category && (
            <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold tracking-wider uppercase rounded-full mb-5">
              {post.category}
            </span>
          )}

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-4xl mb-6">
            {post.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white/50 text-sm">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author_name || "3G Real Estate"}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.created_at)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {readingTime}
            </span>
          </div>
        </div>

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{
          clipPath: "ellipse(75% 100% at 50% 100%)",
        }} />
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-navy-900/70 italic mb-10 leading-relaxed border-l-4 border-gold pl-6 py-2">
              {post.excerpt}
            </p>
          )}

          {/* Main Content */}
          {post.content && (
            <div
              className="prose-blog text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {/* FAQs */}
          {faqs.length > 0 && (
            <div className="mt-14 pt-10 border-t border-gray-100">
              <h2 className="font-serif text-2xl text-navy-950 mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-5 sm:p-6 bg-gray-50/80 rounded-xl border border-gray-100">
                    <h3 className="font-medium text-navy-900 mb-2 text-base">{faq.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-semibold text-gray-500">Related Topics</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-navy-900 text-white/90 text-sm rounded-lg font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-14 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-navy-900 text-white rounded-xl hover:bg-navy-800 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </Link>
          </div>
        </div>
      </div>

      {/* Related Posts Section - simple CTA */}
      <div className="bg-gray-50/50 border-t border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-serif text-2xl text-navy-950 mb-3">
              Explore More Insights
            </h3>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Discover expert guides, market analysis, and investment tips from our team of Dubai real estate specialists.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy-900 text-navy-900 rounded-xl hover:bg-navy-900 hover:text-white transition-colors font-medium"
            >
              View All Articles
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
