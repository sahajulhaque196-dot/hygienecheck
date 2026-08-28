import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | HygieneCheck.uk',
  description: 'Terms of Service and user agreement for HygieneCheck.uk. Details rules of use, B2B badge subscriptions, and limitation of liability.',
  alternates: {
    canonical: 'https://hygienecheck.uk/terms',
  },
  openGraph: {
    title: 'Terms of Service | HygieneCheck.uk',
    description: 'Terms of Service and user agreement for HygieneCheck.uk.',
    url: 'https://hygienecheck.uk/terms',
    siteName: 'HygieneCheck.uk',
    type: 'website',
  },
};

export default function TermsPage() {
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
        name: 'Terms of Service',
        item: 'https://hygienecheck.uk/terms',
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
        <span className="text-emerald-400 font-semibold">Terms of Service</span>
      </nav>

      <div className="p-8 sm:p-10 rounded-3xl bg-[#0F172A]/90 border border-gray-800 shadow-2xl mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Scale className="w-4 h-4" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          By accessing or using HygieneCheck.uk, you agree to be bound by these Terms of Service.
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed">
        <section className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
          <h2 className="text-base font-bold text-white">1. Permitted Use</h2>
          <p>
            You may use HygieneCheck.uk for personal, non-commercial food safety research, and for business owners to view their official public inspection records.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
          <h2 className="text-base font-bold text-white">2. Accuracy & Limitation of Liability</h2>
          <p>
            HygieneCheck.uk mirrors official public records provided by local councils and the Food Standards Agency. While we synchronize our database nightly, we do not guarantee real-time synchronization or the absolute accuracy of council records. In no event shall HygieneCheck.uk be liable for dining decisions, business losses, or damages arising from the use of this website.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 space-y-3">
          <h2 className="text-base font-bold text-white">3. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of England and Wales.
          </p>
        </section>
      </div>
    </div>
  );
}
