import Link from "next/link";
import Image from "next/image";
import { MapPin, TrendingUp } from "lucide-react";

const areas = [
  { name: "Dubai Marina", tagline: "Waterfront living, high rental demand", image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80", yield: "8-10%", type: "Luxury Apartments" },
  { name: "Downtown Dubai", tagline: "Near Burj Khalifa, strong capital growth", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", yield: "7-9%", type: "Premium Residences" },
  { name: "Business Bay", tagline: "Commercial hub, ideal for rental returns", image: "https://images.unsplash.com/photo-1506143925201-025df6385759?w=600&q=80", yield: "8-10%", type: "Mixed-Use Towers" },
  { name: "Dubai Hills Estate", tagline: "Golf community, modern villas & apartments", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", yield: "7-8%", type: "Family Community" },
  { name: "Palm Jumeirah", tagline: "Luxury lifestyle, strong short-term rental income", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80", yield: "6-8%", type: "Ultra-Luxury Villas" },
  { name: "JVC", tagline: "Affordable, high ROI, family-friendly", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", yield: "9-11%", type: "Value Investment" },
];

export function AreaGuides() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="label-gold mb-4 block">Investment Areas</span>
            <h2 className="heading-md text-navy-950 mb-4">
              Top Freehold Areas for <span className="text-gold">Foreign Investors</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Discover Dubai's best communities for property investment with high rental yields
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((a) => (
              <Link
                key={a.name}
                href={`/properties?location=${encodeURIComponent(a.name)}`}
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image src={a.image} alt={a.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 rounded-lg flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-semibold text-green-700">{a.yield}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                    <MapPin className="w-3 h-3" />
                    {a.type}
                  </div>
                  <h3 className="font-serif text-lg text-navy-950 mb-1 group-hover:text-navy-700 transition-colors">{a.name}</h3>
                  <p className="text-gray-500 text-sm">{a.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
