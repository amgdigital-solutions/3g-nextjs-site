"use client";

import { useState } from "react";
import { Calculator, TrendingUp, PieChart } from "lucide-react";

export function InvestmentCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(2000000);
  const [downPayment, setDownPayment] = useState(20);
  const [annualRent, setAnnualRent] = useState(120000);
  const [annualExpenses, setAnnualExpenses] = useState(15000);
  const [appreciation, setAppreciation] = useState(8);
  const [years, setYears] = useState(5);

  const downPaymentAmount = propertyPrice * (downPayment / 100);
  const loanAmount = propertyPrice - downPaymentAmount;
  const netIncome = annualRent - annualExpenses;
  const rentalYield = (netIncome / propertyPrice) * 100;
  const cashOnCash = (netIncome / downPaymentAmount) * 100;
  const futureValue = propertyPrice * Math.pow(1 + appreciation / 100, years);
  const totalAppreciation = futureValue - propertyPrice;
  const totalRentIncome = netIncome * years;
  const totalReturn = totalAppreciation + totalRentIncome;
  const roi = (totalReturn / downPaymentAmount) * 100;

  return (
    <section id="roi-calculator" className="py-20 sm:py-28 bg-gradient-to-br from-gray-50 to-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="label-gold mb-4 block">Investment Tool</span>
            <h2 className="heading-md text-navy-950 mb-4">
              Property <span className="italic">ROI</span> Calculator
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Estimate your returns on Dubai off-plan property investments. Adjust the values to see your potential ROI.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Inputs */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8">
              <h3 className="font-semibold text-navy-950 mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-navy-800" />
                Investment Details
              </h3>

              <div className="space-y-6">
                <Slider label="Property Price" value={propertyPrice} min={500000} max={20000000} step={100000} format={(v) => `AED ${(v / 1000000).toFixed(2)}M`} onChange={setPropertyPrice} />
                <Slider label="Down Payment" value={downPayment} min={10} max={50} step={5} format={(v) => `${v}%`} onChange={setDownPayment} />
                <Slider label="Annual Rent" value={annualRent} min={20000} max={500000} step={5000} format={(v) => `AED ${(v / 1000).toFixed(0)}K`} onChange={setAnnualRent} />
                <Slider label="Annual Expenses" value={annualExpenses} min={5000} max={100000} step={5000} format={(v) => `AED ${(v / 1000).toFixed(0)}K`} onChange={setAnnualExpenses} />
                <Slider label="Annual Appreciation" value={appreciation} min={1} max={20} step={0.5} format={(v) => `${v}%`} onChange={setAppreciation} />
                <Slider label="Hold Period" value={years} min={1} max={15} step={1} format={(v) => `${v} Years`} onChange={setYears} />
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <ResultCard icon={TrendingUp} label={`${years}-Year ROI`} value={`${roi.toFixed(1)}%`} sub={`AED ${(totalReturn / 1000000).toFixed(2)}M total return`} accent />
              <ResultCard icon={PieChart} label="Rental Yield" value={`${rentalYield.toFixed(1)}%`} sub={`AED ${(netIncome / 1000).toFixed(0)}K net income/year`} />
              <ResultCard icon={Calculator} label="Cash on Cash" value={`${cashOnCash.toFixed(1)}%`} sub={`AED ${(downPaymentAmount / 1000000).toFixed(2)}M invested`} />

              <div className="bg-navy-800 rounded-xl p-6 text-white">
                <h4 className="text-sm text-white/60 mb-3">Projected Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-white/60">Property Appreciation</span><span className="font-medium">AED {(totalAppreciation / 1000000).toFixed(2)}M</span></div>
                  <div className="flex justify-between"><span className="text-white/60">Rental Income ({years}y)</span><span className="font-medium">AED {(totalRentIncome / 1000000).toFixed(2)}M</span></div>
                  <div className="flex justify-between"><span className="text-white/60">Future Property Value</span><span className="font-medium">AED {(futureValue / 1000000).toFixed(2)}M</span></div>
                  <div className="border-t border-white/10 pt-2 flex justify-between"><span className="text-gold">Total Return</span><span className="font-semibold text-gold">AED {(totalReturn / 1000000).toFixed(2)}M</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, step, format, onChange }: { label: string; value: number; min: number; max: number; step: number; format: (v: number) => string; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-gray-600">{label}</label>
        <span className="text-sm font-semibold text-navy-950">{format(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-navy-800 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
    </div>
  );
}

function ResultCard({ icon: Icon, label, value, sub, accent }: { icon: React.ElementType; label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div className={`p-5 rounded-xl border ${accent ? "bg-navy-800 border-navy-700 text-white" : "bg-white border-gray-100"}`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`w-5 h-5 ${accent ? "text-gold" : "text-navy-800"}`} />
        <span className={`text-sm ${accent ? "text-white/60" : "text-gray-500"}`}>{label}</span>
      </div>
      <div className={`font-serif text-2xl ${accent ? "text-gold" : "text-navy-950"}`}>{value}</div>
      <div className={`text-xs mt-1 ${accent ? "text-white/50" : "text-gray-400"}`}>{sub}</div>
    </div>
  );
}
