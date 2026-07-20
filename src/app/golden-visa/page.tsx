"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Landmark, Check, Phone, Shield, Clock, Users, Wallet, Plane, Globe, Star, ArrowRight, ChevronRight } from "lucide-react";

const benefits = [
  { icon: Clock, title: "10-Year Visa", desc: "Renewable residency visa valid for 10 years" },
  { icon: Users, title: "Family Sponsorship", desc: "Include spouse, children & parents" },
  { icon: Wallet, title: "No Sponsor Needed", desc: "Be your own sponsor — full independence" },
  { icon: Globe, title: "Business Ownership", desc: "100% ownership of mainland companies" },
  { icon: Plane, title: "No Minimum Stay", desc: "Travel freely without visa cancellation risk" },
  { icon: Shield, title: "Esaad Privilege Card", desc: "Exclusive discounts across UAE" },
];

const requirements = [
  "Property investment of AED 2,000,000 or more",
  "Property must be fully paid (mortgage allowed with 50%+ equity)",
  "Retain the property for minimum 3 years",
  "Valid passport with 6+ months validity",
  "Clean criminal record certificate",
  "Valid UAE health insurance",
];

const eligibleNationalities = [
  "All nationalities are eligible",
  "No age restriction",
  "No minimum income requirement",
  "Single or married applicants",
  "Can sponsor unlimited domestic helpers",
];

const comparison = [
  { type: "Normal Visa", duration: "2-3 years", renew: "Requires sponsor", stay: "Max 6 months outside UAE", sponsor: "Employer/Spouse only" },
  { type: "Golden Visa", duration: "10 years", renew: "Self-sponsored", stay: "No minimum stay", sponsor: "Family + Staff" },
];

export default function GoldenVisaPage() {
  const [propertyValue, setPropertyValue] = useState(2000000);
  const [equity, setEquity] = useState(100);
  const isEligible = propertyValue >= 2000000 && equity >= 50;

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Hero */}
      <div className="bg-navy-900 py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Landmark className="w-5 h-5 text-gold" />
                <span className="label-gold">UAE Residency Program</span>
              </div>
              <h1 className="heading-lg text-white mb-6">
                Golden Visa<br />
                <span className="text-gold">Program</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Invest AED 2M+ in Dubai property and secure 10-year residency for you and your family. 
                No sponsor needed, no minimum stay requirement. Your gateway to long-term UAE living.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+971563867270" className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors">
                  <Phone className="w-4 h-4" /> Free Eligibility Check
                </a>
                <Link href="#eligibility-checker" className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                  Check Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80"
                alt="Dubai Golden Visa"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-xs text-gray-500">Minimum Investment</div>
                  <div className="font-serif text-2xl text-navy-950">AED 2,000,000</div>
                  <div className="text-xs text-green-600 font-medium">10-Year Visa for Whole Family</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="label-gold mb-3 block">Benefits</span>
              <h2 className="heading-md text-navy-950">Why Get a Golden Visa?</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b) => (
                <div key={b.title} className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center mb-4">
                    <b.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-navy-950 mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Checker */}
      <section id="eligibility-checker" className="py-16 bg-navy-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <Star className="w-8 h-8 text-gold mx-auto mb-4" />
              <h2 className="heading-md text-white mb-2">
                Check Your <span className="text-gold">Eligibility</span>
              </h2>
              <p className="text-white/50">See if you qualify for the UAE Golden Visa in seconds</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10">
              {/* Property Value */}
              <div className="mb-8">
                <label className="text-white/70 text-sm mb-2 block">Property Investment Value</label>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">AED {(propertyValue / 1000000).toFixed(2)}M</span>
                  <span className="text-white/40 text-xs">{propertyValue >= 2000000 ? "Qualified" : "Need AED 2M+"}</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="10000000"
                  step="100000"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="w-full accent-gold h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>AED 500K</span>
                  <span>AED 2M (min)</span>
                  <span>AED 10M</span>
                </div>
              </div>

              {/* Equity */}
              <div className="mb-8">
                <label className="text-white/70 text-sm mb-2 block">Down Payment / Equity (%)</label>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">{equity}%</span>
                  <span className="text-white/40 text-xs">{equity >= 50 ? "Qualified" : "Need 50%+ equity"}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={equity}
                  onChange={(e) => setEquity(Number(e.target.value))}
                  className="w-full accent-gold h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>0%</span>
                  <span>50% (min)</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Result */}
              <div className={`rounded-xl p-6 text-center ${isEligible ? "bg-green-500/20 border border-green-500/30" : "bg-red-500/10 border border-red-500/20"}`}>
                {isEligible ? (
                  <>
                    <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-7 h-7 text-green-400" />
                    </div>
                    <h3 className="text-green-400 font-semibold text-lg mb-1">You Are Eligible!</h3>
                    <p className="text-white/60 text-sm mb-4">Your property investment qualifies you for the UAE Golden Visa program.</p>
                    <a href="tel:+971563867270" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors">
                      <Phone className="w-4 h-4" /> Start Your Application
                    </a>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-7 h-7 text-red-400" />
                    </div>
                    <h3 className="text-red-400 font-semibold text-lg mb-1">Not Yet Eligible</h3>
                    <p className="text-white/60 text-sm mb-4">
                      {propertyValue < 2000000
                        ? "You need a property worth at least AED 2,000,000."
                        : "You need at least 50% equity in the property."}
                    </p>
                    <Link href="/properties" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                      Browse Qualifying Properties <ArrowRight className="w-4 h-4" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
            <div>
              <span className="label-gold mb-3 block">Requirements</span>
              <h2 className="heading-md text-navy-950 mb-6">Eligibility Requirements</h2>
              <div className="space-y-3">
                {requirements.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <span className="text-gray-600 text-sm">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="label-gold mb-3 block">Who Can Apply</span>
              <h2 className="heading-md text-navy-950 mb-6">Open to Everyone</h2>
              <div className="space-y-3">
                {eligibleNationalities.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Globe className="w-3.5 h-3.5 text-navy-800" />
                    </div>
                    <span className="text-gray-600 text-sm">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="label-gold mb-3 block">Comparison</span>
              <h2 className="heading-md text-navy-950">Golden Visa vs Normal Visa</h2>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-3 gap-0">
                <div className="p-4 bg-gray-50 text-xs font-medium text-gray-500 uppercase"></div>
                {comparison.map((c) => (
                  <div key={c.type} className={`p-4 text-center text-sm font-semibold ${c.type === "Golden Visa" ? "bg-navy-800 text-gold" : "bg-gray-100 text-gray-600"}`}>
                    {c.type}
                  </div>
                ))}
                {["duration", "renew", "stay", "sponsor"].map((field) => (
                  <>
                    <div key={`h-${field}`} className="p-4 bg-gray-50 text-xs font-medium text-gray-500 capitalize border-t">{field === "duration" ? "Duration" : field === "renew" ? "Renewal" : field === "stay" ? "Stay Requirement" : "Sponsor"}</div>
                    {comparison.map((c) => (
                      <div key={`${c.type}-${field}`} className={`p-4 text-center text-sm border-t ${c.type === "Golden Visa" ? "text-navy-950 font-medium" : "text-gray-500"}`}>
                        {c[field as keyof typeof c]}
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto bg-navy-950 rounded-2xl p-10 text-center text-white">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">
              Start Your Golden Visa Journey Today
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Our Golden Visa specialists handle the entire process — from property selection to visa stamping. Free consultation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+971563867270" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors">
                <Phone className="w-5 h-5" /> Call +971 56 386 7270
              </a>
              <Link href="/properties" className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                Find Qualifying Properties
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
