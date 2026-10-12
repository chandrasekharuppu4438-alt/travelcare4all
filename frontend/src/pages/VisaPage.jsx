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
  ChevronRight,
  ShieldCheck,
  FileCheck,
  Clock,
  Calendar,
  AlertCircle,
  HelpCircle,
  Star,
  Quote,
  ChevronLeft,
  ArrowRight,
  Check,
  Zap,
  Globe2,
  FileText,
  PhoneCall
} from 'lucide-react';
import api from '../services/api';
import travelData from '../data/travelData';

export default function VisaPage() {
  const { siteConfig } = travelData;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destination: '',
    visaType: 'Tourist Visa',
    date: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastInquiryId, setLastInquiryId] = useState('');
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tourist Visa');

  // Country Explorer State
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);

  // Testimonials State
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Roadmap Step State
  const [activeStep, setActiveStep] = useState(0);

  const visaCategories = [
    {
      title: "Tourist Visa",
      description: "Dubai, Singapore, Malaysia, Thailand, Schengen, UK, USA & 20+ countries.",
      icon: <Palmtree className="h-5 w-5" />
    },
    {
      title: "Business Visa",
      description: "Invitation letters, cover letters, consular dossiers & appointment scheduling.",
      icon: <Briefcase className="h-5 w-5" />
    },
    {
      title: "Transit Visa",
      description: "Quick turnaround for airport layovers and multi-destination connecting flights.",
      icon: <PlaneTakeoff className="h-5 w-5" />
    },
    {
      title: "Family & Dependent Visa",
      description: "Visit-family, spouse, and parent visas with verified relationship documentation.",
      icon: <Users className="h-5 w-5" />
    }
  ];

  // Dynamic Country Visa Hub Database
  const countries = [
    {
      country: "Dubai (UAE)",
      flag: "🇦🇪",
      type: "Express e-Visa",
      duration: "30 or 60 Days Single / Multiple Entry",
      time: "24 – 48 Hours",
      price: "₹6,499",
      speed: "Fast Track Express",
      checklist: [
        "Color scan of Passport first & last page (valid min 6 months)",
        "1 Passport size photograph (white background, 35x45mm)",
        "Confirmed Return Flight Tickets",
        "Hotel booking voucher in UAE",
        "No bank statement required for short-term tourist visa"
      ],
      description: "Fast-track 30-day and 60-day Dubai tourist visas delivered online directly to your email or WhatsApp."
    },
    {
      country: "Singapore",
      flag: "🇸🇬",
      type: "E-Visa (Paperless Entry)",
      duration: "30 Days Stay (Up to 2 Years Multiple Entry)",
      time: "3 – 4 Working Days",
      price: "₹3,299",
      speed: "High Approval Rate",
      checklist: [
        "Passport scan with 6+ months validity",
        "Form 14A filled and signed",
        "Passport photograph (strictly 35x45mm, matte finish, 80% face)",
        "Confirmed flight itinerary & hotel confirmation",
        "Covering letter mentioning purpose of travel"
      ],
      description: "Authorised submission with official Singapore ICA consular validation for individuals and families."
    },
    {
      country: "Thailand",
      flag: "🇹🇭",
      type: "E-Visa / Visa on Arrival Support",
      duration: "30 / 60 Days Tourist Stay",
      time: "24 Hours or On-Arrival Assistance",
      price: "₹2,999",
      speed: "Same Day Turnaround",
      checklist: [
        "Passport valid for at least 6 months",
        "Recent color photograph (4x6cm)",
        "Confirmed return air tickets within 15 or 30 days",
        "Proof of accommodation / hotel confirmation",
        "Proof of funds: THB 10,000 per person / THB 20,000 per family"
      ],
      description: "Skip long queues in Bangkok or Phuket with pre-verified document checklists and e-Visa filing."
    },
    {
      country: "Malaysia",
      flag: "🇲🇾",
      type: "MDAC & Tourist e-Visa",
      duration: "30 Days Single Entry",
      time: "24 – 48 Hours",
      price: "₹2,499",
      speed: "Paperless Online",
      checklist: [
        "Passport front & bio page scan",
        "Studio photo with clear white backdrop",
        "Confirmed flight reservation into Kuala Lumpur",
        "Hotel stay confirmation",
        "MDAC digital arrival card submission"
      ],
      description: "Quick online processing with direct high-commission consular compliance."
    },
    {
      country: "Vietnam",
      flag: "🇻🇳",
      type: "Official Electronic Visa",
      duration: "30 to 90 Days Single / Multiple Entry",
      time: "3 Working Days",
      price: "₹3,499",
      speed: "Direct Embassy System",
      checklist: [
        "Passport bio-data scan (PDF or JPEG)",
        "Portrait photo without glasses",
        "Entry & exit checkpoint port details",
        "No physical embassy visit needed"
      ],
      description: "Travel to Hanoi, Da Nang, and Ho Chi Minh City with 100% online approved e-Visa."
    },
    {
      country: "Schengen (Europe)",
      flag: "🇪🇺",
      type: "Category C Tourist / Business Sticker",
      duration: "Up to 90 Days in any 180-day period",
      time: "15 Calendar Days",
      price: "₹12,999",
      speed: "VFS Slot & Dossier Preparation",
      checklist: [
        "Original passport with at least 2 blank pages",
        "Filled Harmonised Schengen Visa application",
        "3 years Income Tax Returns (ITR-V)",
        "6 months updated bank statement with original bank seal",
        "Day-by-day detailed travel itinerary & inter-city train/flight vouchers",
        "Overseas travel insurance with min €30,000 medical coverage"
      ],
      description: "Comprehensive dossier preparation, VFS slot booking in Hyderabad/Chennai, and mock interview briefing."
    },
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      type: "Standard Visitor Visa (6 Months)",
      duration: "6 Months Multiple Entry",
      time: "3 – 4 Weeks (Priority available)",
      price: "₹14,500",
      speed: "Biometric Appointment Support",
      checklist: [
        "Current passport & previous passports",
        "Financial proof: 6 months bank statement + ITR",
        "Employment proof / Salary slips or Business registration",
        "Covering letter detailing itinerary in England/Scotland",
        "Biometrics appointment at VFS Hyderabad"
      ],
      description: "Error-free online application filing, document upload to VFS portal, and appointment coordination."
    },
    {
      country: "United States",
      flag: "🇺🇸",
      type: "B1/B2 Tourist & Business Visa",
      duration: "10 Years Multiple Entry",
      time: "Appointment Dependent (Slot Assistance)",
      price: "₹19,999",
      speed: "DS-160 & Mock Interview",
      checklist: [
        "Valid passport with min 6 months beyond intended stay",
        "Accurate DS-160 confirmation barcode",
        "MRV fee payment receipt",
        "VAC biometric appointment + Consular interview slot",
        "Financial records, property papers, family ties proof"
      ],
      description: "Expert DS-160 filing, slot monitoring in Hyderabad/Chennai, and 1-on-1 consular interview briefing."
    }
  ];

  const currentCountry = countries[selectedCountryIndex];

  // Roadmap Steps
  const steps = [
    {
      num: "01",
      title: "Document Audit & Checklist",
      desc: "We examine your passport validity and provide the exact document checklist required by the destination embassy.",
      detail: "Avoid rejections due to blur scans, incorrect photo dimensions, or insufficient bank balances. Our consultants vet every paper before submission."
    },
    {
      num: "02",
      title: "Form Filing & Dossier Prep",
      desc: "Our team fills out the consular forms, prepares flight itineraries, hotel vouchers, and financial documentation.",
      detail: "Consular portals have strict verification gates. We generate confirmed flight tickets and legitimate hotel vouchers tailored to your itinerary."
    },
    {
      num: "03",
      title: "Appointment & Biometrics",
      desc: "We book your VFS / embassy appointment slots in Hyderabad or Chennai and brief you on required biometrics.",
      detail: "We coordinate earliest available biometric dates at VFS Hyderabad or Chennai and conduct a mock briefing for first-time international travelers."
    },
    {
      num: "04",
      title: "Approval & Express Delivery",
      desc: "We track the application status daily and deliver your stamped passport or e-Visa promptly before your departure.",
      detail: "Live tracking through consular systems. Once approved, e-Visas are dispatched on WhatsApp and stamped passports delivered safely."
    }
  ];

  // Verified Testimonials
  const testimonials = [
    {
      name: "Rajesh Varma & Family · Vijayawada",
      trip: "Dubai 30-Day Family Visa",
      badge: "VERIFIED VISA TRAVELLER",
      rating: 5,
      quote: "Got our Dubai 30-day tourist visas in less than 36 hours. Extremely professional document checking by Vidya Sagar garu."
    },
    {
      name: "Kiran & Sneha · Guntur",
      trip: "Singapore & Malaysia Holiday",
      badge: "VERIFIED VISA TRAVELLER",
      rating: 5,
      quote: "Singapore and Malaysia e-visas were processed without a single glitch. Clear checklist and prompt WhatsApp updates throughout."
    },
    {
      name: "Dr. K. Srinivas · Vijayawada",
      trip: "Europe Schengen Tourist Visa",
      badge: "VERIFIED VISA TRAVELLER",
      rating: 5,
      quote: "Europe Schengen appointment at VFS Hyderabad was booked on priority and documentation was 100% spotless. Highly recommended!"
    },
    {
      name: "Venkat Rao & Group · Machilipatnam",
      trip: "Thailand E-Visa & Flights",
      badge: "VERIFIED VISA TRAVELLER",
      rating: 5,
      quote: "Thailand e-visa and group flights arranged smoothly. Transparent rates and no last-minute hassles."
    }
  ];

  const currentTestimonial = testimonials[testimonialIndex];

  // FAQ Database
  const faqs = [
    {
      q: "How early should I apply for my tourist visa before travelling?",
      a: "For countries like Dubai, Singapore, Malaysia, and Thailand, applying 7 to 10 days before departure is sufficient. For Schengen (Europe), UK, or USA, we recommend initiating the process 4 to 8 weeks in advance due to biometric appointment queues."
    },
    {
      q: "Can Travel Care 4 All assist if my visa was previously rejected?",
      a: "Yes. Our senior consultants review your previous refusal notice, identify the exact reason (such as insufficient financial ties, unclear itinerary, or flawed documentation), and re-structure your case with an amended dossier and explanation letter."
    },
    {
      q: "Do I need to visit Hyderabad or Chennai personally for biometrics?",
      a: "For online e-Visas (Dubai, Singapore, Malaysia, Thailand, Vietnam, Bali, Sri Lanka), no physical visit is required — everything is handled digitally from Vijayawada. For Schengen, UK, and USA visas, physical presence is required once at the VFS / VAC center in Hyderabad or Chennai for fingerprinting and photo."
    },
    {
      q: "What is the minimum passport validity required for international travel?",
      a: "Almost all countries mandate a passport with at least 6 months validity remaining from your planned date of return, along with at least 2 consecutive blank pages for consular stamping."
    },
    {
      q: "Do you offer passport assistance for new applications and renewals?",
      a: "Yes, our Vijayawada office offers complete Passport Seva assistance: appointment scheduling at the Vijayawada PSK, document compilation, Annexure preparation, and Tatkal expedited slots."
    }
  ];

  const handleSelectCategory = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
    setFormData(prev => ({ ...prev, visaType: categoryTitle }));
    const cardEl = document.getElementById('enquiry-card');
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSelectCountry = (countryObj) => {
    setFormData(prev => ({
      ...prev,
      destination: countryObj.country.replace(/\s*\(.*\)/, '').trim(),
      visaType: countryObj.type.includes('Business') ? 'Business Visa' : 'Tourist Visa'
    }));
    const cardEl = document.getElementById('enquiry-card');
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.submitVisaInquiry({
        name: formData.name,
        phone: formData.phone,
        destination: formData.destination,
        visaType: formData.visaType,
        travelDate: formData.date
      });
      if (res?.success) {
        if (res.inquiry?.inquiryId) {
          setLastInquiryId(res.inquiry.inquiryId);
        }
        setSuccess(true);
      } else {
        setError(res?.message || 'Could not save visa application. Please connect directly via WhatsApp.');
      }
    } catch (err) {
      setError(err.message || 'Network error submitting visa application.');
    } finally {
      setLoading(false);
    }
  };

  const nextTestimonial = () => {
    setTestimonialIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setTestimonialIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="w-full bg-[#fafbf9] text-[#17231d]">
      {/* 1. Scenic Hero Banner (with integrated breadcrumbs & generous top spacing) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#06180f] via-[#0b2819] to-[#123623] pt-36 sm:pt-44 pb-16 sm:pb-24 text-white">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/hero.png"
            alt="Fast Track Visa Services"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06180f] via-[#06180f]/75 to-[#06180f]/85" />
        </div>

        <div className="container mx-auto text-center relative z-10 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Integrated Breadcrumb */}
            <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/70 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/15">
              <Link to="/" className="hover:text-amber-300 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 text-white/50" />
              <span className="font-semibold text-white">Visa Services</span>
            </nav>

            <p className="eyebrow justify-center mb-3 text-amber-300 text-xs font-bold tracking-widest uppercase">
              <span className="h-px w-6 bg-[#e66a2c]" />
              FAST-TRACK CONSULAR &amp; PASSPORT ASSISTANCE
              <span className="h-px w-6 bg-[#e66a2c]" />
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-tight">
              Fast Track Visa Services
            </h1>

            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-white/85 leading-relaxed font-sans">
              Consular document checklists, dossier vetting, VFS appointment booking, and express passport assistance managed by our Vijayawada specialist desk.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Flagship Visa Desk & Instant Enquiry Form */}
      <section className="py-16 sm:py-24 bg-[#eef8f1] border-b border-[#17231d]/10">
        <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          {/* Left Column: Heading, 2x2 Category Grid, Passport Banner */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-[#075c35] ring-1 ring-[#168447]/20 mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-[#168447]" />
              99.2% Consular Approval Rate
            </span>

            <h2 className="text-2xl sm:text-4xl font-display font-bold text-[#17231d] leading-tight">
              Select Your Travel Category
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[#17231d]/70 leading-relaxed">
              Every country enforces distinct biometric, financial, and cover letter standards. Choose your travel purpose below to auto-prepare your enquiry.
            </p>

            {/* 2x2 Interactive Grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {visaCategories.map((t) => {
                const isSelected = selectedCategory === t.title;
                return (
                  <div 
                    key={t.title}
                    onClick={() => handleSelectCategory(t.title)}
                    className={`rounded-2xl p-5 transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? 'bg-white ring-2 ring-[#168447] shadow-lift -translate-y-1' 
                        : 'bg-white/80 hover:bg-white ring-1 ring-[#17231d]/8 shadow-card hover:-translate-y-0.5'
                    }`}
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#168447] to-[#075c35] text-white shadow-md shadow-[#168447]/25">
                      {t.icon}
                    </span>
                    <div className="mt-4 flex items-center justify-between">
                      <h3 className="font-sans font-bold text-[#17231d] text-base">
                        {t.title}
                      </h3>
                      {isSelected && (
                        <span className="text-[0.65rem] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#168447]/10 text-[#168447]">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm text-[#17231d]/65 leading-relaxed font-sans">
                      {t.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Passport Seva Banner */}
            <div className="mt-6 flex items-start gap-3 bg-white p-4 rounded-2xl ring-1 ring-[#17231d]/8 shadow-sm">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eef8f1] text-[#168447] mt-0.5">
                <BookUser className="h-5 w-5" />
              </span>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#17231d]">
                  Passport Seva Assistance Desk
                </h4>
                <p className="text-xs text-[#17231d]/65 mt-0.5 leading-relaxed">
                  New passport applications, renewals, lost passport paperwork, annexures, and appointment slots at the Vijayawada Passport Seva Kendra.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Visa Enquiry Form */}
          <div 
            id="enquiry-card"
            className="rounded-[2.5rem] bg-white p-7 sm:p-9 shadow-lift ring-1 ring-[#17231d]/8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-display font-bold text-[#17231d]">
                  Quick Visa Enquiry
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#17231d]/65">
                  Our visa desk responds on WhatsApp, usually within 2 to 4 hours.
                </p>
              </div>
              <span className="h-10 w-10 grid place-items-center rounded-2xl bg-[#eef8f1] text-[#168447]">
                <FileCheck className="h-5 w-5" />
              </span>
            </div>

            {success ? (
              <div className="mt-6 p-6 rounded-2xl bg-[#eef8f1] border border-[#168447]/30 text-center space-y-3">
                <CheckCircle2 className="h-12 w-12 text-[#168447] mx-auto" />
                <h4 className="font-bold text-[#075c35] text-xl font-display">Visa Enquiry Registered!</h4>
                {lastInquiryId && (
                  <div className="inline-block px-3 py-1 bg-white rounded-full text-xs font-mono font-bold text-[#075c35] border border-[#168447]/20">
                    Reference Code: {lastInquiryId}
                  </div>
                )}
                <p className="text-sm text-[#17231d]/75 max-w-sm mx-auto">
                  Your visa request is officially recorded with our Vijayawada office. Connect directly with our visa consultant on WhatsApp to send passport scans and photo requirements.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      const text = encodeURIComponent(
                        `Hello Travel Care 4 All Visa Desk,\nI submitted visa inquiry ${lastInquiryId}.\nName: ${formData.name}\nPhone: ${formData.phone}\nDestination: ${formData.destination}\nVisa Type: ${formData.visaType}\nTravel Date: ${formData.date || 'Flexible'}\nPlease share document checklist.`
                      );
                      window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
                    }}
                    className="btn btn-wa text-xs font-bold"
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    <span>Send Documents on WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="btn btn-outline text-xs"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                    <span>{error}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const text = encodeURIComponent(
                          `Hello Travel Care 4 All Visa Desk,\nName: ${formData.name}\nDestination: ${formData.destination}\nVisa Type: ${formData.visaType}`
                        );
                        window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
                      }}
                      className="text-[#075c35] underline font-bold ml-2 shrink-0"
                    >
                      Connect on WhatsApp
                    </button>
                  </div>
                )}

                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#17231d]/70">
                    Full Name *
                  </span>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Varma"
                    className="field !bg-[#fafbf9]"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#17231d]/70">
                      Phone Number *
                    </span>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="field !bg-[#fafbf9]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#17231d]/70">
                      Destination Country *
                    </span>
                    <input
                      required
                      name="destination"
                      placeholder="e.g. Dubai, Singapore"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="field !bg-[#fafbf9]"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#17231d]/70">
                      Visa Category
                    </span>
                    <select
                      name="visaType"
                      value={formData.visaType}
                      onChange={(e) => {
                        setFormData({ ...formData, visaType: e.target.value });
                        setSelectedCategory(e.target.value);
                      }}
                      className="field !bg-[#fafbf9] font-medium"
                    >
                      <option value="Tourist Visa">Tourist Visa</option>
                      <option value="Business Visa">Business Visa</option>
                      <option value="Transit Visa">Transit Visa</option>
                      <option value="Family Visa">Family &amp; Dependent Visa</option>
                      <option value="Passport Assistance">Passport Assistance</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#17231d]/70">
                      Target Travel Date
                    </span>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="field !bg-[#fafbf9]"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 rounded-full bg-[#168447] hover:bg-[#075c35] text-white font-bold py-3.5 px-6 shadow-lg shadow-[#168447]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{loading ? 'Submitting Enquiry...' : 'Submit Visa Enquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. Dynamic Interactive Country Visa Hub & Checklist */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#17231d]/8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="eyebrow justify-center mb-2">
              <span className="h-px w-6 bg-[#e66a2c]" />
              LIVE DESTINATION CHECKER
              <span className="h-px w-6 bg-[#e66a2c]" />
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#17231d]">
              Country Visa Rules &amp; Mandatory Documents
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#17231d]/65">
              Click any country to view live processing turnaround, consular rules, and mandatory documents.
            </p>
          </div>

          {/* Country Selection Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {countries.map((item, idx) => (
              <button
                key={item.country}
                type="button"
                onClick={() => setSelectedCountryIndex(idx)}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  selectedCountryIndex === idx
                    ? 'bg-[#168447] text-white shadow-md scale-105 ring-2 ring-[#075c35]'
                    : 'bg-[#fafbf9] text-[#17231d]/75 hover:bg-[#eef8f1] hover:text-[#168447] ring-1 ring-[#17231d]/10'
                }`}
              >
                <span className="text-base">{item.flag}</span>
                <span>{item.country}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Details Bento Box */}
          <div className="rounded-[2.5rem] bg-[#fafbf9] p-7 sm:p-11 shadow-card ring-1 ring-[#17231d]/8 grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
            {/* Left side: Country specs */}
            <div>
              <div className="flex items-center gap-3.5">
                <span className="text-4xl">{currentCountry.flag}</span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#17231d]">
                    {currentCountry.country} Visa
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#168447]">
                    {currentCountry.type} · {currentCountry.speed}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base text-[#17231d]/70 leading-relaxed font-sans">
                {currentCountry.description}
              </p>

              {/* Quick Metrics */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                <div className="rounded-2xl bg-white p-4 ring-1 ring-[#17231d]/5 shadow-sm">
                  <span className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase text-[#17231d]/55">
                    <Clock className="w-3.5 h-3.5 text-[#168447]" />
                    Processing
                  </span>
                  <p className="mt-1 text-sm font-bold text-[#17231d]">{currentCountry.time}</p>
                </div>

                <div className="rounded-2xl bg-white p-4 ring-1 ring-[#17231d]/5 shadow-sm">
                  <span className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase text-[#17231d]/55">
                    <Calendar className="w-3.5 h-3.5 text-[#e66a2c]" />
                    Stay Validity
                  </span>
                  <p className="mt-1 text-sm font-bold text-[#17231d] truncate">{currentCountry.duration}</p>
                </div>

                <div className="rounded-2xl bg-white p-4 ring-1 ring-[#17231d]/5 shadow-sm col-span-2 sm:col-span-1">
                  <span className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase text-[#17231d]/55">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    Starting Fare
                  </span>
                  <p className="mt-1 text-sm font-bold text-[#168447]">{currentCountry.price} <span className="text-[0.65rem] text-[#17231d]/50 font-normal">approx</span></p>
                </div>
              </div>

              {/* Action Button: Auto-fill Form */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectCountry(currentCountry)}
                  className="btn btn-primary !py-3 !px-6 text-sm font-bold shadow-lg shadow-[#e66a2c]/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Apply for {currentCountry.country.replace(/\s*\(.*\)/, '')} Visa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello Travel Care 4 All, I want information about ${currentCountry.country} visa.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline text-xs !py-3 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 mr-1 text-[#168447]" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

            {/* Right side: Interactive Checklist */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card ring-1 ring-[#17231d]/8">
              <h4 className="text-base font-bold font-display text-[#17231d] flex items-center gap-2 pb-3.5 border-b border-[#17231d]/10">
                <FileCheck className="w-5 h-5 text-[#168447]" />
                <span>Mandatory Documents Required</span>
              </h4>

              <ul className="mt-4 space-y-3">
                {currentCountry.checklist.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#17231d]/75">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#eef8f1] text-[#168447] mt-0.5">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="leading-snug">{doc}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-[#17231d]/5 flex items-center gap-2 text-xs text-[#17231d]/60 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#168447] shrink-0" />
                <span>Our consultants verify each document before official consular submission.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 4-Stage Roadmap (How It Works) */}
      <section className="py-16 sm:py-24 bg-[#eef8f1] border-b border-[#17231d]/8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow justify-center mb-2">
              <span className="h-px w-6 bg-[#e66a2c]" />
              HOW IT WORKS
              <span className="h-px w-6 bg-[#e66a2c]" />
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#17231d]">
              Step-by-Step Visa Processing
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#17231d]/65">
              Clear, transparent, and error-free submissions handled by our Vijayawada specialists.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {steps.map((st, i) => (
              <div
                key={st.num}
                onClick={() => setActiveStep(i)}
                className={`rounded-3xl p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  activeStep === i
                    ? 'bg-white shadow-lift ring-2 ring-[#168447] -translate-y-1'
                    : 'bg-white/90 hover:bg-white shadow-card ring-1 ring-[#17231d]/5 hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-extrabold font-display text-[#168447]/25">
                      {st.num}
                    </span>
                    {activeStep === i && (
                      <span className="h-2.5 w-2.5 rounded-full bg-[#168447]" />
                    )}
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#17231d]">
                    {st.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-[#17231d]/70 leading-relaxed font-sans">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#17231d]/5 text-xs text-[#075c35] font-semibold leading-relaxed">
                  {st.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Verified Visa Reviews Carousel */}
      <section id="reviews" className="py-20 sm:py-28 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="eyebrow mb-3 justify-center">
                <span className="h-px w-6 bg-[#e66a2c]" />
                TRAVELLER REVIEWS
                <span className="h-px w-6 bg-[#e66a2c]" />
              </p>
              <h2 className="text-3xl font-bold sm:text-4xl font-display text-[#17231d]">
                What Our Travellers Say
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#17231d]/65">
                Authentic experiences from families, honeymooners, and business travelers assisted by our desk.
              </p>
            </div>

            {/* Testimonial Card */}
            <div className="relative rounded-[2.5rem] bg-[#f7f9f7] p-8 text-center ring-1 ring-[#17231d]/8 sm:p-12 shadow-card">
              <Quote className="mx-auto h-10 w-10 text-[#e66a2c]/30 mb-4" />

              <span className="mb-4 inline-block rounded-full bg-[#168447]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#075c35]">
                {currentTestimonial.badge}
              </span>

              <blockquote className="font-display text-xl leading-relaxed text-[#17231d] sm:text-2xl max-w-2xl mx-auto font-medium">
                “{currentTestimonial.quote}”
              </blockquote>

              <figcaption className="mt-6">
                <span className="flex justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < currentTestimonial.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-[#17231d]/15'
                      }`}
                    />
                  ))}
                </span>
                <span className="block font-bold text-base text-[#17231d]">
                  {currentTestimonial.name}
                </span>
                <span className="text-xs sm:text-sm text-[#17231d]/60">
                  {currentTestimonial.trip}
                </span>
              </figcaption>

              {/* Slider Controls */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  className="rounded-full bg-white p-2.5 shadow-sm hover:bg-[#eef8f1] transition border border-[#17231d]/10 text-[#17231d] cursor-pointer"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTestimonialIndex(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        idx === testimonialIndex
                          ? 'w-8 bg-[#168447]'
                          : 'w-2.5 bg-[#17231d]/20'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  className="rounded-full bg-white p-2.5 shadow-sm hover:bg-[#eef8f1] transition border border-[#17231d]/10 text-[#17231d] cursor-pointer"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Dynamic Visa FAQs Accordion */}
      <section className="py-16 sm:py-24 bg-[#fafbf9] border-t border-[#17231d]/8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="eyebrow justify-center mb-2">
                <span className="h-px w-6 bg-[#e66a2c]" />
                VISA DESK QUESTIONS
                <span className="h-px w-6 bg-[#e66a2c]" />
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#17231d]">
                Frequently Asked Visa Questions
              </h2>
              <p className="mt-2 text-sm text-[#17231d]/65">
                Straightforward answers from our Vijayawada documentation specialists.
              </p>
            </div>

            <div className="divide-y divide-[#17231d]/10 rounded-3xl bg-white px-6 shadow-card ring-1 ring-[#17231d]/8 sm:px-9">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="py-2">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-[#17231d] sm:text-lg font-sans cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 font-bold ${
                            isOpen
                              ? 'rotate-45 bg-[#e66a2c] text-white'
                              : 'bg-[#eef8f1] text-[#168447]'
                          }`}
                        >
                          +
                        </span>
                      </button>
                    </h3>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm sm:text-base text-[#17231d]/75 leading-relaxed font-sans">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
