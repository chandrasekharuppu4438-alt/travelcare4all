import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import travelData from '../data/travelData';

export default function DestinationsSection({ onSelectDestination }) {
  const [activeRegion, setActiveRegion] = useState('International');
  const { destinations } = travelData;

  const featuredDestinations = destinations.filter(d => d.featured);
  const regionalDestinations = destinations.filter(d => d.region === activeRegion && !d.featured).slice(0, 6);

  return (
    <>
      {/* 1. Bento Featured Destinations */}
      <section id="destinations" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">
                <span className="h-px w-6 bg-[#e66a2c]" />
                Where to next
              </p>
              <h2 className="text-3xl font-semibold sm:text-4xl lg:text-[2.85rem] lg:leading-[1.1] text-[#17231d] font-display">
                Popular Destinations
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#17231d]/65">
                Our most-requested escapes from Vijayawada — each one bookable as a ready package or a fully custom trip.
              </p>
            </div>
            <div>
              <Link className="btn btn-outline" to="/tours">
                <span>All tours</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Bento grid: 1 tall card + smaller cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            {featuredDestinations.map((dest, idx) => {
              const isTall = idx === 0;
              return (
                <div 
                  key={dest.slug} 
                  className={isTall ? "sm:col-span-2 lg:row-span-2" : ""}
                >
                  <div 
                    onClick={() => onSelectDestination(dest.name)}
                    className={`group relative block h-full overflow-hidden rounded-3xl shadow-card transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-lift cursor-pointer ${
                      isTall ? "min-h-[420px]" : "min-h-[300px]"
                    }`}
                  >
                    <img
                      src={`/images/${dest.image}.png`}
                      alt={`${dest.name}, ${dest.country}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#17231d]/85 via-[#17231d]/20 to-transparent transition-opacity duration-500 group-hover:from-[#075c35]/90" />
                    
                    <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30 backdrop-blur">
                      Explore trips
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-transform duration-500 group-hover:-translate-y-2">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                        {dest.country}
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold sm:text-3xl font-display">
                        {dest.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 max-w-sm text-sm text-white/80">
                        {dest.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-300">
                        <span>Explore Packages</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Near & Far Region Explorer */}
      <section className="py-16 sm:py-24 bg-[#f7f9f7]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="eyebrow mb-3">
              <span className="h-px w-6 bg-[#e66a2c]" />
              Near &amp; far
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl lg:text-[2.85rem] text-[#17231d] font-display">
              {activeRegion === 'International' ? 'International' : 'Domestic'} Destinations
            </h2>
            <p className="mt-4 text-base text-[#17231d]/65">
              Beach islands, Himalayan valleys, desert forts and sacred yatras — pick a region to explore.
            </p>

            {/* Region Tabs */}
            <div className="mx-auto mt-6 flex w-fit rounded-full bg-[#eef8f1] p-1.5 ring-1 ring-[#168447]/20">
              {['International', 'Domestic'].map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setActiveRegion(region)}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                    activeRegion === region
                      ? 'bg-[#168447] text-white shadow-sm'
                      : 'text-[#075c35] hover:text-[#168447]'
                  }`}
                >
                  {region === 'Domestic' ? 'India' : region}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {regionalDestinations.map((d) => (
              <div
                key={d.slug}
                onClick={() => onSelectDestination(d.name)}
                className="group relative block h-[320px] overflow-hidden rounded-3xl shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift cursor-pointer"
              >
                <img
                  src={`/images/${d.image}.png`}
                  alt={d.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17231d]/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-300">{d.country}</p>
                  <h3 className="text-2xl font-display font-semibold mt-1">{d.name}</h3>
                  <p className="text-xs text-white/80 line-clamp-2 mt-1">{d.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
