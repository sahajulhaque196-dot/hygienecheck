import React from 'react';
import type { Metadata } from 'next';
import { HeroVisualCard } from '@/components/ui/HeroVisualCard';
import { LiveRadarTicker } from '@/components/ui/LiveRadarTicker';
import { RecentInspectionsFeed } from '@/components/ui/RecentInspectionsFeed';
import { CategoryGrid } from '@/components/ui/CategoryGrid';
import { BentoFeatures } from '@/components/ui/BentoFeatures';
import { PostcodeDirectoryGrid } from '@/components/ui/PostcodeDirectoryGrid';
import { InspectionPillars } from '@/components/ui/InspectionPillars';
import { FaqSection } from '@/components/ui/FaqSection';
import { Search, ShieldCheck, ArrowRight, Sparkles, Command } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'HygieneCheck.uk | Official UK Food Hygiene Ratings & Inspection Scores',
  description: 'Check before you eat. Instant official FSA hygiene ratings for 520,000+ UK takeaways & restaurants — see sub-scores, inspection dates & 0-star warnings. Free.',
  alternates: {
    canonical: 'https://hygienecheck.uk',
  },
  openGraph: {
    title: 'HygieneCheck.uk | Official UK Food Hygiene Intelligence',
    description: 'Check official food hygiene ratings and kitchen cleanliness scores for 520,000+ UK food places.',
    url: 'https://hygienecheck.uk',
    siteName: 'HygieneCheck.uk',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HygieneCheck.uk | Check Food Hygiene Ratings Before You Eat',
    description: 'Search official food hygiene ratings and inspection reports for 520,000+ UK takeaways and restaurants.',
  },
};

export default function HomePage() {
  const homeBreadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hygienecheck.uk',
      },
    ],
  };

  return (
    <div className="relative overflow-hidden">
      {/* Google Sitelinks Searchbox & Breadcrumbs Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumbSchema) }}
      />

      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* ========================================================
          SCREEN 1: FULL-VIEWPORT HERO SECTION
          ======================================================== */}
      <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between relative">
        
        {/* Main Hero Container */}
        <section className="flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            
            {/* Left Column: Simple Words, High-Conversion Search */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Official UK Food Hygiene Ratings (FSA Open Data)</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-sans">
                Check Before <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  You Order Food.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Is your local takeaway clean? Check official food hygiene scores for every restaurant, takeaway, cafe, and care home in the UK before eating.
              </p>

              {/* Main Search Input Form */}
              <div className="pt-2 max-w-xl mx-auto lg:mx-0">
                <form 
                  action="/search" 
                  method="GET"
                  className="relative flex items-center p-2 rounded-2xl bg-gray-900/90 border border-gray-700/80 shadow-2xl backdrop-blur-xl focus-within:border-emerald-500/80 transition-all group"
                >
                  <Search className="w-5 h-5 text-emerald-400 ml-3 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    name="q"
                    placeholder="Type takeaway name, town, or postcode (e.g. SW1A, Nandos, Leeds)..."
                    className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none pr-3 min-h-[44px]"
                  />
                  <div className="hidden sm:flex items-center gap-1 mr-2 px-2 py-1 rounded bg-gray-800 text-[10px] font-mono text-gray-400 border border-gray-700">
                    <Command className="w-3 h-3" />
                    <span>K</span>
                  </div>
                  <button
                    type="submit"
                    className="flex-shrink-0 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 transition-all min-h-[44px]"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Quick Suggestions Chips */}
                <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-gray-400 justify-center lg:justify-start">
                  <span className="font-mono text-gray-400">Popular:</span>
                  <Link href="/hygiene-rating/the-ivy-market-grill-wc2e-8pb-100234" className="hover:text-emerald-400 underline decoration-gray-700">The Ivy London</Link>
                  <span>•</span>
                  <Link href="/postcode/sw1a" className="hover:text-emerald-400 underline decoration-gray-700">SW1A Postcode</Link>
                  <span>•</span>
                  <Link href="/authority/birmingham/0-star" className="hover:text-red-400 underline decoration-gray-700 text-red-400/90 font-medium">Birmingham 0-Star List</Link>
                </div>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-gray-800/80 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-xl font-bold text-white font-mono">520,000+</div>
                  <div className="text-xs text-gray-400">UK Food Places</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-emerald-400 font-mono">Daily Updates</div>
                  <div className="text-xs text-gray-400">From Local Councils</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-cyan-400 font-mono">100% Free</div>
                  <div className="text-xs text-gray-400">For Everyone</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card with Continuous Color-Changing Glow */}
            <div className="lg:col-span-6 flex justify-center">
              <HeroVisualCard />
            </div>

          </div>
        </section>

        {/* Live Radar Marquee Ticker */}
        <div className="w-full pb-6">
          <LiveRadarTicker />
        </div>

      </div>

      {/* ========================================================
          SECTION 2: RECENTLY INSPECTED UK VENUES (DYNAMIC FEED)
          ======================================================== */}
      <div className="border-t border-gray-800/60">
        <RecentInspectionsFeed />
      </div>

      {/* ========================================================
          SECTION 3: BROWSE BY OFFICIAL FSA BUSINESS CATEGORIES
          ======================================================== */}
      <div className="border-t border-gray-800/60">
        <CategoryGrid />
      </div>

      {/* ========================================================
          SECTION 4: CITY HUBS & 0-STAR WATCHLIST BENTO GRID
          ======================================================== */}
      <div className="border-t border-gray-800/60">
        <BentoFeatures />
      </div>

      {/* ========================================================
          SECTION 5: HYPERLOCAL UK POSTCODE DIRECTORY
          ======================================================== */}
      <div className="border-t border-gray-800/60">
        <PostcodeDirectoryGrid />
      </div>

      {/* ========================================================
          SECTION 6: HOW RATINGS WORK & 3 PILLARS BREAKDOWN
          ======================================================== */}
      <div className="border-t border-gray-800/60">
        <InspectionPillars />
      </div>

      {/* ========================================================
          SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQ SCHEMA)
          ======================================================== */}
      <div className="border-t border-gray-800/60">
        <FaqSection />
      </div>
    </div>
  );
}
