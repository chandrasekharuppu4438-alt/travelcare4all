import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import travelData from '../data/travelData';

export default function DestinationsPage() {
  const navigate = useNavigate();
  const { destinations } = travelData;
  const [activeRegion, setActiveRegion] = useState('All');

  const filteredDestinations = destinations.filter(d => {
    if (activeRegion === 'All') return true;
    return d.region === activeRegion;
  });

  const featured = destinations.filter(d => d.featured);

  return (
    <div className="min-h-screen bg-[#0d1612] text-white">
      {/* 1. Header Hero matching format */}
      <section className="relative overflow-hidden pt-36 pb-16 sm:pt-40 sm:pb-20 text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#168447]/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-4xl px-5 sm:px-8 relative z-10">
          <p className="eyebrow justify-center mb-3 text-amber-300">
            <span className="h-px w-6 bg-[#e66a2c]" />
            Where To Next
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white">
            Curated <span className="text-amber-300 font-display">Destinations</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/75 leading-relaxed">
            From tropical beaches in Maldives and Bali to snowy Himalayan valleys and vibrant desert forts in Rajasthan.
          </p>

          {/* Region Filter Tabs */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full bg-white/10 p-1.5 ring-1 ring-white/15 backdrop-blur-md">
              {['All', 'International', 'Domestic'].map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setActiveRegion(region)}
                  className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                    activeRegion === region
                      ? 'bg-[#168447] text-white shadow-md'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {region === 'Domestic' ? 'India' : region}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Destination Cards Grid */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 relative z-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.slug}
              onClick={() => navigate(`/tours?destination=${encodeURIComponent(dest.name)}`)}
              className="group relative h-[360px] overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:ring-[#168447]/60 cursor-pointer"
            >
              <img
                src={`/images/${dest.image}.png`}
                alt={`${dest.name}, ${dest.country}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1612]/95 via-[#0d1612]/30 to-transparent transition-opacity group-hover:from-[#075c35]/95" />

              {/* Tag */}
              <span className="absolute top-4 right-4 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-white/20">
                {dest.region}
              </span>

              {/* Body */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-transform duration-500 group-hover:-translate-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                  {dest.country}
                </p>
                <h3 className="mt-1 text-2xl font-bold font-display text-white">
                  {dest.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs sm:text-sm text-white/80">
                  {dest.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3">
                  <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                    <span>View Tours</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] text-white/60">
                    Custom Available
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
