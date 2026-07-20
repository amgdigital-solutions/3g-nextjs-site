"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Calendar, X, Clock, ChevronLeft, ChevronRight, User, Mail, Phone, Send, CheckCircle } from "lucide-react";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function ScheduleViewingButton() {
  const [open, setOpen] = useState(false);

  // Auto-show after 10 seconds, once per user
  useEffect(() => {
    const hasSeen = localStorage.getItem("3g_consultation_seen");
    if (hasSeen) return;

    const timer = setTimeout(() => {
      setOpen(true);
      localStorage.setItem("3g_consultation_seen", "true");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-3.5 bg-navy-800 text-white font-semibold rounded-full shadow-2xl hover:bg-navy-700 transition-all hover:scale-105 whitespace-nowrap text-sm sm:text-base h-10 sm:h-auto"
      >
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
        Schedule Meeting
      </button>

      {open && <ConsultationModal onClose={() => setOpen(false)} />}
    </>
  );
}

// ─── Full Calendar Modal ───

function ConsultationModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"date" | "time" | "form" | "success">("date");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  // Calendar state
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handleSubmit = () => {
    console.log("Consultation booked:", { date: selectedDate, time: selectedTime, ...formData });
    setStep("success");
  };

  const close = useCallback(() => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStep("date");
      setSelectedDate("");
      setSelectedTime("");
      setFormData({ name: "", email: "", phone: "" });
      setCurrentMonth(today.getMonth());
      setCurrentYear(today.getFullYear());
    }, 300);
  }, [onClose, today]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDayOfWeek = firstDay.getDay(); // 0 = Sunday
    const daysInMonth = lastDay.getDate();

    const days: { date: number; value: string; isToday: boolean; isPast: boolean; isSelected: boolean }[] = [];

    // Empty slots for days before the 1st
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ date: 0, value: "", isToday: false, isPast: true, isSelected: false });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const dateObj = new Date(currentYear, currentMonth, d);
      const isToday = dateObj.toDateString() === today.toDateString();
      const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isSelected = dateStr === selectedDate;

      days.push({ date: d, value: dateStr, isToday, isPast, isSelected });
    }

    return days;
  }, [currentMonth, currentYear, selectedDate, today]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const canGoPrev = currentYear > today.getFullYear() || (currentYear === today.getFullYear() && currentMonth > today.getMonth());

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-xl" onClick={close} />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 className="text-white font-semibold text-lg">
            {step === "date" && "Book a Free Consultation"}
            {step === "time" && "Select a Time"}
            {step === "form" && "Your Details"}
            {step === "success" && "All Set!"}
          </h3>
          <button
            onClick={close}
            className="w-8 h-8 bg-white/10 border border-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 max-h-[65vh] overflow-y-auto">
          {/* === STEP 1: Calendar === */}
          {step === "date" && (
            <div className="space-y-4">
              {/* Month Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevMonth}
                  disabled={!canGoPrev}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-white font-medium">
                  {MONTHS[currentMonth]} {currentYear}
                </span>
                <button
                  onClick={nextMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1">
                {DAYS.map((day) => (
                  <div key={day} className="text-center text-xs text-white/40 py-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, i) => (
                  <div key={i} className="aspect-square">
                    {day.date > 0 ? (
                      <button
                        onClick={() => {
                          if (!day.isPast) setSelectedDate(day.value);
                        }}
                        disabled={day.isPast}
                        className={`w-full h-full flex items-center justify-center rounded-lg text-sm transition-all ${
                          day.isSelected
                            ? "bg-gold text-navy-900 font-semibold"
                            : day.isToday
                            ? "bg-white/10 text-gold font-medium border border-gold/30"
                            : day.isPast
                            ? "text-white/20 cursor-not-allowed"
                            : "text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {day.date}
                      </button>
                    ) : (
                      <div />
                    )}
                  </div>
                ))}
              </div>

              {/* Continue Button */}
              <button
                onClick={() => selectedDate && setStep("time")}
                disabled={!selectedDate}
                className="w-full py-3.5 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-base"
              >
                Continue
              </button>
            </div>
          )}

          {/* === STEP 2: Time Selection === */}
          {step === "time" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-white/50 text-sm">
                  {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </p>
                <button onClick={() => setStep("date")} className="text-xs text-gold hover:underline">
                  Change Date
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`py-2.5 px-2 rounded-lg text-xs font-medium transition-all border ${
                      selectedTime === t
                        ? "bg-gold text-navy-900 border-gold"
                        : "bg-white/5 text-white/70 border-white/10 hover:bg-white/15 hover:border-white/30"
                    }`}
                  >
                    {t}
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
                  className="flex-1 py-3 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* === STEP 3: Contact Form === */}
          {step === "form" && (
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-xs text-white/40">Selected</div>
                <div className="text-sm text-white font-medium">
                  {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}
                </div>
                <button onClick={() => setStep("date")} className="text-xs text-gold hover:underline mt-1">
                  Change
                </button>
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
                  className="flex-1 py-3 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* === STEP 4: Success === */}
          {step === "success" && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gold" />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">Consultation Booked!</h4>
              <p className="text-white/50 text-sm mb-1">
                {new Date(selectedDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })} at {selectedTime}
              </p>
              <p className="text-white/50 text-sm">
                Our team will contact you shortly.
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
