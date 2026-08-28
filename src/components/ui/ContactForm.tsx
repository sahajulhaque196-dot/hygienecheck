'use client';

import React, { useState } from 'react';
import { CheckCircle2, FileEdit, Send, Clock, ShieldCheck, Mail } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    fhrsid: '',
    postcode: '',
    correctionType: 'new_inspection',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
      {/* Left Column: Fast Data Correction Form */}
      <div className="lg:col-span-7">
        <div className="p-7 sm:p-8 rounded-3xl bg-gray-900/80 border border-gray-800 shadow-xl space-y-6">
          <div className="flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Submit a Data Correction / Message</h2>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Correction Request Received!</h3>
              <p className="text-xs text-gray-300 leading-relaxed max-w-md mx-auto">
                Thank you! Our automated data system synchronizes with official Food Standards Agency records nightly. If your council has published your new score, it will update on HygieneCheck.uk automatically within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-gray-950 font-bold text-xs hover:bg-emerald-400 transition-all min-h-[44px]"
              >
                Submit Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-emerald-500 min-h-[44px]"
                    placeholder="e.g. John Smith"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-emerald-500 min-h-[44px]"
                    placeholder="e.g. owner@myrestaurant.co.uk"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Business Name (Optional)</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-emerald-500 min-h-[44px]"
                    placeholder="e.g. Royal Curry House"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Postcode / FHRS ID (Optional)</label>
                  <input
                    type="text"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-emerald-500 font-mono min-h-[44px]"
                    placeholder="e.g. B7 5BX or 1964256"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Reason for Request</label>
                <select
                  value={formData.correctionType}
                  onChange={(e) => setFormData({ ...formData, correctionType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-emerald-500 min-h-[44px]"
                >
                  <option value="new_inspection">I had a re-inspection and received a new rating</option>
                  <option value="closed">This business is permanently closed</option>
                  <option value="address_change">Business name or address correction</option>
                  <option value="right_to_reply">Add Right to Reply link</option>
                  <option value="general">General inquiry / Feedback</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Details / Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
                  placeholder="Please share any extra details, council inspection dates, or reference numbers..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 min-h-[44px]"
              >
                <Send className="w-4 h-4" />
                <span>Send Correction Request</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Right Column: Fast Turnaround Guarantees & Contact Info */}
      <div className="lg:col-span-5 space-y-6">
        <div className="p-7 rounded-3xl bg-gray-900/80 border border-gray-800 space-y-4">
          <h3 className="text-base font-bold text-white">How Data Updates Work</h3>
          <div className="space-y-3 text-xs text-gray-300">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-950/60 border border-gray-800">
              <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Daily Automatic Sync:</strong> Our database downloads fresh council files every night at 04:00 AM UTC.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-950/60 border border-gray-800">
              <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Official Government Verification:</strong> We only publish official ratings verified against the Food Standards Agency register.
              </div>
            </div>
          </div>
        </div>

        <div className="p-7 rounded-3xl bg-[#0F172A] border border-gray-800 space-y-3">
          <h3 className="text-base font-bold text-white">Direct Support Email</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            For partnership inquiries, verified 5-star badges, or legal notices, you can reach out directly:
          </p>
          <div className="pt-2">
            <a
              href="mailto:support@hygienecheck.uk"
              className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:underline font-bold"
            >
              <Mail className="w-4 h-4" /> support@hygienecheck.uk
            </a>
          </div>
          <p className="text-[11px] text-gray-400 pt-1">
            Founder & Creator: <strong>Sahajul</strong> (Assam, India).
          </p>
        </div>
      </div>
    </div>
  );
};
