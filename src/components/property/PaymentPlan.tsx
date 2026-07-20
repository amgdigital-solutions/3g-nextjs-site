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
  // Try to extract numbers from the plan text (e.g., "25/75", "10/40/50", "50/50")
  const numbers = plan.match(/\d+/g)?.map(Number);

  if (numbers && numbers.length >= 2) {
    // If we have 3+ numbers, use them directly as 3 installments
    if (numbers.length >= 3) {
      const total = numbers.reduce((a, b) => a + b, 0);
      const scale = total > 0 && total !== 100 ? 100 / total : 1;
      const p1 = Math.round(numbers[0] * scale);
      const p2 = Math.round(numbers[1] * scale);
      const p3 = Math.max(0, 100 - p1 - p2); // ensure sum = 100
      return [
        { milestone: "Booking / Down Payment", percentage: p1, amount: price * (p1 / 100) },
        { milestone: "During Construction", percentage: p2, amount: price * (p2 / 100) },
        { milestone: "On Handover", percentage: p3, amount: price * (p3 / 100) },
      ];
    }

    // 2 numbers: X/Y format (e.g., "25/75")
    const [first, second] = numbers;
    const sum = first + second;

    // If first number is small (< 30), treat as booking payment
    // and split remainder between construction and handover
    if (first < 30) {
      const construction = Math.max(0, 100 - first - second);
      const handover = second;
      return [
        { milestone: "Booking / Down Payment", percentage: first, amount: price * (first / 100) },
        { milestone: "During Construction", percentage: construction, amount: price * (construction / 100) },
        { milestone: "On Handover", percentage: handover, amount: price * (handover / 100) },
      ];
    }

    // If first number is large (>= 30), treat as booking+construction vs handover
    // e.g., "25/75" = 25% booking, 0% construction, 75% handover
    // e.g., "40/60" = 10% booking, 30% construction, 60% handover
    if (first >= 30) {
      const booking = Math.min(first, 10); // cap booking at 10% if large first number
      const construction = first - booking;
      const handover = Math.max(0, 100 - booking - construction);
      return [
        { milestone: "Booking / Down Payment", percentage: booking, amount: price * (booking / 100) },
        { milestone: "During Construction", percentage: construction, amount: price * (construction / 100) },
        { milestone: "On Handover", percentage: handover, amount: price * (handover / 100) },
      ];
    }

    // Generic 2-number fallback
    const booking = first;
    const handover = second;
    const construction = Math.max(0, 100 - booking - handover);
    return [
      { milestone: "Booking / Down Payment", percentage: booking, amount: price * (booking / 100) },
      { milestone: "During Construction", percentage: construction, amount: price * (construction / 100) },
      { milestone: "On Handover", percentage: handover, amount: price * (handover / 100) },
    ];
  }

  // Default: 50/50
  return [
    { milestone: "Booking / Down Payment", percentage: 10, amount: price * 0.10 },
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

      <div className="p-5 bg-navy-900 rounded-xl">
        {/* Visual bar */}
        <div className="flex rounded-lg overflow-hidden mb-5 h-8">
          {installments.map((inst, i) => (
            <div
              key={i}
              className={`flex items-center justify-center text-xs font-semibold ${
                i === 0
                  ? "bg-gold text-navy-900"
                  : i === 1
                  ? "bg-gold/70 text-navy-900"
                  : "bg-white/20 text-white"
              }`}
              style={{ width: `${inst.percentage}%` }}
            >
              {inst.percentage}%
            </div>
          ))}
        </div>

        {/* Milestones */}
        <div className="space-y-3">
          {installments.map((inst, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    i === 0 ? "bg-gold" : i === 1 ? "bg-gold/70" : "bg-white/30"
                  }`}
                />
                <span className="text-sm text-white/80">{inst.milestone}</span>
              </div>
              <span className="text-sm font-semibold text-white">
                AED {(inst.amount / 1000).toFixed(0)}K
              </span>
            </div>
          ))}
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Property Price</span>
              <span className="text-white font-medium">AED {(safePrice / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Down Payment (min)</span>
              <span className="text-white font-medium">AED {(safePrice * 0.1 / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">DLD Fee (4%)</span>
              <span className="text-white font-medium">AED {(safePrice * 0.04).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Registration Fee</span>
              <span className="text-white font-medium">AED 4,000</span>
            </div>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-gold text-sm mt-4 hover:underline"
        >
          <Wallet className="w-4 h-4" />
          {expanded ? "Hide details" : "View full breakdown"}
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
}
