'use client';

import React, { useState } from 'react';
import { FileText, Mail, Copy, Check, ExternalLink, Building2 } from 'lucide-react';

const councilPresets = [
  { name: 'Westminster City Council', email: 'foi@westminster.gov.uk' },
  { name: 'Camden Council', email: 'foi@camden.gov.uk' },
  { name: 'Birmingham City Council', email: 'foi@birmingham.gov.uk' },
  { name: 'Manchester City Council', email: 'informationcompliance@manchester.gov.uk' },
  { name: 'Leeds City Council', email: 'dpfoiteam@leeds.gov.uk' },
  { name: 'Glasgow City Council', email: 'foi@glasgow.gov.uk' },
  { name: 'City of Edinburgh Council', email: 'foi@edinburgh.gov.uk' },
  { name: 'Bristol City Council', email: 'freedom.information@bristol.gov.uk' },
];

export const FoiGeneratorForm: React.FC = () => {
  const [businessName, setBusinessName] = useState('The Ivy Market Grill');
  const [councilName, setCouncilName] = useState('Westminster City Council');
  const [councilEmail, setCouncilEmail] = useState('foi@westminster.gov.uk');
  const [postcode, setPostcode] = useState('WC2E 8PB');
  const [includePhotos, setIncludePhotos] = useState(true);
  const [includeTemps, setIncludeTemps] = useState(true);
  const [includePest, setIncludePest] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCouncilSelect = (preset: { name: string; email: string }) => {
    setCouncilName(preset.name);
    setCouncilEmail(preset.email);
  };

  const generatedEmail = `To: ${councilEmail}
Subject: Freedom of Information Request - Food Hygiene Inspection Report: ${businessName} (${postcode})

Dear Freedom of Information Officer,

Under Section 1 of the UK Freedom of Information Act 2000, I am writing to formally request a copy of the most recent food hygiene inspection documentation held by ${councilName} for the following food establishment:

- Business Name: ${businessName}
- Address / Postcode: ${postcode}
- Inspecting Authority: ${councilName}

Specifically, please provide:
1. The full Food Hygiene Inspection Report completed by the inspecting Environmental Health Officer.
${includeTemps ? "2. The officer's recorded fridge, freezer, and cooking temperature logs.\n" : ''}${includePhotos ? "3. Any inspection photographs or structural deficiency notes taken on-site.\n" : ''}${includePest ? "4. Any pest control officer notes or pest sighting logs associated with this inspection.\n" : ''}5. Any correspondence, Hygiene Improvement Notices (HIN), or warning letters issued to the business operator following this inspection.

As required by Section 10(1) of the Freedom of Information Act 2000, I look forward to receiving your response within 20 working days. Please provide the requested documents in digital format (PDF) via return email.

Thank you for your assistance.

Yours sincerely,
A UK Consumer & Resident`;

  const handleCopy = async () => {
    let success = false;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(generatedEmail);
        success = true;
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = generatedEmail;
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

  const handleMailto = () => {
    const subject = encodeURIComponent(`FOI Request - Food Hygiene Report: ${businessName} (${postcode})`);
    const body = encodeURIComponent(generatedEmail);
    window.location.href = `mailto:${councilEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
      {/* Left Column: Form Controls */}
      <div className="lg:col-span-5 space-y-5">
        <div className="p-5 sm:p-6 rounded-3xl bg-gray-900/80 border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">1. Enter Venue Details</h2>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
              FREE
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Restaurant / Takeaway Name</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-xs text-white focus:outline-none focus:border-emerald-500 min-h-[44px]"
              placeholder="e.g. The Ivy Market Grill"
            />
          </div>

          {/* Quick Council Selector Chips */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Select Council Preset or Type Below:</span>
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {councilPresets.map((c, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleCouncilSelect(c)}
                  className={`text-[10px] font-mono px-2 py-1 rounded-lg border transition-all ${
                    councilName === c.name
                      ? 'bg-emerald-500 text-gray-950 font-bold border-emerald-400'
                      : 'bg-gray-950 text-gray-400 border-gray-800 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {c.name.replace(' Council', '').replace(' City', '')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Local Council Name</label>
            <input
              type="text"
              value={councilName}
              onChange={(e) => setCouncilName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-xs text-white focus:outline-none focus:border-emerald-500 min-h-[44px]"
              placeholder="e.g. Westminster City Council"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Council FOI Email Address</label>
            <input
              type="text"
              value={councilEmail}
              onChange={(e) => setCouncilEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono min-h-[44px]"
              placeholder="e.g. foi@westminster.gov.uk"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Postcode (Optional)</label>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono min-h-[44px]"
              placeholder="e.g. WC2E 8PB"
            />
          </div>

          <div className="pt-2 border-t border-gray-800 space-y-2">
            <label className="block text-xs font-semibold text-gray-300">Include in Request:</label>
            <label className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer min-h-[32px]">
              <input
                type="checkbox"
                checked={includeTemps}
                onChange={(e) => setIncludeTemps(e.target.checked)}
                className="w-4 h-4 rounded border-gray-700 text-emerald-500 focus:ring-0"
              />
              <span>Fridge & cooking temperature logs</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer min-h-[32px]">
              <input
                type="checkbox"
                checked={includePhotos}
                onChange={(e) => setIncludePhotos(e.target.checked)}
                className="w-4 h-4 rounded border-gray-700 text-emerald-500 focus:ring-0"
              />
              <span>Officer inspection photographs & notes</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer min-h-[32px]">
              <input
                type="checkbox"
                checked={includePest}
                onChange={(e) => setIncludePest(e.target.checked)}
                className="w-4 h-4 rounded border-gray-700 text-emerald-500 focus:ring-0"
              />
              <span>Pest control sighting reports</span>
            </label>
          </div>
        </div>
      </div>

      {/* Right Column: Live Generated Legal Template */}
      <div className="lg:col-span-7 space-y-4">
        <div className="p-5 sm:p-6 rounded-3xl bg-[#0F172A] border border-gray-800 shadow-xl space-y-4 max-w-full overflow-hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">2. Pre-Formatted Legal Email</h2>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Ready to Send
            </span>
          </div>

          <pre className="p-4 rounded-2xl bg-gray-950 border border-gray-800 text-[11px] text-gray-300 font-mono whitespace-pre-wrap break-words leading-relaxed max-h-[380px] overflow-y-auto max-w-full">
            {generatedEmail}
          </pre>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 py-3.5 px-4 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-xs font-bold text-white transition-all flex items-center justify-center gap-2 shadow-sm min-h-[44px]"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Text'}</span>
            </button>
            <button
              type="button"
              onClick={handleMailto}
              className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 min-h-[44px]"
            >
              <Mail className="w-4 h-4" />
              <span>Open in Email App</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
