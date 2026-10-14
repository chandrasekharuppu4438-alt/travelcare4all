import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Check, Users, Calendar, Hotel, MapPin, Compass } from 'lucide-react';
import travelData from '../data/travelData';

const DESTINATIONS = [
  { name: 'Kashmir', basePerDay: 2200, domestic: true, highlight: 'Dal Lake & Houseboat' },
  { name: 'Dubai', basePerDay: 7500, domestic: false, highlight: 'Desert Safari & Marina' },
  { name: 'Bali', basePerDay: 4800, domestic: false, highlight: 'Nusa Penida & Pool Villa' },
  { name: 'Goa', basePerDay: 2400, domestic: true, highlight: 'Beaches & Heritage Forts' },
  { name: 'Thailand (Phuket)', basePerDay: 5200, domestic: false, highlight: 'Phi Phi Island Cruise' },
  { name: 'Singapore', basePerDay: 8500, domestic: false, highlight: 'Sentosa & Universal Studios' },
  { name: 'Himachal (Manali)', basePerDay: 2300, domestic: true, highlight: 'Solang Valley & Rohtang' },
  { name: 'Kerala', basePerDay: 2500, domestic: true, highlight: 'Alleppey Houseboat & Munnar' },
  { name: 'Maldives', basePerDay: 13500, domestic: false, highlight: 'Overwater Villa Experience' }
];

const TRIP_STYLES = [
  { id: 'leisure', label: 'Leisure & Discovery', multiplier: 1.0, icon: '🏝️', desc: 'Sightseeing, cultural tours, and relaxing stays' },
  { id: 'honeymoon', label: 'Romantic Honeymoon', multiplier: 1.25, icon: '💍', desc: 'Candlelight dinner, floral bed decor, couple spa' },
  { id: 'family', label: 'Family with Kids', multiplier: 1.1, icon: '👨‍👩‍👧‍👦', desc: 'Spacious vehicle, theme parks, kid-friendly meal plans' },
  { id: 'luxury', label: 'Ultra Luxury VIP', multiplier: 1.6, icon: '✨', desc: '5★ Luxury resort, private yacht/limo, concierge desk' }
];

const HOTEL_TIERS = [
  { id: '3star', label: '3★ Comfort', multiplier: 0.9, desc: 'Clean, verified 3-star boutique hotels' },
  { id: '4star', label: '4★ Premium Deluxe', multiplier: 1.15, desc: 'Centrally located 4-star properties with breakfast' },
  { id: '5star', label: '5★ Luxury / Villa', multiplier: 1.5, desc: 'World-class 5-star brand or private pool villa' }
];

