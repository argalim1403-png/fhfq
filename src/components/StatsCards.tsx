import React from 'react';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  total: number;
  present: number;
  absent: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ total, present, absent }) => {
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  return (
    <div className="space-y-3">
      {/* 3 Main Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1. Барлық оқушы саны */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">1. Барлық оқушы саны</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {total}
                </span>
                <span className="text-xs font-semibold text-slate-500">оқушы</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            11-«А» сынып тізімі
          </p>
        </div>

        {/* 2. Келгендер саны */}
        <div className="bg-white rounded-2xl p-5 border border-emerald-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">2. Келгендер саны</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">
                  {present}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  {percentage}%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Сабаққа қатысып отырғандар
          </p>
        </div>

        {/* 3. Келмегендер саны */}
        <div className="bg-white rounded-2xl p-5 border border-rose-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500"></div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">3. Келмегендер саны</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-rose-600 tracking-tight">
                  {absent}
                </span>
                <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/60">
                  {100 - percentage}%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 group-hover:scale-105 transition-transform">
              <UserX className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-rose-600 font-medium mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Қатыспаған оқушылар
          </p>
        </div>
      </div>

      {/* Visual Attendance Progress Bar */}
      <div className="bg-white rounded-xl p-3.5 border border-slate-200/70 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-semibold text-slate-700">Қатысу көрсеткіші:</span>
          <span className="text-xs font-extrabold text-indigo-700">{percentage}%</span>
          <span className="text-xs text-slate-500">({present} / {total})</span>
        </div>
        <div className="w-full sm:w-1/2 bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/50">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
