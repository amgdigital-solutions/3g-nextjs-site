import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPropertyBySlug, getAllCommunities, getAllProperties } from "@/lib/supabase/server";
import { PropertyJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { PropertyActions } from "@/components/property/PropertyActions";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyDocuments } from "@/components/property/PropertyDocuments";
import { InvestmentPotential } from "@/components/property/InvestmentPotential";
import { PropertyTimeline } from "@/components/property/PropertyTimeline";
import { PaymentPlan } from "@/components/property/PaymentPlan";
import { SimilarProperties } from "@/components/property/SimilarProperties";
import { ScheduleViewingButton } from "@/components/property/ScheduleViewing";
import { ShareProperty } from "@/components/property/ShareProperty";
import { MobileContactBar } from "@/components/property/MobileContactBar";
import { formatPrice } from "@/lib/utils";
import {
  MapPin, Bed, Bath, Square, Phone, Mail, MessageCircle,
  Building2, Check, Calendar, Tag, Home,
  Receipt, ShieldCheck
} from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Property Not Found" };

  return {
    title: property.meta_title || `${property.title} | 3G Real Estate`,
    description: property.meta_description || property.description?.slice(0, 160) || undefined,
    keywords: property.focus_keywords || undefined,
    openGraph: {
      title: property.meta_title || property.title,
      description: property.meta_description || property.description?.slice(0, 200) || undefined,
      images: property.images?.[0] ? [{ url: property.images[0] }] : [],
    },
    alternates: { canonical: `https://3guae.com/property/${property.slug}` },
  };
}

export const revalidate = 300;

// Helper: format bedroom display from new min/max columns
function formatBedrooms(bedsMin: number | null, bedsMax: number | null, legacyText: string): string {
  if (bedsMin === 0 && bedsMax === 0) return "Studio";
  if (bedsMin !== null && bedsMax !== null && bedsMin === bedsMax) return `${bedsMin}`;
  if (bedsMin !== null && bedsMax !== null) return `${bedsMin}-${bedsMax}`;
  if (legacyText && legacyText !== "-" && legacyText.trim() !== "") return legacyText;
  return "N/A";
}

