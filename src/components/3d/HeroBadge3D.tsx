'use client';

import React, { useState, useRef } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const HeroBadge3D = () => {
  const [activeScore, setActiveScore] = useState<number>(5);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.05);
    setRotateY(x * 0.05);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const getScoreTheme = (score: number) => {
    switch (score) {
      case 5: return { border: 'border-emerald-500/40', text: 'text-emerald-400', badge: 'bg-emerald-500', glow: 'shadow-emerald-500/20' };
      case 4: return { border: 'border-teal-500/40', text: 'text-teal-400', badge: 'bg-teal-500', glow: 'shadow-teal-500/20' };
      case 3: return { border: 'border-amber-500/40', text: 'text-amber-400', badge: 'bg-amber-500', glow: 'shadow-amber-500/20' };
      case 2:
      case 1: return { border: 'border-orange-500/40', text: 'text-orange-400', badge: 'bg-orange-500', glow: 'shadow-orange-500/20' };
      case 0: return { border: 'border-red-500/50', text: 'text-red-400', badge: 'bg-red-600', glow: 'shadow-red-500/30' };
      default: return { border: 'border-emerald-500/40', text: 'text-emerald-400', badge: 'bg-emerald-500', glow: 'shadow-emerald-500/20' };
    }
  };

  const theme = getScoreTheme(activeScore);

  return (
    <div className="relative w-full max-w-lg mx-auto py-6">
      {/* Ambient Glow */}
      <div 
        className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-emerald-500/20 rounded-3xl blur-2xl opacity-70 transition-all duration-700 pointer-events-none"
      />

      {/* 3D Tilt Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className={`relative rounded-2xl bg-[#0F172A]/90 border ${theme.border} p-6 shadow-2xl ${theme.glow} backdrop-blur-2xl transition-colors duration-500 overflow-hidden`}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Official FHRS Inspection</span>
              <h3 className="text-white font-semibold text-base leading-tight">The Ivy Market Grill</h3>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" /> Verified
            </span>
          </div>
        </div>

        {/* 3D Rating Dial Centerpiece */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-4 p-4 rounded-xl bg-gray-950/60 border border-gray-800/80">
          <div className="relative flex items-center justify-center">
            {/* Circular Glowing Ring */}
            <div className={`w-24 h-24 rounded-full border-4 ${theme.border} flex flex-col items-center justify-center shadow-lg transition-all duration-500`}>
              <span className={`text-3xl font-extrabold tracking-tight ${theme.text} font-mono`}>
                {activeScore}
              </span>
              <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">out of 5</span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="text-sm font-semibold text-white mb-1">
              {activeScore === 5 && '🌟 Very Good (Top Tier)'}
              {activeScore === 4 && '👍 Good Standard'}
              {activeScore === 3 && '👌 Generally Satisfactory'}
              {activeScore === 2 && '⚠️ Improvement Necessary'}
              {activeScore === 1 && '🚨 Major Improvement Needed'}
              {activeScore === 0 && '⛔ Urgent Action Required'}
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {activeScore >= 4 
                ? 'Inspected by Westminster City Council. Clean kitchen, proper temperature controls, and complete food safety paperwork.'
                : 'Environmental health officers identified hygiene failures or structural deficiencies during recent inspection.'}
            </p>
          </div>
        </div>

        {/* Sub-Score Breakdown Bars */}
        <div className="space-y-2.5 pt-2 border-t border-gray-800/80 text-xs">
          <div className="flex justify-between items-center text-gray-300">
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Food Hygiene & Handling</span>
            <span className="font-mono font-medium text-emerald-400">{activeScore >= 4 ? 'Very Good (0)' : 'Deficient (15)'}</span>
          </div>
          <div className="flex justify-between items-center text-gray-300">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Structural Cleanliness</span>
            <span className="font-mono font-medium text-emerald-400">{activeScore >= 4 ? 'Very Good (0)' : 'Deficient (15)'}</span>
          </div>
          <div className="flex justify-between items-center text-gray-300">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Management Confidence</span>
            <span className="font-mono font-medium text-emerald-400">{activeScore >= 4 ? 'High (0)' : 'Low (20)'}</span>
          </div>
        </div>

        {/* Interactive Score Switcher */}
        <div className="mt-5 pt-4 border-t border-gray-800 flex items-center justify-between">
          <span className="text-[11px] text-gray-400 font-mono">Interactive Demo:</span>
          <div className="flex gap-1.5">
            {[5, 4, 3, 2, 1, 0].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setActiveScore(num)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeScore === num
                    ? `${getScoreTheme(num).badge} text-white shadow-md scale-110`
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
