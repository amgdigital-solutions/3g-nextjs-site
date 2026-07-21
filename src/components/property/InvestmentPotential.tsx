"use client";

import { TrendingUp, Home, Building2 } from "lucide-react";
import Link from "next/link";

interface InvestmentPotentialProps {
  expectedRoi: string;
  rentalYield: string;
  isGoldenVisa?: boolean;
  price?: number | null;
}

export function InvestmentPotential({
  expectedRoi,
  rentalYield,
  isGoldenVisa = false,
  price,
}: InvestmentPotentialProps) {
  const hasRoi = expectedRoi && expectedRoi !== "N/A" && expectedRoi !== "-";
  const hasYield = rentalYield && rentalYield !== "N/A" && rentalYield !== "-";

  return (
    <div className="mb-8">
      <div className="bg-navy-950 rounded-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-gold" />
          <h2 className="font-serif text-xl text-white">Investment Potential</h2>
        </div>

        {/* Metrics Grid — 2 columns */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className={`text-center p-4 rounded-xl ${hasRoi ? "bg-white/5" : "bg-white/5 opacity-50"}`}>
            <div className="text-gold font-serif text-2xl sm:text-3xl font-semibold mb-1">
              {hasRoi ? expectedRoi : "N/A"}
            </div>
            <div className="text-white/50 text-xs sm:text-sm">Expected ROI</div>
            {hasRoi && <p className="text-white/30 text-[10px] mt-1 hidden sm:block">Return on Investment</p>}
          </div>
          <div className={`text-center p-4 rounded-xl ${hasYield ? "bg-white/5" : "bg-white/5 opacity-50"}`}>
            <div className="text-gold font-serif text-2xl sm:text-3xl font-semibold mb-1">
              {hasYield ? rentalYield : "N/A"}
            </div>
            <div className="text-white/50 text-xs sm:text-sm">Rental Yield</div>
            {hasYield && <p className="text-white/30 text-[10px] mt-1 hidden sm:block">Annual rental return</p>}
          </div>
        </div>

        {/* Price Callout */}
        {price && price > 0 && (
          <div className="flex items-center justify-center gap-2 mb-4 text-center">
            <Building2 className="w-4 h-4 text-white/30" />
            <span className="text-white/40 text-sm">
              Property Price: <span className="text-white/60 font-medium">AED {(price / 1000000).toFixed(2)}M</span>
            </span>
          </div>
        )}

        {/* Golden Visa */}
        <div className="border-t border-white/10 pt-5">
          {isGoldenVisa ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 text-gold" />
              </div>
              <p className="text-white/70 text-sm">
                Qualifies for <Link href="/golden-visa" className="text-gold hover:underline font-medium">UAE Golden Visa</Link> (10-year)
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 text-white/40" />
              </div>
              <p className="text-white/40 text-sm">Golden Visa eligible on properties <span className="text-white/60">AED 2M+</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
