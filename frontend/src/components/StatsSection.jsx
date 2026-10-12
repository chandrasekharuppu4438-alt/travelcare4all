import React from 'react';
import travelData from '../data/travelData';

export default function StatsSection() {
  const { stats } = travelData;

  return (
    <section className="relative isolate overflow-hidden bg-[#075c35] py-16 text-white sm:py-20">
      <img
        src="/images/rajasthan.png"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-15"
      />
      
      <dl className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <dt className="order-2 mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-white/70">
              {s.label}
            </dt>
            <dd className="font-display text-5xl font-semibold text-amber-300 sm:text-6xl">
              {s.value.toLocaleString('en-IN')}{s.suffix}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-8 text-center text-xs text-white/45">
        Sample figures for illustration.
      </p>
    </section>
  );
}
