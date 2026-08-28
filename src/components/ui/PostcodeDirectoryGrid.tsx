'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Search, ArrowRight, Navigation } from 'lucide-react';

export const PostcodeDirectoryGrid = () => {
  const [filterQuery, setFilterQuery] = useState('');

  const featuredOutcodes = [
    { code: 'SW1', area: 'Westminster, Victoria & Belgravia', count: '1,420 venues', slug: 'sw1a' },
    { code: 'WC2', area: 'Covent Garden, Holborn & Strand', count: '980 venues', slug: 'wc2e' },
    { code: 'W1', area: 'Mayfair, Soho & Marylebone', count: '2,150 venues', slug: 'w1' },
    { code: 'E1', area: 'Whitechapel, Brick Lane & Shoreditch', count: '1,890 venues', slug: 'e1' },
    { code: 'B1', area: 'Birmingham City Centre & Broad St', count: '840 venues', slug: 'b1' },
    { code: 'B21', area: 'Handsworth & Soho Road, Birmingham', count: '520 venues', slug: 'b21' },
    { code: 'M1', area: 'Manchester Piccadilly & Chinatown', count: '920 venues', slug: 'm1' },
    { code: 'M4', area: 'Northern Quarter & Ancoats, MCR', count: '760 venues', slug: 'm4' },
    { code: 'LS1', area: 'Leeds City Centre & Financial District', count: '810 venues', slug: 'ls1' },
    { code: 'G1', area: 'Glasgow Merchant City & George Sq', count: '740 venues', slug: 'g1' },
    { code: 'L1', area: 'Liverpool ONE & Ropewalks', count: '690 venues', slug: 'l1' },
    { code: 'BS1', area: 'Bristol Harbourside & Old City', count: '580 venues', slug: 'bs1' },
  ];

  const filtered = featuredOutcodes.filter(
    (item) =>
      item.code.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.area.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <section className="py-10 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5" /> 3,000+ UK Postcode Silos
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Check Food Ratings in Your Postcode
          </h2>
        </div>

        {/* Live Filter Input */}
        <div className="mt-4 md:mt-0 relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter postcode (e.g. SW1, M1, Leeds)..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-950 border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Grid of Postcode Outcodes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {filtered.map((item, idx) => (
          <Link
            key={idx}
            href={`/postcode/${item.slug}`}
            className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-emerald-500/40 hover:bg-gray-850 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-black font-mono text-emerald-400 group-hover:text-white transition-colors">
                {item.code}
              </span>
              <span className="text-[11px] font-mono text-gray-400">
                {item.count}
              </span>
            </div>
            <div className="text-xs text-gray-300 font-medium mt-1 line-clamp-1">
              {item.area}
            </div>
            <div className="mt-2.5 pt-2 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400 group-hover:text-emerald-400">
              <span>View Directory</span>
              <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
