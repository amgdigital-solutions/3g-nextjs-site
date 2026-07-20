import Image from "next/image";
import Link from "next/link";
import { Award, Users, Globe, Handshake, TrendingUp, Shield, Phone, ArrowRight, Star, Target, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About 3G Real Estate | Dubai's Trusted Property Experts",
  description:
    "3G Real Estate has been a trusted agency in Dubai since 2005. Award-winning team, 1000+ investors served, 15+ years of market expertise.",
};

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "1000+", label: "Investors Served" },
  { value: "50+", label: "Countries" },
  { value: "500+", label: "Properties Sold" },
];

const values = [
  { icon: Target, title: "Client First", desc: "Every decision we make starts with your goals. No pushy sales — just honest advice tailored to your investment objectives." },
  { icon: Shield, title: "Transparency", desc: "Clear pricing, honest ROI projections, and full disclosure on every property. What you see is what you get." },
  { icon: TrendingUp, title: "Market Expertise", desc: "15+ years of Dubai real estate data and trends. We know which communities, developers, and projects deliver results." },
  { icon: Handshake, title: "End-to-End Service", desc: "From property search to handover, Golden Visa to property management — we handle everything under one roof." },
];

const awards = [
  { title: "Tilal Al Ghaf Top Partner Award", year: "2023", org: "Majid Al Futtaim" },
  { title: "Excellence in Real Estate Brokerage", year: "2022", org: "Dubai Real Estate Awards" },
  { title: "Best Customer Service — Silver", year: "2021", org: "Property Finder" },
  { title: "Top Performing Agency", year: "2020", org: "Bayut & dubizzle" },
];

const team = [
  { name: "Shoaib Qureshi", role: "Founder & CEO", desc: "20+ years in Dubai real estate. visionary leader driving 3G's growth since 2005." },
  { name: "Sarah Mitchell", role: "Head of Sales", desc: "Expert in off-plan investments with deep knowledge of Dubai's emerging communities." },
  { name: "Ahmed Al-Rashid", role: "Golden Visa Specialist", desc: "Helped 200+ investors secure UAE residency through property investment." },
  { name: "Raj Patel", role: "Property Consultant", desc: "Specializes in Downtown Dubai, Business Bay, and Dubai Marina properties." },
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
              3G Real Estate has been a trusted agency in Dubai since 2005, helping over 1,000+ investors from 50+ countries find their dream property in the UAE.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-navy-800">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-10">
          <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-3xl text-gold mb-1">{s.value}</div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-gold mb-3 block">Our Story</span>
              <h2 className="heading-md text-navy-950 mb-6">Building Dreams,<br />One Property at a Time</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Since 2005, 3G Real Estate has been at the forefront of Dubai's property market. 
                What started as a small brokerage has grown into one of Dubai's most trusted real estate agencies, 
                serving over 1,000 investors from 50+ countries.
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

      {/* Awards */}
      <section className="py-16 bg-gray-50">
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

      {/* Team */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="label-gold mb-3 block">Our People</span>
              <h2 className="heading-md text-navy-950">Meet the Team</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((t) => (
                <div key={t.name} className="bg-white rounded-xl border border-gray-100 p-6 text-center">
                  <div className="w-16 h-16 bg-navy-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-serif text-lg font-bold">{t.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold text-navy-950 mb-1">{t.name}</h3>
                  <p className="text-gold text-xs font-semibold mb-3">{t.role}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{t.desc}</p>
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
