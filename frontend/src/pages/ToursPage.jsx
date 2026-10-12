import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Filter, 
  Compass,
  MessageSquare,
  Sparkles,
  Users,
  Calendar
} from 'lucide-react';
import TourCard from '../components/TourCard';
import travelData from '../data/travelData';

const PRICE_QUICK_FILTERS = [
  { label: 'Under ₹20k', min: 0, max: 20000 },
  { label: '₹20k – ₹50k', min: 20000, max: 50000 },
  { label: '₹50k+', min: 50000, max: null }
];

const DURATION_OPTIONS = [
  { key: '1-3', label: '1 - 3 Days' },
  { key: '4-6', label: '4 - 6 Days' },
  { key: '7+', label: '7+ Days' }
];

const RATING_OPTIONS = [4.8, 4.5, 4.0];

const ITEMS_PER_PAGE = 6;

export default function ToursPage({ onSelectTour, onBookTour }) {
  const { tours, siteConfig } = travelData;
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract query params
  const paramSearch = searchParams.get('search') || '';
  const paramDestination = searchParams.get('destination') || '';
  const paramCountry = searchParams.get('country') || '';
  const paramTravelType = searchParams.get('travelType') || '';
  const paramPackageType = searchParams.get('packageType') || '';
  const paramMinPrice = searchParams.get('minPrice') || '';
  const paramMaxPrice = searchParams.get('maxPrice') || '';
  const paramDuration = searchParams.get('duration') || '';
  const paramRating = searchParams.get('rating') || '';
  const paramFeatured = searchParams.get('featured') === 'true';
  const paramPopular = searchParams.get('popular') === 'true';
  const paramSort = searchParams.get('sort') || 'popular';
  const paramPage = parseInt(searchParams.get('page') || '1', 10);
  const paramFrom = searchParams.get('from') || '';
  const paramTo = searchParams.get('to') || '';
  const paramTravellers = searchParams.get('travellers') || '';

  // Local search input state
  const [searchInput, setSearchInput] = useState(paramSearch);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSearchInput(paramSearch);
  }, [paramSearch]);

  // Unique options for selects
  const uniqueDestinations = useMemo(() => {
    return Array.from(new Set(tours.map(t => t.destination))).sort();
  }, [tours]);

  const uniqueCountries = useMemo(() => {
    return Array.from(new Set(tours.map(t => t.country))).sort();
  }, [tours]);

  const uniqueTravelTypes = useMemo(() => {
    return Array.from(new Set(tours.map(t => t.travelType))).sort();
  }, [tours]);

  // Helper to update specific search params
  const updateParams = (newParams, resetPage = true) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === undefined || val === null || val === '') {
        updated.delete(key);
      } else {
        updated.set(key, val);
      }
    });

    if (resetPage) {
      updated.delete('page');
    }

    setSearchParams(updated, { replace: true });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ search: searchInput.trim() });
  };

  const handleClearAllFilters = () => {
    setSearchInput('');
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  // Filter computation
  const filteredTours = useMemo(() => {
    return tours.filter((t) => {
      // Text search
      if (paramSearch) {
        const q = paramSearch.toLowerCase();
        const match =
          t.title.toLowerCase().includes(q) ||
          t.destination.toLowerCase().includes(q) ||
          t.country.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.travelType.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Destination
      if (paramDestination && t.destination.toLowerCase() !== paramDestination.toLowerCase()) {
        return false;
      }

      // Country
      if (paramCountry && t.country.toLowerCase() !== paramCountry.toLowerCase()) {
        return false;
      }

      // Travel Type
      if (paramTravelType && t.travelType.toLowerCase() !== paramTravelType.toLowerCase()) {
        return false;
      }

      // Package Type
      if (paramPackageType && t.packageType !== paramPackageType) {
        return false;
      }

      // Price range
      if (paramMinPrice && t.price < Number(paramMinPrice)) return false;
      if (paramMaxPrice && t.price > Number(paramMaxPrice)) return false;

      // Duration
      if (paramDuration) {
        if (paramDuration === '1-3' && t.days > 3) return false;
        if (paramDuration === '4-6' && (t.days < 4 || t.days > 6)) return false;
        if (paramDuration === '7+' && t.days < 7) return false;
      }

      // Rating
      if (paramRating && t.rating < Number(paramRating)) return false;

      // Featured / Popular checkboxes
      if (paramFeatured && !t.featured) return false;
      if (paramPopular && !t.popular) return false;

      return true;
    }).sort((a, b) => {
      if (paramSort === 'price-asc') return a.price - b.price;
      if (paramSort === 'price-desc') return b.price - a.price;
      if (paramSort === 'duration-asc') return a.days - b.days;
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [
    tours,
    paramSearch,
    paramDestination,
    paramCountry,
    paramTravelType,
    paramPackageType,
    paramMinPrice,
    paramMaxPrice,
    paramDuration,
    paramRating,
    paramFeatured,
    paramPopular,
    paramSort
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredTours.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(paramPage, 1), Math.max(totalPages, 1));
  const paginatedTours = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTours.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTours, currentPage]);

  const activeFiltersCount = [
    paramDestination,
    paramCountry,
    paramTravelType,
    paramPackageType,
    paramMinPrice,
    paramMaxPrice,
    paramDuration,
    paramRating,
    paramFeatured,
    paramPopular
  ].filter(Boolean).length;

  const handleCustomTripWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Travel Care 4 All,\nI am looking for a custom itinerary${paramDestination ? ` for ${paramDestination}` : ''}${paramSearch ? ` related to "${paramSearch}"` : ''}. Please guide me.`
    );
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fafbf9] text-[#17231d]">
      {/* 1. Scenic Hero Search Header */}
      <section className="relative overflow-hidden bg-[#17231d] pt-36 pb-20 sm:pt-40 sm:pb-24 text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/thailand.png"
            alt="Thailand scenic seascape"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17231d] via-[#17231d]/60 to-[#17231d]/80" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <p className="eyebrow justify-center mb-3 text-amber-300">
            <span className="h-px w-6 bg-[#e66a2c]" />
            Tour Packages
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-white font-display">
            Find your next journey
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/80">
            Holidays, honeymoons, pilgrimages and group tours — filter by destination, budget, duration and style.
          </p>

          {/* Search Bar Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 mx-auto flex max-w-2xl items-center gap-2 rounded-full bg-white p-2 shadow-2xl ring-1 ring-white/30"
          >
            <div className="flex-1 flex items-center pl-4">
              <Search className="h-5 w-5 text-[#17231d]/40 mr-3 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search Dubai, Kashmir, honeymoon, Maldives..."
                className="w-full bg-transparent text-[#17231d] outline-none placeholder:text-[#17231d]/40 text-sm sm:text-base font-medium"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    updateParams({ search: '' });
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary !py-3 !px-6 rounded-full shrink-0 shadow-md"
            >
              <Search className="h-4 w-4 mr-1.5 hidden sm:inline" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {/* 2. Main Content: Sidebar Filters + Tour Results Grid */}
      <section id="results" className="container mx-auto py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[290px_1fr] items-start">
          {/* Desktop Left Sticky Filter Sidebar */}
          <aside className="hidden lg:block sticky top-28 space-y-6 rounded-3xl bg-white p-6 shadow-card ring-1 ring-[#17231d]/5">
            <div className="flex items-center justify-between pb-4 border-b border-[#17231d]/10">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[#17231d]">
                <SlidersHorizontal className="h-5 w-5 text-[#168447]" />
                Filters
              </h2>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="text-xs font-semibold text-[#e66a2c] hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset all
                </button>
              )}
            </div>

            {/* Destination Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/60 mb-2">
                Destination
              </label>
              <select
                value={paramDestination}
                onChange={(e) => updateParams({ destination: e.target.value })}
                className="field"
              >
                <option value="">All Destinations</option>
                {uniqueDestinations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Country Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/60 mb-2">
                Country
              </label>
              <select
                value={paramCountry}
                onChange={(e) => updateParams({ country: e.target.value })}
                className="field"
              >
                <option value="">All Countries</option>
                {uniqueCountries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Travel Type Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/60 mb-2">
                Travel Type
              </label>
              <select
                value={paramTravelType}
                onChange={(e) => updateParams({ travelType: e.target.value })}
                className="field"
              >
                <option value="">Any Travel Type</option>
                {uniqueTravelTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Package Type Tabs */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/60 mb-2">
                Region / Package Type
              </label>
              <div className="grid grid-cols-3 gap-1 rounded-xl bg-[#f7f9f7] p-1 ring-1 ring-[#17231d]/5">
                {[
                  { key: '', label: 'All' },
                  { key: 'Domestic', label: 'India' },
                  { key: 'International', label: 'Intl.' }
                ].map((type) => (
                  <button
                    key={type.label}
                    type="button"
                    onClick={() => updateParams({ packageType: type.key })}
                    className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                      paramPackageType === type.key
                        ? 'bg-[#168447] text-white shadow-sm'
                        : 'text-[#17231d]/70 hover:text-[#168447]'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/60 mb-2">
                Price (₹ per person)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={paramMinPrice}
                  onChange={(e) => updateParams({ minPrice: e.target.value })}
                  className="field text-sm"
                  min="0"
                  step="5000"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={paramMaxPrice}
                  onChange={(e) => updateParams({ maxPrice: e.target.value })}
                  className="field text-sm"
                  min="0"
                  step="5000"
                />
              </div>

              {/* Quick Price Range Chips */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {PRICE_QUICK_FILTERS.map((q) => {
                  const isActive =
                    paramMinPrice === String(q.min) &&
                    (q.max === null ? !paramMaxPrice : paramMaxPrice === String(q.max));
                  return (
                    <button
                      key={q.label}
                      type="button"
                      onClick={() => {
                        if (isActive) {
                          updateParams({ minPrice: '', maxPrice: '' });
                        } else {
                          updateParams({ minPrice: q.min, maxPrice: q.max || '' });
                        }
                      }}
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 transition ${
                        isActive
                          ? 'bg-[#e66a2c] text-white ring-[#e66a2c]'
                          : 'ring-[#17231d]/10 text-[#17231d]/75 hover:ring-[#e66a2c] hover:text-[#e66a2c]'
                      }`}
                    >
                      {q.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration Checkboxes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/60 mb-2">
                Trip Duration
              </label>
              <div className="space-y-2">
                {DURATION_OPTIONS.map((d) => (
                  <label key={d.key} className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
                    <input
                      type="radio"
                      name="duration"
                      checked={paramDuration === d.key}
                      onChange={() => updateParams({ duration: paramDuration === d.key ? '' : d.key })}
                      onClick={() => {
                        if (paramDuration === d.key) updateParams({ duration: '' });
                      }}
                      className="h-4 w-4 accent-[#168447]"
                    />
                    <span className="text-[#17231d]/85 font-medium">{d.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Checkboxes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/60 mb-2">
                Traveller Rating
              </label>
              <div className="space-y-2">
                {RATING_OPTIONS.map((r) => (
                  <label key={r} className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
                    <input
                      type="radio"
                      name="rating"
                      checked={Number(paramRating) === r}
                      onChange={() => updateParams({ rating: Number(paramRating) === r ? '' : r })}
                      onClick={() => {
                        if (Number(paramRating) === r) updateParams({ rating: '' });
                      }}
                      className="h-4 w-4 accent-[#168447]"
                    />
                    <span className="text-[#17231d]/85 font-medium">{r}★ &amp; above</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Highlights Checkboxes */}
            <div className="pt-2 border-t border-[#17231d]/10">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/60 mb-2">
                Highlights
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={paramFeatured}
                    onChange={(e) => updateParams({ featured: e.target.checked ? 'true' : '' })}
                    className="h-4 w-4 accent-[#168447]"
                  />
                  <span className="text-[#17231d]/85 font-medium">Featured handpicked</span>
                </label>
                <label className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={paramPopular}
                    onChange={(e) => updateParams({ popular: e.target.checked ? 'true' : '' })}
                    className="h-4 w-4 accent-[#168447]"
                  />
                  <span className="text-[#17231d]/85 font-medium">Most popular</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Right Results Column */}
          <div>
            {/* Results Header: Count + Sort + Mobile Filter Button */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#17231d]">
                  {filteredTours.length} {filteredTours.length === 1 ? 'Tour Package' : 'Tour Packages'} Found
                  {paramSearch && (
                    <span className="font-normal text-base text-[#17231d]/60 block sm:inline sm:ml-2">
                      for &ldquo;{paramSearch}&rdquo;
                    </span>
                  )}
                </h2>

                {/* Info strip from quicksearch if dates/travellers specified */}
                {(paramTravellers || paramFrom) && (
                  <p className="mt-1.5 inline-flex items-center gap-2 rounded-full bg-[#eef8f1] px-3.5 py-1 text-xs font-semibold text-[#075c35]">
                    {paramTravellers && (
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {paramTravellers} travellers
                      </span>
                    )}
                    {paramFrom && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {paramFrom} {paramTo ? `to ${paramTo}` : ''}
                      </span>
                    )}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Trigger Button */}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="btn btn-outline lg:hidden !py-2 !px-4 text-xs font-bold"
                >
                  <Filter className="h-3.5 w-3.5 mr-1.5" />
                  <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
                </button>

                {/* Sort By Dropdown */}
                <div className="flex items-center gap-2 text-sm text-[#17231d]/70">
                  <span className="hidden sm:inline font-medium">Sort by:</span>
                  <select
                    value={paramSort}
                    onChange={(e) => updateParams({ sort: e.target.value })}
                    className="field !w-auto !py-2 !px-3 !rounded-xl text-xs sm:text-sm font-semibold"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="duration-asc">Duration: Shortest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            {activeFiltersCount > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#17231d]/50 mr-1">
                  Active:
                </span>
                {paramDestination && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#075c35] ring-1 ring-[#17231d]/10">
                    Destination: {paramDestination}
                    <button onClick={() => updateParams({ destination: '' })}><X className="h-3 w-3 ml-1" /></button>
                  </span>
                )}
                {paramCountry && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#075c35] ring-1 ring-[#17231d]/10">
                    Country: {paramCountry}
                    <button onClick={() => updateParams({ country: '' })}><X className="h-3 w-3 ml-1" /></button>
                  </span>
                )}
                {paramTravelType && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#075c35] ring-1 ring-[#17231d]/10">
                    Type: {paramTravelType}
                    <button onClick={() => updateParams({ travelType: '' })}><X className="h-3 w-3 ml-1" /></button>
                  </span>
                )}
                {paramPackageType && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#075c35] ring-1 ring-[#17231d]/10">
                    {paramPackageType}
                    <button onClick={() => updateParams({ packageType: '' })}><X className="h-3 w-3 ml-1" /></button>
                  </span>
                )}
                {(paramMinPrice || paramMaxPrice) && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#075c35] ring-1 ring-[#17231d]/10">
                    ₹{paramMinPrice || 0} – ₹{paramMaxPrice || 'Max'}
                    <button onClick={() => updateParams({ minPrice: '', maxPrice: '' })}><X className="h-3 w-3 ml-1" /></button>
                  </span>
                )}
                {paramDuration && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#075c35] ring-1 ring-[#17231d]/10">
                    Duration: {paramDuration}
                    <button onClick={() => updateParams({ duration: '' })}><X className="h-3 w-3 ml-1" /></button>
                  </span>
                )}
                {paramRating && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#075c35] ring-1 ring-[#17231d]/10">
                    Rating: {paramRating}★+
                    <button onClick={() => updateParams({ rating: '' })}><X className="h-3 w-3 ml-1" /></button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="text-xs text-[#e66a2c] hover:underline font-bold ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Tour Cards Grid */}
            {paginatedTours.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedTours.map((tour) => (
                  <TourCard
                    key={tour.slug}
                    tour={tour}
                    onSelectTour={onSelectTour}
                    onBookTour={onBookTour}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="rounded-3xl bg-white p-12 text-center shadow-card ring-1 ring-[#17231d]/5">
                <Compass className="h-12 w-12 text-[#168447] mx-auto mb-4 stroke-1" />
                <h3 className="font-display text-2xl font-bold text-[#17231d]">
                  No ready packages match — yet.
                </h3>
                <p className="mt-3 max-w-md mx-auto text-base text-[#17231d]/65">
                  We build custom itineraries every day from our Vijayawada office. Tell us where you’d like to go and we’ll put one together.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleClearAllFilters}
                    className="btn btn-outline"
                  >
                    <RotateCcw className="h-4 w-4 mr-1.5" />
                    Reset filters
                  </button>
                  <button
                    type="button"
                    onClick={handleCustomTripWhatsApp}
                    className="btn btn-wa"
                  >
                    <MessageSquare className="h-4 w-4 mr-1.5" />
                    Plan a custom trip
                  </button>
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => updateParams({ page: currentPage - 1 }, false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-[#17231d]/10 text-[#17231d] hover:bg-[#eef8f1] hover:text-[#168447] disabled:opacity-40 disabled:pointer-events-none transition"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => updateParams({ page: pageNum }, false)}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition ${
                      currentPage === pageNum
                        ? 'bg-[#168447] text-white shadow-lg shadow-[#168447]/30'
                        : 'bg-white ring-1 ring-[#17231d]/10 text-[#17231d] hover:bg-[#eef8f1] hover:text-[#168447]'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => updateParams({ page: currentPage + 1 }, false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-[#17231d]/10 text-[#17231d] hover:bg-[#eef8f1] hover:text-[#168447] disabled:opacity-40 disabled:pointer-events-none transition"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm p-4 flex justify-end">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#17231d]/10">
              <h3 className="font-display text-xl font-bold text-[#17231d] flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-[#168447]" />
                Filters
              </h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Destination */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/60 mb-2">
                Destination
              </label>
              <select
                value={paramDestination}
                onChange={(e) => updateParams({ destination: e.target.value })}
                className="field"
              >
                <option value="">All Destinations</option>
                {uniqueDestinations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Mobile Country */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/60 mb-2">
                Country
              </label>
              <select
                value={paramCountry}
                onChange={(e) => updateParams({ country: e.target.value })}
                className="field"
              >
                <option value="">All Countries</option>
                {uniqueCountries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Mobile Travel Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/60 mb-2">
                Travel Type
              </label>
              <select
                value={paramTravelType}
                onChange={(e) => updateParams({ travelType: e.target.value })}
                className="field"
              >
                <option value="">Any Travel Type</option>
                {uniqueTravelTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Mobile Package Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/60 mb-2">
                Region
              </label>
              <div className="grid grid-cols-3 gap-1 rounded-xl bg-[#f7f9f7] p-1 ring-1 ring-[#17231d]/5">
                {[
                  { key: '', label: 'All' },
                  { key: 'Domestic', label: 'India' },
                  { key: 'International', label: 'Intl.' }
                ].map((type) => (
                  <button
                    key={type.label}
                    type="button"
                    onClick={() => updateParams({ packageType: type.key })}
                    className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                      paramPackageType === type.key
                        ? 'bg-[#168447] text-white'
                        : 'text-[#17231d]/70'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Done CTA */}
            <div className="pt-4 grid grid-cols-2 gap-3 border-t border-[#17231d]/10">
              <button
                type="button"
                onClick={() => {
                  handleClearAllFilters();
                  setMobileFiltersOpen(false);
                }}
                className="btn btn-outline"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="btn btn-primary"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
