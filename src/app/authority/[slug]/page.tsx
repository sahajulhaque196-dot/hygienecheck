import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AccordionFaq, FaqItem } from '@/components/ui/AccordionFaq';
import { getLocalAuthorityBySlug } from '@/lib/db/queries';
import { 
  MapPin, ShieldCheck, AlertTriangle, ArrowRight,
  Building2, Utensils, Pizza, Beer, Baby, Building, PhoneCall, Mail, ArrowLeft, Navigation, ClipboardCheck, Clock
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400; // ISR: 24 hours

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { authority, stats } = await getLocalAuthorityBySlug(slug);
  const councilName = authority?.name || slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: `Food Hygiene Ratings in ${councilName} (2026 Inspection Reports & 0-Star List)`,
    description: `Search official food hygiene inspection ratings for ${stats.total.toLocaleString()} restaurants, takeaways, and cafes in ${councilName}. Check 5-star clean places, failed 0-star watchlist, and council pass rates.`,
    alternates: {
      canonical: `https://hygienecheck.uk/authority/${slug}`,
    },
    openGraph: {
      title: `Food Hygiene Ratings in ${councilName}`,
      description: `Official inspection scores, pass rates (${stats.passRate}%), and clean dining guide for ${councilName}.`,
      url: `https://hygienecheck.uk/authority/${slug}`,
      siteName: 'HygieneCheck.uk',
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${councilName} Food Hygiene Inspection Scores`,
      description: `Check 5-star clean dining and failed inspections in ${councilName}.`,
    },
  };
}

export default async function AuthorityPage({ params }: PageProps) {
  const { slug } = await params;
  const { authority, stats, sampleVenues, zeroStarVenues } = await getLocalAuthorityBySlug(slug);
  const councilName = authority?.name || `${slug.charAt(0).toUpperCase() + slug.slice(1)} Council`;

  const totalVenuesCount = stats.total > 0 ? stats.total.toLocaleString() : (authority?.totalVenues?.toLocaleString() || '1,200+');
  const passRateText = `${stats.passRate}%`;
  const officerEmail = authority?.email || `foodsafety@${slug}.gov.uk`;
  const officerPhone = authority?.phone || '020 7641 6000';

  const councilFaqs: FaqItem[] = [
    {
      q: `How do food hygiene inspections work in ${councilName}?`,
      a: `Environmental Health Officers from ${councilName} carry out unannounced inspection visits to restaurants, takeaways, cafes, and care homes. They inspect food preparation methods, building cleanliness, temperature logs, and staff hygiene training.`,
    },
    {
      q: `What is the food hygiene pass rate in ${councilName}?`,
      a: `Across ${totalVenuesCount} active food premises in ${councilName}, ${passRateText} of businesses have achieved a clean 4 or 5 star rating (or Pass in Scotland).`,
    },
    {
      q: `How can I report a dirty restaurant or food problem in ${councilName}?`,
      a: `You can report suspected hygiene issues directly to the ${councilName} Environmental Health Department by contacting your local council office or via the official Food Standards Agency portal.`,
    },
    {
      q: `Where can I see the list of failed food places in ${councilName}?`,
      a: `You can view the full public health warning list of 0 and 1 star food establishments in this borough by visiting the ${councilName} 0-Star Watchlist below.`,
    },
  ];

  const authoritySchema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: `${councilName} Food Hygiene Inspection Service`,
    serviceType: 'Food Safety and Hygiene Inspections',
    provider: {
      '@type': 'GovernmentOrganization',
      name: councilName,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: councilName,
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
        name: 'Local Authorities',
        item: 'https://hygienecheck.uk/authority',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: councilName,
        item: `https://hygienecheck.uk/authority/${slug}`,
      },
    ],
  };

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authoritySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-mono">
        <Link href="/" className="hover:text-emerald-400 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <Link href="/authority" className="hover:text-emerald-400">
          Local Authorities
        </Link>
        <span>/</span>
        <span className="text-gray-200 font-semibold">{councilName}</span>
      </nav>

      {/* Header Banner & Stats Snapshot */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0F172A] via-gray-900 to-[#0B0F17] border border-gray-800 shadow-2xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Official Council Directory
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-gray-800 text-gray-300 border border-gray-700">
                UK Open Government Data
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Food Hygiene Ratings in {councilName}
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              Official food hygiene inspection ratings for all restaurants, takeaways, cafes, and care homes inspected by Environmental Health Officers in <strong>{councilName}</strong>. Synchronized with official Food Standards Agency records.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 text-center">
              <div className="text-2xl font-black text-white font-mono">{totalVenuesCount}</div>
              <div className="text-[11px] text-gray-400 mt-1">Tracked Venues</div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <div className="text-2xl font-black text-emerald-400 font-mono">{passRateText}</div>
              <div className="text-[11px] text-emerald-300/80 mt-1">Pass Rate (4-5★)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Watchlist Callout Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-gray-900/90 to-red-950/40 border border-red-500/30 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {councilName} 0-Star & Failed Restaurant Watchlist
            </h3>
            <p className="text-xs text-gray-300 mt-0.5">
              Browse food businesses that received a 0 or 1 star rating requiring urgent hygiene improvements.
            </p>
          </div>
        </div>
        <Link
          href={`/authority/${slug}/0-star`}
          className="px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white font-bold text-xs flex items-center gap-1.5 flex-shrink-0 transition-all shadow-lg shadow-red-950/40 min-h-[44px]"
        >
          <span>View 0-Star List</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Recently Inspected Venues Grid */}
      <div className="space-y-4 mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Utensils className="w-5 h-5 text-emerald-400" />
            Recently Inspected Places in {councilName}
          </h2>
          <span className="text-xs text-gray-400 font-mono">Live FSA Database</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleVenues.map((venue) => {
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
                  <span>View Inspection Report</span>
                  <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <AccordionFaq
        title={`Frequently Asked Questions for ${councilName}`}
        subtitle={`Everything you need to know about official food hygiene inspections in ${councilName}.`}
        badge="Council FAQs"
        items={councilFaqs}
      />
    </div>
  );
}
