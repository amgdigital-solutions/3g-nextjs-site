import Link from "next/link";
import Image from "next/image";
import { MapPin, TrendingUp } from "lucide-react";
import type { Community } from "@/types";

// Helper: get first image from image field or gallery fallback
function getFirstImage(image: string | string[] | null, gallery: string[] | null): string {
  if (image) {
    if (Array.isArray(image)) return image[0] || "";
    return image;
  }
  if (gallery && gallery.length > 0) return gallery[0];
  return "";
}

interface Props {
  communities: Community[];
}

export function AreaGuides({ communities }: Props) {
  const displayCommunities = communities?.length > 0 ? communities.slice(0, 6) : [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="label-gold mb-4 block">Investment Areas</span>
            <h2 className="heading-md text-navy-950 mb-4">
              Top Freehold Areas for <span className="text-gold">Foreign Investors</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Discover Dubai&apos;s best communities for property investment with high rental yields
            </p>
          </div>

          {displayCommunities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Communities coming soon</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCommunities.map((c) => (
                <Link
                  key={c.id}
                  href={`/community/${c.slug}`}
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={getFirstImage(c.image, c.gallery) || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"}
                      alt={c.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {c.avg_price && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 rounded-lg flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-600" />
                        <span className="text-xs font-semibold text-green-700">{c.avg_price}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <MapPin className="w-3 h-3" />
                      {c.location || "Dubai"}
                    </div>
                    <h3 className="font-serif text-lg text-navy-950 mb-1 group-hover:text-navy-700 transition-colors">
                      {c.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {c.short_description || `Explore properties in ${c.name}`}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
