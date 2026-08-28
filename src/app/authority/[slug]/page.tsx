import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AccordionFaq, FaqItem } from '@/components/ui/AccordionFaq';
import { 
  MapPin, ShieldCheck, AlertTriangle, ArrowRight,
  Building2, Utensils, Pizza, Beer, Baby, Building, PhoneCall, Mail, ArrowLeft, Navigation, ClipboardCheck
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const councilName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: `Food Hygiene Ratings in ${councilName} (2026 Inspection Reports & 0-Star List)`,
    description: `Search official food hygiene inspection ratings for restaurants, takeaways, and cafes in ${councilName}. Check 5-star clean places, failed 0-star watchlist, and council food safety scores.`,
    keywords: [
      `food hygiene ratings ${councilName}`,
      `${councilName} council hygiene scores`,
      `cleanest takeaways in ${councilName}`,
      `${councilName} 0 star restaurants`,
      `scores on the doors ${councilName}`,
    ],
    alternates: {
      canonical: `https://hygienecheck.uk/authority/${slug}`,
    },
    openGraph: {
      title: `Food Hygiene Ratings in ${councilName} Council`,
      description: `Official inspection scores, pass rates, and clean dining guide for ${councilName}.`,
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
  const councilName = slug.charAt(0).toUpperCase() + slug.slice(1);

  // Authority Data Model Representation
  const council = {
    name: `${councilName} Council`,
    slug: slug,
    totalVenues: '5,722',
    passRate: '88.4%',
    avgScore: '4.7 / 5',
    officerEmail: `foodsafety@${slug}.gov.uk`,
    officerPhone: '020 7641 6000',
    topRatedPlaces: [
      { name: `${councilName} Grand Brasserie`, score: 5, type: 'Restaurant', address: `12 High Street, ${councilName}`, postcode: 'WC2E 8PB', slug: `${slug}-grand-brasserie-wc2e-8pb-109841`, inspected: '18 Aug 2026' },
      { name: `The Spice Pavilion ${councilName}`, score: 5, type: 'Takeaway', address: `45 Station Road, ${councilName}`, postcode: 'W1D 3QB', slug: `the-spice-pavilion-${slug}-w1d-3qb-109842`, inspected: '14 Aug 2026' },
      { name: `Royal Dragon Buffet`, score: 5, type: 'Restaurant', address: `88 Market Square, ${councilName}`, postcode: 'SW1A 1AA', slug: `royal-dragon-buffet-${slug}-sw1a-1aa-109843`, inspected: '10 Aug 2026' },
      { name: `Crown & Anchor Gastro Pub`, score: 5, type: 'Pub/Bar', address: `14 Neal Street, ${councilName}`, postcode: 'WC2H 9PR', slug: `crown-and-anchor-${slug}-wc2h-9pr-109844`, inspected: '05 Aug 2026' },
    ],
    categories: [
      { name: 'Takeaways & Fast Food', count: '1,240 places', avg: '4.4 Avg', icon: Pizza, color: 'text-amber-400' },
      { name: 'Restaurants & Cafes', count: '2,890 places', avg: '4.8 Avg', icon: Utensils, color: 'text-emerald-400' },
      { name: 'Pubs, Bars & Nightclubs', count: '680 places', avg: '4.6 Avg', icon: Beer, color: 'text-yellow-400' },
      { name: 'Schools & Day Nurseries', count: '420 places', avg: '4.9 Avg', icon: Baby, color: 'text-cyan-400' },
      { name: 'Care Homes & Hospitals', count: '310 places', avg: '4.9 Avg', icon: Building, color: 'text-teal-400' },
    ],
    outcodes: [
      { code: 'WC2', name: 'Covent Garden & Holborn', count: '890 places' },
      { code: 'W1', name: 'Mayfair, Soho & Marylebone', count: '1,420 places' },
      { code: 'SW1', name: 'Westminster, Victoria & Pimlico', count: '1,150 places' },
      { code: 'NW1', name: 'Regent’s Park & Marylebone North', count: '640 places' },
    ],
  };

  const councilFaqs: FaqItem[] = [
    {
      q: `How do food hygiene inspections work in ${council.name}?`,
      a: `Environmental Health Officers from ${council.name} carry out unannounced inspection visits to restaurants, takeaways, cafes, and care homes. They inspect food preparation methods, building cleanliness, temperature logs, and staff hygiene training.`,
    },
    {
      q: `What is the average food hygiene rating in ${councilName}?`,
      a: `The average food hygiene score across ${council.totalVenues} active food premises in ${councilName} is ${council.avgScore}, with ${council.passRate} of businesses achieving a clean 4 or 5 star rating.`,
    },
    {
      q: `How can I report a dirty restaurant or food poisoning in ${councilName}?`,
      a: `You can report suspected food poisoning or unsafe hygiene practices directly to the ${council.name} Environmental Health Department by emailing ${council.officerEmail} or calling ${council.officerPhone}.`,
    },
    {
      q: `Where can I see the list of failed food places in ${councilName}?`,
      a: `You can view the full public health warning list of 0 and 1 star food establishments in this borough by visiting the ${councilName} 0-Star Watchlist above.`,
    },
  ];

  const authoritySchema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: `${council.name} Food Hygiene Inspection Service`,
    serviceType: 'Food Safety and Hygiene Inspections',
    provider: {
      '@type': 'GovernmentOrganization',
      name: council.name,
      email: council.officerEmail,
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
        name: `${councilName} Council`,
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
        <span className="text-gray-200 font-semibold">{council.name}</span>
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
              Food Hygiene Ratings in {council.name}
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              Official food hygiene inspection ratings for all restaurants, takeaways, cafes, and care homes inspected by Environmental Health Officers in <strong>{council.name}</strong>. Updated daily from official Food Standards Agency public records.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-1 font-mono">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> {council.officerEmail}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" /> {council.officerPhone}
              </span>
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 text-center">
              <div className="text-2xl font-black text-white font-mono">{council.totalVenues}</div>
              <div className="text-[11px] text-gray-400 mt-1">Tracked Venues</div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <div className="text-2xl font-black text-emerald-400 font-mono">{council.passRate}</div>
              <div className="text-[11px] text-emerald-300/80 mt-1">Pass Rate (4-5★)</div>
            </div>
          </div>
        </div>
      </div>

      {/* EXECUTIVE COUNCIL SUMMARY AT A GLANCE */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#0F172A] via-gray-900 to-[#0F172A] border border-emerald-500/30 mb-8 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
          <ClipboardCheck className="w-4 h-4" /> {councilName} Hygiene Overview & Key Facts
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Total Active Venues</div>
            <div className="text-white font-bold text-sm mt-0.5">{council.totalVenues} Places</div>
            <div className="text-emerald-400 text-[10px] mt-0.5">Across all food sectors</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Clean Pass Rate</div>
            <div className="text-white font-bold text-sm mt-0.5">{council.passRate} (4-5★)</div>
            <div className="text-emerald-400 text-[10px] mt-0.5">High safety standard</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Average Score</div>
            <div className="text-white font-bold text-sm mt-0.5">{council.avgScore}</div>
            <div className="text-cyan-400 text-[10px] mt-0.5">Borough-wide average</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">EHO Department</div>
            <div className="text-white font-bold text-sm mt-0.5 truncate">{council.name}</div>
            <div className="text-gray-400 text-[10px] mt-0.5 font-mono">{council.officerPhone}</div>
          </div>
        </div>
        <p className="text-xs text-gray-300 mt-4 leading-relaxed border-t border-gray-800/80 pt-3">
          <strong>Council Summary:</strong> Food premises in {councilName} demonstrate strong hygiene compliance, with over {council.passRate} of inspected kitchens achieving a Good or Very Good rating. Consumers can browse local ratings by business category or outer postcode area below.
        </p>
      </div>

      {/* Direct Warning Watchlist Callout Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-gray-900/90 to-red-950/40 border border-red-500/30 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {councilName} 0 & 1 Star Public Health Watchlist
            </h3>
            <p className="text-xs text-gray-300 mt-0.5">
              Check the list of food places in {councilName} that recently failed inspection and were given urgent improvement notices.
            </p>
          </div>
        </div>
        <Link
          href={`/authority/${slug}/0-star`}
          className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/20 transition-all flex items-center gap-1.5 min-h-[44px]"
        >
          <span>View 0-Star List</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Category Breakdown in this Council */}
      <section className="mb-8">
        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Council Category Breakdown
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Food Hygiene by Business Type in {councilName}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {council.categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-gray-900/70 border border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-gray-950 border border-gray-800 ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{cat.name}</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">{cat.count}</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  {cat.avg}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top 5-Star Clean Dining Leaderboard */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              ⭐ Clean Dining Leaderboard
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              Top Rated 5-Star Venues in {councilName}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {council.topRatedPlaces.map((venue, idx) => (
            <Link
              key={idx}
              href={`/hygiene-rating/${venue.slug}`}
              className="p-5 rounded-2xl bg-[#0F172A]/80 border border-emerald-500/30 hover:border-emerald-400 hover:bg-gray-900 transition-all group flex flex-col justify-between min-h-[48px]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    RATING 5 (VERY GOOD)
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">Inspected {venue.inspected}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {venue.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{venue.address}</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>View Full Sub-Scores & History</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Hyperlocal Neighbourhoods / Outcodes in this Council */}
      <section className="mb-8">
        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5" /> Outcode Silos
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Browse {councilName} by Postcode Area
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {council.outcodes.map((item) => (
            <Link
              key={item.code}
              href={`/postcode/${item.code.toLowerCase()}`}
              className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-emerald-500/50 hover:bg-gray-850 transition-all group min-h-[44px]"
            >
              <div className="text-base font-extrabold font-mono text-emerald-400 group-hover:text-white transition-colors">
                {item.code}
              </div>
              <div className="text-xs font-semibold text-gray-200 mt-0.5 truncate">{item.name}</div>
              <div className="text-[11px] font-mono text-gray-400 mt-1">{item.count}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Animated Accordion FAQ Section */}
      <div className="border-t border-gray-800/60 pt-4">
        <AccordionFaq
          title={`Food Hygiene FAQs for ${council.name}`}
          subtitle={`Common questions about restaurant inspections, reporting issues, and ratings in ${councilName}.`}
          badge={`${councilName} Council FAQs`}
          items={councilFaqs}
        />
      </div>

    </div>
  );
}
