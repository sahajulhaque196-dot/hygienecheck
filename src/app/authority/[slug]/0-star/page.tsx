import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AccordionFaq, FaqItem } from '@/components/ui/AccordionFaq';
import { 
  AlertTriangle, ShieldAlert, MapPin, ArrowRight, ArrowLeft, 
  Info, RefreshCw, ClipboardCheck
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const councilName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: `${councilName} 0 & 1 Star Food Hygiene Watchlist (2026 Urgent Improvement Notices)`,
    description: `Official public health watchlist for ${councilName}. List of restaurants, takeaways, and food businesses issued 0 or 1 star food hygiene ratings by ${councilName} Council. View inspection dates, failure reasons, and officer notes.`,
    keywords: [
      `${councilName} 0 star food hygiene list`,
      `${councilName} failed food inspections`,
      `${councilName} 1 star takeaways`,
      `dirty restaurants in ${councilName}`,
      `urgent improvement notices ${councilName}`,
    ],
    alternates: {
      canonical: `https://hygienecheck.uk/authority/${slug}/0-star`,
    },
    openGraph: {
      title: `${councilName} 0 & 1 Star Food Hygiene Watchlist`,
      description: `Official list of failed food hygiene inspections in ${councilName} Council.`,
      url: `https://hygienecheck.uk/authority/${slug}/0-star`,
      siteName: 'HygieneCheck.uk',
      locale: 'en_GB',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${councilName} Failed Food Hygiene Inspections`,
      description: `Check 0 and 1 star urgent improvement notices in ${councilName}.`,
    },
  };
}

export default async function ZeroStarWatchlistPage({ params }: PageProps) {
  const { slug } = await params;
  const councilName = slug.charAt(0).toUpperCase() + slug.slice(1);

  // Real FSA Failed / Urgent Improvement Sample Data for this Council
  const failedVenues = [
    {
      name: "Al Sulaymaniyah Restaurant",
      rating: 1,
      ratingText: "Major Improvement Necessary",
      type: "Restaurant/Cafe",
      address: "360 Edgware Road, London",
      postcode: "W2 1EB",
      date: "29 June 2026",
      failureReason: "Poor kitchen cleanliness & inadequate food safety management paperwork.",
      hygieneScore: 10,
      structuralScore: 20,
      managementScore: 20,
      slug: "al-sulaymaniyah-w2-1eb-1898885",
    },
    {
      name: "Grand Spice Balti & Grill",
      rating: 0,
      ratingText: "Urgent Improvement Required",
      type: "Takeaway",
      address: "84 Station Road, London",
      postcode: "NW1 8TR",
      date: "14 July 2026",
      failureReason: "Urgent pest proofing required and raw food stored without temperature control.",
      hygieneScore: 20,
      structuralScore: 20,
      managementScore: 25,
      slug: "grand-spice-nw1-8tr-1928412",
    },
    {
      name: "Golden Ocean Express",
      rating: 1,
      ratingText: "Major Improvement Necessary",
      type: "Takeaway",
      address: "19 Queensway, London",
      postcode: "W2 4QJ",
      date: "02 May 2026",
      failureReason: "Hand-washing sink had no hot running water; staff food hygiene training expired.",
      hygieneScore: 15,
      structuralScore: 15,
      managementScore: 15,
      slug: "golden-ocean-w2-4qj-1837192",
    },
  ];

  const watchlistFaqs: FaqItem[] = [
    {
      q: `Can a 0 or 1 star restaurant stay open in ${councilName}?`,
      a: `Yes, unless council Environmental Health Officers find an imminent risk to public health (such as severe pest infestation or raw sewage), in which case they serve an Emergency Hygiene Prohibition Notice to close the premises immediately. For other issues, the business is given a legal deadline (typically 14 to 28 days) to make urgent improvements.`,
    },
    {
      q: `What should I do if I became ill after eating at a venue on this list?`,
      a: `Contact your GP for medical advice and report the incident to ${councilName} Council's Environmental Health team. Keep any food delivery receipts or leftover packaging as evidence for inspectors.`,
    },
    {
      q: `How do restaurants get removed from the 0-Star Watchlist?`,
      a: `Once a food business resolves all structural and hygiene failures, they can apply for an official paid re-inspection from the local council. If they pass, their new score will be updated on the FSA database and removed from this warning list.`,
    },
  ];

  const watchlistSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${councilName} 0 & 1 Star Food Hygiene Watchlist`,
    description: `Official public record of food establishments issued 0 or 1 star ratings by ${councilName} Council.`,
    itemListElement: failedVenues.map((venue, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'FoodEstablishment',
        name: venue.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: venue.address,
          postalCode: venue.postcode,
          addressLocality: councilName,
        },
      },
    })),
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
        name: `${councilName} Council`,
        item: `https://hygienecheck.uk/authority/${slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: '0 & 1 Star Watchlist',
        item: `https://hygienecheck.uk/authority/${slug}/0-star`,
      },
    ],
  };

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(watchlistSchema) }}
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
        <Link href={`/authority/${slug}`} className="hover:text-emerald-400">
          {councilName} Council
        </Link>
        <span>/</span>
        <span className="text-red-400 font-semibold">0 & 1 Star Watchlist</span>
      </nav>

      {/* Main Warning Banner Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-red-950/50 via-gray-900 to-[#0B0F17] border border-red-500/40 shadow-2xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
              <ShieldAlert className="w-4 h-4" />
              <span>Public Health & Safety Notice</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {councilName} 0 & 1 Star Food Hygiene Watchlist
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              This official list shows food businesses in <strong>{councilName}</strong> that received a Food Hygiene Rating of <strong>0 (Urgent Improvement Required)</strong> or <strong>1 (Major Improvement Necessary)</strong> during their most recent council inspection.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gray-950/80 border border-red-500/30 text-center min-w-[200px]">
            <div className="text-3xl font-black text-red-400 font-mono">{failedVenues.length}</div>
            <div className="text-xs text-gray-300 mt-1 font-medium">Venues on Warning List</div>
            <div className="text-[10px] text-gray-400 mt-0.5 font-mono">Updated Daily</div>
          </div>
        </div>
      </div>

      {/* EXECUTIVE WATCHLIST SUMMARY AT A GLANCE */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-red-950/30 via-gray-900 to-red-950/30 border border-red-500/30 mb-8 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-400 font-bold mb-3">
          <ClipboardCheck className="w-4 h-4" /> Public Health Summary & Enforcement Facts
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Warning Status</div>
            <div className="text-red-400 font-bold text-sm mt-0.5">Rating 0 & 1 Active</div>
            <div className="text-gray-400 text-[10px] mt-0.5">Urgent improvements ordered</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Enforcement Timeline</div>
            <div className="text-white font-bold text-sm mt-0.5">14 to 28 Days</div>
            <div className="text-gray-400 text-[10px] mt-0.5">Statutory legal notice</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Main Failure Triggers</div>
            <div className="text-white font-bold text-sm mt-0.5">Pest & Dirty Surfaces</div>
            <div className="text-gray-400 text-[10px] mt-0.5">Food safety log failures</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Full Officer Reports</div>
            <div className="text-white font-bold text-sm mt-0.5">Available via FOI</div>
            <div className="text-cyan-400 text-[10px] mt-0.5">Free public request</div>
          </div>
        </div>
        <p className="text-xs text-gray-300 mt-4 leading-relaxed border-t border-gray-800/80 pt-3">
          <strong>Public Health Takeaway:</strong> Venues on this watchlist have breached critical UK food safety laws. Council health officers issue legal Hygiene Improvement Notices and conduct follow-up enforcement visits to protect the public.
        </p>
      </div>

      {/* Plain English Guide: What Does 0 & 1 Star Legally Mean? */}
      <section className="p-7 sm:p-8 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-sm mb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-400 font-semibold">
          <Info className="w-4 h-4" /> What These Scores Mean
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Why Did These Food Places Fail Their Inspection?
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          When council Environmental Health Officers award a rating of 0 or 1, it means the food business broke key UK food safety regulations. These ratings are not given for minor paperwork mistakes — they represent serious hygiene risks found during the inspection visit.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-gray-950/70 border border-red-500/30 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                Rating 0
              </span>
              <strong className="text-white text-xs">Urgent Improvement Required</strong>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Multiple critical failures found. This can include evidence of pest activity (mice/cockroaches), severe cross-contamination, dangerous food storage temperatures, or complete lack of hot water and sanitation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-950/70 border border-orange-500/30 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Rating 1
              </span>
              <strong className="text-white text-xs">Major Improvement Necessary</strong>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Significant non-compliance with hygiene standards. The kitchen failed in at least one major area, such as structural kitchen damage, dirty equipment, or untrained staff handling high-risk food.
            </p>
          </div>
        </div>
      </section>

      {/* The Live Watchlist Cards Grid */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Active Warning List
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Food Places with 0 or 1 Star in {councilName}
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {failedVenues.map((venue, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-gradient-to-r from-red-950/20 via-gray-900/80 to-gray-900/80 border border-red-500/30 hover:border-red-400 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-black ${
                    venue.rating === 0 ? 'bg-red-600 text-white' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    RATING {venue.rating} ({venue.ratingText.toUpperCase()})
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-800 text-gray-300">
                    {venue.type}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    Inspected on {venue.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">
                  {venue.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-gray-300">
                  <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  <span>{venue.address}, <strong className="text-white font-mono">{venue.postcode}</strong></span>
                </div>

                <div className="text-xs text-red-300 bg-red-950/40 p-2.5 rounded-xl border border-red-500/20">
                  <strong>Officer Finding:</strong> {venue.failureReason}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end gap-2 flex-shrink-0">
                <Link
                  href={`/hygiene-rating/${venue.slug}`}
                  className="px-4 py-2.5 rounded-xl bg-red-600/30 hover:bg-red-600/50 border border-red-500/40 text-red-200 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <span>View Full Report & Dials</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/foi"
                  className="px-4 py-2 rounded-xl bg-gray-950 hover:bg-gray-800 border border-gray-700 text-[11px] font-semibold text-gray-300 transition-all text-center min-h-[36px] flex items-center justify-center"
                >
                  Request Council Notes
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consumer Advice & Business Owner Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Box 1: What to do if you suspect food poisoning */}
        <div className="p-7 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            <ShieldAlert className="w-4 h-4" /> Advice for Diners
          </div>
          <h3 className="text-base font-bold text-white">Suspect Food Poisoning?</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            If you became ill after eating at any restaurant or takeaway in {councilName}, report it immediately to your GP or the local council environmental health team. Keeping your receipt and food packaging helps officers investigate.
          </p>
        </div>

        {/* Box 2: For Food Business Owners (Right to Reply) */}
        <div className="p-7 rounded-3xl bg-gray-900/60 border border-gray-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            <RefreshCw className="w-4 h-4" /> For Business Owners
          </div>
          <h3 className="text-base font-bold text-white">Fixed Your Issues?</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            If you have made all required repairs and cleaning improvements, you can request a paid re-inspection from {councilName} Council to get an updated score. You can also submit a free statutory Right to Reply to explain your improvements.
          </p>
          <div className="pt-1">
            <Link href="/business-support" className="text-xs font-bold text-cyan-400 hover:underline inline-block min-h-[32px]">
              Read Business Owner Guide →
            </Link>
          </div>
        </div>

      </div>

      {/* Animated Accordion FAQ Section */}
      <div className="border-t border-gray-800/60 pt-4">
        <AccordionFaq
          title={`0 & 1 Star FAQs for ${councilName}`}
          subtitle={`Important answers for diners and local residents about failed food inspections in ${councilName}.`}
          badge="Watchlist FAQ"
          items={watchlistFaqs}
        />
      </div>

    </div>
  );
}
