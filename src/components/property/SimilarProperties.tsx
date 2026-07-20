"use client";

import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Square, MapPin, ArrowRight } from "lucide-react";
import type { Property } from "@/types";
import { formatPrice } from "@/lib/utils";

interface SimilarPropertiesProps {
  currentProperty: Property;
  allProperties: Property[];
}

export function SimilarProperties({ currentProperty, allProperties }: SimilarPropertiesProps) {
  // Filter similar properties (same location or same developer, excluding current)
  const similar = allProperties
    .filter(
      (p) =>
        p.id !== currentProperty.id &&
        p.status === "published" &&
        (p.location === currentProperty.location ||
          p.developer_name === currentProperty.developer_name)
    )
    .slice(0, 4);

  if (similar.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl text-navy-950">Similar Properties</h2>
        <Link
          href="/properties"
          className="text-sm text-navy-800 hover:text-gold flex items-center gap-1 transition-colors"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {similar.map((property) => (
          <Link
            key={property.id}
            href={`/property/${property.slug}`}
            className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-gray-200"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={property.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Badge */}
              {property.featured && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-gold text-navy-900 text-[10px] font-semibold rounded-md">
                  Featured
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                <MapPin className="w-3 h-3" />
                {property.location || "Dubai"}
              </div>
              <h3 className="font-medium text-navy-950 text-sm mb-2 line-clamp-1 group-hover:text-navy-700 transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                {property.bedrooms !== null && (
                  <span className="flex items-center gap-1">
                    <Bed className="w-3 h-3" />
                    {property.bedrooms}
                  </span>
                )}
                {property.bathrooms !== null && (
                  <span className="flex items-center gap-1">
                    <Bath className="w-3 h-3" />
                    {property.bathrooms}
                  </span>
                )}
                {property.area_sqft && (
                  <span className="flex items-center gap-1">
                    <Square className="w-3 h-3" />
                    {property.area_sqft} sqft
                  </span>
                )}
              </div>
              <div className="font-serif text-navy-950 font-semibold">
                {property.price ? formatPrice(property.price) : "Price on Request"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
