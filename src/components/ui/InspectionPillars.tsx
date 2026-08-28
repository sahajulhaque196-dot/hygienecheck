import React from 'react';
import { Utensils, Building2, Scale, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const InspectionPillars = () => {
  const pillars = [
    {
      title: '1. Food Handling',
      score: '0 to 25 pts',
      icon: Utensils,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      desc: 'How food is prepared, cooked, chilled, reheated, and stored safely without contamination.',
    },
    {
      title: '2. Kitchen Building',
      score: '0 to 25 pts',
      icon: Building2,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10',
      border: 'border-teal-500/20',
      desc: 'Cleanliness of prep tables, floors, ventilation, hot water supply, and pest control proofing.',
    },
    {
      title: '3. Management Logs',
      score: '0 to 30 pts',
      icon: Scale,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      desc: 'Food safety diary records (SFBB), staff allergen training certificates, and temperature logs.',
    },
  ];

  return (
    <section className="py-10 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0F172A] via-gray-900 to-[#0B0F17] border border-gray-800 relative overflow-hidden shadow-2xl">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Scoring Mathematics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How UK Hygiene Ratings (0 to 5) Are Calculated
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
              When government health officers inspect a restaurant, they do not just guess a score. They grade 3 separate areas. A lower score means cleaner conditions (0 points is the best score).
            </p>
          </div>

          <Link
            href="/about"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-950 hover:bg-gray-800 text-white border border-gray-700 text-xs font-bold transition-all shadow-md min-h-[44px]"
          >
            <span>Read Full Scoring Science</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gray-950/70 border border-gray-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`p-2.5 rounded-xl ${p.bg} ${p.border} ${p.color} border`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-400">
                      {p.score}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{p.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
