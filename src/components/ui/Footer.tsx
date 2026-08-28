import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, MapPin, FileText, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-800/80 bg-[#070A0F] text-gray-400 text-xs mt-0">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Logo & Simple Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-emerald-500/40 p-0.5 shadow-lg shadow-emerald-500/10 group-hover:border-emerald-400 transition-all duration-300 bg-gray-950 flex-shrink-0">
                <Image
                  src="/brand/logo.jpg"
                  alt="HygieneCheck.uk Official Logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white font-sans">
                  HygieneCheck<span className="text-emerald-400">.uk</span>
                </span>
                <span className="text-[10px] text-emerald-400/90 font-mono uppercase tracking-wider">
                  UK Food Hygiene Ratings
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              HygieneCheck.uk helps you check food hygiene inspection ratings for over 520,000 UK restaurants, takeaways, and cafes. All data comes directly from official UK Food Standards Agency open records.
            </p>

            <div className="pt-1 flex items-center gap-3 text-[11px] text-gray-400">
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Free for Everyone
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-500" /> Synced Daily with Councils
              </span>
            </div>
          </div>

          {/* Col 2: Major UK City Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Popular UK Cities</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/authority/london" className="hover:text-emerald-400 transition-colors">London Food Ratings</Link></li>
              <li><Link href="/authority/birmingham" className="hover:text-emerald-400 transition-colors">Birmingham Hygiene Scores</Link></li>
              <li><Link href="/authority/manchester" className="hover:text-emerald-400 transition-colors">Manchester Restaurants</Link></li>
              <li><Link href="/authority/glasgow" className="hover:text-emerald-400 transition-colors">Glasgow (FHIS Scotland)</Link></li>
              <li><Link href="/authority/edinburgh" className="hover:text-emerald-400 transition-colors">Edinburgh Food Scores</Link></li>
              <li><Link href="/authority/cardiff" className="hover:text-emerald-400 transition-colors">Cardiff Food Hygiene (Wales)</Link></li>
              <li><Link href="/authority/belfast" className="hover:text-emerald-400 transition-colors">Belfast Ratings (NI)</Link></li>
            </ul>
          </div>

          {/* Col 3: Public Tools & Watchlist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Useful Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/foi" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"><FileText className="w-3 h-3 text-emerald-400" /> Full Inspection Reports</Link></li>
              <li><Link href="/authority/london/0-star" className="hover:text-red-400 transition-colors text-red-400/90">0 & 1 Star Watchlist</Link></li>
              <li><Link href="/postcode/sw1a" className="hover:text-emerald-400 transition-colors">Postcode Search Tool</Link></li>
              <li><Link href="/business-support" className="hover:text-emerald-400 transition-colors">5-Star Badges for Owners</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">How Scores Are Given</Link></li>
            </ul>
          </div>

          {/* Col 4: Legal & Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Help & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/disclaimer" className="hover:text-emerald-400 transition-colors font-medium text-gray-300">Official Disclaimer</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/business-support" className="hover:text-emerald-400 transition-colors">Business Owner Guide</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal Disclaimer & Copyright Notice */}
      <div className="border-t border-gray-800/60 bg-black/40 py-5 px-4 sm:px-6 lg:px-8 text-[11px] leading-relaxed text-gray-500">
        <div className="max-w-7xl mx-auto space-y-3">
          <p>
            <strong>Disclaimer:</strong> HygieneCheck.uk is an independent website. All hygiene ratings, addresses, and inspection dates come directly from public files released by the UK Food Standards Agency (FSA) and local councils under the <em>Open Government Licence v3.0</em>. We are not run by or part of the UK government.
          </p>
          <p>
            If you own a food business and want to update your details or request a re-inspection from your local council, please see our <Link href="/business-support" className="text-emerald-400 underline hover:text-emerald-300">Business Support Page</Link>.
          </p>
          <div className="pt-3 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500">
            <div>
              © {new Date().getFullYear()} HygieneCheck.uk. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-gray-300">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-300">Terms</Link>
              <Link href="/disclaimer" className="hover:text-gray-300">Disclaimer</Link>
              <Link href="/contact" className="hover:text-gray-300">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
