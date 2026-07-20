export function StatsBar() {
  const stats = [
    { value: "1000+", label: "Investors Trust Us" },
    { value: "500+", label: "Properties Sold" },
    { value: "AED 2B+", label: "Total Sales Volume" },
    { value: "15+", label: "Years Experience" },
  ];

  return (
    <section className="bg-navy-800 py-10">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-2xl sm:text-3xl text-gold mb-1">{s.value}</div>
              <div className="text-white/60 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
