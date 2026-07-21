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
  { href: "/property-management", label: "Property Mgmt", icon: Briefcase },
  { href: "/about", label: "About", icon: Info },
  { href: "/blog", label: "Blog", icon: FileText },
];

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; } else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isDark = !mounted ? false : (!isHomePage || scrolled);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 ${mounted ? "transition-all duration-500" : ""} ${isDark ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"}`}>
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
              <div className="relative w-28 h-10">
                <Image src={isDark ? "/images/logo-blue.png" : "/images/logo-white.png"} alt="3G Real Estate" fill className="object-contain object-left" priority />
              </div>
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.filter(l => l.href !== "/").map((link) => (
                <Link key={link.href} href={link.href} className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${isDark ? "text-navy-800 hover:text-navy-950 hover:bg-gray-50" : "text-white/80 hover:text-white hover:bg-white/10"}`}>{link.label}</Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <a href="tel:+971563867270" className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${isDark ? "bg-navy-800 text-white hover:bg-navy-700" : "bg-gold text-navy-900 hover:bg-amber-500"}`}>Contact Expert</a>
              <button onClick={() => setOpen(!open)} className={`lg:hidden relative z-[60] p-2 transition-colors ${open ? "text-white" : isDark ? "text-navy-800" : "text-white"}`} aria-label="Toggle menu">{open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}</button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu — 2x2 Square Grid, No Gaps, Blue Theme */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-[55] bg-white">
          {/* Close button top right */}
          <div className="absolute top-0 right-0 z-60 p-4">
            <button onClick={() => setOpen(false)} className="w-12 h-12 bg-gray-100 flex items-center justify-center text-[#1E3A5F] hover:bg-gray-200 transition-colors" aria-label="Close menu">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Grid — Full screen, no gaps, border lines, blue icons */}
          <nav className="grid grid-cols-2 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex flex-col items-center justify-center gap-3 border border-gray-200 transition-all active:scale-95 active:bg-gray-100 ${
                  pathname === link.href
                    ? "bg-[#1E3A5F] text-white"
                    : "bg-white text-[#1E3A5F] hover:bg-gray-50"
                }`}
              >
                <link.icon className={`w-8 h-8 ${pathname === link.href ? "text-white" : "text-[#1E3A5F]"}`} />
                <span className="text-sm font-semibold text-center">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
