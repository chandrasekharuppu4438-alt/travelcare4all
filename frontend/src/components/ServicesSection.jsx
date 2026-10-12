import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  ArrowRight
} from 'lucide-react';

export default function ServicesSection({ onSelectService }) {
  const navigate = useNavigate();

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
    if (onSelectService) {
      onSelectService(srv);
    } else if (srv.actionType === 'route' && srv.to) {
      navigate(srv.to);
    } else if (srv.actionType === 'tour' && srv.travelType) {
      navigate(`/tours?travelType=${encodeURIComponent(srv.travelType)}`);
    } else {
      navigate('/services');
    }
  };

  return (
    <section id="services" className="scroll-mt-24 bg-[#eef8f1] py-20 sm:py-28">
      <div className="container mx-auto">
        <div className="mb-12 flex flex-col gap-6 items-center text-center">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3 justify-center">
              <span className="h-px w-6 bg-[#e66a2c]" />
              What we do
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl lg:text-[2.85rem] lg:leading-[1.1] text-[#17231d] font-display">
              Our Services
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#17231d]/65">
              Complete travel solutions under one roof
            </p>
          </div>
        </div>

        {/* 12 Cards Grid in 4 Columns exactly matching screenshot */}
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
      </div>
    </section>
  );
}
