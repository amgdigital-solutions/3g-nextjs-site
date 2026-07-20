"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Property } from "@/types";

interface CompareContextType {
  properties: Property[];
  addProperty: (property: Property) => boolean;
  removeProperty: (id: string) => void;
  isComparing: (id: string) => boolean;
  canAddMore: boolean;
  clearAll: () => void;
}

const CompareContext = createContext<CompareContextType | null>(null);

const STORAGE_KEY = "3g_compare_properties";
const MAX_COMPARE = 3;

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  }, [properties]);

  const addProperty = useCallback((property: Property) => {
    if (properties.length >= MAX_COMPARE) return false;
    if (properties.find((p) => p.id === property.id)) return false;
    setProperties((prev) => [...prev, property]);
    return true;
  }, [properties]);

  const removeProperty = useCallback((id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const isComparing = useCallback((id: string) => {
    return properties.some((p) => p.id === id);
  }, [properties]);

  const clearAll = useCallback(() => {
    setProperties([]);
  }, []);

  return (
    <CompareContext.Provider
      value={{
        properties,
        addProperty,
        removeProperty,
        isComparing,
        canAddMore: properties.length < MAX_COMPARE,
        clearAll,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
