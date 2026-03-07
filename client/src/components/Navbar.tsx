/*
 * ONEY LABS NAVBAR
 * Design: Raw Craft + Warm Dark
 * Sticky nav with blur backdrop, lime-yellow CTA
 * Manrope font, minimal links
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/ai-search-visibility", label: "AI Visibility" },
  { href: "/ai-consulting", label: "Consulting" },
  { href: "/build-with-me", label: "Build With Me" },
  { href: "/workshops", label: "Workshops" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/visibility-checker", label: "Checker" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-blur" : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663409472708/AwZd3Nde3Mv8PBZXHdvufN/oney-labs-logo-XhAEzjaiUbxxcsHkcXP4AR.webp" alt="Oney Labs" className="w-8 h-8" />
            <span className="font-heading font-800 text-white text-lg tracking-tight">
              Oney<span className="text-lime">Labs</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-heading text-sm font-500 transition-colors duration-200 ${
                  location === link.href
                    ? "text-lime"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:8503199550"
              className="font-heading text-sm font-600 text-white/60 hover:text-white transition-colors"
            >
              (850) 319-9550
            </a>
            <Link href="/book">
              <button className="btn-lime text-sm py-2 px-5">
                Free AI Audit
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#111111] border-t border-white/10">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-heading text-sm font-500 py-3 border-b border-white/5 transition-colors ${
                  location === link.href ? "text-lime" : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="tel:8503199550"
                className="font-heading text-sm text-white/60 text-center"
              >
                (850) 319-9550
              </a>
              <Link href="/book">
                <button className="btn-lime w-full justify-center">
                  Book Free AI Audit
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
