/**
 * ============================================
 * 3G REAL ESTATE — SITE CONFIGURATION
 * ============================================
 *
 * This file controls site-wide settings that don't require coding knowledge.
 * Edit the values below to customize your site.
 *
 * After saving changes, the site will auto-update (no rebuild needed).
 *
 * For advanced changes, contact your developer.
 */

export interface SiteConfig {
  // ─── Branding ───
  siteName: string;
  siteUrl: string;
  logoText: string;

  // ─── Contact Info ───
  phone: string;
  whatsapp: string;
  email: string;
  address: string;

  // ─── Social Links ───
  social: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };

  // ─── Analytics & Tracking ───
  // Paste your tracking IDs here (leave empty "" to disable)
  analytics: {
    googleAnalyticsId: string;      // Format: G-XXXXXXXXXX
    googleTagManagerId: string;     // Format: GTM-XXXXXXX
    microsoftClarityId: string;     // Format: xxxxxxxxx
    facebookPixelId: string;        // Format: xxxxxxxxxxxxx
    hotjarId: string;               // Format: xxxxxxx
  };

  // ─── SEO Defaults ───
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string;
    ogImage: string;
    twitterHandle: string;
  };

  // ─── Business Info (Schema.org) ───
  business: {
    name: string;
    description: string;
    founded: string;
    priceRange: string;
    openingHours: string;
    latitude: number;
    longitude: number;
  };

  // ─── Revalidation Secret ───
  // Used by admin panel to clear cache. Keep this secret!
  revalidateSecret: string;
}

// ──────────────────────────────────────────
// EDIT YOUR SETTINGS BELOW ↓
// ──────────────────────────────────────────

export const siteConfig: SiteConfig = {
  // Branding
  siteName: "3G Real Estate Dubai",
  siteUrl: "https://3guae.com",
  logoText: "3G Real Estate",

  // Contact
  phone: "+971 56 386 7270",
  whatsapp: "+971563867270",
  email: "info@3guae.com",
  address: "Office #1001, Sobha Ivory 1, Business Bay, Dubai, UAE",

  // Social (leave "" if you don't have that platform)
  social: {
    instagram: "https://instagram.com/3grealestate",
    facebook: "https://facebook.com/3grealestate",
    linkedin: "https://linkedin.com/company/3g-real-estate",
    twitter: "",
    youtube: "",
    tiktok: "",
  },

  // Analytics — Paste your IDs here to enable tracking
  analytics: {
    googleAnalyticsId: "",      // e.g. "G-ABC123DEF0"
    googleTagManagerId: "",     // e.g. "GTM-ABC1234"
    microsoftClarityId: "",     // e.g. "abc123def"
    facebookPixelId: "",        // e.g. "123456789012345"
    hotjarId: "",               // e.g. "1234567"
  },

  // SEO Defaults
  seo: {
    defaultTitle: "3G Real Estate Dubai | Off-Plan Properties & Investment",
    defaultDescription:
      "Dubai's premier investment portal for off-plan and ready properties. " +
      "With 15+ years of experience, we connect investors with premium opportunities " +
      "offering tax-free returns, Golden Visa eligibility, and 8-12% rental yields.",
    defaultKeywords:
      "Dubai real estate, off-plan properties, property investment Dubai, " +
      "Golden Visa UAE, buy apartment Dubai, Dubai Marina, Downtown Dubai",
    ogImage: "/og-image.jpg",
    twitterHandle: "@3grealestate",
  },

  // Business Info (for Google rich snippets)
  business: {
    name: "3G Real Estate",
    description:
      "Dubai's premier investment portal for off-plan and ready properties. " +
      "Trusted by 1000+ investors from 50+ countries.",
    founded: "2005",
    priceRange: "$$$",
    openingHours: "Mo-Sa 09:00-19:00",
    latitude: 25.1853,
    longitude: 55.2644,
  },

  // Secret token for cache clearing from admin panel
  // ⚠️ CHANGE THIS to a random string in production!
  revalidateSecret: "3g-revalidate-2026-secret",
};

// Helper to check if analytics are enabled
export function isAnalyticsEnabled(): boolean {
  const a = siteConfig.analytics;
  return !!(a.googleAnalyticsId || a.googleTagManagerId || a.microsoftClarityId);
}
