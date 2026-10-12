import React, { useState, useId } from 'react';
import { Plus } from 'lucide-react';
import travelData from '../data/travelData';

export default function FaqSection() {
  const { faqs } = travelData;
  const [openIndex, setOpenIndex] = useState(0);
  const idPrefix = useId();

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 sm:py-28 bg-white relative">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="eyebrow mb-3">
            <span className="h-px w-6 bg-[#e66a2c]" />
            FAQ
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl lg:text-[2.85rem] font-display text-[#17231d]">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-base text-[#17231d]/65">
            Everything you need to know about booking, visas and customization.
          </p>
        </div>

        {/* Divider container matching netlify site */}
        <div className="divide-y divide-[#17231d]/10 rounded-3xl bg-white px-5 shadow-card ring-1 ring-[#17231d]/5 sm:px-8">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-[#17231d] sm:text-lg font-sans"
                  >
                    <span>{item.q}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? 'rotate-45 bg-[#e66a2c] text-white'
                          : 'bg-[#eef8f1] text-[#168447]'
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-10 text-sm sm:text-base text-[#17231d]/70 leading-relaxed">
                      {item.a}
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
  );
}
