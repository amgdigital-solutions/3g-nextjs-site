"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X, Bed, Bath, DollarSign, MapPin, Home, Building2 } from "lucide-react";

interface Filters {
  keyword: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  location: string;
  propertyType: string;
  developer: string;
}

interface PropertyFiltersProps {
  onFilter: (filters: Filters) => void;
  locations: string[];
  totalCount: number;
  filteredCount: number;
  initialKeyword?: string;
}

const priceRanges = [
  { label: "AED 500K", value: "500000" },
  { label: "AED 1M", value: "1000000" },
  { label: "AED 2M", value: "2000000" },
  { label: "AED 3M", value: "3000000" },
  { label: "AED 5M", value: "5000000" },
  { label: "AED 10M", value: "10000000" },
];

const bedroomOptions = ["Any", "Studio", "1", "2", "3", "4", "5+"];
const bathroomOptions = ["Any", "1", "2", "3", "4+"];
const propertyTypes = ["All", "Apartment", "Villa", "Townhouse", "Penthouse"];
const developers = ["All", "Emaar", "Damac", "Nakheel", "Meraas", "Sobha", "Ellington", "Omniyat", "Azizi", "Danube"];

export function PropertyFilters({ onFilter, locations, totalCount, filteredCount, initialKeyword = "" }: PropertyFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    keyword: initialKeyword,
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    propertyType: "",
    developer: "",
  });

  // Update keyword when initialKeyword changes (from URL)
  useEffect(() => {
    if (initialKeyword) {
      const newFilters = { ...filters, keyword: initialKeyword };
      setFilters(newFilters);
      onFilter(newFilters);
    }
  }, [initialKeyword]);

  const updateFilter = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const empty = { keyword: "", minPrice: "", maxPrice: "", bedrooms: "", bathrooms: "", location: "", propertyType: "", developer: "" };
    setFilters(empty);
    onFilter(empty);
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== "");

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Keyword Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={filters.keyword}
              onChange={(e) => updateFilter("keyword", e.target.value)}
              placeholder="Search by property name, developer, or keyword..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-navy-800 focus:bg-white transition-colors"
            />
          </div>

          {/* Location Dropdown */}
          <div className="relative sm:w-48">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
              className="w-full pl-9 pr-8 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-navy-800 appearance-none cursor-pointer"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Developer Dropdown */}
          <div className="relative sm:w-40">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filters.developer}
              onChange={(e) => updateFilter("developer", e.target.value)}
              className="w-full pl-9 pr-8 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-navy-800 appearance-none cursor-pointer"
            >
              {developers.map((dev) => (
                <option key={dev} value={dev === "All" ? "" : dev}>{dev}</option>
              ))}
            </select>
          </div>

          {/* Toggle Advanced */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-colors ${
              showAdvanced || hasActiveFilters
                ? "bg-navy-800 text-white"
                : "bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && <span className="w-5 h-5 bg-gold text-navy-900 text-xs rounded-full flex items-center justify-center font-bold">{Object.values(filters).filter(v => v !== "").length}</span>}
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
            {/* Property Type */}
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Home className="w-3.5 h-3.5" /> Property Type
              </label>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateFilter("propertyType", type === "All" ? "" : type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      (filters.propertyType === type) || (type === "All" && !filters.propertyType)
                        ? "bg-navy-800 text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5" /> Bedrooms
                </label>
                <div className="flex flex-wrap gap-2">
                  {bedroomOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => updateFilter("bedrooms", opt === "Any" ? "" : opt)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        (filters.bedrooms === opt) || (opt === "Any" && !filters.bedrooms)
                          ? "bg-navy-800 text-white"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5" /> Bathrooms
                </label>
                <div className="flex flex-wrap gap-2">
                  {bathroomOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => updateFilter("bathrooms", opt === "Any" ? "" : opt)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        (filters.bathrooms === opt) || (opt === "Any" && !filters.bathrooms)
                          ? "bg-navy-800 text-white"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> Price Range
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-xs text-gray-400 mb-1 block">Min Price</span>
                  <select
                    value={filters.minPrice}
                    onChange={(e) => updateFilter("minPrice", e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-navy-800"
                  >
                    <option value="">No Min</option>
                    {priceRanges.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="text-xs text-gray-400 mb-1 block">Max Price</span>
                  <select
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter("maxPrice", e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:border-navy-800"
                  >
                    <option value="">No Max</option>
                    {priceRanges.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Clear */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" /> Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-navy-950">{filteredCount}</span> of <span className="font-semibold text-navy-950">{totalCount}</span> properties
        </p>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-sm text-navy-800 hover:text-gold font-medium">
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
