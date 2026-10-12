import React, { useState, useEffect } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  MessageSquare, 
  Compass, 
  Check, 
  ChevronRight,
  Filter
} from 'lucide-react';
import TourCard from './TourCard';
import travelData from '../data/travelData';

export default function ToursSection({ 
  onSelectTour, 
  onBookTour,
  initialFilters = {} 
}) {
  const { tours, siteConfig } = travelData;

  const [search, setSearch] = useState(initialFilters.search || '');
  const [destination, setDestination] = useState(initialFilters.destination || '');
  const [packageType, setPackageType] = useState(initialFilters.packageType || '');
  const [travelType, setTravelType] = useState(initialFilters.travelType || '');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [sort, setSort] = useState('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialFilters.destination !== undefined) setDestination(initialFilters.destination);
    if (initialFilters.travelType !== undefined) setTravelType(initialFilters.travelType);
    if (initialFilters.packageType !== undefined) setPackageType(initialFilters.packageType);
    if (initialFilters.search !== undefined) setSearch(initialFilters.search);
  }, [initialFilters]);

  const uniqueDestinations = Array.from(new Set(tours.map(t => t.destination))).sort();
  const uniqueTravelTypes = Array.from(new Set(tours.map(t => t.travelType))).sort();

  // Filter
  const filteredTours = tours.filter((t) => {
    if (search) {
      const q = search.toLowerCase();
      const match = t.title.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q) ||
        t.country.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (destination && t.destination.toLowerCase() !== destination.toLowerCase()) {
      return false;
    }
    if (packageType && t.packageType !== packageType) {
      return false;
    }
    if (travelType && t.travelType.toLowerCase() !== travelType.toLowerCase()) {
      return false;
    }
    if (minPrice && t.price < Number(minPrice)) return false;
    if (maxPrice && t.price > Number(maxPrice)) return false;
    if (duration) {
      if (duration === '1-3' && t.days > 3) return false;
      if (duration === '4-6' && (t.days < 4 || t.days > 6)) return false;
      if (duration === '7+' && t.days < 7) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'duration-asc') return a.days - b.days;
    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
  });

  const resetFilters = () => {
    setSearch('');
    setDestination('');
    setPackageType('');
    setTravelType('');
    setMinPrice('');
    setMaxPrice('');
    setDuration('');
    setSort('popular');
  };

  return (
    <section id="tours" className="scroll-mt-24 py-16 sm:py-24 bg-white relative">
      {/* Search Header Banner */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 mb-10 text-center">
        <p className="eyebrow mb-2">
          <span className="h-px w-6 bg-[#e66a2c]" />
          Tour Packages
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#17231d] font-display">
          Find your next journey
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-[#17231d]/65">
          Holidays, honeymoons, pilgrimages and group tours — filter by what matters to you.
        </p>

        {/* Search input bar */}
        <div className="mx-auto mt-6 flex max-w-xl gap-2 rounded-full bg-white p-1.5 shadow-lift ring-1 ring-[#17231d]/10">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Dubai, Kashmir, honeymoon…"
            className="min-w-0 flex-1 rounded-full bg-transparent px-5 text-[#17231d] outline-none placeholder:text-[#17231d]/40 text-sm"
          />
          <button 
            type="button" 
            className="btn btn-primary !py-2.5 !px-5"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Tour Results */}
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[290px_1fr] lg:py-4">
        {/* Mobile Filter Toggle */}
        <div className="flex lg:hidden items-center justify-between pb-2 border-b border-slate-100">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="btn btn-outline text-xs !py-2 !px-4"
          >
            <Filter className="h-3.5 w-3.5" />
            <span>{mobileFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
          <span className="text-xs font-semibold text-[#17231d]/60">
            {filteredTours.length} packages found
          </span>
        </div>

        {/* Sidebar Filters */}
        <aside className={`${mobileFilterOpen ? 'block' : 'hidden'} lg:block lg:bg-transparent`}>
          <form 
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6 rounded-3xl bg-white p-5 lg:sticky lg:top-24 lg:p-6 lg:shadow-card lg:ring-1 lg:ring-[#17231d]/5"
          >
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-sans text-base font-bold text-[#17231d]">
                <SlidersHorizontal className="h-4 w-4 text-[#168447]" />
                <span>Filters</span>
              </h3>
              {(destination || packageType || travelType || search || duration) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#e66a2c] hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Destination */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#17231d]/55">
                Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="field text-xs font-semibold"
              >
                <option value="">All destinations</option>
                {uniqueDestinations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Region / Package Type */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#17231d]/55">
                Package Type
              </label>
              <div className="grid grid-cols-3 gap-1 rounded-full bg-[#f7f9f7] p-1">
                {['', 'Domestic', 'International'].map((type) => (
                  <button
                    key={type || 'all'}
                    type="button"
                    onClick={() => setPackageType(type)}
                    className={`rounded-full py-1.5 text-xs font-semibold transition ${
                      packageType === type
                        ? 'bg-[#168447] text-white shadow-sm'
                        : 'text-[#17231d]/65 hover:text-[#168447]'
                    }`}
                  >
                    {type === 'International' ? 'Intl.' : type || 'All'}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Category */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#17231d]/55">
                Travel Type
              </label>
              <select
                value={travelType}
                onChange={(e) => setTravelType(e.target.value)}
                className="field text-xs font-semibold"
              >
                <option value="">Any type</option>
                {uniqueTravelTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#17231d]/55">
                Duration
              </label>
              <div className="space-y-1.5 text-xs text-[#17231d]/80">
                {[
                  { id: '', label: 'Any duration' },
                  { id: '1-3', label: '1 to 3 Days' },
                  { id: '4-6', label: '4 to 6 Days' },
                  { id: '7+', label: '7+ Days' }
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="duration"
                      checked={duration === item.id}
                      onChange={() => setDuration(item.id)}
                      className="accent-[#168447]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Presets */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#17231d]/55">
                Price (₹ per person)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'Under ₹20k', max: 20000 },
                  { label: '₹20k – ₹50k', min: 20000, max: 50000 },
                  { label: '₹50k+', min: 50000 }
                ].map((p, idx) => {
                  const active = minPrice === (p.min || '') && maxPrice === (p.max || '');
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setMinPrice(active ? '' : (p.min || ''));
                        setMaxPrice(active ? '' : (p.max || ''));
                      }}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 transition ${
                        active
                          ? 'bg-[#e66a2c] text-white ring-[#e66a2c]'
                          : 'ring-[#17231d]/10 hover:ring-[#e66a2c] text-[#17231d]/70'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset button */}
            <button
              type="button"
              onClick={resetFilters}
              className="btn btn-outline !py-2 !px-3 w-full text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset All Filters</span>
            </button>
          </form>
        </aside>

        {/* Results Area */}
        <div>
          {/* Header row */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-sans text-lg font-bold text-[#17231d]">
                {filteredTours.length} tour{filteredTours.length === 1 ? '' : 's'} found
                {search && <span className="font-medium text-[#17231d]/55"> for "{search}"</span>}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm text-[#17231d]/60">
                <span className="hidden sm:inline text-xs">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="field !w-auto !rounded-full !py-1.5 !px-3 font-semibold text-xs"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="duration-asc">Duration: Short to Long</option>
                </select>
              </label>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredTours.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTours.map((tour) => (
                <TourCard
                  key={tour.slug}
                  tour={tour}
                  onSelectTour={onSelectTour}
                  onBookTour={onBookTour}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-[#f7f9f7] p-10 text-center ring-1 ring-[#17231d]/5">
              <h3 className="text-2xl font-semibold font-display text-[#17231d]">
                No ready packages match — yet.
              </h3>
              <p className="mx-auto mt-2 max-w-md text-[#17231d]/60 text-sm">
                We build custom itineraries every day. Tell us where you’d like to go and we’ll put one together.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn btn-outline text-xs"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset filters</span>
                </button>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hello%20Travel%20Care%204%20All%2C%0AI%20would%20like%20a%20custom%20itinerary.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa text-xs"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Plan a custom trip</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
