"use client";

import Link from "next/link";
import Image from "next/image";
import { useCompare } from "@/lib/compare-context";
import { X, GitCompare, ArrowRight } from "lucide-react";

export function CompareBar() {
  const { properties, removeProperty, clearAll } = useCompare();

  if (properties.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-3">
        <div className="flex items-center gap-4">
          {/* Label */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <GitCompare className="w-5 h-5 text-navy-800" />
            <span className="text-sm font-medium text-navy-950">
              {properties.length} of 3
            </span>
          </div>

          {/* Property thumbnails */}
          <div className="flex items-center gap-2 flex-1 overflow-x-auto">
            {properties.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1.5 flex-shrink-0"
              >
                <div className="relative w-10 h-10 rounded-md overflow-hidden">
                  <Image
                    src={p.images?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&q=80"}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <span className="text-xs font-medium text-navy-950 max-w-[120px] truncate hidden sm:block">
                  {p.title}
                </span>
                <button
                  onClick={() => removeProperty(p.id)}
                  className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-red-500"
                  aria-label="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={clearAll}
              className="text-xs text-gray-500 hover:text-red-500 px-2 py-1.5"
            >
              Clear
            </button>
            <Link
              href="/compare"
              className="flex items-center gap-2 px-4 py-2.5 bg-navy-800 text-white text-sm font-semibold rounded-lg hover:bg-navy-700 transition-colors"
            >
              Compare <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
