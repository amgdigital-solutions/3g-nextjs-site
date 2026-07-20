"use client";

import { Tag, Shield } from "lucide-react";

interface PropertyBarcodeProps {
  barcode: string;
}

export function PropertyBarcode({ barcode }: PropertyBarcodeProps) {
  return (
    <div className="mb-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
      <h2 className="font-serif text-lg text-navy-950 mb-3 flex items-center gap-2">
        <Shield className="w-5 h-5 text-navy-800" />
        RERA Registration
      </h2>
      <div className="flex items-center gap-4">
        {/* QR Code placeholder - in production this would be a real QR code */}
        <div className="w-24 h-24 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Tag className="w-6 h-6 text-navy-800 mx-auto mb-1" />
            <span className="text-[10px] text-gray-400">RERA QR</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Registration Number</p>
          <p className="font-mono text-lg font-semibold text-navy-950">{barcode}</p>
          <p className="text-xs text-gray-400 mt-1">
            This property is registered with the Dubai Real Estate Regulatory Agency (RERA).
          </p>
        </div>
      </div>
    </div>
  );
}
