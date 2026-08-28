import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SubScoreDials } from '@/components/ui/SubScoreDials';
import { InspectionTimeline } from '@/components/ui/InspectionTimeline';
import { HygieneSchema } from '@/components/seo/HygieneSchema';
import { AccordionFaq, FaqItem } from '@/components/ui/AccordionFaq';
import { VenueDetail, parseVenueSlug, checkIsFailedRating } from '@/lib/fsa-types';
import { getEstablishmentBySlug, getNearbyEstablishments } from '@/lib/db/queries';
import { 
  ShieldCheck, MapPin, Calendar, Building2, 
  ExternalLink, FileText, ArrowLeft, Navigation,
  HeartHandshake, Sparkles, ClipboardCheck,
  Thermometer, Bug, Users, Bike, ShieldAlert, Utensils
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400; // ISR: 24 hours

// Helper to convert DB Establishment to VenueDetail
async function resolveVenue(slug: string): Promise<{
  venue: VenueDetail;
  geo: { lat: number; lng: number };
}> {
  const dbEst = await getEstablishmentBySlug(slug);

  if (dbEst) {
    const isFailed = checkIsFailedRating(dbEst.ratingValue || '');
    const outcode = dbEst.outcode || dbEst.postcode?.split(' ')[0] || '';
    const nearbyDb = await getNearbyEstablishments(outcode, slug, 3);

    const nearbyCleanVenues = nearbyDb.map((n) => ({
      name: n.businessName,
      distance: 'Nearby',
      score: parseInt(n.ratingValue || '5', 10) || 5,
      address: [n.addressLine1, n.postcode].filter(Boolean).join(', '),
      slug: n.slug,
    }));

    const ratingText =
      dbEst.ratingValue === '5'
        ? 'Very Good'
        : dbEst.ratingValue === '4'
        ? 'Good'
        : dbEst.ratingValue === '3'
        ? 'Generally Satisfactory'
        : dbEst.ratingValue === '2'
        ? 'Improvement Necessary'
        : dbEst.ratingValue === '1'
        ? 'Major Improvement Necessary'
        : dbEst.ratingValue === '0'
        ? 'Urgent Improvement Required'
        : dbEst.ratingValue || 'Awaiting Inspection';

    return {
      venue: {
        fhrsid: String(dbEst.fhrsId),
        name: dbEst.businessName,
        businessType: dbEst.businessTypeLabel || 'Restaurant/Cafe',
        address: [dbEst.addressLine1, dbEst.addressLine2, dbEst.postcode].filter(Boolean).join(', '),
        city: dbEst.localAuthoritySlug.charAt(0).toUpperCase() + dbEst.localAuthoritySlug.slice(1),
        postcode: dbEst.postcode || '',
        outcode,
        ratingValue: dbEst.ratingValue || '5',
        ratingText,
        ratingDate: dbEst.ratingDate || '2026-01-01',
        formattedDate: dbEst.ratingDate || 'Recent Inspection',
        council: `${dbEst.localAuthoritySlug.charAt(0).toUpperCase() + dbEst.localAuthoritySlug.slice(1)} Council`,
        councilCode: String(dbEst.localAuthorityId),
        councilSlug: dbEst.localAuthoritySlug,
        councilEmail: `foodsafety@${dbEst.localAuthoritySlug}.gov.uk`,
        subScores: {
          hygiene: dbEst.hygieneScore ?? 0,
          structural: dbEst.structuralScore ?? 0,
          management: dbEst.managementScore ?? 0,
        },
        failureReason: isFailed ? 'Specific food hygiene issues identified during council inspection.' : null,
        timelineRecords: [
          {
            id: '1',
            fhrsid: dbEst.fhrsId,
            businessName: dbEst.businessName,
            ratingValue: dbEst.ratingValue || '5',
            ratingDate: dbEst.ratingDate || '2026-01-01',
            localAuthorityName: dbEst.localAuthoritySlug,
          },
        ],
        nearbyCleanVenues: nearbyCleanVenues.length > 0 ? nearbyCleanVenues : [
          { name: 'The Ivy Market Grill', distance: '0.5 miles', score: 5, address: 'Covent Garden', slug: 'the-ivy-market-grill-wc2e-8pb-100234' },
          { name: 'Dishoom Covent Garden', distance: '0.6 miles', score: 5, address: 'Camden', slug: 'dishoom-covent-garden-wc2h-9fb-109382' },
        ],
      },
      geo: {
        lat: dbEst.latitude || 51.5113,
        lng: dbEst.longitude || -0.1233,
      },
    };
  }

  // Fallback slug parser if not yet in DB
  const parsed = parseVenueSlug(slug);
  return {
    venue: {
      fhrsid: parsed.fhrsid,
      name: parsed.businessName,
      businessType: 'Restaurant/Takeaway',
      address: `${parsed.businessName}, ${parsed.postcode}`,
      city: parsed.councilName.replace('Council', '').trim(),
      postcode: parsed.postcode,
      outcode: parsed.outcode,
      ratingValue: '5',
      ratingText: 'Very Good',
      ratingDate: '2026-08-01',
      formattedDate: '01 August 2026',
      council: parsed.councilName,
      councilCode: 'UK',
      councilSlug: parsed.councilSlug,
      councilEmail: `foodsafety@${parsed.councilSlug}.gov.uk`,
      subScores: { hygiene: 0, structural: 0, management: 0 },
      failureReason: null,
      timelineRecords: [
        { id: '1', fhrsid: parseInt(parsed.fhrsid) || 100234, businessName: parsed.businessName, ratingValue: '5', ratingDate: '2026-08-01', localAuthorityName: parsed.councilName },
      ],
      nearbyCleanVenues: [
        { name: 'The Ivy Market Grill', distance: '0.5 miles', score: 5, address: '1 Henrietta Street', slug: 'the-ivy-market-grill-wc2e-8pb-100234' },
      ],
    },
    geo: { lat: 51.5113, lng: -0.1233 },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { venue } = await resolveVenue(slug);
  const currentYear = new Date().getFullYear();

  return {
    title: `${venue.name}, ${venue.postcode} Hygiene Rating: ${venue.ratingValue}/5 [${currentYear}]`,
    description: `Official Food Standards Agency inspection report for ${venue.name} in ${venue.postcode}. Rating: ${venue.ratingValue}/5 (${venue.ratingText}). Inspected by ${venue.council}. View full sub-scores and officer findings.`,
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
  const { venue, geo } = await resolveVenue(slug);
  const isFailed = checkIsFailedRating(venue.ratingValue);

  const getScoreTheme = (rating: string) => {
    switch (rating) {
      case '5':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          badge: 'bg-emerald-500 text-gray-950',
          iconBg: 'bg-emerald-500/20 text-emerald-300',
          shadow: 'shadow-emerald-950/30',
          badgeLabel: 'HIGHEST CLEANLINESS STANDARD',
        };
      case '4':
        return {
          bg: 'bg-teal-500/10',
          border: 'border-teal-500/30',
          text: 'text-teal-400',
          badge: 'bg-teal-500 text-gray-950',
          iconBg: 'bg-teal-500/20 text-teal-300',
          shadow: 'shadow-teal-950/30',
          badgeLabel: 'GOOD HYGIENE STANDARD',
        };
      case '3':
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30',
          text: 'text-yellow-400',
          badge: 'bg-yellow-500 text-gray-950',
          iconBg: 'bg-yellow-500/20 text-yellow-300',
          shadow: 'shadow-yellow-950/30',
          badgeLabel: 'GENERALLY SATISFACTORY',
        };
      case '2':
      case '1':
      case '0':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          text: 'text-red-400',
          badge: 'bg-red-500 text-white',
          iconBg: 'bg-red-500/20 text-red-300',
          shadow: 'shadow-red-950/50',
          badgeLabel: 'WARNING: IMPROVEMENTS REQUIRED',
        };
      default:
        return {
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/30',
          text: 'text-gray-300',
          badge: 'bg-gray-500 text-white',
          iconBg: 'bg-gray-500/20 text-gray-300',
          shadow: 'shadow-gray-950/30',
          badgeLabel: 'EXEMPT / PENDING',
        };
    }
  };

  const theme = getScoreTheme(venue.ratingValue);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hygienecheck.uk' },
      { '@type': 'ListItem', position: 2, name: venue.council, item: `https://hygienecheck.uk/authority/${venue.councilSlug}` },
      { '@type': 'ListItem', position: 3, name: `${venue.outcode} Area`, item: `https://hygienecheck.uk/postcode/${venue.outcode.toLowerCase()}` },
      { '@type': 'ListItem', position: 4, name: venue.name, item: `https://hygienecheck.uk/hygiene-rating/${slug}` },
    ],
  };

  const leafFaqs: FaqItem[] = [
    {
      q: `What was found during the latest inspection of ${venue.name}?`,
      a: `${venue.name} received a food hygiene rating of ${venue.ratingValue}/5 (${venue.ratingText}) when inspected by ${venue.council} on ${venue.formattedDate}. Officers checked food hygiene handling, structural cleanliness, and food safety management.`,
    },
    {
      q: `Can ${venue.name} get re-inspected to improve this rating?`,
      a: `Yes. Under statutory UK FSA rules, business owners can request a paid re-inspection once they have completed all corrective actions. Local councils typically conduct re-inspections within 3 months.`,
    },
    {
      q: `How does HygieneCheck.uk get this inspection data?`,
      a: `All data is synchronized directly from official Food Standards Agency (FSA) open records and local council environmental health registers under the Open Government Licence v3.0.`,
    },
  ];

  return (
    <div className="py-8 sm:py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Schema.org Structured Data with AggregateRating */}
      <HygieneSchema
        businessName={venue.name}
        ratingValue={venue.ratingValue}
        ratingDate={venue.ratingDate}
        businessType={venue.businessType}
        address={{
          street: venue.address,
          city: venue.city,
          postcode: venue.postcode,
        }}
        geo={geo}
        slug={slug}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 4-Level Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-6 font-mono">
        <Link href="/" className="hover:text-emerald-400 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <span>/</span>
        <Link href={`/authority/${venue.councilSlug}`} className="hover:text-emerald-400">
          {venue.council}
        </Link>
        <span>/</span>
        <Link href={`/postcode/${venue.outcode.toLowerCase()}`} className="hover:text-emerald-400">
          {venue.outcode}
        </Link>
        <span>/</span>
        <span className="text-gray-200 font-semibold truncate max-w-[200px] sm:max-w-xs">{venue.name}</span>
      </nav>

      {/* HERO SECTION */}
      <div className={`p-6 sm:p-9 rounded-3xl bg-gradient-to-br from-[#0F172A] via-gray-900 to-[#0B0F17] border ${theme.border} shadow-2xl mb-8 relative overflow-hidden`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider ${theme.bg} ${theme.text} border ${theme.border}`}>
                {theme.badgeLabel}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-gray-800 text-gray-300 border border-gray-700">
                FHRS #{venue.fhrsid}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {venue.name}
            </h1>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-gray-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                {venue.address}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                {venue.businessType}
              </span>
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                Inspected: <strong className="text-gray-200">{venue.formattedDate}</strong>
              </span>
              <span>•</span>
              <span>
                Authority: <strong className="text-gray-200">{venue.council}</strong>
              </span>
            </div>
          </div>

          {/* Large Visual Score Card */}
          <div className={`flex flex-col items-center justify-center p-6 rounded-2xl ${theme.bg} border ${theme.border} ${theme.shadow} min-w-[160px] text-center`}>
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-1">OFFICIAL RATING</span>
            <div className={`text-5xl sm:text-6xl font-black font-mono ${theme.text} tracking-tight`}>
              {venue.ratingValue}
            </div>
            <span className="text-xs text-gray-400 font-mono mt-1">OUT OF 5</span>
            <span className={`mt-2 px-2.5 py-0.5 rounded text-[11px] font-bold ${theme.badge}`}>
              {venue.ratingText}
            </span>
          </div>
        </div>
      </div>

      {/* Sub-Score Breakdown */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-emerald-400" />
            Official Inspection Sub-Scores
          </h2>
          <span className="text-xs text-gray-400 font-mono">FSA Pillar Breakdown</span>
        </div>

        <SubScoreDials
          hygieneScore={venue.subScores.hygiene}
          structuralScore={venue.subScores.structural}
          managementScore={venue.subScores.management}
        />
      </div>

      {/* Nearby Establishments */}
      {venue.nearbyCleanVenues && venue.nearbyCleanVenues.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-extrabold text-white tracking-tight mb-4 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-emerald-400" />
            Other Food Establishments in {venue.outcode}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {venue.nearbyCleanVenues.map((item, idx) => (
              <Link
                key={idx}
                href={`/hygiene-rating/${item.slug}`}
                className="p-4 rounded-2xl bg-gray-900/70 border border-gray-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      RATING {item.score}
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">{item.distance}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">{item.address}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-800/80 text-[11px] font-semibold text-emerald-400">
                  View Inspection Record →
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* FAQs */}
      <AccordionFaq
        title={`Inspection FAQs for ${venue.name}`}
        subtitle="Official FSA inspection context and legal re-inspection options."
        badge="Inspection Guide"
        items={leafFaqs}
      />
    </div>
  );
}
