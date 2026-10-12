import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plane, 
  MapPin, 
  FileText, 
  HeartHandshake, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  ArrowRight,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import travelData from '../data/travelData';

export default function ServicesPage({ onOpenCustomTrip }) {
  const navigate = useNavigate();
  const { services, siteConfig } = travelData;

  const iconMap = {
    Plane: <Plane className="h-6 w-6 text-white" />,
    MapPin: <MapPin className="h-6 w-6 text-white" />,
    FileText: <FileText className="h-6 w-6 text-white" />,
    HeartHandshake: <HeartHandshake className="h-6 w-6 text-white" />,
    Building2: <Building2 className="h-6 w-6 text-white" />,
    Sparkles: <Sparkles className="h-6 w-6 text-white" />,
    ShieldCheck: <ShieldCheck className="h-6 w-6 text-white" />,
    Compass: <Compass className="h-6 w-6 text-white" />
  };

  const handleAction = (service) => {
    if (service.section === 'visa') {
      navigate('/visa');
    } else if (service.travelType) {
      navigate(`/tours?travelType=${encodeURIComponent(service.travelType)}`);
    } else {
      onOpenCustomTrip();
    }
  };

  const handleWhatsApp = (serviceTitle) => {
    const text = encodeURIComponent(
      `Hello Travel Care 4 All,\nI would like more information on your "${serviceTitle}" service.`
    );
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0d1612] text-white">
      {/* 1. Header Hero matching sujjusoftwaresolutions format */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-40 sm:pb-24 text-center">
        {/* Subtle radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#168447]/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-4xl px-5 sm:px-8 relative z-10">
          <p className="eyebrow justify-center mb-3 text-amber-300">
            <span className="h-px w-6 bg-[#e66a2c]" />
            Complete Travel Solutions
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white">
            Comprehensive <span className="text-amber-300 font-display">Travel Services</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/75 leading-relaxed">
            From flight bookings and fast-track visas to personalized domestic and international holiday packages — we curate every single detail of your journey.
          </p>
        </div>
      </section>

      {/* 2. Grid of Service Cards matching format */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 relative z-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative flex flex-col justify-between rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07] hover:ring-[#168447]/50 shadow-card"
            >
              <div>
                {/* Header Icon & Tag */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#168447] text-white shadow-md shadow-[#168447]/30">
                    {iconMap[service.icon] || <Sparkles className="h-6 w-6 text-white" />}
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-white/15">
                    {service.tag || 'Standard & Premium'}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-semibold font-display text-white group-hover:text-amber-300 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  {service.description}
                </p>

                {/* Features list */}
                {service.features && (
                  <ul className="mt-5 space-y-2 text-xs text-white/60 border-t border-white/5 pt-4">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#168447] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Action Buttons matching the reference site */}
              <div className="mt-8 grid grid-cols-2 gap-2.5 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleAction(service)}
                  className="rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2.5 px-3 transition text-center"
                >
                  Explore Details
                </button>
                <button
                  type="button"
                  onClick={() => handleWhatsApp(service.title)}
                  className="rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold py-2.5 px-3 transition text-center shadow-md flex items-center justify-center gap-1"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Itinerary Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#075c35] to-[#168447] p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-display font-bold">
              Need a Custom Tailored Itinerary?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/85">
              Talk directly with B. Vidya Sagar at our Vijayawada office for group corporate tours, family holidays, or destination weddings.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={onOpenCustomTrip}
                className="btn btn-primary !bg-white !text-[#075c35] hover:!bg-amber-300 !border-0 font-bold"
              >
                Plan Custom Trip
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
        </div>
      </section>
    </div>
  );
}
