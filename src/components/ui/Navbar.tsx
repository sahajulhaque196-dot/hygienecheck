'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Sparkles, Building2, AlertTriangle, Briefcase, Info, Mail, Menu, X, ShieldCheck, Search } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080D14]/90 backdrop-blur-2xl transition-all shadow-[0_4px_30px_rgba(16,185,129,0.08)]">
      
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Enhanced Brand Identity */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 rounded-2xl p-[1.5px] bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-500 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300 flex-shrink-0">
            <div className="w-full h-full rounded-[14px] overflow-hidden bg-gray-950 p-0.5">
              <Image
                src="/brand/logo.jpg"
                alt="HygieneCheck.uk Logo"
                width={80}
                height={80}
                priority
                className="w-full h-full object-cover rounded-[12px] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-white font-sans group-hover:text-emerald-300 transition-colors">
                HygieneCheck<span className="text-emerald-400">.uk</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
                Live FSA Sync
              </span>
            </div>
            <span className="text-[11px] text-gray-400 font-mono tracking-wider hidden md:inline">
              UK Food Hygiene Intelligence
            </span>
          </div>
        </Link>

        {/* Right: Expert High-Conversion Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs font-medium">
          
          {/* 1. Home */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 font-bold shadow-sm hover:bg-emerald-500/20 transition-all"
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span>Home</span>
          </Link>

          {/* 2. Councils & Cities (Master Directory) */}
          <Link
            href="/authority"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-gray-300 hover:text-white hover:bg-gray-900 border border-transparent hover:border-gray-800 transition-all font-semibold"
          >
            <Building2 className="w-3.5 h-3.5 text-gray-400" />
            <span>Councils & Cities</span>
          </Link>

          {/* 3. 0-Star Watchlist (High CTR Viral Item) */}
          <Link
            href="/authority/london/0-star"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-red-500/20 hover:border-red-500/40 transition-all font-semibold"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>0-Star Watchlist</span>
          </Link>

          {/* 4. Business Support (Monetization & B2B) */}
          <Link
            href="/business-support"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 border border-cyan-500/20 hover:border-cyan-500/40 transition-all font-semibold"
          >
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>For Businesses</span>
          </Link>

          <div className="h-4 w-[1px] bg-gray-800 mx-1" />

          {/* 5. About */}
          <Link
            href="/about"
            className="px-3 py-1.5 rounded-xl text-gray-300 hover:text-white hover:bg-gray-900 border border-transparent hover:border-gray-800 transition-all font-semibold"
          >
            About
          </Link>

          {/* 6. Contact */}
          <Link
            href="/contact"
            className="px-3 py-1.5 rounded-xl text-gray-300 hover:text-white hover:bg-gray-900 border border-transparent hover:border-gray-800 transition-all font-semibold"
          >
            Contact
          </Link>

          <div className="h-4 w-[1px] bg-gray-800 mx-1" />

          {/* Quick Search Modal Button */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-search'))}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700 font-semibold transition-all shadow-sm group"
            aria-label="Open search dialog"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Search</span>
            <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 rounded bg-gray-800 text-[10px] font-mono text-gray-400 border border-gray-700">⌘K</kbd>
          </button>

        </nav>

        {/* Mobile Right Controls: Search + Hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event('open-search'))}
            className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Open search dialog"
          >
            <Search className="w-5 h-5 text-emerald-400" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Light Glowing Bottom Border Separator */}
      <div className="relative w-full h-[1px] bg-gray-800/80 overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80" />
        <div className="absolute -top-1 inset-x-10 h-3 bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent blur-sm pointer-events-none" />
      </div>

      {/* Mobile Dropdown Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-800 bg-[#0B0F17] px-4 py-4 space-y-2 text-xs font-semibold">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            href="/authority"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-2.5 rounded-xl text-gray-300 hover:bg-gray-900 hover:text-white"
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Councils & City Directory</span>
          </Link>
          <Link
            href="/authority/london/0-star"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-2.5 rounded-xl text-red-400 hover:bg-red-950/30 hover:text-red-300"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>0 & 1 Star Watchlist</span>
          </Link>
          <Link
            href="/business-support"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-2.5 rounded-xl text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-300"
          >
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>Business Support & Badges</span>
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-2.5 rounded-xl text-gray-300 hover:bg-gray-900 hover:text-white"
          >
            <Info className="w-4 h-4 text-gray-400" />
            <span>About Us & Scoring Science</span>
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 p-2.5 rounded-xl text-gray-300 hover:bg-gray-900 hover:text-white"
          >
            <Mail className="w-4 h-4 text-gray-400" />
            <span>Contact & Data Corrections</span>
          </Link>
        </div>
      )}
    </header>
  );
};
