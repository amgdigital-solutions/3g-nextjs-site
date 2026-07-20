import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { getAllCommunities } from "@/lib/supabase/server";
import Image from "next/image";

export async function CommunityGrid() {
  const communities = await getAllCommunities();

  if (communities.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="label-gold mb-2 block">Communities</span>
            <h2 className="heading-md text-navy-950">Explore Dubai&apos;s Best Communities</h2>
            <p className="text-gray-500 mt-2">Find your perfect neighborhood</p>
          </div>
          <Link
            href="/communities"
            className="hidden sm:flex items-center gap-2 text-navy-800 hover:text-gold font-medium text-sm transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {communities.slice(0, 8).map((community) => (
            <Link
              key={community.id}
              href={`/community/${community.slug}`}
              className="group relative h-64 rounded-xl overflow-hidden"
            >
              <Image
                src={community.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80"}
                alt={community.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-serif text-lg text-white mb-1">{community.name}</h3>
                <div className="flex items-center gap-1 text-white/60 text-xs">
                  <MapPin className="w-3 h-3" />
                  {community.location || "Dubai"}
                </div>
                {community.avg_price && (
                  <p className="text-gold text-xs mt-1">{community.avg_price}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
