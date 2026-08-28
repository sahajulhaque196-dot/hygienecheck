'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

interface AccordionFaqProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  items: FaqItem[];
  className?: string;
}

export const AccordionFaq: React.FC<AccordionFaqProps> = ({
  title = "Frequently Asked Questions",
  subtitle = "Find quick, straightforward answers to common questions.",
  badge = "Common Questions",
  items,
  className = "",
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleItem = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <section className={`pt-10 sm:pt-12 pb-4 sm:pb-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Schema.org FAQPage for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Section Header */}
      <div className="text-center mb-8">
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Plus / Minus Animated Accordion List */}
      <div className="space-y-3.5">
        {items.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? 'bg-[#0F172A] border-emerald-500/40 shadow-lg shadow-emerald-950/20' 
                  : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                className="w-full p-5 text-left flex items-center justify-between gap-4 group transition-colors"
              >
                <span className={`text-sm sm:text-base font-bold transition-colors ${
                  isOpen ? 'text-emerald-400' : 'text-white group-hover:text-emerald-300'
                }`}>
                  {item.q}
                </span>

                {/* Animated Plus / Minus Button */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isOpen 
                    ? 'bg-emerald-500 text-gray-950 rotate-180 shadow-md shadow-emerald-500/30' 
                    : 'bg-gray-800 text-gray-400 group-hover:bg-gray-700 group-hover:text-white'
                }`}>
                  {isOpen ? (
                    <Minus className="w-4 h-4 transition-transform duration-300" />
                  ) : (
                    <Plus className="w-4 h-4 transition-transform duration-300" />
                  )}
                </div>
              </button>

              {/* Smooth Animated Collapsible Content */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-gray-800/80 pt-3.5">
                    {item.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
