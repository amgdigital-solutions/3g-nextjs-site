"use client";

import Link from "next/link";
import { FileText, Shield, TrendingUp, Globe, ArrowRight, Clock } from "lucide-react";

const guides = [
  { icon: FileText, title: "Dubai Property Buying Guide 2025", slug: "dubai-buying-guide", desc: "Complete step-by-step guide to buying property in Dubai as a foreign investor.", pages: 24, readTime: "18 min", color: "bg-navy-50", iconColor: "text-navy-800" },
  { icon: Shield, title: "Golden Visa Handbook", slug: "golden-visa-handbook", desc: "Everything about UAE Golden Visa through property investment.", pages: 18, readTime: "12 min", color: "bg-green-50", iconColor: "text-green-600" },
  { icon: TrendingUp, title: "Dubai Investment ROI Report", slug: "roi-report", desc: "Comprehensive analysis of ROI by area, developer, and property type.", pages: 32, readTime: "22 min", color: "bg-amber-50", iconColor: "text-amber-600" },
  { icon: Globe, title: "Area Guide: Top 10 Communities", slug: "area-guide-top-10", desc: "Deep dive into Dubai's top investment communities.", pages: 28, readTime: "16 min", color: "bg-blue-50", iconColor: "text-blue-600" },
];

export function InvestorGuides() {
  return (
    <section id="investor-guides" className="py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="label-gold mb-4 block">Free Resources</span>
            <h2 className="heading-md text-navy-950 mb-4">
              Investor Guides <span className="text-gold">& Reports</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Download our expert-curated guides to make informed investment decisions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guide/${g.slug}`}
                className={`group flex gap-5 p-6 ${g.color} rounded-xl border border-transparent hover:border-gray-200 hover:shadow-md transition-all`}
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <g.icon className={`w-7 h-7 ${g.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-950 mb-1 group-hover:text-navy-700 transition-colors">{g.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{g.desc}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{g.pages} pages</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{g.readTime}</span>
                    <span className="text-gold font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Download <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
