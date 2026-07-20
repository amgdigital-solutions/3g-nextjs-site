import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Communities", href: "/communities" },
  { label: "Developers", href: "/developers" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Golden Visa", href: "/golden-visa" },
  { label: "Property Management", href: "/property-management" },
];

const services = [
  "Buy Property",
  "Off-Plan Properties",
  "Ready Properties",
  "Property Management",
  "Golden Visa Assistance",
  "Mortgage Advisory",
  "Investment Consulting",
  "Sell Your Property",
];

const communities = [
  "Downtown Dubai",
  "Dubai Marina",
  "Palm Jumeirah",
  "Business Bay",
  "Dubai Hills",
  "JVC",
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <div className="relative w-36 h-14">
                <Image
                  src="/images/logo-white.png"
                  alt="3G Real Estate"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Dubai&apos;s premier investment portal for off-plan and ready properties. Tax-free returns, Golden Visa eligible, trusted by 1000+ investors worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-gold text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wide">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="text-white/50 text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wide">Contact Us</h4>
            <div className="space-y-3">
              <a href="tel:+971563867270" className="flex items-center gap-2 text-white/50 hover:text-gold text-sm transition-colors">
                <Phone className="w-4 h-4" /> +971 56 386 7270
              </a>
              <a href="mailto:info@3guae.com" className="flex items-center gap-2 text-white/50 hover:text-gold text-sm transition-colors">
                <Mail className="w-4 h-4" /> info@3guae.com
              </a>
              <div className="flex items-start gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Office #1001, Sobha Ivory 1, Business Bay, Dubai, UAE
              </div>
            </div>

            <h4 className="font-semibold text-sm mt-8 mb-4 tracking-wide">Popular Communities</h4>
            <div className="flex flex-wrap gap-2">
              {communities.map((c) => (
                <span key={c} className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} 3G Real Estate LLC. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            RERA-Registered Dubai Broker &middot; BRN: 11666
          </p>
        </div>
      </div>
    </footer>
  );
}