export default function TripCostEstimator() {
  const navigate = useNavigate();
  const { siteConfig } = travelData;

  const [selectedDest, setSelectedDest] = useState(DESTINATIONS[0]);
  const [selectedStyle, setSelectedStyle] = useState(TRIP_STYLES[0]);
  const [selectedHotel, setSelectedHotel] = useState(HOTEL_TIERS[1]);
  const [days, setDays] = useState(5);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Dynamic estimate calculation
  const estimate = useMemo(() => {
    const rawPerPerson = selectedDest.basePerDay * days * selectedStyle.multiplier * selectedHotel.multiplier;
    const minPerPerson = Math.round(rawPerPerson * 0.92 / 100) * 100;
    const maxPerPerson = Math.round(rawPerPerson * 1.12 / 100) * 100;

    const totalTravelers = adults + (children * 0.7);
    const minTotal = Math.round(minPerPerson * totalTravelers);
    const maxTotal = Math.round(maxPerPerson * totalTravelers);

    return { minPerPerson, maxPerPerson, minTotal, maxTotal };
  }, [selectedDest, selectedStyle, selectedHotel, days, adults, children]);

  // Construct WhatsApp inquiry link
  const handleWhatsAppQuote = () => {
    const message = `Hello Travel Care 4 All! 👋
I would like an exact holiday package quote with the following details:
📍 Destination: ${selectedDest.name} (${selectedDest.domestic ? 'Domestic' : 'International'})
🗓️ Duration: ${days} Days / ${days - 1} Nights
✨ Trip Style: ${selectedStyle.label}
🏨 Hotel Preference: ${selectedHotel.label}
👥 Travelers: ${adults} Adults${children > 0 ? `, ${children} Children` : ''}
💰 Estimated Budget Range: ₹${estimate.minPerPerson.toLocaleString('en-IN')} - ₹${estimate.maxPerPerson.toLocaleString('en-IN')} per person

Please share customized itinerary and package options. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const handleExploreTours = () => {
    navigate(`/tours?destination=${encodeURIComponent(selectedDest.name)}`);
  };

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-emerald-50/30 overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200 mb-4">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>Smart Trip Builder &amp; Budget Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 leading-tight">
            Design Your Holiday &amp;{' '}
            <span className="text-emerald-700 italic">Get Instant Pricing</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Customize your dream getaway. Select your destination, travel duration, and hotel preference to estimate costs in real-time.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200/80 space-y-7">
            {/* 1. Destination */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>1. Select Destination</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {DESTINATIONS.map((d) => {
                  const isSelected = selectedDest.name === d.name;
                  return (
                    <button
                      key={d.name}
                      type="button"
                      onClick={() => setSelectedDest(d)}
                      className={`p-3 rounded-xl text-left border text-sm font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-800 text-white border-emerald-800 shadow-md shadow-emerald-900/20'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{d.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </div>
                      <span className={`text-[0.65rem] block mt-0.5 truncate ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                        {d.highlight}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Trip Style */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>2. Holiday Style</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TRIP_STYLES.map((style) => {
                  const isSelected = selectedStyle.id === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setSelectedStyle(style)}
                      className={`p-3 rounded-xl text-center border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20 font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xl mb-1">{style.icon}</div>
                      <div className="truncate">{style.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Hotel Standard */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                <Hotel className="w-4 h-4 text-emerald-600" />
                <span>3. Hotel Preference</span>
              </label>
              <div className="grid sm:grid-cols-3 gap-2.5">
                {HOTEL_TIERS.map((tier) => {
                  const isSelected = selectedHotel.id === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedHotel(tier)}
                      className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>{tier.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <span className={`text-[0.68rem] block mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {tier.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Duration & Travelers */}
            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              {/* Duration buttons */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Duration: {days} Days / {days - 1} Nights</span>
                </label>
                <div className="flex items-center gap-2">
                  {[3, 4, 5, 6, 7, 10].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDays(d)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        days === d
                          ? 'bg-emerald-700 text-white border-emerald-700'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {d}D
                    </button>
                  ))}
                </div>
              </div>

              {/* Travelers */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Travelers</span>
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                    <span className="text-xs text-slate-600 font-medium">Adults:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-6 h-6 rounded bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold text-slate-900 w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-6 h-6 rounded bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
                    <span className="text-xs text-slate-600 font-medium">Kids:</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-6 h-6 rounded bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold text-slate-900 w-4 text-center">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="w-6 h-6 rounded bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estimate Live Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0c1f17] to-[#122e23] text-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/40 border border-emerald-500/30 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Live Estimate Summary
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[0.7rem] font-semibold text-emerald-300 border border-emerald-400/30">
                Customizable
              </span>
            </div>

            <div className="my-6">
              <span className="text-xs text-white/60 block">Estimated Cost per Person</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-300 mt-1 font-display">
                ₹{estimate.minPerPerson.toLocaleString('en-IN')}{' '}
                <span className="text-lg text-white/60 font-sans font-normal">–</span>{' '}
                ₹{estimate.maxPerPerson.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-emerald-300/80 mt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                Includes {days}D hotel stay, dedicated cab, daily breakfast &amp; curated sightseeing
              </p>
            </div>

            {/* Total Trip Estimate */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-6 flex items-center justify-between text-xs">
              <span className="text-white/70">Estimated Total for {adults} Adults{children > 0 ? ` + ${children} Kids` : ''}:</span>
              <span className="font-bold text-white text-sm">
                ₹{estimate.minTotal.toLocaleString('en-IN')} – ₹{estimate.maxTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Inclusions Checklist */}
            <div className="space-y-2 mb-6 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>{selectedHotel.label} with Daily Buffet Breakfast</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Private AC Cab for Airport &amp; All Sightseeing Transfers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>Special Inclusions: {selectedDest.highlight}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>24/7 Dedicated Trip Coordinator from Vijayawada HQ</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppQuote}
                className="w-full btn btn-wa !py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Get Exact Quote on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleExploreTours}
                className="w-full btn btn-ghost !py-3 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-white/10 cursor-pointer"
              >
                <span>View Matching {selectedDest.name} Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[0.68rem] text-center text-white/40 mt-3">
              *Flights &amp; optional visa fees calculated separately based on real-time airline slots.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
