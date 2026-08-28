import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AccordionFaq, FaqItem } from '@/components/ui/AccordionFaq';
import { 
  Info, ArrowLeft 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us & How UK Food Hygiene Ratings Work (FHRS Scoring Science)',
  description: 'Learn how UK food hygiene ratings (0 to 5) are calculated by local council environmental health officers. Explore the 3 inspection pillars, scoring mathematics, and our mission.',
  keywords: [
    'how food hygiene ratings are calculated',
    'fhrs scoring system explained',
    'what do food hygiene scores mean',
    '3 pillars of food hygiene inspection',
    'food standards agency rating algorithm',
  ],
  alternates: {
    canonical: 'https://hygienecheck.uk/about',
  },
  openGraph: {
    title: 'How Food Hygiene Ratings Work | Scoring Science & About Us',
    description: 'Complete guide on how UK environmental health officers calculate 0-5 food hygiene scores.',
    url: 'https://hygienecheck.uk/about',
    siteName: 'HygieneCheck.uk',
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How UK Food Hygiene Ratings Work',
    description: 'Understand the scoring science and 3 pillars behind 0-5 food ratings.',
  },
};

export default function AboutPage() {
  const aboutFaqs: FaqItem[] = [
    {
      q: 'Does a 5-star rating mean the food tastes good?',
      a: 'No. Food hygiene ratings evaluate food safety, kitchen cleanliness, temperature controls, and pest prevention only. They do not rate culinary taste, customer service, or food presentation.',
    },
    {
      q: 'Are food inspections announced in advance?',
      a: 'No. Almost all council food hygiene inspections are unannounced. Environmental Health Officers turn up without warning during normal operating hours to see true daily conditions.',
    },
    {
      q: 'How does the Scotland Food Hygiene Information Scheme (FHIS) differ?',
      a: 'Scotland operates a two-tier system: "Pass" (meets legal food safety standards) or "Improvement Required" (failed to meet standards), instead of the 0 to 5 star rating scale used in England, Wales, and Northern Ireland.',
    },
  ];

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About HygieneCheck.uk & How Food Ratings Work',
    description: 'Official methodology guide explaining how UK food hygiene ratings are calculated across England, Wales, Northern Ireland, and Scotland.',
    publisher: {
      '@type': 'Organization',
      name: 'HygieneCheck.uk',
      url: 'https://hygienecheck.uk',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hygienecheck.uk',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About Us & Scoring Science',
        item: 'https://hygienecheck.uk/about',
      },
    ],
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-300">
      
      {/* Schema.org AboutPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-mono">
        <Link href="/" className="hover:text-emerald-400 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <span className="text-emerald-400 font-semibold">About Us & Scoring Science</span>
      </nav>

      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0F172A] via-gray-900 to-[#0B0F17] border border-gray-800 shadow-2xl mb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Info className="w-4 h-4" />
            <span>Educational Guide & Platform Mission</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How UK Food Hygiene Ratings Work
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            Every year, local council Environmental Health Officers carry out unannounced inspections of over 500,000 food businesses across the United Kingdom. Here is the exact scoring science behind how official 0 to 5 ratings are calculated.
          </p>
        </div>
      </div>

      {/* The 3 Core Pillars of FHRS Inspection */}
      <section className="mb-8">
        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            The Inspection Science
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            The 3 Pillars Rated During an Inspection
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Officers inspect 3 distinct areas. In this scoring system, a lower numeric score represents cleaner conditions (0 points is the best possible score).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-gray-900/70 border border-emerald-500/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-white">Hygienic Food Handling</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              How food is prepared, cooked, re-heated, cooled, and stored. Checks for cross-contamination between raw meat and ready-to-eat foods, and fridge temperatures below 5°C.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 pt-2 border-t border-gray-800">
              Scored: 0 (Best) to 25 (Worst)
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-gray-900/70 border border-teal-500/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-white">Cleanliness & Building Condition</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Cleanliness of floors, walls, and work surfaces. Verification of hand-washing facilities with hot water and soap, kitchen ventilation, and pest control protection.
            </p>
            <div className="text-[11px] font-mono text-teal-400 pt-2 border-t border-gray-800">
              Scored: 0 (Best) to 25 (Worst)
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-gray-900/70 border border-cyan-500/30 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-white">Management & Paperwork</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Systematic food safety paperwork (&quot;Safer Food, Better Business&quot; diary), daily fridge temperature logs, staff allergen training records, and confidence in management.
            </p>
            <div className="text-[11px] font-mono text-cyan-400 pt-2 border-t border-gray-800">
              Scored: 0 (Best) to 30 (Worst)
            </div>
          </div>

        </div>
      </section>

      {/* The 0 to 5 Rating Breakdown Scale */}
      <section className="p-8 sm:p-10 rounded-3xl bg-[#0F172A]/80 border border-gray-800 space-y-6 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          What Each Official Rating Means
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-500 text-gray-950 font-black text-sm flex items-center justify-center font-mono">5</span>
              <strong className="text-white text-sm">Very Good</strong>
            </div>
            <span className="text-gray-400">Highest standard of food hygiene compliance.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-teal-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-teal-500 text-gray-950 font-black text-sm flex items-center justify-center font-mono">4</span>
              <strong className="text-white text-sm">Good</strong>
            </div>
            <span className="text-gray-400">High standards with only minor recommendations.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-yellow-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-yellow-500 text-gray-950 font-black text-sm flex items-center justify-center font-mono">3</span>
              <strong className="text-white text-sm">Generally Satisfactory</strong>
            </div>
            <span className="text-gray-400">Meets minimum legal requirements.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500 text-gray-950 font-black text-sm flex items-center justify-center font-mono">2</span>
              <strong className="text-white text-sm">Improvement Necessary</strong>
            </div>
            <span className="text-gray-400">Failed in one area; improvements needed.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-orange-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-orange-500 text-gray-950 font-black text-sm flex items-center justify-center font-mono">1</span>
              <strong className="text-white text-sm">Major Improvement Necessary</strong>
            </div>
            <span className="text-gray-400">Serious food safety breaches found.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-red-500/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-black text-sm flex items-center justify-center font-mono">0</span>
              <strong className="text-white text-sm">Urgent Improvement Required</strong>
            </div>
            <span className="text-gray-400">Critical failures; legal enforcement notice issued.</span>
          </div>
        </div>
      </section>

      {/* Animated Accordion FAQ Section */}
      <div className="border-t border-gray-800/60 pt-4">
        <AccordionFaq
          title="Food Hygiene Scheme FAQs"
          subtitle="Everything you need to know about the FHRS scoring algorithms and rules."
          badge="Scoring FAQs"
          items={aboutFaqs}
        />
      </div>

    </div>
  );
}
