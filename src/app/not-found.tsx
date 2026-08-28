import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Search, Home, Building2, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found (404) | HygieneCheck.uk',
  description: 'The food hygiene rating or page you requested could not be found. Search official UK hygiene scores for over 520,000 restaurants and takeaways.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>404 Food Hygiene Record Lookup</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Page Not Found
        </h1>

        <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
          The establishment or page you requested might have been renamed, closed, or moved to an updated inspection record.
        </p>

        {/* Quick Search Trigger */}
        <div className="pt-2">
          <form
            action="/search"
            method="GET"
            className="relative flex items-center p-2 rounded-2xl bg-gray-900 border border-gray-700 shadow-2xl focus-within:border-emerald-500 transition-all max-w-md mx-auto"
          >
            <Search className="w-5 h-5 text-emerald-400 ml-3 mr-2 flex-shrink-0" />
            <input
              type="text"
              name="q"
              placeholder="Search takeaway, town, or postcode..."
              className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none pr-3 min-h-[44px]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs flex items-center gap-1 min-h-[44px]"
            >
              <span>Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Navigation Recovery Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 text-xs font-semibold">
          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all flex items-center gap-1.5 min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/authority"
            className="px-4 py-2.5 rounded-xl bg-gray-900 text-gray-300 border border-gray-800 hover:bg-gray-800 hover:text-white transition-all flex items-center gap-1.5 min-h-[44px]"
          >
            <Building2 className="w-4 h-4" />
            <span>Browse UK Councils</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
