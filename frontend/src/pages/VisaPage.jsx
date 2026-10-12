import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Palmtree, 
  Briefcase, 
  PlaneTakeoff, 
  Users, 
  BookUser, 
  MessageSquare,
  CheckCircle2,
  FileCheck,
  Send,
  HelpCircle,
  Clock,
  ChevronRight,
  ShieldCheck,
  FileText,
  Calendar
} from 'lucide-react';
import api from '../services/api';
import travelData from '../data/travelData';

export default function VisaPage() {
  const { siteConfig, visaServices } = travelData;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destination: '',
    visaType: 'Tourist Visa',
    date: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const iconMap = {
    Palmtree: <Palmtree className="h-6 w-6 text-white" />,
    Briefcase: <Briefcase className="h-6 w-6 text-white" />,
    PlaneTakeoff: <PlaneTakeoff className="h-6 w-6 text-white" />,
    Users: <Users className="h-6 w-6 text-white" />
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.submitVisaInquiry({
        name: formData.name,
        phone: formData.phone,
        destination: formData.destination,
        visaType: formData.visaType,
        travelDate: formData.date
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

    // Prefilled WhatsApp
    const text = encodeURIComponent(
      `Hello Travel Care 4 All Visa Desk,\nName: ${formData.name}\nPhone: ${formData.phone}\nDestination: ${formData.destination}\nVisa Type: ${formData.visaType}\nTravel Date: ${formData.date || 'Flexible'}`
    );
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  const steps = [
    { num: '01', title: 'Consultation & Checklist', desc: 'We examine your passport validity and provide the exact document checklist required by the destination embassy.' },
    { num: '02', title: 'Form Filing & Verification', desc: 'Our team fills out the consular forms, prepares flight itineraries, hotel vouchers, and financial documentation.' },
    { num: '03', title: 'Appointment & Biometrics', desc: 'We book your VFS / embassy appointment slots in Hyderabad or Chennai and brief you on required biometrics.' },
    { num: '04', title: 'Approval & Handover', desc: 'We track the application status daily and deliver your stamped passport or e-Visa promptly before your departure.' }
  ];

  return (
    <div className="min-h-screen bg-[#fafbf9] text-[#17231d]">
      {/* 1. Breadcrumb Strip */}
      <div className="pt-28 pb-4 bg-[#eef8f1] border-b border-[#17231d]/5">
        <div className="container mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#17231d]/60">
            <Link to="/" className="hover:text-[#168447] transition">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-[#17231d]">Visa Services</span>
          </nav>
        </div>
      </div>

      {/* 2. Scenic Header Banner */}
      <section className="relative overflow-hidden bg-[#17231d] pt-16 pb-20 sm:pt-20 sm:pb-24 text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/dubai.png"
            alt="Fast Track Visa Services"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17231d] via-[#17231d]/75 to-[#17231d]/85" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <p className="eyebrow justify-center mb-3 text-amber-300">
              <span className="h-px w-6 bg-[#e66a2c]" />
              Fast Track Visa &amp; Passport Desk
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white">
              Fast Track <span className="text-amber-300 font-display">Visa Services</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed">
              Hassle-free tourist, business, student, and transit visas for Dubai, Singapore, Malaysia, Thailand, Europe, UK, and worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Visa Services Grid */}
      <section className="container mx-auto py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow justify-center mb-2">
            <span className="h-px w-6 bg-[#e66a2c]" />
            Our Categories
          </p>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#17231d]">
            Comprehensive Visa Solutions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#17231d]/70">
            End-to-end documentation assistance, appointment booking, and visa tracking.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visaServices.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl bg-white p-7 ring-1 ring-[#17231d]/5 shadow-card hover:-translate-y-1.5 hover:shadow-lift transition-all duration-300 flex flex-col"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#168447] to-[#075c35] text-white mb-5 shadow-lg shadow-[#168447]/20">
                {iconMap[service.icon] || <PlaneTakeoff className="h-6 w-6 text-white" />}
              </div>
              <h3 className="text-xl font-bold font-sans text-[#17231d]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-[#17231d]/70 leading-relaxed flex-1">
                {service.description}
              </p>
              <div className="mt-5 pt-4 border-t border-[#17231d]/5 flex items-center text-xs font-bold text-[#168447]">
                <ShieldCheck className="h-4 w-4 mr-1.5" />
                Guaranteed Checklist Support
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 4-Stage Process Breakdown */}
      <section className="bg-[#eef8f1] py-16 sm:py-20 border-y border-[#17231d]/5">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow justify-center mb-2">
              <span className="h-px w-6 bg-[#e66a2c]" />
              How It Works
            </p>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#17231d]">
              Step-by-Step Visa Processing
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#17231d]/70">
              Clear, transparent, and error-free submissions handled by our visa specialists.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((st) => (
              <div
                key={st.num}
                className="rounded-3xl bg-white p-7 ring-1 ring-[#17231d]/5 shadow-card relative overflow-hidden"
              >
                <span className="text-4xl font-extrabold font-display text-[#168447]/20 block mb-3">
                  {st.num}
                </span>
                <h4 className="font-sans font-bold text-lg text-[#17231d]">
                  {st.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-[#17231d]/70 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive Visa Enquiry Form */}
      <section className="container mx-auto py-16 sm:py-24">
        <div className="max-w-4xl mx-auto rounded-3xl bg-white p-8 sm:p-12 ring-1 ring-[#17231d]/10 shadow-card">
          <div className="text-center mb-8">
            <p className="eyebrow justify-center mb-2">
              <span className="h-px w-6 bg-[#e66a2c]" />
              Quick Assistance
            </p>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#17231d]">
              Apply or Enquire for Fast Track Visa
            </h3>
            <p className="mt-2 text-sm text-[#17231d]/70 max-w-lg mx-auto">
              Submit your destination details and our consultant will contact you via WhatsApp &amp; phone with required checklists.
            </p>
          </div>

          {success ? (
            <div className="rounded-2xl bg-[#eef8f1] border border-[#168447]/30 p-8 text-center text-[#17231d] space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#168447] mx-auto" />
              <h4 className="text-xl font-bold font-sans text-[#17231d]">Visa Enquiry Submitted!</h4>
              <p className="text-sm text-[#17231d]/80 max-w-md mx-auto">
                Thank you! Our Fast Track Visa desk in Vijayawada will contact you shortly. WhatsApp consultation has also been initiated.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="btn btn-outline text-xs mt-3 text-[#168447] border-[#168447]/30 hover:bg-[#168447]/10"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/75 mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Varma"
                    className="field !bg-[#fafbf9] !border-[#17231d]/15 !text-[#17231d] placeholder:!text-[#17231d]/40 focus:!border-[#168447]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/75 mb-1.5">
                    Phone / WhatsApp Number
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
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/75 mb-1.5">
                    Destination Country
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Dubai, Singapore, UK, Schengen"
                    className="field !bg-[#fafbf9] !border-[#17231d]/15 !text-[#17231d] placeholder:!text-[#17231d]/40 focus:!border-[#168447]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/75 mb-1.5">
                    Visa Category
                  </label>
                  <select
                    value={formData.visaType}
                    onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                    className="field !bg-[#fafbf9] !border-[#17231d]/15 !text-[#17231d] font-semibold focus:!border-[#168447]"
                  >
                    <option value="Tourist Visa">Tourist Visa (Single/Multiple Entry)</option>
                    <option value="Business Visa">Business / Conference Visa</option>
                    <option value="Fast Track Visa">Fast Track Express Visa</option>
                    <option value="Family / Transit Visa">Family / Visit / Transit Visa</option>
                    <option value="Passport Assistance">New Passport / Passport Renewal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#17231d]/75 mb-1.5">
                  Expected Travel Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="field !bg-[#fafbf9] !border-[#17231d]/15 !text-[#17231d] focus:!border-[#168447]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full !py-3.5 !bg-[#e66a2c] hover:!bg-[#d85e22] !text-white font-bold text-base shadow-lg shadow-[#e66a2c]/25 flex items-center justify-center gap-2 mt-4"
              >
                <Send className="h-4 w-4" />
                <span>{loading ? 'Submitting Enquiry...' : 'Submit Visa Enquiry & Chat on WhatsApp'}</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
