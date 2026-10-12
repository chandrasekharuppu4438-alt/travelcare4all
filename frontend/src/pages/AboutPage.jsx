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
  ChevronRight
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
    <div className="min-h-screen bg-[#fafbf9] text-[#17231d]">
      {/* 1. Breadcrumb Strip */}
      <div className="pt-28 pb-4 bg-[#eef8f1] border-b border-[#17231d]/5">
        <div className="container mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#17231d]/60">
            <Link to="/" className="hover:text-[#168447] transition">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-[#17231d]">About Us</span>
          </nav>
        </div>
      </div>

      {/* 2. Scenic Header Banner */}
      <section className="relative overflow-hidden bg-[#17231d] pt-16 pb-20 sm:pt-20 sm:pb-24 text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/kashmir.png"
            alt="About Travel Care 4 All"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17231d] via-[#17231d]/75 to-[#17231d]/85" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <p className="eyebrow justify-center mb-3 text-amber-300">
              <span className="h-px w-6 bg-[#e66a2c]" />
              Our Story &amp; Values
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white">
              About Travel Care 4 All
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed">
              Headquartered in Vijayawada, Andhra Pradesh, guiding your journeys worldwide with personalized care, transparent pricing, and fast-track visa assistance.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Consultant & Agency Profile */}
      <section className="container mx-auto py-16 sm:py-20">
        <div className="rounded-3xl bg-white p-8 sm:p-12 shadow-card ring-1 ring-[#17231d]/5 grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef8f1] px-3.5 py-1 text-xs font-bold text-[#075c35] ring-1 ring-[#168447]/20 mb-4">
              <Award className="h-3.5 w-3.5 text-[#168447]" />
              Verified Travel Agency · Vijayawada
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#17231d] leading-tight">
              Personalized Travel Experience Led by <span className="text-[#168447]">B. Vidya Sagar</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#17231d]/75 leading-relaxed">
              At Travel Care 4 All, we believe that traveling should be seamless, inspiring, and completely worry-free. Every itinerary is individually crafted to ensure top-notch hotel stays, comfortable private transfers, and genuine local experiences.
            </p>
            <p className="mt-3 text-sm sm:text-base text-[#17231d]/65 leading-relaxed">
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

          <div className="relative rounded-3xl overflow-hidden h-[340px] sm:h-[400px] shadow-lg">
            <img
              src="/images/himachal.png"
              alt="Travel Care 4 All Destinations"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17231d]/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Office Location</p>
              <p className="text-sm font-semibold text-white/95 mt-1">
                Ramavarappadu Ring, Upstairs Union Bank, Vijayawada - 520 004
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Grid */}
      <section className="bg-[#eef8f1] py-16 sm:py-24 border-t border-slate-100">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow justify-center mb-2">
              <span className="h-px w-6 bg-[#e66a2c]" />
              The Travel Care Advantage
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#17231d]">
              Why Travellers Choose Us
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-7 shadow-card ring-1 ring-[#17231d]/5 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lift"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#168447] to-[#075c35] text-white mb-5 shadow-md shadow-[#168447]/30">
                  {iconMap[item.icon] || <ShieldCheck className="h-6 w-6 text-white" />}
                </div>
                <h3 className="text-xl font-display font-semibold text-[#17231d]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[#17231d]/65 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stats Counter Bar */}
      <div className="border-t border-b border-slate-100 bg-white">
        <StatsSection />
      </div>

      {/* 6. Verified Reviews */}
      <Testimonials />
    </div>
  );
}
