import React from 'react';
import Image from 'next/image';

export const HeroVisualCard = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Outer Continuous Color-Changing Neon Halo */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300 rounded-[32px] blur-2xl opacity-80 animate-color-glow pointer-events-none" />

      {/* Secondary Deep Atmospheric Ambient Light */}
      <div className="absolute -inset-5 bg-gradient-to-tr from-emerald-600/40 via-blue-500/30 to-teal-400/40 rounded-[40px] blur-3xl opacity-60 animate-color-glow pointer-events-none" />
      
      {/* Continuous Dynamic Color-Changing Border Shell */}
      <div className="relative rounded-[26px] p-[2.5px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 animate-color-glow shadow-2xl">
        
        {/* Dark Obsidian Inner Card Container */}
        <div className="relative rounded-[23.5px] bg-[#070B12] p-2 overflow-hidden">
          
          {/* Inner Clean Frame with Smooth Static Image */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-800/90 bg-gray-950 aspect-square shadow-inner">
            <Image
              src="/brand/hero-visual.jpg"
              alt="HygieneCheck.uk Food Hygiene Intelligence Dashboard"
              width={600}
              height={600}
              priority
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

        </div>
      </div>
    </div>
  );
};
