import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, MapPin } from 'lucide-react';
import travelData from '../data/travelData';

export default function DestinationsPage() {
  const navigate = useNavigate();
  const { destinations } = travelData;
  const [activeRegion, setActiveRegion] = useState('All');

  const featuredDestinations = destinations.filter(d => d.featured);
  const filteredDestinations = destinations.filter(d => {
    if (activeRegion === 'All') return true;
    return d.region === activeRegion;
  });

  return (
    <div className="min-h-screen bg-[#fafbf9] text-[#17231d]">
      {/* 1. Breadcrumb Strip */}
      <div className="pt-28 pb-4 bg-[#eef8f1] border-b border-[#17231d]/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#17231d]/60">
            <Link to="/" className="hover:text-[#168447] transition">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-[#17231d]">Destinations</span>
          </nav>
        </div>
      </div>

      {/* 2. Scenic Header Banner */}
      <section className="relative overflow-hidden bg-[#17231d] pt-16 pb-20 sm:pt-20 sm:pb-24 text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/bali.png"
            alt="Scenic Destinations"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17231d] via-[#17231d]/75 to-[#17231d]/85" />
        </div>

        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center relative z-10">
          <p className="eyebrow justify-center mb-3 text-amber-300">
            <span className="h-px w-6 bg-[#e66a2c]" />
            Where to Next
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white">
            Popular Destinations
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed">
            Our most-requested escapes from Vijayawada — each one bookable as a ready package or a fully custom trip.
          </p>
        </div>
      </section>

      {/* 3. Featured Bento Grid matching Screenshot 2 */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-2">
              <span className="h-px w-6 bg-[#e66a2c]" />
              Flagship escapes
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#17231d]">
              Featured Escapes from Vijayawada
            </h2>
          </div>
          <Link to="/tours" className="btn btn-outline self-start sm:self-auto">
            <span>All tours</span>
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {featuredDestinations.map((dest, idx) => {
            const isTall = idx === 0;
            return (
              <div 
                key={dest.slug} 
                className={isTall ? "sm:col-span-2 lg:row-span-2" : ""}
              >
                <div 
                  onClick={() => navigate(`/tours?destination=${encodeURIComponent(dest.name)}`)}
                  className={`group relative block h-full overflow-hidden rounded-3xl shadow-card transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-lift cursor-pointer ${
                    isTall ? "min-h-[420px]" : "min-h-[290px]"
                  }`}
                >
                  <img
                    src={`/images/${dest.image}.png`}
                    alt={`${dest.name}, ${dest.country}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17231d]/90 via-[#17231d]/25 to-transparent transition-opacity duration-500 group-hover:from-[#075c35]/95" />
                  
                  <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30 backdrop-blur-md">
                    1 package
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-transform duration-500 group-hover:-translate-y-1">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                      {dest.country}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold sm:text-3xl font-display">
                      {dest.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 max-w-sm text-xs sm:text-sm text-white/80">
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
      </section>

      {/* 4. Complete Destinations Catalog with Filter Tabs */}
      <section className="bg-[#f7f9f7] py-16 sm:py-24 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="eyebrow justify-center mb-2">
              <span className="h-px w-6 bg-[#e66a2c]" />
              Near &amp; Far
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl text-[#17231d] font-display">
              All Travel Destinations
            </h2>
            <p className="mt-3 text-base text-[#17231d]/65">
              Select a region to browse ready itineraries or plan a custom holiday.
            </p>

            {/* Region Tabs */}
            <div className="mx-auto mt-6 flex w-fit rounded-full bg-[#eef8f1] p-1.5 ring-1 ring-[#168447]/20">
              {['All', 'International', 'Domestic'].map((region) => (
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

          {/* Grid of all destinations */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDestinations.map((d) => (
              <div
                key={d.slug}
                onClick={() => navigate(`/tours?destination=${encodeURIComponent(d.name)}`)}
                className="group relative h-[320px] overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-[#17231d]/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift cursor-pointer"
              >
                <img
                  src={`/images/${d.image}.png`}
                  alt={d.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17231d]/90 via-[#17231d]/20 to-transparent transition-opacity group-hover:from-[#075c35]/95" />

                <span className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
                  {d.region === 'Domestic' ? 'India' : 'Intl.'}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-300">{d.country}</p>
                  <h3 className="text-2xl font-display font-semibold mt-1">{d.name}</h3>
                  <p className="text-xs text-white/80 line-clamp-2 mt-1">{d.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                    <span>View Tours</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
