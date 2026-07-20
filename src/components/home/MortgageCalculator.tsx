"use client";

import { useState, useMemo } from "react";
import { Calculator, CalendarDays } from "lucide-react";

export function MortgageCalculator() {
  const [propertyValue, setPropertyValue] = useState(2000000);
  const [downPaymentPct, setDownPaymentPct] = useState(25);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanYears, setLoanYears] = useState(25);

  const results = useMemo(() => {
    const downPayment = propertyValue * (downPaymentPct / 100);
    const loanAmount = propertyValue - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanYears * 12;
    const monthlyPayment =
      monthlyRate > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1)
        : loanAmount / numPayments;
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - loanAmount;
    return { downPayment, loanAmount, monthlyPayment, totalPayment, totalInterest };
  }, [propertyValue, downPaymentPct, interestRate, loanYears]);

  const dtiRatios = [
    { label: "Conservative", pct: 25, color: "text-green-600", bg: "bg-green-50", bar: "bg-green-500" },
    { label: "Moderate", pct: 35, color: "text-amber-600", bg: "bg-amber-50", bar: "bg-amber-500" },
    { label: "Maximum", pct: 50, color: "text-red-600", bg: "bg-red-50", bar: "bg-red-500" },
  ];

  return (
    <section id="mortgage-calculator" className="py-20 sm:py-28 bg-navy-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="label-gold mb-4 block">Financial Planning</span>
            <h2 className="heading-md text-white mb-4">
              Mortgage <span className="text-gold">Calculator</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Estimate your monthly mortgage payments and explore financing options for your Dubai property
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Inputs */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
              <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-gold" />
                Loan Details
              </h3>

              <div className="space-y-6">
                <MortgageSlider label="Property Value" value={propertyValue} min={500000} max={20000000} step={100000} format={(v) => `AED ${(v / 1000000).toFixed(2)}M`} onChange={setPropertyValue} />
                <MortgageSlider label="Down Payment" value={downPaymentPct} min={10} max={50} step={5} format={(v) => `${v}%`} onChange={setDownPaymentPct} sub={`AED ${(results.downPayment / 1000000).toFixed(2)}M`} />
                <MortgageSlider label="Interest Rate" value={interestRate} min={1} max={15} step={0.25} format={(v) => `${v}%`} onChange={setInterestRate} />
                <MortgageSlider label="Loan Term" value={loanYears} min={5} max={30} step={1} format={(v) => `${v} Years`} onChange={setLoanYears} />
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <div className="bg-gold rounded-2xl p-6 text-navy-900">
                <div className="text-sm text-navy-800/60 mb-1">Monthly Payment</div>
                <div className="font-serif text-3xl font-semibold">AED {Math.round(results.monthlyPayment).toLocaleString()}</div>
                <div className="text-xs text-navy-800/60 mt-1">Principal + Interest</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-white/50">Loan Amount</span><span className="text-white font-medium">AED {Math.round(results.loanAmount).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Down Payment</span><span className="text-white font-medium">AED {Math.round(results.downPayment).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Total Interest</span><span className="text-white font-medium">AED {Math.round(results.totalInterest).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Total Payment</span><span className="text-white font-medium">AED {Math.round(results.totalPayment).toLocaleString()}</span></div>
                <div className="flex justify-between border-t border-white/10 pt-2"><span className="text-white/50 flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" />Payoff Date</span><span className="text-gold font-medium">{new Date(Date.now() + loanYears * 365 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span></div>
              </div>

              {/* DTI */}
              <div className="space-y-3">
                <h4 className="text-sm text-white/60">Debt-to-Income Required</h4>
                {dtiRatios.map((d) => (
                  <div key={d.label} className={`${d.bg} rounded-xl p-3`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${d.color}`}>{d.label} ({d.pct}%)</span>
                      <span className={`text-sm font-semibold ${d.color}`}>AED {Math.round(results.monthlyPayment / (d.pct / 100)).toLocaleString()}/mo income</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${d.bar} rounded-full`} style={{ width: `${d.pct * 2}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MortgageSlider({ label, value, min, max, step, format, onChange, sub }: { label: string; value: number; min: number; max: number; step: number; format: (v: number) => string; onChange: (v: number) => void; sub?: string }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm text-white/70">{label}</label>
        <div className="text-right">
          <span className="text-sm font-semibold text-white">{format(value)}</span>
          {sub && <span className="block text-xs text-white/40">{sub}</span>}
        </div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-gold h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer" />
    </div>
  );
}
