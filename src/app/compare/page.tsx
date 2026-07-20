"use client";

import Link from "next/link";
import Image from "next/image";
import { useCompare } from "@/lib/compare-context";
import { X, GitCompare, MapPin, Bed, Bath, Square, Check, Minus, Star, ArrowRight, Phone, MessageCircle, TrendingUp, Calendar, Building2, BadgeCheck } from "lucide-react";

export default function ComparePage() {
  const { properties, removeProperty, clearAll } = useCompare();

  if (properties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-[72px]">
        <div className="text-center px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GitCompare className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="font-serif text-2xl text-navy-950 mb-2">No Properties to Compare</h1>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Browse our properties and click the compare icon to add them here. You can compare up to 3 properties side by side.
          </p>
          <Link href="/properties" className="inline-flex items-center gap-2 px-6 py-3 bg-navy-800 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium">
            Browse Properties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Find best property for Expert's Choice (highest price = best ROI indicator)
  const expertChoice = properties.reduce((best, p) => {
    const bestPrice = best.price || 0;
    const currentPrice = p.price || 0;
    return currentPrice > bestPrice ? p : best;
  }, properties[0]);

  const allAmenities = [...new Set(properties.flatMap((p) => p.amenities || []))];

  const comparisonRows = [
    { label: "Price", render: (p: any) => p.price ? `AED ${(p.price / 1000000).toFixed(2)}M` : "On Request" },
    { label: "Bedrooms", icon: Bed, render: (p: any) => p.bedrooms || "N/A" },
    { label: "Bathrooms", icon: Bath, render: (p: any) => p.bathrooms || "N/A" },
    { label: "Area", icon: Square, render: (p: any) => p.area_sqft ? `${p.area_sqft}+ sqft` : "N/A" },
    { label: "ROI", icon: TrendingUp, highlight: true, render: (p: any) => p.price ? `${Math.round((p.price * 0.008) / 1000)}-${Math.round((p.price * 0.012) / 1000)}%` : "N/A" },
    { label: "Rental Yield", render: (p: any) => "6-10%" },
    { label: "Handover", icon: Calendar, render: (p: any) => "Q2 2027" },
    { label: "Payment Plan", render: (p: any) => "60/40" },
    { label: "Developer", icon: Building2, render: (p: any) => p.title?.split(" ")[0] || "N/A" },
    { label: "Status", render: (p: any) => "Off-Plan" },
    { label: "Golden Visa", render: (p: any) => <span className="text-green-600 font-medium">Eligible</span> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-[72px] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/properties" className="text-sm text-gray-400 hover:text-navy-800 flex items-center gap-1 mb-2">
                <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back to Properties
              </Link>
              <h1 className="heading-md text-navy-950">Property Comparison</h1>
              <p className="text-gray-500 text-sm mt-1">Comparing {properties.length} propert{properties.length > 1 ? "ies" : "y"}</p>
            </div>
            <button onClick={clearAll} className="text-sm text-red-500 hover:text-red-700 px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
              Clear All
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Expert's Choice */}
          {expertChoice && (
            <div className="bg-navy-900 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-gold fill-gold" />
                <span className="text-gold text-xs font-semibold tracking-wider uppercase">Expert&apos;s Choice</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={expertChoice.images?.[0] || ""} alt={expertChoice.title} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg sm:text-xl mb-1 truncate">{expertChoice.title}</h3>
                  <div className="flex items-center gap-1 text-white/50 text-sm mb-2">
                    <MapPin className="w-3.5 h-3.5" /> {expertChoice.location}
                  </div>
                  <p className="text-white/70 text-sm">
                    Exceptional ROI potential + Golden Visa eligible + Attractive off-plan pricing
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                  <a href="tel:+971563867270" className="flex items-center gap-2 px-4 py-2.5 bg-gold text-navy-900 text-sm font-semibold rounded-lg hover:bg-amber-500 transition-colors">
                    <Phone className="w-4 h-4" /> Call
                  </a>
                  <a href="https://wa.me/971563867270" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Property Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {properties.map((p) => (
              <div key={p.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="relative h-32 sm:h-40">
                  <Image src={p.images?.[0] || ""} alt={p.title} fill className="object-cover" sizes="300px" />
                  <button onClick={() => removeProperty(p.id)} className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-medium text-navy-950 text-sm line-clamp-2 mb-1">{p.title}</h3>
                  <p className="text-gray-400 text-xs">{p.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Comparison Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-gray-100">
              <h2 className="font-semibold text-navy-950 flex items-center gap-2">
                <GitCompare className="w-5 h-5" /> Quick Comparison
              </h2>
            </div>

            {/* Table Header */}
            <div className="grid gap-0" style={{ gridTemplateColumns: `140px repeat(${properties.length}, 1fr)` }}>
              <div className="p-3 sm:p-4 bg-gray-50 text-xs font-medium text-gray-400 uppercase tracking-wider"></div>
              {properties.map((p) => (
                <div key={p.id} className="p-3 sm:p-4 text-center">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden mx-auto mb-2">
                    <Image src={p.images?.[0] || ""} alt="" fill className="object-cover" sizes="48px" />
                  </div>
                  <span className="text-xs font-medium text-navy-950 line-clamp-1">{p.title}</span>
                </div>
              ))}
            </div>

            {/* Rows */}
            {comparisonRows.map((row) => (
              <div key={row.label} className="grid gap-0 border-t border-gray-50" style={{ gridTemplateColumns: `140px repeat(${properties.length}, 1fr)` }}>
                <div className="p-3 sm:p-4 bg-gray-50 flex items-center gap-2 text-sm text-gray-500">
                  {row.icon && <row.icon className="w-3.5 h-3.5" />}
                  {row.label}
                </div>
                {properties.map((p) => (
                  <div key={p.id} className={`p-3 sm:p-4 text-center text-sm ${row.highlight ? "text-green-600 font-semibold" : "text-navy-950"}`}>
                    {row.render(p)}
                  </div>
                ))}
              </div>
            ))}

            {/* Amenities */}
            {allAmenities.length > 0 && (
              <>
                <div className="grid gap-0 border-t border-gray-100" style={{ gridTemplateColumns: `140px repeat(${properties.length}, 1fr)` }}>
                  <div className="p-3 sm:p-4 bg-gray-50 text-sm font-medium text-gray-500">Amenities</div>
                  {properties.map((p) => (
                    <div key={p.id} className="p-3 sm:p-4 text-center">
                      <span className="text-xs text-gray-400">{p.amenities?.length || 0} features</span>
                    </div>
                  ))}
                </div>
                {allAmenities.map((amenity) => (
                  <div key={amenity} className="grid gap-0 border-t border-gray-50" style={{ gridTemplateColumns: `140px repeat(${properties.length}, 1fr)` }}>
                    <div className="p-3 sm:p-4 bg-gray-50 text-sm text-gray-500 flex items-center gap-2">
                      <BadgeCheck className="w-3.5 h-3.5" /> {amenity}
                    </div>
                    {properties.map((p) => {
                      const hasIt = p.amenities?.includes(amenity);
                      return (
                        <div key={p.id} className="p-3 sm:p-4 flex items-center justify-center">
                          {hasIt ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <Minus className="w-5 h-5 text-gray-200" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Property Cards with CTAs */}
          <div className="space-y-4">
            {properties.map((p) => (
              <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={p.images?.[0] || ""} alt={p.title} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-navy-950 text-sm line-clamp-1">{p.title}</h3>
                  <p className="text-gray-400 text-xs">{p.location}</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <a href="tel:+971563867270" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-800 text-white text-sm font-medium rounded-lg hover:bg-navy-700">
                    <Phone className="w-4 h-4" /> Call Agent
                  </a>
                  <Link href={`/property/${p.slug}`} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-navy-800 text-sm font-medium rounded-lg hover:border-navy-800">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
