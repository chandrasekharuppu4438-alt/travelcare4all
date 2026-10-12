import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import travelData from '../data/travelData';

export default function Testimonials() {
  const { reviews } = travelData;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((p) => (p === 0 ? reviews.length - 1 : p - 1));
  };

  const next = () => {
    setCurrentIndex((p) => (p === reviews.length - 1 ? 0 : p + 1));
  };

  const current = reviews[currentIndex];

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white relative">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">
            <span className="h-px w-6 bg-[#e66a2c]" />
            Traveller stories
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl lg:text-[2.85rem] font-display text-[#17231d]">
            What our travellers say
          </h2>
          <p className="mt-3 text-base text-[#17231d]/65">
            Verified experiences shared by families, couples, and yatris.
          </p>
        </div>

        <div className="relative rounded-[2rem] bg-[#f7f9f7] p-8 text-center ring-1 ring-[#17231d]/5 sm:p-12 shadow-card">
          <Quote className="mx-auto h-10 w-10 text-[#e66a2c]/30 mb-4" />

          <span className="mb-3 inline-block rounded-full bg-[#e66a2c]/10 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-[#e66a2c]">
            Traveller Review
          </span>

          <blockquote className="font-display text-xl leading-relaxed text-[#17231d] sm:text-2xl max-w-2xl mx-auto">
            “{current.quote}”
          </blockquote>

          <figcaption className="mt-5">
            <span className="flex justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < current.rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-[#17231d]/15'
                  }`}
                />
              ))}
            </span>
            <span className="mt-2 block font-bold text-[#17231d]">
              {current.name}
            </span>
            <span className="text-sm text-[#17231d]/55">
              {current.trip}
            </span>
          </figcaption>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="rounded-full bg-white p-2.5 shadow-card hover:bg-[#eef8f1] transition border border-[#17231d]/5 text-[#17231d]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-7 bg-[#168447]'
                      : 'w-2 bg-[#17231d]/20'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="rounded-full bg-white p-2.5 shadow-card hover:bg-[#eef8f1] transition border border-[#17231d]/5 text-[#17231d]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
