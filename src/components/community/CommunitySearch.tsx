"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, MapPin } from "lucide-react";
import type { Community } from "@/types";

interface Props {
  communities: Community[];
}

export function CommunitySearch({ communities }: Props) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return communities.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      (c.location && c.location.toLowerCase().includes(q)) ||
      (c.description && c.description.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [query, communities]);

  return (
    <div className="relative max-w-xl">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 flex items-center">
        <Search className="w-5 h-5 text-white/50 ml-4 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search communities..."
          className="flex-1 bg-transparent text-white placeholder-white/40 px-3 py-3 outline-none text-sm min-w-0"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="p-2 text-white/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {focused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden z-50">
          {results.map((c) => (
            <Link
              key={c.id}
              href={`/community/${c.slug}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
              onClick={() => setQuery("")}
            >
              <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-navy-800" />
              </div>
              <div>
                <div className="text-sm font-medium text-navy-950">{c.name}</div>
                <div className="text-xs text-gray-400">{c.location}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {focused && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-xl p-4 text-center z-50">
          <p className="text-gray-400 text-sm">No communities found for &quot;{query}&quot;</p>
        </div>
      )}
    </div>
  );
}
