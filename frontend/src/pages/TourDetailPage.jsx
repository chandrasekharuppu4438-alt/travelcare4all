import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  BedDouble, 
  Star, 
  Check, 
  X as XIcon, 
  MessageSquare, 
  Phone, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  ArrowLeft,
  FileCheck
} from 'lucide-react';
import travelData from '../data/travelData';
import TourCard from '../components/TourCard';
import { getAssetImageUrl } from '../utils/imageHelper';

export default function TourDetailPage({ onBookTour }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { tours, siteConfig } = travelData;

  const tour = tours.find(t => t.slug === slug);
  const [activeImage, setActiveImage] = useState(tour?.image || '');
  const [expandedDays, setExpandedDays] = useState({ 1: true });

  useEffect(() => {
    if (tour) {
      setActiveImage(tour.image);
      setExpandedDays({ 1: true });
    }
  }, [tour]);

  if (!tour) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-5 py-24 text-center">
        <h2 className="text-3xl font-display font-bold text-[#17231d]">Tour Package Not Found</h2>
        <p className="mt-3 text-slate-500 max-w-md">
          The requested tour package could not be found or may have been updated.
        </p>
        <Link to="/tours" className="btn btn-primary mt-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Browse All Tour Packages
        </Link>
      </div>
    );
  }

  const discount = tour.originalPrice 
    ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100) 
    : 0;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Travel Care 4 All,\nI’m interested in the "${tour.title}" (${tour.days} Days) package. Please share availability and current pricing.`
    );
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  const toggleDay = (dayNum) => {
    setExpandedDays(prev => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  // Similar tours
  const similarTours = tours
    .filter(t => t.slug !== tour.slug && (t.country === tour.country || t.packageType === tour.packageType))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fafbf9] text-[#17231d] pb-24 lg:pb-0">
      {/* 1. Breadcrumbs Strip */}
      <div className="pt-28 pb-4 bg-[#17231d]/5 border-b border-[#17231d]/5">
        <div className="container mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#17231d]/60">
            <Link to="/" className="hover:text-[#168447] transition">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/tours" className="hover:text-[#168447] transition">Tours</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-[#17231d] truncate">{tour.title}</span>
          </nav>
        </div>
      </div>

      {/* 2. Scenic Tour Hero */}
      <section className="relative overflow-hidden bg-[#17231d] text-white py-16 sm:py-24">
        <div className="absolute inset-0 -z-10">
          <img
            src={getAssetImageUrl(activeImage)}
            alt={tour.title}
            onError={(e) => { e.currentTarget.src = '/images/hero.png'; }}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17231d] via-[#17231d]/75 to-transparent" />
        </div>

        <div className="container mx-auto">
          <div className="max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-[#168447] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {tour.destination}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                {tour.days - 1} Nights / {tour.days} Days
              </span>
              <span className="bg-amber-400 text-[#17231d] text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                {tour.travelType}
              </span>
              {discount > 0 && (
                <span className="bg-[#e66a2c] text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
              {tour.title}
            </h1>

            {/* Rating & Short description */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span>{tour.rating}</span>
                <span className="text-white/60 font-normal">({tour.reviews} traveller reviews)</span>
              </div>
              <span className="text-white/40">•</span>
              <span className="text-white/80 flex items-center gap-1">
                <BedDouble className="h-4 w-4 text-[#168447]" />
                {tour.hotel}
              </span>
            </div>

            <p className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed">
              {tour.overview || tour.shortDescription}
            </p>
          </div>

          {/* Gallery Thumbnails if available */}
          {tour.gallery && tour.gallery.length > 1 && (
            <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
              {tour.gallery.map((img) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                    activeImage === img ? 'border-[#168447] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={getAssetImageUrl(img)} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Details & Sticky Booking Card Layout */}
      <section className="container mx-auto py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] items-start">
          {/* Left Column: Itinerary, Highlights, Hotels, Inclusions */}
          <div className="space-y-10">
            {/* Highlights */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card ring-1 ring-[#17231d]/5">
              <h2 className="text-2xl font-display font-bold text-[#17231d] flex items-center gap-2 mb-6">
                <Sparkles className="h-5 w-5 text-[#e66a2c]" />
                Trip Highlights
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {tour.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-[#168447]/10 text-[#168447] shrink-0 mt-0.5">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span className="text-sm font-medium text-[#17231d]/80">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card ring-1 ring-[#17231d]/5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="eyebrow mb-1 text-xs">
                    <span className="h-px w-5 bg-[#e66a2c]" />
                    Day by Day Breakdown
                  </p>
                  <h2 className="text-2xl font-display font-bold text-[#17231d]">
                    Full Itinerary Plan
                  </h2>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#168447] bg-[#eef8f1] px-3 py-1 rounded-full">
                  {tour.days} Days
                </span>
              </div>

              <div className="space-y-4">
                {tour.itinerary.map((day) => {
                  const isOpen = !!expandedDays[day.day];
                  return (
                    <div 
                      key={day.day} 
                      className="rounded-2xl border border-slate-100 bg-[#f7f9f7] overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleDay(day.day)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-display font-bold text-base sm:text-lg text-[#17231d] hover:text-[#168447] transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#168447] text-white text-xs font-extrabold">
                            D{day.day}
                          </span>
                          <span>{day.title}</span>
                        </div>
                        <span className="text-xs font-bold text-[#168447]">
                          {isOpen ? 'Collapse −' : 'Expand +'}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-sm text-[#17231d]/75 space-y-3 border-t border-slate-200/60 bg-white">
                          <p className="leading-relaxed">{day.description}</p>
                          {(day.meals || day.hotel) && (
                            <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#17231d]/60">
                              {day.meals && <span>🍽️ Meals: <strong>{day.meals}</strong></span>}
                              {day.hotel && <span>🏨 Stay: <strong>{day.hotel}</strong></span>}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-[#17231d]/5">
                <h3 className="font-display font-bold text-lg text-[#075c35] flex items-center gap-2 mb-4">
                  <Check className="h-5 w-5 text-[#168447]" />
                  What’s Included
                </h3>
                <ul className="space-y-2.5 text-sm text-[#17231d]/75">
                  {(tour.inclusions || [
                    'Selected star hotel accommodation',
                    'Daily breakfast and scheduled meals',
                    'Airport pick-up and drop transfers',
                    'Guided sightseeing excursions',
                    'Entry tickets per itinerary',
                    'Dedicated consultant & on-trip support'
                  ]).map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#168447] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-[#17231d]/5">
                <h3 className="font-display font-bold text-lg text-rose-700 flex items-center gap-2 mb-4">
                  <XIcon className="h-5 w-5 text-rose-500" />
                  What’s Excluded
                </h3>
                <ul className="space-y-2.5 text-sm text-[#17231d]/75">
                  {(tour.exclusions || [
                    'Airfare (available upon request)',
                    'Visa fee (assisted by Fast Track Visa desk)',
                    'Personal expenses & shopping',
                    'Optional adventure rides or sports',
                    'Travel and medical insurance'
                  ]).map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XIcon className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Visa Assistance Badge */}
            <div className="rounded-3xl bg-[#eef8f1] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 border border-[#168447]/20">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#168447] text-white shrink-0">
                <FileCheck className="h-6 w-6" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h4 className="font-display font-bold text-lg text-[#075c35]">
                  Fast Track Visa Services Available
                </h4>
                <p className="mt-1 text-sm text-[#17231d]/70">
                  Planning an international holiday? Our dedicated Visa &amp; Passport Desk in Vijayawada assists with document checklists, form filling, appointments and follow-ups.
                </p>
              </div>
              <Link to="/#visa" className="btn btn-outline shrink-0 !bg-white">
                Learn more
              </Link>
            </div>
          </div>

          {/* Right Column: Sticky Booking & Quote Card */}
          <aside className="sticky top-28 space-y-6">
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-2xl ring-1 ring-[#17231d]/10">
              <p className="text-xs font-bold uppercase tracking-wider text-[#17231d]/50">
                Package Starting Price
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#075c35]">
                  ₹{tour.price.toLocaleString('en-IN')}
                </span>
                {tour.originalPrice && (
                  <span className="text-base text-[#17231d]/40 line-through">
                    ₹{tour.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-[#17231d]/55">
                per person · based on twin sharing · sample fare
              </p>

              <div className="my-6 space-y-3 pt-4 border-t border-dashed border-[#17231d]/10 text-xs text-[#17231d]/75">
                <div className="flex items-center justify-between">
                  <span>Duration:</span>
                  <strong className="text-[#17231d]">{tour.days - 1} Nights / {tour.days} Days</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Destination:</span>
                  <strong className="text-[#17231d]">{tour.destination}, {tour.country}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Accommodation:</span>
                  <strong className="text-[#17231d] truncate max-w-[180px]">{tour.hotel}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => onBookTour(tour)}
                  className="btn btn-primary w-full !py-3.5 text-base shadow-lg shadow-[#168447]/20"
                >
                  Book This Tour
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="btn btn-wa w-full !py-3"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span>Enquire on WhatsApp</span>
                </button>

                <a
                  href="tel:+917386133399"
                  className="btn btn-outline w-full !py-3"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Call: +91 73861 33399</span>
                </a>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5 text-xs text-[#17231d]/60">
                <ShieldCheck className="h-5 w-5 text-[#168447] shrink-0" />
                <span>Managed by B. Vidya Sagar · Vijayawada, Andhra Pradesh</span>
              </div>
            </div>
          </aside>
        </div>

        {/* 4. Similar / Handpicked Packages */}
        {similarTours.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#17231d]/10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="eyebrow mb-1 text-xs">
                  <span className="h-px w-5 bg-[#e66a2c]" />
                  More escapes
                </p>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#17231d]">
                  You Might Also Like
                </h3>
              </div>
              <Link to="/tours" className="btn btn-outline">
                All packages
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarTours.map((sim) => (
                <TourCard
                  key={sim.slug}
                  tour={sim}
                  onBookTour={onBookTour}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 5. Sticky Mobile Consultation & Booking Bar */}
      <aside aria-label="Quick booking actions" className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0d1612]/95 backdrop-blur-lg border-t border-white/10 px-4 py-3 shadow-[0_-10px_25px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div>
            <div className="text-[0.68rem] text-slate-300 uppercase tracking-wider font-semibold">Starting from</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold font-display text-amber-300">₹{tour.price?.toLocaleString('en-IN')}</span>
              <span className="text-[0.65rem] text-slate-400">/ person</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="btn btn-wa !py-2.5 !px-3 text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
              aria-label="WhatsApp Inquiry"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={() => onBookTour(tour)}
              className="btn btn-primary !py-2.5 !px-4 text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>Book Now</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
