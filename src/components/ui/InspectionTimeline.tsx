'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { InspectionRecord, formatInspectionDate, checkIsGoodRating } from '@/lib/fsa-types';

interface TimelineProps {
  records: InspectionRecord[];
}

export const InspectionTimeline: React.FC<TimelineProps> = ({ records }) => {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-gray-900/70 border border-gray-800 my-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <h3 className="text-white font-semibold text-base">5-Year Inspection History</h3>
        </div>
        <span className="text-xs text-gray-400 font-mono hidden sm:inline">Official Council Records</span>
      </div>

      <div className="relative pl-6 border-l-2 border-gray-800 space-y-5">
        {records.map((rec, index) => {
          const isGood = checkIsGoodRating(rec.ratingValue);
          return (
            <div key={index} className="relative group">
              {/* Timeline Bullet */}
              <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-gray-950 ${
                isGood ? 'bg-emerald-500 ring-4 ring-emerald-500/20' : 'bg-red-500 ring-4 ring-red-500/20'
              }`} />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-gray-950/40 border border-gray-800/60 group-hover:border-gray-700 transition-all">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                    isGood ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    Rating {rec.ratingValue}
                  </span>
                  <span className="text-xs text-gray-300 font-medium break-words">
                    Routine Full Food Safety Inspection
                  </span>
                </div>
                <div className="text-xs text-gray-400 font-mono flex-shrink-0">
                  {formatInspectionDate(rec.ratingDate)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
