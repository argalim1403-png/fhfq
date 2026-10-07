import React, { useState } from 'react';
import { Sparkles, Brain, Cpu, ChevronDown, ChevronUp, Eye, Layers, Lightbulb, Camera, CheckCircle2 } from 'lucide-react';
import { AI_CLASSIFICATION_TASKS } from '../data/students';

interface AiConnectionCardProps {
  onOpenAiScanner?: () => void;
}

export const AiConnectionCard: React.FC<AiConnectionCardProps> = ({ onOpenAiScanner }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string>('recognition');

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-indigo-700/50 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 ring-2 ring-indigo-400/30">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl text-white tracking-tight">
                  ЖИ-мен байланысы
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  11-сынып теориясы
                </span>
              </div>
              <p className="text-xs text-indigo-200/80">
                Жасанды интеллект міндеттерінің классификациясы және практикалық қолданысы
              </p>
            </div>
          </div>

          {onOpenAiScanner && (
            <button
              onClick={onOpenAiScanner}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Camera className="w-4 h-4" />
              <span>ЖИ Тануды сынау</span>
            </button>
          )}
        </div>

        {/* The Exact User-Requested Informative Quote */}
        <div className="mt-4 p-4.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
              <Eye className="w-4 h-4 text-indigo-300" />
            </div>
            <div className="space-y-2">
              <p className="text-sm sm:text-base leading-relaxed text-slate-100 font-medium">
                «Бұл демо-жүйеде келген және келмеген оқушылар бағдарламалық логика арқылы анықталады. Егер жүйеге камера және бет-әлпетті тану моделі қосылса, ЖИ келген оқушыны автоматты түрде тани алады. Бұл — ЖИ-дің тану міндетіне жатады.»
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-indigo-200">
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Негізгі ұғым: Бет-әлпетті тану (Face Recognition)
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300">Саласы: Компьютерлік көру (Computer Vision)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Pedagogical Guide: 11-сынып ЖИ міндеттерінің классификациясы */}
        <div className="mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs sm:text-sm font-bold text-indigo-200 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>11-сынып оқу бағдарламасы: ЖИ міндеттерінің толық жіктелуі</span>
            </span>
            <span className="flex items-center gap-1 text-xs text-indigo-300 font-normal">
              {isExpanded ? 'Жинау' : 'Толығырақ ашу'}
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {isExpanded && (
            <div className="mt-4 space-y-4 pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {AI_CLASSIFICATION_TASKS.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => setSelectedTask(task.id)}
                    className={`p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer border ${
                      selectedTask === task.id
                        ? 'bg-indigo-600/90 border-indigo-400 text-white font-bold shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/50'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 font-medium'
                    }`}
                  >
                    <div className="truncate font-semibold">{task.category}</div>
                    <div className="text-[10px] opacity-80 mt-0.5 truncate">{task.tag}</div>
                  </button>
                ))}
              </div>

              {/* Selected Task Details */}
              {(() => {
                const current = AI_CLASSIFICATION_TASKS.find((t) => t.id === selectedTask) || AI_CLASSIFICATION_TASKS[0];
                return (
                  <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-extrabold text-sm sm:text-base text-white">
                        {current.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        {current.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                      {current.description}
                    </p>

                    <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-indigo-300 font-semibold block">Мысалдары:</span>
                        <span className="text-slate-300">{current.example}</span>
                      </div>
                      <div>
                        <span className="text-emerald-300 font-semibold block">Мектеп қатысу жүйесіндегі орны:</span>
                        <span className="text-slate-300">{current.relationToSchool}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
