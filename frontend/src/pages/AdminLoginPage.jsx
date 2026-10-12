import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';
import { BrandLogo } from '../components/Navbar';
import api from '../services/api';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.adminLogin(email, password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.message || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      setError(err.message || 'Server connection error. Please verify backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('admin@travelcare4all.com');
    setPassword('Admin@TravelCare2026');
  };

  return (
    <div className="min-h-screen bg-[#070e17] text-[#f7f9f7] flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#168447]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <BrandLogo className="h-12 w-12 shrink-0 transition-transform group-hover:scale-105" />
            <div className="text-left">
              <span className="block font-display font-bold text-2xl text-white tracking-tight">
                Travel Care
              </span>
              <span className="block text-[0.7rem] font-extrabold uppercase tracking-[0.3em] text-[#e66a2c]">
                4 All
              </span>
            </div>
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-300 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Administrator Security Portal</span>
          </div>
          <h1 className="text-2xl font-display font-semibold text-white mt-2">
            Operations &amp; CRM Console
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Sign in to manage tour packages, customer bookings, and visa enquiries.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0e1927]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@travelcare4all.com"
                  className="w-full bg-[#070e17] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#070e17] border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#168447] to-[#075c35] hover:from-[#1b9a53] hover:to-[#096e40] text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-60 cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs text-amber-300/90 hover:text-amber-200 flex items-center justify-center gap-1.5 mx-auto transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Click to auto-fill default admin credentials</span>
            </button>
          </div>
        </div>

        {/* Back to public website */}
        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-slate-400 hover:text-white transition">
            ← Return to Travel Care 4 All Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
