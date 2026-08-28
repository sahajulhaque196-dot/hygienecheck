import React from 'react';
import Link from 'next/link';
import { 
  Building2, AlertTriangle, ArrowRight 
} from 'lucide-react';

export const BentoFeatures = () => {
  const majorCities = [
    { name: 'London', venues: '54,200+ places', passRate: '88% Pass', slug: 'london', color: 'from-emerald-500/20 to-teal-500/10' },
    { name: 'Birmingham', venues: '12,400+ places', passRate: '78% Pass', slug: 'birmingham', color: 'from-blue-500/20 to-indigo-500/10' },
    { name: 'Manchester', venues: '8,900+ places', passRate: '82% Pass', slug: 'manchester', color: 'from-purple-500/20 to-pink-500/10' },
    { name: 'Leeds', venues: '7,100+ places', passRate: '86% Pass', slug: 'leeds', color: 'from-cyan-500/20 to-teal-500/10' },
    { name: 'Glasgow', venues: '6,400+ places', passRate: '91% Pass', slug: 'glasgow', color: 'from-teal-500/20 to-emerald-500/10' },
    { name: 'Liverpool', venues: '5,800+ places', passRate: '81% Pass', slug: 'liverpool', color: 'from-amber-500/20 to-orange-500/10' },
  ];

  return (
    <section className="py-10 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
          363 UK Local Authority Silos
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Explore Food Hygiene by City & Borough
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          Every local council environmental health team publishes official inspection scores. Select your city to see 5-star leaders and public health warnings.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Large Feature 1: London Authority Hub (7 Cols) */}
        <div className="md:col-span-7 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0F172A] via-gray-900 to-[#0B0F17] border border-gray-800 flex flex-col justify-between relative overflow-hidden group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" /> 33 London Boroughs
              </span>
              <span className="text-xs font-mono text-gray-400">Updated Today</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Greater London Food Hygiene Authority
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
              Track 54,000+ restaurants, takeaways, and street food markets across Westminster, Camden, Kensington, Hackney, and Greenwich.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-gray-950/80 border border-gray-800">
                <div className="text-sm font-bold text-white font-mono">54,200+</div>
                <div className="text-[11px] text-gray-400">Total Venues</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-950/80 border border-gray-800">
                <div className="text-sm font-bold text-emerald-400 font-mono">88.4%</div>
                <div className="text-[11px] text-gray-400">Pass Rate</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-950/80 border border-gray-800">
                <div className="text-sm font-bold text-cyan-400 font-mono">33 Boroughs</div>
                <div className="text-[11px] text-gray-400">Councils</div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
            <Link
              href="/authority/london"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
            >
              <span>Explore London Authority Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Feature 2: 0 & 1 Star Public Health Watchlist (5 Cols) */}
        <div className="md:col-span-5 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-red-950/30 via-gray-900 to-[#0B0F17] border border-red-500/30 flex flex-col justify-between relative overflow-hidden group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Public Health Watchlist
              </span>
              <span className="text-[11px] font-mono text-red-400 font-bold">URGENT</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              0 & 1 Star Warning Alerts
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Find out which restaurants and takeaways in your city were served urgent improvement notices by health inspectors.
            </p>
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200">
              <strong>Why venues get 0 stars:</strong> Evidence of pests, lack of hot water, cross-contamination, or dangerous food storage temperatures.
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
            <Link
              href="/authority/london/0-star"
              className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5"
            >
              <span>View 0-Star Failed Places</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Small City Cards Grid (6 Cities) */}
        {majorCities.map((city, idx) => (
          <Link
            key={idx}
            href={`/authority/${city.slug}`}
            className="md:col-span-4 p-5 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-emerald-500/40 hover:bg-gray-850 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {city.name}
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {city.passRate}
                </span>
              </div>
              <div className="text-xs text-gray-400 font-mono">{city.venues}</div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400 group-hover:text-emerald-400">
              <span>View Council Hub</span>
              <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}

      </div>
    </section>
  );
};
