import React from 'react';
import { Student } from '../types';
import { Check, CheckCircle2, User, Clock, Undo2 } from 'lucide-react';

interface StudentCardProps {
  student: Student;
  index: number;
  onToggle: (id: number) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, index, onToggle }) => {
  return (
    <div
      className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
        student.isPresent
          ? 'bg-emerald-50/50 border-emerald-200 shadow-xs'
          : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
      }`}
    >
      {/* Left: Index + Avatar + Name + Status */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Index Number */}
        <span className="text-xs font-bold text-slate-500 w-5 text-center shrink-0">
          {index + 1}
        </span>

        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${student.avatarColor} text-white flex items-center justify-center font-bold text-sm shadow-2xs shrink-0 ring-2 ${
            student.isPresent ? 'ring-emerald-300' : 'ring-transparent'
          }`}
        >
          {student.name.charAt(0)}
        </div>

        {/* Student Name & Status */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-sm sm:text-base truncate">
              {student.name}
            </h3>
            {student.isPresent && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300/80">
                Қатысты ✅
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            {student.isPresent ? (
              <span className="sm:hidden inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300/80">
                Қатысты ✅
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/80">
                <Clock className="w-3 h-3 text-slate-600" />
                Қатыспады
              </span>
            )}
            {student.markedAt && (
              <span className="text-[11px] text-slate-500 hidden md:inline">
                ({student.markedAt})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: «Келді» Button */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onToggle(student.id)}
          className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-xs ${
            student.isPresent
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-400/50 shadow-emerald-600/20 active:scale-95'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-95'
          }`}
          title={student.isPresent ? 'Қатысуды қайтару (басу арқылы)' : 'Оқушыны келді деп белгілеу'}
        >
          {student.isPresent ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Келді ✅</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Келді</span>
            </>
          )}
        </button>

        {student.isPresent && (
          <button
            onClick={() => onToggle(student.id)}
            title="Белгіні қайтарып алу"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Undo2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
