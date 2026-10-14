import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  BedDouble, 
  Car, 
  Utensils, 
  Check, 
  XCircle, 
  MessageCircle, 
  Calendar,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import travelData from '../data/travelData';
import { getAssetImageUrl } from '../utils/imageHelper';

export default function TourDetailsModal({ tour, onClose, onBookTour }) {
  if (!tour) return null;

  const { siteConfig } = travelData;
  const [activeImage, setActiveImage] = useState(tour.image);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello Travel Care 4 All,\nI'm viewing the "${tour.title}" (${tour.days} Days) itinerary. Please share date availability and live quotes.`);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Banner with Active Image */}
        <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl bg-slate-900">
          <img
            src={getAssetImageUrl(activeImage)}
            alt={tour.title}
            onError={(e) => { e.currentTarget.src = '/images/hero.png'; }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

          {/* Bottom Title Info */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-emerald-500/90 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {tour.destination}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                {tour.days - 1} Nights / {tour.days} Days
              </span>
              <span className="bg-amber-400 text-slate-950 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                {tour.travelType}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              {tour.title}
            </h2>
          </div>
        </div>

        {/* Gallery Thumbnails if multiple */}
        {tour.gallery && tour.gallery.length > 1 && (
          <div className="px-6 py-3 bg-slate-100 flex gap-2 overflow-x-auto border-b border-slate-200">
            {tour.gallery.map((img) => (
              <button
                key={img}
                onClick={() => setActiveImage(img)}
                className={`relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                  activeImage === img ? 'border-[#056839] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={getAssetImageUrl(img)} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Quick Pricing & Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Sample Package Price
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold text-[#024724]">
                  ₹{tour.price.toLocaleString('en-IN')}
                </span>
                {tour.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{tour.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-slate-500 font-medium">per person</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleWhatsApp}
                className="btn btn-wa text-xs sm:text-sm px-4 py-2.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookTour(tour);
                }}
                className="btn btn-primary text-xs sm:text-sm px-5 py-2.5"
              >
                <span>Book This Tour</span>
              </button>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
              Overview
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {tour.overview}
            </p>
          </div>

          {/* Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Key Tour Highlights</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {tour.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
                    <Check className="w-4 h-4 text-[#056839] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day by Day Itinerary */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Day-by-Day Itinerary</span>
              </h3>
              <div className="space-y-4">
                {tour.itinerary.map((step, idx) => (
                  <div 
                    key={idx}
                    className="flex gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/20 transition"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#024724] font-display font-black text-sm flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] uppercase font-semibold leading-none">Day</span>
                      <span className="text-base font-extrabold leading-none">{step.day || idx + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {step.title}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Logistics Summary (Hotels, Transportation, Meals) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                <BedDouble className="w-4 h-4 text-emerald-600" />
                <span>Accommodation</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {tour.hotels ? tour.hotels.join(', ') : tour.hotel || 'Selected hotel'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                <Car className="w-4 h-4 text-blue-600" />
                <span>Transportation</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {tour.transportation || 'Transfers and sightseeing vehicle included'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                <Utensils className="w-4 h-4 text-amber-600" />
                <span>Meals</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {tour.meals || 'Daily breakfast included'}
              </p>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {/* Inclusions */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
              <h4 className="font-bold text-[#024724] text-sm mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>What's Included</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {(tour.inclusions || []).map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100">
              <h4 className="font-bold text-rose-900 text-sm mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>What's Not Included</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {(tour.exclusions || []).map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✕</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Dedicated travel consultant in Vijayawada will confirm all bookings</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="btn btn-outline text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookTour(tour);
                }}
                className="btn btn-primary text-xs"
              >
                Proceed to Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
