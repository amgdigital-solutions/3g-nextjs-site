import Link from "next/link";
import { Phone, ArrowRight, Building2, HelpCircle, Search, MapPin, Star, Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Dubai Property Developers | 3G Real Estate",
  description:
    "Explore Dubai's leading property developers. Emaar, DAMAC, Sobha, Nakheel, Meraas and more. Find projects by trusted developers.",
};

const developers = [
  { name: "Emaar Properties", projects: "50+", locations: ["Downtown Dubai", "Dubai Hills"], specialty: "Master Communities", rating: 4.9 },
  { name: "DAMAC Properties", projects: "40+", locations: ["DAMAC Hills", "Business Bay"], specialty: "Luxury Branded Residences", rating: 4.7 },
  { name: "Sobha Realty", projects: "25+", locations: ["Sobha Hartland", "Downtown"], specialty: "Craftsmanship Quality", rating: 4.8 },
  { name: "Nakheel", projects: "30+", locations: ["Palm Jumeirah", "De Islands"], specialty: "Iconic Waterfront Projects", rating: 4.6 },
  { name: "Meraas", projects: "20+", locations: ["Bluewaters", "City Walk"], specialty: "Lifestyle Destinations", rating: 4.8 },
  { name: "Aldar Properties", projects: "15+", locations: ["Yas Island", "Saadiyat"], specialty: "Abu Dhabi + Dubai", rating: 4.7 },
  { name: "Omniyat", projects: "10+", locations: ["Business Bay", "Palm"], specialty: "Ultra-Luxury Boutique", rating: 4.9 },
  { name: "Binghatti", projects: "35+", locations: ["JVC", "Dubai Marina"], specialty: "Architectural Design", rating: 4.5 },
  { name: "Azizi Developments", projects: "45+", locations: ["Dubai South", "Meydan"], specialty: "Affordable Luxury", rating: 4.4 },
  { name: "Danube Properties", projects: "30+", locations: ["Arjan", "Dubai Silicon Oasis"], specialty: "Value-for-Money", rating: 4.5 },
  { name: "Ellington Properties", projects: "15+", locations: ["JVT", "Downtown"], specialty: "Design-Led Living", rating: 4.7 },
  { name: "MAG Development", projects: "20+", locations: ["Dubai South", "Meydan"], specialty: "Mixed-Use Communities", rating: 4.3 },
];

const benefits = [
  "Exclusive pre-launch pricing",
  "Direct developer relationships",
  "VIP unit selection priority",
  "Flexible payment plans",
  "Post-handover payment options",
  "Golden Visa eligible projects",
];

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Hero */}
      <div className="bg-navy-900 py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto">
            <span className="label-gold mb-4 block">Partners</span>
            <h1 className="heading-lg text-white mb-4">
              Our Trusted <span className="text-gold">Developer Partners</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl">
              We work directly with Dubai&apos;s top developers to bring you exclusive pre-launch pricing, VIP unit selection, and flexible payment plans.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-navy-800">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-10">
          <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "12+", label: "Developer Partners" },
              { value: "300+", label: "Active Projects" },
              { value: "50+", label: "Communities" },
              { value: "VIP", label: "Early Access" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-3xl text-gold mb-1">{s.value}</div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Buy Direct */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="label-gold mb-3 block">Advantages</span>
              <h2 className="heading-md text-navy-950">Why Buy Through 3G?</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Check className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-sm text-navy-950 font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Developer Grid */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="heading-md text-navy-950">Featured Developers</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {developers.map((dev) => (
                <div key={dev.name} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center">
                      <span className="text-white font-serif text-lg font-bold">{dev.name.charAt(0)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="text-sm font-semibold text-navy-950">{dev.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-lg text-navy-950 mb-1">{dev.name}</h3>
                  <p className="text-gold text-xs font-semibold mb-3">{dev.specialty}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {dev.locations.map((loc) => (
                      <span key={loc} className="flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                        <MapPin className="w-3 h-3" /> {loc}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">{dev.projects} Projects</span>
                    <Link href="/properties" className="text-sm text-navy-800 hover:text-gold font-medium flex items-center gap-1">
                      View <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two Cards */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Need Help */}
            <div className="bg-navy-900 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
              <HelpCircle className="w-10 h-10 text-gold mb-4" />
              <h3 className="font-serif text-xl mb-2">Need Help Choosing a Developer?</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Not sure which developer matches your investment goals? Our experts analyze your budget, timeline, and ROI expectations to recommend the perfect match.
              </p>
              <a href="tel:+971563867270" className="inline-flex items-center gap-2 px-5 py-3 bg-gold text-navy-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors text-sm">
                <Phone className="w-4 h-4" /> Talk to an Expert
              </a>
            </div>

            {/* Looking for */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <Search className="w-10 h-10 text-navy-800 mb-4" />
              <h3 className="font-serif text-xl text-navy-950 mb-2">Looking for a Specific Developer?</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Can not find the developer you are looking for? We work with 50+ developers in Dubai. Let us know and we will connect you with their latest projects.
              </p>
              <Link href="/properties" className="inline-flex items-center gap-2 px-5 py-3 bg-navy-800 text-white font-semibold rounded-lg hover:bg-navy-700 transition-colors text-sm">
                Browse All Properties <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto bg-navy-950 rounded-2xl p-10 text-center text-white">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">Get Exclusive Developer Pricing</h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Access pre-launch prices and VIP unit selection before projects go public.
            </p>
            <a href="tel:+971563867270" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors">
              <Phone className="w-5 h-5" /> +971 56 386 7270
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
