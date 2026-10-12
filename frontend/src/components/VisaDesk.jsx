import React, { useState } from 'react';
import { 
  Palmtree, 
  Briefcase, 
  PlaneTakeoff, 
  Users, 
  BookUser, 
  MessageSquare,
  CheckCircle2 
} from 'lucide-react';
import api from '../services/api';
import travelData from '../data/travelData';

export default function VisaDesk() {
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
    Palmtree: <Palmtree className="h-5 w-5" />,
    Briefcase: <Briefcase className="h-5 w-5" />,
    PlaneTakeoff: <PlaneTakeoff className="h-5 w-5" />,
    Users: <Users className="h-5 w-5" />
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

    // Also open WhatsApp prefilled
    const text = encodeURIComponent(
      `Hello Travel Care 4 All Visa Desk,\nName: ${formData.name}\nPhone: ${formData.phone}\nDestination: ${formData.destination}\nVisa Type: ${formData.visaType}\nTravel date: ${formData.date || 'Flexible'}`
    );
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="visa" className="scroll-mt-24 overflow-hidden bg-[#eef8f1] py-20 sm:py-28">
      <div className="container mx-auto grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        {/* Left Column */}
        <div>
          <p className="eyebrow mb-3">
            <span className="h-px w-6 bg-[#e66a2c]" />
            Visa &amp; Passport desk
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl lg:text-[2.85rem] lg:leading-[1.1] text-[#17231d] font-display">
            Fast Track Visa Services
          </h2>
          <p className="mt-4 max-w-xl text-lg text-[#17231d]/65">
            Document checklists, form filling, appointment booking and follow-ups handled by one dedicated desk — plus passport assistance for new applications and renewals.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {visaServices.map((t) => (
              <div 
                key={t.title}
                className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-[#17231d]/5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#168447] text-white">
                  {iconMap[t.icon] || <Palmtree className="h-5 w-5" />}
                </span>
                <h3 className="mt-4 font-sans font-bold text-[#17231d]">
                  {t.title}
                </h3>
                <p className="mt-1 text-sm text-[#17231d]/60">
                  {t.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-[#17231d]/70">
            <BookUser className="h-4 w-4 text-[#168447]" />
            <span>Passport: new applications, renewals, document guidance &amp; appointment support.</span>
          </p>
        </div>

        {/* Right Column: Enquiry Form */}
        <form 
          onSubmit={handleSubmit}
          className="rounded-[2rem] bg-white p-6 shadow-lift ring-1 ring-[#17231d]/5 sm:p-8"
        >
          <h3 className="text-2xl font-semibold font-display text-[#17231d]">
            Quick visa enquiry
          </h3>
          <p className="mt-1 text-sm text-[#17231d]/60">
            Our visa desk replies on WhatsApp, usually the same day.
          </p>

          {success ? (
            <div className="mt-6 p-6 rounded-2xl bg-[#eef8f1] text-center space-y-2">
              <CheckCircle2 className="h-10 w-10 text-[#168447] mx-auto" />
              <h4 className="font-bold text-[#075c35] text-lg font-display">Enquiry Submitted!</h4>
              <p className="text-xs text-[#17231d]/70">
                Opening WhatsApp to connect directly with the visa officer.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="btn btn-outline text-xs mt-3"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-[#17231d]">Full Name</span>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="field"
                  />
                </label>

                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-[#17231d]">Phone</span>
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="field"
                  />
                </label>

                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-[#17231d]">Destination</span>
                  <input
                    required
                    name="destination"
                    placeholder="e.g. Dubai"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="field"
                  />
                </label>

                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-[#17231d]">Visa Type</span>
                  <select
                    name="visaType"
                    value={formData.visaType}
                    onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                    className="field"
                  >
                    <option value="Tourist Visa">Tourist Visa</option>
                    <option value="Business Visa">Business Visa</option>
                    <option value="Transit Visa">Transit Visa</option>
                    <option value="Family Visa">Family Visa</option>
                    <option value="Passport Assistance">Passport Assistance</option>
                  </select>
                </label>

                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-[#17231d]">Travel Date</span>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="field"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-green mt-6 w-full"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Submit Visa Enquiry</span>
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
