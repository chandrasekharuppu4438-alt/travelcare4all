import React, { useState, useEffect } from 'react';
import { X, RefreshCw, CheckCircle, Clock, Phone, Mail, Calendar, Users, Database } from 'lucide-react';
import api from '../services/api';

export default function BookingsAdminModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookingsList = async () => {
    setLoading(true);
    try {
      const res = await api.getBookings();
      if (res.success && res.bookings) {
        setBookings(res.bookings);
      }
    } catch (err) {
      console.error('Failed to load bookings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingsList();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    setUpdatingId(bookingId);
    try {
      await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      // update locally
      setBookings(prev => prev.map(b => (b._id === bookingId || b.bookingId === bookingId) ? { ...b, status: newStatus } : b));
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-display font-bold text-white">
                  Live Bookings Desk
                </h2>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  MERN API Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time MongoDB booking records submitted from frontend.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchBookingsList}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              title="Refresh Bookings"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div className="text-center py-16">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-500">Fetching live bookings from backend...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-base font-bold text-slate-700">No bookings recorded yet</p>
              <p className="text-xs text-slate-500 mt-1">Submit a tour booking from any package card to see it appear here!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <div 
                  key={b._id || b.bookingId} 
                  className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 p-4 rounded-2xl transition"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-[#056839] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {b.bookingId}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base">
                        {b.tourTitle}
                      </h4>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        b.status === 'Confirmed' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : b.status === 'Contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">
                        👤 {b.customerName}
                      </span>
                      <a href={`tel:${b.phone}`} className="hover:text-emerald-700">
                        📞 {b.phone}
                      </a>
                      {b.email && (
                        <span>✉️ {b.email}</span>
                      )}
                      <span>📅 {b.travelDate}</span>
                      <span>👥 {b.travellers} Travellers</span>
                    </div>

                    {b.specialRequests && (
                      <p className="text-xs text-slate-500 italic bg-white p-2 rounded-lg border border-slate-200/60 max-w-xl">
                        Note: "{b.specialRequests}"
                      </p>
                    )}
                  </div>

                  {/* Status selector */}
                  <div className="flex items-center gap-2 self-start md:self-center">
                    <select
                      value={b.status}
                      disabled={updatingId === b._id}
                      onChange={(e) => handleStatusChange(b._id, e.target.value)}
                      className="field !py-1.5 !px-3 text-xs font-bold cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <a
                      href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(b.customerName)},%20this%20is%20Travel%20Care%204%20All%20regarding%20your%20booking%20${b.bookingId}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-wa text-xs !py-1.5 !px-3"
                      title="WhatsApp Customer"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
          <span>Total Records: {bookings.length}</span>
          <button
            onClick={onClose}
            className="btn btn-outline text-xs !py-1.5 !px-4"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
