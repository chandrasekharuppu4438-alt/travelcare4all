import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, CloudSun, Snowflake, Wind, ChevronLeft, ChevronRight, Compass, Sparkles } from 'lucide-react';

const DESTINATION_VIBES = [
  {
    city: 'Kashmir',
    region: 'India',
    temp: '14°C',
    weather: 'Alpine Breeze',
    bestTime: 'Apr – Oct & Dec (Snow)',
    icon: Snowflake,
    accent: 'from-sky-500/20 to-indigo-500/10',
    border: 'border-sky-500/30',
    textColor: 'text-sky-300',
    tag: 'Snow & Valleys',
    slug: 'Kashmir'
  },
  {
    city: 'Dubai',
    region: 'UAE',
    temp: '30°C',
    weather: 'Golden Sunshine',
    bestTime: 'Oct – Apr (Peak)',
    icon: Sun,
    accent: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/30',
    textColor: 'text-amber-300',
    tag: 'Desert & Skyline',
    slug: 'Dubai'
  },
  {
    city: 'Bali',
    region: 'Indonesia',
    temp: '29°C',
    weather: 'Tropical Serenity',
    bestTime: 'Apr – Oct (Dry Season)',
    icon: CloudSun,
    accent: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/30',
    textColor: 'text-emerald-300',
    tag: 'Island & Villas',
    slug: 'Bali'
  },
  {
    city: 'Goa',
    region: 'India',
    temp: '28°C',
    weather: 'Coastal Sunset',
    bestTime: 'Oct – May (Beach Fest)',
    icon: Wind,
    accent: 'from-orange-500/20 to-amber-500/10',
    border: 'border-orange-500/30',
    textColor: 'text-orange-300',
    tag: 'Sun & Shacks',
    slug: 'Goa'
  },
  {
    city: 'Thailand',
    region: 'Phuket & Krabi',
    temp: '30°C',
    weather: 'Azure Waters',
    bestTime: 'Nov – Apr (Calm Seas)',
    icon: Sun,
    accent: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/30',
    textColor: 'text-cyan-300',
    tag: 'Islands & Nightlife',
    slug: 'Thailand'
  },
  {
    city: 'Singapore',
    region: 'Southeast Asia',
    temp: '31°C',
    weather: 'Warm Garden Breeze',
    bestTime: 'Year-Round (Best Nov–Jan)',
    icon: CloudSun,
    accent: 'from-purple-500/20 to-pink-500/10',
    border: 'border-purple-500/30',
    textColor: 'text-purple-300',
    tag: 'Futuristic City',
    slug: 'Singapore'
  },
  {
    city: 'Himachal',
    region: 'Manali & Shimla',
    temp: '12°C',
    weather: 'Pine Forest Mist',
    bestTime: 'All Year (Snow Dec–Feb)',
    icon: Snowflake,
    accent: 'from-teal-500/20 to-cyan-500/10',
    border: 'border-teal-500/30',
    textColor: 'text-teal-300',
    tag: 'Himalayan Escape',
    slug: 'Himachal'
  },
  {
    city: 'Maldives',
    region: 'Indian Ocean',
    temp: '29°C',
    weather: 'Crystal Lagoon Calms',
    bestTime: 'Nov – Apr (Dry Season)',
    icon: Sun,
    accent: 'from-blue-500/20 to-emerald-500/10',
    border: 'border-blue-500/30',
    textColor: 'text-blue-300',
    tag: 'Luxury Overwater',
    slug: 'Maldives'
  }
];

export default function DestinationWeatherTicker() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleDestinationClick = (slug) => {
    navigate(`/tours?destination=${encodeURIComponent(slug)}`);
  };

  return (
    <section className="relative bg-[#0c1a14] py-8 border-y border-white/10 text-white overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400/20 to-emerald-400/20 border border-amber-300/30 flex items-center justify-center text-amber-300">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '24s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Live Weather &amp; Travel Vibe Ticker
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Radar
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-white/90">
                Current Temperatures &amp; Peak Seasons for Top Destinations
              </h3>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll destinations left"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll destinations right"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel */}
        <div
          ref={scrollRef}
          className="flex items-center gap-3.5 overflow-x-auto no-scrollbar scroll-smooth py-1"
        >
          {DESTINATION_VIBES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.city}
                onClick={() => handleDestinationClick(item.slug)}
                className={`shrink-0 w-64 sm:w-72 rounded-2xl p-4 bg-gradient-to-br ${item.accent} backdrop-blur-md border ${item.border} hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer group`}
              >
                <div className="flex items-start justify-between mb-2.5">
                  <div>
                    <span className="text-[0.68rem] font-semibold text-white/60 uppercase tracking-wider block">
                      {item.region}
                    </span>
                    <h4 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors flex items-center gap-1.5">
                      {item.city}
                    </h4>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-xl font-extrabold ${item.textColor} flex items-center gap-1`}>
                      <Icon className="w-4 h-4" /> {item.temp}
                    </span>
                    <span className="text-[0.65rem] text-white/70">{item.weather}</span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[0.65rem] text-white/50 block">Best Season</span>
                    <span className="font-medium text-white/90 text-[0.72rem]">{item.bestTime}</span>
                  </div>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] font-semibold text-white/80 border border-white/15 group-hover:bg-amber-400 group-hover:text-slate-900 group-hover:border-amber-400 transition-all">
                    View Tours →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
