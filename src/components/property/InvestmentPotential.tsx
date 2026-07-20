"use client";

import { TrendingUp, Home } from "lucide-react";
import Link from "next/link";

interface InvestmentPotentialProps {
  expectedRoi: string;
  rentalYield: string;
  paymentPlan: string;
  isGoldenVisa?: boolean;
}

export function InvestmentPotential({
  expectedRoi,
  rentalYield,
  paymentPlan,
  isGoldenVisa = false,
}: InvestmentPotentialProps) {
  return (
    <div className="mb-8">
      {/* Dark card */}
      <div className="bg-navy-950 rounded-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-gold" />
          <h2 className="font-serif text-xl text-white">Investment Potential</h2>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div className="text-center">
            <div className="text-gold font-serif text-2xl sm:text-3xl font-semibold mb-1">
              {expectedRoi}
            </div>
            <div className="text-white/50 text-xs sm:text-sm">Expected ROI</div>
          </div>
          <div className="text-center">
            <div className="text-gold font-serif text-2xl sm:text-3xl font-semibold mb-1">
              {rentalYield}
            </div>
            <div className="text-white/50 text-xs sm:text-sm">Rental Yield</div>
          </div>
          <div className="text-center">
            <div className="text-gold font-serif text-2xl sm:text-3xl font-semibold mb-1">
              {paymentPlan}
            </div>
            <div className="text-white/50 text-xs sm:text-sm">Payment Plan</div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-5">
          {isGoldenVisa ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 text-gold" />
              </div>
              <p className="text-white/70 text-sm">
                This property qualifies for the{" "}
                <Link href="/golden-visa" className="text-gold hover:underline font-medium">
                  UAE Golden Visa
                </Link>{" "}
                (10-year residency)
              </p>
            </div>
          ) : (
            <p className="text-white/40 text-sm text-center">
              Contact us to learn more about investment opportunities
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
