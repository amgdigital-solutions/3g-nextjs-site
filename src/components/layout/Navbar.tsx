"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Home, Building2, MapPin, Landmark, Briefcase, Users, Info, FileText } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/properties", label: "Properties", icon: Building2 },
  { href: "/communities", label: "Communities", icon: MapPin },
  { href: "/developers", label: "Developers", icon: Users },
  { href: "/golden-visa", label: "Golden Visa", icon: Landmark },
  { href: "/property-management", label: "Property Management", icon: Briefcase },
  { href: "/about", label: "About", icon: Info },
  { href: "/blog", label: "Blog", icon: FileText },
];

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isDark = !isHomePage || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isDark
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <div className="relative w-28 h-10">
                <Image
                  src={isDark ? "/images/logo-blue.png" : "/images/logo-white.png"}
                  alt="3G Real Estate"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.filter(l => l.href !== "/").map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isDark
                      ? "text-navy-800 hover:text-navy-950 hover:bg-gray-50"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+971563867270"
                className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                  isDark
                    ? "bg-navy-800 text-white hover:bg-navy-700"
                    : "bg-gold text-navy-900 hover:bg-amber-500"
                }`}
              >
                Contact Expert
              </a>
              <button
                onClick={() => setOpen(!open)}
                className={`lg:hidden relative z-[60] p-2 transition-colors ${
                  open ? "text-white" : isDark ? "text-navy-800" : "text-white"
                }`}
                aria-label="Toggle menu"
              >
                {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-[55] bg-navy-900/98 backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/3 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col h-full pt-20 pb-8 px-6">
            {/* Top: Logo + Close */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/" onClick={() => setOpen(false)} className="relative w-32 h-12">
                <Image src="/images/logo-white.png" alt="3G Real Estate" fill className="object-contain object-left" />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 bg-white/10 border border-white/10 rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Grid — Full Width Glass Effect */}
            <nav className="grid grid-cols-1 gap-3 flex-1 content-start">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-xl border-2 transition-all active:scale-95 w-full ${
                    pathname === link.href
                      ? "bg-navy-800 border-gold text-white"
                      : "bg-white/10 backdrop-blur-lg border-white/20 text-navy-300 hover:bg-white/20 hover:border-gold/50"
                  }`}
                >
                  <link.icon className={`w-6 h-6 flex-shrink-0 ${pathname === link.href ? "text-gold" : "text-navy-300"}`} />
                  <span className="text-base font-semibold">{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* Bottom */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <a
                href="tel:+971563867270"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-4 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors text-base"
              >
                <Phone className="w-5 h-5" />
                +971 56 386 7270
              </a>
              <p className="text-center text-white/25 text-xs">
                Office #1001, Sobha Ivory 1, Business Bay, Dubai
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
