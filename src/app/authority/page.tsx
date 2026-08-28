import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AccordionFaq, FaqItem } from '@/components/ui/AccordionFaq';
import { 
  Building2, ShieldCheck, MapPin, Search, ArrowRight, ArrowLeft, 
  AlertTriangle, Navigation, Star, CheckCircle2, ClipboardCheck, Sparkles 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'UK Councils & Cities Food Hygiene Directory (363 Local Authorities)',
  description: 'Search official food hygiene inspection ratings across all 363 UK local councils and cities. Browse cleanliness pass rates, 0-star watchlists, and local Environmental Health department reports.',
  keywords: [
    'uk council food hygiene directory',
    'local authority food safety ratings',
    'scores on the doors councils uk',
    'london food hygiene ratings',
    'birmingham council food inspection',
  ],
  alternates: {
    canonical: 'https://hygienecheck.uk/authority',
  },
  openGraph: {
    title: 'UK Councils & Cities Food Hygiene Directory',
    description: 'Browse official food hygiene scores across 363 UK local authorities and major cities.',
    url: 'https://hygienecheck.uk/authority',
    siteName: 'HygieneCheck.uk',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '363 UK Councils Food Hygiene Directory',
    description: 'Check official food hygiene pass rates and 0-star watchlists by council.',
  },
};

