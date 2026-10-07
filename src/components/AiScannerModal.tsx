import React, { useState, useEffect } from 'react';
import { Camera, X, Scan, CheckCircle2, RefreshCw, Sparkles, ShieldCheck, UserCheck } from 'lucide-react';
import { Student } from '../types';
import confetti from 'canvas-confetti';

interface AiScannerModalProps {
  students: Student[];
  onApplyAttendance: (presentIds: number[]) => void;
  onClose: () => void;
}

export const AiScannerModal: React.FC<AiScannerModalProps> = ({
  students,
  onApplyAttendance,
  onClose,
}) => {
  const [scanning, setScanning] = useState(true);
  const [recognizedStudents, setRecognizedStudents] = useState<
    Array<{ id: number; name: string; confidence: number; timestamp: string }>
  >([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate real AI camera face detection sequence
    const detected: Array<{ id: number; name: string; confidence: number; timestamp: string }> = [];
    // Randomly pick 7-9 students who arrived on time
    const countToRecognize = 8;
    const shuffled = [...students].sort(() => 0.5 - Math.random());
    const targets = shuffled.slice(0, countToRecognize);

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < targets.length) {
        const student = targets[currentStep];
        const now = new Date();
        const timeStr = now.toLocaleTimeString('kk-KZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const confidence = +(96.5 + Math.random() * 3.4).toFixed(1);

        detected.push({
          id: student.id,
          name: student.name,
          confidence,
          timestamp: timeStr,
        });

        setRecognizedStudents([...detected]);
        currentStep++;
        setProgress(Math.round((currentStep / targets.length) * 100));
      } else {
        setScanning(false);
        clearInterval(interval);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
    }, 600);

    return () => clearInterval(interval);
  }, [students]);

  const handleApply = () => {
    const ids = recognizedStudents.map((s) => s.id);
    onApplyAttendance(ids);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 text-white rounded-2xl max-w-2xl w-full border border-indigo-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/40">
              <Camera className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
                <span>ЖИ Бет-әлпетті тану симуляциясы</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                  AI Model v4
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                11-сынып информатика: «Тану міндеті» (Face Detection & Verification)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder / Scanner viewport */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-indigo-500/40 p-4 aspect-video flex flex-col justify-between">
            {/* Viewfinder Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            {/* Scanning line animation */}
            {scanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce pointer-events-none"></div>
            )}

            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-indigo-400 pointer-events-none"></div>
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-indigo-400 pointer-events-none"></div>
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-indigo-400 pointer-events-none"></div>
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-indigo-400 pointer-events-none"></div>

            {/* Status indicator on viewport */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-700 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                СЫНЫП КАМЕРАСЫ #01
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-700 text-slate-300">
                {scanning ? 'ТАНУ ЖҮРГІЗІЛУДЕ...' : 'ТАЛДАУ АЯҚТАЛДЫ'}
              </span>
            </div>

            {/* Live detected students bubbles inside simulated camera frame */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 my-auto">
              {recognizedStudents.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/80 border border-emerald-500/70 rounded-lg p-2 backdrop-blur-md animate-fade-in shadow-lg"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-emerald-400">
                    <span className="truncate">{item.name}</span>
                    <span>{item.confidence}%</span>
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <UserCheck className="w-2.5 h-2.5 text-emerald-400" />
                    Танылды
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom stats inside camera */}
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>FPS: 30 • 1080p</span>
              <span>Танылған оқушылар: {recognizedStudents.length} / {students.length}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>ЖИ нейрожүйесінің сканерлеу барысы:</span>
              <span className="font-bold text-indigo-400">{progress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Educational explanation notice */}
          <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200">
            <span className="font-bold text-white block mb-0.5">🧠 11-сынып сабағына түсініктеме:</span>
            Камера әр оқушының бет пішінінің нүктелерін (facial landmarks) есептеп, алдын ала жаттықтырылған классификатор арқылы сәйкестік пайызын (сенімділікті) анықтайды.
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            {scanning ? 'Күте тұрыңыз...' : `${recognizedStudents.length} оқушы автоматты түрде танылды`}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Бас тарту
            </button>
            <button
              disabled={scanning}
              onClick={handleApply}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                scanning
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Қатысу журналына енгізу</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
