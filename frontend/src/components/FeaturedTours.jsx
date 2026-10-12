import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import TourCard from './TourCard';
import travelData from '../data/travelData';

export default function FeaturedTours({ onSelectTour, onBookTour }) {
  const { tours } = travelData;

  // The 6 featured tours matching the Netlify homepage exactly
  const featuredSlugs = [
    'malaysia-explorer',
    'bangkok-discovery',
    'vietnam-adventure',
    'singapore-escape',
    'dubai-experience',
    'goa-holiday'
  ];

  const featuredTours = featuredSlugs
    .map((slug) => tours.find((t) => t.slug === slug))
    .filter(Boolean);

  // Fallback to first 6 if slugs don't match
  const displayTours = featuredTours.length === 6 ? featuredTours : tours.slice(0, 6);

  return (
    <section id="featured-tours" className="scroll-mt-24 py-16 sm:py-24 bg-[#fafbf9]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-2">
              <span className="h-px w-6 bg-[#e66a2c]" />
              HANDCRAFTED ITINERARIES
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#17231d] font-display">
              Featured Tour Packages
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[#17231d]/65">
              Starting points we tailor around you. Prices shown are sample fares — your consultant confirms the live quote.
            </p>
          </div>

          <Link
            to="/tours"
            className="group inline-flex items-center gap-2 text-sm font-bold text-[#168447] hover:text-[#075c35] transition shrink-0"
          >
            <span>View all packages</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-Column Grid of 6 Featured Cards */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {displayTours.map((tour) => (
            <TourCard
              key={tour.slug}
              tour={tour}
              onSelectTour={() => onSelectTour(tour)}
              onBookTour={() => onBookTour(tour)}
            />
          ))}
        </div>

        {/* Bottom Call to Explore More */}
        <div className="mt-12 text-center">
          <Link
            to="/tours"
            className="btn btn-outline inline-flex items-center gap-2 !px-8 !py-3.5 !text-base"
          >
            <Sparkles className="h-4 w-4 text-[#e66a2c]" />
            <span>Browse All 15+ Holiday Packages</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
