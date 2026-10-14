import React from 'react';
import { MessageCircle } from 'lucide-react';
import travelData from '../data/travelData';

export default function WhatsAppFloating() {
  const { siteConfig } = travelData;

  const handleClick = () => {
    const text = encodeURIComponent(siteConfig.defaultWhatsappMessage);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-5 sm:right-6 z-40 group">
      {/* Tooltip on hover */}
      <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg pointer-events-none whitespace-nowrap border border-white/10">
        Chat with our Vijayawada Desk 💬
      </div>

      {/* Button */}
      <button
        onClick={handleClick}
        className="w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-xl shadow-emerald-950/30 hover:scale-110 active:scale-95 transition-all duration-300 relative cursor-pointer"
        aria-label="Contact us on WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25d366]/40 animate-ping opacity-75 pointer-events-none" />
        <MessageCircle className="w-7 h-7 relative z-10" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white z-20 animate-pulse" />
      </button>
    </div>
  );
}
