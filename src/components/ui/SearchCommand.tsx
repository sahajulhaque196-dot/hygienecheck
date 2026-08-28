'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Store, ArrowRight, X, AlertTriangle, Building2, Navigation } from 'lucide-react';
import Link from 'next/link';

export const SearchCommand = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const sampleResults = [
    { title: 'The Ivy Market Grill', type: 'Venue (Rating 5)', meta: 'Covent Garden, WC2E 8PB', href: '/hygiene-rating/the-ivy-market-grill-wc2e-8pb-100234', category: 'venue' },
    { title: 'Dishoom Covent Garden', type: 'Venue (Rating 5)', meta: '12 Upper St Martin\'s Ln, WC2H 9FB', href: '/hygiene-rating/dishoom-covent-garden-wc2h-9fb-109382', category: 'venue' },
    { title: 'Golden Ocean Express', type: 'Venue (Rating 1 - Warning)', meta: '19 Queensway, London, W2 4QJ', href: '/hygiene-rating/golden-ocean-w2-4qj-1837192', category: 'warning' },
    { title: 'Grand Spice Balti & Grill', type: 'Venue (Rating 0 - Urgent)', meta: '84 Station Road, NW1 8TR', href: '/hygiene-rating/grand-spice-nw1-8tr-1928412', category: 'warning' },
    { title: 'London (Westminster City Council)', type: 'Local Authority', meta: '5,722 Establishments', href: '/authority/london', category: 'authority' },
    { title: 'Birmingham City Council', type: 'Local Authority', meta: '8,420 Establishments', href: '/authority/birmingham', category: 'authority' },
    { title: 'Manchester City Council', type: 'Local Authority', meta: '6,180 Establishments', href: '/authority/manchester', category: 'authority' },
    { title: 'Leeds City Council', type: 'Local Authority', meta: '6,340 Establishments', href: '/authority/leeds', category: 'authority' },
    { title: 'Glasgow City Council', type: 'Local Authority (FHIS)', meta: '5,890 Establishments (Scotland)', href: '/authority/glasgow', category: 'authority' },
    { title: 'City of Edinburgh Council', type: 'Local Authority (FHIS)', meta: '4,980 Establishments (Scotland)', href: '/authority/edinburgh', category: 'authority' },
    { title: 'Cardiff Council (Caerdydd)', type: 'Local Authority', meta: '3,450 Establishments (Wales)', href: '/authority/cardiff', category: 'authority' },
    { title: 'Belfast City Council', type: 'Local Authority', meta: '4,280 Establishments (Northern Ireland)', href: '/authority/belfast', category: 'authority' },
    { title: 'London 0 & 1 Star Watchlist', type: 'Public Health Watchlist', meta: 'Urgent Improvement Notices', href: '/authority/london/0-star', category: 'warning' },
    { title: 'Birmingham 0-Star Watchlist', type: 'Public Health Watchlist', meta: 'Failed Inspections List', href: '/authority/birmingham/0-star', category: 'warning' },
    { title: 'SW1A (Westminster/Whitehall)', type: 'Postcode Outcode', meta: '142 Venues (London)', href: '/postcode/sw1a', category: 'postcode' },
    { title: 'WC2E (Covent Garden Central)', type: 'Postcode Outcode', meta: '210 Venues (London)', href: '/postcode/wc2e', category: 'postcode' },
    { title: 'M1 (Manchester Central)', type: 'Postcode Outcode', meta: '920 Venues (Manchester)', href: '/postcode/m1', category: 'postcode' },
    { title: 'B1 (Birmingham City Centre)', type: 'Postcode Outcode', meta: '840 Venues (Birmingham)', href: '/postcode/b1', category: 'postcode' },
    { title: 'LS1 (Leeds Financial District)', type: 'Postcode Outcode', meta: '810 Venues (Leeds)', href: '/postcode/ls1', category: 'postcode' },
    { title: 'EH1 (Edinburgh Old Town)', type: 'Postcode Outcode', meta: '480 Venues (Scotland)', href: '/postcode/eh1', category: 'postcode' },
    { title: 'CF10 (Cardiff Bay & City Centre)', type: 'Postcode Outcode', meta: '360 Venues (Wales)', href: '/postcode/cf10', category: 'postcode' },
    { title: 'BT1 (Belfast City Centre)', type: 'Postcode Outcode', meta: '410 Venues (Northern Ireland)', href: '/postcode/bt1', category: 'postcode' },
  ];

  const filtered = query.trim() === ''
    ? sampleResults
    : sampleResults.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.meta.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('open-search', handleOpen);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-search', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/80 backdrop-blur-md"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-[#0F172A] border border-gray-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-800 bg-gray-950/60">
          <Search className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search venue, city, council, or postcode (e.g. SW1A, London, Nandos)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none min-h-[40px]"
          />
          <button 
            type="button"
            onClick={() => setIsOpen(false)} 
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Close search modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1 divide-y divide-gray-800/40">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-400">
              No direct matches found for &quot;<span className="text-white font-semibold">{query}</span>&quot;. Try searching for a UK postcode (e.g. SW1A) or city name (e.g. London).
            </div>
          ) : (
            filtered.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-800/80 transition-colors group min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-gray-950 border ${
                    item.category === 'warning'
                      ? 'border-red-500/30 text-red-400'
                      : item.category === 'authority'
                      ? 'border-cyan-500/30 text-cyan-400'
                      : 'border-gray-800 text-gray-400 group-hover:text-emerald-400'
                  } transition-colors flex-shrink-0`}>
                    {item.category === 'warning' ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : item.category === 'authority' ? (
                      <Building2 className="w-4 h-4" />
                    ) : item.category === 'postcode' ? (
                      <Navigation className="w-4 h-4" />
                    ) : (
                      <Store className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-400">{item.meta}</div>
                  </div>
                </div>
                <span className={`text-[11px] font-mono ${
                  item.category === 'warning' ? 'text-red-400' : 'text-gray-400 group-hover:text-emerald-400'
                } flex items-center gap-1 flex-shrink-0 ml-2`}>
                  {item.type} <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-gray-950 border-t border-gray-800 text-[11px] text-gray-400 flex justify-between items-center">
          <span>Official UK FSA Open Data (520,000+ Records)</span>
          <span>Press <kbd className="px-1.5 py-0.5 bg-gray-800 text-gray-300 rounded border border-gray-700 font-mono">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
