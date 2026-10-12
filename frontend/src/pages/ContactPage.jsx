import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2,
  ShieldCheck
} from 'lucide-react';
import travelData from '../data/travelData';
import api from '../services/api';

export default function ContactPage() {
  const { siteConfig } = travelData;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.submitContact(formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    const text = encodeURIComponent(
      `Hello Travel Care 4 All,\nName: ${formData.name}\nPhone: ${formData.phone}\nInterested in: ${formData.destination || 'Tour Services'}\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0d1612] text-white">
      {/* 1. Header Hero */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-40 sm:pb-24 text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#168447]/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-4xl px-5 sm:px-8 relative z-10">
          <p className="eyebrow justify-center mb-3 text-amber-300">
            <span className="h-px w-6 bg-[#e66a2c]" />
            Get in Touch
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white">
            Contact <span className="text-amber-300 font-display">Our Office</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/75 leading-relaxed">
            Visit us in Vijayawada or connect via WhatsApp and phone. Our consultants are ready to tailor your holiday.
          </p>
        </div>
      </section>

      {/* 2. Contact Information Cards Grid */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 relative z-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Office Address */}
          <div className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur-md shadow-card">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#168447] text-white mb-5 shadow-md shadow-[#168447]/30">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-display font-semibold text-white">
              Office Address
            </h3>
            <div className="mt-3 text-xs sm:text-sm text-white/70 space-y-1">
              {siteConfig.addressLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          {/* Card 2: Phone Numbers */}
          <div className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur-md shadow-card">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#168447] text-white mb-5 shadow-md shadow-[#168447]/30">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-display font-semibold text-white">
              Direct Phone Lines
            </h3>
            <div className="mt-3 text-xs sm:text-sm text-white/70 space-y-2">
              {siteConfig.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="block font-semibold hover:text-amber-300 transition"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>

          {/* Card 3: WhatsApp Support */}
          <div className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur-md shadow-card">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1fa855] text-white mb-5 shadow-md shadow-[#1fa855]/30">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-display font-semibold text-white">
              WhatsApp Desk
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-white/70">
              Instant responses for itineraries, quotes &amp; visa guidance.
            </p>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.defaultWhatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:underline"
            >
              <span>+91 73861 33399</span>
              <span>→</span>
            </a>
          </div>

          {/* Card 4: Working Hours */}
          <div className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur-md shadow-card">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#168447] text-white mb-5 shadow-md shadow-[#168447]/30">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-display font-semibold text-white">
              Desk Hours
            </h3>
            <div className="mt-3 text-xs sm:text-sm text-white/70 space-y-1">
              <p>Monday – Saturday:</p>
              <p className="font-semibold text-white">09:30 AM – 08:30 PM</p>
              <p className="text-white/50 pt-1">Sunday: By appointment</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Message Form & Map */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 relative z-10">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          {/* Form */}
          <div className="rounded-3xl bg-white/[0.05] p-8 sm:p-10 ring-1 ring-white/15 backdrop-blur-md shadow-2xl">
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Send an Enquiry
            </h3>
            <p className="text-sm text-white/70 mb-6">
              Fill in your contact information and requirement. Our Vijayawada team will revert promptly.
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-[#168447]/20 border border-[#168447]/50 p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-bold font-display">Message Sent Successfully!</h4>
                <p className="text-sm text-white/80">
                  Thank you! We have received your query and initiated a WhatsApp chat for immediate assistance.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline text-xs mt-3 !text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Kumar"
                    className="field !bg-white/10 !border-white/15 !text-white placeholder:!text-white/40"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98480 12345"
                      className="field !bg-white/10 !border-white/15 !text-white placeholder:!text-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="field !bg-white/10 !border-white/15 !text-white placeholder:!text-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                    Intended Destination or Service
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Dubai, Singapore, Kashmir, Fast Track Visa"
                    className="field !bg-white/10 !border-white/15 !text-white placeholder:!text-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                    Travel Plan Details / Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your dates, number of travellers, preferences or visa queries..."
                    className="field !bg-white/10 !border-white/15 !text-white placeholder:!text-white/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full !py-3.5 !bg-amber-400 !text-slate-950 hover:!bg-amber-300 font-extrabold text-base shadow-xl flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="h-4 w-4" />
                  <span>{loading ? 'Sending Message...' : 'Send Message & Chat on WhatsApp'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Location & Consultant Card */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white/[0.04] p-8 ring-1 ring-white/10 backdrop-blur-md">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-2">
                Managing Consultant
              </span>
              <h4 className="text-2xl font-display font-bold text-white">
                B. Vidya Sagar
              </h4>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">
                Available for in-person consultations at our Vijayawada office. We recommend booking a slot in advance for customized holiday planning, flight arrangements, or visa filings.
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-xs sm:text-sm text-white/70">
                <div className="flex items-start gap-2.5">
                  <Building2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>#48-12-1, Ramavarappadu Ring, Beside Key Hotel, Upstairs Union Bank, Vijayawada - 520 004, A.P.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Official Email: travelcare4all@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden h-[260px] relative ring-1 ring-white/10">
              <img
                src="/images/hero.png"
                alt="Vijayawada Office & Tours"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1612]/90 via-transparent to-transparent flex items-end p-6">
                <p className="text-xs font-semibold text-white/90">
                  Located conveniently at Ramavarappadu Ring with parking available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
