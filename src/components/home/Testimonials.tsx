"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { name: "Ahmed Al-Rashid", role: "Investor from Saudi Arabia", quote: "3G Real Estate made my first Dubai property purchase seamless. Their team guided me through every step — from selecting the right off-plan project to securing my Golden Visa. Highly professional!", rating: 5 },
  { name: "Sarah Mitchell", role: "UK Expat, Dubai Marina", quote: "The ROI calculator on their website helped me narrow down the perfect investment. I ended up buying in Business Bay with an 8.5% rental yield. Best decision I ever made.", rating: 5 },
  { name: "Rajesh Patel", role: "Property Investor, India", quote: "I've worked with multiple agencies in Dubai, but 3G stands out for their transparency and market knowledge. Their community guides are incredibly detailed and accurate.", rating: 5 },
  { name: "Fatima Hassan", role: "First-time Buyer, UAE", quote: "As a first-time investor, I had many questions. The team at 3G patiently explained everything — payment plans, handover timelines, and expected returns. Truly exceptional service.", rating: 5 },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[current];

  return (
    <section className="py-20 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="label-gold mb-4 block">Testimonials</span>
            <h2 className="heading-md text-navy-950">What Our Clients Say</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-12 relative">
            <Quote className="w-12 h-12 text-gold/20 absolute top-6 left-6" />

            <div className="relative z-10 text-center">
              <p className="text-lg sm:text-xl text-navy-800 leading-relaxed mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-gold fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <h4 className="font-semibold text-navy-950">{t.name}</h4>
              <p className="text-gray-400 text-sm">{t.role}</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={prev} className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:border-navy-800 hover:text-navy-800 transition-colors" aria-label="Previous">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-navy-800" : "bg-gray-200"}`} aria-label={`Go to testimonial ${i + 1}`} />
                ))}
              </div>
              <button onClick={next} className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:border-navy-800 hover:text-navy-800 transition-colors" aria-label="Next">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
