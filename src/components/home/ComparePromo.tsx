"use client";

import Link from "next/link";
import { GitCompare, Building2, BarChart3, ArrowRight, Check } from "lucide-react";

const steps = [
  { icon: Building2, num: "01", title: "Browse Properties", desc: "Explore 900+ off-plan and ready properties from top Dubai developers." },
  { icon: GitCompare, num: "02", title: "Add to Compare", desc: "Click the compare icon on any property card. Select up to 3 properties." },
  { icon: BarChart3, num: "03", title: "Compare & Decide", desc: "Side-by-side comparison of price, ROI, amenities, payment plans & more." },
];

const features = [
  "Compare Price & Price/sqft",
  "ROI & Rental Yield Analysis",
  "Amenities Checklist View",
  "Payment Plan Comparison",
  "Developer & Handover Info",
  "Golden Visa Eligibility",
];

export function ComparePromo() {
  return (
    <section className="py-20 lg:py-28 bg-navy-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="label-gold mb-4 block">Smart Tool</span>
            <h2 className="heading-md text-white mb-4">
              Compare Properties <span className="text-gold">Side by Side</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Make smarter investment decisions by comparing up to 3 properties at once
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-5 p-5 bg-white/5 border border-white/10 rounded-xl">
                  <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-navy-900" />
                  </div>
                  <div>
                    <span className="text-gold text-xs font-semibold">Step {step.num}</span>
                    <h3 className="font-semibold text-white mt-1">{step.title}</h3>
                    <p className="text-white/50 text-sm mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="font-serif text-xl text-white mb-6">What You Can Compare</h3>
              <div className="space-y-4">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <span className="text-white/70">{f}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gold text-navy-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors"
              >
                Start Comparing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
