import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle2, Calendar, Clock, ArrowRight } from "lucide-react";

const SERVICE_TYPES = [
  { value: "ai_audit", label: "Free AI Audit", duration: "30 min", price: "Free" },
  { value: "consultation", label: "AI Consultation", duration: "60 min", price: "$150" },
  { value: "workshop", label: "AI Workshop", duration: "2 hours", price: "$75" },
  { value: "build_session", label: "Build Session", duration: "90 min", price: "$200" },
] as const;

const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

export default function BookingCalendar({ defaultService = "ai_audit" }: { defaultService?: string }) {
  const [step, setStep] = useState<"service" | "datetime" | "info" | "success">("service");
  const [serviceType, setServiceType] = useState(defaultService);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [notes, setNotes] = useState("");

  const bookMutation = trpc.bookings.create.useMutation({
    onSuccess: () => setStep("success"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookMutation.mutate({
      name,
      email,
      phone: phone || undefined,
      businessName: businessName || undefined,
      serviceType: serviceType as "ai_audit" | "consultation" | "workshop" | "build_session",
      preferredDate: selectedDate,
      preferredTime: selectedTime,
      notes: notes || undefined,
    });
  };

  // Generate next 14 weekdays
  const getAvailableDates = () => {
    const dates: string[] = [];
    const today = new Date();
    let d = new Date(today);
    d.setDate(d.getDate() + 1); // Start tomorrow
    while (dates.length < 14) {
      const day = d.getDay();
      if (day !== 0 && day !== 6) { // Skip weekends
        dates.push(d.toISOString().split("T")[0]);
      }
      d.setDate(d.getDate() + 1);
    }
    return dates;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  if (step === "success") {
    return (
      <Card className="border border-lime/30 bg-lime/5 rounded-lg p-8 text-center">
        <CheckCircle2 size={48} className="text-lime mx-auto mb-4" />
        <h3 className="font-heading font-800 text-white text-2xl mb-2">Booking Confirmed!</h3>
        <p className="text-white/60 mb-2">
          {SERVICE_TYPES.find((s) => s.value === serviceType)?.label} on {formatDate(selectedDate)} at {selectedTime}
        </p>
        <p className="text-white/40 text-sm">Alan will send you a confirmation email with meeting details at {email}.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-4">
        {["Service", "Date & Time", "Your Info"].map((label, i) => {
          const stepIndex = ["service", "datetime", "info"].indexOf(step);
          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-heading font-700 ${i <= stepIndex ? "bg-lime text-black" : "bg-white/10 text-white/40"}`}>
                {i + 1}
              </div>
              <span className={`text-xs font-heading ${i <= stepIndex ? "text-white" : "text-white/30"}`}>{label}</span>
              {i < 2 && <div className={`flex-1 h-px ${i < stepIndex ? "bg-lime" : "bg-white/10"}`} />}
            </div>
          );
        })}
      </div>

      {/* Step 1: Service selection */}
      {step === "service" && (
        <div className="space-y-3">
          <h3 className="font-heading font-700 text-white text-lg mb-4">Select a Service</h3>
          {SERVICE_TYPES.map((svc) => (
            <button
              key={svc.value}
              onClick={() => { setServiceType(svc.value); setStep("datetime"); }}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                serviceType === svc.value ? "border-lime bg-lime/10" : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading font-700 text-white">{svc.label}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white/40 text-xs flex items-center gap-1"><Clock size={12} /> {svc.duration}</span>
                    <span className="text-lime text-xs font-heading font-600">{svc.price}</span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-white/30" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Date & time */}
      {step === "datetime" && (
        <div className="space-y-4">
          <h3 className="font-heading font-700 text-white text-lg mb-2">Pick a Date</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {getAvailableDates().map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`p-2 rounded-lg border text-center text-xs font-heading transition-all ${
                  selectedDate === date ? "border-lime bg-lime/10 text-white" : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                }`}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>

          {selectedDate && (
            <>
              <h3 className="font-heading font-700 text-white text-lg mt-4 mb-2">Pick a Time</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg border text-center text-xs font-heading transition-all ${
                      selectedTime === time ? "border-lime bg-lime/10 text-white" : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="flex gap-3 mt-4">
            <Button onClick={() => setStep("service")} variant="outline" className="border-white/20 text-white hover:bg-white/5">Back</Button>
            <Button onClick={() => setStep("info")} disabled={!selectedDate || !selectedTime} className="flex-1 bg-lime text-black hover:bg-lime/90 font-heading font-700">
              Continue <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Contact info */}
      {step === "info" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="font-heading font-700 text-white text-lg mb-2">Your Information</h3>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3">
            <Calendar size={16} className="text-lime" />
            <span className="text-white/70 text-sm">
              {SERVICE_TYPES.find((s) => s.value === serviceType)?.label} · {formatDate(selectedDate)} at {selectedTime}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-heading font-600 text-white mb-1">Name *</label>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="bg-white/5 border-white/10 text-white placeholder:text-white/40" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-heading font-600 text-white mb-1">Email *</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white/5 border-white/10 text-white placeholder:text-white/40" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-heading font-600 text-white mb-1">Phone</label>
              <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-white/40" placeholder="(555) 123-4567" />
            </div>
            <div>
              <label className="block text-sm font-heading font-600 text-white mb-1">Business Name</label>
              <Input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="bg-white/5 border-white/10 text-white placeholder:text-white/40" placeholder="Your business" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-heading font-600 text-white mb-1">Notes (optional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 rounded-md px-3 py-2 text-sm" placeholder="Anything you'd like Alan to know before the meeting?" />
          </div>
          <div className="flex gap-3">
            <Button type="button" onClick={() => setStep("datetime")} variant="outline" className="border-white/20 text-white hover:bg-white/5">Back</Button>
            <Button type="submit" disabled={bookMutation.isPending} className="flex-1 bg-lime text-black hover:bg-lime/90 font-heading font-700">
              {bookMutation.isPending ? <><Loader2 size={16} className="animate-spin mr-2" /> Booking...</> : <>Confirm Booking <CheckCircle2 size={16} className="ml-2" /></>}
            </Button>
          </div>
          {bookMutation.isError && (
            <p className="text-red-400 text-sm">{bookMutation.error?.message || "Failed to book. Please try again."}</p>
          )}
        </form>
      )}
    </div>
  );
}
