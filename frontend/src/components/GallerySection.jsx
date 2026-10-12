import React, { useState } from 'react';
import travelData from '../data/travelData';

export default function GallerySection() {
  const { gallery } = travelData;
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ["All", "Destinations", "Tours", "Travel Moments", "Group Tours", "International"];

  const filtered = gallery.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory || (activeCategory === 'Destinations' && item.category !== 'International');
  });

  return (
    <section id="gallery" className="scroll-mt-24 bg-[#f7f9f7] py-20 sm:py-28">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">
            <span className="h-px w-6 bg-[#e66a2c]" />
            Gallery
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl lg:text-[2.85rem] font-display text-[#17231d]">
            Moments from the road
          </h2>

          {/* Categories */}
          <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1 justify-start sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#168447] text-white shadow-sm'
                    : 'bg-white text-[#17231d]/75 hover:bg-[#eef8f1] hover:text-[#168447] ring-1 ring-[#17231d]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-2xl sm:rounded-3xl shadow-card ring-1 ring-[#17231d]/5"
            >
              <img
                src={`/images/${item.image}.png`}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17231d]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  {item.category}
                </span>
                <p className="text-xs sm:text-sm font-semibold mt-0.5">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
