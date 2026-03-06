/*
 * ONEY LABS FOOTER
 * Design: Raw Craft + Warm Dark
 * Dark surface, lime accents, local identity
 */
import { Link } from "wouter";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-white/8 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663409472708/AwZd3Nde3Mv8PBZXHdvufN/oney-labs-logo-XhAEzjaiUbxxcsHkcXP4AR.webp" alt="Oney Labs" className="w-8 h-8" />
              <span className="font-heading font-800 text-white text-lg tracking-tight">
                Oney<span className="text-lime">Labs</span>
              </span>
            </div>
            <p className="font-body text-white/50 text-sm leading-relaxed mb-5">
              AI consulting, automation, and education for South Orlando businesses. Built by a builder, not a consultant.
            </p>
            <div className="flex flex-col gap-2">
              <a href="https://maps.google.com/?q=Lake+Nona+Orlando+FL" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
                <MapPin size={14} className="text-lime shrink-0" />
                <span className="font-body">Lake Nona, Orlando, FL</span>
              </a>
              <a href="tel:8503199550" className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
                <Phone size={14} className="text-lime shrink-0" />
                <span className="font-body">(850) 319-9550</span>
              </a>
              <a href="mailto:alan@oneylabs.ai" className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
                <Mail size={14} className="text-lime shrink-0" />
                <span className="font-body">alan@oneylabs.ai</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-700 text-white text-sm uppercase tracking-widest mb-5">Services</h4>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/ai-search-visibility", label: "AI Search Visibility" },
                { href: "/ai-consulting", label: "AI Operations Consulting" },
                { href: "/build-with-me", label: "Build With Me" },
                { href: "/workshops", label: "Workshops" },
                { href: "/pricing", label: "Pricing" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-body text-sm text-white/40 hover:text-lime transition-colors flex items-center gap-1 group">
                    {item.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-700 text-white text-sm uppercase tracking-widest mb-5">Company</h4>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/about", label: "About Alan" },
                { href: "/contact", label: "Contact" },
                { href: "https://uptendapp.com", label: "UpTend (our build)", external: true },
              ].map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-white/40 hover:text-lime transition-colors flex items-center gap-1 group">
                      {item.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <Link href={item.href} className="font-body text-sm text-white/40 hover:text-lime transition-colors flex items-center gap-1 group">
                      {item.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-heading font-700 text-white text-sm uppercase tracking-widest mb-5">Ready to Start?</h4>
            <p className="font-body text-sm text-white/50 mb-5 leading-relaxed">
              Book a free 30-minute AI audit. No pitch. Just a real look at where AI can save your business time and money.
            </p>
            <Link href="/contact">
              <button className="btn-lime text-sm w-full justify-center">
                Book Free AI Audit
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} Oney Labs LLC. Based in Lake Nona, Orlando, FL.
          </p>
          <p className="font-body text-xs text-white/30">
            Serving South Orlando, Lake Nona, St. Cloud, Kissimmee & beyond.
          </p>
        </div>
      </div>
    </footer>
  );
}
