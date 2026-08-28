import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AccordionFaq, FaqItem } from '@/components/ui/AccordionFaq';
import { FoiGeneratorForm } from '@/components/ui/FoiGeneratorForm';
import { 
  FileText, ArrowLeft, ClipboardCheck 
} from 'lucide-react';

export const metadata: Metadata = {
  title: '1-Click Council FOI Report Generator (Free UK Hygiene Inspector Notes)',
  description: 'Generate a legally formatted Freedom of Information (FOI) request email to any UK council to obtain handwritten food hygiene inspection reports, temperature logs, and officer notes for free.',
  keywords: [
    'food hygiene foi request template',
    'how to get council food inspection report',
    'freedom of information food safety notes',
    'council restaurant inspection temperature logs',
    'fhrs foi generator uk',
  ],
  alternates: {
    canonical: 'https://hygienecheck.uk/foi',
  },
  openGraph: {
    title: '1-Click Council FOI Report Generator | HygieneCheck.uk',
    description: 'Request official inspector notes and fridge temperature logs from UK councils for free.',
    url: 'https://hygienecheck.uk/foi',
    siteName: 'HygieneCheck.uk',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Council Food Hygiene FOI Generator',
    description: 'Generate legal FOI emails for official restaurant inspection records in seconds.',
  },
};

export default function FoiGeneratorPage() {
  const foiFaqs: FaqItem[] = [
    {
      q: 'Is it free to submit a Freedom of Information request to a UK council?',
      a: 'Yes. Under the Freedom of Information Act 2000, local councils cannot charge a fee for standard digital inspection report requests sent via email.',
    },
    {
      q: 'How long does a council have to reply to my FOI request?',
      a: 'Under Section 10(1) of the Act, public authorities must respond promptly and no later than 20 working days following the date of receipt.',
    },
    {
      q: 'Can a council refuse to send the inspection report?',
      a: 'Councils can only refuse or redact information if there is an active criminal prosecution under way or to protect personal staff data. Completed routine food hygiene inspection reports are standard public records.',
    },
  ];

  const foiToolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'UK Food Hygiene FOI Report Generator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    description: 'Free tool to generate pre-formatted Freedom of Information requests to UK local councils for food hygiene inspection notes and temperature logs.',
    url: 'https://hygienecheck.uk/foi',
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
        name: 'FOI Generator',
        item: 'https://hygienecheck.uk/foi',
      },
    ],
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-300">
      
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(foiToolSchema) }}
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
        <span className="text-emerald-400 font-semibold">FOI Generator</span>
      </nav>

      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0F172A] via-gray-900 to-[#0B0F17] border border-gray-800 shadow-2xl mb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <FileText className="w-4 h-4" />
            <span>UK Freedom of Information Act 2000</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            1-Click Council FOI Report Generator
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            Want to see the actual officer notes, fridge temperature checks, or pest inspection details for any UK food place? Under UK law, councils must provide these reports for free upon request. Fill out the details below to generate a pre-formatted legal FOI request email in seconds.
          </p>
        </div>
      </div>

      {/* EXECUTIVE FOI SUMMARY AT A GLANCE */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#0F172A] via-gray-900 to-[#0F172A] border border-emerald-500/30 mb-8 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
          <ClipboardCheck className="w-4 h-4" /> FOI Legal Rights & Request Summary
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Governing Law</div>
            <div className="text-emerald-400 font-bold text-sm mt-0.5">FOI Act 2000</div>
            <div className="text-gray-400 text-[10px] mt-0.5">Section 1 Statutory Right</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Council Response SLA</div>
            <div className="text-white font-bold text-sm mt-0.5">20 Working Days</div>
            <div className="text-emerald-400 text-[10px] mt-0.5">Legally mandated deadline</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Public Request Cost</div>
            <div className="text-teal-400 font-bold text-sm mt-0.5">100% Free</div>
            <div className="text-gray-400 text-[10px] mt-0.5">No council fee allowed</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Records Covered</div>
            <div className="text-white font-bold text-sm mt-0.5">Handwritten Notes & Logs</div>
            <div className="text-gray-400 text-[10px] mt-0.5">Photos & temp checks</div>
          </div>
        </div>
        <p className="text-xs text-gray-300 mt-4 leading-relaxed border-t border-gray-800/80 pt-3">
          <strong>Citizen Right Takeaway:</strong> Local councils are legally obligated to provide public food inspection documentation upon request. Use this pre-formatted template to email your council environmental health FOI team directly.
        </p>
      </div>

      {/* Interactive Form Component */}
      <FoiGeneratorForm />

      {/* Animated Accordion FAQ Section */}
      <div className="border-t border-gray-800/60 pt-4">
        <AccordionFaq
          title="Freedom of Information FAQs"
          subtitle="Learn more about your legal rights under the UK Freedom of Information Act 2000."
          badge="FOI Rights FAQ"
          items={foiFaqs}
        />
      </div>

    </div>
  );
}
