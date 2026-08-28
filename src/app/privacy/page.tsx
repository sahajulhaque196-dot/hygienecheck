import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | UK GDPR & Data Protection Act 2018 | HygieneCheck.uk',
  description: 'Privacy policy for HygieneCheck.uk. Details our compliance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.',
  alternates: {
    canonical: 'https://hygienecheck.uk/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | HygieneCheck.uk',
    description: 'UK GDPR compliance and data privacy disclosures for HygieneCheck.uk.',
    url: 'https://hygienecheck.uk/privacy',
    siteName: 'HygieneCheck.uk',
    type: 'website',
  },
};

export default function PrivacyPage() {
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
        name: 'Privacy Policy',
        item: 'https://hygienecheck.uk/privacy',
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
        <span className="text-emerald-400 font-semibold">Privacy Policy</span>
      </nav>

      <div className="p-8 sm:p-10 rounded-3xl bg-[#0F172A]/90 border border-gray-800 shadow-2xl mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Lock className="w-4 h-4" />
          <span>UK GDPR Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          HygieneCheck.uk is committed to protecting your privacy in full compliance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed">
        <section className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
          <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
          <p>
            HygieneCheck.uk is a public lookup directory. We do not require account registration to view ratings. We only collect information you voluntarily provide via our contact or data correction forms (such as your name, email, and business reference).
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
          <h2 className="text-base font-bold text-white">2. Public Government Data</h2>
          <p>
            Business names, addresses, and inspection scores published on this site are public sector records released by the Food Standards Agency under the Open Government Licence v3.0. They do not constitute private personal data.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
          <h2 className="text-base font-bold text-white">3. Contacting the Data Controller</h2>
          <p>
            For any privacy inquiries, data subject access requests, or removal of personal contact details, email <strong className="text-emerald-400 font-mono">support@hygienecheck.uk</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
