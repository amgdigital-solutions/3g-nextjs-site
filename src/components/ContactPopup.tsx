"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare, Check, ChevronRight } from "lucide-react";

type Step = "date" | "time" | "form" | "success";

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
];

export function ContactPopup() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  // Show popup after 10 seconds, once per user
  useEffect(() => {
    const hasSeen = localStorage.getItem("3g_contact_popup_seen");
    if (hasSeen) return;

    const timer = setTimeout(() => {
      setShow(true);
      localStorage.setItem("3g_contact_popup_seen", "true");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setShow(false);
    setStep("date");
    setSelectedDate("");
    setSelectedTime("");
    setFormData({ name: "", email: "", phone: "", message: "" });
  }, []);

  const handleSubmit = () => {
    const requests = JSON.parse(localStorage.getItem("3g_consultation_requests") || "[]");
    requests.push({
      ...formData,
      date: selectedDate,
      time: selectedTime,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem("3g_consultation_requests", JSON.stringify(requests));
    setStep("success");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with glass effect */}
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-xl" onClick={close} />

      {/* Popup Card */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h3 className="text-white font-semibold text-lg">
              {step === "date" && "Schedule a Consultation"}
              {step === "time" && "Select a Time"}
              {step === "form" && "Your Details"}
              {step === "success" && "All Set!"}
            </h3>
            <p className="text-white/50 text-xs mt-0.5">
              {step === "date" && "Pick a date for your free consultation"}
              {step === "time" && `${selectedDate} — Choose your preferred time`}
              {step === "form" && `${selectedDate} at ${selectedTime}`}
              {step === "success" && "We'll contact you shortly"}
            </p>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 bg-white/10 border border-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
          {/* Step 1: Date Selection */}
          {step === "date" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gold mb-3">
                <Calendar className="w-5 h-5" />
                <span className="text-sm font-medium">Select Date</span>
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-gold/50 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50"
              />
              <button
                onClick={() => selectedDate && setStep("time")}
                disabled={!selectedDate}
                className="w-full py-3 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Time Selection */}
          {step === "time" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gold mb-3">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">Select Time</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 px-2 rounded-lg text-xs font-medium transition-all border ${
                      selectedTime === time
                        ? "bg-gold text-navy-900 border-gold"
                        : "bg-white/5 text-white/70 border-white/10 hover:bg-white/15 hover:border-white/30"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("date")}
                  className="flex-1 py-3 border border-white/20 text-white/70 font-medium rounded-xl hover:bg-white/10 transition-colors text-sm"
                >
                  Back
                </button>
                <button
                  onClick={() => selectedTime && setStep("form")}
                  disabled={!selectedTime}
                  className="flex-1 py-3 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Form */}
          {step === "form" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gold mb-1">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm font-medium">Your Information</span>
              </div>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold/50"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold/50"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold/50"
                />
              </div>

              <textarea
                placeholder="Message (optional)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold/50 resize-none"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("time")}
                  className="flex-1 py-3 border border-white/20 text-white/70 font-medium rounded-xl hover:bg-white/10 transition-colors text-sm"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="flex-1 py-3 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Submit <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === "success" && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-gold" />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Consultation Booked!</h4>
              <p className="text-white/50 text-sm mb-1">
                {selectedDate} at {selectedTime}
              </p>
              <p className="text-white/50 text-sm">
                Our team will contact you at {formData.phone}
              </p>
              <button
                onClick={close}
                className="mt-6 px-8 py-3 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Progress dots */}
        {step !== "success" && (
          <div className="flex items-center justify-center gap-2 pb-4">
            {["date", "time", "form"].map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  ["date", "time", "form"].indexOf(step) >= i
                    ? "w-6 bg-gold"
                    : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
