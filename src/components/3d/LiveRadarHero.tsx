'use client';

import React, { useState, useEffect } from 'react';
import { Radio, MapPin, ShieldCheck, AlertTriangle, ArrowUpRight, Sparkles, Activity, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const LiveRadarHero = () => {
  const [selectedCity, setSelectedCity] = useState<'london' | 'manchester' | 'birmingham' | 'leeds'>('london');

  const cityData = {
    london: {
      name: 'Greater London',
      totalVenues: '48,290',
      passRate: '92.4%',
      recentInspections: [
        { name: 'Dishoom Covent Garden', status: '5★ Very Good', type: 'passed', time: '12m ago', council: 'Westminster' },
        { name: 'Sketch Mayfair', status: '5★ Spotless', type: 'passed', time: '34m ago', council: 'Westminster' },
        { name: 'Kebab Express Camden', status: '0★ Urgent Action', type: 'failed', time: '1h ago', council: 'Camden' },
      ],
      topPostcodes: ['WC2E', 'SW1A', 'EC1A', 'W1D'],
    },
    manchester: {
      name: 'Manchester City',
      totalVenues: '6,920',
      passRate: '88.7%',
      recentInspections: [
        { name: 'Hawksmoor Deansgate', status: '5★ Very Good', type: 'passed', time: '18m ago', council: 'Manchester' },
        { name: 'Archies Oxford Road', status: '5★ Spotless', type: 'passed', time: '45m ago', council: 'Manchester' },
        { name: 'Curry Mile Grill M14', status: '1★ Major Action', type: 'failed', time: '2h ago', council: 'Manchester' },
      ],
      topPostcodes: ['M1', 'M2', 'M14', 'M20'],
    },
    birmingham: {
      name: 'Birmingham Central',
      totalVenues: '8,410',
      passRate: '86.1%',
      recentInspections: [
        { name: 'Opheem (Michelin Star)', status: '5★ Spotless', type: 'passed', time: '8m ago', council: 'Birmingham' },
        { name: 'The Indian Streatery', status: '5★ Very Good', type: 'passed', time: '52m ago', council: 'Birmingham' },
        { name: 'Alum Rock Takeaway', status: '0★ Improvement', type: 'failed', time: '3h ago', council: 'Birmingham' },
      ],
      topPostcodes: ['B1', 'B13', 'B15', 'B29'],
    },
    leeds: {
      name: 'Leeds Metro',
      totalVenues: '5,340',
      passRate: '89.8%',
      recentInspections: [
        { name: 'Man Behind The Curtain', status: '5★ Spotless', type: 'passed', time: '22m ago', council: 'Leeds' },
        { name: 'Bundobust Mill Hill', status: '5★ Very Good', type: 'passed', time: '1h ago', council: 'Leeds' },
        { name: 'Headingley Pizza Hub', status: '1★ Action Needed', type: 'failed', time: '4h ago', council: 'Leeds' },
      ],
      topPostcodes: ['LS1', 'LS2', 'LS6', 'LS8'],
    },
  };

  const current = cityData[selectedCity];

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Background Multi-color Glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-teal-500/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      {/* Main Glassmorphic Radar Container */}
      <div className="relative rounded-3xl bg-[#0D131F]/90 border border-gray-800/90 p-6 backdrop-blur-2xl shadow-2xl overflow-hidden">
        
        {/* Top Header: Live Radar Scanner Status */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Radio className="w-4 h-4 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-white font-bold text-sm tracking-tight">National Food Safety Radar</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">LIVE</span>
              </div>
              <p className="text-[11px] text-gray-400">360 UK Local Councils Synchronized</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono text-gray-400 block">Pass Benchmark</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">{current.passRate}</span>
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-gray-950/80 rounded-xl border border-gray-800/80 mb-5">
          {(['london', 'manchester', 'birmingham', 'leeds'] as const).map((cityKey) => (
            <button
              type="button"
              key={cityKey}
              onClick={() => setSelectedCity(cityKey)}
              className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                selectedCity === cityKey
                  ? 'bg-emerald-500 text-gray-950 shadow-md shadow-emerald-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              {cityKey}
            </button>
          ))}
        </div>

        {/* City Summary Stats Banner */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800/70">
            <span className="text-[11px] text-gray-400 block">Monitored Establishments</span>
            <span className="text-lg font-extrabold text-white font-mono">{current.totalVenues}</span>
          </div>
          <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800/70">
            <span className="text-[11px] text-gray-400 block">Inspection Frequency</span>
            <span className="text-lg font-extrabold text-cyan-400 font-mono">Daily Sync</span>
          </div>
        </div>

        {/* Real-Time Inspection Feed Stream */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-emerald-400" /> Recent Officer Inspections</span>
            <span className="text-[10px] text-gray-500">Auto-refreshing</span>
          </div>

          <div className="space-y-2">
            {current.recentInspections.map((item, index) => {
              const isPassed = item.type === 'passed';
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isPassed
                      ? 'bg-gray-950/50 border-gray-800/80 hover:border-emerald-500/30'
                      : 'bg-red-950/20 border-red-500/20 hover:border-red-500/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${isPassed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-snug">{item.name}</div>
                      <div className="text-[10px] text-gray-400">{item.council} Council • {item.time}</div>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                    isPassed
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hyperlocal Postcode Quick Scanner */}
        <div className="mt-5 pt-4 border-t border-gray-800 flex items-center justify-between text-xs">
          <span className="text-[11px] text-gray-400 font-mono">Popular {current.name} Outcodes:</span>
          <div className="flex gap-1.5">
            {current.topPostcodes.map((postcode) => (
              <Link
                key={postcode}
                href={`/postcode/${postcode.toLowerCase()}`}
                className="px-2.5 py-1 rounded-lg bg-gray-950 border border-gray-800 text-gray-300 hover:text-emerald-400 hover:border-emerald-500/40 text-[11px] font-mono font-medium transition-colors"
              >
                {postcode}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
