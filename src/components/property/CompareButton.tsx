"use client";

import { useCompare } from "@/lib/compare-context";
import type { Property } from "@/types";
import { GitCompare, Check } from "lucide-react";

interface CompareButtonProps {
  property: Property;
  variant?: "card" | "detail";
}

export function CompareButton({ property, variant = "card" }: CompareButtonProps) {
  const { isComparing, addProperty, removeProperty, canAddMore } = useCompare();
  const comparing = isComparing(property.id);

  if (variant === "detail") {
    return (
      <button
        onClick={() => comparing ? removeProperty(property.id) : addProperty(property)}
        disabled={!comparing && !canAddMore}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
          comparing
            ? "border-navy-800 bg-navy-800 text-white"
            : !canAddMore
            ? "border-gray-100 text-gray-300 cursor-not-allowed"
            : "border-gray-200 text-gray-600 hover:border-navy-300 hover:bg-navy-50"
        }`}
      >
        {comparing ? <Check className="w-4 h-4" /> : <GitCompare className="w-4 h-4" />}
        {comparing ? "Added" : "Compare"}
      </button>
    );
  }

  // Card variant - small icon button
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        comparing ? removeProperty(property.id) : addProperty(property);
      }}
      disabled={!comparing && !canAddMore}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
        comparing
          ? "bg-navy-800 text-white"
          : !canAddMore
          ? "bg-gray-100 text-gray-300 cursor-not-allowed"
          : "bg-white/80 backdrop-blur-sm text-navy-800 hover:bg-navy-800 hover:text-white"
      }`}
      title={comparing ? "Remove from compare" : "Add to compare"}
    >
      {comparing ? <Check className="w-4 h-4" /> : <GitCompare className="w-4 h-4" />}
    </button>
  );
}
