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

// NEW: Use beds_min/max columns — simple, reliable number comparison
function bedroomMatch(property: Property, filterVal: string): boolean {
  if (!filterVal) return true;
  const filterNum = Number(filterVal);
  if (isNaN(filterNum)) return true;

  const min = property.beds_min;
  const max = property.beds_max;

  // If no min/max data, fall back to legacy bedrooms field
  if (min === null || max === null) {
    const legacy = String(property.bedrooms || "");
    if (!legacy) return false;
    if (legacy.includes("-")) {
      const parts = legacy.split("-");
      const lMin = parts[0].toLowerCase() === "studio" ? 0 : Number(parts[0]);
      const lMax = parts[1].toLowerCase() === "studio" ? 0 : Number(parts[1]);
      if (!isNaN(lMin) && !isNaN(lMax)) return filterNum >= lMin && filterNum <= lMax;
    }
    const lNum = legacy.toLowerCase() === "studio" ? 0 : Number(property.bedrooms);
    return filterNum === lNum;
  }

  // Clean min/max logic: filterNum must be within [min, max]
  return filterNum >= min && filterNum <= max;
}

function matchProperty(property: Property, filters: FilterState): boolean {
  if (filters.keyword) {
    const kw = filters.keyword.toLowerCase();
    const text = `${property.title || ""} ${property.description || ""} ${property.location || ""} ${property.developer_name || ""}`.toLowerCase();
    if (!text.includes(kw)) return false;
  }
  if (filters.location && property.location !== filters.location) return false;
  if (filters.propertyType && property.property_type !== filters.propertyType) return false;
  if (filters.developer) {
    const dev = property.developer_name || "";
    if (!dev.toLowerCase().includes(filters.developer.toLowerCase())) return false;
  }
  if (filters.minPrice && property.price && property.price < Number(filters.minPrice)) return false;
  if (filters.maxPrice && property.price && property.price > Number(filters.maxPrice)) return false;
  if (filters.bedrooms) {
    if (!bedroomMatch(property, filters.bedrooms)) return false;
  }
  if (filters.bathrooms) {
    const filterNum = Number(filters.bathrooms);
    if (!isNaN(filterNum)) {
      const min = property.baths_min;
      const max = property.baths_max;
      if (min !== null && max !== null) {
        if (!(filterNum >= min && filterNum <= max)) return false;
      } else {
        const legacy = Number(property.bathrooms);
        if (!isNaN(legacy) && legacy !== filterNum) return false;
      }
    }
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
