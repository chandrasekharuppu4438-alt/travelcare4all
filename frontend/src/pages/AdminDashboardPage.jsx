import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck,
  PlaneTakeoff,
  MessageSquare,
  Package,
  LogOut,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Phone,
  Mail,
  User,
  Plus,
  Trash2,
  Edit,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { BrandLogo } from '../components/Navbar';
import api, { authStorage } from '../services/api';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const adminProfile = authStorage.getAdmin();

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'bookings' | 'visa' | 'enquiries' | 'packages'

  // Data States
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState({ bookings: [], visa: [], enquiries: [] });
  const [bookings, setBookings] = useState([]);
  const [visaList, setVisaList] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [packages, setPackages] = useState([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Notification Toast
  const [toast, setToast] = useState(null);

  // New Package Modal State
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({
    title: '',
    destination: '',
    country: '',
    travelType: 'International Tour',
    packageType: 'International',
    days: 5,
    price: 35000,
    originalPrice: 42000,
    image: 'malaysia',
    hotel: '4★ City & Resort Hotel',
    shortDescription: '',
    overview: '',
    highlights: 'City Tour, Sightseeing, Transfers',
    inclusions: 'Airfare, 4★ Hotel, Daily Breakfast, Airport Transfers'
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes, visaRes, enquiriesRes, toursRes] = await Promise.all([
        api.getDashboardStats().catch(() => null),
        api.getAdminBookings().catch(() => ({ bookings: [] })),
        api.getAdminVisa().catch(() => ({ inquiries: [] })),
        api.getAdminEnquiries().catch(() => ({ enquiries: [] })),
        api.getTours().catch(() => ({ tours: [] }))
      ]);

      if (statsRes?.success) {
        setStats(statsRes.stats);
        if (statsRes.recent) setRecent(statsRes.recent);
      }
      if (bookingsRes?.success) setBookings(bookingsRes.bookings || []);
      if (visaRes?.success) setVisaList(visaRes.inquiries || []);
      if (enquiriesRes?.success) setEnquiries(enquiriesRes.enquiries || []);
      if (toursRes?.tours) setPackages(toursRes.tours || []);
    } catch (err) {
      console.error('Error fetching admin dashboard data', err);
      showToast('Failed to load some dashboard sections.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Logout
  const handleLogout = async () => {
    await api.adminLogout();
    navigate('/admin/login', { replace: true });
  };

  // Booking Status Change
  const handleUpdateBookingStatus = async (id, newStatus) => {
    try {
      await api.updateBookingStatus(id, newStatus);
      setBookings(prev =>
        prev.map(b => (b._id === id || b.bookingId === id ? { ...b, status: newStatus } : b))
      );
      showToast(`Booking status updated to ${newStatus}`);
    } catch (err) {
      showToast(err.message || 'Status update failed', 'error');
    }
  };

  // Visa Status Change
  const handleUpdateVisaStatus = async (id, newStatus) => {
    try {
      await api.updateVisaStatus(id, newStatus);
      setVisaList(prev =>
        prev.map(v => (v._id === id || v.inquiryId === id ? { ...v, status: newStatus } : v))
      );
      showToast(`Visa inquiry status updated to ${newStatus}`);
    } catch (err) {
      showToast(err.message || 'Visa status update failed', 'error');
    }
  };

  // Enquiry Status Change
  const handleUpdateEnquiryStatus = async (id, newStatus) => {
    try {
      await api.updateEnquiryStatus(id, newStatus);
      setEnquiries(prev =>
        prev.map(e => (e._id === id || e.enquiryId === id ? { ...e, status: newStatus } : e))
      );
      showToast(`Enquiry status updated to ${newStatus}`);
    } catch (err) {
      showToast(err.message || 'Enquiry status update failed', 'error');
    }
  };

  // Create Package
  const handleCreatePackage = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newPackage,
        slug: newPackage.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        destinationSlug: newPackage.destination.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        highlights: newPackage.highlights.split(',').map(s => s.trim()).filter(Boolean),
        inclusions: newPackage.inclusions.split(',').map(s => s.trim()).filter(Boolean),
        days: Number(newPackage.days),
        price: Number(newPackage.price),
        originalPrice: Number(newPackage.originalPrice),
        rating: 4.8,
        reviews: 0,
        featured: false,
        popular: false
      };

      const res = await api.createPackage(payload);
      if (res.success) {
        showToast('New tour package created successfully!');
        setIsAddPackageOpen(false);
        setPackages(prev => [res.tour, ...prev]);
      }
    } catch (err) {
      showToast(err.message || 'Failed to create tour package', 'error');
    }
  };

  // Delete Package
  const handleDeletePackage = async (id) => {
    if (!window.confirm('Are you sure you want to delete/archive this package?')) return;
    try {
      await api.deletePackage(id);
      setPackages(prev => prev.filter(p => p._id !== id && p.slug !== id));
      showToast('Tour package removed.');
    } catch (err) {
      showToast(err.message || 'Failed to remove package', 'error');
    }
  };

  // Direct WhatsApp contact helper
  const openWhatsAppCustomer = (phone, text) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#070e17] text-[#f7f9f7] flex flex-col md:flex-row">
      {/* Toast Banner */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-2xl border text-sm flex items-center gap-2 animate-fadeIn ${
          toast.type === 'error'
            ? 'bg-rose-950/90 border-rose-500/30 text-rose-200'
            : 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4 text-rose-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0a1422] border-r border-white/10 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <BrandLogo className="h-9 w-9 shrink-0" />
            <div>
              <span className="block font-display font-bold text-lg text-white leading-tight">
                Travel Care
              </span>
              <span className="block text-[0.65rem] font-extrabold uppercase tracking-[0.28em] text-[#e66a2c]">
                Operations Desk
              </span>
            </div>
          </Link>
          <div className="mt-4 px-3 py-2 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium truncate">{adminProfile?.name || 'Administrator'}</span>
            </div>
            <span className="text-[0.65rem] uppercase font-bold text-amber-300">Active</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1 flex-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
              activeTab === 'overview'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
              activeTab === 'bookings'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <CalendarCheck className="w-4 h-4" />
              <span>Tour Bookings</span>
            </div>
            {bookings.length > 0 && (
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-slate-300">
                {bookings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('visa')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
              activeTab === 'visa'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <PlaneTakeoff className="w-4 h-4" />
              <span>Visa Enquiries</span>
            </div>
            {visaList.length > 0 && (
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-slate-300">
                {visaList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
              activeTab === 'enquiries'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4" />
              <span>Custom CRM Leads</span>
            </div>
            {enquiries.length > 0 && (
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-slate-300">
                {enquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
              activeTab === 'packages'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4" />
              <span>Manage Packages</span>
            </div>
            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-slate-300">
              {packages.length}
            </span>
          </button>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 py-2 text-xs text-slate-400 hover:text-white transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 px-6 bg-[#0a1422]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Admin</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white capitalize font-semibold">{activeTab}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            {activeTab === 'packages' && (
              <button
                onClick={() => setIsAddPackageOpen(true)}
                className="btn btn-primary !py-1.5 !px-3 text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Tour Package</span>
              </button>
            )}
          </div>
        </header>

        {/* Content Container */}
        <div className="p-6 sm:p-8 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0e1927] border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Total Bookings</span>
                    <CalendarCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-bold font-display text-white mt-2">
                    {stats?.totalBookings ?? bookings.length}
                  </div>
                  <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                    <span>{stats?.confirmedBookings ?? bookings.filter(b => b.status === 'Confirmed').length} Confirmed</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-amber-400">{stats?.pendingBookings ?? bookings.filter(b => b.status === 'Pending').length} Pending</span>
                  </div>
                </div>

                <div className="bg-[#0e1927] border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Visa Enquiries</span>
                    <PlaneTakeoff className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-3xl font-bold font-display text-white mt-2">
                    {stats?.totalVisa ?? visaList.length}
                  </div>
                  <div className="text-xs text-sky-400 mt-2 flex items-center gap-1">
                    <span>{stats?.newVisa ?? visaList.filter(v => v.status === 'New').length} New Submissions</span>
                  </div>
                </div>

                <div className="bg-[#0e1927] border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Custom Leads CRM</span>
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-bold font-display text-white mt-2">
                    {stats?.totalEnquiries ?? enquiries.length}
                  </div>
                  <div className="text-xs text-amber-400 mt-2">
                    <span>{stats?.newEnquiries ?? enquiries.filter(e => e.status === 'New').length} Need Follow-up</span>
                  </div>
                </div>

                <div className="bg-[#0e1927] border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Live Packages</span>
                    <Package className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold font-display text-white mt-2">
                    {packages.length}
                  </div>
                  <div className="text-xs text-purple-400 mt-2">
                    <span>Active in Public Catalogue</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <div className="bg-[#0e1927] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-white text-base">Recent Tour Bookings</h3>
                    <button onClick={() => setActiveTab('bookings')} className="text-xs text-amber-300 hover:underline">
                      View all ({bookings.length})
                    </button>
                  </div>
                  {bookings.length === 0 ? (
                    <p className="text-xs text-slate-500 py-6 text-center">No bookings recorded yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {bookings.slice(0, 4).map(b => (
                        <div key={b._id || b.bookingId} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-sm text-white">{b.customerName}</div>
                            <div className="text-xs text-slate-400">{b.tourTitle} · {b.travelDate}</div>
                          </div>
                          <span className={`text-[0.7rem] px-2.5 py-1 rounded-full font-bold ${
                            b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-300' :
                            b.status === 'Cancelled' ? 'bg-rose-500/20 text-rose-300' :
                            'bg-amber-500/20 text-amber-300'
                          }`}>
                            {b.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Visa Inquiries */}
                <div className="bg-[#0e1927] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-white text-base">Recent Visa Applications</h3>
                    <button onClick={() => setActiveTab('visa')} className="text-xs text-amber-300 hover:underline">
                      View all ({visaList.length})
                    </button>
                  </div>
                  {visaList.length === 0 ? (
                    <p className="text-xs text-slate-500 py-6 text-center">No visa inquiries recorded yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {visaList.slice(0, 4).map(v => (
                        <div key={v._id || v.inquiryId} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-sm text-white">{v.name}</div>
                            <div className="text-xs text-slate-400">{v.destination} · {v.visaType}</div>
                          </div>
                          <span className="text-[0.7rem] px-2.5 py-1 rounded-full font-bold bg-sky-500/20 text-sky-300">
                            {v.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TOUR BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Tour Package Bookings</h2>
                  <p className="text-xs text-slate-400">Review reservations, assign status, and connect with customers.</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#0e1927] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="bg-[#0e1927] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 text-slate-400 border-b border-white/10 uppercase tracking-wider text-[0.7rem]">
                      <tr>
                        <th className="p-4">Reference</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Tour &amp; Date</th>
                        <th className="p-4">Pax</th>
                        <th className="p-4">Total Amount</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {bookings
                        .filter(b => statusFilter === 'All' || b.status === statusFilter)
                        .map((b) => (
                          <tr key={b._id || b.bookingId} className="hover:bg-white/5 transition">
                            <td className="p-4 font-mono font-bold text-amber-300">{b.bookingId}</td>
                            <td className="p-4">
                              <div className="font-semibold text-white">{b.customerName}</div>
                              <div className="text-slate-400">{b.phone}</div>
                              {b.email && <div className="text-slate-500 text-[0.7rem]">{b.email}</div>}
                            </td>
                            <td className="p-4">
                              <div className="text-white font-medium">{b.tourTitle}</div>
                              <div className="text-slate-400">Travel: {b.travelDate}</div>
                            </td>
                            <td className="p-4 text-slate-300 font-semibold">{b.travellers} Pax</td>
                            <td className="p-4 text-emerald-400 font-semibold">
                              {b.totalAmount ? `₹${Number(b.totalAmount).toLocaleString('en-IN')}` : 'Custom Quote'}
                            </td>
                            <td className="p-4">
                              <select
                                value={b.status}
                                onChange={(e) => handleUpdateBookingStatus(b._id || b.bookingId, e.target.value)}
                                className={`rounded-lg px-2.5 py-1 text-xs font-bold border ${
                                  b.status === 'Confirmed'
                                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                                    : b.status === 'Cancelled'
                                    ? 'bg-rose-950/80 text-rose-300 border-rose-500/30'
                                    : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() =>
                                  openWhatsAppCustomer(
                                    b.phone,
                                    `Hello ${b.customerName}, this is Travel Care 4 All regarding your booking for ${b.tourTitle} (Ref: ${b.bookingId}).`
                                  )
                                }
                                className="inline-flex items-center gap-1 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 px-2.5 py-1 rounded-lg font-semibold transition"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VISA ENQUIRIES */}
          {activeTab === 'visa' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-xl font-display font-bold text-white">Fast Track Visa Enquiries</h2>
                <p className="text-xs text-slate-400">Track incoming visa documents and application progress.</p>
              </div>

              <div className="bg-[#0e1927] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 text-slate-400 border-b border-white/10 uppercase tracking-wider text-[0.7rem]">
                      <tr>
                        <th className="p-4">Ref Code</th>
                        <th className="p-4">Applicant</th>
                        <th className="p-4">Destination &amp; Category</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Connect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {visaList.map((v) => (
                        <tr key={v._id || v.inquiryId} className="hover:bg-white/5 transition">
                          <td className="p-4 font-mono font-bold text-sky-300">{v.inquiryId}</td>
                          <td className="p-4">
                            <div className="font-semibold text-white">{v.name}</div>
                            <div className="text-slate-400">{v.phone}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-white">{v.destination}</div>
                            <div className="text-slate-400">{v.visaType}</div>
                          </td>
                          <td className="p-4 text-slate-300">{v.travelDate || 'Not specified'}</td>
                          <td className="p-4">
                            <select
                              value={v.status}
                              onChange={(e) => handleUpdateVisaStatus(v._id || v.inquiryId, e.target.value)}
                              className="bg-[#070e17] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-sky-300 font-semibold"
                            >
                              <option value="New">New</option>
                              <option value="In Review">In Review</option>
                              <option value="Docs Received">Docs Received</option>
                              <option value="Processed">Processed</option>
                              <option value="Completed">Completed</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() =>
                                openWhatsAppCustomer(
                                  v.phone,
                                  `Hello ${v.name}, this is Travel Care 4 All Visa Desk regarding your ${v.destination} (${v.visaType}) enquiry (Ref: ${v.inquiryId}).`
                                )
                              }
                              className="inline-flex items-center gap-1 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 px-2.5 py-1 rounded-lg font-semibold transition"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ENQUIRIES CRM */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-xl font-display font-bold text-white">Custom Trip CRM Enquiries</h2>
                <p className="text-xs text-slate-400">Leads from Custom Trip Planner and general website inquiries.</p>
              </div>

              <div className="bg-[#0e1927] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 text-slate-400 border-b border-white/10 uppercase tracking-wider text-[0.7rem]">
                      <tr>
                        <th className="p-4">Ref Code</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Requirement</th>
                        <th className="p-4">Details</th>
                        <th className="p-4">Status Pipeline</th>
                        <th className="p-4 text-right">Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {enquiries.map((e) => (
                        <tr key={e._id || e.enquiryId} className="hover:bg-white/5 transition">
                          <td className="p-4 font-mono font-bold text-amber-300">{e.enquiryId}</td>
                          <td className="p-4">
                            <div className="font-semibold text-white">{e.customerName}</div>
                            <div className="text-slate-400">{e.phone}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-white font-medium">{e.destination || 'Custom Holiday'}</div>
                            <div className="text-slate-400">{e.travelType} · {e.travellers} Pax</div>
                          </td>
                          <td className="p-4 max-w-xs truncate text-slate-300">
                            {e.message || 'No additional notes'}
                          </td>
                          <td className="p-4">
                            <select
                              value={e.status}
                              onChange={(e) => handleUpdateEnquiryStatus(e._id || e.enquiryId, e.target.value)}
                              className="bg-[#070e17] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-amber-300 font-semibold"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Quotation Sent">Quotation Sent</option>
                              <option value="Follow-up">Follow-up</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() =>
                                openWhatsAppCustomer(
                                  e.phone,
                                  `Hello ${e.customerName}, this is Travel Care 4 All regarding your travel inquiry for ${e.destination} (Ref: ${e.enquiryId}).`
                                )
                              }
                              className="inline-flex items-center gap-1 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 px-2.5 py-1 rounded-lg font-semibold transition"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PACKAGES MANAGEMENT */}
          {activeTab === 'packages' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Tour Packages Catalogue</h2>
                  <p className="text-xs text-slate-400">Total {packages.length} active packages currently in service.</p>
                </div>
                <button
                  onClick={() => setIsAddPackageOpen(true)}
                  className="btn btn-primary !py-2 !px-4 text-xs font-semibold"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  <span>Create Package</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {packages.map((pkg) => (
                  <div key={pkg._id || pkg.slug} className="bg-[#0e1927] border border-white/10 rounded-2xl overflow-hidden p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-amber-400 uppercase tracking-wider">{pkg.travelType}</span>
                        <span className="text-slate-400">{pkg.days} Days</span>
                      </div>
                      <h4 className="font-display font-bold text-white text-base leading-snug">{pkg.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{pkg.destination}, {pkg.country}</p>
                      <div className="mt-3 text-lg font-bold text-emerald-400 font-display">
                        ₹{Number(pkg.price).toLocaleString('en-IN')}
                        {pkg.originalPrice && (
                          <span className="text-xs text-slate-500 line-through ml-2">
                            ₹{Number(pkg.originalPrice).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                      <Link
                        to={`/tours/${pkg.slug}`}
                        target="_blank"
                        className="text-xs text-slate-300 hover:text-white flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </Link>
                      <button
                        onClick={() => handleDeletePackage(pkg._id || pkg.slug)}
                        className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CREATE PACKAGE MODAL */}
      {isAddPackageOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e1927] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-display font-bold text-white mb-2">Create New Tour Package</h3>
            <p className="text-xs text-slate-400 mb-6">Add a package directly to the Travel Care 4 All catalogue.</p>

            <form onSubmit={handleCreatePackage} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tour Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Switzerland Alps & Paris Lights"
                  value={newPackage.title}
                  onChange={(e) => setNewPackage({ ...newPackage, title: e.target.value })}
                  className="w-full bg-[#070e17] border border-white/10 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Destination Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Switzerland"
                    value={newPackage.destination}
                    onChange={(e) => setNewPackage({ ...newPackage, destination: e.target.value })}
                    className="w-full bg-[#070e17] border border-white/10 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Country</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Switzerland"
                    value={newPackage.country}
                    onChange={(e) => setNewPackage({ ...newPackage, country: e.target.value })}
                    className="w-full bg-[#070e17] border border-white/10 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newPackage.days}
                    onChange={(e) => setNewPackage({ ...newPackage, days: e.target.value })}
                    className="w-full bg-[#070e17] border border-white/10 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newPackage.price}
                    onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                    className="w-full bg-[#070e17] border border-white/10 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={newPackage.originalPrice}
                    onChange={(e) => setNewPackage({ ...newPackage, originalPrice: e.target.value })}
                    className="w-full bg-[#070e17] border border-white/10 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Overview Summary</label>
                <textarea
                  rows="3"
                  placeholder="Comprehensive description of the tour experience..."
                  value={newPackage.overview}
                  onChange={(e) => setNewPackage({ ...newPackage, overview: e.target.value, shortDescription: e.target.value.slice(0, 120) })}
                  className="w-full bg-[#070e17] border border-white/10 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Highlights (comma-separated)</label>
                <input
                  type="text"
                  placeholder="Jungfrau summit, Seine cruise, Eiffel Tower stop"
                  value={newPackage.highlights}
                  onChange={(e) => setNewPackage({ ...newPackage, highlights: e.target.value })}
                  className="w-full bg-[#070e17] border border-white/10 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddPackageOpen(false)}
                  className="px-4 py-2 text-xs rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary !py-2 !px-5 text-xs font-semibold"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
