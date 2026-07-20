"use client";

import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navy-900 pt-[72px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/40 to-navy-900" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <span className="label-gold mb-6 block">Dubai Real Estate</span>
          <h1 className="heading-lg text-white mb-6">
            Invest in Dubai&apos;s
            <br />
            <span className="text-gold">Future</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover premium off-plan properties with high ROI potential. Tax-free returns, Golden Visa eligible, trusted by 1000+ investors worldwide.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2">
              <Search className="w-5 h-5 text-white/50 ml-3" />
              <input
                type="text"
                placeholder="Search by location, project name..."
                className="flex-1 bg-transparent text-white placeholder-white/40 px-4 py-3 outline-none text-sm"
                readOnly
                onClick={() => window.location.href = "/properties"}
              />
              <Link
                href="/properties"
                className="px-6 py-3 bg-gold text-navy-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors text-sm"
              >
                Search
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3">
            {["Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Business Bay"].map((loc) => (
              <Link
                key={loc}
                href={`/properties?location=${encodeURIComponent(loc)}`}
                className="flex items-center gap-1 px-4 py-2 bg-white/10 border border-white/10 rounded-full text-white/70 text-sm hover:bg-white/20 hover:text-white transition-all"
              >
                {loc}
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
