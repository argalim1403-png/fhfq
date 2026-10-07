import React from 'react';
import { Sparkles, Calendar, Volume2, VolumeX, ShieldCheck, GraduationCap } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenAiGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ soundEnabled, onToggleSound, onOpenAiGuide }) => {
  // Kazakh date formatting
  const today = new Date();
  const daysKazakh = ['Жексенбі', 'Дүйсенбі', 'Сейсенбі', 'Сәрсенбі', 'Бейсенбі', 'Жұма', 'Сенбі'];
  const monthsKazakh = [
    'қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым',
    'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан'
  ];

  const formattedDate = `${today.getDate()} ${monthsKazakh[today.getMonth()]} ${today.getFullYear()} ж.`;
  const dayName = daysKazakh[today.getDay()];

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 ring-4 ring-indigo-50 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                  Smart Attendance
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  v2.0
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Ақылды қатысу жүйесі • <span className="text-indigo-600 font-semibold">11-сынып Информатика</span>
              </p>
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 self-end sm:self-auto">
            {/* Date Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100/90 text-slate-700 text-xs font-medium border border-slate-200/70">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{dayName}, {formattedDate}</span>
            </div>

            {/* AI Guide quick link */}
            <button
              onClick={onOpenAiGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200/80 hover:bg-indigo-100/70 transition-all cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>ЖИ Тақырыбы</span>
            </button>

            {/* Sound toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Дыбысты өшіру' : 'Дыбысты қосу'}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200/70"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Online Indicator */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Белсенді</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
