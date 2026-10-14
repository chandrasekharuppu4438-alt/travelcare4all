import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 1,
    traveler: 'Rajesh & Swathi',
    city: 'Hyderabad',
    action: 'Booked',
    packageTitle: 'Dubai Extravaganza with Abu Dhabi (7D/6N)',
    timeAgo: '4 mins ago',
    type: 'tour',
    tag: 'Verified Booking'
  },
  {
    id: 2,
    traveler: 'Priya K.',
    city: 'Vijayawada',
    action: 'Received',
    packageTitle: 'Fast-Track Singapore Tourist E-Visa',
    timeAgo: '8 mins ago',
    type: 'visa',
    tag: 'Visa Approved'
  },
  {
    id: 3,
    traveler: 'Karthik & Family',
    city: 'Guntur',
    action: 'Reserved',
    packageTitle: 'Valleys & Meadows of Kashmir (6D/5N)',
    timeAgo: '14 mins ago',
    type: 'tour',
    tag: 'Verified Booking'
  },
  {
    id: 4,
    traveler: 'Amit & Neha',
    city: 'Visakhapatnam',
    action: 'Booked',
    packageTitle: 'Couples Paradise in Bali Private Pool Villa',
    timeAgo: '19 mins ago',
    type: 'tour',
    tag: 'Honeymoon Trip'
  },
  {
    id: 5,
    traveler: 'Manoj V.',
    city: 'Vijayawada',
    action: 'Received',
    packageTitle: 'Express UAE 30-Day Tourist Visa (24h turnaround)',
    timeAgo: '23 mins ago',
    type: 'visa',
    tag: 'Visa Approved'
  },
  {
    id: 6,
    traveler: 'Dr. Lakshmi & Family',
    city: 'Tenali',
    action: 'Booked',
    packageTitle: 'Thailand Grand Discovery (Bangkok, Phuket & Krabi)',
    timeAgo: '32 mins ago',
    type: 'tour',
    tag: 'Family Tour'
  }
];

export default function LiveBookingSocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show initial notification after 3.5 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 3500);

    return () => clearTimeout(initialTimer);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    // Cycle through notifications every 9 seconds
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
        setVisible(true);
      }, 600); // 600ms fade transition
    }, 9500);

    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const current = NOTIFICATIONS[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm sm:max-w-md animate-toast transition-all duration-500">
      <div className="relative bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-4 shadow-2xl shadow-slate-900/15 flex items-start gap-3.5 ring-1 ring-slate-900/5 group hover:shadow-emerald-950/20">
        {/* Live glowing pulse indicator */}
        <div className="relative mt-1 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-700/30">
            {current.type === 'visa' ? '✈️' : '🏝️'}
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-1.5 text-[0.68rem] text-slate-500 font-medium">
            <span className="font-bold text-slate-900">{current.traveler}</span>
            <span>from {current.city}</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">{current.timeAgo}</span>
          </div>

          <div className="text-xs font-bold text-slate-800 leading-snug mt-0.5 line-clamp-1">
            {current.action} {current.packageTitle}
          </div>

          <div className="flex items-center gap-2 mt-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-800 border border-emerald-200">
              <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
              <span>{current.tag}</span>
            </span>
            <span className="text-[0.65rem] text-slate-400 flex items-center gap-0.5">
              <ShieldCheck className="w-2.5 h-2.5 text-slate-400" />
              Vijayawada Desk
            </span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
