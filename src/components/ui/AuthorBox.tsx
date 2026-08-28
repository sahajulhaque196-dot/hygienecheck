import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, MapPin, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AuthorBox = () => {
  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://hygienecheck.uk/#author-sahajul',
    name: 'Sahajul',
    jobTitle: 'Founder & Lead Architect',
    description: 'Creator of HygieneCheck.uk, dedicated to making UK Food Standards Agency inspection data accessible, fast, and transparent for UK consumers and restaurant owners.',
    image: 'https://hygienecheck.uk/brand/author-sahajul.jpg',
    sameAs: ['https://x.com/saddamh58509953'],
    homeLocation: {
      '@type': 'Place',
      name: 'Assam, India',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'HygieneCheck.uk',
      url: 'https://hygienecheck.uk',
    },
  };

  return (
    <section className="pt-4 sm:pt-6 pb-8 sm:pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 border-t border-gray-800/40">
      {/* Schema.org Person Structured Data for E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      
      {/* ========================================================
          STRONG YMYL (PUBLIC HEALTH & OFFICIAL DATA) DISCLAIMER
          ======================================================== */}
      <div className="relative rounded-2xl bg-gradient-to-r from-amber-950/40 via-gray-900/90 to-amber-950/40 border border-amber-500/30 p-6 sm:p-7 backdrop-blur-xl shadow-xl">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-2 text-xs leading-relaxed">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-bold text-white tracking-tight">
                Important Public Health & Official Data Disclaimer (YMYL)
              </h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                HEALTH & SAFETY NOTICE
              </span>
            </div>
            
            <p className="text-gray-300">
              <strong>1. Official Public Record:</strong> All food hygiene ratings, sub-scores, and inspection dates published on HygieneCheck.uk are public records provided by the UK Food Standards Agency (FSA) and local council environmental health teams under the Open Government Licence v3.0.
            </p>
            
            <p className="text-gray-300">
              <strong>2. Point-in-Time Inspection:</strong> A food hygiene score reflects the cleanliness and safety standards found by council officers on the exact day of inspection. A food business may have improved its standards, addressed issues, or changed ownership since the inspection date shown.
            </p>
            
            <p className="text-gray-300">
              <strong>3. Health & Allergy Advice:</strong> This website is an informational consumer guide. If you have severe food allergies, celiac disease, or specific medical dietary needs, always speak directly with restaurant staff to confirm current food preparation and allergen safety practices.
            </p>

            <p className="text-gray-400 text-[11px] pt-0.5">
              HygieneCheck.uk is an independent platform and is not part of or run by the UK Government, FSA, or local councils. For official business re-inspections or appeals, see our{' '}
              <Link href="/business-support" className="text-emerald-400 underline hover:text-emerald-300">
                Business Support Guide
              </Link>.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================
          E-E-A-T AUTHOR BOX (FOUNDER & LEAD ARCHITECT)
          ======================================================== */}
      <div className="relative rounded-3xl bg-[#0F172A]/90 border border-gray-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
          
          {/* Author Profile Picture */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-tr from-emerald-400 to-cyan-500 shadow-xl shadow-emerald-950/40">
              <div className="w-full h-full rounded-[14px] overflow-hidden bg-gray-950">
                <Image
                  src="/brand/author-sahajul.jpg"
                  alt="Sahajul - Creator of HygieneCheck.uk"
                  width={160}
                  height={160}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-emerald-500 text-gray-950 shadow-md border-2 border-gray-950" title="Verified Creator">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          {/* Author Details in Simple, Natural Voice */}
          <div className="flex-1 text-center md:text-left space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Sahajul
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Founder & Builder
                  </span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-0.5 text-xs text-gray-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <MapPin className="w-3.5 h-3.5" /> Assam, India
                  </span>
                  <span>•</span>
                  <span>Web Creator & Open Data Enthusiast</span>
                </div>
              </div>

              {/* Follow on X Link */}
              <div>
                <a
                  href="https://x.com/saddamh58509953"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-950 hover:bg-gray-800 text-gray-200 hover:text-white border border-gray-700 text-xs font-semibold shadow-sm transition-all group min-h-[44px]"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-gray-300 group-hover:text-emerald-400 transition-colors">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>Connect on X</span>
                  <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Simple, Honest Story Bio */}
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Hello! I am Sahajul from Assam, India. I built <strong>HygieneCheck.uk</strong> to help people easily check if a restaurant or takeaway is clean before ordering food. In the UK, government health officers inspect every food business and give them ratings from 0 to 5. But the official files can be hard to read on a mobile phone. I created this simple website using free UK government open data so you can search any food place in seconds, see their kitchen cleanliness score, and check their past inspection history without any confusion.
            </p>

            {/* Trust Badges in Simple English */}
            <div className="pt-1.5 flex flex-wrap items-center justify-center md:justify-start gap-2 text-[11px] text-gray-400">
              <span className="px-2 py-1 rounded-lg bg-gray-950 border border-gray-800 text-gray-300 flex items-center gap-1.5 min-h-[32px]">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> 100% Free Public Tool
              </span>
              <span className="px-2 py-1 rounded-lg bg-gray-950 border border-gray-800 text-gray-300 flex items-center gap-1.5 min-h-[32px]">
                <CheckCircle2 className="w-3 h-3 text-cyan-400" /> Official UK Government Data
              </span>
              <span className="px-2 py-1 rounded-lg bg-gray-950 border border-gray-800 text-gray-300 flex items-center gap-1.5 min-h-[32px]">
                <CheckCircle2 className="w-3 h-3 text-teal-400" /> Updated Daily
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
