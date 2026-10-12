import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home, MessageSquare, Phone } from 'lucide-react';
import travelData from '../data/travelData';

export default function NotFoundPage() {
  const { siteConfig } = travelData;

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hello Travel Care 4 All, I was browsing your website and need help finding a package.");
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-24 text-center bg-[#fafbf9]">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-[#168447]/10 flex items-center justify-center text-[#168447] mx-auto">
          <Compass className="w-12 h-12 animate-spin-slow" />
        </div>
      </div>

      <p className="text-xs uppercase tracking-widest font-bold text-[#e66a2c] mb-2">
        Page Not Found · Error 404
      </p>

      <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#17231d] tracking-tight max-w-lg mx-auto">
        Lost Your Way Along the Journey?
      </h1>

      <p className="mt-4 text-slate-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
        The travel page or itinerary you are searching for might have moved, been renamed, or is temporarily unavailable.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/" className="btn btn-primary">
          <Home className="w-4 h-4 mr-1.5" />
          <span>Return Home</span>
        </Link>

        <Link to="/tours" className="btn btn-outline">
          <span>Explore All Tours</span>
        </Link>

        <button onClick={handleWhatsApp} className="btn btn-wa">
          <MessageSquare className="w-4 h-4 mr-1.5" />
          <span>Ask on WhatsApp</span>
        </button>
      </div>

      <div className="mt-12 text-xs text-slate-500">
        Direct Assistance: <a href="tel:+917386133399" className="font-bold text-[#075c35] underline">+91 73861 33399</a>
      </div>
    </div>
  );
}
