"use client";

import { useState } from "react";
import { Heart, Share2, Download, FileText, X } from "lucide-react";
import { CompareButton } from "./CompareButton";
import type { Property } from "@/types";

interface PropertyActionsProps {
  property: Property;
}

export function PropertyActions({ property }: PropertyActionsProps) {
  const [liked, setLiked] = useState(false);
  const [showDownload, setShowDownload] = useState<"brochure" | "floorplan" | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleShare = async () => {
    const url = `https://3guae.com/property/${property.slug}`;
    if (navigator.share) {
      await navigator.share({ title: property.title, text: property.description || "", url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage for now
    const requests = JSON.parse(localStorage.getItem("3g_download_requests") || "[]");
    requests.push({
      type: showDownload,
      property: property.title,
      ...form,
      date: new Date().toISOString(),
    });
    localStorage.setItem("3g_download_requests", JSON.stringify(requests));
    setSubmitted(true);
    setTimeout(() => {
      setShowDownload(null);
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "" });
    }, 2000);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-6">
        <CompareButton property={property} variant="detail" />

        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
            liked
              ? "border-red-200 bg-red-50 text-red-600"
              : "border-gray-200 text-gray-600 hover:border-red-200 hover:bg-red-50"
          }`}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          {liked ? "Saved" : "Save"}
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:border-navy-300 hover:bg-navy-50 text-sm font-medium transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>

        <button
          onClick={() => setShowDownload("brochure")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:border-navy-300 hover:bg-navy-50 text-sm font-medium transition-colors"
        >
          <FileText className="w-4 h-4" />
          Brochure
        </button>

        <button
          onClick={() => setShowDownload("floorplan")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:border-navy-300 hover:bg-navy-50 text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          Floorplan
        </button>
      </div>

      {/* Download Modal */}
      {showDownload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowDownload(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-navy-950 mb-2">Request Submitted!</h3>
                <p className="text-gray-500 text-sm">Our team will send you the {showDownload} shortly.</p>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-xl text-navy-950 mb-1">
                  Download {showDownload === "brochure" ? "Brochure" : "Floorplan"}
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Fill in your details and we&apos;ll send the {showDownload} for {property.title} to your email.
                </p>
                <form onSubmit={handleDownloadSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-800"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-800"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-navy-800"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-navy-800 text-white font-semibold rounded-lg hover:bg-navy-700 transition-colors"
                  >
                    Request {showDownload === "brochure" ? "Brochure" : "Floorplan"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
