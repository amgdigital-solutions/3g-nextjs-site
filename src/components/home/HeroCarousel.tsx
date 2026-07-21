"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft, ChevronRight, Search, MapPin,
  ChevronDown, SlidersHorizontal
} from "lucide-react";
import type { Property, Community } from "@/types";

interface HeroCarouselProps {
  properties: Property[];
  communities?: Community[];
}

const PRICE_RANGES = [
  { label: "Any Price", min: "", max: "" },
  { label: "Up to 1M", min: "0", max: "1000000" },
  { label: "1M - 2M", min: "1000000", max: "2000000" },
  { label: "2M - 5M", min: "2000000", max: "5000000" },
  { label: "5M+", min: "5000000", max: "" },
];

const BEDROOMS = [
  { label: "Any", value: "" },
  { label: "Studio", value: "Studio" },
  { label: "1 Bed", value: "1" },
  { label: "2 Beds", value: "2" },
  { label: "3 Beds", value: "3" },
  { label: "4+", value: "4" },
];

export function HeroCarousel({ properties, communities = [] }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = properties.length > 0 ? properties : [];
  const currentProperty = slides[current];

  // Extract unique developers from properties
  const developers = useMemo(() => {
    const devSet = new Set<string>();
    properties.forEach(p => {
      if (p.developer_name) devSet.add(p.developer_name);
    });
    return Array.from(devSet).sort();
  }, [properties]);

  // Extract community names
  const communityNames = communities.length > 0
    ? communities.map(c => c.name).filter((n): n is string => Boolean(n))
    : [];

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.max(slides.length, 1));
    }, 5000);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length > 1) startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [slides.length, startAutoPlay]);

  const goTo = (index: number) => {
    setCurrent(index);
    startAutoPlay();
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  if (!currentProperty) {
    return (
      <section className="relative h-screen w-full bg-navy-900">
        <div className="absolute inset-0 overflow-hidden bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-transparent" />
        <div className="relative z-10 flex items-center h-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-[72px]">
          <div className="max-w-2xl">
            <span className="label-gold mb-6 block">Dubai Real Estate</span>
            <h1 className="heading-lg text-white mb-6">Invest in Dubai&apos;s <span className="text-gold">Future</span></h1>
            <p className="text-white/70 text-lg mb-8">Discover premium off-plan properties with high ROI potential.</p>
          </div>
        </div>
        <SearchBar developers={developers} communityNames={communityNames} />
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full bg-navy-900">
      {/* Background Images */}
      {slides.map((p, i) => (
        <div
          key={p.id}
          className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={p.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"}
            alt={p.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/70 to-navy-900/40 z-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-navy-900/40 z-20" />

      {/* Content */}
      <div className="relative z-30 flex flex-col justify-center sm:justify-end h-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-[72px] pb-28 sm:pb-28 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 w-full">
          {/* Left: Property Info */}
          <div>
            <span className="label-gold mb-2 sm:mb-4 block text-xs sm:text-sm">Featured Project</span>
            <Link href={`/property/${currentProperty.slug}`} className="group">
              <h1 className="heading-lg text-white mb-2 sm:mb-4 text-2xl sm:text-4xl lg:text-5xl xl:text-6xl group-hover:text-gold transition-colors">{currentProperty.title}</h1>
            </Link>
            <p className="text-white/60 text-xs sm:text-base lg:text-lg mb-2 sm:mb-3 line-clamp-2 max-w-lg hidden sm:block">
              {currentProperty.short_description || currentProperty.description?.substring(0, 120) || `Luxury ${currentProperty.property_type?.toLowerCase()} in ${currentProperty.location}`}
            </p>
            <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
              <span className="font-serif text-lg sm:text-2xl text-gold">
                {currentProperty.price ? `AED ${(currentProperty.price / 1000000).toFixed(2)}M` : "Price on Request"}
              </span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-white/50 text-xs sm:text-sm hidden sm:inline">{currentProperty.location}</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-6">
              <Link
                href={`/property/${currentProperty.slug}`}
                className="inline-flex items-center gap-2 px-4 sm:px-8 py-2.5 sm:py-3.5 bg-gold text-navy-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors text-xs sm:text-base"
              >
                View Property
              </Link>
              <a
                href="tel:+971563867270"
                className="inline-flex items-center gap-2 px-4 sm:px-8 py-2.5 sm:py-3.5 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-xs sm:text-base"
              >
                Book Consultation
              </a>
            </div>

            {/* Dot indicators + Arrows */}
            <div className="flex items-center gap-2 sm:gap-4">
              {slides.length > 1 && (
                <button
                  onClick={prev}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors flex-shrink-0"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      i === current ? "w-6 sm:w-8 bg-gold" : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              {slides.length > 1 && (
                <button
                  onClick={next}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors flex-shrink-0"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar - Bottom Center */}
      <SearchBar developers={developers} communityNames={communityNames} />
    </section>
  );
}

// ─── Sleek Horizontal Search Bar ───

function SearchBar({
  developers,
  communityNames,
}: {
  developers: string[];
  communityNames: string[];
}) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [selectedDeveloper, setSelectedDeveloper] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedBeds, setSelectedBeds] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const doSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("keyword", location);
    if (selectedDeveloper) params.set("developer", selectedDeveloper);
    if (selectedPrice) {
      const priceRange = PRICE_RANGES.find(p => p.label === selectedPrice);
      if (priceRange) {
        if (priceRange.min) params.set("min_price", priceRange.min);
        if (priceRange.max) params.set("max_price", priceRange.max);
      }
    }
    if (selectedBeds) params.set("beds", selectedBeds);
    const url = params.toString() ? `/properties?${params.toString()}` : "/properties";
    router.push(url);
  };

  const goToProperties = () => {
    router.push("/properties");
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeDropdown = () => setOpenDropdown(null);

  // Shared dropdown component
  const FilterDropdown = ({
    label,
    value,
    options,
    onSelect,
    name,
    hasOptions,
  }: {
    label: string;
    value: string;
    options: string[];
    onSelect: (val: string) => void;
    name: string;
    hasOptions: boolean;
  }) => {
    if (!hasOptions) return null;
    const isOpen = openDropdown === name;

    return (
      <div className="relative flex-shrink-0">
        <button
          onClick={() => toggleDropdown(name)}
          className="flex items-center gap-1.5 px-3 py-2 text-white/70 hover:text-white transition-colors text-sm whitespace-nowrap"
        >
          <span className="text-[10px] text-white/40 uppercase tracking-wider block leading-tight">{label}</span>
          <span className="text-white text-sm font-medium">{value || (name === "developer" ? "All" : name === "price" ? "Any" : "Any")}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={closeDropdown} />
            {/* Dropdown opens below the button */}
            <div className="absolute top-full left-0 mt-1 bg-navy-800 border border-white/10 rounded-lg overflow-hidden shadow-2xl z-50 min-w-[180px] py-1">
              <button
                onClick={() => { onSelect(""); closeDropdown(); }}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-white/10 transition-colors ${!value ? "text-gold" : "text-white"}`}
              >
                {name === "developer" ? "All Developers" : name === "price" ? "Any Price" : "Any"}
              </button>
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onSelect(opt); closeDropdown(); }}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-white/10 transition-colors ${value === opt ? "text-gold" : "text-white"}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 flex justify-center px-4 sm:px-6 lg:px-12 xl:px-20 pb-4 sm:pb-6">
      <div className="w-full lg:max-w-[70%] min-w-0">
        {/* === MOBILE: Simple Search Bar === */}
        <div className="flex lg:hidden items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3">
          <Search className="w-5 h-5 text-white/40 flex-shrink-0" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search properties, areas..."
            className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm"
            onKeyDown={(e) => { if (e.key === "Enter") doSearch(); }}
          />
          <button
            onClick={doSearch}
            className="flex items-center justify-center w-10 h-10 bg-gold text-navy-900 rounded-xl hover:bg-amber-500 transition-colors flex-shrink-0"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* === DESKTOP: Full Filter Bar with Dropdowns === */}
        <div className="hidden lg:flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl divide-x divide-white/10 overflow-visible">
          {/* Location Input */}
          <div className="flex-1 min-w-0 flex items-center gap-2 px-4 py-3">
            <MapPin className="w-4 h-4 text-white/40 flex-shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location..."
              className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm min-w-0"
              onKeyDown={(e) => { if (e.key === "Enter") doSearch(); }}
            />
          </div>

          {/* Developer Dropdown */}
          {developers.length > 0 && (
            <FilterDropdown
              label="Developer"
              value={selectedDeveloper}
              options={developers}
              onSelect={setSelectedDeveloper}
              name="developer"
              hasOptions={true}
            />
          )}

          {/* Price Range Dropdown */}
          <FilterDropdown
            label="Price Range"
            value={selectedPrice}
            options={PRICE_RANGES.map(p => p.label)}
            onSelect={setSelectedPrice}
            name="price"
            hasOptions={true}
          />

          {/* Beds Dropdown */}
          <FilterDropdown
            label="Beds"
            value={selectedBeds}
            options={BEDROOMS.map(b => b.label)}
            onSelect={setSelectedBeds}
            name="beds"
            hasOptions={true}
          />

          {/* Search Button */}
          <button
            onClick={doSearch}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-gold text-navy-900 font-semibold hover:bg-amber-500 transition-colors text-sm flex-shrink-0"
          >
            <Search className="w-4 h-4" />
            Search
          </button>

          {/* More Filters */}
          <button
            onClick={goToProperties}
            className="flex items-center justify-center gap-1.5 px-3 py-3 text-white/50 hover:text-white transition-colors text-xs flex-shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>More</span>
          </button>
        </div>

        {/* Helper text */}
        <p className="text-white/30 text-xs mt-2 text-center hidden lg:block">
          Downtown Dubai, Dubai Marina, Palm Jumeirah...
        </p>
      </div>
    </div>
  );
}
