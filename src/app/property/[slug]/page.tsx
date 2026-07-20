import { notFound } from "next/navigation";
import Link from "next/link";
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

  // Build gallery badges
  const galleryBadges: { text: string; variant: "new" | "gold" | "visa" | "sale" | "sold" }[] = [];
  if (isNewLaunch) galleryBadges.push({ text: "New Launch", variant: "new" });
  if (isGoldenVisa) galleryBadges.push({ text: "Golden Visa", variant: "visa" });
  if (isSoldOut) galleryBadges.push({ text: "Sold Out", variant: "sold" });

  // Find community for this property
  const propertyCommunity = communities.find(
    c => c.name?.toLowerCase() === property.location?.toLowerCase() ||
         property.location?.toLowerCase().includes(c.name?.toLowerCase() || "")
  );

  // Investment metrics (use property data or defaults)
  const expectedRoi = property.expected_roi || "15-20%";
  const rentalYield = property.rental_yield || "9-11%";
  const paymentPlan = property.payment_plan || "50/50";
  const handoverDate = property.handover_date || (property.created_at
    ? `Q${Math.floor(new Date(property.created_at).getMonth() / 3) + 1} ${new Date(property.created_at).getFullYear() + 2}`
    : "Q4 2026"
  );

  return (
    <div className="min-h-screen bg-white pt-[72px]">
      <PropertyJsonLd property={property} />
      {faqs.length > 0 && <FaqJsonLd faqs={faqs} />}
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "https://3guae.com/" },
        { name: "Properties", url: "https://3guae.com/properties" },
        { name: property.title, url: `https://3guae.com/property/${property.slug}` },
      ]} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/properties" className="hover:text-navy-800 transition-colors flex items-center gap-1">
              ← Back to Properties
            </Link>
          </nav>
        </div>
      </div>

      {/* Gallery with Badges */}
      <PropertyGallery
        images={images}
        title={property.title}
        badges={galleryBadges}
      />

      {/* Content */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6 pb-20">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Left: Details */}
          <div>
            {/* Location + Developer */}
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

            {/* Title */}
            <h1 className="heading-lg text-navy-950 text-2xl sm:text-3xl lg:text-4xl mb-3">
              {property.title}
            </h1>

            {/* Price + ROI */}
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

            {/* Quick Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 border-t border-b border-gray-100 py-5">
              {[
                {
                  icon: Bed,
                  label: "Bedrooms",
                  value: property.bedrooms ? `${property.bedrooms}` : "Studio",
                  sub: property.bedrooms && property.bedrooms >= 3 ? `${property.bedrooms}` : property.bedrooms ? `${property.bedrooms}` : "Studio"
                },
                {
                  icon: Bath,
                  label: "Bathrooms",
                  value: property.bathrooms ? `1-${property.bathrooms}` : "1-2",
                  sub: "Bathrooms"
                },
                {
                  icon: Square,
                  label: "Area",
                  value: property.area_sqft ? `${property.area_sqft}+` : "400+",
                  sub: "Sqft"
                },
                {
                  icon: Calendar,
                  label: "Handover",
                  value: handoverDate,
                  sub: "Handover"
                },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <s.icon className="w-5 h-5 text-navy-800 mx-auto mb-2" />
                  <div className="text-sm font-semibold text-navy-950">{s.value}</div>
                  <div className="text-xs text-gray-400">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Explore Community Card */}
            {propertyCommunity && (
              <Link
                href={`/community/${propertyCommunity.slug}`}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-8 hover:bg-gray-100 transition-colors group"
              >
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

            {/* Description */}
            {property.description && (
              <div className="mb-8">
                <h2 className="font-serif text-xl text-navy-950 mb-4">About This Project</h2>
                <div
                  className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: property.description }}
                />
              </div>
            )}

            {/* Unit Types (if available) */}
            {property.unit_types && property.unit_types.length > 0 && (
              <div className="mb-8">
                <h2 className="font-serif text-xl text-navy-950 mb-4">Available Unit Types</h2>
                <div className="flex flex-wrap gap-2">
                  {property.unit_types.map((unit) => (
                    <span
                      key={unit}
                      className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-navy-900 border border-gray-100"
                    >
                      {unit}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
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

            {/* Key Features - Always show with property defaults */}
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

            {/* Property Documents */}
            <PropertyDocuments propertyTitle={property.title} />

            {/* Investment Potential */}
            <InvestmentPotential
              expectedRoi={expectedRoi}
              rentalYield={rentalYield}
              paymentPlan={paymentPlan}
              isGoldenVisa={isGoldenVisa}
            />

            {/* Payment Plan Visualizer */}
            <PaymentPlan plan={paymentPlan} price={property.price} />

            {/* Property Status Timeline */}
            <PropertyTimeline status={property.project_status} handoverDate={handoverDate} />

            {/* FAQs */}
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

          {/* Right: Sidebar */}
          <div className="space-y-5">
            {/* Agent Card */}
            <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <h3 className="font-semibold text-navy-950 mb-4">Contact Expert</h3>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 bg-navy-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-serif text-lg font-bold">3G</span>
                </div>
                <div>
                  <div className="font-medium text-navy-950">3G Real Estate</div>
                  <div className="text-xs text-gray-400">Property Consultant</div>
                </div>
              </div>
              <div className="space-y-2.5">
                <a
                  href="tel:+971563867270"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-navy-800 text-white text-sm font-medium rounded-lg hover:bg-navy-700 transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <a
                  href="https://wa.me/971563867270"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a
                  href="mailto:info@3guae.com"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:border-navy-800 transition-colors"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
              </div>
            </div>

            {/* Mortgage Calculator */}
            <MortgageCalculatorSidebar price={property.price || 890000} />

            {/* RERA Registration */}
            <div className="p-5 bg-white border border-gray-100 rounded-xl">
              <h3 className="font-semibold text-navy-950 mb-3 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gray-400" />
                RERA Registration
              </h3>
              {property.barcode ? (
                <div className="border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50/50">
                  {/* QR Code placeholder - perfect square for real QR code */}
                  <div className="w-40 h-40 bg-white border border-gray-200 rounded-lg flex items-center justify-center mb-3">
                    <svg viewBox="0 0 100 100" className="w-36 h-36 text-gray-300">
                      {/* QR code pattern - 3 corner markers */}
                      <rect x="8" y="8" width="28" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
                      <rect x="12" y="12" width="20" height="20" rx="1" fill="currentColor" />
                      <rect x="64" y="8" width="28" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
                      <rect x="68" y="12" width="20" height="20" rx="1" fill="currentColor" />
                      <rect x="8" y="64" width="28" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
                      <rect x="12" y="68" width="20" height="20" rx="1" fill="currentColor" />
                      {/* Center pattern */}
                      <rect x="44" y="44" width="12" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="3" />
                      <rect x="47" y="47" width="6" height="6" rx="1" fill="currentColor" opacity="0.5" />
                      {/* Data modules */}
                      <rect x="40" y="8" width="4" height="4" fill="currentColor" opacity="0.6" />
                      <rect x="48" y="8" width="4" height="4" fill="currentColor" opacity="0.4" />
                      <rect x="40" y="16" width="4" height="4" fill="currentColor" opacity="0.5" />
                      <rect x="56" y="12" width="4" height="4" fill="currentColor" opacity="0.6" />
                      <rect x="64" y="44" width="4" height="4" fill="currentColor" opacity="0.5" />
                      <rect x="72" y="48" width="4" height="4" fill="currentColor" opacity="0.4" />
                      <rect x="80" y="44" width="4" height="4" fill="currentColor" opacity="0.6" />
                      <rect x="64" y="56" width="4" height="4" fill="currentColor" opacity="0.5" />
                      <rect x="72" y="64" width="4" height="4" fill="currentColor" opacity="0.4" />
                      <rect x="80" y="60" width="4" height="4" fill="currentColor" opacity="0.6" />
                      <rect x="88" y="64" width="4" height="4" fill="currentColor" opacity="0.5" />
                      <rect x="40" y="64" width="4" height="4" fill="currentColor" opacity="0.4" />
                      <rect x="48" y="72" width="4" height="4" fill="currentColor" opacity="0.6" />
                      <rect x="56" y="68" width="4" height="4" fill="currentColor" opacity="0.5" />
                      <rect x="44" y="80" width="4" height="4" fill="currentColor" opacity="0.4" />
                      <rect x="56" y="88" width="4" height="4" fill="currentColor" opacity="0.6" />
                      <rect x="8" y="44" width="4" height="4" fill="currentColor" opacity="0.5" />
                      <rect x="16" y="48" width="4" height="4" fill="currentColor" opacity="0.4" />
                      <rect x="24" y="44" width="4" height="4" fill="currentColor" opacity="0.6" />
                      <rect x="16" y="56" width="4" height="4" fill="currentColor" opacity="0.5" />
                      <rect x="28" y="60" width="4" height="4" fill="currentColor" opacity="0.4" />
                      <rect x="8" y="60" width="4" height="4" fill="currentColor" opacity="0.6" />
                    </svg>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center">
                    QR Code will appear here once uploaded from admin panel
                  </p>
                  <p className="text-[9px] text-gray-300 mt-0.5 font-mono">{property.barcode}</p>
                </div>
              ) : (
                <div className="border border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center">
                  <Tag className="w-8 h-8 text-gray-300 mb-2" />
                  <p className="text-xs text-gray-400 text-center">
                    RERA registration number not available
                  </p>
                </div>
              )}
            </div>

            {/* Quick Info */}
            <div className="p-5 bg-white border border-gray-100 rounded-xl">
              <h3 className="font-semibold text-navy-950 mb-4 text-sm">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium text-navy-950">{property.status === "published" ? "Off-Plan" : property.status || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-navy-950">{property.property_type || "N/A"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Payment Plan</span>
                  <span className="font-medium text-navy-950">{paymentPlan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Handover</span>
                  <span className="font-medium text-navy-950">{handoverDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Developer</span>
                  <span className="font-medium text-navy-950">{property.developer_name || "3G Real Estate"}</span>
                </div>
              </div>
            </div>

            {/* Share Property */}
            <div className="p-4 bg-white border border-gray-100 rounded-xl">
              <ShareProperty title={property.title} slug={property.slug} />
            </div>

            {/* Golden Visa Eligibility Check */}
            <Link
              href="/golden-visa"
              className="block p-5 bg-navy-800 rounded-xl hover:bg-navy-700 transition-colors group text-center"
            >
              <ShieldCheck className="w-6 h-6 text-gold mx-auto mb-2" />
              <div className="font-semibold text-white text-sm mb-1">Check Your Eligibility</div>
              <div className="text-xs text-white/50">See if you qualify for UAE Golden Visa</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Similar Properties - Full Width */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-20">
        <SimilarProperties currentProperty={property} allProperties={allProperties} />
      </div>

      {/* Floating Schedule Viewing Button */}
      <ScheduleViewingButton />
    </div>
  );
}

// ─── Mortgage Calculator Sidebar Component ───

function MortgageCalculatorSidebar({ price }: { price: number }) {
  const propertyPrice = price || 890000;
  const downPaymentPercent = 25;
  const interestRate = 6.5;
  const loanTerm = 25;

  const downPaymentAmount = Math.round(propertyPrice * (downPaymentPercent / 100));
  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;
  const monthlyPayment = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
  const totalInterest = Math.round(monthlyPayment * numPayments - loanAmount);

  return (
    <div className="p-5 bg-white border border-gray-100 rounded-xl">
      <h3 className="font-semibold text-navy-950 mb-4 text-sm flex items-center gap-2">
        <Receipt className="w-4 h-4 text-gray-400" />
        Mortgage Calculator
      </h3>
      <div className="space-y-4">
        <div>
          <div className="text-xs text-gray-400 mb-1">Property Price</div>
          <div className="text-sm font-semibold text-navy-950">AED {propertyPrice.toLocaleString()}</div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Down Payment</span>
            <span className="text-navy-950">{downPaymentPercent}% (AED {downPaymentAmount.toLocaleString()})</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-navy-800 h-1.5 rounded-full" style={{ width: `${downPaymentPercent}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
            <span>20%</span>
            <span>50%</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Interest Rate</span>
            <span className="text-navy-950">{interestRate}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-navy-800 h-1.5 rounded-full" style={{ width: `${((interestRate - 3) / 7) * 100}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
            <span>3%</span>
            <span>10%</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Loan Term</span>
            <span className="text-navy-950">{loanTerm} years</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-navy-800 h-1.5 rounded-full" style={{ width: `${((loanTerm - 5) / 25) * 100}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
            <span>5 yrs</span>
            <span>30 yrs</span>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Loan Amount</span>
            <span className="font-semibold text-navy-950">AED {loanAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Monthly Payment</span>
            <span className="font-semibold text-navy-950">AED {monthlyPayment.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Interest</span>
            <span className="font-semibold text-navy-950">AED {totalInterest.toLocaleString()}</span>
          </div>
        </div>
        <p className="text-[10px] text-gray-400">
          * This is an estimate. Actual rates may vary. Contact us for pre-approval.
        </p>
        <a
          href="https://wa.me/971563867270"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
