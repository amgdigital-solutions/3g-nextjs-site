import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProperties } from "@/lib/supabase/server";
import { PropertyCard } from "@/components/property/PropertyCard";

export async function FeaturedProperties() {
  const properties = await getFeaturedProperties();
  if (properties.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="label-gold mb-2 block">Featured</span>
            <h2 className="heading-md text-navy-950">Featured Properties</h2>
            <p className="text-gray-500 mt-2">Curated selection of premium investment opportunities</p>
          </div>
          <Link
            href="/properties"
            className="hidden sm:flex items-center gap-2 text-navy-800 hover:text-gold font-medium text-sm transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
