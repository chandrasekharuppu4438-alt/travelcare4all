import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, BedDouble, MessageSquare, MapPin } from 'lucide-react';
import travelData from '../data/travelData';

export default function TourCard({ tour, onSelectTour, onBookTour }) {
  const { siteConfig } = travelData;

  const discount = tour.originalPrice 
    ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100) 
    : 0;

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Travel Care 4 All,\nI’m interested in the “${tour.title}” package. Please share details.`
    );
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  const imageSrc = tour.image?.startsWith('/') || tour.image?.startsWith('http') 
    ? tour.image 
    : `/images/${tour.image || 'hero'}.png`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-[#17231d]/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-lift">
      {/* Media Aspect Header */}
      <Link 
        to={`/tours/${tour.slug}`}
        className="relative block aspect-[4/3] overflow-hidden cursor-pointer"
        aria-label={`View details for ${tour.title}`}
      >
        <img
          src={imageSrc}
          alt={`${tour.destination} — ${tour.title}`}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = '/images/hero.png'; }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17231d]/50 via-transparent to-transparent" />

        {/* Destination badge */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#075c35] shadow-sm">
          <MapPin className="h-3.5 w-3.5" />
          <span>{tour.destination}</span>
        </span>

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute right-4 top-4 rounded-full bg-[#e66a2c] px-3 py-1 text-xs font-bold text-white shadow-sm">
            {discount}% OFF
          </span>
        )}

        {/* Duration */}
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white">
          <Clock className="h-3.5 w-3.5" />
          <span>{tour.days - 1}N / {tour.days}D</span>
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs">
          <span className="font-semibold uppercase tracking-wider text-[#168447]">
            {tour.travelType}
          </span>
          <div className="flex items-center gap-1 font-bold text-[#17231d]">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{tour.rating}</span>
            <span className="text-[#17231d]/40 font-normal">({tour.reviews})</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold leading-snug text-[#17231d] font-display hover:text-[#168447] transition-colors">
          <Link to={`/tours/${tour.slug}`}>
            {tour.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-[#17231d]/65">
          {tour.shortDescription}
        </p>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-[#17231d]/55">
          <BedDouble className="h-4 w-4 text-[#168447]" />
          <span>{tour.hotel || 'Selected hotel stay'}</span>
        </p>

        {/* Price Row */}
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-dashed border-[#17231d]/10 pt-4 mt-5">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-[#17231d]/50">
              Starting from
            </p>
            <p className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-[#075c35]">
                ₹{tour.price.toLocaleString('en-IN')}
              </span>
              {tour.originalPrice && (
                <span className="text-sm text-[#17231d]/40 line-through">
                  ₹{tour.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </p>
            <p className="text-xs text-[#17231d]/50">per person · sample price</p>
          </div>

          <button
            onClick={handleWhatsApp}
            aria-label={`Ask about ${tour.title} on WhatsApp`}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1fa855]/10 text-[#17904a] transition hover:bg-[#1fa855] hover:text-white"
          >
            <MessageSquare className="h-5 w-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {onSelectTour ? (
            <button
              type="button"
              onClick={() => onSelectTour(tour)}
              className="btn btn-outline !py-2.5 !text-sm text-center"
            >
              View Details
            </button>
          ) : (
            <Link
              to={`/tours/${tour.slug}`}
              className="btn btn-outline !py-2.5 !text-sm text-center"
            >
              View Details
            </Link>
          )}

          <button
            type="button"
            onClick={() => onBookTour ? onBookTour(tour) : null}
            className="btn btn-primary !py-2.5 !text-sm text-center"
          >
            Book Now
          </button>
        </div>
      </div>
    </article>
  );
}
