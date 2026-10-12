import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2,
  ShieldCheck,
  ChevronRight
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
    <div className="min-h-screen bg-[#fafbf9] text-[#17231d]">
      {/* 1. Breadcrumb Strip */}
      <div className="pt-28 pb-4 bg-[#eef8f1] border-b border-[#17231d]/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#17231d]/60">
            <Link to="/" className="hover:text-[#168447] transition">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-[#17231d]">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* 2. Scenic Header Banner */}
      <section className="relative overflow-hidden bg-[#17231d] pt-16 pb-20 sm:pt-20 sm:pb-24 text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/hero.png"
            alt="Travel Care 4 All Vijayawada Office"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17231d] via-[#17231d]/75 to-[#17231d]/85" />
        </div>

        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center relative z-10">
          <p className="eyebrow justify-center mb-3 text-amber-300">
            <span className="h-px w-6 bg-[#e66a2c]" />
            Get in Touch
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white">
            Contact <span className="text-amber-300 font-display">Our Office</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed">
            Visit us in Vijayawada or connect via WhatsApp and phone. Our consultants are ready to tailor your holiday.
          </p>
        </div>
      </section>

      {/* 3. Contact Information Cards Grid */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Office Address */}
          <div className="rounded-3xl bg-white p-7 ring-1 ring-[#17231d]/5 shadow-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#168447] to-[#075c35] text-white mb-5 shadow-lg shadow-[#168447]/20">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold font-sans text-[#17231d]">
              Office Address
            </h3>
            <div className="mt-3 text-xs sm:text-sm text-[#17231d]/70 space-y-1 flex-1">
              {siteConfig.addressLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          {/* Card 2: Phone Numbers */}
          <div className="rounded-3xl bg-white p-7 ring-1 ring-[#17231d]/5 shadow-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#168447] to-[#075c35] text-white mb-5 shadow-lg shadow-[#168447]/20">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold font-sans text-[#17231d]">
              Direct Phone Lines
            </h3>
            <div className="mt-3 text-xs sm:text-sm text-[#17231d]/70 space-y-2 flex-1">
              {siteConfig.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="block font-semibold text-[#17231d] hover:text-[#168447] transition"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>

          {/* Card 3: WhatsApp Support */}
          <div className="rounded-3xl bg-white p-7 ring-1 ring-[#17231d]/5 shadow-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#1fa855] to-[#128c46] text-white mb-5 shadow-lg shadow-[#1fa855]/20">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold font-sans text-[#17231d]">
              WhatsApp Desk
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[#17231d]/70 flex-1">
              Instant responses for itineraries, quotes &amp; visa guidance.
            </p>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.defaultWhatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#168447] hover:underline"
            >
              <span>+91 73861 33399</span>
              <span>→</span>
            </a>
          </div>

          {/* Card 4: Working Hours */}
          <div className="rounded-3xl bg-white p-7 ring-1 ring-[#17231d]/5 shadow-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#168447] to-[#075c35] text-white mb-5 shadow-lg shadow-[#168447]/20">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold font-sans text-[#17231d]">
              Desk Hours
            </h3>
            <div className="mt-3 text-xs sm:text-sm text-[#17231d]/70 space-y-1 flex-1">
              <p>Monday – Saturday:</p>
              <p className="font-semibold text-[#17231d]">09:30 AM – 08:30 PM</p>
              <p className="text-[#17231d]/50 pt-1">Sunday: By appointment</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Message Form & Map */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          {/* Form */}
          <div className="rounded-3xl bg-white p-8 sm:p-10 ring-1 ring-[#17231d]/10 shadow-card">
            <p className="eyebrow mb-2">
              <span className="h-px w-6 bg-[#e66a2c]" />
              Online Query
            </p>
            <h3 className="text-2xl font-bold font-sans text-[#17231d] mb-2">
              Send an Enquiry
            </h3>
            <p className="text-sm text-[#17231d]/70 mb-6">
              Fill in your contact information and requirement. Our Vijayawada team will revert promptly.
            </p>

            {submitted ? (
              <div className="rounded-2xl bg-[#eef8f1] border border-[#168447]/30 p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#168447] mx-auto" />
                <h4 className="text-xl font-bold font-sans text-[#17231d]">Message Sent Successfully!</h4>
                <p className="text-sm text-[#17231d]/80">
                  Thank you! We have received your query and initiated a WhatsApp chat for immediate assistance.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline text-xs mt-3 text-[#168447] border-[#168447]/30 hover:bg-[#168447]/10"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/75 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Kumar"
                    className="field !bg-[#fafbf9] !border-[#17231d]/15 !text-[#17231d] placeholder:!text-[#17231d]/40 focus:!border-[#168447]"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/75 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98480 12345"
                      className="field !bg-[#fafbf9] !border-[#17231d]/15 !text-[#17231d] placeholder:!text-[#17231d]/40 focus:!border-[#168447]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/75 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="field !bg-[#fafbf9] !border-[#17231d]/15 !text-[#17231d] placeholder:!text-[#17231d]/40 focus:!border-[#168447]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/75 mb-1.5">
                    Intended Destination or Service
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Dubai, Singapore, Kashmir, Fast Track Visa"
                    className="field !bg-[#fafbf9] !border-[#17231d]/15 !text-[#17231d] placeholder:!text-[#17231d]/40 focus:!border-[#168447]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/75 mb-1.5">
                    Travel Plan Details / Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your dates, number of travellers, preferences or visa queries..."
                    className="field !bg-[#fafbf9] !border-[#17231d]/15 !text-[#17231d] placeholder:!text-[#17231d]/40 resize-none focus:!border-[#168447]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full !py-3.5 !bg-[#e66a2c] hover:!bg-[#d85e22] text-white font-bold text-base shadow-lg shadow-[#e66a2c]/25 flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="h-4 w-4" />
                  <span>{loading ? 'Sending Message...' : 'Send Message & Chat on WhatsApp'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Location & Consultant Card */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-8 ring-1 ring-[#17231d]/10 shadow-card">
              <span className="text-xs font-bold uppercase tracking-wider text-[#168447] block mb-2">
                Managing Consultant
              </span>
              <h4 className="text-2xl font-bold font-sans text-[#17231d]">
                B. Vidya Sagar
              </h4>
              <p className="mt-3 text-sm text-[#17231d]/75 leading-relaxed">
                Available for in-person consultations at our Vijayawada office. We recommend booking a slot in advance for customized holiday planning, flight arrangements, or visa filings.
              </p>

              <div className="mt-6 pt-6 border-t border-[#17231d]/10 space-y-3 text-xs sm:text-sm text-[#17231d]/70">
                <div className="flex items-start gap-2.5">
                  <Building2 className="h-4 w-4 text-[#168447] shrink-0 mt-0.5" />
                  <span className="text-[#17231d] font-medium">#48-12-1, Ramavarappadu Ring, Beside Key Hotel, Upstairs Union Bank, Vijayawada - 520 004, A.P.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-[#168447] shrink-0" />
                  <span>Official Email: travelcare4all@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden h-[260px] relative ring-1 ring-[#17231d]/10 shadow-card">
              <img
                src="/images/hero.png"
                alt="Vijayawada Office & Tours"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17231d]/90 via-transparent to-transparent flex items-end p-6">
                <p className="text-xs font-semibold text-white/95">
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
