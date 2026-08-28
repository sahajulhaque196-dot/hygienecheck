'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertTriangle, Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export const RecentInspectionsFeed = () => {
  const [activeTab, setActiveTab] = useState<'top' | 'alerts' | 'new'>('top');

  const topRated = [
    { name: 'The Ivy Market Grill', type: 'Restaurant', city: 'Covent Garden, London', postcode: 'WC2E 8PB', score: 5, date: '18 Aug 2026', slug: 'the-ivy-market-grill-wc2e-8pb-100234' },
    { name: 'Dishoom Covent Garden', type: 'Restaurant', city: 'Camden, London', postcode: 'WC2H 9FB', score: 5, date: '16 Aug 2026', slug: 'dishoom-covent-garden-wc2h-9fb-109382' },
    { name: 'Archies Burgers & Shakes', type: 'Takeaway', city: 'Oxford Road, Manchester', postcode: 'M1 7ED', score: 5, date: '14 Aug 2026', slug: 'archies-burgers-m1-7ed-108492' },
    { name: 'Bundobust Street Food', type: 'Restaurant/Bar', city: 'Mill Hill, Leeds', postcode: 'LS1 5DQ', score: 5, date: '12 Aug 2026', slug: 'bundobust-ls1-5dq-105829' },
  ];

  const recentAlerts = [
    { name: 'Al Sulaymaniyah Restaurant', type: 'Restaurant', city: 'Edgware Road, London', postcode: 'W2 1EB', score: 1, date: '15 Aug 2026', issue: 'Kitchen needs deep cleaning & new paperwork', slug: 'al-sulaymaniyah-w2-1eb-1898885' },
    { name: 'Grand Spice Balti House', type: 'Takeaway', city: 'Station Road, London', postcode: 'NW1 8TR', score: 0, date: '11 Aug 2026', issue: 'Urgent pest proofing & food storage fixes needed', slug: 'grand-spice-nw1-8tr-1928412' },
    { name: 'Golden Ocean Express', type: 'Takeaway', city: 'Queensway, London', postcode: 'W2 4QJ', score: 1, date: '09 Aug 2026', issue: 'Hand-washing sinks had no hot running water', slug: 'golden-ocean-w2-4qj-1837192' },
  ];

  const newVenues = [
    { name: 'Gail’s Artisan Bakery', type: 'Bakery/Cafe', city: 'Victoria Street, London', postcode: 'SW1E 5ND', status: 'Awaiting Inspection', date: 'Registered Aug 2026', slug: 'gails-bakery-sw1e-5nd-109842' },
    { name: 'Chaiiwala Express', type: 'Cafe/Takeaway', city: 'Digbeth, Birmingham', postcode: 'B5 6DY', status: 'Awaiting Inspection', date: 'Registered Aug 2026', slug: 'chaiiwala-b5-6dy-109843' },
  ];

  return (
    <section className="py-10 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Live Council Updates
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Recently Inspected Food Places
          </h2>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 mt-4 md:mt-0 p-1 rounded-xl bg-gray-950 border border-gray-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('top')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'top' ? 'bg-emerald-500 text-gray-950 shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            ⭐ Top 5-Stars
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('alerts')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'alerts' ? 'bg-red-500 text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚠️ 0 & 1 Star Warnings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('new')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'new' ? 'bg-cyan-500 text-gray-950 shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            🆕 Newly Opened
          </button>
        </div>
      </div>

      {/* Feed Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeTab === 'top' &&
          topRated.map((item, i) => (
            <Link
              key={i}
              href={`/hygiene-rating/${item.slug}`}
              className="p-5 rounded-2xl bg-gray-900/70 border border-emerald-500/30 hover:bg-gray-850 hover:border-emerald-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    RATING 5 (VERY GOOD)
                  </span>
                  <span className="text-[11px] font-mono text-gray-500">{item.date}</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                  <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{item.city}</span>
                </div>
                <div className="text-[11px] font-mono text-gray-400 mt-1">
                  {item.postcode} • {item.type}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-[11px] font-semibold text-emerald-400">
                <span>View Full Report</span>
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}

        {activeTab === 'alerts' &&
          recentAlerts.map((item, i) => (
            <Link
              key={i}
              href={`/hygiene-rating/${item.slug}`}
              className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 hover:bg-red-950/30 hover:border-red-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
                    RATING {item.score} (WARNING)
                  </span>
                  <span className="text-[11px] font-mono text-gray-500">{item.date}</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                  <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
                  <span className="truncate">{item.city}</span>
                </div>
                <div className="text-[11px] text-red-400/90 mt-2 font-medium">
                  {item.issue}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-[11px] font-semibold text-red-400">
                <span>View Officer Notes</span>
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}

        {activeTab === 'new' &&
          newVenues.map((item, i) => (
            <Link
              key={i}
              href={`/hygiene-rating/${item.slug}`}
              className="p-5 rounded-2xl bg-gray-900/70 border border-cyan-500/30 hover:bg-gray-850 hover:border-cyan-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
                    NEW FOOD PLACE
                  </span>
                  <span className="text-[11px] font-mono text-gray-500">{item.date}</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                  <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{item.city}</span>
                </div>
                <div className="text-[11px] text-gray-400 mt-1 font-mono">
                  {item.status}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-[11px] font-semibold text-cyan-400">
                <span>Track Venue</span>
                <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};
