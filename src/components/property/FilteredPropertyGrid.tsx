"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "./PropertyCard";
import { PropertyFilters } from "./PropertyFilters";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
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

const PER_PAGE_OPTIONS = [12, 24, 48];

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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [perPageOpen, setPerPageOpen] = useState(false);

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      keyword: urlKeyword,
      developer: urlDeveloper,
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
      bedrooms: urlBeds,
    }));
    setCurrentPage(1); // Reset to page 1 on URL filter change
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

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, filtered.length);
  const paginated = filtered.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

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

      {/* Results bar: count + per page selector */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-700">{startIndex + 1}–{endIndex}</span> of <span className="font-medium text-gray-700">{filtered.length}</span> properties
            {filtered.length !== properties.length && (
              <span className="text-gray-400"> (filtered from {properties.length})</span>
            )}
          </p>

          {/* Per page selector */}
          <div className="relative">
            <button
              onClick={() => setPerPageOpen(!perPageOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:border-[#C9A84C] transition-colors bg-white"
            >
              <span className="text-gray-500">Per page:</span>
              <span className="font-medium text-[#1E3A5F]">{perPage}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${perPageOpen ? "rotate-180" : ""}`} />
            </button>
            {perPageOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setPerPageOpen(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 min-w-[100px]">
                  {PER_PAGE_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setPerPage(opt); setPerPageOpen(false); setCurrentPage(1); }}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors ${perPage === opt ? "text-[#C9A84C] font-semibold bg-[#C9A84C]/5" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-400 text-lg mb-2">No properties match your filters</p>
          <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {paginated.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-white text-[#1E3A5F]"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>

              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, idx) =>
                  typeof page === "string" ? (
                    <span key={`dots-${idx}`} className="px-2 text-gray-400 text-sm">...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-9 h-9 text-sm rounded-lg transition-colors ${currentPage === page ? "bg-[#1E3A5F] text-white font-medium" : "bg-white border border-gray-200 text-gray-600 hover:border-[#C9A84C] hover:text-[#C9A84C]"}`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-white text-[#1E3A5F]"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
