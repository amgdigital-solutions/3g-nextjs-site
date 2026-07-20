import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Clock, Download, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

interface GuideData {
  title: string;
  description: string;
  readTime: string;
  pages: number;
  updated: string;
  sections: { heading: string; content: string }[];
  checklist: string[];
}

const guides: Record<string, GuideData> = {
  "dubai-buying-guide": {
    title: "Dubai Property Buying Guide 2025",
    description: "Complete step-by-step guide to buying property in Dubai as a foreign investor. Covers legal requirements, costs, timelines, and expert tips.",
    readTime: "18 min",
    pages: 24,
    updated: "July 2025",
    sections: [
      { heading: "Why Invest in Dubai?", content: "Dubai offers one of the world's most attractive real estate markets for foreign investors. With zero property tax, 100% foreign ownership in freehold areas, and rental yields averaging 7-10%, it is a compelling destination for capital growth and income generation. The UAE Dirham is pegged to the US Dollar, providing currency stability, while the Golden Visa program offers 10-year residency for property investments above AED 2 million." },
      { heading: "Who Can Buy Property in Dubai?", content: "Foreign nationals can purchase freehold property in designated areas across Dubai. There are no restrictions on nationality, and both individuals and companies can own property. Investors from over 200 countries actively participate in the Dubai property market. You do not need a UAE residence visa to purchase property, though having one simplifies certain processes like opening bank accounts." },
      { heading: "Freehold vs Leasehold Areas", content: "Freehold areas allow complete ownership of the property and the land it sits on. Popular freehold areas include Dubai Marina, Downtown Dubai, Palm Jumeirah, JBR, Business Bay, and Dubai South. Leasehold areas grant rights for up to 99 years. Most new developments are freehold, making them ideal for international investors seeking full ownership rights." },
      { heading: "Step-by-Step Buying Process", content: "1. Define your budget and investment goals\n2. Research areas and property types\n3. Engage a RERA-registered agent\n4. View properties and select your preferred unit\n5. Negotiate price and terms\n6. Sign the Memorandum of Understanding (MOU)\n7. Apply for a No Objection Certificate (NOC) from the developer\n8. Transfer ownership at the Dubai Land Department (DLD)\n9. Register the property and receive your title deed" },
      { heading: "Costs to Budget For", content: "Property Price: 100% (or mortgage + down payment)\nDubai Land Department Fee: 4% of property value\nRegistration Fee: AED 4,000 (for properties over AED 500,000)\nAgency Commission: 2% + VAT\nMortgage Registration Fee: 0.25% of loan amount + AED 290\nValuation Fee: AED 2,500 - 3,500\nNOC Fee: AED 500 - 5,000 (varies by developer)\nMaintenance and service charges (ongoing)" },
      { heading: "Mortgage Options for Foreigners", content: "UAE banks offer mortgages to non-residents with loan-to-value ratios up to 50% for properties under AED 5 million, and 65% for properties above AED 5 million. Interest rates typically range from 6-8%. Major lenders include Emirates NBD, Dubai Islamic Bank, Abu Dhabi Commercial Bank, and HSBC. Required documents include passport, proof of income (6 months bank statements), and a credit report from your home country." },
      { heading: "Golden Visa Through Property", content: "Investors purchasing property worth AED 2 million or more are eligible for the 10-year UAE Golden Visa. The property can be mortgaged (with at least 50% equity or AED 2 million paid). The visa extends to spouse, children, and domestic staff. Benefits include no income tax, no personal tax, access to UAE banking, and the ability to sponsor family members." },
      { heading: "Legal Protections", content: "Dubai's real estate sector is regulated by the Real Estate Regulatory Agency (RERA) and Dubai Land Department (DLD). All agents must be RERA-certified. Off-plan properties are protected by escrow accounts, ensuring your funds are safe. The Dubai Courts system handles property disputes efficiently, and title deeds are issued electronically for security." },
      { heading: "Best Areas for Investment in 2025", content: "Dubai South: Affordable entry, Expo legacy, Al Maktoum Airport expansion\nDubai Marina: Established, high rental demand, premium waterfront\nDowntown Dubai: Iconic address, Burj Khalifa district, luxury segment\nPalm Jebel Ali: New development, beachfront villas, strong appreciation potential\nBusiness Bay: Central location, commercial hub, strong tenant demand\nJVC/JVT: Family-friendly, affordable, high rental yields 8-10%" },
      { heading: "Common Mistakes to Avoid", content: "Not verifying the developer's track record\nIgnoring service charges and maintenance costs\nBuying without viewing the property or area\nNot understanding the payment plan structure\nFailing to account for all transaction costs\nWorking with unregistered agents\nOverlooking rental yield vs capital growth balance\nNot considering exit strategy and resale liquidity" },
    ],
    checklist: [
      "Verify agent's RERA registration",
      "Check developer track record and escrow account",
      "Get property valuation from certified valuer",
      "Review service charges and maintenance fees",
      "Understand payment plan and penalty clauses",
      "Secure mortgage pre-approval (if financing)",
      "Hire a lawyer for contract review",
      "Verify title deed and ownership status",
      "Plan for all transaction costs (+7-8%)",
      "Consider Golden Visa eligibility",
    ],
  },
  "golden-visa-handbook": {
    title: "Golden Visa Handbook",
    description: "Everything about UAE Golden Visa through property investment. Requirements, process, benefits, and tips for a successful application.",
    readTime: "12 min",
    pages: 18,
    updated: "July 2025",
    sections: [
      { heading: "What is the UAE Golden Visa?", content: "The UAE Golden Visa is a long-term residence visa that allows foreign nationals to live, work, and study in the UAE for 10 years without the need for a national sponsor. It is part of the UAE strategy to attract talent, investors, and entrepreneurs. The visa is renewable and offers unprecedented stability in the region." },
      { heading: "Property Investment Route", content: "The most popular Golden Visa route for investors is through real estate. The minimum investment requirement is AED 2 million in property. This can be a single property or a portfolio of multiple properties. The property must be retained for the duration of the visa, and mortgages are allowed provided at least AED 2 million in equity is held." },
      { heading: "Eligibility Requirements", content: "Property value of AED 2 million or more\nProperty must be located in a freehold area\nMortgage is permitted (50% minimum equity)\nOff-plan properties qualify with AED 2 million contract value\nProperty can be residential, commercial, or mixed-use\nCo-owned properties qualify if your share is AED 2M+\nNo minimum stay requirement in the UAE\nClean criminal record" },
      { heading: "Application Process", content: "1. Purchase qualifying property (AED 2M+)\n2. Obtain title deed or Oqood (off-plan)\n3. Apply through ICP (Federal Authority for Identity and Citizenship)\n4. Submit property valuation report\n5. Pay application fee (approximately AED 3,800-4,800)\n6. Undergo medical fitness test in UAE\n7. Receive visa stamp (valid for 10 years)\n8. Process typically takes 7-14 working days" },
      { heading: "Family Sponsorship", content: "Golden Visa holders can sponsor their spouse, unmarried sons under 25, and unmarried daughters of any age. Domestic workers can also be sponsored. There is no cap on the number of children that can be sponsored. Family members receive the same 10-year visa validity, providing long-term security for the entire family." },
      { heading: "Key Benefits", content: "10-year renewable residence visa\nNo requirement to live in UAE full-time\n100% business ownership on UAE mainland\nNo personal income tax\nAccess to UAE banking and financial services\nSponsor family members for 10 years\nSponsor unlimited domestic helpers\nEasy travel to GCC countries\nProperty ownership rights\nChildren can attend UAE schools and universities" },
      { heading: "Costs Involved", content: "Application Fee: AED 3,800 - 4,800\nMedical Test: AED 300 - 700\nEmirates ID: AED 500 - 1,000\nProperty Valuation: AED 2,500 - 3,500\nInsurance: Varies by age and coverage\nPRO/Agent Fee: AED 1,500 - 3,000 (optional)\nTotal estimated: AED 8,000 - 13,000" },
    ],
    checklist: [
      "Confirm property value is AED 2M+",
      "Ensure property is in freehold area",
      "Get property valuation certificate",
      "Gather passport and photo documents",
      "Complete medical fitness test in UAE",
      "Submit application through ICP portal",
      "Pay all required fees",
      "Track application status online",
      "Collect Emirates ID upon approval",
    ],
  },
  "roi-report": {
    title: "Dubai Investment ROI Report",
    description: "Comprehensive analysis of ROI by area, developer, and property type. Data-driven insights for maximizing your investment returns.",
    readTime: "22 min",
    pages: 32,
    updated: "July 2025",
    sections: [
      { heading: "Overview: Dubai's Investment Landscape", content: "Dubai's real estate market has demonstrated remarkable resilience and growth. In 2024, the market recorded over AED 500 billion in transactions, with foreign investment accounting for 35% of all purchases. The emirate's strategic location, tax-free environment, and world-class infrastructure continue to attract global investors seeking diversification and strong returns." },
      { heading: "Rental Yield Analysis by Area", content: "JVC/JVT: 8-10% average yield (affordable, high tenant demand)\nDubai Silicon Oasis: 8-9% (technology hub, young professionals)\nDubai Sports City: 7-9% (sports amenities, growing community)\nInternational City: 7-8% (budget-friendly, high occupancy)\nDubai Marina: 6-8% (premium location, stable returns)\nDowntown Dubai: 5-7% (luxury segment, capital appreciation focus)\nPalm Jumeirah: 4-6% (ultra-luxury, appreciation-driven)\nBusiness Bay: 6-7% (central, corporate tenants)" },
      { heading: "Capital Appreciation Trends", content: "Over the past 5 years, Dubai property values have appreciated significantly:\nPalm Jebel Ali: 40-60% (new development premium)\nDubai Hills: 35-50% (established community growth)\nDowntown Dubai: 25-35% (limited supply, high demand)\nDubai Marina: 20-30% (mature market, steady growth)\nBusiness Bay: 25-40% (commercial hub expansion)\nDubai South: 30-45% (infrastructure development)\nKey drivers: population growth (3% annually), limited new supply in prime areas, and Expo 2020 legacy effects." },
      { heading: "Off-Plan vs Ready: Which is Better?", content: "Off-Plan Properties:\nLower entry prices (10-20% below ready)\nFlexible payment plans (post-handover options)\nHigher capital appreciation potential\nModern designs and amenities\nRisk: construction delays, market changes\n\nReady Properties:\nImmediate rental income\nPhysical inspection before purchase\nNo construction risk\nCan secure mortgage immediately\nHigher upfront cost\n\nBest Strategy: Mix both for balanced portfolio. Off-plan for capital growth, ready for immediate income." },
      { heading: "Best Property Types for ROI", content: "Studios: Highest yield (8-11%), popular with young professionals\n1-Bedroom: Strong demand, 7-9% yield, good liquidity\n2-Bedroom: Family demand, 6-8% yield, stable returns\n3-Bedroom Villas: Premium tenants, 5-7% yield, high appreciation\nCommercial: 7-9% yield, long leases, professional tenants\nHotel Apartments: 6-8% yield, managed, hassle-free" },
      { heading: "Top Developers by ROI Track Record", content: "Emaar: Premium locations, strong resale, 15-25% appreciation\nDamac: Affordable luxury, high yields, popular with investors\nNakheel: Waterfront specialist, unique projects\nSobha: Quality construction, timely delivery, premium pricing\nAzizi: Affordable entry, high yields, fast-selling\nBinghatti: Innovative designs, competitive pricing\nDanube: Value segment, high occupancy rates" },
      { heading: "Tax Benefits for Investors", content: "Dubai offers one of the world's most tax-friendly environments:\nZero property tax (no annual property tax)\nZero capital gains tax\nZero income tax on rental income\nZero inheritance tax\n4% one-time DLD fee only\nCorporate tax only applies to UAE companies (9% above AED 375K)\nNo withholding tax on repatriated funds\nThis makes Dubai significantly more attractive than London (Stamp Duty + CGT), New York (Property Tax + Income Tax), and Singapore (ABSD + Property Tax)." },
      { heading: "Market Outlook 2025-2027", content: "Industry forecasts predict continued growth:\nPopulation projected to reach 5.8 million by 2027\n50,000+ new residential units annually\nInfrastructure investment: AED 40 billion pipeline\nAl Maktoum Airport expansion will boost Dubai South\nTourism target: 25 million visitors by 2025\nBusiness relocation trend continues post-COVID\nCrypto-friendly regulations attracting new wealth\nPredicted growth: 5-10% annually in prime areas, 8-15% in emerging areas." },
    ],
    checklist: [
      "Define investment goals (yield vs appreciation)",
      "Set budget including all transaction costs",
      "Research areas with highest rental yields",
      "Verify developer track record and delivery history",
      "Calculate net yield after service charges",
      "Plan for 6-month vacancy buffer",
      "Consider currency exchange rates",
      "Set up UAE bank account for rental collection",
      "Engage property management company",
      "Monitor market trends quarterly",
    ],
  },
  "area-guide-top-10": {
    title: "Area Guide: Top 10 Communities",
    description: "Deep dive into Dubai's top investment communities. Price ranges, yields, amenities, and who each area is best for.",
    readTime: "16 min",
    pages: 28,
    updated: "July 2025",
    sections: [
      { heading: "1. Dubai Marina", content: "Dubai Marina is one of the most sought-after waterfront communities. With its stunning skyline, walkable promenade, and proximity to the beach, it attracts young professionals and expat families. Property prices range from AED 1.2M for studios to AED 8M+ for penthouses. Rental yields average 6-8%. The area offers 200+ retail outlets, restaurants, direct Metro access, and is 20 minutes from Downtown. Best for: Premium lifestyle investors, short-term rental operators." },
      { heading: "2. Downtown Dubai", content: "Home to the Burj Khalifa and Dubai Mall, Downtown Dubai is the city's most iconic address. Properties here command premium prices (AED 1.5M - 20M+) and attract high-net-worth individuals. Yields are moderate at 5-7%, but capital appreciation is among the highest. The area offers world-class amenities, entertainment, and is the city's cultural and business hub. Best for: Ultra-high-net-worth investors, luxury segment buyers." },
      { heading: "3. Palm Jumeirah", content: "The world-famous Palm Jumeirah offers beachfront living on man-made islands. Villas range from AED 8M to 50M+, while apartments start at AED 2M. Yields are 4-6%, but the exclusivity and prestige drive strong appreciation. Each property has private beach access, and the community offers 5-star hotels, beach clubs, and fine dining. Best for: Luxury lifestyle buyers, prestige investors." },
      { heading: "4. JVC / JVT", content: "Jumeirah Village Circle and Triangle offer the best value for money in Dubai. Studios from AED 500K, 1-beds from AED 700K, villas from AED 1.5M. Yields are exceptional at 8-10%. The area is family-friendly with parks, schools, supermarkets, and is rapidly developing. Easy access to Dubai Marina (10 mins) and Downtown (20 mins). Best for: First-time investors, yield-focused buyers, budget-conscious families." },
      { heading: "5. Business Bay", content: "Dubai's commercial heart and fastest-growing residential area. Apartments range from AED 800K to 5M+. Yields of 6-7% with strong tenant demand from corporate professionals. The area offers waterfront living along the Dubai Canal, 100+ restaurants, and is 5 minutes from Downtown. Continuous new supply keeps prices competitive. Best for: Young professionals, canal-front lifestyle buyers." },
      { heading: "6. Dubai Hills Estate", content: "A master-planned community by Emaar featuring a championship golf course, Dubai Hills Mall, and premium residences. Apartments from AED 1M, villas from AED 3M. Yields of 6-8% with strong family demand. The community offers top schools, hospitals, parks, and retail. Best for: Family investors, golf enthusiasts, long-term appreciation." },
      { heading: "7. Dubai South", content: "Dubai's emerging district surrounding Al Maktoum International Airport. The most affordable entry point: studios from AED 400K, villas from AED 1.2M. Yields of 7-9% with massive appreciation potential. The Expo 2020 legacy and airport expansion (world's largest by 2030) will drive exponential growth. Best for: Forward-thinking investors, high-growth seekers." },
      { heading: "8. Arabian Ranches", content: "Dubai's premier villa community with a distinctive desert-lodge aesthetic. Villas from AED 2.5M to 15M+. Yields of 5-6% but extremely low vacancy rates. The community offers polo club, golf course, equestrian center, and top schools. It's a self-contained suburban paradise. Best for: Family buyers, villa investors, premium suburban lifestyle." },
      { heading: "9. Dubai Creek Harbour", content: "Emaar's waterfront mega-development featuring the Dubai Creek Tower. Apartments from AED 900K to 5M+. Yields of 6-8% with strong capital appreciation potential. The area offers waterfront promenades, wildlife sanctuary, retail, and cultural district. Best for: Waterfront lifestyle, early-stage appreciation, culture enthusiasts." },
      { heading: "10. Meydan / MBR City", content: "Mohammed Bin Rashid City is Dubai's most ambitious new district. Properties from AED 800K to 10M+. Yields of 6-8%. Home to the Meydan Racecourse, Crystal Lagoon, and Dubai's largest park. The area is rapidly developing with new infrastructure and amenities. Best for: Lagoon lifestyle, sports enthusiasts, growth investors." },
    ],
    checklist: [
      "Visit each shortlisted area in person",
      "Check proximity to Metro and major roads",
      "Verify nearby schools (if family investment)",
      "Research service charges by community",
      "Check upcoming infrastructure projects",
      "Compare rental listings in each area",
      "Verify developer reputation in that area",
      "Consider future supply pipeline",
      "Test commute times to business districts",
      "Review community management quality",
    ],
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides[slug];
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: `${guide.title} | 3G Real Estate`,
    description: guide.description,
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides[slug];

  if (!guide) return notFound();

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      {/* Header */}
      <div className="bg-navy-950 py-12 sm:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <Link href="/" className="text-white/50 text-sm hover:text-gold transition-colors flex items-center gap-1 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-gold" />
            <span className="text-gold text-sm font-medium">Investor Guide</span>
          </div>
          <h1 className="heading-lg text-white text-2xl sm:text-3xl lg:text-4xl max-w-3xl mb-4">{guide.title}</h1>
          <p className="text-white/60 max-w-2xl mb-6">{guide.description}</p>
          <div className="flex items-center gap-4 text-sm text-white/40">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{guide.readTime} read</span>
            <span>{guide.pages} pages</span>
            <span>Updated: {guide.updated}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Sections */}
          <div className="space-y-10">
            {guide.sections.map((section, i) => (
              <div key={i} className="border-b border-gray-100 pb-10 last:border-0">
                <h2 className="font-serif text-xl text-navy-950 mb-4">{section.heading}</h2>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</div>
              </div>
            ))}
          </div>

          {/* Checklist */}
          <div className="mt-12 p-6 sm:p-8 bg-navy-50 rounded-xl border border-navy-100">
            <h3 className="font-serif text-lg text-navy-950 mb-6 flex items-center gap-2">
              <Download className="w-5 h-5 text-gold" />
              Action Checklist
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {guide.checklist.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-navy-800 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center p-8 bg-gray-50 rounded-xl">
            <h3 className="font-serif text-xl text-navy-950 mb-3">Ready to Invest in Dubai?</h3>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">Our property experts can help you find the perfect investment. Book a free consultation today.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/properties" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors">
                Browse Properties
              </Link>
              <a href="https://wa.me/971563867270" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-navy-200 text-navy-800 font-medium rounded-lg hover:bg-navy-50 transition-colors">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
