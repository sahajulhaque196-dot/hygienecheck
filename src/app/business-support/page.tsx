import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AccordionFaq, FaqItem } from '@/components/ui/AccordionFaq';
import { BadgePreviewGenerator } from '@/components/ui/BadgePreviewGenerator';
import { 
  ShieldCheck, RefreshCw, MessageSquare, Scale, Award, ArrowLeft, 
  CheckCircle2, ArrowRight, ClipboardCheck
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Food Business Support | Re-inspection Guide, Right to Reply & 5-Star Badges',
  description: 'Official guide for UK food business owners. How to request a council re-inspection, submit a statutory Right to Reply, appeal an unfair rating, and showcase verified 5-star badges.',
  keywords: [
    'food hygiene right to reply form',
    'how to request food hygiene reinspection',
    'appeal food hygiene rating',
    'food hygiene sticker window purchase',
    'how to get 5 star food hygiene rating',
  ],
  alternates: {
    canonical: 'https://hygienecheck.uk/business-support',
  },
  openGraph: {
    title: 'Food Business Support | UK Re-inspection & 5-Star Badges',
    description: 'Official guide for UK food businesses on council re-inspections, Right to Reply, and verified 5-star badges.',
    url: 'https://hygienecheck.uk/business-support',
    siteName: 'HygieneCheck.uk',
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Food Business Support & Re-inspections',
    description: 'How to get a 5-star food hygiene rating, request council re-visits, and display verified stickers.',
  },
};

