import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Clock, CheckCircle2, FileText, ArrowRight, MessageSquare, AlertCircle, Plane, Sparkles } from 'lucide-react';
import travelData from '../data/travelData';

const VISA_COUNTRIES = [
  {
    id: 'uae',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    popularCity: 'Dubai & Abu Dhabi',
    turnaround: '24 – 48 Hours',
    approvalRate: '99.6%',
    validity: '60 Days Validity / 30 Days Stay',
    visaType: 'Electronic Tourist Visa (E-Visa)',
    docs: [
      'Colored Passport Scan (Front & Back, min. 6 months validity)',
      'White background passport-size photograph (digital scan)',
      'Confirmed return flight tickets (provided by Travel Care 4 All)',
      'Hotel booking or resident host invitation in UAE'
    ],
    expressAvailable: true,
    priceNote: 'Starting from ₹6,499 (Govt + Processing)'
  },
  {
    id: 'singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    popularCity: 'Singapore Island',
    turnaround: '3 – 4 Working Days',
    approvalRate: '99.2%',
    validity: 'Up to 2 Years Multiple Entry',
    visaType: 'E-Visa via Authorized Visa Partner',
    docs: [
      'Original Passport scan + all previous visas',
      'Recent 35x45mm matte-finish photographs (80% face view)',
      'Last 6 months Bank Statement with bank stamp & seal',
      'Employment proof / Leave sanction letter or business registration'
    ],
    expressAvailable: false,
    priceNote: 'Starting from ₹2,800 + Authorised Service Charge'
  },
  {
    id: 'thailand',
    country: 'Thailand',
    flag: '🇹🇭',
    popularCity: 'Bangkok, Phuket, Pattaya',
    turnaround: '2 – 3 Working Days',
    approvalRate: '99.8%',
    validity: 'Single Entry 60 Days / Visa Exemption Support',
    visaType: 'Official E-Visa / VoA Assistance',
    docs: [
      'Valid Indian Passport with at least 2 blank pages',
      'Confirmed round-trip flight booking with PNR',
      'Proof of accommodation (Hotel voucher in Thailand)',
      'Proof of funds (Min. 10,000 THB per person / 20,000 THB family)'
    ],
    expressAvailable: true,
    priceNote: 'Visa Exemption assistance & fast-track arrival guidance'
  },
  {
    id: 'malaysia',
    country: 'Malaysia',
    flag: '🇲🇾',
    popularCity: 'Kuala Lumpur & Langkawi',
    turnaround: '24 – 48 Hours',
    approvalRate: '99.7%',
    validity: '30 Days Entry (MDAC Digital Arrival)',
    visaType: 'MDAC Registration & Tourist Assistance',
    docs: [
      'Valid Passport with minimum 6 months validity',
      'Malaysia Digital Arrival Card (MDAC) pre-registration',
      'Return flight ticket confirmation',
      'Confirmed hotel reservation vouchers'
    ],
    expressAvailable: true,
    priceNote: 'Fast-Track digital pass support from ₹1,499'
  },
  {
    id: 'vietnam',
    country: 'Vietnam',
    flag: '🇻🇳',
    popularCity: 'Hanoi, Da Nang, Ho Chi Minh',
    turnaround: '3 Working Days',
    approvalRate: '99.5%',
    validity: '30 or 90 Days Single/Multiple Entry',
    visaType: 'Official Vietnam E-Visa',
    docs: [
      'Clear full page passport bio page scan',
      'High-resolution portrait photo (4x6 cm, no glasses)',
      'Intended entry and exit dates & border gate',
      'No physical embassy submission needed'
    ],
    expressAvailable: true,
    priceNote: 'Starting from ₹2,999 (Including official govt fee)'
  },
  {
    id: 'schengen',
    country: 'Schengen (Europe)',
    flag: '🇪🇺',
    popularCity: 'France, Switzerland, Italy, Germany',
    turnaround: '15 – 20 Working Days',
    approvalRate: '97.8%',
    validity: 'Custom Duration based on travel itinerary',
    visaType: 'Short-Stay Tourist Visa (Type C)',
    docs: [
      'Passport issued within last 10 years, valid 3+ months post return',
      'Comprehensive Day-to-Day Travel Itinerary with transport bookings',
      'Covering Letter detailing travel purpose and sponsorship',
      'Last 3 years ITR acknowledgement + 6 months stamped bank statement',
      'Overseas Travel & Medical Insurance (Min. €30,000 coverage)'
    ],
    expressAvailable: false,
    priceNote: 'Complete dossier compilation, appointment booking & SOP writing'
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    flag: '🇬🇧',
    popularCity: 'London, Edinburgh, Manchester',
    turnaround: '10 – 15 Working Days',
    approvalRate: '98.1%',
    validity: '6 Months Multiple Entry Standard Visitor',
    visaType: 'UK Standard Visitor Visa',
    docs: [
      'Current passport + all previous historical passports',
      'Employment letter, last 6 months payslips & Form 16',
      'Personal bank statements showing genuine savings & funds',
      'VFS Global appointment booking & biometric support'
    ],
    expressAvailable: true,
    priceNote: 'Standard & Priority VFS processing support'
  },
  {
    id: 'usa',
    country: 'United States',
    flag: '🇺🇸',
    popularCity: 'New York, California, Florida',
    turnaround: 'Appointment Based',
    approvalRate: '95.4%',
    validity: '10-Year Multiple Entry (B1/B2)',
    visaType: 'Non-Immigrant Visitor Visa',
    docs: [
      'DS-160 Online Non-immigrant Visa Application submission',
      'Valid Passport with validity beyond intended stay',
      'Visa interview appointment confirmation (VAC Biometric + Consular)',
      'Comprehensive financial assets & ties to India dossier'
    ],
    expressAvailable: false,
    priceNote: 'Full DS-160 assistance, earliest slot tracking & mock interview'
  }
];

