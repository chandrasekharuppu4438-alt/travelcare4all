import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import travelData from '../data/travelData';

export default function Hero() {
  const { siteConfig } = travelData;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(siteConfig.defaultWhatsappMessage);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="relative isolate">
      <div className="relative flex min-h-[100svh] items-center overflow-hidden pb-48 pt-36 text-white sm:pb-40 lg:min-h-[94vh]">
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
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#17231d]/80 via-[#17231d]/45 to-[#17231d]/10" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-[#17231d]/70 to-transparent" />

        {/* Content container */}
        <div className="container mx-auto w-full">
          <div className="max-w-3xl">
            {/* Tagline pill */}
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-200 ring-1 ring-white/25 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e66a2c]" />
              <span>All Travel Solutions &amp; Fast Track Visa Services</span>
            </p>

            {/* Headline */}
            <h1 className="text-[2.6rem] font-semibold leading-[1.04] sm:text-6xl lg:text-7xl font-display">
              Explore the World with{' '}
              <span className="italic text-amber-300">Travel Care</span> 4 All
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
              From unforgettable holidays to hassle-free visas, tickets and personalized travel experiences, we take care of every step of your journey.
            </p>

            {/* Action buttons */}
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="#tours">
                Explore Packages
              </a>
              <a href="#plan" className="btn btn-ghost">
                Plan Your Trip
              </a>
              <button
                onClick={handleWhatsApp}
                className="btn btn-wa"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Us</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
