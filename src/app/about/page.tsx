import Image from "next/image";
import Link from "next/link";
import { Award, Users, Globe, Handshake, TrendingUp, Shield, Phone, ArrowRight, Star, Target, Clock, Building2, Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About 3G Real Estate | Dubai's Trusted Property Experts",
  description:
    "Founded in 2005 by Adnan Arshad, 3G Real Estate has been a trusted agency in Dubai. Award-winning team, deep market expertise, 20+ years of excellence.",
};

const values = [
  { icon: Target, title: "Client First", desc: "Every decision we make starts with your goals. No pushy sales — just honest advice tailored to your investment objectives." },
  { icon: Shield, title: "Transparency", desc: "Clear pricing, honest ROI projections, and full disclosure on every property. What you see is what you get." },
  { icon: TrendingUp, title: "Market Expertise", desc: "20+ years of Dubai real estate data and trends. We know which communities, developers, and projects deliver results." },
  { icon: Handshake, title: "End-to-End Service", desc: "From property search to handover, Golden Visa to property management — we handle everything under one roof." },
];

const awards = [
  { title: "Tilal Al Ghaf Top Partner Award", year: "2023", org: "Majid Al Futtaim" },
  { title: "Excellence in Real Estate Brokerage", year: "2022", org: "Dubai Real Estate Awards" },
  { title: "Best Customer Service — Silver", year: "2021", org: "Property Finder" },
  { title: "Top Performing Agency", year: "2020", org: "Bayut & dubizzle" },
];

const afterSalesSteps = [
  { title: "Property Handover", desc: "We coordinate with the developer, conduct inspections, and ensure your unit is delivered as promised." },
  { title: "Snagging & Fixes", desc: "Our team identifies defects and follows up with the developer until every issue is resolved." },
  { title: "Utility Setup", desc: "DEWA, Ejari, internet, AC — we handle all utility connections so you don't have to." },
  { title: "Interior & Fit-out", desc: "Need furniture, design, or renovation? We connect you with trusted partners at preferred rates." },
  { title: "Property Management", desc: "Full-service tenant sourcing, rent collection, maintenance, and legal compliance for your investment." },
  { title: "Exit Strategy", desc: "When you're ready to sell, we market your property, find buyers, and handle the entire resale process." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Hero */}
      <div className="bg-navy-900 py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-5 h-5 text-gold" />
              <span className="label-gold">About Us</span>
            </div>
            <h1 className="heading-lg text-white mb-6">
              Where Real Estate Goals<br />
              <span className="text-gold">Lead to Achievements!</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
              Founded in 2005, 3G Real Estate has been a trusted agency in Dubai, guiding investors through every market cycle with integrity and results.
            </p>
          </div>
        </div>
      </div>

      {/* CEO / Founder Section */}
      <section className="py-16 lg:py-24 bg-navy-800">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[280px_1fr] gap-10 items-start">
            {/* CEO Photo */}
            <div className="mx-auto lg:mx-0">
              <div className="w-56 h-64 bg-navy-700 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <Image
                  src="/images/adnan-arshad.jpg"
                  alt="Adnan Arshad - Founder & CEO of 3G Real Estate"
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
              <div className="mt-4 text-center lg:text-left">
                <div className="font-serif text-xl text-white">Adnan Arshad</div>
                <div className="text-gold text-sm">Founder & CEO</div>
              </div>
            </div>

            {/* CEO Bio */}
            <div>
              <span className="label-gold mb-4 block">Leadership</span>
              <h2 className="heading-md text-white mb-6">Two Decades of Trust,<br />Built on Relationships</h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Adnan Arshad founded 3G Real Estate in 2005 with a clear vision: to bring 
                  institutional-grade advisory to individual investors in the UAE property market.
                </p>
                <p>
                  Over two decades, he has navigated clients through Dubai&apos;s explosive growth, 
                  the 2008 correction, the post-pandemic recovery, and now the Ras Al Khaimah opportunity.
                </p>
                <p>
                  His philosophy is rooted in relationships over transactions — a principle that has 
                  earned 3G Real Estate recognition from Meydan and Tilal Al Ghaf as a top-tier partner.
                </p>
                <p>
                  Today, Adnan leads 3G&apos;s strategic expansion into RAK, positioning the firm at the 
                  forefront of the emirate&apos;s most transformative investment cycle.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <a href="tel:+971563867270" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-navy-900 text-sm font-semibold rounded-lg hover:bg-amber-500 transition-colors">
                  <Phone className="w-4 h-4" /> Speak with Adnan
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-gold mb-3 block">Our Story</span>
              <h2 className="heading-md text-navy-950 mb-6">Building Dreams,<br />One Property at a Time</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Since 2005, 3G Real Estate has been at the forefront of Dubai&apos;s property market. 
                What started as a small brokerage has grown into one of Dubai&apos;s most trusted real estate agencies, 
                serving investors from across the globe.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We specialize in off-plan properties with strong ROI potential, helping our clients build 
                wealth through strategic Dubai real estate investments. Our deep market knowledge, transparent 
                approach, and commitment to client success have earned us multiple industry awards.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you are a first-time buyer or a seasoned investor, our team of RERA-certified 
                consultants is here to guide you every step of the way — from property selection to 
                Golden Visa application and beyond.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div key={v.title} className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <v.icon className="w-8 h-8 text-navy-800 mb-3" />
                  <h3 className="font-semibold text-navy-950 mb-2 text-sm">{v.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work — After Sales Focus */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-4">
              <span className="label-gold mb-3 block">Our Process</span>
              <h2 className="heading-md text-navy-950 mb-4">How We Work</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Where 3G truly stands apart is our after-sales service. We don&apos;t just sell you a property — 
                we walk with you through every step that comes after.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              {afterSalesSteps.map((step, idx) => (
                <div key={step.title} className="bg-white rounded-xl p-6 border border-gray-100 relative">
                  <div className="absolute -top-3 -left-1 w-8 h-8 bg-navy-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {idx + 1}
                  </div>
                  <h3 className="font-semibold text-navy-950 text-sm mb-2 mt-2">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-navy-800 rounded-2xl p-8 text-center text-white">
              <h3 className="font-serif text-xl mb-2">After-Sales is Where We Win</h3>
              <p className="text-white/60 text-sm max-w-xl mx-auto mb-4">
                Most brokers disappear after the sale. At 3G, that&apos;s when our real work begins. 
                From snagging to resale, we stay by your side for the entire journey.
              </p>
              <a href="tel:+971563867270" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-900 text-sm font-semibold rounded-lg hover:bg-amber-500 transition-colors">
                <Phone className="w-4 h-4" /> Experience the 3G Difference
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="label-gold mb-3 block">Recognition</span>
              <h2 className="heading-md text-navy-950">Awards & Achievements</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {awards.map((a) => (
                <div key={a.title} className="bg-white rounded-xl p-6 border border-gray-100 text-center">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-semibold text-navy-950 text-sm mb-1">{a.title}</h3>
                  <div className="text-gold text-xs font-semibold mb-1">{a.year}</div>
                  <p className="text-gray-400 text-xs">{a.org}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto bg-navy-950 rounded-2xl p-10 lg:p-14 text-center text-white">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">
              Let&apos;s Team Up!
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Join hands with us and conquer new horizons in Dubai real estate. 
              Whether you are buying, selling, or investing — we are here to help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+971563867270" className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <Link href="/properties" className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:border-gold hover:text-gold transition-colors">
                Browse Properties <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
