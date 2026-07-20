import { getAllBlogs } from "@/lib/supabase/server";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Dubai Real Estate News & Guides",
  description:
    "Expert insights on Dubai property market. Investment guides, community reviews, and market updates from 3G Real Estate.",
};

export const revalidate = 300;

// Elegant muted color palette for blog card backgrounds
const cardColors = [
  { bg: "bg-[#1a365d]", accent: "bg-[#c9a84c]" },
  { bg: "bg-[#2d3748]", accent: "bg-[#e2e8f0]" },
  { bg: "bg-[#1e3a5f]", accent: "bg-[#d4af37]" },
  { bg: "bg-[#2c3e50]", accent: "bg-[#f39c12]" },
  { bg: "bg-[#243447]", accent: "bg-[#c9a84c]" },
  { bg: "bg-[#1f2937]", accent: "bg-[#e5e7eb]" },
  { bg: "bg-[#2d4a6f]", accent: "bg-[#d4af37]" },
  { bg: "bg-[#283545]", accent: "bg-[#c9a84c]" },
];

function getCardColor(index: number) {
  return cardColors[index % cardColors.length];
}

function getReadingTime(content?: string | null) {
  if (!content) return "3 min read";
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return `${Math.max(1, mins)} min read`;
}

export default async function BlogPage() {
  const posts = await getAllBlogs();

  // Separate featured (first) post from the rest
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Hero Header */}
      <div className="bg-navy-900 py-16 sm:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
            Insights & Guides
          </span>
          <h1 className="heading-lg text-white mb-3 max-w-2xl">
            Dubai Real Estate Blog
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Expert insights, investment guides, and market updates to help you make informed property decisions in Dubai.
          </p>
          <div className="flex items-center gap-6 mt-8 text-white/40 text-sm">
            <span>{posts.length} Articles</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Updated Weekly</span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 sm:py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No articles yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <div className="mb-16">
                <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">
                  Featured Article
                </span>
                <Link
                  href={`/${featured.slug}`}
                  className="group grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500"
                >
                  {/* Featured card - large colored panel */}
                  <div className="bg-navy-900 p-8 sm:p-12 flex flex-col justify-center min-h-[280px] lg:min-h-[360px]">
                    {featured.category && (
                      <span className="inline-block self-start px-3 py-1 bg-gold/20 text-gold text-xs font-semibold tracking-wider uppercase rounded-full mb-5">
                        {featured.category}
                      </span>
                    )}
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-4 group-hover:text-gold transition-colors duration-300">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-white/50 text-base leading-relaxed mb-6 line-clamp-3 max-w-lg">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-white/40 text-sm mt-auto">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(featured.created_at)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {getReadingTime(featured.content)}
                      </span>
                    </div>
                  </div>
                  {/* Right side - subtle pattern */}
                  <div className="hidden lg:flex bg-[#f8f9fa] relative items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.04]" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                    <div className="text-center z-10 px-12">
                      <div className="w-16 h-16 rounded-full bg-navy-900/5 flex items-center justify-center mx-auto mb-4">
                        <ArrowRight className="w-6 h-6 text-navy-900/30 group-hover:text-navy-900/60 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-navy-900/30 font-serif text-lg">Read Article</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Article Grid */}
            {rest.length > 0 && (
              <>
                <span className="text-navy-900/40 text-xs font-semibold tracking-[0.2em] uppercase mb-6 block">
                  Latest Articles
                </span>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post, i) => {
                    const colors = getCardColor(i);
                    return (
                      <Link
                        key={post.id}
                        href={`/${post.slug}`}
                        className="group flex flex-col rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
                      >
                        {/* Plain color thumbnail */}
                        <div className={`${colors.bg} p-6 sm:p-8 min-h-[180px] flex flex-col justify-between relative overflow-hidden`}>
                          {/* Subtle decorative circle */}
                          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
                          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5" />
                          
                          {post.category && (
                            <span className="relative z-10 inline-block self-start px-2.5 py-1 bg-white/15 text-white/90 text-[10px] font-semibold tracking-wider uppercase rounded-full">
                              {post.category}
                            </span>
                          )}
                          <h3 className="relative z-10 font-serif text-lg text-white leading-snug line-clamp-3 group-hover:text-white/90 transition-colors">
                            {post.title}
                          </h3>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                          {post.excerpt && (
                            <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-gray-400 text-xs mt-auto pt-3 border-t border-gray-50">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.created_at)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3" />
                              {getReadingTime(post.content)}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}

            {/* Single post case - no featured/rest split */}
            {posts.length === 1 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => {
                  const colors = getCardColor(i);
                  return (
                    <Link
                      key={post.id}
                      href={`/${post.slug}`}
                      className="group flex flex-col rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
                    >
                      <div className={`${colors.bg} p-6 sm:p-8 min-h-[180px] flex flex-col justify-between relative overflow-hidden`}>
                        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5" />
                        {post.category && (
                          <span className="relative z-10 inline-block self-start px-2.5 py-1 bg-white/15 text-white/90 text-[10px] font-semibold tracking-wider uppercase rounded-full">
                            {post.category}
                          </span>
                        )}
                        <h3 className="relative z-10 font-serif text-lg text-white leading-snug line-clamp-3 group-hover:text-white/90 transition-colors">
                          {post.title}
                        </h3>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        {post.excerpt && (
                          <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-gray-400 text-xs mt-auto pt-3 border-t border-gray-50">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.created_at)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {getReadingTime(post.content)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
