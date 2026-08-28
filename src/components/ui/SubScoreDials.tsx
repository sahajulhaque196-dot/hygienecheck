'use client';

import React from 'react';
import { Sparkles, Building2, UserCheck } from 'lucide-react';

interface SubScoreProps {
  hygieneScore: number;
  structuralScore: number;
  managementScore: number;
}

export const SubScoreDials: React.FC<SubScoreProps> = ({
  hygieneScore,
  structuralScore,
  managementScore,
}) => {
  const getSubScoreLabel = (score?: number | null) => {
    if (score === undefined || score === null || isNaN(score)) {
      return { label: 'Not Graded / Exempt', color: 'text-gray-400', stroke: '#4B5563', percent: 100 };
    }
    if (score <= 0) return { label: 'Very Good', color: 'text-emerald-400', stroke: '#10B981', percent: 100 };
    if (score <= 5) return { label: 'Good', color: 'text-teal-400', stroke: '#34D399', percent: 80 };
    if (score <= 10) return { label: 'Generally Satisfactory', color: 'text-amber-400', stroke: '#F59E0B', percent: 60 };
    if (score <= 15) return { label: 'Improvement Necessary', color: 'text-orange-400', stroke: '#F97316', percent: 40 };
    return { label: 'Major Improvement Needed', color: 'text-red-400', stroke: '#EF4444', percent: 15 };
  };

  const hygiene = getSubScoreLabel(hygieneScore);
  const structural = getSubScoreLabel(structuralScore);
  const management = getSubScoreLabel(managementScore);

  const dials = [
    {
      title: 'Food Hygiene & Handling',
      description: 'Preparation, cooking, re-heating, cooling, and food storage hygiene.',
      icon: Sparkles,
      data: hygiene,
    },
    {
      title: 'Building & Cleanliness',
      description: 'Cleanliness, layout, ventilation, hand washing facilities, and pest proofing.',
      icon: Building2,
      data: structural,
    },
    {
      title: 'Management Confidence',
      description: 'Track record, food safety training, SFBB paperwork, and staff checks.',
      icon: UserCheck,
      data: management,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      {dials.map((item, idx) => {
        const Icon = item.icon;
        const radius = 32;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (item.data.percent / 100) * circumference;

        return (
          <div key={idx} className="p-5 rounded-2xl bg-gray-900/70 border border-gray-800 backdrop-blur-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gray-800 text-gray-300">
                  <Icon className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{item.title}</h4>
              </div>
            </div>

            <div className="flex items-center gap-4 my-3">
              {/* Circular SVG Gauge */}
              <div className="relative w-16 h-16 flex-shrink-0 aspect-square">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    stroke="#1F2937"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    stroke={item.data.stroke}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white font-mono">
                  {item.data.percent}%
                </div>
              </div>

              <div>
                <span className={`text-sm font-bold ${item.data.color}`}>
                  {item.data.label}
                </span>
                <p className="text-[11px] text-gray-400 mt-1 leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
