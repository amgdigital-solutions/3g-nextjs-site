import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { CompareButton } from "./CompareButton";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types";

export function PropertyCard({ property }: { property: Property }) {
  const image = property.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80";

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/property/${property.slug}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={image}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 text-navy-800 text-[10px] font-semibold rounded uppercase">
            {property.property_type || "Off-Plan"}
          </span>
          {property.featured && (
            <span className="absolute top-3 left-20 px-2.5 py-1 bg-gold text-navy-900 text-[10px] font-semibold rounded">
              Featured
            </span>
          )}
          {/* Compare button - positioned top right */}
          <div className="absolute top-3 right-3">
            <CompareButton property={property} variant="card" />
          </div>
          <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 rounded-lg">
            <span className="font-serif text-sm text-navy-900">
              {property.price ? formatPrice(property.price) : "Price on Request"}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-serif text-base text-navy-950 mb-1.5 group-hover:text-navy-700 transition-colors line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-gray-400 mb-3">
            <MapPin className="w-3 h-3" />
            <span className="text-xs">{property.location || "Dubai"}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{property.bedrooms ? `${property.bedrooms} Beds` : "Studio"}</span>
            <span>{property.area_sqft ? `${property.area_sqft} sqft` : ""}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
