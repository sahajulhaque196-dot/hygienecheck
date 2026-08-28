import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AccordionFaq, FaqItem } from '@/components/ui/AccordionFaq';
import { getEstablishmentsByOutcode } from '@/lib/db/queries';
import { 
  Navigation, MapPin, ArrowRight, ArrowLeft, 
  HelpCircle, ClipboardCheck, Clock, ShieldCheck, Utensils
} from 'lucide-react';

interface PageProps {
  params: Promise<{ outcode: string }>;
}

export const revalidate = 86400; // ISR: 24 hours

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { outcode } = await params;
  const upperCode = outcode.toUpperCase();
  const { total } = await getEstablishmentsByOutcode(upperCode, 1);

  return {
    title: `${upperCode} Postcode Food Hygiene Ratings (2026 Local Takeaway & Restaurant Scores)`,
    description: `Official food hygiene inspection ratings for ${total > 0 ? total : ''} food places in ${upperCode} postcode area. Find top 5-star clean takeaways, restaurants, and cafes near ${upperCode}.`,
    alternates: {
      canonical: `https://hygienecheck.uk/postcode/${outcode.toLowerCase()}`,
    },
    openGraph: {
      title: `Food Hygiene Ratings in ${upperCode} Postcode`,
      description: `Check 5-star clean restaurants and takeaway hygiene ratings in ${upperCode}.`,
      url: `https://hygienecheck.uk/postcode/${outcode.toLowerCase()}`,
      siteName: 'HygieneCheck.uk',
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${upperCode} Local Food Hygiene Scores`,
      description: `Official food hygiene inspection reports for ${upperCode} food places.`,
    },
  };
}

export default async function PostcodePage({ params }: PageProps) {
  const { outcode } = await params;
  const upperCode = outcode.toUpperCase();
  const { venues, total, fives, zeros } = await getEstablishmentsByOutcode(upperCode, 36);

  const passRate = total > 0 ? Math.round((fives / total) * 100) : 90;

  const faqs: FaqItem[] = [
    {
      q: `How many food businesses are in the ${upperCode} postcode district?`,
      a: `There are currently ${total} registered food premises in the ${upperCode} postal district with official inspection records from the Food Standards Agency.`,
    },
    {
      q: `How often are takeaways in ${upperCode} inspected?`,
      a: `Inspections are carried out by environmental health officers based on risk categories—typically every 6 months for high-risk takeaways and up to 2 years for lower-risk retail premises.`,
    },
    {
      q: `Can I see 0 and 1 star failed places in ${upperCode}?`,
      a: `Yes, all inspection ratings (0 through 5) are public government records published on HygieneCheck.uk without charge.`,
    },
  ];

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
        name: `${upperCode} Postcode`,
        item: `https://hygienecheck.uk/postcode/${outcode.toLowerCase()}`,
      },
    ],
  };

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* JSON-LD Schema */}
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
        <span className="text-gray-200 font-semibold">{upperCode} Area</span>
      </nav>

      {/* Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0F172A] via-gray-900 to-[#0B0F17] border border-gray-800 shadow-2xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5" /> Postcode District Directory
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-gray-800 text-gray-300 border border-gray-700">
                FSA Official Records
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Food Hygiene Ratings in {upperCode}
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              Official food hygiene inspection ratings for restaurants, takeaways, cafes, and pubs in the <strong>{upperCode}</strong> postcode district.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 text-center">
              <div className="text-2xl font-black text-white font-mono">{total}</div>
              <div className="text-[11px] text-gray-400 mt-1">Inspected Places</div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <div className="text-2xl font-black text-emerald-400 font-mono">{passRate}%</div>
              <div className="text-[11px] text-emerald-300/80 mt-1">5-Star Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="space-y-4 mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Utensils className="w-5 h-5 text-emerald-400" />
            Food Establishments in {upperCode}
          </h2>
          <span className="text-xs text-gray-400 font-mono">Showing {venues.length} of {total}</span>
        </div>

        {venues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {venues.map((venue) => {
              const is5 = venue.ratingValue === '5';
              const isFailed = venue.ratingValue === '0' || venue.ratingValue === '1' || venue.ratingValue === 'Improvement Required';

              return (
                <Link
                  key={venue.id}
                  href={`/hygiene-rating/${venue.slug}`}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between group ${
                    isFailed
                      ? 'bg-red-950/20 border-red-500/30 hover:border-red-400'
                      : is5
                      ? 'bg-gray-900/80 border-emerald-500/30 hover:border-emerald-400 hover:bg-gray-850'
                      : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${
                          is5
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : isFailed
                            ? 'bg-red-500/20 text-red-300 border-red-500/30'
                            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {venue.schemeType === 'FHIS'
                          ? `FHIS: ${venue.ratingValue || 'Awaiting'}`
                          : `RATING ${venue.ratingValue || 'AWAITING'}`}
                      </span>
                      {venue.ratingDate && (
                        <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {venue.ratingDate}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {venue.businessName}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">
                        {[venue.addressLine1, venue.postcode].filter(Boolean).join(', ')}
                      </span>
                    </div>

                    {venue.businessTypeLabel && (
                      <div className="text-[11px] font-mono text-gray-400 mt-1">
                        {venue.businessTypeLabel}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-[11px] font-semibold text-emerald-400">
                    <span>View Official Inspection Report</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-gray-900/60 border border-gray-800 text-center">
            <p className="text-sm text-gray-400">No establishments found for outcode {upperCode}.</p>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <AccordionFaq
        title={`Questions About Food Hygiene in ${upperCode}`}
        subtitle="Common questions about food safety inspections in this area."
        badge="Postcode Guide"
        items={faqs}
      />
    </div>
  );
}
