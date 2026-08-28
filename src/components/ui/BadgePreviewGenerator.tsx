'use client';

import React, { useState } from 'react';
import { Award, Copy, Check, Sparkles, ShieldCheck, ExternalLink, Code } from 'lucide-react';

export const BadgePreviewGenerator: React.FC = () => {
  const [businessName, setBusinessName] = useState('The Ivy Market Grill');
  const [ratingValue, setRatingValue] = useState('5');
  const [copied, setCopied] = useState(false);

  const embedCode = `<!-- HygieneCheck.uk Official Verified Food Hygiene Badge -->
<a href="https://hygienecheck.uk" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;background:#0B0F17;border:1px solid #10B981;border-radius:12px;color:#ffffff;text-decoration:none;font-family:sans-serif;font-size:12px;font-weight:600;">
  <span style="background:#10B981;color:#000000;padding:2px 8px;border-radius:6px;font-weight:800;">${ratingValue}/5</span>
  <span>Official Hygiene Rating: ${ratingValue === '5' ? 'Very Good' : 'Good'}</span>
</a>`;

  const handleCopy = async () => {
    let success = false;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(embedCode);
        success = true;
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = embedCode;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        success = false;
      }
    }

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-cyan-500/30 shadow-xl mb-8 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white">Live 5-Star Website Badge Preview & Embed Code</h3>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
          FREE WIDGET
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block text-gray-300 font-semibold mb-1">Your Restaurant / Business Name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-cyan-500 min-h-[44px]"
            placeholder="e.g. Dishoom London"
          />
        </div>
        <div>
          <label className="block text-gray-300 font-semibold mb-1">Select Rating Badge</label>
          <select
            value={ratingValue}
            onChange={(e) => setRatingValue(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-cyan-500 min-h-[44px]"
          >
            <option value="5">Rating 5 (Very Good - Top Tier)</option>
            <option value="4">Rating 4 (Good Standard)</option>
          </select>
        </div>
      </div>

      {/* Live Badge Visual Preview */}
      <div className="p-5 rounded-2xl bg-gray-950 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[11px] text-gray-400 block mb-2 font-mono">Live Visual Preview on Your Website:</span>
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0B0F17] border border-emerald-500 shadow-lg shadow-emerald-950/40">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-gray-950 font-black text-xs font-mono">
              {ratingValue}/5
            </span>
            <div className="text-left">
              <div className="text-xs font-bold text-white leading-none">{businessName}</div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Verified UK Food Hygiene</div>
            </div>
            <ShieldCheck className="w-4 h-4 text-emerald-400 ml-1" />
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex-shrink-0 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 min-h-[44px]"
        >
          {copied ? <Check className="w-4 h-4 text-gray-950" /> : <Code className="w-4 h-4" />}
          <span>{copied ? 'Embed HTML Copied!' : 'Copy HTML Embed Code'}</span>
        </button>
      </div>
    </div>
  );
};
