"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "./PropertyCard";
import { PropertyFilters } from "./PropertyFilters";
import { PropertyGridSkeleton } from "../shared/Skeleton";
import type { Property } from "@/types";

interface FilterState {
  keyword: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  location: string;
  propertyType: string;
  developer: string;
}

interface Props {
  properties: Property[];
}

function matchesFilters(property: Property, filters: FilterState, keywordFromUrl: string): boolean {
  // Combine typed keyword + URL keyword
  const kw = (filters.keyword || keywordFromUrl).toLowerCase();
  if (kw) {
    const searchable = `${property.title} ${property.description || ""} ${property.location || ""} ${property.property_type || ""}`.toLowerCase();
    if (!searchable.includes(kw)) return false;
  }

  if (filters.location && property.location !== filters.location) return false;

  if (filters.propertyType && property.property_type !== filters.propertyType) return false;

  if (filters.minPrice && property.price && property.price < Number(filters.minPrice)) return false;
  if (filters.maxPrice && property.price && property.price > Number(filters.maxPrice)) return false;

  if (filters.developer) {
    const dev = property.developer_name || "";
    if (!dev.toLowerCase().includes(filters.developer.toLowerCase())) return false;
  }

  if (filters.bedrooms) {
    const beds = property.bedrooms || 0;
    if (filters.bedrooms === "Studio") { if (beds !== 0) return false; }
    else if (filters.bedrooms === "4" || filters.bedrooms === "4+") { if (beds < 4) return false; }
    else if (beds !== Number(filters.bedrooms)) return false;
  }

  if (filters.bathrooms) {
    const baths = property.bathrooms || 0;
    if (filters.bathrooms === "4+") { if (baths < 4) return false; }
    else if (baths !== Number(filters.bathrooms)) return false;
  }

  return true;
}

export function FilteredPropertyGrid({ properties }: Props) {
  const searchParams = useSearchParams();

  // Read URL params from hero search
  const keywordFromUrl = searchParams.get("keyword") || "";
  const developerFromUrl = searchParams.get("developer") || "";
  const minPriceFromUrl = searchParams.get("min_price") || "";
  const maxPriceFromUrl = searchParams.get("max_price") || "";
  const bedsFromUrl = searchParams.get("beds") || "";

  const [filters, setFilters] = useState<FilterState>({
    keyword: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    propertyType: "",
    developer: "",
  });

  // Sync URL params into filters on mount
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      keyword: keywordFromUrl,
      developer: developerFromUrl,
      minPrice: minPriceFromUrl,
      maxPrice: maxPriceFromUrl,
      bedrooms: bedsFromUrl,
    }));
  }, [keywordFromUrl, developerFromUrl, minPriceFromUrl, maxPriceFromUrl, bedsFromUrl]);

  // Extract unique locations from properties
  const locations = useMemo(() =>
    [...new Set(properties.map(p => p.location).filter((l): l is string => Boolean(l)))].sort(),
    [properties]
  );

  // FIX: Extract unique developers from properties (dynamic)
  const developers = useMemo(() =>
    [...new Set(properties.map(p => p.developer_name).filter((d): d is string => Boolean(d)))].sort(),
    [properties]
  );

  const filtered = useMemo(() =>
    properties.filter(p => matchesFilters(p, filters, "")),
    [properties, filters]
  );

  const handleFilter = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <PropertyFilters
        onFilter={handleFilter}
        locations={locations}
        developers={developers}
        totalCount={properties.length}
        filteredCount={filtered.length}
        initialKeyword={keywordFromUrl}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-400 text-lg mb-2">No properties match your filters</p>
          <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
