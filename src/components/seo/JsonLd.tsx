"use client";

// Organization Schema (inserted in <head> via layout)
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "3G Real Estate",
    url: "https://3guae.com",
    logo: "https://3guae.com/logo.png",
    telephone: "+971563867270",
    email: "info@3guae.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office #1001, Sobha Ivory 1, Business Bay",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    sameAs: [
      "https://www.instagram.com/3grealestate",
      "https://www.linkedin.com/company/3g-real-estate",
    ],
    description:
      "Dubai's premier real estate brokerage specializing in off-plan properties, investment opportunities, and Golden Visa services.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Property Listing Schema
export function PropertyJsonLd({ property }: { property: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description || property.meta_description,
    url: `https://3guae.com/property/${property.slug}`,
    image: property.images?.[0] || "",
    datePosted: property.created_at,
    price: {
      "@type": "PriceSpecification",
      price: property.price || 0,
      priceCurrency: "AED",
    },
    numberOfRooms: property.bedrooms || 0,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.area_sqft || 0,
      unitCode: "FTK",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location || "Dubai",
      addressCountry: "AE",
    },
    identifier: property.barcode
      ? {
          "@type": "PropertyValue",
          name: "RERA Registration",
          value: property.barcode,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema for AEO
export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article Schema for Blog
export function ArticleJsonLd({ post }: { post: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.meta_description,
    image: post.featured_image || "",
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Organization",
      name: post.author_name || "3G Real Estate",
    },
    publisher: {
      "@type": "Organization",
      name: "3G Real Estate",
      logo: {
        "@type": "ImageObject",
        url: "https://3guae.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://3guae.com/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