export default function BusinessSupportPage() {
  const businessFaqs: FaqItem[] = [
    {
      q: 'How much does a food hygiene re-inspection cost in the UK?',
      a: 'Local councils charge a statutory cost-recovery fee for re-inspections, typically ranging between £150 and £300 depending on the local authority.',
    },
    {
      q: 'How long does a council take to re-inspect my food business?',
      a: 'Once your re-inspection application and fee are processed, an Environmental Health Officer must carry out an unannounced inspection visit within 3 months.',
    },
    {
      q: 'What is the statutory Right to Reply?',
      a: 'Right to Reply is a 100% free legal right under UK law that allows food business operators to submit an official statement explaining improvements made or temporary breakdown reasons. This statement is published directly on the FSA online register.',
    },
    {
      q: 'How do I appeal an unfair food hygiene score?',
      a: 'You have 21 calendar days from receiving your official inspection letter to file a formal appeal with your local council. The appeal will be independently reviewed by the Lead Food Officer, and your new score will be withheld from publication while the appeal is active.',
    },
  ];

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Request a Food Hygiene Re-Inspection from Your UK Local Council',
    description: 'Step-by-step guide for UK food business operators to apply for a council food hygiene re-inspection to improve their score to 5 stars.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Complete Required Repairs and Deep Cleaning',
        text: 'Fix all structural defects, clean extraction filters, and update your SFBB diary before applying.',
      },
      {
        '@type': 'HowToStep',
        name: 'Submit Re-Inspection Form and Pay Council Fee',
        text: 'Download the standard FSA re-inspection form from your council website and pay the statutory fee (typically £150 to £300).',
      },
      {
        '@type': 'HowToStep',
        name: 'Receive Unannounced Council Inspection Visit',
        text: 'An Environmental Health Officer will visit your food premises unannounced within 3 months to evaluate standards and issue a new rating.',
      },
    ],
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
        name: 'Business Support',
        item: 'https://hygienecheck.uk/business-support',
      },
    ],
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-300">
      
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
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
        <span className="text-emerald-400 font-semibold">Business Support</span>
      </nav>

      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0F172A] via-gray-900 to-[#0B0F17] border border-gray-800 shadow-2xl mb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>UK Food Business Owner Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Food Hygiene Support for Restaurant & Takeaway Owners
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            Running a food business in the UK comes with strict hygiene rules. If your venue was recently inspected, here is your complete guide on how to request a re-inspection, submit a free Right to Reply, or appeal an unfair score.
          </p>
        </div>
      </div>

      {/* EXECUTIVE BUSINESS SUPPORT SUMMARY AT A GLANCE */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#0F172A] via-gray-900 to-[#0F172A] border border-emerald-500/30 mb-8 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
          <ClipboardCheck className="w-4 h-4" /> Business Owner Rights & Re-Inspection Key Facts
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Re-Inspection Fee</div>
            <div className="text-emerald-400 font-bold text-sm mt-0.5 font-mono">£150 to £300</div>
            <div className="text-gray-400 text-[10px] mt-0.5">Council statutory cost</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Re-Visit Timeline</div>
            <div className="text-white font-bold text-sm mt-0.5">Within 3 Months</div>
            <div className="text-gray-400 text-[10px] mt-0.5">Unannounced officer visit</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Statutory Right to Reply</div>
            <div className="text-teal-400 font-bold text-sm mt-0.5">100% Free</div>
            <div className="text-gray-400 text-[10px] mt-0.5">Published on FSA register</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Formal Appeal Window</div>
            <div className="text-amber-400 font-bold text-sm mt-0.5">21 Calendar Days</div>
            <div className="text-gray-400 text-[10px] mt-0.5">From date of letter</div>
          </div>
        </div>
        <p className="text-xs text-gray-300 mt-4 leading-relaxed border-t border-gray-800/80 pt-3">
          <strong>Owner Summary:</strong> A low inspection score does not have to be permanent. Once you resolve all structural, cleaning, or paperwork deficiencies, you can apply for an official paid re-inspection and achieve a 5-star rating.
        </p>
      </div>

      {/* Interactive Live 5-Star Website Badge Previewer */}
      <BadgePreviewGenerator />

      {/* 4 Core Action Pillars for Business Owners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Pillar 1: Re-inspection Request */}
        <div className="p-7 rounded-3xl bg-gray-900/70 border border-emerald-500/30 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">1. Request a Paid Re-Inspection</h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              If you received a lower score (0, 1, 2, or 3) and have fixed all the issues highlighted by the officer, you have the legal right to apply for a re-inspection from your local council.
            </p>
            <ul className="text-xs text-gray-400 space-y-1.5 pt-1">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Council fee is typically £150 to £300.</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Officer will re-visit within 3 months unannounced.</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Your new rating can go all the way up to 5.</li>
            </ul>
          </div>
          <div className="pt-3 border-t border-gray-800">
            <span className="text-[11px] text-gray-400">Contact your local council EHO department to request the form.</span>
          </div>
        </div>

        {/* Pillar 2: Right to Reply */}
        <div className="p-7 rounded-3xl bg-gray-900/70 border border-teal-500/30 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">2. Submit a Free &quot;Right to Reply&quot;</h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              You can publish an official statement alongside your rating on the FSA register. This allows you to explain to the public what actions you took to resolve the problem.
            </p>
            <ul className="text-xs text-gray-400 space-y-1.5 pt-1">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> 100% Free statutory right under UK law.</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Great for explaining temporary boiler or equipment breakdowns.</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Shows customers that you care about food safety.</li>
            </ul>
          </div>
          <div className="pt-3 border-t border-gray-800">
            <span className="text-[11px] text-gray-400">Submit your statement in writing to your local council.</span>
          </div>
        </div>

        {/* Pillar 3: Statutory 21-Day Appeal */}
        <div className="p-7 rounded-3xl bg-gray-900/70 border border-amber-500/30 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">3. Appeal an Unfair Rating</h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              If you believe the environmental health officer made an error or judged your business unfairly, you can file a formal appeal within 21 days of receiving your rating letter.
            </p>
            <ul className="text-xs text-gray-400 space-y-1.5 pt-1">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Must be filed within 21 calendar days.</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Reviewed by the Lead Food Officer of your council.</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Rating is withheld from publishing during the appeal.</li>
            </ul>
          </div>
          <div className="pt-3 border-t border-gray-800">
            <span className="text-[11px] text-gray-400">Download the standard FSA Appeal Form from your council website.</span>
          </div>
        </div>

        {/* Pillar 4: Verified 5-Star Badges & Stickers */}
        <div className="p-7 rounded-3xl bg-gray-900/70 border border-cyan-500/30 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">4. Showcase Your 5-Star Rating</h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              Diners trust businesses with verified clean ratings. Embed a live SVG rating badge on your website and order official waterproof QR stickers for your shop window.
            </p>
            <ul className="text-xs text-gray-400 space-y-1.5 pt-1">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Real-time live SVG badge widget for your website.</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Direct QR code linking to your official FSA inspection report.</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Builds trust on Deliveroo, Just Eat & Uber Eats.</li>
            </ul>
          </div>
          <div className="pt-3 border-t border-gray-800">
            <Link href="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:underline min-h-[32px] pt-1">
              <span>Claim Verified Badge (£9.99/mo)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* Step-by-Step Practical Checklist to Get 5 Stars */}
      <section className="p-8 sm:p-10 rounded-3xl bg-[#0F172A]/80 border border-gray-800 space-y-6 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Practical Checklist to Get a 5-Star Rating
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          Environmental health officers check 3 specific areas. Follow this simple checklist to make sure your kitchen is ready for an unannounced inspection at any time:
        </p>

        <div className="space-y-4 text-xs text-gray-300">
          <div className="p-4 rounded-2xl bg-gray-950/60 border border-gray-800/80 space-y-2">
            <h3 className="font-bold text-emerald-400 flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4" /> Area 1: Food Handling & Temperature Control
            </h3>
            <p className="text-gray-400">
              Keep raw meat completely separate from ready-to-eat salads. Keep fridges below 5°C and record temperatures twice daily. Cook chicken and minced meat until core temperature reaches 75°C for 30 seconds.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-950/60 border border-gray-800/80 space-y-2">
            <h3 className="font-bold text-teal-400 flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4" /> Area 2: Kitchen Cleanliness & Pest Control
            </h3>
            <p className="text-gray-400">
              Ensure all hand-washing basins have hot running water, antibacterial hand soap, and paper towels. Clean kitchen extractors and grease filters regularly. Seal any gaps under back doors to stop mice and insects.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-950/60 border border-gray-800/80 space-y-2">
            <h3 className="font-bold text-cyan-400 flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4" /> Area 3: Management Paperwork & Training
            </h3>
            <p className="text-gray-400">
              Keep your &quot;Safer Food, Better Business&quot; (SFBB) diary up-to-date and signed every morning and evening. Maintain an allergen matrix sheet listing all 14 allergens for every dish on your menu.
            </p>
          </div>
        </div>
      </section>

      {/* Animated Accordion FAQ Section */}
      <div className="border-t border-gray-800/60 pt-4">
        <AccordionFaq
          title="Food Business Owner FAQs"
          subtitle="Answers to common questions about council re-inspections, statutory rights, and 5-star certificates."
          badge="Owner Guide FAQ"
          items={businessFaqs}
        />
      </div>

    </div>
  );
}
