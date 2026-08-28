import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/ui/ContactForm';
import { Mail, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us & Request Fast Food Hygiene Data Correction',
  description: 'Submit food hygiene data corrections, report updated council ratings, request removal of closed businesses, or contact the HygieneCheck.uk team.',
  keywords: [
    'food hygiene data correction form',
    'update food rating on hygienecheck',
    'contact hygienecheck uk',
    'report closed restaurant food hygiene',
  ],
  alternates: {
    canonical: 'https://hygienecheck.uk/contact',
  },
  openGraph: {
    title: 'Contact HygieneCheck.uk & Fast Data Correction Portal',
    description: 'Submit data corrections, report re-inspections, or get in touch with our team.',
    url: 'https://hygienecheck.uk/contact',
    siteName: 'HygieneCheck.uk',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact HygieneCheck.uk Support',
    description: 'Report updated food hygiene ratings or submit general inquiries.',
  },
};

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact HygieneCheck.uk & Fast Data Correction Portal',
    description: 'Submit data corrections, report updated food hygiene ratings, or contact the HygieneCheck.uk support team.',
    url: 'https://hygienecheck.uk/contact',
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
        name: 'Contact & Corrections',
        item: 'https://hygienecheck.uk/contact',
      },
    ],
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-300">
      
      {/* Schema.org ContactPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
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
        <span className="text-emerald-400 font-semibold">Contact & Data Corrections</span>
      </nav>

      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0F172A] via-gray-900 to-[#0B0F17] border border-gray-800 shadow-2xl mb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Mail className="w-4 h-4" />
            <span>Fast Support & Data Verification</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Us & Request a Data Correction
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            Are you a restaurant or takeaway owner with a newly updated rating? Or do you have a question about HygieneCheck.uk? Fill out the quick form below and our team will verify your request.
          </p>
        </div>
      </div>

      {/* Interactive Contact Form Component */}
      <ContactForm />

    </div>
  );
}
