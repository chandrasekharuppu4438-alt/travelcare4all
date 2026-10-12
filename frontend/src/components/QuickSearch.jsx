import React, { useState } from 'react';
import { MapPin, Tag, CalendarDays, Users, Search } from 'lucide-react';

export default function QuickSearch({ onSearch }) {
  const [destination, setDestination] = useState('');
  const [travelType, setTravelType] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [travellers, setTravellers] = useState(2);

  const destinationsList = [
    'Bali',
    'Bangkok',
    'Dubai',
    'Goa',
    'Himachal Pradesh',
    'Kashmir',
    'Kerala',
    'Malaysia',
    'Maldives',
    'Rajasthan',
    'Singapore',
    'Sri Lanka',
    'Thailand',
    'Tirupati',
    'Vietnam'
  ];

  const travelTypesList = [
    'Holiday',
    'Honeymoon',
    'Pilgrimage',
    'Family Trip',
    'Group Tour',
    'International Tour',
    'Domestic Tour',
    'Cruise',
    'School/College Tour',
    'Business Travel'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      destination,
      travelType,
      from,
      to,
      travellers
    });

    const toursElement = document.getElementById('tours');
    if (toursElement) {
      toursElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="plan" className="container relative z-10 mx-auto -mt-36 scroll-mt-28 sm:-mt-28">
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 rounded-[1.75rem] bg-white p-4 shadow-[0_30px_80px_-30px_rgb(7_92_53/0.5)] ring-1 ring-[#17231d]/5 sm:grid-cols-2 sm:p-5 lg:grid-cols-[1.25fr_1.2fr_1fr_1fr_0.8fr_auto] lg:items-end"
        aria-label="Search tours"
      >
        {/* Destination */}
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 px-1 text-xs font-bold uppercase tracking-wider text-[#17231d]/55">
            <span className="text-[#168447]" aria-hidden="true">
              <MapPin className="h-4 w-4" />
            </span>
            Destination
          </span>
          <select
            name="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="field !border-0 !bg-[#f7f9f7] font-semibold"
          >
            <option value="">Anywhere</option>
            {destinationsList.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>

        {/* Travel Type */}
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 px-1 text-xs font-bold uppercase tracking-wider text-[#17231d]/55">
            <span className="text-[#168447]" aria-hidden="true">
              <Tag className="h-4 w-4" />
            </span>
            Travel Type
          </span>
          <select
            name="travelType"
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
            className="field !border-0 !bg-[#f7f9f7] font-semibold"
          >
            <option value="">Any type</option>
            {travelTypesList.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        {/* Departure */}
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 px-1 text-xs font-bold uppercase tracking-wider text-[#17231d]/55">
            <span className="text-[#168447]" aria-hidden="true">
              <CalendarDays className="h-4 w-4" />
            </span>
            Departure
          </span>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="field !border-0 !bg-[#f7f9f7]"
          />
        </label>

        {/* Return */}
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 px-1 text-xs font-bold uppercase tracking-wider text-[#17231d]/55">
            <span className="text-[#168447]" aria-hidden="true">
              <CalendarDays className="h-4 w-4" />
            </span>
            Return
          </span>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            min={from || new Date().toISOString().split('T')[0]}
            className="field !border-0 !bg-[#f7f9f7]"
          />
        </label>

        {/* Travellers */}
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 px-1 text-xs font-bold uppercase tracking-wider text-[#17231d]/55">
            <span className="text-[#168447]" aria-hidden="true">
              <Users className="h-4 w-4" />
            </span>
            Travellers
          </span>
          <input
            type="number"
            name="travellers"
            min="1"
            max="99"
            value={travellers}
            onChange={(e) => setTravellers(Number(e.target.value))}
            className="field !border-0 !bg-[#f7f9f7] font-semibold"
          />
        </label>

        {/* Search button */}
        <button
          type="submit"
          className="btn btn-primary h-[50px] sm:col-span-2 lg:col-span-1"
        >
          <Search className="h-4 w-4" />
          <span>Search Tours</span>
        </button>
      </form>
    </div>
  );
}
