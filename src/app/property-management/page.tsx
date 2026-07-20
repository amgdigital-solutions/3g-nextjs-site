import Image from "next/image";
import Link from "next/link";
import { Home, Wrench, TrendingUp, Shield, Users, Clock, FileCheck, Phone, ArrowRight, CheckCircle2, Building2, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Management Services Dubai | 3G Real Estate",
  description:
    "Professional property management services in Dubai. Tenant sourcing, rent collection, maintenance, and asset management for property owners.",
};

const services = [
  {
    icon: Users,
    title: "Tenant Sourcing",
    desc: "We find and vet qualified tenants for your property. Background checks, reference verification, and lease negotiation — all handled by our team.",
  },
  {
    icon: FileCheck,
    title: "Rent Collection",
    desc: "Hassle-free rent collection with timely deposits to your account. We handle reminders, follow-ups, and late payment processing.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    desc: "24/7 maintenance coordination with trusted contractors. From minor repairs to major renovations, we keep your property in top condition.",
  },
  {
    icon: Shield,
    title: "Legal Protection",
    desc: "Contract management, dispute resolution, and full RERA compliance. We protect your rights as a property owner under UAE law.",
  },
];

const features = [
  "RERA-Compliant Tenancy Contracts (Ejari)",
  "Property Inspection Reports",
  "Annual Maintenance Scheduling",
  "Rent Valuation & Market Analysis",
  "Tenant Screening & Background Checks",
  "Utility Connection & Disconnection",
  "Move-in/Move-out Condition Reports",
  "Legal Dispute Resolution",
];

const steps = [
  { num: "01", title: "Free Property Assessment", desc: "We evaluate your property and provide a rental valuation based on current market rates." },
  { num: "02", title: "Find the Right Tenant", desc: "Our marketing reaches 1000s of potential tenants. We screen every applicant thoroughly." },
  { num: "03", title: "Sit Back & Earn", desc: "We handle everything — rent collection, maintenance, and legal compliance. You just collect your income." },
];

export default function PropertyManagementPage() {
  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Hero */}
      <div className="bg-navy-900 py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="label-gold mb-4 block">Services</span>
              <h1 className="heading-lg text-white mb-6">
                Property Management<br />
                <span className="text-gold">in Dubai</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Maximize your rental yield while we handle everything — from tenant sourcing 
                to maintenance, rent collection to legal compliance. Trusted by 500+ property owners.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+971563867270" className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors">
                  <Phone className="w-4 h-4" /> Get Free Quote
                </a>
                <Link href="/properties" className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                  Our Properties <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Property Management Dubai"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-navy-800">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-10">
          <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Properties Managed" },
              { value: "98%", label: "Tenant Retention" },
              { value: "24/7", label: "Support" },
              { value: "15+", label: "Years Experience" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-3xl text-gold mb-1">{s.value}</div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="label-gold mb-3 block">What We Offer</span>
              <h2 className="heading-md text-navy-950">Complete Property<br />Management Solutions</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s) => (
                <div key={s.title} className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-navy-950 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="label-gold mb-3 block">Process</span>
              <h2 className="heading-md text-navy-950">How It Works</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.num} className="relative">
                  <div className="text-5xl font-serif text-gold/20 font-bold mb-4">{step.num}</div>
                  <h3 className="font-semibold text-navy-950 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="label-gold mb-3 block">Included</span>
                <h2 className="heading-md text-navy-950 mb-6">What&apos;s Included<br />in Our Service</h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Every property management package includes these essential services. 
                  No hidden fees, no surprises — just professional care for your investment.
                </p>
                <a href="tel:+971563867270" className="inline-flex items-center gap-2 px-6 py-3 bg-navy-800 text-white rounded-lg hover:bg-navy-700 transition-colors">
                  <Phone className="w-4 h-4" /> +971 56 386 7270
                </a>
              </div>
              <div className="space-y-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-navy-950">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-4xl mx-auto bg-navy-950 rounded-2xl p-10 text-center text-white">
            <h2 className="font-serif text-2xl sm:text-3xl mb-4">
              Ready to Hand Over Your Property?
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Get a free property management consultation. We will assess your property 
              and provide a customized management plan.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="tel:+971563867270" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors">
                <Phone className="w-5 h-5" /> Call +971 56 386 7270
              </a>
              <a href="mailto:info@3guae.com" className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
