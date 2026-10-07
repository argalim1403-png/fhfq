import React, { useState } from 'react';
import { Student } from '../types';
import { CheckCircle2, XCircle, Share2, Printer, Check, Copy, AlertCircle, Sparkles } from 'lucide-react';

interface VerificationResultViewProps {
  students: Student[];
  onReset: () => void;
  onClose: () => void;
}

export const VerificationResultView: React.FC<VerificationResultViewProps> = ({
  students,
  onReset,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const presentStudents = students.filter((s) => s.isPresent);
  const absentStudents = students.filter((s) => !s.isPresent);
  const total = students.length;
  const percentage = total > 0 ? Math.round((presentStudents.length / total) * 100) : 0;

  const now = new Date();
  const timeString = now.toLocaleTimeString('kk-KZ', { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString('kk-KZ', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleCopyReport = () => {
    const reportText = `📋 Smart Attendance — 11-сынып қатысу есебі
📅 Күні: ${dateString}, уақыты: ${timeString}
📊 Қатысу көрсеткіші: ${percentage}% (${presentStudents.length}/${total})

✅ Келген оқушылар (${presentStudents.length}):
${presentStudents.length > 0 ? presentStudents.map((s, idx) => `${idx + 1}. ${s.name}`).join('\n') : 'Ешкім келмеді'}

❌ Келмеген оқушылар (${absentStudents.length}):
${absentStudents.length > 0 ? absentStudents.map((s, idx) => `${idx + 1}. ${s.name}`).join('\n') : 'Барлығы қатысты!'}

ℹ️ Ақылды қатысу жүйесі (ЖИ міндеттерінің классификациясы)`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-indigo-200/80 shadow-xl overflow-hidden my-6 transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-800 text-white p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/20">
                Тексеру нәтижесі
              </span>
              <span className="text-xs text-indigo-200 font-medium">
                {dateString} • {timeString}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1 text-white tracking-tight flex items-center gap-2">
              Қатысу нәтижесі тексерілді
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/90 mt-0.5">
              11-«А» сынып оқушыларының қатысу мәртебесі анықталды
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 self-start sm:self-auto">
            <div>
              <p className="text-[11px] text-indigo-200 font-medium uppercase tracking-wider">Қатысу пайызы</p>
              <p className="text-2xl font-black text-white">{percentage}%</p>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div>
              <p className="text-[11px] text-emerald-200 font-medium uppercase tracking-wider">Келген</p>
              <p className="text-xl font-black text-emerald-300">{presentStudents.length}</p>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div>
              <p className="text-[11px] text-rose-200 font-medium uppercase tracking-wider">Келмеген</p>
              <p className="text-xl font-black text-rose-300">{absentStudents.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two Separate Lists Section as requested */}
      <div className="p-5 sm:p-6 bg-slate-50/60">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. ✅ Келген оқушылар */}
          <div className="bg-white rounded-xl border-2 border-emerald-300/80 p-5 shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-3.5 border-b border-emerald-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-1.5">
                    ✅ Келген оқушылар
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Сабаққа қатысып отырғандар</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                {presentStudents.length} оқушы
              </span>
            </div>

            {/* List */}
            <div className="mt-4 space-y-2 flex-1">
              {presentStudents.length === 0 ? (
                <div className="py-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <AlertCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm font-medium">Әзірге бірде-бір оқушы келді деп белгіленбеді.</p>
                </div>
              ) : (
                presentStudents.map((student, idx) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80 hover:bg-emerald-100/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-emerald-700 w-5 text-center">
                        {idx + 1}.
                      </span>
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${student.avatarColor} text-white flex items-center justify-center font-bold text-xs`}>
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800 text-sm">{student.name}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-200/70 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      Қатысты
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 2. ❌ Келмеген оқушылар */}
          <div className="bg-white rounded-xl border-2 border-rose-300/80 p-5 shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-3.5 border-b border-rose-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <XCircle className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-1.5">
                    ❌ Келмеген оқушылар
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Сабақтан қалғандар / Жоқтар</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300">
                {absentStudents.length} оқушы
              </span>
            </div>

            {/* List */}
            <div className="mt-4 space-y-2 flex-1">
              {absentStudents.length === 0 ? (
                <div className="py-8 text-center text-emerald-700 bg-emerald-50 rounded-xl border border-dashed border-emerald-200">
                  <Sparkles className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                  <p className="text-sm font-bold">Керемет! Барлық оқушы түгел келді (100%).</p>
                </div>
              ) : (
                absentStudents.map((student, idx) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-rose-50/70 border border-rose-200/80 hover:bg-rose-100/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-rose-700 w-5 text-center">
                        {idx + 1}.
                      </span>
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${student.avatarColor} text-white flex items-center justify-center font-bold text-xs`}>
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800 text-sm">{student.name}</span>
                    </div>
                    <span className="text-xs font-bold text-rose-700 bg-rose-200/70 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                      Жоқ
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-200"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Есеп көшірілді!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Есепті көшіру (WhatsApp / Күнделік)</span>
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-200"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Басып шығару</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Терезені жабу
            </button>
            <button
              onClick={onReset}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
            >
              Қайта бастау
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
