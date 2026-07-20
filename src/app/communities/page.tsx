import Link from "next/link";
import Image from "next/image";
import { getAllCommunities } from "@/lib/supabase/server";
import { CommunitySearch } from "@/components/community/CommunitySearch";
import { MapPin, ArrowRight, Building2, TrendingUp, Phone, MessageCircle, Search, Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Communities in Dubai | Top Residential Areas",
  description:
    "Discover Dubai's most sought-after residential communities. From Downtown Dubai to Palm Jumeirah, find the perfect neighborhood for your investment.",
};

export const revalidate = 300;

export default async function CommunitiesPage() {
  const communities = await getAllCommunities();

  const highlights = [
    { icon: Home, value: "25+", label: "Communities Covered" },
    { icon: TrendingUp, value: "8-12%", label: "Average ROI" },
    { icon: Building2, value: "1000+", label: "Active Listings" },
  ];

  const popularAreas = [
    { name: "Downtown Dubai", tag: "Premium" },
    { name: "Dubai Marina", tag: "Waterfront" },
    { name: "Palm Jumeirah", tag: "Luxury" },
    { name: "Business Bay", tag: "Commercial" },
    { name: "Dubai Hills", tag: "Family" },
    { name: "JVC", tag: "Value" },
  ];

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Hero */}
      <div className="bg-navy-900 py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-gold" />
              <span className="label-gold">Explore</span>
            </div>
            <h1 className="heading-lg text-white mb-4">
              Dubai <span className="text-gold">Communities</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mb-8">
              Discover Dubai&apos;s most sought-after residential areas. Each community offers unique investment opportunities, lifestyles, and returns.
            </p>

            {/* Search Bar */}
            <CommunitySearch communities={communities} />

            {/* Highlights */}
            <div className="flex flex-wrap gap-6 mt-8">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <h.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{h.value}</div>
                    <div className="text-white/40 text-xs">{h.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-navy-800">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-5">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3">
            <span className="text-white/40 text-xs mr-2">Popular:</span>
            {popularAreas.map((a) => (
              <Link
                key={a.name}
                href={`/properties?location=${encodeURIComponent(a.name)}`}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 text-xs hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1"
              >
                {a.name}
                <span className="text-gold/60 text-[10px]">{a.tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Community Grid */}
      <section className="py-12 lg:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="label-gold mb-2 block">All Communities</span>
                <h2 className="heading-md text-navy-950">
                  Explore <span className="text-gold">{communities.length}</span> Communities
                </h2>
              </div>
            </div>

            {communities.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No communities found. Check back soon!</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {communities.map((c) => (
                  <Link
                    key={c.id}
                    href={`/community/${c.slug}`}
                    className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={c.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"}
                        alt={c.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-serif text-lg text-white mb-1">{c.name}</h3>
                        <div className="flex items-center gap-1 text-white/70 text-xs">
                          <MapPin className="w-3 h-3" />
                          {c.location || "Dubai"}
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      {c.short_description && (
                        <p className="text-gray-500 text-sm line-clamp-2 mb-3">{c.short_description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        {c.avg_price && (
                          <span className="text-navy-800 text-xs font-medium bg-gray-50 px-2.5 py-1 rounded">{c.avg_price}</span>
                        )}
                        <span className="text-gold text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Explore <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                      {c.property_types && c.property_types.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {c.property_types.slice(0, 3).map((t) => (
                            <span key={t} className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Dubai Communities */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="label-gold mb-3 block">Investment Guide</span>
              <h2 className="heading-md text-navy-950">Why Dubai Communities?</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: "High Rental Yields", desc: "Dubai communities offer 8-12% rental yields — among the highest globally for major cities." },
                { title: "Tax-Free Income", desc: "Zero property tax, zero capital gains tax, and zero income tax on rental earnings." },
                { title: "World-Class Infrastructure", desc: "Every community features schools, hospitals, malls, and recreational facilities." },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-6 border border-gray-100 text-center">
                  <h3 className="font-semibold text-navy-950 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto bg-navy-950 rounded-2xl p-10 text-center text-white">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">
              Can&apos;t Find Your Community?
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              We cover 50+ communities in Dubai. Contact us for personalized recommendations based on your budget and investment goals.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+971563867270" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a href="https://wa.me/971563867270" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
