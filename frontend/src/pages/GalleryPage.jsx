import React, { useState } from 'react';
import { Camera, MapPin, Heart } from 'lucide-react';
import travelData from '../data/travelData';

export default function GalleryPage() {
  const { gallery } = travelData;
  const [activeCategory, setActiveCategory] = useState('All');

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
    <div className="min-h-screen bg-[#0d1612] text-white">
      {/* 1. Header Hero */}
      <section className="relative overflow-hidden pt-36 pb-16 sm:pt-40 sm:pb-20 text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#168447]/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-4xl px-5 sm:px-8 relative z-10">
          <p className="eyebrow justify-center mb-3 text-amber-300">
            <span className="h-px w-6 bg-[#e66a2c]" />
            Travel Memories
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white">
            Moments <span className="text-amber-300 font-display">from the Road</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/75 leading-relaxed">
            Unfiltered snapshots captured by our travellers across turquoise islands, snowy mountain passes, and cultural landmarks.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-1.5 rounded-full bg-white/10 p-1.5 ring-1 ring-white/15 backdrop-blur-md">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-[#168447] text-white shadow-md'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Photo Gallery Grid */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 relative z-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPhotos.map((photo, i) => (
            <div
              key={i}
              className="group relative h-[320px] overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:ring-[#168447]/60"
            >
              <img
                src={`/images/${photo.image}.png`}
                alt={photo.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1612]/90 via-[#0d1612]/20 to-transparent transition-opacity" />

              <span className="absolute top-4 right-4 rounded-full bg-black/40 backdrop-blur-md px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-white/20">
                {photo.category}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <MapPin className="h-3.5 w-3.5" />
                  {photo.destination}
                </span>
                <h4 className="mt-1 text-base font-display font-semibold text-white/95 leading-snug">
                  {photo.caption}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
