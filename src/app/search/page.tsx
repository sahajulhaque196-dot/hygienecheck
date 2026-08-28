import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Search, MapPin, Building2, AlertTriangle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { searchEstablishments } from '@/lib/db/queries';

export const metadata: Metadata = {
  title: 'Search UK Food Hygiene Ratings | HygieneCheck.uk',
  description: 'Search official food hygiene inspection ratings for over 520,000 UK restaurants, takeaways, cafes, and food businesses.',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() || '';

  const results = query ? await searchEstablishments(query, 30) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 min-h-[70vh]">
      {/* Search Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Search className="w-3.5 h-3.5" />
          <span>FSA Live National Database</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Food Hygiene Search Results
        </h1>
        <p className="text-sm text-gray-400">
          {query ? `Showing inspection records matching "${query}"` : 'Search by restaurant name, town, or postcode'}
        </p>

        {/* Search Bar */}
        <form
          action="/search"
          method="GET"
          className="relative flex items-center p-2 rounded-2xl bg-gray-900/90 border border-gray-700/80 shadow-2xl focus-within:border-emerald-500 transition-all max-w-2xl mx-auto"
        >
          <Search className="w-5 h-5 text-emerald-400 ml-3 mr-2 flex-shrink-0" />
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Type restaurant name, town, or postcode (e.g., Dishoom, SW1A, Leeds)..."
            className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none pr-3 min-h-[44px]"
          />
          <button
            type="submit"
            className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all min-h-[44px]"
          >
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Results Count */}
      {query && (
        <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6 text-xs text-gray-400 font-mono">
          <span>Found {results.length} results for "{query}"</span>
          <span>Official UK Food Standards Agency Data</span>
        </div>
      )}

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((venue) => {
            const isTop = venue.ratingValue === '5';
            const isFailed = venue.ratingValue === '0' || venue.ratingValue === '1' || venue.ratingValue === 'Improvement Required';

            return (
              <Link
                key={venue.id}
                href={`/hygiene-rating/${venue.slug}`}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between group ${
                  isFailed
                    ? 'bg-red-950/20 border-red-500/30 hover:border-red-400 hover:bg-red-950/30'
                    : isTop
                    ? 'bg-gray-900/80 border-emerald-500/30 hover:border-emerald-400 hover:bg-gray-850'
                    : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${
                        isTop
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

                  <h2 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {venue.businessName}
                  </h2>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1.5">
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

                <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-xs font-semibold text-emerald-400">
                  <span>View Official Inspection Report</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : query ? (
        <div className="text-center py-16 space-y-4 max-w-md mx-auto">
          <div className="p-4 rounded-full bg-gray-900 w-16 h-16 mx-auto flex items-center justify-center text-gray-400 border border-gray-800">
            <Search className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-white">No Establishments Found</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            We couldn't find any food business matching "{query}". Try searching by just the postcode (e.g. "SW1A") or council name.
          </p>
          <div className="pt-2">
            <Link
              href="/authority"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold hover:bg-emerald-500/20"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Browse All UK Councils</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 space-y-3">
          <p className="text-sm text-gray-400">Enter a query above or browse major UK councils:</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto pt-2">
            {['London', 'Birmingham', 'Manchester', 'Glasgow', 'Leeds', 'Edinburgh', 'Liverpool', 'Bristol'].map(
              (city) => (
                <Link
                  key={city}
                  href={`/authority/${city.toLowerCase()}`}
                  className="px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-300 hover:text-white hover:border-emerald-500/40 transition-all"
                >
                  {city}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
