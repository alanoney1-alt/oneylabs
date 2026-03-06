/*
 * ONEY LABS CONTACT PAGE
 * Design: Raw Craft + Warm Dark
 * Contact form + booking + phone + email
 */
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", message: "", service: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      <div className="pt-28 pb-8 container">
        <p className="section-number mb-3">Get in Touch</p>
        <h1 className="font-display text-[clamp(3rem,7vw,6rem)] text-white leading-none mb-4">
          LET'S TALK<br />
          <span className="text-lime">AI.</span>
        </h1>
        <p className="font-body text-white/60 text-lg max-w-xl leading-relaxed">
          Book a free 30-minute AI audit. No pitch. Just a real look at where AI can save your business time and money.
        </p>
      </div>

      <section className="py-16 bg-[#111111]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-heading font-800 text-white text-xl mb-8">Contact Info</h2>

              <div className="flex flex-col gap-6 mb-10">
                {[
                  { icon: Phone, label: "Phone", value: "(850) 319-9550", href: "tel:8503199550" },
                  { icon: Mail, label: "Email", value: "alan@oneylabs.ai", href: "mailto:alan@oneylabs.ai" },
                  { icon: MapPin, label: "Location", value: "Lake Nona, Orlando, FL", href: "https://maps.google.com/?q=Lake+Nona+Orlando+FL" },
                ].map((item) => (
                  <a key={item.label} href={item.href} target={item.label === "Location" ? "_blank" : undefined} rel="noopener noreferrer"
                    className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-lime/10 border border-lime/20 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-lime/20 transition-colors">
                      <item.icon size={18} className="text-lime" />
                    </div>
                    <div>
                      <p className="font-heading font-600 text-white/40 text-xs uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="font-body text-white group-hover:text-lime transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="bg-[#1A1A1A] border border-white/8 rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-lime" />
                  <span className="font-heading font-600 text-white text-sm">Office Hours</span>
                </div>
                <p className="font-body text-white/50 text-sm leading-relaxed">
                  Every Thursday   free 15-minute AI chats at local coffee shops in South Orlando. No appointment needed.
                </p>
              </div>

              <div className="mt-6 bg-[#1A1A1A] border border-lime/20 rounded-lg p-5">
                <p className="font-heading font-700 text-lime text-sm mb-2">Response Time</p>
                <p className="font-body text-white/50 text-sm">
                  I respond to every inquiry within 24 hours. Priority support clients get same-day responses.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-[#1A1A1A] border border-lime/30 rounded-lg p-10 text-center">
                  <div className="w-16 h-16 bg-lime rounded-full flex items-center justify-center mx-auto mb-6">
                    <ArrowRight size={28} className="text-black" />
                  </div>
                  <h3 className="font-display text-4xl text-white mb-3">GOT IT.</h3>
                  <p className="font-body text-white/60 mb-2">
                    I'll be in touch within 24 hours to schedule your free AI audit.
                  </p>
                  <p className="font-body text-white/40 text-sm">
                    Or call me directly: <a href="tel:8503199550" className="text-lime">(850) 319-9550</a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#1A1A1A] border border-white/8 rounded-lg p-8">
                  <h2 className="font-heading font-800 text-white text-xl mb-6">Book Your Free AI Audit</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="font-heading font-600 text-white/60 text-xs uppercase tracking-wide block mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#111111] border border-white/10 rounded px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-lime/50 transition-colors placeholder:text-white/20"
                        placeholder="Alan Smith"
                      />
                    </div>
                    <div>
                      <label className="font-heading font-600 text-white/60 text-xs uppercase tracking-wide block mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#111111] border border-white/10 rounded px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-lime/50 transition-colors placeholder:text-white/20"
                        placeholder="you@yourbusiness.com"
                      />
                    </div>
                    <div>
                      <label className="font-heading font-600 text-white/60 text-xs uppercase tracking-wide block mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-[#111111] border border-white/10 rounded px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-lime/50 transition-colors placeholder:text-white/20"
                        placeholder="(407) 555-0100"
                      />
                    </div>
                    <div>
                      <label className="font-heading font-600 text-white/60 text-xs uppercase tracking-wide block mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.business}
                        onChange={(e) => setForm({ ...form, business: e.target.value })}
                        className="w-full bg-[#111111] border border-white/10 rounded px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-lime/50 transition-colors placeholder:text-white/20"
                        placeholder="Your Business LLC"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="font-heading font-600 text-white/60 text-xs uppercase tracking-wide block mb-2">
                      What are you interested in?
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-[#111111] border border-white/10 rounded px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-lime/50 transition-colors"
                    >
                      <option value="">Select a service...</option>
                      <option value="ai-search">AI Search Visibility</option>
                      <option value="ai-ops">AI Operations Consulting</option>
                      <option value="build">Build With Me (idea-to-product)</option>
                      <option value="workshop">Workshop / Education</option>
                      <option value="audit">Free AI Audit (not sure yet)</option>
                    </select>
                  </div>

                  <div className="mb-7">
                    <label className="font-heading font-600 text-white/60 text-xs uppercase tracking-wide block mb-2">
                      Tell me about your business
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#111111] border border-white/10 rounded px-4 py-3 text-white font-body text-sm focus:outline-none focus:border-lime/50 transition-colors resize-none placeholder:text-white/20"
                      placeholder="What does your business do? What's your biggest time drain right now?"
                    />
                  </div>

                  <button type="submit" className="btn-lime w-full justify-center text-base py-4">
                    Book Free AI Audit
                    <ArrowRight size={18} />
                  </button>

                  <p className="font-body text-white/30 text-xs text-center mt-4">
                    No spam. No pitch. Just a real conversation about your business.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
