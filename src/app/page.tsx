import { HeroCarousel } from "@/components/home/HeroCarousel";
import { About3G } from "@/components/home/About3G";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { WhyInvest } from "@/components/home/WhyInvest";
import { ExclusiveProperties } from "@/components/home/ExclusiveProperties";
import { GoldenVisa } from "@/components/home/GoldenVisa";
import { ComparePromo } from "@/components/home/ComparePromo";
import { InvestmentCalculator } from "@/components/home/InvestmentCalculator";
import { InvestorGuides } from "@/components/home/InvestorGuides";
import { AreaGuides } from "@/components/home/AreaGuides";
import { MortgageCalculator } from "@/components/home/MortgageCalculator";
import { Developers } from "@/components/home/Developers";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import {
  getFeaturedProperties,
  getExclusiveProperties,
  getAllCommunities,
  getAllProperties,
} from "@/lib/supabase/server";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, exclusive, communities, allProperties] = await Promise.all([
    getFeaturedProperties(),
    getExclusiveProperties(),
    getAllCommunities(),
    getAllProperties(),
  ]);

  return (
    <>
      {/* Pass all properties for developer dropdown, featured for carousel slides */}
      <HeroCarousel
        properties={featured}
        communities={communities}
        allProperties={allProperties}
      />
      <About3G />
      <FeaturedProperties />
      <WhyInvest />
      <ExclusiveProperties properties={exclusive} />
      <GoldenVisa />
      <ComparePromo />
      <InvestmentCalculator />
      <InvestorGuides />
      <AreaGuides />
      <MortgageCalculator />
      <Developers />
      <Testimonials />
      <CTASection />
    </>
  );
}
