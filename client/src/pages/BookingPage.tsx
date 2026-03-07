import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCalendar from "@/components/BookingCalendar";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-[#0D0D0D] to-[#111111]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="font-mono-data text-lime text-xs tracking-widest uppercase mb-3">Book a Session</p>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-none mb-4">
              SCHEDULE YOUR<br />
              <span className="text-lime">FREE AI AUDIT</span>
            </h1>
            <p className="font-body text-white/60 text-lg mb-10">
              Pick a time that works for you. 30 minutes. No pitch. Just honest answers about where AI can help your business.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container">
          <div className="max-w-3xl mx-auto bg-[#1A1A1A] border border-white/10 rounded-lg p-6 md:p-8">
            <BookingCalendar defaultService="ai_audit" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
