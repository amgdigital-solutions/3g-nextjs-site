"use client";

import { Phone, Mail, MessageCircle } from "lucide-react";

export function MobileContactBar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      {/* Agent Info Row */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-50">
        <div className="flex items-center gap-3">
          {/* 3G Logo */}
          <div className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-serif text-sm font-bold">3G</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-navy-950">3G Real Estate</div>
            <div className="text-[11px] text-gray-400">Licensed Property Broker</div>
          </div>
        </div>
        {/* 3G Verified Badge */}
        <span className="text-[10px] font-semibold text-navy-800 bg-navy-800/8 px-2.5 py-1 rounded-full border border-navy-800/15">
          3G Verified
        </span>
      </div>

      {/* CTA Buttons Row */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <a
          href="mailto:info@3guae.com"
          className="flex items-center justify-center gap-1.5 flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-navy-800 hover:text-navy-800 transition-colors bg-white"
        >
          <Mail className="w-4 h-4" />
          Email
        </a>
        <a
          href="tel:+971563867270"
          className="flex items-center justify-center gap-1.5 flex-1 py-2.5 bg-navy-800 rounded-xl text-sm font-medium text-white hover:bg-navy-700 transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <a
          href="https://wa.me/971563867270"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 flex-1 py-2.5 bg-green-600 rounded-xl text-sm font-medium text-white hover:bg-green-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>

      {/* Safe area spacer for notched phones */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
}
