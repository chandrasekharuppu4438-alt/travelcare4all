import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Palmtree, 
  Heart, 
  Globe2, 
  Stamp, 
  Landmark, 
  BookUser, 
  PartyPopper, 
  Bus,
  GraduationCap,
  Ship, 
  Wallet, 
  Plane,
  ArrowRight,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import travelData from '../data/travelData';

export default function ServicesPage({ onOpenCustomTrip }) {
  const navigate = useNavigate();
  const { siteConfig } = travelData;

  const servicesList = [
    {
      title: "Holiday Packages",
      description: "Handpicked domestic and international holidays planned around your dates and budget.",
      icon: <Palmtree className="h-6 w-6" />,
      actionType: "tour",
      travelType: "Holiday"
    },
    {
      title: "Honeymoon Packages",
      description: "Romantic escapes with private villas, candle-light dinners and thoughtful surprises.",
      icon: <Heart className="h-6 w-6" />,
      actionType: "tour",
      travelType: "Honeymoon"
    },
    {
      title: "India & International Tours",
      description: "From Kashmir to Kuala Lumpur — guided and private tours across 25+ countries.",
      icon: <Globe2 className="h-6 w-6" />,
      actionType: "route",
      to: "/tours"
    },
    {
      title: "Visa Related Services",
      description: "Fast-track tourist, business, transit and family visas with document guidance.",
      icon: <Stamp className="h-6 w-6" />,
      actionType: "route",
      to: "/visa"
    },
    {
      title: "Pilgrim Tours",
      description: "Comfortable, well-timed yatras to Tirupati, Varanasi, Shirdi, Char Dham and more.",
      icon: <Landmark className="h-6 w-6" />,
      actionType: "tour",
      travelType: "Pilgrimage"
    },
    {
      title: "Passport Assistance",
      description: "New passports, renewals, appointment booking and application support.",
      icon: <BookUser className="h-6 w-6" />,
      actionType: "route",
      to: "/visa"
    },
    {
      title: "Events",
      description: "Destination weddings, family functions and corporate offsites, fully coordinated.",
      icon: <PartyPopper className="h-6 w-6" />,
      actionType: "route",
      to: "/contact"
    },
    {
      title: "Car & Bus Travels",
      description: "Sedans, SUVs, tempo travellers and coaches with experienced drivers.",
      icon: <Bus className="h-6 w-6" />,
      actionType: "route",
      to: "/contact"
    },
    {
      title: "School / College Tours",
      description: "Safe, educational group trips and industrial visits with full supervision support.",
      icon: <GraduationCap className="h-6 w-6" />,
      actionType: "tour",
      travelType: "School/College Tour"
    },
    {
      title: "Cruise",
      description: "Ocean and river cruises — Cordelia, Royal Caribbean, Star Cruises and more.",
      icon: <Ship className="h-6 w-6" />,
      actionType: "tour",
      travelType: "Cruise"
    },
    {
      title: "Domestic Ticketing",
      description: "Flight, train and bus bookings across India at the best available fares.",
      icon: <Wallet className="h-6 w-6" />,
      actionType: "route",
      to: "/contact"
    },
    {
      title: "International Ticketing",
      description: "International flights with flexible routing, baggage and fare guidance.",
      icon: <Plane className="h-6 w-6" />,
      actionType: "route",
      to: "/contact"
    }
  ];

  const handleClick = (srv) => {
    if (srv.actionType === 'route' && srv.to) {
      navigate(srv.to);
    } else if (srv.actionType === 'tour' && srv.travelType) {
      navigate(`/tours?travelType=${encodeURIComponent(srv.travelType)}`);
    } else {
      onOpenCustomTrip();
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbf9] text-[#17231d]">
      {/* 1. Breadcrumb Strip */}
      <div className="pt-28 pb-4 bg-[#eef8f1] border-b border-[#17231d]/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#17231d]/60">
            <Link to="/" className="hover:text-[#168447] transition">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-[#17231d]">Services</span>
          </nav>
        </div>
      </div>

      {/* 2. Scenic Header Banner */}
      <section className="relative overflow-hidden bg-[#17231d] pt-16 pb-20 sm:pt-20 sm:pb-24 text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/hero.png"
            alt="Travel Care 4 All Services"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17231d] via-[#17231d]/75 to-[#17231d]/85" />
        </div>

        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center relative z-10">
          <p className="eyebrow justify-center mb-3 text-amber-300">
            <span className="h-px w-6 bg-[#e66a2c]" />
            What We Do
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white">
            Our Services
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed">
            Complete travel solutions under one roof — holiday itineraries, visas, passports, flights, cruises and luxury transfers.
          </p>
        </div>
      </section>

      {/* 3. 12 Services Grid matching Screenshot 3 */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {servicesList.map((srv) => (
            <div
              key={srv.title}
              onClick={() => handleClick(srv)}
              className="group flex h-full flex-col rounded-3xl bg-white p-6 shadow-card ring-1 ring-[#17231d]/5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-lift cursor-pointer"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#168447] to-[#075c35] text-white shadow-lg shadow-[#168447]/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
                {srv.icon}
              </span>

              <h3 className="mt-5 font-sans text-lg font-bold text-[#17231d]">
                {srv.title}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#17231d]/65">
                {srv.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#e66a2c]">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </div>
          ))}
        </div>

        {/* Custom Itinerary Callout */}
        <div className="mt-16 rounded-3xl bg-[#eef8f1] border border-[#168447]/20 p-8 sm:p-12 text-center shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#075c35]">
            Need a Customized Itinerary or Group Booking?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#17231d]/75 max-w-2xl mx-auto">
            Our Vijayawada office coordinates customized family vacations, industrial visits, destination weddings, and corporate offsites with tailored quotes.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={onOpenCustomTrip}
              className="btn btn-primary"
            >
              Plan a Custom Trip
            </button>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hello Travel Care 4 All, I would like to plan a custom trip.')}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-wa"
            >
              <MessageSquare className="h-4 w-4 mr-1.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