export default function InteractiveVisaChecker() {
  const navigate = useNavigate();
  const { siteConfig } = travelData;

  const [selectedCountry, setSelectedCountry] = useState(VISA_COUNTRIES[0]);
  const [purpose, setPurpose] = useState('Tourism & Leisure');
  const [checkedDocs, setCheckedDocs] = useState({});

  const toggleDoc = (index) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleWhatsAppVisa = () => {
    const text = `Hello Travel Care 4 All Visa Desk! ✈️
I would like to apply for the *${selectedCountry.country} Visa* (${selectedCountry.flag}).
• Purpose: ${purpose}
• Visa Type: ${selectedCountry.visaType}
• Processing Window: ${selectedCountry.turnaround}

Please verify my document checklist and guide me through the fast-track application. Thank you!`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section className="relative py-16 sm:py-24 bg-slate-900 text-white overflow-hidden border-t border-slate-800">
      {/* Background gradients */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30 mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Fast-Track Visa Document &amp; Eligibility Checker</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white leading-tight">
            Check Visa Requirements in{' '}
            <span className="text-amber-400 italic">30 Seconds</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Select your destination country to view approved processing turnaround times, mandatory document checklists, and fast-track filing assistance.
          </p>
        </div>

        {/* Country Selector Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-4 mb-8">
          {VISA_COUNTRIES.map((c) => {
            const isSelected = selectedCountry.id === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedCountry(c);
                  setCheckedDocs({});
                }}
                className={`shrink-0 px-4 py-2.5 rounded-2xl border text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-emerald-500 shadow-lg shadow-emerald-900/50 scale-[1.03]'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{c.flag}</span>
                <span>{c.country}</span>
              </button>
            );
          })}
        </div>

        {/* Details Card */}
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Details & Key Metrics (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Country Badge & Purpose */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedCountry.flag}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">
                      {selectedCountry.country} Visa Assistance
                    </h3>
                    <p className="text-xs text-amber-300 font-medium">
                      Primary Destination: {selectedCountry.popularCity}
                    </p>
                  </div>
                </div>

                {/* Purpose Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">Purpose:</span>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="bg-slate-800 border border-slate-600 text-white text-xs font-semibold rounded-xl px-3 py-1.5 focus:border-emerald-500 outline-none cursor-pointer"
                  >
                    <option value="Tourism & Leisure">Tourism &amp; Leisure</option>
                    <option value="Business & Conferences">Business &amp; Work</option>
                    <option value="Family & Friend Visit">Family Visit</option>
                    <option value="Transit Entry">Transit Entry</option>
                  </select>
                </div>
              </div>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Processing Time</span>
                  </div>
                  <div className="text-base font-bold text-white">{selectedCountry.turnaround}</div>
                  <span className="text-[0.65rem] text-emerald-400 font-semibold block mt-0.5">
                    {selectedCountry.expressAvailable ? '⚡ Express Available' : 'Standard Processing'}
                  </span>
                </div>

                <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Approval Success</span>
                  </div>
                  <div className="text-base font-bold text-amber-300">{selectedCountry.approvalRate}</div>
                  <span className="text-[0.65rem] text-slate-400 block mt-0.5">Verified Document Filing</span>
                </div>

                <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <Plane className="w-3.5 h-3.5 text-sky-400" />
                    <span>Visa Format</span>
                  </div>
                  <div className="text-base font-bold text-white">{selectedCountry.visaType}</div>
                  <span className="text-[0.65rem] text-slate-400 block mt-0.5">{selectedCountry.validity}</span>
                </div>
              </div>

              {/* Interactive Document Checklist */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Mandatory Document Checklist</span>
                  </h4>
                  <span className="text-[0.68rem] text-slate-400">Click to check your readiness</span>
                </div>

                <div className="space-y-2.5">
                  {selectedCountry.docs.map((doc, idx) => {
                    const isChecked = !!checkedDocs[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleDoc(idx)}
                        className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                            : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'border-slate-600 bg-slate-900 text-transparent'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <span className={isChecked ? 'line-through text-slate-400' : ''}>{doc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: CTA & Consultant Guarantee (5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950/70 to-slate-900 rounded-2xl p-6 sm:p-7 border border-emerald-600/30 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fast-Track Desk Guarantee</span>
              </div>

              <div>
                <div className="text-xs text-slate-400">Estimated Consultation &amp; Processing</div>
                <div className="text-lg font-bold text-white mt-0.5">{selectedCountry.priceNote}</div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Every document is thoroughly pre-screened by B. Vidya Sagar’s visa desk in Vijayawada to ensure zero rejection risk before submission.
                </p>
              </div>

              {/* Benefits list */}
              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% Error-free application filing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Appointment tracking &amp; slot booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Doorstep / WhatsApp digital document collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Real-time status updates via WhatsApp</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-3">
                <button
                  type="button"
                  onClick={handleWhatsAppVisa}
                  className="w-full btn btn-wa !py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/70 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Apply for {selectedCountry.country} Visa</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/visa')}
                  className="w-full btn btn-ghost !py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-white/10 cursor-pointer"
                >
                  <span>Explore Full Visa Services Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-[0.68rem] text-slate-400 justify-center">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Travel Care 4 All is an authorized visa facilitator in Vijayawada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
