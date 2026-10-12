import React, { useState, useEffect } from 'react';
import { 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  MessageSquare, 
  FileText, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [visaInquiries, setVisaInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, visaRes] = await Promise.all([
        api.getBookings(),
        api.getVisaInquiries()
      ]);

      if (bookingsRes?.success && bookingsRes.bookings) {
        setBookings(bookingsRes.bookings);
      }
      if (visaRes?.success && visaRes.inquiries) {
        setVisaInquiries(visaRes.inquiries);
      }
    } catch (err) {
      console.error('Error fetching admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await api.updateBookingStatus(id, newStatus);
      setBookings(prev =>
        prev.map(b => (b._id === id || b.bookingId === id ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error('Error updating status', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Contacted':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#fafbf9] pt-28 pb-20 text-[#17231d]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Top Breadcrumb & Title */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Link to="/" className="inline-flex items-center text-xs font-semibold text-[#168447] hover:underline mb-2">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Back to Main Website
            </Link>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#17231d] flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#168447] text-white">
                <Database className="h-5 w-5" />
              </span>
              <span>Travel Care 4 All — Management Desk</span>
            </h1>
            <p className="mt-1 text-sm text-[#17231d]/60">
              Live MERN API &amp; MongoDB customer reservations and visa enquiries desk.
            </p>
          </div>

          <button
            onClick={fetchData}
            className="btn btn-outline self-start md:self-auto !py-2.5 !px-4 text-xs font-bold"
          >
            <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Records</span>
          </button>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-[#17231d]/5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#17231d]/55">Total Bookings</span>
            <p className="mt-2 text-3xl font-extrabold text-[#075c35] font-display">{bookings.length}</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-[#17231d]/5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Confirmed</span>
            <p className="mt-2 text-3xl font-extrabold text-emerald-700 font-display">{confirmedCount}</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-[#17231d]/5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Pending Action</span>
            <p className="mt-2 text-3xl font-extrabold text-amber-700 font-display">{pendingCount}</p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-[#17231d]/5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Visa Enquiries</span>
            <p className="mt-2 text-3xl font-extrabold text-blue-700 font-display">{visaInquiries.length}</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-6 border-b border-[#17231d]/10 pb-4">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition ${
              activeTab === 'bookings'
                ? 'bg-[#168447] text-white shadow-sm'
                : 'bg-white text-[#17231d]/70 hover:bg-[#eef8f1] hover:text-[#168447]'
            }`}
          >
            Tour Bookings ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('visa')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition ${
              activeTab === 'visa'
                ? 'bg-[#168447] text-white shadow-sm'
                : 'bg-white text-[#17231d]/70 hover:bg-[#eef8f1] hover:text-[#168447]'
            }`}
          >
            Fast Track Visa Desk ({visaInquiries.length})
          </button>
        </div>

        {/* Tab Content: Bookings */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-card">
                <RefreshCw className="w-8 h-8 text-[#168447] animate-spin mx-auto mb-3" />
                <p className="text-sm text-slate-500">Fetching live bookings from backend...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl shadow-card">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold">No bookings recorded yet</h3>
                <p className="text-sm text-slate-500 mt-1">Bookings submitted from the website will appear here in real time.</p>
              </div>
            ) : (
              bookings.map((b) => {
                const id = b._id || b.bookingId;
                const cleanPhone = (b.phone || '').replace(/[^0-9]/g, '');
                const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${b.customerName}, this is Travel Care 4 All regarding your booking ${b.bookingId} for ${b.tourTitle}.`)}`;

                return (
                  <div
                    key={id}
                    className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-[#17231d]/5 hover:shadow-lift transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#17231d]/10">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-extrabold bg-[#eef8f1] text-[#075c35] px-2.5 py-0.5 rounded-full">
                            {b.bookingId}
                          </span>
                          <h3 className="font-display font-bold text-lg text-[#17231d]">
                            {b.tourTitle}
                          </h3>
                        </div>
                        <p className="text-xs text-[#17231d]/50 mt-1">
                          Booked on: {b.createdAt ? new Date(b.createdAt).toLocaleString('en-IN') : 'Recent'}
                        </p>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(b.status)}`}>
                          {b.status || 'Pending'}
                        </span>
                        <select
                          value={b.status || 'Pending'}
                          disabled={updatingId === id}
                          onChange={(e) => handleStatusChange(id, e.target.value)}
                          className="field !w-auto !py-1.5 !px-3 text-xs font-bold !rounded-xl"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer & Booking Details Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 pt-4 text-xs text-[#17231d]/80">
                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#17231d]/40 mb-1">
                          Customer
                        </span>
                        <p className="font-bold text-sm text-[#17231d]">{b.customerName}</p>
                        {b.email && <p className="text-[#17231d]/60 mt-0.5">{b.email}</p>}
                      </div>

                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#17231d]/40 mb-1">
                          Contact &amp; WhatsApp
                        </span>
                        <p className="font-semibold">{b.phone}</p>
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-[#168447] font-bold hover:underline"
                        >
                          <MessageSquare className="w-3 h-3" />
                          Chat on WhatsApp
                        </a>
                      </div>

                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#17231d]/40 mb-1">
                          Travel Date &amp; Group
                        </span>
                        <p className="font-semibold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#168447]" />
                          {b.travelDate}
                        </p>
                        <p className="text-[#17231d]/60 mt-0.5 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#168447]" />
                          {b.travellers} traveller{b.travellers > 1 ? 's' : ''}
                        </p>
                      </div>

                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#17231d]/40 mb-1">
                          Estimated Total
                        </span>
                        <p className="font-extrabold text-base text-[#075c35]">
                          {b.totalAmount ? `₹${b.totalAmount.toLocaleString('en-IN')}` : 'Quote on Request'}
                        </p>
                        {b.specialRequests && (
                          <p className="text-[11px] text-[#17231d]/60 mt-1 italic line-clamp-1" title={b.specialRequests}>
                            &ldquo;{b.specialRequests}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab Content: Visa Enquiries */}
        {activeTab === 'visa' && (
          <div className="space-y-4">
            {visaInquiries.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl shadow-card">
                <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold">No visa enquiries yet</h3>
                <p className="text-sm text-slate-500 mt-1">Visa submissions from the Fast Track Visa Desk will appear here.</p>
              </div>
            ) : (
              visaInquiries.map((v) => {
                const id = v._id || v.inquiryId;
                const cleanPhone = (v.phone || '').replace(/[^0-9]/g, '');
                const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${v.name}, this is Travel Care 4 All Fast Track Visa Desk regarding your ${v.visaType} for ${v.destination}.`)}`;

                return (
                  <div
                    key={id}
                    className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-[#17231d]/5 hover:shadow-lift transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#17231d]/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-extrabold bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full">
                            {v.inquiryId}
                          </span>
                          <h3 className="font-display font-bold text-lg text-[#17231d]">
                            {v.destination} — {v.visaType}
                          </h3>
                        </div>
                        <p className="text-xs text-[#17231d]/50 mt-1">
                          Submitted on: {v.createdAt ? new Date(v.createdAt).toLocaleString('en-IN') : 'Recent'}
                        </p>
                      </div>

                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 w-fit">
                        {v.status || 'New'}
                      </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3 pt-4 text-xs text-[#17231d]/80">
                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#17231d]/40 mb-1">
                          Applicant
                        </span>
                        <p className="font-bold text-sm text-[#17231d]">{v.name}</p>
                      </div>

                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#17231d]/40 mb-1">
                          Phone / WhatsApp
                        </span>
                        <p className="font-semibold">{v.phone}</p>
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-[#168447] font-bold hover:underline"
                        >
                          <MessageSquare className="w-3 h-3" />
                          Chat on WhatsApp
                        </a>
                      </div>

                      <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#17231d]/40 mb-1">
                          Intended Travel Date
                        </span>
                        <p className="font-semibold">{v.travelDate || 'Flexible / Not specified'}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
