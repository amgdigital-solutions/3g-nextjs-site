"use client";

import Image from "next/image";
import { Landmark, Check, ArrowRight } from "lucide-react";

const benefits = [
  "10-year renewable residency visa",
  "No sponsor or employer required",
  "Include spouse, children & parents",
  "100% business ownership",
  "No minimum stay requirement",
  "Esaad privilege card",
];

export function GoldenVisa() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Landmark className="w-6 h-6 text-gold" />
                <span className="label-gold">Residency Program</span>
              </div>
              <h2 className="heading-md text-navy-950 mb-4">
                Golden Visa <span className="text-gold">Program</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Invest AED 2 million or more in Dubai property and secure a 10-year Golden Visa 
                residency for you and your family. Eligible on off-plan and mortgaged properties — 
                regardless of down payment percentage. Simply pay the government fee and apply.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Dubai&apos;s 2024 policy update made it easier than ever: any property worth AED 2M+ 
                qualifies — whether fully paid, mortgaged, or off-plan. No 50% minimum payment required.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">{b}</span>
                  </div>
                ))}
              </div>

              <a
                href="tel:+971563867270"
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy-800 text-white rounded-lg hover:bg-navy-700 transition-colors font-medium"
              >
                Get Free Consultation <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right: Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
                alt="Dubai Golden Visa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-sm text-gray-500">Minimum Investment</div>
                  <div className="font-serif text-2xl text-navy-950">AED 2,000,000</div>
                  <div className="text-xs text-green-600 mt-1">10-Year Visa for Whole Family</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
