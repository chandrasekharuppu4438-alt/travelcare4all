import React, { useState } from 'react';
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
  Clock
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
    <div className="min-h-screen bg-[#0d1612] text-white">
      {/* 1. Header Hero */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-40 sm:pb-24 text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#168447]/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-4xl px-5 sm:px-8 relative z-10">
          <p className="eyebrow justify-center mb-3 text-amber-300">
            <span className="h-px w-6 bg-[#e66a2c]" />
            Fast Track Visa &amp; Passport Desk
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold font-display tracking-tight text-white">
            Fast Track <span className="text-amber-300 font-display">Visa Services</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/75 leading-relaxed">
            Hassle-free tourist, business, student, and transit visas for Dubai, Singapore, Malaysia, Thailand, Europe, UK, and worldwide.
          </p>
        </div>
      </section>

      {/* 2. Visa Services Grid matching card format */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 relative z-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visaServices.map((service) => (
            <div
              key={service.title}
              className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10 backdrop-blur-md shadow-card hover:-translate-y-1.5 transition-all duration-300 hover:bg-white/[0.07]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#168447] text-white mb-5 shadow-md shadow-[#168447]/30">
                {iconMap[service.icon] || <PlaneTakeoff className="h-6 w-6 text-white" />}
              </div>
              <h3 className="text-xl font-display font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 4-Stage Process Breakdown */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow justify-center mb-2 text-amber-300">
            <span className="h-px w-6 bg-[#e66a2c]" />
            How It Works
          </p>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
            Step-by-Step Visa Processing
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((st) => (
            <div
              key={st.num}
              className="rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10 relative overflow-hidden"
            >
              <span className="text-4xl font-extrabold font-display text-white/10 block mb-2">
                {st.num}
              </span>
              <h4 className="font-display font-bold text-lg text-amber-300">
                {st.title}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Visa Enquiry Form */}
      <section className="mx-auto max-w-4xl px-5 pb-24 sm:px-8 relative z-10">
        <div className="rounded-3xl bg-white/[0.05] p-8 sm:p-12 ring-1 ring-white/15 backdrop-blur-md shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Apply or Enquire for Fast Track Visa
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Submit your destination details and our consultant will contact you via WhatsApp / Phone with document requirements.
            </p>
          </div>

          {success ? (
            <div className="rounded-2xl bg-[#168447]/20 border border-[#168447]/50 p-6 text-center text-white space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-xl font-bold font-display">Visa Enquiry Submitted!</h4>
              <p className="text-sm text-white/80">
                Thank you! Our Fast Track Visa desk in Vijayawada will contact you shortly. WhatsApp consultation has also been initiated.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="btn btn-outline text-xs mt-3 !text-white"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Varma"
                    className="field !bg-white/10 !border-white/15 !text-white placeholder:!text-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                    Phone / WhatsApp Number
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
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                    Destination Country
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Dubai, Singapore, UK, Schengen"
                    className="field !bg-white/10 !border-white/15 !text-white placeholder:!text-white/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                    Visa Category
                  </label>
                  <select
                    value={formData.visaType}
                    onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                    className="field !bg-[#17231d] !border-white/15 !text-white font-semibold"
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
                <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1.5">
                  Expected Travel Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="field !bg-white/10 !border-white/15 !text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full !py-3.5 !bg-amber-400 !text-slate-950 hover:!bg-amber-300 font-extrabold text-base shadow-xl flex items-center justify-center gap-2 mt-4"
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
