"use client";

import Image from "next/image";

const developers = [
  { name: "Emaar Properties", slug: "emaar", projects: "50+", logo: null },
  { name: "DAMAC Properties", slug: "damac", projects: "40+", logo: null },
  { name: "Sobha Realty", slug: "sobha", projects: "25+", logo: null },
  { name: "Nakheel", slug: "nakheel", projects: "30+", logo: null },
  { name: "Meraas", slug: "meraas", projects: "20+", logo: null },
  { name: "Aldar Properties", slug: "aldar", projects: "15+", logo: null },
  { name: "Omniyat", slug: "omniyat", projects: "10+", logo: null },
  { name: "Binghatti", slug: "binghatti", projects: "35+", logo: null },
];

export function Developers() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="label-gold mb-4 block">Partners</span>
            <h2 className="heading-md text-navy-950">
              Our Trusted <span className="text-gold">Developer Partners</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {developers.map((dev) => (
              <div
                key={dev.slug}
                className="group bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center justify-center min-h-[120px] hover:shadow-md hover:border-gold/30 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-navy-800 transition-colors">
                  <span className="font-serif text-lg font-bold text-navy-800 group-hover:text-gold transition-colors">
                    {dev.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-medium text-navy-950 text-sm text-center">{dev.name}</h3>
                <span className="text-xs text-gray-400 mt-1">{dev.projects} Projects</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
