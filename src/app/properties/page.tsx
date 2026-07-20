import { Suspense } from "react";
import { getAllProperties } from "@/lib/supabase/server";
import { FilteredPropertyGrid } from "@/components/property/FilteredPropertyGrid";
import { PropertyGridSkeleton } from "@/components/shared/Skeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties for Sale in Dubai | Off-Plan & Ready",
  description:
    "Browse premium properties for sale in Dubai. Off-plan apartments, villas, and penthouses from top developers. Filter by price, location, bedrooms, and more.",
  openGraph: {
    title: "Properties for Sale in Dubai | 3G Real Estate",
    description: "Browse premium properties for sale in Dubai. Off-plan and ready properties.",
  },
};

export const revalidate = 60;

export default async function PropertiesPage() {
  const properties = await getAllProperties();

  return (
    <div className="min-h-screen bg-gray-50 pt-[72px]">
      {/* Header */}
      <div className="bg-white pt-8 pb-6 border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <span className="label-gold mb-1 block">Property Listings</span>
          <h1 className="heading-lg text-navy-950 text-2xl sm:text-3xl lg:text-4xl">Dubai Off-Plan Properties</h1>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6">
        <Suspense fallback={<PropertyGridSkeleton count={6} />}>
          <FilteredPropertyGrid properties={properties} />
        </Suspense>
      </div>
    </div>
  );
}
