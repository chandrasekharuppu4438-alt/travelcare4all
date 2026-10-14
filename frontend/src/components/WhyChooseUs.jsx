import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  LayoutGrid, 
  Globe2,
  Check
} from 'lucide-react';
import travelData from '../data/travelData';
import { getAssetImageUrl } from '../utils/imageHelper';

export default function WhyChooseUs({ onOpenCustomTrip }) {
  const { siteConfig, whyChooseUs } = travelData;

  const iconMap = {
    ShieldCheck: <ShieldCheck className="h-5 w-5" />,
    Sparkles: <Sparkles className="h-5 w-5" />,
    Zap: <Zap className="h-5 w-5" />,
    LayoutGrid: <LayoutGrid className="h-5 w-5" />,
    Globe: <Globe2 className="h-5 w-5" />
  };

  return (
    <>
      {/* About Section */}
      <section id="about" className="scroll-mt-24 overflow-hidden bg-[#f7f9f7] py-20 sm:py-28">
        <div className="container mx-auto grid items-center gap-14 lg:grid-cols-2">
          {/* Left: Kerala image + Floating Vijayawada card */}
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem]">
              <img
                src="/images/kerala.png"
                alt="Houseboat on the Kerala backwaters"
                loading="lazy"
                className="aspect-[4/5] w-full scale-110 object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
              />
            </div>
            <div className="absolute -bottom-6 right-4 max-w-[15rem] rounded-2xl bg-white p-5 shadow-lift sm:-right-6">
              <p className="font-display text-lg font-semibold text-[#075c35]">
                Based in Vijayawada
              </p>
              <p className="mt-1 text-sm text-[#17231d]/60">
                Meet {siteConfig.contactPerson} and the team at Ramavarappadu Ring.
              </p>
            </div>
          </div>

          {/* Right: Text and why travellers choose us */}
          <div>
            <p className="eyebrow mb-3">
              <span className="h-px w-6 bg-[#e66a2c]" />
              About Travel Care 4 All
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl lg:text-[2.85rem] lg:leading-[1.1] font-display text-[#17231d]">
              Why travellers choose us
            </h2>
            <p className="mt-4 text-lg text-[#17231d]/65">
              Travel Care 4 All is a Vijayawada-based travel service provider offering domestic and international travel solutions — personalized travel assistance, fast visa support, holidays, honeymoons, pilgrim tours, ticketing, passport assistance and group tours.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {whyChooseUs.map((item, idx) => (
                <li
                  key={item.title}
                  className={`flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-[#17231d]/5 ${
                    idx === 4 ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e66a2c]/10 text-[#e66a2c]">
                    {iconMap[item.icon] || <ShieldCheck className="h-5 w-5" />}
                  </span>
                  <div>
                    <span className="block font-bold text-[#17231d]">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-[#17231d]/60">
                      {item.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Honeymoon Spotlight Section from original Netlify site */}
      <section className="relative isolate overflow-hidden bg-[#17231d] py-20 text-white sm:py-28">
        <img
          src="/images/maldives.png"
          alt="Maldives overwater villas"
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#17231d] via-[#17231d]/80 to-[#17231d]/30" />

        <div className="container mx-auto grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-3 !text-amber-300">
              <span className="h-px w-6 bg-amber-300" />
              For the two of you
            </p>
            <h2 className="text-4xl font-semibold leading-tight sm:text-5xl font-display">
              Honeymoon Packages, <span className="italic text-amber-300">crafted slowly.</span>
            </h2>
            <p className="mt-5 max-w-lg text-white/75">
              Private pool villas, sandbank dinners and sunrise moments — arranged with the resort before you land. From ₹89,999 per person (sample).
            </p>

            <ul className="mt-6 space-y-2 text-sm text-white/85">
              {[
                "Room upgrades & honeymoon décor where available",
                "Candle-light dinners and couple spa",
                "Visa, flights and insurance in one booking"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-amber-300" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hello%20Travel%20Care%204%20All%2C%0AWe%20are%20planning%20our%20honeymoon.%20Please%20suggest%20packages.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Plan Your Honeymoon
              </a>
              <a href="#tours" className="btn btn-ghost">
                See honeymoon tours
              </a>
            </div>
          </div>

          {/* Quick Honeymoon destinations grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { name: "Maldives", img: "maldives" },
              { name: "Bali", img: "bali" },
              { name: "Dubai", img: "dubai" },
              { name: "Kerala", img: "kerala" },
              { name: "Kashmir", img: "kashmir" }
            ].map((item, idx) => (
              <a
                key={item.name}
                href="#tours"
                className={`group relative block h-full min-h-[140px] overflow-hidden rounded-2xl ring-1 ring-white/10 ${
                  idx === 0 ? "col-span-2 row-span-2 sm:col-span-2" : ""
                }`}
              >
                <img
                  src={getAssetImageUrl(item.img)}
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = '/images/hero.png'; }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#17231d]/80 to-transparent" />
                <span className={`absolute bottom-3 left-4 font-display font-semibold ${
                  idx === 0 ? "text-3xl text-white" : "text-lg text-white"
                }`}>
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
