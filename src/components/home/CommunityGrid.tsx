"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import type { Community } from "@/types";

interface CommunityGridProps {
  communities: Community[];
}

function getFirstImage(image: string | string[] | null): string {
  if (!image) return "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80";
  if (Array.isArray(image)) return image[0] || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80";
  return image;
}

export function CommunityGrid({ communities }: CommunityGridProps) {
  if (communities.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="label-gold mb-2 block">Areas</span>
            <h2 className="heading-md text-navy-950">Popular Communities</h2>
          </div>
          <Link href="/communities" className="hidden sm:flex items-center gap-2 text-navy-800 hover:text-gold transition-colors text-sm font-medium">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {communities.slice(0, 8).map((community) => (
            <Link
              key={community.id}
              href={`/community/${community.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
            >
              <Image
                src={getFirstImage(community.image)}
                alt={community.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-sm sm:text-base">{community.name}</h3>
                {community.location && (
                  <div className="flex items-center gap-1 text-white/60 text-xs mt-1">
                    <MapPin className="w-3 h-3" />
                    {community.location}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/communities" className="inline-flex items-center gap-2 text-navy-800 hover:text-gold transition-colors text-sm font-medium">
            View All Communities <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
