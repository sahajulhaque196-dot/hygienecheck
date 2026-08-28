'use client';

import React from 'react';
import { Radio, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';

export const LiveRadarTicker = () => {
  return (
    <div className="w-full my-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-2xl bg-gradient-to-r from-emerald-950/40 via-gray-900/90 to-emerald-950/40 border border-emerald-500/20 p-3.5 backdrop-blur-xl shadow-xl overflow-hidden flex items-center gap-4">
        
        {/* Left Indicator Badge */}
        <div className="flex items-center gap-2 flex-shrink-0 bg-gray-950/90 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-emerald-400 font-mono tracking-tight flex items-center gap-1">
            <Radio className="w-3.5 h-3.5" /> LIVE FSA FEED:
          </span>
        </div>

        {/* Marquee Streaming Items */}
        <div className="overflow-hidden whitespace-nowrap text-xs text-gray-300 flex-1">
          <div className="inline-flex gap-8 animate-marquee">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>🇬🇧 <strong>612,154</strong> UK establishments actively monitored</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>📍 Just inspected: <strong>The Ivy West Street, London</strong> (Rating 5 - Spotless)</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>📍 Re-inspection: <strong>Archies Oxford Rd, Manchester</strong> (Rating 5 - Pass)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-red-400">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>⚠️ Urgent Alert: <strong>3 failed inspections</strong> recorded today in Birmingham</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>📍 Edinburgh: <strong>The Witchery</strong> awarded Pass (FHIS)</span>
            </span>
            {/* Duplicated for seamless continuous marquee loop */}
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>🇬🇧 <strong>612,154</strong> UK establishments actively monitored</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>📍 Just inspected: <strong>The Ivy West Street, London</strong> (Rating 5 - Spotless)</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>📍 Re-inspection: <strong>Archies Oxford Rd, Manchester</strong> (Rating 5 - Pass)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-red-400">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>⚠️ Urgent Alert: <strong>3 failed inspections</strong> recorded today in Birmingham</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>📍 Edinburgh: <strong>The Witchery</strong> awarded Pass (FHIS)</span>
            </span>
          </div>
        </div>

        {/* Right Badge */}
        <div className="hidden lg:flex items-center gap-1 text-[11px] font-mono text-emerald-400/80 flex-shrink-0 bg-gray-950/80 px-2.5 py-1 rounded-lg border border-gray-800">
          <span>OGL v3.0 VERIFIED</span>
        </div>
      </div>
    </div>
  );
};
