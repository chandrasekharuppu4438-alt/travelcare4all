import React from 'react';
import travelData from '../data/travelData';

export default function StatsSection() {
  const stats = [
    { label: 'Handcrafted Itineraries', value: '15+', note: 'Domestic & International' },
    { label: 'Featured Destinations', value: '17+', note: 'Handpicked Escapes' },
    { label: 'Visa Guidance Desks', value: '5', note: 'Fast Track Support' },
    { label: 'Ground Assistance', value: '24/7', note: 'Direct Vijayawada Desk' }
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#075c35] py-16 text-white sm:py-20">
      <img
        src="/images/rajasthan.png"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-15"
      />
      
      <div className="container mx-auto">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dd className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-amber-300">
                {s.value}
              </dd>
              <dt className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-white/90">
                {s.label}
              </dt>
              <p className="text-[0.7rem] text-white/60 mt-0.5">{s.note}</p>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-center text-xs text-white/50 tracking-wide">
          Authentic travel solutions coordinated from Ramavarappadu Ring, Vijayawada, Andhra Pradesh.
        </p>
      </div>
    </section>
  );
}
