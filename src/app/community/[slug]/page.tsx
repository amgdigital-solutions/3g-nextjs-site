import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCommunityBySlug, getAllCommunities } from "@/lib/supabase/server";
import { AmenityIcon } from "@/components/community/AmenityIcon";
import { MapPin, ArrowLeft, Phone, MessageCircle, Check, Building2, Tag, DollarSign, Calendar, Plane, Clock } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

function getFirstImage(image: string | string[] | null): string {
  if (!image) return "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80";
  if (Array.isArray(image)) return image[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80";
  return image;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const community = await getCommunityBySlug(slug);
  if (!community) return { title: "Community Not Found" };
  const img = getFirstImage(community.image);
  return {
    title: community.meta_title || `${community.name} | 3G Real Estate`,
    description: community.meta_description || community.short_description || `Explore ${community.name} in Dubai.`,
    openGraph: {
      title: community.meta_title || community.name,
      description: community.meta_description || community.short_description || undefined,
      images: img ? [{ url: img }] : [],
    },
  };
}

export const revalidate = 600;

export default async function CommunityDetailPage({ params }: Props) {
  const { slug } = await params;
  const community = await getCommunityBySlug(slug);
  if (!community) return notFound();

  const hasQuickFacts = community.avg_price || community.property_types?.length;
  const heroImage = getFirstImage(community.image);

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Hero Image */}
      <div className="relative h-[350px] lg:h-[450px]">
        <Image src={heroImage} alt={community.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
            <Link href="/communities" className="inline-flex items-center gap-2 text-white/70 text-sm mb-3 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Communities
            </Link>
            <h1 className="heading-lg text-white">{community.name}</h1>
            <div className="flex items-center gap-2 text-white/70 mt-2">
              <MapPin className="w-4 h-4" />
              {community.location || "Dubai"}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content + Sidebar */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Left Content */}
          <div>
            {community.description && (
              <div className="mb-10">
                <h2 className="font-serif text-2xl text-navy-950 mb-4">About {community.name}</h2>
                <div className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: community.description }} />
              </div>
            )}

            <div className="mb-10">
              <h2 className="font-serif text-2xl text-navy-950 mb-6">Key Information</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6">
                {community.avg_price && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1">
                      <DollarSign className="w-3.5 h-3.5" /> Price Range
                    </div>
                    <p className="font-semibold text-navy-950">{community.avg_price}</p>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1">
                    <MapPin className="w-3.5 h-3.5" /> Location
                  </div>
                  <p className="font-semibold text-navy-950">{community.location || "Dubai"}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1">
                    <Building2 className="w-3.5 h-3.5" /> Status
                  </div>
                  <p className="font-semibold text-navy-950 capitalize">{community.status || "Active"}</p>
                </div>
                {community.property_types && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1">
                      <Tag className="w-3.5 h-3.5" /> Property Types
                    </div>
                    <p className="font-semibold text-navy-950">{community.property_types.join(", ")}</p>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1">
                    <Calendar className="w-3.5 h-3.5" /> Added
                  </div>
                  <p className="font-semibold text-navy-950">
                    {new Date(community.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>

            {community.property_types && community.property_types.length > 0 && (
              <div className="mb-10">
                <h2 className="font-serif text-2xl text-navy-950 mb-4">Property Types</h2>
                <div className="flex flex-wrap gap-3">
                  {community.property_types.map((t) => (
                    <span key={t} className="px-5 py-2.5 bg-navy-800 text-white text-sm rounded-lg font-medium">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {community.amenities && community.amenities.length > 0 && (
              <div className="mb-10">
                <h2 className="font-serif text-2xl text-navy-950 mb-6">Amenities & Features</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {community.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <AmenityIcon name={a} />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-navy-900 rounded-xl p-6 text-white">
              <h3 className="font-serif text-lg mb-2">Interested in {community.name}?</h3>
              <p className="text-white/60 text-sm mb-5">Our experts can help you find the perfect property in this community.</p>
              <Link href="/properties" className="flex items-center justify-center gap-2 w-full py-3 bg-gold text-navy-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors mb-3">
                Browse Properties <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
              <a href="tel:+971563867270" className="flex items-center justify-center gap-2 w-full py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors text-sm">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>

            {hasQuickFacts && (
              <div className="bg-white border border-gray-100 rounded-xl p-6">
                <h3 className="font-semibold text-navy-950 mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  {community.avg_price && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg. Price Range</span>
                      <span className="font-medium text-navy-950">{community.avg_price}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Location</span>
                    <span className="font-medium text-navy-950">{community.location || "Dubai"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium text-navy-950 capitalize">{community.status || "Active"}</span>
                  </div>
                  {community.property_types && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Property Types</span>
                      <span className="font-medium text-navy-950">{community.property_types.join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h3 className="font-semibold text-navy-950 mb-1">Need Help With {community.name}?</h3>
              <p className="text-gray-500 text-sm mb-4">Our experts know {community.name} inside out and can find you the best deals.</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-navy-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-sm">3G</span>
                </div>
                <div>
                  <div className="font-medium text-navy-950 text-sm">3G Expert Team</div>
                  <div className="text-gray-400 text-xs">Community Specialist</div>
                </div>
              </div>
              <a href="tel:+971563867270" className="flex items-center justify-center gap-2 w-full py-3 bg-navy-800 text-white rounded-lg hover:bg-navy-700 transition-colors mb-3 text-sm font-medium">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a href="https://wa.me/971563867270" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
