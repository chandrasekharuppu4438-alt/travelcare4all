import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, MapPin, Heart, ChevronRight, X, Sparkles } from 'lucide-react';
import travelData from '../data/travelData';

export default function GalleryPage() {
  const { gallery } = travelData;
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const categories = ['All', 'Beaches', 'Mountains', 'Heritage', 'Cities'];

  const photos = [
    { image: 'bali', caption: 'Sunset over Uluwatu Cliff Temple', destination: 'Bali, Indonesia', category: 'Beaches' },
    { image: 'maldives', caption: 'Overwater lagoon bungalows', destination: 'Maldives', category: 'Beaches' },
    { image: 'kashmir', caption: 'Traditional Shikara ride on Dal Lake', destination: 'Kashmir, India', category: 'Mountains' },
    { image: 'himachal', caption: 'Snow clad peaks of Solang Valley', destination: 'Himachal, India', category: 'Mountains' },
    { image: 'dubai', caption: 'Golden sunset over desert dunes', destination: 'Dubai, UAE', category: 'Cities' },
    { image: 'singapore', caption: 'Futuristic light show at Gardens by the Bay', destination: 'Singapore', category: 'Cities' },
    { image: 'thailand', caption: 'Emerald limestone islands of Maya Bay', destination: 'Phuket, Thailand', category: 'Beaches' },
    { image: 'bangkok', caption: 'Grand Palace golden spires', destination: 'Bangkok, Thailand', category: 'Heritage' },
    { image: 'malaysia', caption: 'Iconic Petronas Twin Towers skyline', destination: 'Kuala Lumpur, Malaysia', category: 'Cities' },
    { image: 'vietnam', caption: 'Emerald waters & junks in Ha Long Bay', destination: 'Ha Long Bay, Vietnam', category: 'Beaches' },
    { image: 'rajasthan', caption: 'Amber Fort courtyard at dawn', destination: 'Jaipur, Rajasthan', category: 'Heritage' },
    { image: 'kerala', caption: 'Peaceful backwater cruise in Alleppey', destination: 'Kerala, India', category: 'Beaches' },
    { image: 'srilanka', caption: 'Nine Arches Bridge scenic train', destination: 'Ella, Sri Lanka', category: 'Mountains' },
    { image: 'turkey', caption: 'Hot air balloons rising over Cappadocia', destination: 'Cappadocia, Turkey', category: 'Heritage' },
    { image: 'pilgrim', caption: 'Holy darshan at Tirumala hills', destination: 'Tirupati, India', category: 'Heritage' },
    { image: 'goa', caption: 'Palolem beach palm fringed shores', destination: 'Goa, India', category: 'Beaches' }
  ];

  const filteredPhotos = photos.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#fafbf9] text-[#17231d]">
      {/* 1. Breadcrumb Strip */}
      <div className="pt-28 pb-4 bg-[#eef8f1] border-b border-[#17231d]/5">
        <div className="container mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#17231d]/60">
            <Link to="/" className="hover:text-[#168447] transition">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-[#17231d]">Gallery</span>
          </nav>
        </div>
      </div>

      {/* 2. Scenic Header Banner */}
      <section className="relative overflow-hidden bg-[#17231d] pt-16 pb-20 sm:pt-20 sm:pb-24 text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/malaysia.png"
            alt="Travel Gallery"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17231d] via-[#17231d]/75 to-[#17231d]/85" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <p className="eyebrow justify-center mb-3 text-amber-300">
              <span className="h-px w-6 bg-[#e66a2c]" />
              Travel Memories
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white">
              Moments <span className="text-amber-300 font-display">from the Road</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed">
              Unfiltered snapshots captured by our travellers across turquoise islands, snowy mountain passes, and iconic landmarks.
            </p>

            {/* Filter Pills */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex flex-wrap justify-center gap-2 rounded-full bg-white/10 p-1.5 ring-1 ring-white/20 backdrop-blur-md">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                      activeCategory === cat
                        ? 'bg-[#168447] text-white shadow-md'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Photo Gallery Grid */}
      <section className="container mx-auto py-16 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPhotos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative h-[320px] overflow-hidden rounded-3xl bg-white ring-1 ring-[#17231d]/10 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-lift cursor-pointer"
            >
              <img
                src={`/images/${photo.image}.png`}
                alt={photo.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17231d]/90 via-[#17231d]/25 to-transparent transition-opacity" />

              <span className="absolute top-4 right-4 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-white/20">
                {photo.category}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <MapPin className="h-3.5 w-3.5" />
                  {photo.destination}
                </span>
                <h4 className="mt-1 text-base font-bold font-sans text-white leading-snug">
                  {photo.caption}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-[16/10] w-full bg-black">
              <img
                src={`/images/${selectedPhoto.image}.png`}
                alt={selectedPhoto.caption}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#168447] uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  {selectedPhoto.destination}
                </span>
                <h3 className="text-xl font-bold font-sans text-[#17231d] mt-1">
                  {selectedPhoto.caption}
                </h3>
              </div>
              <Link
                to="/tours"
                className="btn btn-primary !py-2.5 !px-5 !bg-[#e66a2c] hover:!bg-[#d85e22] text-white text-sm font-bold whitespace-nowrap"
              >
                Find Similar Tours
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
