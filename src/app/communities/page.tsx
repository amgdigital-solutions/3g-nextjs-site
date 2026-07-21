import { getAllCommunities } from "@/lib/supabase/server";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Home, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Communities | 3G Real Estate",
  description: "Explore Dubai's finest communities and neighbourhoods. Find the perfect area for your next property investment.",
};

export const revalidate = 300;

export default async function CommunitiesPage() {
  const communities = await getAllCommunities();

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Hero */}
      <div className="relative bg-navy-950 py-16 sm:py-20">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80" alt="Dubai communities" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/80 to-transparent" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <span className="label-gold mb-3 block">Neighbourhoods</span>
          <h1 className="heading-lg text-white text-3xl sm:text-4xl lg:text-5xl mb-4">
            Dubai Communities
          </h1>
          <p className="text-white/60 max-w-xl text-base sm:text-lg">
            Discover the finest communities and neighbourhoods for your property investment
          </p>
        </div>
      </div>

      {/* Communities Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 sm:py-16">
        {communities.length === 0 ? (
          <div className="text-center py-20">
            <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No communities listed yet</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((c) => (
              <Link
                key={c.id}
                href={`/community/${c.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={Array.isArray(c.image) ? c.image[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" : c.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"}
                    alt={c.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h2 className="font-serif text-xl text-white">{c.name}</h2>
                    {c.location && (
                      <div className="flex items-center gap-1 text-white/70 text-xs mt-1">
                        <MapPin className="w-3 h-3" />
                        {c.location}
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  {c.short_description && (
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">{c.short_description}</p>
                  )}
                  <div className="flex items-center justify-between text-xs">
                    {c.avg_price && (
                      <div className="flex items-center gap-1 text-navy-800">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span className="font-medium">{c.avg_price}</span>
                      </div>
                    )}
                    {c.property_types && c.property_types.length > 0 && (
                      <div className="text-gray-400">
                        {c.property_types.slice(0, 3).join(", ")}
                        {c.property_types.length > 3 && "+"}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
