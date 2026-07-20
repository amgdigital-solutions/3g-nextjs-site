import { PropertyCard } from "@/components/property/PropertyCard";
import { Sparkles } from "lucide-react";
import type { Property } from "@/types";

interface ExclusivePropertiesProps {
  properties: Property[];
}

export function ExclusiveProperties({ properties }: ExclusivePropertiesProps) {
  if (properties.length === 0) return null;

  return (
    <section className="py-20 bg-navy-950">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-5 h-5 text-gold" />
          <span className="label-gold">Limited Availability</span>
        </div>
        <h2 className="heading-md text-white mb-8">Exclusive Properties</h2>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