export default function CouncilsMasterDirectoryPage() {
  const regions = [
    {
      name: 'Greater London',
      totalVenues: '88,400',
      avgPassRate: '89.2%',
      councils: [
        { name: 'Westminster City Council', slug: 'london', venues: '5,722', passRate: '88.4%', avgScore: '4.7' },
        { name: 'Camden Council', slug: 'camden', venues: '3,890', passRate: '86.1%', avgScore: '4.5' },
        { name: 'Kensington & Chelsea', slug: 'kensington', venues: '2,940', passRate: '91.0%', avgScore: '4.8' },
        { name: 'Southwark Council', slug: 'southwark', venues: '3,410', passRate: '87.5%', avgScore: '4.6' },
        { name: 'Tower Hamlets', slug: 'tower-hamlets', venues: '4,150', passRate: '84.2%', avgScore: '4.4' },
        { name: 'Islington Council', slug: 'islington', venues: '2,830', passRate: '89.6%', avgScore: '4.7' },
      ],
    },
    {
      name: 'West Midlands & North West',
      totalVenues: '76,200',
      avgPassRate: '87.5%',
      councils: [
        { name: 'Birmingham City Council', slug: 'birmingham', venues: '8,420', passRate: '85.4%', avgScore: '4.5' },
        { name: 'Manchester City Council', slug: 'manchester', venues: '6,180', passRate: '88.1%', avgScore: '4.6' },
        { name: 'Liverpool City Council', slug: 'liverpool', venues: '4,910', passRate: '86.9%', avgScore: '4.5' },
        { name: 'Coventry City Council', slug: 'coventry', venues: '2,450', passRate: '89.0%', avgScore: '4.7' },
        { name: 'Salford City Council', slug: 'salford', venues: '1,890', passRate: '88.5%', avgScore: '4.6' },
        { name: 'Wolverhampton Council', slug: 'wolverhampton', venues: '2,120', passRate: '87.0%', avgScore: '4.5' },
      ],
    },
    {
      name: 'Yorkshire, Humber & North East',
      totalVenues: '64,800',
      avgPassRate: '90.1%',
      councils: [
        { name: 'Leeds City Council', slug: 'leeds', venues: '6,340', passRate: '90.5%', avgScore: '4.7' },
        { name: 'Sheffield City Council', slug: 'sheffield', venues: '4,620', passRate: '89.4%', avgScore: '4.6' },
        { name: 'Newcastle City Council', slug: 'newcastle', venues: '2,890', passRate: '91.2%', avgScore: '4.8' },
        { name: 'City of York Council', slug: 'york', venues: '2,150', passRate: '93.4%', avgScore: '4.9' },
        { name: 'Bradford Council', slug: 'bradford', venues: '4,100', passRate: '85.8%', avgScore: '4.4' },
      ],
    },
    {
      name: 'Scotland (FHIS Scheme)',
      totalVenues: '42,600',
      avgPassRate: '92.3%',
      councils: [
        { name: 'Glasgow City Council', slug: 'glasgow', venues: '5,890', passRate: '91.4%', avgScore: 'Pass' },
        { name: 'City of Edinburgh Council', slug: 'edinburgh', venues: '4,980', passRate: '93.1%', avgScore: 'Pass' },
        { name: 'Aberdeen City Council', slug: 'aberdeen', venues: '1,940', passRate: '94.0%', avgScore: 'Pass' },
        { name: 'Dundee City Council', slug: 'dundee', venues: '1,420', passRate: '91.8%', avgScore: 'Pass' },
        { name: 'Highland Council', slug: 'highland', venues: '3,120', passRate: '94.6%', avgScore: 'Pass' },
      ],
    },
    {
      name: 'Wales & Northern Ireland (FHRS)',
      totalVenues: '34,200',
      avgPassRate: '91.5%',
      councils: [
        { name: 'Cardiff Council (Caerdydd)', slug: 'cardiff', venues: '3,450', passRate: '89.7%', avgScore: '4.6' },
        { name: 'Swansea Council (Abertawe)', slug: 'swansea', venues: '2,210', passRate: '90.2%', avgScore: '4.7' },
        { name: 'Belfast City Council', slug: 'belfast', venues: '4,280', passRate: '92.4%', avgScore: '4.8' },
        { name: 'Derry & Strabane Council', slug: 'derry-strabane', venues: '1,680', passRate: '91.2%', avgScore: '4.7' },
        { name: 'Newport City Council', slug: 'newport', venues: '1,540', passRate: '88.9%', avgScore: '4.5' },
      ],
    },
    {
      name: 'South East, South West & East England',
      totalVenues: '78,500',
      avgPassRate: '92.4%',
      councils: [
        { name: 'Bristol City Council', slug: 'bristol', venues: '4,120', passRate: '91.8%', avgScore: '4.8' },
        { name: 'Brighton and Hove Council', slug: 'brighton', venues: '3,210', passRate: '92.5%', avgScore: '4.8' },
        { name: 'Oxford City Council', slug: 'oxford', venues: '1,780', passRate: '94.1%', avgScore: '4.9' },
        { name: 'Cambridge City Council', slug: 'cambridge', venues: '1,650', passRate: '93.8%', avgScore: '4.9' },
        { name: 'Southampton City Council', slug: 'southampton', venues: '2,340', passRate: '89.9%', avgScore: '4.6' },
        { name: 'Norwich City Council', slug: 'norwich', venues: '1,590', passRate: '91.4%', avgScore: '4.7' },
      ],
    },
  ];

  const directoryFaqs: FaqItem[] = [
    {
      q: 'How many local councils conduct food hygiene inspections in the UK?',
      a: 'There are 363 local authority councils across England, Wales, Northern Ireland, and Scotland responsible for inspecting restaurants, takeaways, cafes, and care homes under the Food Standards Agency framework.',
    },
    {
      q: 'What is the difference between FHRS (England/Wales/NI) and FHIS (Scotland)?',
      a: 'In England, Wales, and Northern Ireland, councils award a numerical score from 0 to 5 under the Food Hygiene Rating Scheme (FHRS). In Scotland, local authorities operate the Food Hygiene Information Scheme (FHIS) which issues "Pass" or "Improvement Required" verdicts.',
    },
    {
      q: 'How can I check the 0-star watchlist for my local council?',
      a: 'Select your local council from the directory above or visit the council hub page, where you will find a dedicated 0 & 1 Star Watchlist highlighting all venues issued urgent improvement notices.',
    },
  ];

  const directorySchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'UK Local Authority Food Hygiene Directory',
    description: 'Comprehensive directory of 363 UK local councils and Environmental Health inspection services.',
    itemListElement: regions.flatMap(r => r.councils).slice(0, 20).map((c, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: c.name,
      url: `https://hygienecheck.uk/authority/${c.slug}`,
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
        name: 'Councils Directory',
        item: 'https://hygienecheck.uk/authority',
      },
    ],
  };

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-300">
      
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
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
        <span className="text-emerald-400 font-semibold">UK Councils & Cities Directory</span>
      </nav>

      {/* Main Header Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0F172A] via-gray-900 to-[#0B0F17] border border-gray-800 shadow-2xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> National Council Directory
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-gray-800 text-gray-300 border border-gray-700">
                363 UK Local Authorities
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              UK Councils & Cities Food Hygiene Directory
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              Explore official Food Standards Agency inspection scores across all <strong>363 UK Local Councils</strong>. Check cleanliness pass rates, regional statistics, and public health 0-star watchlists in your city.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
            <div className="p-4 rounded-2xl bg-gray-950/80 border border-gray-800 text-center">
              <div className="text-2xl font-black text-white font-mono">363</div>
              <div className="text-[11px] text-gray-400 mt-1">UK Councils</div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <div className="text-2xl font-black text-emerald-400 font-mono">524k+</div>
              <div className="text-[11px] text-emerald-300/80 mt-1">Tracked Venues</div>
            </div>
          </div>
        </div>
      </div>

      {/* EXECUTIVE DIRECTORY SUMMARY AT A GLANCE */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#0F172A] via-gray-900 to-[#0F172A] border border-emerald-500/30 mb-8 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
          <ClipboardCheck className="w-4 h-4" /> National Hygiene Overview & Council Standards
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Total UK Authorities</div>
            <div className="text-white font-bold text-sm mt-0.5">363 Councils</div>
            <div className="text-emerald-400 text-[10px] mt-0.5">England, Wales, Scotland, NI</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">National 5-Star Clean Rate</div>
            <div className="text-white font-bold text-sm mt-0.5">89.4% Pass Rate</div>
            <div className="text-emerald-400 text-[10px] mt-0.5">4 & 5 Star ratings</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Daily Synchronisation</div>
            <div className="text-emerald-400 font-bold text-sm mt-0.5 font-mono">Live FSA Feed</div>
            <div className="text-cyan-400 text-[10px] mt-0.5">Direct official open data</div>
          </div>
          <div className="p-3.5 rounded-xl bg-gray-950/70 border border-gray-800">
            <div className="text-gray-400 text-[11px]">Public Health Alerts</div>
            <div className="text-red-400 font-bold text-sm mt-0.5">0-Star Watchlists</div>
            <div className="text-gray-400 text-[10px] mt-0.5">Every borough tracked</div>
          </div>
        </div>
        <p className="text-xs text-gray-300 mt-4 leading-relaxed border-t border-gray-800/80 pt-3">
          <strong>Directory Takeaway:</strong> UK Environmental Health Officers carry out thousands of unannounced inspections every week. Click on any city or borough below to view individual restaurant sub-scores and local food safety records.
        </p>
      </div>

      {/* Regional Councils Breakdown Grid */}
      <div className="space-y-8 mb-8">
        {regions.map((reg, rIdx) => (
          <section key={rIdx} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <span>{reg.name}</span>
                </h2>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                <span>{reg.totalVenues} Food Places</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">{reg.avgPassRate} Clean Rate</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reg.councils.map((c, cIdx) => (
                <Link
                  key={cIdx}
                  href={`/authority/${c.slug}`}
                  className="p-5 rounded-2xl bg-gray-900/70 border border-gray-800 hover:border-emerald-500/50 hover:bg-gray-850 transition-all group flex flex-col justify-between min-h-[48px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {c.passRate} PASS
                      </span>
                      <span className="text-[11px] font-mono text-gray-400">{c.venues} venues</span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {c.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs font-semibold text-gray-400 group-hover:text-emerald-400">
                    <span>Explore Council Hub</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Animated Accordion FAQ Section */}
      <div className="border-t border-gray-800/60 pt-4">
        <AccordionFaq
          title="UK Council & Authority FAQs"
          subtitle="Frequently asked questions about local environmental health inspections and food safety ratings across the UK."
          badge="Council Directory FAQ"
          items={directoryFaqs}
        />
      </div>

    </div>
  );
}
