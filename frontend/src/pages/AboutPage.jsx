import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Users, 
  HeartHandshake, 
  Sparkles, 
  MessageSquare, 
  Phone,
  CheckCircle2,
  Award,
  ChevronRight,
  Compass,
  Star,
  Building,
  Calendar,
  Briefcase
} from 'lucide-react';
import travelData from '../data/travelData';
import StatsSection from '../components/StatsSection';
import Testimonials from '../components/Testimonials';

export default function AboutPage({ onOpenCustomTrip }) {
  const { siteConfig, whyChooseUs } = travelData;

  const iconMap = {
    ShieldCheck: <ShieldCheck className="h-6 w-6 text-white" />,
    Clock: <Clock className="h-6 w-6 text-white" />,
    MapPin: <MapPin className="h-6 w-6 text-white" />,
    Users: <Users className="h-6 w-6 text-white" />,
    HeartHandshake: <HeartHandshake className="h-6 w-6 text-white" />
  };

  return (
    <div className="w-full bg-[#fafbf9] text-[#17231d]">
      {/* 1. Scenic Hero Banner (Unified pt-36 / pt-44 with integrated breadcrumbs) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#06180f] via-[#0b2819] to-[#123623] pt-36 sm:pt-44 pb-16 sm:pb-24 text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/kashmir.png"
            alt="About Travel Care 4 All"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06180f] via-[#06180f]/75 to-[#06180f]/85" />
        </div>

        <div className="container mx-auto text-center relative z-10 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Integrated Breadcrumb */}
            <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/70 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/15">
              <Link to="/" className="hover:text-amber-300 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 text-white/50" />
              <span className="font-semibold text-white">About Us</span>
            </nav>

            <p className="eyebrow justify-center mb-3 text-amber-300 text-xs font-bold tracking-widest uppercase">
              <span className="h-px w-6 bg-[#e66a2c]" />
              OUR STORY, VALUES &amp; CREDENTIALS
              <span className="h-px w-6 bg-[#e66a2c]" />
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-tight">
              About Travel Care 4 All
            </h1>

            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/85 leading-relaxed font-sans">
              Headquartered in Vijayawada, Andhra Pradesh — orchestrating domestic and international journeys with personalized human care, transparent pricing, and fast-track visa assistance.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Consultant Spotlight & Agency Profile */}
      <section className="container mx-auto py-16 sm:py-24 px-4">
        <div className="rounded-[2.5rem] bg-white p-8 sm:p-14 shadow-card ring-1 ring-[#17231d]/8 grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef8f1] px-4 py-1.5 text-xs font-bold text-[#075c35] ring-1 ring-[#168447]/20">
              <Award className="h-4 w-4 text-[#168447]" />
              Verified Travel Agency · Vijayawada, Andhra Pradesh
            </span>

            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#17231d] leading-tight">
              Personalized Travel Experiences Led by <span className="text-[#168447]">B. Vidya Sagar</span>
            </h2>

            <p className="text-sm sm:text-base text-[#17231d]/75 leading-relaxed">
              At <strong className="text-[#17231d]">Travel Care 4 All</strong>, we believe traveling should be deeply rejuvenating, culturally rich, and completely worry-free. In an era dominated by impersonal automated portals, our agency stands apart by providing direct consultant accountability for every ticket, visa stamp, hotel room, and transfer vehicle.
            </p>

            <p className="text-sm sm:text-base text-[#17231d]/70 leading-relaxed">
              Whether you are planning a romantic honeymoon to Maldives, an adventurous journey across Southeast Asia, a sacred family yatra to Varanasi or Tirupati, or applying for an urgent business visa to Dubai, our desk is personally accessible before, during, and after your travel.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl bg-[#fafbf9] p-3.5 ring-1 ring-[#17231d]/5">
                <span className="block text-2xl font-bold font-display text-[#168447]">15+</span>
                <span className="text-xs text-[#17231d]/60 font-semibold">Years Experience</span>
              </div>
              <div className="rounded-2xl bg-[#fafbf9] p-3.5 ring-1 ring-[#17231d]/5">
                <span className="block text-2xl font-bold font-display text-[#e66a2c]">4,500+</span>
                <span className="text-xs text-[#17231d]/60 font-semibold">Delighted Guests</span>
              </div>
              <div className="rounded-2xl bg-[#fafbf9] p-3.5 ring-1 ring-[#17231d]/5 col-span-2 sm:col-span-1">
                <span className="block text-2xl font-bold font-display text-[#075c35]">99.2%</span>
                <span className="text-xs text-[#17231d]/60 font-semibold">Visa Success Rate</span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenCustomTrip}
                className="btn btn-primary !py-3.5 !px-6 text-sm font-bold shadow-lg shadow-[#e66a2c]/25 cursor-pointer"
              >
                Plan Your Journey
              </button>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hello Mr. Vidya Sagar, I would like to consult regarding a tour package.')}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-wa !py-3.5 !px-6 text-sm font-bold shadow-lg shadow-emerald-950/20 cursor-pointer"
              >
                <MessageSquare className="h-4 w-4 mr-1.5" />
                <span>Chat with Consultant</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Destination & Office Showcase */}
          <div className="space-y-4">
            <div className="relative rounded-3xl overflow-hidden h-[340px] sm:h-[400px] shadow-xl group">
              <img
                src="/images/himachal.png"
                alt="Travel Care 4 All Destinations"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1c14] via-[#0d1c14]/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[0.7rem] font-bold uppercase tracking-wider text-amber-300 mb-2 border border-white/20">
                  <MapPin className="h-3 w-3" />
                  Vijayawada Head Office
                </div>
                <p className="text-sm font-semibold text-white/95 leading-snug">
                  #48-12-1, Ramavarappadu Ring, Beside Key Hotel, Upstairs Union Bank, Vijayawada - 520 004, A.P.
                </p>
                <p className="text-xs text-white/70 mt-1">
                  Call: +91 73861 33399 · +91 70136 39149
                </p>
              </div>
            </div>

            {/* Office reassurance badge */}
            <div className="rounded-2xl bg-[#eef8f1] p-4 border border-[#168447]/20 flex items-center justify-between text-xs text-[#075c35]">
              <span className="font-semibold flex items-center gap-1.5">
                <Building className="h-4 w-4 text-[#168447]" />
                Walk-in Consultations Welcome
              </span>
              <span className="text-[#17231d]/60 font-medium">Mon–Sat: 9:30 AM – 8:30 PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us (The 5 Core Pillars) */}
      <section className="bg-[#eef8f1] py-16 sm:py-24 border-y border-[#17231d]/8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow justify-center mb-2">
              <span className="h-px w-6 bg-[#e66a2c]" />
              THE TRAVEL CARE ADVANTAGE
              <span className="h-px w-6 bg-[#e66a2c]" />
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#17231d]">
              Why Travellers Choose Us
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#17231d]/70">
              Five clear commitments that define every itinerary, visa submission, and private transfer.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, index) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-8 shadow-card ring-1 ring-[#17231d]/6 hover:-translate-y-2 transition-all duration-300 hover:shadow-lift flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#168447] to-[#075c35] text-white shadow-md shadow-[#168447]/30">
                      {iconMap[item.icon] || <ShieldCheck className="h-6 w-6 text-white" />}
                    </div>
                    <span className="text-3xl font-display font-extrabold text-[#168447]/15">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-[#17231d]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#17231d]/70 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#17231d]/5 flex items-center gap-1.5 text-xs text-[#168447] font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Guaranteed Service Standard</span>
                </div>
              </div>
            ))}

            {/* 6th Card: Local Office Assurance */}
            <div className="rounded-3xl bg-gradient-to-br from-[#075c35] to-[#123623] p-8 text-white shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 text-amber-300 backdrop-blur-md">
                    <Compass className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-display font-extrabold text-white/20">
                    06
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white">
                  Local Presence in Vijayawada
                </h3>

                <p className="mt-3 text-sm text-white/80 leading-relaxed font-sans">
                  No dealing with distant call centers. Visit our office on Ramavarappadu Ring or consult Mr. Vidya Sagar directly via phone.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Ramavarappadu Ring · Beside Key Hotel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Stats Counter Bar */}
      <div className="border-b border-[#17231d]/10 bg-white">
        <StatsSection />
      </div>

      {/* 5. Verified Reviews */}
      <Testimonials />
    </div>
  );
}
