import { TrendingUp, Shield, Landmark, Clock } from "lucide-react";

const reasons = [
  {
    icon: TrendingUp,
    title: "High ROI",
    desc: "Average 8-12% annual returns on off-plan investments in prime Dubai locations.",
  },
  {
    icon: Shield,
    title: "Tax Free",
    desc: "Zero income tax, zero capital gains tax, and zero property tax in Dubai.",
  },
  {
    icon: Landmark,
    title: "Golden Visa",
    desc: "Property investment of AED 2M+ qualifies for 10-year UAE Golden Visa residency.",
  },
  {
    icon: Clock,
    title: "Payment Plans",
    desc: "Flexible post-handover payment plans spread across 3-5 years with 0% interest.",
  },
];

export function WhyInvest() {
  return (
    <section className="py-20 bg-navy-900">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="text-center mb-12">
          <span className="label-gold mb-2 block">Why Dubai</span>
          <h2 className="heading-md text-white">Why Invest in Dubai?</h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto">
            The world&apos;s most investor-friendly real estate market with unmatched benefits
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                <r.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-semibold text-white mb-2">{r.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
