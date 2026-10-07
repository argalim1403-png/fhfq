/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { INITIAL_STUDENTS } from './data/students';
import { Student } from './types';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { StudentCard } from './components/StudentCard';
import { VerificationResultView } from './components/VerificationResultView';
import { AiConnectionCard } from './components/AiConnectionCard';
import { AiScannerModal } from './components/AiScannerModal';
import { AiClassificationGuideModal } from './components/AiClassificationGuideModal';
import { soundEffects } from './utils/sound';
import confetti from 'canvas-confetti';
import {
  ClipboardCheck,
  RotateCcw,
  Sparkles,
  Users,
  Search,
  CheckCircle2,
  ListFilter,
  Camera,
  GraduationCap,
  Info
} from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [showAiScanner, setShowAiScanner] = useState<boolean>(false);
  const [showAiGuide, setShowAiGuide] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMode, setFilterMode] = useState<'all' | 'present' | 'absent'>('all');

  // Compute live stats
  const totalStudents = students.length;
  const presentCount = students.filter((s) => s.isPresent).length;
  const absentCount = totalStudents - presentCount;

  // Toggle single student present/absent
  const handleToggleStudent = (id: number) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id === id) {
          const newStatus = !student.isPresent;
          if (soundEnabled) {
            if (newStatus) {
              soundEffects.playCheck();
            } else {
              soundEffects.playUncheck();
            }
          }
          const now = new Date();
          const timeStr = now.toLocaleTimeString('kk-KZ', { hour: '2-digit', minute: '2-digit' });
          return {
            ...student,
            isPresent: newStatus,
            markedAt: newStatus ? timeStr : undefined,
          };
        }
        return student;
      })
    );
  };

  // «Қатысуды тексеру» handler
  const handleVerifyAttendance = () => {
    setIsVerified(true);
    if (soundEnabled) {
      soundEffects.playSuccess();
    }
    // Confetti effect on attendance verification
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }

    // Smooth scroll down to results if screen is tall
    setTimeout(() => {
      const resultsEl = document.getElementById('verification-results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // «Қайта бастау» handler
  const handleReset = () => {
    if (soundEnabled) {
      soundEffects.playReset();
    }
    setStudents(INITIAL_STUDENTS.map((s) => ({ ...s, isPresent: false, markedAt: undefined })));
    setIsVerified(false);
  };

  // Mark all present convenience function
  const handleMarkAllPresent = () => {
    if (soundEnabled) {
      soundEffects.playSuccess();
    }
    const now = new Date();
    const timeStr = now.toLocaleTimeString('kk-KZ', { hour: '2-digit', minute: '2-digit' });
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        isPresent: true,
        markedAt: timeStr,
      }))
    );
  };

  // Sound toggle
  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundEffects.enabled = nextState;
  };

  // Apply AI Recognition scan results
  const handleApplyAiScan = (presentIds: number[]) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('kk-KZ', { hour: '2-digit', minute: '2-digit' });
    setStudents((prev) =>
      prev.map((student) => {
        const isDetected = presentIds.includes(student.id);
        return {
          ...student,
          isPresent: isDetected,
          markedAt: isDetected ? timeStr : undefined,
        };
      })
    );
    if (soundEnabled) {
      soundEffects.playSuccess();
    }
  };

  // Filter students for display
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
    if (!matchesSearch) return false;
    if (filterMode === 'present') return student.isPresent;
    if (filterMode === 'absent') return !student.isPresent;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      {/* Sticky Header with School Branding */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenAiGuide={() => setShowAiGuide(true)}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">
        {/* Top Info Banner for 11th Grade */}
        <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-2xl p-4 sm:p-5 border border-indigo-100/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                  Практикалық жоба
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-600">11-сынып Информатика</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                Жасанды интеллект міндеттерінің классификациясы: Smart Attendance
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 max-w-2xl">
                Оқушылардың сабаққа қатысуын есепке алу, классификациялау және ЖИ арқылы автоматты тану міндетін модельдеу жүйесі.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <button
              onClick={() => setShowAiScanner(true)}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200/80 shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-indigo-600" />
              <span>ЖИ Тану симуляциясы</span>
            </button>
            <button
              onClick={() => setShowAiGuide(true)}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Теориялық нұсқаулық</span>
            </button>
          </div>
        </div>

        {/* 1. Top Section: 3 Statistic Cards as requested */}
        <section aria-label="Статистикалық карточкалар">
          <StatsCards
            total={totalStudents}
            present={presentCount}
            absent={absentCount}
          />
        </section>

        {/* 2. Main Student Attendance Dashboard */}
        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-5">
          {/* Dashboard Table Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Оқушылар тізімі (11-«А» сыныбы)
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {students.length} оқушы
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Әр оқушының жанындағы <span className="font-bold text-indigo-600">«Келді»</span> батырмасын басып, сабаққа қатысуын белгілеңіз.
              </p>
            </div>

            {/* Quick Bulk Actions */}
            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={handleMarkAllPresent}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/80 transition-colors cursor-pointer flex items-center gap-1.5"
                title="Барлық 10 оқушыны келді деп белгілеу"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Барлығы келді</span>
              </button>

              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
                title="Барлық белгілерді тазарту"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Қайта бастау</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Оқушы атын іздеу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-stretch sm:self-auto text-xs">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  filterMode === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Барлығы ({totalStudents})
              </button>
              <button
                onClick={() => setFilterMode('present')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  filterMode === 'present'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Келгендер ({presentCount})
              </button>
              <button
                onClick={() => setFilterMode('absent')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  filterMode === 'absent'
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Келмегендер ({absentCount})
              </button>
            </div>
          </div>

          {/* Student Grid / List: exactly 10 students requested */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  index={index}
                  onToggle={handleToggleStudent}
                />
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-sm font-medium">Іздеу сұранысы бойынша ешқандай оқушы табылмады.</p>
              </div>
            )}
          </div>

          {/* 3. The Big Requested Action Button: «Қатысуды тексеру» */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
              <span>Күй: </span>
              <span className="font-bold text-slate-800">
                {presentCount} келді, {absentCount} келмеді
              </span>
              <span className="mx-2 text-slate-300">•</span>
              <span className="text-indigo-600 font-semibold">
                Тексеруге дайын
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleReset}
                className="w-1/2 sm:w-auto px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
                title="Барлық белгілерді өшіру"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Қайта бастау</span>
              </button>

              <button
                onClick={handleVerifyAttendance}
                className="w-1/2 sm:w-auto px-6 py-3.5 rounded-xl text-sm sm:text-base font-extrabold bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <ClipboardCheck className="w-5 h-5 stroke-[2.5]" />
                <span>Қатысуды тексеру</span>
              </button>
            </div>
          </div>
        </section>

        {/* 4. Verification Results View (Displaying the two distinct lists requested) */}
        {isVerified && (
          <div id="verification-results">
            <VerificationResultView
              students={students}
              onReset={handleReset}
              onClose={() => setIsVerified(false)}
            />
          </div>
        )}

        {/* 5. Informative Card: «ЖИ-мен байланысы» as explicitly requested */}
        <section aria-label="ЖИ-мен байланысы">
          <AiConnectionCard onOpenAiScanner={() => setShowAiScanner(true)} />
        </section>

        {/* Educational Footer */}
        <footer className="pt-6 border-t border-slate-200/80 text-center text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-slate-700">
            «Smart Attendance — Ақылды қатысу жүйесі»
          </p>
          <p>
            11-сынып информатика пәні • Жасанды интеллект міндеттерінің классификациясы: Тану, Классификациялау, Болжау, NLP, Басқару
          </p>
        </footer>
      </main>

      {/* AI Camera Face Recognition Simulation Modal */}
      {showAiScanner && (
        <AiScannerModal
          students={students}
          onApplyAttendance={handleApplyAiScan}
          onClose={() => setShowAiScanner(false)}
        />
      )}

      {/* AI Classification Theory & Quiz Modal */}
      {showAiGuide && (
        <AiClassificationGuideModal
          onClose={() => setShowAiGuide(false)}
        />
      )}
    </div>
  );
}
