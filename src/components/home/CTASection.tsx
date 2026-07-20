import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-md text-white mb-4">
            Ready to Invest in <span className="text-gold">Dubai?</span>
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Get personalized property recommendations from our expert consultants. Free consultation, no obligations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+971563867270"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call +971 56 386 7270
            </a>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Browse Properties
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
