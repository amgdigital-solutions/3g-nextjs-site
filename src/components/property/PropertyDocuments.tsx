"use client";

import { useState } from "react";
import { FileText, Download, X, User, Mail, Phone, Send } from "lucide-react";

interface PropertyDocumentsProps {
  propertyTitle: string;
}

export function PropertyDocuments({ propertyTitle }: PropertyDocumentsProps) {
  const [showForm, setShowForm] = useState<"floorplan" | "brochure" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to the admin panel's download requests section
    console.log("Download request:", {
      type: showForm,
      property: propertyTitle,
      ...formData,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(null);
      setFormData({ name: "", email: "", phone: "" });
    }, 3000);
  };

  return (
    <div className="mb-8">
      {/* Dark navy card */}
      <div className="bg-navy-900 rounded-2xl p-6 sm:p-8">
        <h2 className="font-serif text-xl text-white mb-2">Property Documents</h2>
        <p className="text-white/50 text-sm mb-6">Download official documents for this property</p>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Download Floor Plan */}
          <button
            onClick={() => setShowForm("floorplan")}
            className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group text-left"
          >
            <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium text-sm">Download Floor Plan</div>
              <div className="text-white/40 text-xs">View layout & dimensions</div>
            </div>
            <Download className="w-5 h-5 text-white/30 group-hover:text-gold transition-colors flex-shrink-0" />
          </button>

          {/* Download Brochure */}
          <button
            onClick={() => setShowForm("brochure")}
            className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group text-left"
          >
            <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium text-sm">Download Brochure</div>
              <div className="text-white/40 text-xs">Full property details</div>
            </div>
            <Download className="w-5 h-5 text-white/30 group-hover:text-gold transition-colors flex-shrink-0" />
          </button>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h3 className="font-semibold text-navy-950">
                  {showForm === "floorplan" ? "Download Floor Plan" : "Download Brochure"}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{propertyTitle}</p>
              </div>
              <button
                onClick={() => setShowForm(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Form */}
            {submitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-7 h-7 text-green-600" />
                </div>
                <h4 className="font-semibold text-navy-950 mb-2">Request Submitted!</h4>
                <p className="text-sm text-gray-500">
                  We&apos;ll send the {showForm === "floorplan" ? "floor plan" : "brochure"} to your email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <p className="text-sm text-gray-500 mb-4">
                  Fill in your details to receive the{" "}
                  {showForm === "floorplan" ? "floor plan" : "brochure"}.
                </p>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 XX XXX XXXX"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-800/20 focus:border-navy-800"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-navy-800 text-white font-medium rounded-lg hover:bg-navy-700 transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Request
                </button>
                <p className="text-[10px] text-gray-400 text-center">
                  Your request will appear in the admin panel under Download Requests.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
