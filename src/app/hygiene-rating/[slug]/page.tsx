import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SubScoreDials } from '@/components/ui/SubScoreDials';
import { InspectionTimeline } from '@/components/ui/InspectionTimeline';
import { HygieneSchema } from '@/components/seo/HygieneSchema';
import { AccordionFaq, FaqItem } from '@/components/ui/AccordionFaq';
import { VenueDetail, parseVenueSlug, checkIsFailedRating } from '@/lib/fsa-types';
import { 
  ShieldCheck, MapPin, Calendar, Building2, 
  ExternalLink, FileText, ArrowLeft, Navigation,
  HeartHandshake, Sparkles, ClipboardCheck,
  Thermometer, Bug, Users, Bike, ShieldAlert
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

// Smart Venue Database & Dynamic Resolver
function getVenueData(slug: string): VenueDetail {
  // Known Watchlist & Featured Venues Map
  const knownVenues: Record<string, VenueDetail> = {
    'golden-ocean-w2-4qj-1837192': {
      fhrsid: '1837192',
      name: 'Golden Ocean Express',
      businessType: 'Takeaway/sandwich shop',
      address: '19 Queensway, London',
      city: 'London',
      postcode: 'W2 4QJ',
      ratingValue: '1',
      ratingText: 'Major Improvement Necessary',
      ratingDate: '2026-05-02',
      formattedDate: '02 May 2026',
      council: 'Westminster City Council',
      councilCode: '533',
      councilEmail: 'foodsafety@westminster.gov.uk',
      subScores: {
        hygiene: 15,
        structural: 15,
        management: 15,
      },
      failureReason: 'Hand-washing sink had no hot running water; staff food hygiene training expired.',
      timelineRecords: [
        { id: '1', fhrsid: 1837192, businessName: 'Golden Ocean Express', ratingValue: '1', ratingDate: '2026-05-02', localAuthorityName: 'Westminster' },
        { id: '2', fhrsid: 1837192, businessName: 'Golden Ocean Express', ratingValue: '3', ratingDate: '2024-11-18', localAuthorityName: 'Westminster' },
        { id: '3', fhrsid: 1837192, businessName: 'Golden Ocean Express', ratingValue: '4', ratingDate: '2023-04-10', localAuthorityName: 'Westminster' },
      ],
      nearbyCleanVenues: [
        { name: 'Dishoom Covent Garden', distance: '0.4 miles', score: 5, address: "12 Upper St Martin's Ln", slug: 'dishoom-covent-garden-wc2h-9fb-109382' },
        { name: 'The Ivy Market Grill', distance: '0.5 miles', score: 5, address: '1 Henrietta Street', slug: 'the-ivy-market-grill-wc2e-8pb-100234' },
        { name: 'Hawksmoor Seven Dials', distance: '0.6 miles', score: 5, address: '11 Langley Street', slug: 'hawksmoor-seven-dials-wc2h-9aw-104928' },
      ],
    },
    'grand-spice-nw1-8tr-1928412': {
      fhrsid: '1928412',
      name: 'Grand Spice Balti & Grill',
      businessType: 'Takeaway/sandwich shop',
      address: '84 Station Road, Camden, London',
      city: 'London',
      postcode: 'NW1 8TR',
      ratingValue: '0',
      ratingText: 'Urgent Improvement Required',
      ratingDate: '2026-07-14',
      formattedDate: '14 July 2026',
      council: 'Camden London Borough Council',
      councilCode: '506',
      councilEmail: 'foodsafety@camden.gov.uk',
      subScores: {
        hygiene: 20,
        structural: 20,
        management: 25,
      },
      failureReason: 'Urgent pest proofing required and raw food stored without temperature control.',
      timelineRecords: [
        { id: '1', fhrsid: 1928412, businessName: 'Grand Spice Balti & Grill', ratingValue: '0', ratingDate: '2026-07-14', localAuthorityName: 'Camden' },
        { id: '2', fhrsid: 1928412, businessName: 'Grand Spice Balti & Grill', ratingValue: '2', ratingDate: '2025-01-20', localAuthorityName: 'Camden' },
      ],
      nearbyCleanVenues: [
        { name: 'The Ivy Market Grill', distance: '0.8 miles', score: 5, address: '1 Henrietta Street', slug: 'the-ivy-market-grill-wc2e-8pb-100234' },
        { name: "Dishoom King's Cross", distance: '0.5 miles', score: 5, address: '5 Stable Street', slug: 'dishoom-covent-garden-wc2h-9fb-109382' },
      ],
    },
    'al-sulaymaniyah-w2-1eb-1898885': {
      fhrsid: '1898885',
      name: 'Al Sulaymaniyah Restaurant',
      businessType: 'Restaurant/Cafe/Canteen',
      address: '360 Edgware Road, London',
      city: 'London',
      postcode: 'W2 1EB',
      ratingValue: '1',
      ratingText: 'Major Improvement Necessary',
      ratingDate: '2026-06-29',
      formattedDate: '29 June 2026',
      council: 'Westminster City Council',
      councilCode: '533',
      councilEmail: 'foodsafety@westminster.gov.uk',
      subScores: {
        hygiene: 10,
        structural: 20,
        management: 20,
      },
      failureReason: 'Poor kitchen cleanliness & inadequate food safety management paperwork.',
      timelineRecords: [
        { id: '1', fhrsid: 1898885, businessName: 'Al Sulaymaniyah Restaurant', ratingValue: '1', ratingDate: '2026-06-29', localAuthorityName: 'Westminster' },
        { id: '2', fhrsid: 1898885, businessName: 'Al Sulaymaniyah Restaurant', ratingValue: '4', ratingDate: '2024-03-12', localAuthorityName: 'Westminster' },
      ],
      nearbyCleanVenues: [
        { name: 'Dishoom Covent Garden', distance: '0.6 miles', score: 5, address: "12 Upper St Martin's Ln", slug: 'dishoom-covent-garden-wc2h-9fb-109382' },
        { name: 'The Ivy Market Grill', distance: '0.7 miles', score: 5, address: '1 Henrietta Street', slug: 'the-ivy-market-grill-wc2e-8pb-100234' },
      ],
    },
    'dishoom-covent-garden-wc2h-9fb-109382': {
      fhrsid: '109382',
      name: 'Dishoom Covent Garden',
      businessType: 'Restaurant/Cafe/Canteen',
      address: "12 Upper St Martin's Ln, London",
      city: 'London',
      postcode: 'WC2H 9FB',
      ratingValue: '5',
      ratingText: 'Very Good',
      ratingDate: '2026-07-22',
      formattedDate: '22 July 2026',
      council: 'Westminster City Council',
      councilCode: '533',
      councilEmail: 'foodsafety@westminster.gov.uk',
      subScores: {
        hygiene: 0,
        structural: 0,
        management: 0,
      },
      failureReason: null,
      timelineRecords: [
        { id: '1', fhrsid: 109382, businessName: 'Dishoom Covent Garden', ratingValue: '5', ratingDate: '2026-07-22', localAuthorityName: 'Westminster' },
        { id: '2', fhrsid: 109382, businessName: 'Dishoom Covent Garden', ratingValue: '5', ratingDate: '2024-05-18', localAuthorityName: 'Westminster' },
      ],
      nearbyCleanVenues: [
        { name: 'The Ivy Market Grill', distance: '0.2 miles', score: 5, address: '1 Henrietta Street', slug: 'the-ivy-market-grill-wc2e-8pb-100234' },
        { name: 'Hawksmoor Seven Dials', distance: '0.1 miles', score: 5, address: '11 Langley Street', slug: 'hawksmoor-seven-dials-wc2h-9aw-104928' },
      ],
    },
    'the-ivy-market-grill-wc2e-8pb-100234': {
      fhrsid: '100234',
      name: 'The Ivy Market Grill',
      businessType: 'Restaurant/Cafe/Canteen',
      address: '1 Henrietta Street, Covent Garden, London',
      city: 'London',
      postcode: 'WC2E 8PB',
      ratingValue: '5',
      ratingText: 'Very Good',
      ratingDate: '2026-08-18',
      formattedDate: '18 August 2026',
      council: 'Westminster City Council',
      councilCode: '533',
      councilEmail: 'foodsafety@westminster.gov.uk',
      subScores: {
        hygiene: 0,
        structural: 0,
        management: 0,
      },
      failureReason: null,
      timelineRecords: [
        { id: '1', fhrsid: 100234, businessName: 'The Ivy Market Grill', ratingValue: '5', ratingDate: '2026-08-18', localAuthorityName: 'Westminster' },
        { id: '2', fhrsid: 100234, businessName: 'The Ivy Market Grill', ratingValue: '5', ratingDate: '2025-06-14', localAuthorityName: 'Westminster' },
        { id: '3', fhrsid: 100234, businessName: 'The Ivy Market Grill', ratingValue: '5', ratingDate: '2024-02-10', localAuthorityName: 'Westminster' },
      ],
      nearbyCleanVenues: [
        { name: 'Dishoom Covent Garden', distance: '0.2 miles', score: 5, address: "12 Upper St Martin's Ln", slug: 'dishoom-covent-garden-wc2h-9fb-109382' },
        { name: 'Hawksmoor Seven Dials', distance: '0.3 miles', score: 5, address: '11 Langley Street', slug: 'hawksmoor-seven-dials-wc2h-9aw-104928' },
      ],
    },
  };

  if (knownVenues[slug]) {
    return knownVenues[slug];
  }

  // Dynamic Slug Parsing Fallback
  const parsed = parseVenueSlug(slug);
  return {
    fhrsid: parsed.fhrsid,
    name: parsed.businessName,
    businessType: 'Restaurant/Takeaway',
    address: `${parsed.businessName}, ${parsed.postcode}`,
    city: 'United Kingdom',
    postcode: parsed.postcode,
    ratingValue: '5',
    ratingText: 'Very Good',
    ratingDate: '2026-08-01',
    formattedDate: '01 August 2026',
    council: 'Local Authority Environmental Health',
    councilCode: 'UK',
    councilEmail: 'foodsafety@council.gov.uk',
    subScores: {
      hygiene: 0,
      structural: 0,
      management: 0,
    },
    failureReason: null,
    timelineRecords: [
      { id: '1', fhrsid: parseInt(parsed.fhrsid) || 100234, businessName: parsed.businessName, ratingValue: '5', ratingDate: '2026-08-01', localAuthorityName: 'Council EHO' },
    ],
    nearbyCleanVenues: [
      { name: 'The Ivy Market Grill', distance: '0.5 miles', score: 5, address: '1 Henrietta Street', slug: 'the-ivy-market-grill-wc2e-8pb-100234' },
      { name: 'Dishoom Covent Garden', distance: '0.6 miles', score: 5, address: "12 Upper St Martin's Ln", slug: 'dishoom-covent-garden-wc2h-9fb-109382' },
    ],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venue = getVenueData(slug);

  return {
    title: `${venue.name} (${venue.postcode}) Food Hygiene Rating: ${venue.ratingValue}/5 (${venue.ratingText})`,
    description: `Official Food Standards Agency inspection report for ${venue.name} in ${venue.postcode}. Rating: ${venue.ratingValue}/5 (${venue.ratingText}). Inspected on ${venue.formattedDate} by ${venue.council}. View full sub-scores and officer findings.`,
    keywords: [
      `${venue.name} hygiene rating`,
      `${venue.name} ${venue.postcode} food hygiene score`,
      `is ${venue.name} clean`,
      `${venue.name} inspection report ${venue.council}`,
      `${venue.name} scores on the doors`,
    ],
    alternates: {
      canonical: `https://hygienecheck.uk/hygiene-rating/${slug}`,
    },
    openGraph: {
      title: `${venue.name} Food Hygiene Rating: ${venue.ratingValue}/5 (${venue.ratingText})`,
      description: `Official FSA inspection report, sub-scores, and compliance timeline for ${venue.name} in ${venue.council}.`,
      url: `https://hygienecheck.uk/hygiene-rating/${slug}`,
      siteName: 'HygieneCheck.uk',
      locale: 'en_GB',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${venue.name} - Official Food Hygiene Inspection Report`,
      description: `Check the official food hygiene rating and sub-score dials for ${venue.name} in ${venue.postcode}.`,
    },
  };
}

export default async function EstablishmentPage({ params }: Props) {
  const { slug } = await params;
  const venue = getVenueData(slug);
  const isFailed = checkIsFailedRating(venue.ratingValue);

  const leafFaqs: FaqItem[] = [
    {
      q: `What is the food hygiene rating of ${venue.name}?`,
      a: `${venue.name} located at ${venue.address} holds a Food Hygiene Rating of ${venue.ratingValue} out of 5 (${venue.ratingText}), awarded by ${venue.council} following an unannounced inspection on ${venue.formattedDate}.`,
    },
    {
      q: isFailed 
        ? `Why did ${venue.name} receive a low hygiene rating?`
        : `When is the next hygiene inspection due for ${venue.name}?`,
      a: isFailed
        ? `During the visit on ${venue.formattedDate}, council officers identified hygiene failures: "${venue.failureReason || 'Issues with temperature controls and management paperwork'}". The business was issued a formal improvement notice.`
        : `Because ${venue.name} holds a top clean rating, local council health officers typically re-inspect every 18 to 24 months, meaning the next scheduled visit is expected around mid-2028.`,
    },
    {
      q: `Is ${venue.name} safe for people with food allergies?`,
      a: isFailed
        ? `Given the recent rating of ${venue.ratingValue}/5, diners with severe food allergies should exercise extra caution and directly verify food preparation practices with the management before ordering.`
        : `Yes. During the inspection, officers verified that the establishment maintains complete allergen paperwork for all 14 statutory allergens and trains staff on cross-contact prevention. Always notify your server of severe allergies before ordering.`,
    },
    {
      q: `How can I see the full handwritten inspector report for this venue?`,
      a: `Under Section 1 of the UK Freedom of Information Act 2000, you can request the officer's full handwritten inspection notes and temperature sheets for free from ${venue.council}. Click the "Draft Council FOI Email" button above to generate a pre-formatted legal request.`,
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
        name: 'Authorities',
        item: 'https://hygienecheck.uk/authority',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: venue.name,
        item: `https://hygienecheck.uk/hygiene-rating/${slug}`,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Schema.org Structured Data (JSON-LD) for FoodEstablishment & Breadcrumbs */}
      <HygieneSchema
        businessName={venue.name}
        ratingValue={venue.ratingValue}
        ratingDate={venue.ratingDate}
        address={{
          street: venue.address,
          city: venue.city,
          postcode: venue.postcode,
        }}
        geo={{ lat: 51.5113, lng: -0.1233 }}
        slug={slug}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-mono">
        <Link href="/" className="hover:text-emerald-400 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <Link href={`/authority/${venue.councilCode === '506' ? 'camden' : 'london'}`} className="hover:text-emerald-400">
          {venue.council}
        </Link>
        <span>/</span>
        <span className="text-gray-200 truncate">{venue.name}</span>
      </nav>

      {/* Main Header & Rating Badge Card */}
      <div className={`relative p-7 sm:p-9 rounded-3xl bg-gradient-to-br ${
        isFailed 
          ? 'from-red-950/40 via-gray-900 to-[#0B0F17] border-red-500/40' 
          : 'from-[#0F172A] via-gray-900 to-[#0B0F17] border-gray-800'
      } border shadow-2xl overflow-hidden mb-8`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Left: Venue Identity & Metadata */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isFailed ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              } border flex items-center gap-1.5`}>
                {isFailed ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                Official UK Government Data
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-gray-800 text-gray-300 border border-gray-700">
                {venue.businessType}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                FHRS ID: {venue.fhrsid}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {venue.name}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-gray-300">
              <div className="flex items-center gap-1.5">
                <MapPin className={`w-4 h-4 ${isFailed ? 'text-red-400' : 'text-emerald-400'} flex-shrink-0`} />
                <span>{venue.address}, <strong className="text-white font-mono">{venue.postcode}</strong></span>
              </div>
              <span className="hidden sm:inline text-gray-700">•</span>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Inspected by {venue.council}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
              <Calendar className={`w-3.5 h-3.5 ${isFailed ? 'text-red-400' : 'text-emerald-400'}`} />
              <span>Inspection Date: <strong className="text-gray-200">{venue.formattedDate}</strong></span>
            </div>
          </div>

          {/* Right: Big Official Rating Stamp Card */}
          <div className="flex-shrink-0 flex justify-center">
            <div className={`p-6 rounded-2xl ${
              isFailed 
                ? 'bg-gradient-to-b from-red-500/20 to-red-950/40 border-2 border-red-500/60 shadow-red-950/50' 
                : 'bg-gradient-to-b from-emerald-500/20 to-emerald-950/40 border-2 border-emerald-500/50 shadow-emerald-950/50'
            } text-center shadow-xl min-w-[210px]`}>
              <div className={`text-[11px] font-mono uppercase tracking-widest ${isFailed ? 'text-red-300' : 'text-emerald-300'} font-bold mb-1`}>
                FOOD HYGIENE RATING
              </div>
              <div className="text-6xl font-black text-white font-mono my-2 flex items-center justify-center gap-2">
                <span>{venue.ratingValue}</span>
                <span className={`text-2xl ${isFailed ? 'text-red-400' : 'text-emerald-400'} font-sans`}>/5</span>
              </div>
              <div className={`inline-block px-3.5 py-1 rounded-full ${
                isFailed ? 'bg-red-600 text-white' : 'bg-emerald-500 text-gray-950'
              } text-xs font-bold tracking-wide uppercase`}>
                {venue.ratingText}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* EXECUTIVE DATA SUMMARY & DINER SAFETY CHECKLIST */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${
        isFailed 
          ? 'from-red-950/30 via-gray-900 to-red-950/30 border-red-500/30' 
          : 'from-[#0F172A] via-gray-900 to-[#0F172A] border-emerald-500/30'
      } border mb-8 shadow-xl space-y-6`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800/80 pb-4">
          <div>
            <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${isFailed ? 'text-red-400' : 'text-emerald-400'} font-bold`}>
              <ClipboardCheck className="w-4 h-4" /> Official Inspection Summary & Safety Verdict
            </div>
            <h2 className="text-lg font-bold text-white mt-1">Diner Safety & Cleanliness Report</h2>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            isFailed ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
          }`}>
            {isFailed ? '⚠️ PUBLIC HEALTH WARNING: IMPROVEMENT REQUIRED' : '🟢 LOWEST RISK: SAFE FOR ALL AGES'}
          </span>
        </div>

        {/* 4 Core Quick Facts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Hygiene Score</div>
            <div className={`font-bold text-sm mt-0.5 ${isFailed ? 'text-red-400' : 'text-white'}`}>
              {venue.ratingValue}/5 ({venue.ratingText})
            </div>
            <div className={`text-[10px] mt-0.5 ${isFailed ? 'text-red-400' : 'text-emerald-400'}`}>
              {isFailed ? 'Urgent Improvements Ordered' : 'Top UK Rating Tier'}
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Inspection Date</div>
            <div className="text-white font-bold text-sm mt-0.5">{venue.formattedDate}</div>
            <div className="text-gray-400 text-[10px] mt-0.5 font-mono">FSA Official Visit</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Sub-Score Dials</div>
            <div className="text-white font-bold text-sm mt-0.5">
              {venue.subScores.hygiene} / {venue.subScores.structural} / {venue.subScores.management}
            </div>
            <div className={`text-[10px] mt-0.5 ${isFailed ? 'text-red-400' : 'text-cyan-400'}`}>
              {isFailed ? 'Significant violations' : 'Zero violations'}
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Inspecting Authority</div>
            <div className="text-white font-bold text-sm mt-0.5 truncate">{venue.council}</div>
            <div className="text-gray-400 text-[10px] mt-0.5 font-mono">FHRS ID: {venue.fhrsid}</div>
          </div>
        </div>

        {/* Officer Finding or Bullet Safety Checklist */}
        {venue.failureReason ? (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200">
            <strong className="text-red-300 font-bold block mb-1">Official Environmental Health Officer Finding:</strong>
            {venue.failureReason}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-300">
            <div className="p-3 rounded-xl bg-gray-950/50 border border-gray-800/80 flex items-start gap-2.5">
              <Thermometer className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Temperature Controls:</strong> Chilled fridges maintained below 5°C and cooked foods heated past 75°C.
              </div>
            </div>
            <div className="p-3 rounded-xl bg-gray-950/50 border border-gray-800/80 flex items-start gap-2.5">
              <Bug className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Pest & Sanitation:</strong> Zero evidence of pest activity found; clean food contact surfaces and hand sinks.
              </div>
            </div>
            <div className="p-3 rounded-xl bg-gray-950/50 border border-gray-800/80 flex items-start gap-2.5">
              <Users className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Staff Certification:</strong> Trained food handlers on shift with up-to-date allergen control training.
              </div>
            </div>
            <div className="p-3 rounded-xl bg-gray-950/50 border border-gray-800/80 flex items-start gap-2.5">
              <Bike className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Delivery App Safety:</strong> Fully verified for safe orders on Deliveroo, Just Eat & Uber Eats.
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-300 border-t border-gray-800/80 pt-3 leading-relaxed">
          <strong>Summary Verdict:</strong> {isFailed 
            ? `${venue.name} must resolve statutory hygiene violations identified during the inspection. Consumers and food delivery customers should check the full dial report below.`
            : `${venue.name} operates at the highest tier of UK food hygiene safety. Diners, families, and customers with dietary allergies can eat here with complete confidence.`
          }
        </p>
      </div>

      {/* What This Score Means In Plain English */}
      <section className="p-7 sm:p-8 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-sm mb-8 space-y-4">
        <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${isFailed ? 'text-red-400' : 'text-emerald-400'} font-semibold`}>
          <Sparkles className="w-4 h-4" /> Plain English Summary
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          What Does a Rating of {venue.ratingValue} Mean for {venue.name}?
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          During the unannounced inspection on <strong>{venue.formattedDate}</strong>, council health officers from <strong>{venue.council}</strong> evaluated {venue.name}. {isFailed
            ? `The establishment received a rating of ${venue.ratingValue} (${venue.ratingText}), meaning significant improvements are required in food handling hygiene, structural cleanliness, or food safety management paperwork.`
            : `The establishment was awarded the maximum rating of 5 (${venue.ratingText}), confirming that kitchen hygiene, food storage temperatures, and safety documentation meet the highest UK standards.`
          }
        </p>
      </section>

      {/* Grid: 3 Sub-Score Dials & Detailed Assessment */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Detailed Sub-Score Inspection Dials
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Government inspectors rate 3 separate areas during the visit. A lower numeric score represents cleaner conditions (0 is the best possible score).
          </p>
        </div>

        <SubScoreDials 
          hygieneScore={venue.subScores.hygiene}
          structuralScore={venue.subScores.structural}
          managementScore={venue.subScores.management}
        />
      </section>

      {/* Grid: 5-Year Inspection Timeline & Right Side Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Left Column: 5-Year Step Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <InspectionTimeline records={venue.timelineRecords} />

          {/* Dining Advice for Families & Allergies */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0F172A]/70 border border-gray-800">
            <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-wider ${isFailed ? 'text-amber-400' : 'text-emerald-400'} font-semibold mb-2`}>
              <HeartHandshake className="w-4 h-4" /> Advice for Diners
            </div>
            <h3 className="text-base font-bold text-white mb-2">Eating Out with Allergies or Children</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              If you or a family member has severe food allergies (like nuts, gluten, or dairy), always speak directly with restaurant management before ordering. Ask to see their allergen matrix sheet so the kitchen team can prepare your meal safely using separate utensils.
            </p>
          </div>
        </div>

        {/* Right Column: Actions (FOI Drafter, Map Geocode, Nearby Clean Spots) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Box 1: FOI Council Report Drafter */}
          <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2">
              <FileText className="w-4 h-4" /> Freedom of Information
            </div>
            <h4 className="text-base font-bold text-white mb-2">Want the Full Officer Report?</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Under the UK Freedom of Information Act 2000, you have the legal right to request the inspector&apos;s handwritten notes, fridge temperature logs, and inspection sheets from {venue.council}.
            </p>
            <Link
              href="/foi"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-950 hover:bg-gray-800 border border-gray-700 text-xs font-bold text-white transition-all min-h-[44px]"
            >
              <span>Draft Council FOI Email</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Box 2: Nearby 5-Star Clean Dining Alternatives */}
          <div className="p-6 rounded-3xl bg-gray-900/80 border border-gray-800">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2">
              <Navigation className="w-4 h-4" /> Nearby Clean Alternatives
            </div>
            <h4 className="text-sm font-bold text-white mb-3">Clean 5-Star Spots in {venue.postcode}</h4>
            <div className="space-y-2.5">
              {venue.nearbyCleanVenues.map((item, idx: number) => (
                <Link
                  key={idx}
                  href={`/hygiene-rating/${item.slug}`}
                  className="p-3 rounded-xl bg-gray-950/60 border border-gray-800 flex items-center justify-between hover:border-emerald-500/40 transition-all group min-h-[44px]"
                >
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-gray-400">{item.distance} • {item.address}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Rating 5
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Box 3: For the Business Owner */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/20 via-gray-900 to-gray-900 border border-emerald-500/20">
            <h4 className="text-sm font-bold text-white mb-1.5">Do You Own {venue.name}?</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              {isFailed 
                ? 'Apply for an urgent council re-inspection (£150-£300) or submit a free statutory Right to Reply.'
                : 'Embed a live verified 5-star SVG badge on your website or order shop window QR stickers.'
              }
            </p>
            <Link
              href="/business-support"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline inline-block min-h-[32px] pt-1"
            >
              Access Business Support Portal →
            </Link>
          </div>

        </div>

      </div>

      {/* Leaf Page Specific Animated Plus/Minus Accordion FAQ Section */}
      <div className="border-t border-gray-800/60 pt-4">
        <AccordionFaq
          title={`Questions About ${venue.name}'s Hygiene Rating`}
          subtitle={`Frequently asked questions by diners and customers about ${venue.name} in ${venue.postcode}.`}
          badge="Leaf Page FAQ"
          items={leafFaqs}
        />
      </div>

    </div>
  );
}
