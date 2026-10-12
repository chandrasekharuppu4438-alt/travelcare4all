import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, Heart, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { BrandLogo } from './Navbar';
import travelData from '../data/travelData';

export default function Footer({ onOpenAdmin }) {
  const { siteConfig } = travelData;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(siteConfig.defaultWhatsappMessage);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <footer id="contact" className="mt-auto shrink-0 bg-[#07100b] text-white border-t border-emerald-900/30">
      <div className="container mx-auto pt-16 pb-12 sm:pt-20 sm:pb-14">
        {/* Main 4-Column Grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Col 1: Brand & Managing Consultant */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <BrandLogo className="h-11 w-11 shrink-0 transition-transform duration-300 group-hover:scale-105" />
              <span className="leading-none">
                <span className="block font-display font-bold text-2xl text-white tracking-tight">
                  Travel Care
                </span>
                <span className="mt-0.5 block text-[0.7rem] font-extrabold uppercase tracking-[0.32em] text-[#e66a2c]">
                  4 All
                </span>
              </span>
            </Link>
            
            <p className="text-sm text-white/70 leading-relaxed">
              {siteConfig.tagline}. Handcrafted itineraries, fast-track visa assistance, and personalized travel management.
            </p>

            <div className="pt-1 space-y-1 text-xs text-white/60">
              <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Managing Consultant: B. Vidya Sagar</span>
              </p>
              <p>Vijayawada, Andhra Pradesh, India</p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="btn btn-wa !py-2.5 !px-4 text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/50"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat on WhatsApp (24/7)</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-display text-base font-bold text-amber-300 mb-4 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5">
                  <span>About Travel Care 4 All</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5">
                  <span>Travel Services (12)</span>
                </Link>
              </li>
              <li>
                <Link to="/tours" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5">
                  <span>Tour Packages</span>
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5">
                  <span>Destinations</span>
                </Link>
              </li>
              <li>
                <Link to="/visa" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5">
                  <span className="text-emerald-400 font-medium">Fast Track Visa Desk</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5">
                  <span>Traveller Moments</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1.5">
                  <span>Contact Office</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Visas */}
          <div>
            <h4 className="font-display text-base font-bold text-amber-300 mb-4 tracking-wide">
              Services &amp; Visas
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link to="/visa" className="hover:text-emerald-300 transition-colors">
                  Dubai (UAE) Express E-Visa
                </Link>
              </li>
              <li>
                <Link to="/visa" className="hover:text-emerald-300 transition-colors">
                  Singapore &amp; Malaysia E-Visas
                </Link>
              </li>
              <li>
                <Link to="/visa" className="hover:text-emerald-300 transition-colors">
                  Europe Schengen Dossier &amp; VFS Slots
                </Link>
              </li>
              <li>
                <Link to="/visa" className="hover:text-emerald-300 transition-colors">
                  Passport Assistance (New &amp; Renewal)
                </Link>
              </li>
              <li>
                <Link to="/tours?travelType=Honeymoon" className="hover:text-amber-300 transition-colors">
                  Luxury Honeymoon Packages
                </Link>
              </li>
              <li>
                <Link to="/tours?travelType=Pilgrimage" className="hover:text-amber-300 transition-colors">
                  Pilgrim Yatras (Kashi, Tirupati, Shirdi)
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-300 transition-colors">
                  Flight &amp; Train Ticketing Desk
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-300 transition-colors">
                  Cordelia &amp; International Cruises
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Vijayawada Office & Timings */}
          <div className="space-y-3.5">
            <h4 className="font-display text-base font-bold text-amber-300 mb-4 tracking-wide">
              Vijayawada Office
            </h4>
            
            <div className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed">
              <MapPin className="h-4 w-4 text-[#e66a2c] shrink-0 mt-0.5" />
              <div>
                {siteConfig.addressLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <Phone className="h-4 w-4 text-[#e66a2c] shrink-0" />
              <div className="flex flex-col gap-0.5">
                {siteConfig.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                    {phone}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <Mail className="h-4 w-4 text-[#e66a2c] shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                {siteConfig.email}
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-white/70 pt-1 border-t border-white/10">
              <Clock className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white/90">Office Timings</p>
                <p>Mon – Sat: 9:30 AM – 8:30 PM</p>
                <p className="text-white/50">Sunday: By Consultation Appointment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Travel Care 4 All. All rights reserved. Registered Travel &amp; Visa Consultant.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/admin/login"
              className="hover:text-amber-300 transition-colors font-medium underline underline-offset-4 cursor-pointer text-white/70"
            >
              Bookings Desk (CRM)
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-white/70">
              <span>Crafted with</span>
              <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
              <span>for Travellers</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
