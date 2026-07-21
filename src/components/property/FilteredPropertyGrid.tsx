"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "./PropertyCard";
import { PropertyFilters } from "./PropertyFilters";
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

// ROBUST: bedroom matching that handles numbers, strings, ranges, null
function bedroomMatch(propBeds: unknown, filterVal: string): boolean {
  if (!filterVal) return true; // no filter = match all
  if (!propBeds) return false; // property has no beds data = no match

  const filterNum = Number(filterVal);
  if (isNaN(filterNum) && filterVal !== "Studio") return true; // invalid filter

  const propStr = String(propBeds).trim();
  if (!propStr) return false;

  // Range like "1-5" or "Studio-3"
  if (propStr.includes("-")) {
    const parts = propStr.split("-");
    const min = parts[0].toLowerCase() === "studio" ? 0 : Number(parts[0]);
    const max = parts[1].toLowerCase() === "studio" ? 0 : Number(parts[1]);
    if (!isNaN(min) && !isNaN(max)) {
      if (filterVal === "Studio") return min === 0;
      if (filterVal === "4" || filterVal === "4+") return max >= 4;
      return filterNum >= min && filterNum <= max;
    }
  }

  // Single value like "3" or "Studio"
  const propNum = propStr.toLowerCase() === "studio" ? 0 : Number(propBeds);
  if (filterVal === "Studio") return propNum === 0;
  if (filterVal === "4" || filterVal === "4+") return propNum >= 4;
  return propNum === filterNum;
}

function matchProperty(property: Property, filters: FilterState): boolean {
  // Keyword
  if (filters.keyword) {
    const kw = filters.keyword.toLowerCase();
    const text = `${property.title || ""} ${property.description || ""} ${property.location || ""} ${property.developer_name || ""}`.toLowerCase();
    if (!text.includes(kw)) return false;
  }

  // Location
  if (filters.location && property.location !== filters.location) return false;

  // Property Type
  if (filters.propertyType && property.property_type !== filters.propertyType) return false;

  // Developer
  if (filters.developer) {
    const dev = property.developer_name || "";
    if (!dev.toLowerCase().includes(filters.developer.toLowerCase())) return false;
  }

  // Price
  if (filters.minPrice && property.price && property.price < Number(filters.minPrice)) return false;
  if (filters.maxPrice && property.price && property.price > Number(filters.maxPrice)) return false;

  // Bedrooms - use robust matcher
  if (filters.bedrooms) {
    if (!bedroomMatch(property.bedrooms, filters.bedrooms)) return false;
  }

  // Bathrooms
  if (filters.bathrooms) {
    const baths = Number(property.bathrooms) || 0;
    if (filters.bathrooms === "4+") { if (baths < 4) return false; }
    else if (String(baths) !== filters.bathrooms) return false;
  }

  return true;
}

export function FilteredPropertyGrid({ properties }: Props) {
  const searchParams = useSearchParams();

  const urlKeyword = searchParams.get("keyword") || "";
  const urlDeveloper = searchParams.get("developer") || "";
  const urlMinPrice = searchParams.get("min_price") || "";
  const urlMaxPrice = searchParams.get("max_price") || "";
  const urlBeds = searchParams.get("beds") || "";

  const [filters, setFilters] = useState<FilterState>({
    keyword: urlKeyword,
    minPrice: urlMinPrice,
    maxPrice: urlMaxPrice,
    bedrooms: urlBeds,
    bathrooms: "",
    location: "",
    propertyType: "",
    developer: urlDeveloper,
  });

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      keyword: urlKeyword,
      developer: urlDeveloper,
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
      bedrooms: urlBeds,
    }));
  }, [urlKeyword, urlDeveloper, urlMinPrice, urlMaxPrice, urlBeds]);

  const locations = useMemo(() =>
    [...new Set(properties.map(p => p.location).filter((l): l is string => Boolean(l)))].sort(),
    [properties]
  );

  const developers = useMemo(() =>
    [...new Set(properties.map(p => p.developer_name).filter((d): d is string => Boolean(d)))].sort(),
    [properties]
  );

  const filtered = useMemo(() =>
    properties.filter(p => matchProperty(p, filters)),
    [properties, filters]
  );

  return (
    <div className="space-y-6">
      <PropertyFilters
        onFilter={setFilters}
        locations={locations}
        developers={developers}
        totalCount={properties.length}
        filteredCount={filtered.length}
        initialKeyword={urlKeyword}
      />
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-400 text-lg mb-2">No properties match your filters</p>
          <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      )}
    </div>
  );
}
