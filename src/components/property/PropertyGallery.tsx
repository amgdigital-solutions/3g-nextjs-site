"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
  badges?: { text: string; variant: "new" | "gold" | "visa" | "sale" | "sold" }[];
}

export function PropertyGallery({ images, title, badges = [] }: PropertyGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const allImages = images.length > 0 ? images : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"];
  const mainImage = allImages[active];
  // Show up to 6 thumbnails on the right (2 cols x 3 rows)
  const thumbCount = Math.min(allImages.length, 6);
  const hasMore = allImages.length > 6;

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
        {/* Layout: Main image left (~72%), Thumbnails right (~28%) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-2">
          {/* Main Image - Cinematic wide aspect */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[16/9] lg:aspect-[2.35/1]">
            <Image
              src={mainImage}
              alt={`${title} - Image ${active + 1}`}
              fill
              className="object-cover cursor-pointer"
              priority
              sizes="(max-width: 1024px) 100vw, 72vw"
              onClick={() => setLightbox(true)}
            />

            {/* Badges overlay - top left */}
            {badges.length > 0 && (
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                {badges.map((badge, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg uppercase tracking-wide ${
                      badge.variant === "new"
                        ? "bg-gold text-navy-900"
                        : badge.variant === "visa"
                        ? "bg-navy-800 text-white"
                        : badge.variant === "sold"
                        ? "bg-red-600 text-white"
                        : badge.variant === "sale"
                        ? "bg-blue-50 text-blue-700 border border-blue-100"
                        : "bg-navy-800 text-white"
                    }`}
                  >
                    {badge.text}
                  </span>
                ))}
              </div>
            )}

            {/* Image counter */}
            {allImages.length > 1 && (
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 text-white text-xs rounded-lg z-10">
                {active + 1} / {allImages.length}
              </div>
            )}

            {/* Expand button */}
            <button
              onClick={() => setLightbox(true)}
              className="absolute bottom-4 left-4 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-lg flex items-center justify-center transition-colors z-10"
              aria-label="View full gallery"
            >
              <Expand className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnails (desktop - 2 column grid on right) */}
          {allImages.length > 1 && (
            <div className="hidden lg:grid grid-cols-2 gap-1.5">
              {Array.from({ length: thumbCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative rounded-xl overflow-hidden aspect-square transition-all ${
                    i === active
                      ? "ring-2 ring-gold ring-offset-1"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={allImages[i]}
                    alt={`${title} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                  {/* Show "+N more" on the last thumbnail if there are more images */}
                  {i === 5 && hasMore && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-semibold text-xl">+{allImages.length - 6}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails (mobile horizontal scroll) */}
        {allImages.length > 1 && (
          <div className="flex gap-2 mt-2 lg:hidden overflow-x-auto pb-2">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all ${
                  i === active ? "ring-2 ring-gold" : "opacity-60"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10"
            onClick={() => setLightbox(false)}
          >
            ✕
          </button>
          <div className="relative w-full h-full max-w-6xl mx-auto p-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={mainImage}
              alt={title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          {/* Lightbox thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(i);
                }}
                className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all ${
                  i === active ? "ring-2 ring-gold" : "opacity-50 hover:opacity-80"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
