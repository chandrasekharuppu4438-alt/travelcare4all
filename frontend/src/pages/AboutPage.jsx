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
  Award
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
    <div className="min-h-screen bg-[#0d1612] text-white">
      {/* 1. Header Hero matching sujjusoftwaresolutions format */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-40 sm:pb-24 text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#168447]/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-4xl px-5 sm:px-8 relative z-10">
          <p className="eyebrow justify-center mb-3 text-amber-300">
            <span className="h-px w-6 bg-[#e66a2c]" />
            Our Story &amp; Values
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white">
            About <span className="text-amber-300 font-display">Travel Care 4 All</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/75 leading-relaxed">
            Headquartered in Vijayawada, Andhra Pradesh, guiding your journeys worldwide with personalized care, transparent pricing, and fast-track visa assistance.
          </p>
        </div>
      </section>

      {/* 2. Consultant & Agency Profile */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 relative z-10">
        <div className="rounded-3xl bg-white/[0.04] p-8 sm:p-12 ring-1 ring-white/10 backdrop-blur-md shadow-2xl grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#168447]/20 px-3 py-1 text-xs font-bold text-amber-300 ring-1 ring-[#168447]/40 mb-4">
              <Award className="h-3.5 w-3.5" />
              Verified Travel Agency · Vijayawada
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
              Personalized Travel Experience Led by <span className="text-amber-300">B. Vidya Sagar</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
              At Travel Care 4 All, we believe that traveling should be seamless, inspiring, and completely worry-free. Every itinerary is individually crafted to ensure top-notch hotel stays, comfortable private transfers, and genuine local experiences.
            </p>
            <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
              Whether you are planning a romantic honeymoon to Maldives, an adventurous expedition across Southeast Asia, or a sacred yatra with elderly parents, our dedicated desk handles tickets, visas, permits, and day-by-day itineraries.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 pt-2">
              <button
                onClick={onOpenCustomTrip}
                className="btn btn-primary"
              >
                Plan Your Journey
              </button>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hello Mr. Vidya Sagar, I would like to consult regarding a tour package.')}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-wa"
              >
                <MessageSquare className="h-4 w-4 mr-1.5" />
                <span>Chat with Consultant</span>
              </a>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden h-[340px] sm:h-[420px] ring-1 ring-white/10">
            <img
              src="/images/kashmir.png"
              alt="Travel Care 4 All Destinations"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1612]/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Office Location</p>
              <p className="text-sm font-semibold text-white/90 mt-1">
                Ramavarappadu Ring, Upstairs Union Bank, Vijayawada - 520 004
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Grid matching card layout */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow justify-center mb-2 text-amber-300">
            <span className="h-px w-6 bg-[#e66a2c]" />
            The Travel Care Advantage
          </p>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
            Why Travellers Choose Us
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, idx) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur-md shadow-card hover:-translate-y-1.5 transition-all duration-300 hover:bg-white/[0.07]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#168447] text-white mb-5 shadow-md shadow-[#168447]/30">
                {iconMap[item.icon] || <ShieldCheck className="h-6 w-6 text-white" />}
              </div>
              <h3 className="text-xl font-display font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Stats Counter Bar */}
      <div className="border-t border-b border-white/10 bg-white/[0.02]">
        <StatsSection />
      </div>

      {/* 5. Verified Reviews */}
      <div className="bg-white text-[#17231d]">
        <Testimonials />
      </div>
    </div>
  );
}
