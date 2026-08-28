import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Official Disclaimer & Open Government Licence Notice | HygieneCheck.uk',
  description: 'Public health and legal disclaimer for HygieneCheck.uk. Explains Open Government Licence v3.0 compliance, FSA data attribution, and point-in-time inspection records.',
  alternates: {
    canonical: 'https://hygienecheck.uk/disclaimer',
  },
  openGraph: {
    title: 'Official Disclaimer & OGL v3.0 Notice',
    description: 'Public data attribution and food hygiene inspection notice for HygieneCheck.uk.',
    url: 'https://hygienecheck.uk/disclaimer',
    siteName: 'HygieneCheck.uk',
    type: 'website',
  },
};

export default function DisclaimerPage() {
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
        name: 'Official Disclaimer',
        item: 'https://hygienecheck.uk/disclaimer',
      },
    ],
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-300">
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-mono">
        <Link href="/" className="hover:text-emerald-400 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <span className="text-emerald-400 font-semibold">Disclaimer</span>
      </nav>

      <div className="p-8 sm:p-10 rounded-3xl bg-[#0F172A]/90 border border-gray-800 shadow-2xl mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
          <AlertTriangle className="w-4 h-4" />
          <span>Legal & Public Health Notice</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Official Disclaimer & Data Attribution
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          Please read this public health and legal disclaimer carefully before relying on the information published on HygieneCheck.uk.
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed">
        <section className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
          <h2 className="text-base font-bold text-white">1. Open Government Licence (OGL v3.0)</h2>
          <p>
            All food hygiene ratings, sub-scores, inspection dates, and business details published on HygieneCheck.uk contain public sector information licensed under the <strong>Open Government Licence v3.0</strong>. The underlying data is collected and maintained by 363 UK Local Authorities and the <strong>Food Standards Agency (FSA)</strong>.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
          <h2 className="text-base font-bold text-white">2. Point-in-Time Inspection Records</h2>
          <p>
            A Food Hygiene Rating reflects the standards of food hygiene found by local council Environmental Health Officers on the specific date of inspection. Standards may have improved, deteriorated, or the establishment may have changed management since that date.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
          <h2 className="text-base font-bold text-white">3. Not Medical or Allergy Advice</h2>
          <p>
            The content on this website is for general consumer information purposes only. It is not intended as health, medical, or dietary advice. If you suffer from severe food allergies or medical conditions, always speak directly with restaurant management before ordering.
          </p>
        </section>
      </div>
    </div>
  );
}
