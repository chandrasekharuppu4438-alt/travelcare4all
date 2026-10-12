import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, Heart } from 'lucide-react';
import { BrandLogo } from './Navbar';
import travelData from '../data/travelData';

export default function Footer({ onOpenAdmin }) {
  const { siteConfig } = travelData;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(siteConfig.defaultWhatsappMessage);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <footer id="contact" className="bg-[#080d0a] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <BrandLogo className="h-10 w-10 shrink-0" />
              <span className="leading-none">
                <span className="block font-display font-bold text-xl text-white">
                  Travel Care
                </span>
                <span className="mt-0.5 block text-[0.7rem] font-extrabold uppercase tracking-[0.32em] text-[#e66a2c]">
                  4 All
                </span>
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              {siteConfig.tagline}. Based in Vijayawada, Andhra Pradesh, guiding your journeys worldwide.
            </p>
            <div className="pt-2">
              <button
                onClick={handleWhatsApp}
                className="btn btn-wa !py-2 !px-4 text-xs font-semibold"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-amber-300 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Travel Services</Link></li>
              <li><Link to="/tours" className="hover:text-white transition-colors">Tour Packages</Link></li>
              <li><Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
              <li><Link to="/visa" className="hover:text-white transition-colors">Fast Track Visa Desk</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Moments Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Office</Link></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-amber-300 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li><Link to="/tours" className="hover:text-white transition-colors">Domestic &amp; Intl Tours</Link></li>
              <li><Link to="/visa" className="hover:text-white transition-colors">Tourist &amp; Business Visa</Link></li>
              <li><Link to="/visa" className="hover:text-white transition-colors">Passport Assistance</Link></li>
              <li><Link to="/tours?travelType=Honeymoon" className="hover:text-white transition-colors">Honeymoon Specials</Link></li>
              <li><Link to="/tours?travelType=Pilgrimage" className="hover:text-white transition-colors">Pilgrim Yatras</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Flight &amp; Train Tickets</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-amber-300 mb-4">
              Vijayawada Office
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-white/75">
              <MapPin className="h-4 w-4 text-[#e66a2c] shrink-0 mt-0.5" />
              <div>
                {siteConfig.addressLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/75">
              <Phone className="h-4 w-4 text-[#e66a2c] shrink-0" />
              <div>
                {siteConfig.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`} className="block hover:text-white">
                    {phone}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/75">
              <Mail className="h-4 w-4 text-[#e66a2c] shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Travel Care 4 All. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="hover:text-amber-300 transition-colors font-medium underline underline-offset-4 cursor-pointer"
            >
              Bookings Desk (MERN)
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for Travellers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
