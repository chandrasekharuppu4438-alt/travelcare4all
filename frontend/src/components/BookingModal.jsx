import React, { useState } from 'react';
import { X, CheckCircle, Calendar, Users, Phone, Mail, User, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import api from '../services/api';
import travelData from '../data/travelData';

export default function BookingModal({ tour, isOpen, onClose }) {
  if (!isOpen) return null;

  const { siteConfig } = travelData;

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    travelDate: '',
    travellers: 2,
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');

  const packagePrice = tour ? tour.price : 25000;
  const estimatedTotal = packagePrice * (Number(formData.travellers) || 2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        tourSlug: tour ? tour.slug : 'custom-trip-enquiry',
        tourTitle: tour ? tour.title : 'Custom Trip Itinerary',
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email,
        travelDate: formData.travelDate,
        travellers: Number(formData.travellers),
        specialRequests: formData.specialRequests,
        totalAmount: estimatedTotal
      };

      const res = await api.createBooking(payload);
      if (res.success) {
        setSuccessData(res.booking);
      } else {
        setError(res.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Connection error. Please check backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppConfirmation = () => {
    if (!successData) return;
    const text = encodeURIComponent(
      `Hello Travel Care 4 All,\nI have submitted booking ${successData.bookingId} for "${successData.tourTitle}".\nName: ${successData.customerName}\nPhone: ${successData.phone}\nDate: ${successData.travelDate}\nTravellers: ${successData.travellers}\nPlease confirm availability.`
    );
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-[#024724] to-[#056839] p-6 text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
              {tour ? 'Reserve Tour Package' : 'Plan Custom Journey'}
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold mt-0.5 text-white">
              {tour ? tour.title : 'Custom Trip Enquiry'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {successData ? (
            /* Success confirmation card */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900">
                Booking Request Registered!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-slate-800">{successData.customerName}</span>. 
                Your booking request has been securely recorded with our Vijayawada desk.
              </p>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 inline-block text-left w-full text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-emerald-200/60">
                  <span className="text-slate-500 font-medium">Booking Reference:</span>
                  <span className="font-extrabold text-[#024724]">{successData.bookingId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-200/60">
                  <span className="text-slate-500 font-medium">Tour Package:</span>
                  <span className="font-bold text-slate-800">{successData.tourTitle}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-200/60">
                  <span className="text-slate-500 font-medium">Travel Date:</span>
                  <span className="font-semibold text-slate-800">{successData.travelDate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">Travellers:</span>
                  <span className="font-semibold text-slate-800">{successData.travellers} Person(s)</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppConfirmation}
                  className="btn btn-wa w-full text-xs sm:text-sm py-3"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect with Consultant on WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="btn btn-outline w-full text-xs sm:text-sm py-3"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2.5">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                    <span>{error}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const text = encodeURIComponent(
                        `Hello Travel Care 4 All,\nI would like to book: ${tour ? tour.title : 'Custom Trip'}\nName: ${formData.customerName || 'Traveller'}\nPhone: ${formData.phone || ''}\nTravel Date: ${formData.travelDate || 'Flexible'}\nTravellers: ${formData.travellers}\nSpecial Requests: ${formData.specialRequests || 'None'}`
                      );
                      window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
                    }}
                    className="btn btn-wa !py-1.5 !px-3 text-xs w-full font-bold"
                  >
                    <MessageCircle className="w-3.5 h-3.5 mr-1" />
                    <span>Confirm Directly via WhatsApp</span>
                  </button>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#056839]" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Reddy"
                  className="field text-sm"
                />
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#056839]" />
                    <span>Mobile Phone *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="field text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="field text-sm"
                  />
                </div>
              </div>

              {/* Travel Date & Travellers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>Travel Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    name="travelDate"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.travelDate}
                    onChange={handleChange}
                    className="field text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-600" />
                    <span>No. of Travellers</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    name="travellers"
                    value={formData.travellers}
                    onChange={handleChange}
                    className="field text-sm"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Special Notes / Custom Requirements
                </label>
                <textarea
                  rows="2"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="e.g. Vegetarian food only, need 4★ hotel upgrade, Fast Track visa support needed..."
                  className="field text-sm resize-none"
                />
              </div>

              {/* Total Calculation Strip */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block">Est. Package Total ({formData.travellers || 2} persons)</span>
                  <span className="text-lg font-extrabold text-[#024724]">
                    ₹{estimatedTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 max-w-[180px] text-right">
                  Final quote verified with live airfare &amp; dates
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full py-3.5 text-sm font-bold disabled:opacity-50"
                >
                  {loading ? 'Submitting to Desk...' : 'Confirm & Send Booking Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
