"use client";

import Image from "next/image";
import Link from "next/link";
import { TrendingUp, BookOpen, Calculator } from "lucide-react";

const tools = [
  {
    icon: TrendingUp,
    title: "ROI Calculator",
    desc: "Estimate your returns on Dubai property investment in seconds.",
    href: "#roi-calculator",
    color: "bg-navy-800",
    iconColor: "text-gold",
  },
  {
    icon: BookOpen,
    title: "Free Investor Guides",
    desc: "Download expert guides on buying, visas, and Dubai communities.",
    href: "#investor-guides",
    color: "bg-gold",
    iconColor: "text-navy-900",
  },
  {
    icon: Calculator,
    title: "Mortgage Calculator",
    desc: "Plan your financing with our easy mortgage payment estimator.",
    href: "#mortgage-calculator",
    color: "bg-navy-800",
    iconColor: "text-gold",
  },
];

export function About3G() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-5xl mx-auto">
          {/* Logo + Tagline */}
          <div className="text-center mb-14">
            <div className="relative w-32 h-16 mx-auto mb-6">
              <Image
                src="/images/logo-blue.png"
                alt="3G Real Estate"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="heading-md text-navy-950 mb-4">
              Your Trusted Partner in <span className="text-gold">Dubai Real Estate</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Dubai&apos;s premier investment portal for off-plan and ready properties. 
              With 15+ years of experience, we connect investors with premium opportunities 
              offering tax-free returns, Golden Visa eligibility, and 8-12% rental yields.
            </p>
          </div>

          {/* 3 Tool Cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg hover:border-gold/30 transition-all"
              >
                <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <tool.icon className={`w-6 h-6 ${tool.iconColor}`} />
                </div>
                <h3 className="font-semibold text-navy-950 mb-2">{tool.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