// Helper: format bathroom display from new min/max columns
function formatBathrooms(bathsMin: number | null, bathsMax: number | null, legacyText: string): string {
  if (bathsMin !== null && bathsMax !== null && bathsMin === bathsMax) return `${bathsMin}`;
  if (bathsMin !== null && bathsMax !== null) return `${bathsMin}-${bathsMax}`;
  if (legacyText && legacyText !== "-" && legacyText.trim() !== "") return legacyText;
  return "N/A";
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const [property, communities, allProperties] = await Promise.all([
    getPropertyBySlug(slug),
    getAllCommunities(),
    getAllProperties(),
  ]);

  if (!property) return notFound();

  const images = property.images || [];
  const faqs = property.faqs || [];
  const isSoldOut = property.project_status === "sold";
  const isNewLaunch = property.created_at && (Date.now() - new Date(property.created_at).getTime()) < 30 * 24 * 60 * 60 * 1000;
  const isGoldenVisa = property.golden_visa === true || (property.price !== null && property.price >= 2000000);

  const galleryBadges: { text: string; variant: "new" | "gold" | "visa" | "sale" | "sold" }[] = [];
  if (isNewLaunch) galleryBadges.push({ text: "New Launch", variant: "new" });
  if (isGoldenVisa) galleryBadges.push({ text: "Golden Visa", variant: "visa" });
  if (isSoldOut) galleryBadges.push({ text: "Sold Out", variant: "sold" });

  const propertyCommunity = communities.find(
    c => c.name?.toLowerCase() === property.location?.toLowerCase() ||
         property.location?.toLowerCase().includes(c.name?.toLowerCase() || "")
  );

  const expectedRoi = property.expected_roi || "15-20%";
  const rentalYield = property.rental_yield || "9-11%";
  const paymentPlan = property.payment_plan || "50/50";
  const handoverDate = property.handover_date || (property.created_at
    ? `Q${Math.floor(new Date(property.created_at).getMonth() / 3) + 1} ${new Date(property.created_at).getFullYear() + 2}`
    : "Q4 2026"
  );

  const bedDisplay = formatBedrooms(property.beds_min, property.beds_max, String(property.bedrooms || ""));
  const bathDisplay = formatBathrooms(property.baths_min, property.baths_max, String(property.bathrooms || ""));

  return (
    <div className="min-h-screen bg-white pt-[72px] pb-28 lg:pb-0">
      <PropertyJsonLd property={property} />
      {faqs.length > 0 && <FaqJsonLd faqs={faqs} />}
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://3guae.com/" },
        { name: "Properties", url: "https://3guae.com/properties" },
        { name: property.title, url: `https://3guae.com/property/${property.slug}` },
      ]} />

      <div className="bg-white border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/properties" className="hover:text-navy-800 transition-colors flex items-center gap-1">
              ← Back to Properties
            </Link>
          </nav>
        </div>
      </div>

      <PropertyGallery images={images} title={property.title} badges={galleryBadges} />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6 pb-20">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <MapPin className="w-4 h-4" />
              {property.location || "Dubai"}
              {property.developer_name && (
                <>
                  <span className="text-gray-300">·</span>
                  <Building2 className="w-3.5 h-3.5" />
                  {property.developer_name}
                </>
              )}
            </div>

            <h1 className="heading-lg text-navy-950 text-2xl sm:text-3xl lg:text-4xl mb-3">
              {property.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="font-serif text-2xl sm:text-3xl text-navy-950">
                {property.price ? formatPrice(property.price) : "Price on Request"}
              </span>
              {expectedRoi && (
                <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                  {expectedRoi} Expected ROI
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 border-t border-b border-gray-100 py-5">
              {[
                { icon: Bed, label: "Bedrooms", value: bedDisplay, sub: bedDisplay === "Studio" ? "Studio" : "Bedrooms" },
                { icon: Bath, label: "Bathrooms", value: bathDisplay, sub: "Bathrooms" },
                { icon: Square, label: "Area", value: property.area_sqft ? `${property.area_sqft}+` : "400+", sub: "Sqft" },
                { icon: Calendar, label: "Handover", value: handoverDate, sub: "Handover" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <s.icon className="w-5 h-5 text-navy-800 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-navy-950">{s.value}</div>
                  <div className="text-xs text-gray-400">{s.sub}</div>
                </div>
              ))}
            </div>

            {propertyCommunity && (
              <Link href={`/community/${propertyCommunity.slug}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-8 hover:bg-gray-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-navy-950 text-sm">Explore {propertyCommunity.name}</div>
                    <div className="text-xs text-gray-400">View community info, amenities & nearby attractions</div>
                  </div>
                </div>
                <span className="text-navy-800 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            )}

            {property.description && (
              <div className="mb-8">
                <h2 className="font-serif text-xl text-navy-950 mb-4">About This Project</h2>
                <div className="text-gray-600 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: property.description }} />
              </div>
            )}

            {property.unit_types && property.unit_types.length > 0 && (
              <div className="mb-8">
                <h2 className="font-serif text-xl text-navy-950 mb-4">Available Unit Types</h2>
                <div className="flex flex-wrap gap-2">
                  {property.unit_types.map((unit) => (
                    <span key={unit} className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-navy-900 border border-gray-100">{unit}</span>
                  ))}
                </div>
              </div>
            )}

            {property.amenities && property.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="font-serif text-xl text-navy-950 mb-4">Amenities</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {property.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Check className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className="text-sm text-gray-700">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="font-serif text-xl text-navy-950 mb-4">Key Features</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-xs text-gray-400 mb-1">Theme</div>
                  <div className="text-sm font-medium text-navy-950">{property.theme || property.property_type || "Residential"}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-xs text-gray-400 mb-1">Unique</div>
                  <div className="text-sm font-medium text-navy-950">{property.uniqueness || property.location || "Dubai"}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-xs text-gray-400 mb-1">Price</div>
                  <div className="text-sm font-medium text-navy-950">{property.price_category || (property.price ? "AED " + (property.price / 1000000).toFixed(1) + "M" : "Premium")}</div>
                </div>
              </div>
            </div>

            <PropertyDocuments propertyTitle={property.title} />

            <InvestmentPotential
              expectedRoi={expectedRoi}
              rentalYield={rentalYield}
              price={property.price}
              isGoldenVisa={isGoldenVisa}
            />

            <PaymentPlan plan={paymentPlan} price={property.price} />

            <PropertyTimeline status={property.project_status} handoverDate={handoverDate} />

            {faqs.length > 0 && (
              <div className="mb-8">
                <h2 className="font-serif text-xl text-navy-950 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <h3 className="font-medium text-navy-900 mb-2">{faq.q}</h3>
                      <p className="text-sm text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <h3 className="font-semibold text-navy-950 mb-4">Contact Expert</h3>
              {/* FIX: Use real 3G logo instead of text circle */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 bg-navy-800 rounded-full flex items-center justify-center p-1 overflow-hidden">
                  <Image
                    src="/images/logo-white.png"
                    alt="3G Real Estate"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="font-medium text-navy-950">3G Real Estate</div>
                  <div className="text-xs text-gray-400">Property Consultant</div>
                </div>
              </div>
              <div className="space-y-2.5">
                <a href="tel:+971563867270" className="flex items-center justify-center gap-2 w-full py-3 bg-navy-800 text-white text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <a href="https://wa.me/971563867270" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a href="mailto:info@3guae.com" className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:border-navy-800 transition-colors">
                  <Mail className="w-4 h-4" /> Email
                </a>
              </div>
            </div>

            <MortgageCalculatorSidebar price={property.price || 890000} />

            <div className="p-5 bg-white border border-gray-100 rounded-xl">
              <h3 className="font-semibold text-navy-950 mb-3 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gray-400" />
                RERA Registration
              </h3>
              {property.barcode ? (
                <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/50">
                  {property.barcode.startsWith("http") ? (
                    <div className="relative w-40 h-40 mb-3">
                      <Image
                        src={property.barcode}
                        alt="RERA QR Code"
                        fill
                        className="object-contain"
                        sizes="160px"
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-40 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-xs text-gray-400 text-center px-2">{property.barcode}</span>
                    </div>
                  )}
                  <p className="text-[10px] text-gray-400 text-center">RERA Registration</p>
                </div>
              ) : (
                <div className="border border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center">
                  <Tag className="w-8 h-8 text-gray-300 mb-2" />
                  <p className="text-xs text-gray-400 text-center">RERA registration number not available</p>
                </div>
              )}
            </div>

            <div className="p-5 bg-white border border-gray-100 rounded-xl">
              <h3 className="font-semibold text-navy-950 mb-4 text-sm">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="font-medium text-navy-950">{property.status === "published" ? "Off-Plan" : property.status || "N/A"}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="font-medium text-navy-950">{property.property_type || "N/A"}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Payment Plan</span><span className="font-medium text-navy-950">{paymentPlan}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Handover</span><span className="font-medium text-navy-950">{handoverDate}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Developer</span><span className="font-medium text-navy-950">{property.developer_name || "3G Real Estate"}</span></div>
              </div>
            </div>

            <div className="p-4 bg-white border border-gray-100 rounded-xl">
              <ShareProperty title={property.title} slug={property.slug} />
            </div>

            <Link href="/golden-visa" className="block p-5 bg-navy-800 rounded-xl hover:bg-navy-700 transition-colors group text-center">
              <ShieldCheck className="w-6 h-6 text-gold mx-auto mb-2" />
              <div className="font-semibold text-white text-sm mb-1">Check Your Eligibility</div>
              <div className="text-xs text-white/50">See if you qualify for UAE Golden Visa</div>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-20">
        <SimilarProperties currentProperty={property} allProperties={allProperties} />
      </div>

      <MobileContactBar />

      <ScheduleViewingButton />
    </div>
  );
}

function MortgageCalculatorSidebar({ price }: { price: number }) {
  const propertyPrice = price || 890000;
  const downPaymentPercent = 25;
  const interestRate = 3.7;
  const loanTerm = 25;
  const downPaymentAmount = Math.round(propertyPrice * (downPaymentPercent / 100));
  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;
  const monthlyPayment = Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1));
  const totalInterest = Math.round(monthlyPayment * numPayments - loanAmount);

  return (
    <div className="p-5 bg-white border border-gray-100 rounded-xl">
      <h3 className="font-semibold text-navy-950 mb-4 text-sm flex items-center gap-2">
        <Receipt className="w-4 h-4 text-gray-400" />
        Mortgage Calculator
      </h3>
      <div className="space-y-4">
        <div><div className="text-xs text-gray-400 mb-1">Property Price</div><div className="text-sm font-semibold text-navy-950">AED {propertyPrice.toLocaleString()}</div></div>
        <div>
          <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">Down Payment</span><span className="text-navy-950">{downPaymentPercent}% (AED {downPaymentAmount.toLocaleString()})</span></div>
          <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-navy-800 h-1.5 rounded-full" style={{ width: `${downPaymentPercent}%` }} /></div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">Interest Rate</span><span className="text-navy-950">{interestRate}% p.a.</span></div>
          <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-navy-800 h-1.5 rounded-full" style={{ width: `${(interestRate / 8) * 100}%` }} /></div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">Loan Term</span><span className="text-navy-950">{loanTerm} years</span></div>
          <div className="w-full bg-gray-100 rounded-full h-1.5"><div className="bg-navy-800 h-1.5 rounded-full" style={{ width: `${((loanTerm - 5) / 25) * 100}%` }} /></div>
        </div>
        <div className="border-t border-gray-100 pt-3 space-y-2">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Loan Amount</span><span className="font-semibold text-navy-950">AED {loanAmount.toLocaleString()}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Monthly Payment</span><span className="font-semibold text-navy-950">AED {monthlyPayment.toLocaleString()}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Total Interest</span><span className="font-semibold text-navy-950">AED {totalInterest.toLocaleString()}</span></div>
        </div>
        <p className="text-[10px] text-gray-400">* Estimate based on {interestRate}% p.a. rate. Actual rates may vary (3.4-4.2%).</p>
        <a href="https://wa.me/971563867270" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors">
          <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
