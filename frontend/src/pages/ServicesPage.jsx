import React, { useState } from 'react';
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
  ChevronRight,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import travelData from '../data/travelData';

export default function ServicesPage({ onOpenCustomTrip }) {
  const navigate = useNavigate();
  const { siteConfig } = travelData;
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Holidays & Honeymoon',
    'Visa & Passports',
    'Logistics & Flights',
    'Group & Pilgrimage'
  ];

  const servicesList = [
    {
      title: "Holiday Packages",
      category: "Holidays & Honeymoon",
      badge: "Popular",
      badgeColor: "bg-emerald-100 text-emerald-800",
      description: "Handcrafted domestic and international holidays planned around your exact dates, interests, and budget.",
      perk: "Tailor-made itineraries with private transfers & handpicked hotels",
      icon: <Palmtree className="h-6 w-6" />,
      actionType: "tour",
      travelType: "Holiday",
      buttonText: "View Holiday Packages"
    },
    {
      title: "Honeymoon Packages",
      category: "Holidays & Honeymoon",
      badge: "Romantic Special",
      badgeColor: "bg-rose-100 text-rose-800",
      description: "Romantic escapes with private pool villas, candlelight dinners, flower bed setups, and curated scenic excursions.",
      perk: "Special honeymoon inclusions & complimentary surprise arrangements",
      icon: <Heart className="h-6 w-6" />,
      actionType: "tour",
      travelType: "Honeymoon",
      buttonText: "Explore Honeymoons"
    },
    {
      title: "India & International Tours",
      category: "Holidays & Honeymoon",
      badge: "Global Destinations",
      badgeColor: "bg-amber-100 text-amber-800",
      description: "From Kashmir, Kerala & Himachal to Dubai, Singapore, Thailand, Bali, and Europe across 25+ countries.",
      perk: "Guided sightseeing, visa documentation, and verified Indian food options",
      icon: <Globe2 className="h-6 w-6" />,
      actionType: "route",
      to: "/tours",
      buttonText: "Browse All Tours"
    },
    {
      title: "Visa Related Services",
      category: "Visa & Passports",
      badge: "Fast Track Desk",
      badgeColor: "bg-emerald-100 text-emerald-800",
      description: "Fast-track tourist, business, transit, and family visas with expert consular checklist guidance and high approval rates.",
      perk: "Paperless e-visas in 24-48 hrs & VFS biometric appointment booking",
      icon: <Stamp className="h-6 w-6" />,
      actionType: "route",
      to: "/visa",
      buttonText: "Open Visa Desk"
    },
    {
      title: "Pilgrim Tours (Yatras)",
      category: "Group & Pilgrimage",
      badge: "Senior Citizen Friendly",
      badgeColor: "bg-orange-100 text-orange-800",
      description: "Comfortable, carefully paced sacred yatras to Tirupati, Varanasi/Kashi, Shirdi, Char Dham, and Jyotirlinga shrines.",
      perk: "Special darshan assistance, comfortable transit, and pure veg food",
      icon: <Landmark className="h-6 w-6" />,
      actionType: "tour",
      travelType: "Pilgrimage",
      buttonText: "View Pilgrim Yatras"
    },
    {
      title: "Passport Assistance",
      category: "Visa & Passports",
      badge: "Passport Seva Help",
      badgeColor: "bg-blue-100 text-blue-800",
      description: "New passports, renewals, lost passport assistance, annexures, and Vijayawada Passport Seva Kendra slot booking.",
      perk: "Document pre-check & Tatkal expedited appointment support",
      icon: <BookUser className="h-6 w-6" />,
      actionType: "route",
      to: "/visa",
      buttonText: "Passport Support"
    },
    {
      title: "Destination Events & Weddings",
      category: "Group & Pilgrimage",
      badge: "Full Coordination",
      badgeColor: "bg-purple-100 text-purple-800",
      description: "Destination weddings, silver jubilee celebrations, family reunions, and corporate retreats end-to-end managed.",
      perk: "Resort bookings, group logistics, welcoming desks & banqueting",
      icon: <PartyPopper className="h-6 w-6" />,
      actionType: "route",
      to: "/contact",
      buttonText: "Enquire Events"
    },
    {
      title: "Car & Coach Travels",
      category: "Logistics & Flights",
      badge: "Verified Chauffeurs",
      badgeColor: "bg-slate-100 text-slate-800",
      description: "Well-maintained sedans, Innova Crystas, Tempo Travellers, and luxury AC buses for family and group tours.",
      perk: "Experienced professional drivers with round-the-clock road support",
      icon: <Bus className="h-6 w-6" />,
      actionType: "route",
      to: "/contact",
      buttonText: "Book Vehicles"
    },
    {
      title: "School & College Tours",
      category: "Group & Pilgrimage",
      badge: "Safety First",
      badgeColor: "bg-emerald-100 text-emerald-800",
      description: "Educational excursions, historical tours, and industrial visits with student supervision, medical kits, and certified hotels.",
      perk: "Institutional group discounts, parental updates, and faculty coordination",
      icon: <GraduationCap className="h-6 w-6" />,
      actionType: "tour",
      travelType: "School/College Tour",
      buttonText: "Educational Tours"
    },
    {
      title: "Ocean & River Cruises",
      category: "Holidays & Honeymoon",
      badge: "Luxury At Sea",
      badgeColor: "bg-cyan-100 text-cyan-800",
      description: "Sail in style with Cordelia Cruises India, Royal Caribbean, Star Cruises, and Singapore–Malaysia cruise holidays.",
      perk: "Cabin selection, all-inclusive onboard dining, and port excursion packages",
      icon: <Ship className="h-6 w-6" />,
      actionType: "tour",
      travelType: "Cruise",
      buttonText: "Explore Cruises"
    },
    {
      title: "Domestic Ticketing Desk",
      category: "Logistics & Flights",
      badge: "Best Fare Finder",
      badgeColor: "bg-teal-100 text-teal-800",
      description: "Flight, Tatkal train, and AC bus ticket bookings across India with instant confirmation and seat preference choices.",
      perk: "Immediate PNR updates, web check-in, and fare alert monitoring",
      icon: <Wallet className="h-6 w-6" />,
      actionType: "route",
      to: "/contact",
      buttonText: "Book Tickets"
    },
    {
      title: "International Flight Ticketing",
      category: "Logistics & Flights",
      badge: "Worldwide Routing",
      badgeColor: "bg-indigo-100 text-indigo-800",
      description: "Competitive airfares to Gulf, Southeast Asia, UK, Europe, USA, and Australia with optimal transit and baggage allowances.",
      perk: "Flexible date comparisons, student baggage allowances & transit visas",
      icon: <Plane className="h-6 w-6" />,
      actionType: "route",
      to: "/contact",
      buttonText: "International Flights"
    }
  ];

  const filteredServices = activeCategory === 'All' 
    ? servicesList 
    : servicesList.filter(s => s.category === activeCategory);

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
    <div className="w-full bg-[#fafbf9] text-[#17231d]">
      {/* 1. Scenic Hero Banner (with integrated breadcrumb pills & generous top spacing) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#06180f] via-[#0b2819] to-[#123623] pt-36 sm:pt-44 pb-16 sm:pb-24 text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/hero.png"
            alt="Travel Care 4 All Services"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06180f] via-[#06180f]/70 to-[#06180f]/80" />
        </div>

        <div className="container mx-auto text-center relative z-10 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Integrated Breadcrumb */}
            <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/70 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/15">
              <Link to="/" className="hover:text-amber-300 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 text-white/50" />
              <span className="font-semibold text-white">Services</span>
            </nav>

            <p className="eyebrow justify-center mb-3 text-amber-300 text-xs font-bold tracking-widest uppercase">
              <span className="h-px w-6 bg-[#e66a2c]" />
              ALL TRAVEL SOLUTIONS UNDER ONE ROOF
              <span className="h-px w-6 bg-[#e66a2c]" />
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-tight">
              Our Complete Travel Services
            </h1>

            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/85 leading-relaxed font-sans">
              From bespoke holidays and fast-track visa documentation to passport assistance, corporate offsites, flight bookings, and cruises — personalized by our Vijayawada consultant desk.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Filter Tabs */}
      <section className="bg-white border-b border-[#17231d]/10 py-6 sticky top-20 z-20 shadow-sm backdrop-blur-md bg-white/95">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#168447] text-white shadow-md shadow-emerald-900/20 scale-105'
                    : 'bg-[#f7f9f7] text-[#17231d]/70 hover:bg-[#eef8f1] hover:text-[#168447] ring-1 ring-[#17231d]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 12 Elevated Editorial Service Cards Grid */}
      <section className="container mx-auto py-16 sm:py-20 px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#17231d]">
            {activeCategory === 'All' ? 'Everything We Do for Your Journey' : activeCategory}
          </h2>
          <p className="mt-2 text-sm text-[#17231d]/65">
            Showing {filteredServices.length} specialized service {filteredServices.length === 1 ? 'desk' : 'desks'} with direct consultant coordination.
          </p>
        </div>

        {/* Clean responsive grid with native stretch - no height collision */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {filteredServices.map((srv) => (
            <div
              key={srv.title}
              onClick={() => handleClick(srv)}
              className="group flex flex-col justify-between rounded-3xl bg-white p-7 shadow-card ring-1 ring-[#17231d]/8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift cursor-pointer relative overflow-hidden"
            >
              {/* Top Row: Icon + Badge */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-5">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#168447] to-[#075c35] text-white shadow-md shadow-[#168447]/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]">
                    {srv.icon}
                  </span>
                  <span className={`text-[0.68rem] font-extrabold uppercase px-2.5 py-1 rounded-full ${srv.badgeColor}`}>
                    {srv.badge}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#17231d] group-hover:text-[#168447] transition-colors">
                  {srv.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-[#17231d]/70">
                  {srv.description}
                </p>

                {/* Specific Perk Line */}
                <div className="mt-4 pt-3 border-t border-[#17231d]/5 flex items-start gap-2 text-xs text-[#075c35] font-medium bg-[#eef8f1]/60 p-2.5 rounded-xl">
                  <Sparkles className="h-3.5 w-3.5 text-[#168447] shrink-0 mt-0.5" />
                  <span>{srv.perk}</span>
                </div>
              </div>

              {/* Bottom Action Strip */}
              <div className="mt-6 pt-4 border-t border-[#17231d]/5 flex items-center justify-between">
                <span className="text-xs font-bold text-[#e66a2c] group-hover:text-[#c9551d] transition-colors">
                  {srv.buttonText}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#fafbf9] text-[#e66a2c] group-hover:bg-[#e66a2c] group-hover:text-white transition-all duration-300 shadow-sm">
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Customized Itinerary Callout (Dedicated container with clear vertical separation) */}
        <div className="mt-20 sm:mt-24 rounded-3xl bg-gradient-to-br from-[#eef8f1] via-white to-[#eef8f1] border border-[#168447]/25 p-8 sm:p-14 text-center shadow-lg relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#168447]/10 px-3.5 py-1 text-xs font-bold text-[#075c35] ring-1 ring-[#168447]/20">
              <CalendarCheck className="h-3.5 w-3.5 text-[#168447]" />
              Tailored Quotes · Vijayawada Head Office
            </span>

            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#075c35] leading-tight">
              Need a Customized Family Itinerary or Group Offsite?
            </h2>

            <p className="text-sm sm:text-base text-[#17231d]/75 leading-relaxed">
              Mr. B. Vidya Sagar and our senior consultants coordinate customized family vacations, industrial visits, destination weddings, and corporate packages with tailored quotations and flexible itineraries.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={onOpenCustomTrip}
                className="btn btn-primary !py-3.5 !px-7 text-sm font-bold shadow-lg shadow-[#e66a2c]/30 cursor-pointer"
              >
                Plan a Custom Trip
              </button>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hello Mr. Vidya Sagar, I would like to consult for a custom holiday itinerary.')}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-wa !py-3.5 !px-6 text-sm font-bold shadow-lg shadow-emerald-900/20 cursor-pointer"
              >
                <MessageSquare className="h-4 w-4 mr-1.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="tel:+917386133399"
                className="btn btn-outline !py-3.5 !px-6 text-sm font-bold cursor-pointer"
              >
                <PhoneCall className="h-4 w-4 mr-1.5" />
                <span>Call +91 73861 33399</span>
              </a>
            </div>
          </div>
        </div>

        {/* 5. 3 Trust Pillars */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#17231d]/5 flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#eef8f1] text-[#168447] shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-[#17231d]">100% Transparent Quotes</h4>
              <p className="mt-1 text-xs text-[#17231d]/65 leading-relaxed">No hidden fees, surprise consular charges, or sudden tariff hikes.</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#17231d]/5 flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#eef8f1] text-[#168447] shrink-0">
              <PhoneCall className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-[#17231d]">Human Consultant Care</h4>
              <p className="mt-1 text-xs text-[#17231d]/65 leading-relaxed">Talk directly to experienced consultants who know the routes inside out.</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#17231d]/5 flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#eef8f1] text-[#168447] shrink-0">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-[#17231d]">Fast Track Approvals</h4>
              <p className="mt-1 text-xs text-[#17231d]/65 leading-relaxed">Swift visa dossier vetting, flight ticketing, and hassle-free hotel bookings.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
