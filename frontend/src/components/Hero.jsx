import React from 'react';
import { MessageSquare, ArrowRight, ShieldCheck, Plane, Clock, Star } from 'lucide-react';
import travelData from '../data/travelData';

export default function Hero({ onOpenCustomTrip }) {
  const { siteConfig } = travelData;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(siteConfig.defaultWhatsappMessage);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="relative isolate">
      <div className="relative flex min-h-[100svh] items-center overflow-hidden pb-36 pt-36 text-white sm:pb-32 lg:min-h-[94vh]">
        {/* Background image with hero zoom effect */}
        <div className="absolute inset-0 -z-10 max-md:!transform-none">
          <img
            src="/images/hero.png"
            alt="Turquoise tropical bay with limestone islands at sunrise"
            fetchPriority="high"
            className="hero-zoom h-full w-full object-cover"
          />
        </div>

        {/* Cinematic gradient overlays from original site */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#17231d]/85 via-[#17231d]/50 to-[#17231d]/15" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-[#17231d]/75 to-transparent" />

        {/* Content container */}
        <div className="container mx-auto w-full">
          <div className="max-w-3xl">
            {/* Tagline pill with shimmer */}
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-200 ring-1 ring-white/25 backdrop-blur shimmer-badge">
              <span className="h-2 w-2 rounded-full bg-[#e66a2c] animate-ping" />
              <span>All Travel Solutions &amp; Fast Track Visa Services</span>
            </p>

            {/* Headline */}
            <h1 className="text-[2.6rem] font-semibold leading-[1.04] sm:text-6xl lg:text-7xl font-display">
              Explore the World with{' '}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">
                Travel Care
              </span> 4 All
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-xl text-base text-white/90 sm:text-lg leading-relaxed">
              From handcrafted holidays to hassle-free fast-track visas, flights and personalized itineraries, B. Vidya Sagar and our Vijayawada desk take care of every detail.
            </p>

            {/* Trending Destination Quick Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-white/60 font-medium">Trending Now:</span>
              {['Kashmir', 'Dubai', 'Bali', 'Goa', 'Thailand'].map((city) => (
                <a
                  key={city}
                  href={`/tours?destination=${city}`}
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 border border-white/20 text-white/90 font-semibold transition-all duration-200"
                >
                  {city}
                </a>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a className="btn btn-primary shadow-lg shadow-[#e66a2c]/30" href="#featured-tours">
                <span>Explore Packages</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </a>
              <button
                type="button"
                onClick={onOpenCustomTrip}
                className="btn btn-ghost border border-white/25 hover:border-white/50 cursor-pointer"
              >
                Plan Your Trip
              </button>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="btn btn-wa shadow-lg shadow-emerald-950/40"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Us</span>
              </button>
            </div>

            {/* Trust & Credibility Strip */}
            <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
                  <Star className="w-4 h-4 fill-amber-300" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs sm:text-sm leading-tight">4.9 / 5 Rating</div>
                  <div className="text-white/60 text-[0.68rem]">140+ Happy Reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs sm:text-sm leading-tight">15+ Years</div>
                  <div className="text-white/60 text-[0.68rem]">Expert Travel Desk</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs sm:text-sm leading-tight">Fast-Track Visas</div>
                  <div className="text-white/60 text-[0.68rem]">99.2% Approval Rate</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs sm:text-sm leading-tight">Vijayawada HQ</div>
                  <div className="text-white/60 text-[0.68rem]">Direct Consultant Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
