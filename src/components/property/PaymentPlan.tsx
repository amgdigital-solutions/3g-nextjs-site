"use client";

import { useState } from "react";
import { Wallet, ChevronDown, ChevronUp } from "lucide-react";

interface PaymentPlanProps {
  plan?: string | null;
  price?: number | null;
}

interface Installment {
  milestone: string;
  percentage: number;
  amount: number;
}

function parsePaymentPlan(plan: string, price: number): Installment[] {
  const numbers = plan.match(/\d+/g)?.map(Number);

  if (numbers && numbers.length >= 2) {
    if (numbers.length >= 3) {
      const total = numbers.reduce((a, b) => a + b, 0);
      const scale = total > 0 && total !== 100 ? 100 / total : 1;
      const p1 = Math.round(numbers[0] * scale);
      const p2 = Math.round(numbers[1] * scale);
      const p3 = Math.max(0, 100 - p1 - p2);
      return [
        { milestone: "Booking", percentage: p1, amount: price * (p1 / 100) },
        { milestone: "During Construction", percentage: p2, amount: price * (p2 / 100) },
        { milestone: "On Handover", percentage: p3, amount: price * (p3 / 100) },
      ];
    }

    const [first, second] = numbers;

    if (first < 30) {
      const construction = Math.max(0, 100 - first - second);
      return [
        { milestone: "Booking", percentage: first, amount: price * (first / 100) },
        { milestone: "During Construction", percentage: construction, amount: price * (construction / 100) },
        { milestone: "On Handover", percentage: second, amount: price * (second / 100) },
      ];
    }

    if (first >= 30) {
      const booking = Math.min(first, 10);
      const construction = first - booking;
      const handover = Math.max(0, 100 - booking - construction);
      return [
        { milestone: "Booking", percentage: booking, amount: price * (booking / 100) },
        { milestone: "During Construction", percentage: construction, amount: price * (construction / 100) },
        { milestone: "On Handover", percentage: handover, amount: price * (handover / 100) },
      ];
    }

    return [
      { milestone: "Booking", percentage: first, amount: price * (first / 100) },
      { milestone: "During Construction", percentage: Math.max(0, 100 - first - second), amount: price * (Math.max(0, 100 - first - second) / 100) },
      { milestone: "On Handover", percentage: second, amount: price * (second / 100) },
    ];
  }

  return [
    { milestone: "Booking", percentage: 10, amount: price * 0.10 },
    { milestone: "During Construction", percentage: 40, amount: price * 0.40 },
    { milestone: "On Handover", percentage: 50, amount: price * 0.50 },
  ];
}

export function PaymentPlan({ plan = "50/50", price = 1000000 }: PaymentPlanProps) {
  const [expanded, setExpanded] = useState(false);
  const safePrice = price || 1000000;
  const installments = parsePaymentPlan(plan || "50/50", safePrice);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl text-navy-950">Payment Plan</h2>
        <span className="text-sm font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">{plan}</span>
      </div>

      <div className="bg-navy-900 rounded-xl overflow-hidden">
        {/* Visual bar */}
        <div className="flex h-10 sm:h-12">
          {installments.map((inst, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center text-[10px] sm:text-xs font-bold leading-tight ${
                i === 0
                  ? "bg-gold text-navy-900"
                  : i === 1
                  ? "bg-gold/70 text-navy-900"
                  : "bg-white/15 text-white"
              }`}
              style={{ width: `${inst.percentage}%` }}
            >
              <span>{inst.percentage}%</span>
              <span className="opacity-70 text-[9px] sm:text-[10px] font-normal hidden sm:block">
                {inst.milestone.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>

        {/* Clean Table */}
        <div className="divide-y divide-white/10">
          {installments.map((inst, i) => (
            <div key={i} className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    i === 0 ? "bg-gold" : i === 1 ? "bg-gold/70" : "bg-white/30"
                  }`}
                />
                <span className="text-sm text-white/80">{inst.milestone}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-white">
                  AED {(inst.amount / 1000000).toFixed(2)}M
                </span>
                <span className="text-xs text-white/40 ml-2">({inst.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-white/10 space-y-2">
            {[
              { label: "Property Price", value: `AED ${(safePrice / 1000000).toFixed(2)}M` },
              { label: "Down Payment (min)", value: `AED ${(safePrice * 0.1 / 1000000).toFixed(2)}M` },
              { label: "DLD Fee (4%)", value: `AED ${(safePrice * 0.04).toLocaleString()}` },
              { label: "Registration Fee", value: "AED 4,000" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-white/50">{item.label}</span>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-gold text-sm px-4 sm:px-5 py-3 hover:underline w-full"
        >
          <Wallet className="w-4 h-4" />
          {expanded ? "Hide details" : "View full breakdown"}
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
}
