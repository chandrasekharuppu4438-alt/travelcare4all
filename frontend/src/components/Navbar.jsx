import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageSquare, Menu, X, ClipboardList } from 'lucide-react';
import travelData from '../data/travelData';

export function BrandLogo({ className = "h-11 w-11 shrink-0" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d="M8 46c10-9 26-14 46-12-15 1-29 6-40 15z" fill="#E66A2C"></path>
      <path d="M50 30l8-3-2 4-6 1z" fill="#E66A2C"></path>
      <path d="M31 50c1-10 0-19-3-28" stroke="#075C35" strokeWidth="3" strokeLinecap="round" fill="none"></path>
      <path d="M28 22c-6-6-14-6-19-2 6-1 12 1 16 5z" fill="#168447"></path>
      <path d="M28 22c2-8 9-12 16-11-6 2-10 6-12 12z" fill="#2E8B57"></path>
      <path d="M28 22c7-3 15-1 19 4-6-2-12-2-17 1z" fill="#168447"></path>
      <path d="M28 22c-4-7-3-14 1-18-1 6 0 11 2 16z" fill="#2E8B57"></path>
      <path d="M28 22c-7 0-12 5-13 11 3-5 8-8 13-9z" fill="#075C35"></path>
    </svg>
  );
}

export default function Navbar({ onOpenAdmin, onOpenCustomTrip }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { siteConfig } = travelData;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Tours', to: '/tours' },
    { label: 'Destinations', to: '/destinations' },
    { label: 'Visa Services', to: '/visa' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' }
  ];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(siteConfig.defaultWhatsappMessage);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  const isHome = location.pathname === '/';
  const showSolidNav = scrolled || !isHome;

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      {/* Top bar strip */}
      <div className="flex h-9 items-center bg-[#075c35] text-[0.78rem] text-white/90">
        <div className="container mx-auto flex w-full items-center justify-between gap-4">
          <p className="truncate">
            <span className="hidden sm:inline">Explore India &amp; International Destinations with Travel Care 4 All</span>
            <span className="sm:hidden">India &amp; International Tours · Visas</span>
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenAdmin}
              className="hidden md:inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-amber-200 px-2.5 py-0.5 rounded-full font-semibold transition"
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Bookings Desk</span>
            </button>
            <a href="tel:+917386133399" className="link-u shrink-0 font-semibold text-white">
              Call: +91 73861 33399
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className={`transition-all duration-300 ${
        showSolidNav 
          ? 'bg-[#0d1612]/95 backdrop-blur-md shadow-md text-white border-b border-white/10' 
          : 'bg-gradient-to-b from-[#17231d]/75 to-transparent text-white'
      }`}>
        <nav 
          aria-label="Main" 
          className="container mx-auto flex items-center justify-between gap-6 transition-all duration-300 h-20"
        >
          {/* Logo */}
          <Link aria-label="Travel Care 4 All home" className="shrink-0 flex items-center gap-2.5" to="/">
            <BrandLogo className="h-11 w-11 shrink-0 transition-all duration-300" />
            <span className="leading-none">
              <span className="block font-display font-bold tracking-tight text-xl text-white">
                Travel Care
              </span>
              <span className="mt-0.5 block text-[0.7rem] font-extrabold uppercase tracking-[0.32em] text-[#e66a2c]">
                4 All
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 xl:flex">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`py-1 text-[0.9rem] font-medium transition-all ${
                      isActive 
                        ? 'text-amber-300 font-bold border-b-2 border-amber-300'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Action buttons */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href="tel:+917386133399"
              className="btn btn-ghost !px-3.5 !py-2.5 text-white"
              aria-label="Call +91 73861 33399"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden 2xl:inline">Call Now</span>
            </a>

            <button
              onClick={handleWhatsApp}
              className="btn btn-wa !px-3.5 !py-2.5"
              aria-label="Chat on WhatsApp"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden 2xl:inline">WhatsApp</span>
            </button>

            <Link className="btn btn-primary !py-2.5" to="/tours">
              Explore Tours
            </Link>
          </div>

          {/* Mobile menu hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full p-2.5 xl:hidden text-white hover:bg-white/15"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0d1612]/95 backdrop-blur-md px-6 py-6 border-b border-white/10 shadow-2xl space-y-3 animate-fadeIn text-white">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2.5 text-base font-semibold border-b border-white/10 ${
                location.pathname === item.to ? 'text-amber-300 font-bold' : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="btn btn-outline text-xs !py-2.5 font-bold !text-white !border-white/20"
            >
              <ClipboardList className="w-4 h-4 mr-1" />
              Bookings Desk
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsApp();
              }}
              className="btn btn-wa text-xs !py-2.5"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              WhatsApp
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
