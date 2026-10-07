import React, { useState } from 'react';
import { X, BookOpen, Brain, Check, HelpCircle, ArrowRight, Lightbulb, GraduationCap } from 'lucide-react';
import { AI_CLASSIFICATION_TASKS } from '../data/students';

interface AiClassificationGuideModalProps {
  onClose: () => void;
}

export const AiClassificationGuideModal: React.FC<AiClassificationGuideModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'quiz'>('theory');
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);

  // Quick 11th grade quiz questions
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestion = {
    question: '«Мектепке келген оқушының бетін бейнебақылау камерасы арқылы тауып, оның кім екенін анықтау» — ЖИ-дің қай міндетіне жатады?',
    options: [
      'А) Болжау міндеті (Prediction)',
      'Ә) Тану міндеті (Recognition & Computer Vision)',
      'Б) Табиғи тілді өңдеу (NLP)',
      'В) Роботты басқару міндеті',
    ],
    correctIndex: 1,
    explanation: 'Дұрыс жауап: Ә) Тану міндеті. Компьютерлік көру технологиясы камерадан түскен фото/видеодан бет бейнесін тану (Face Recognition) міндетін шешеді.',
  };

  const handleSelectQuiz = (index: number) => {
    setQuizAnswer(index);
    setQuizSubmitted(true);
  };

  const currentTask = AI_CLASSIFICATION_TASKS[selectedTaskIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                11-сынып Информатика: ЖИ міндеттерінің жіктелуі
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                «Жасанды интеллект міндеттерінің классификациясы» тақырыбы бойынша анықтамалық
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 px-5 pt-2 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('theory')}
            className={`pb-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'theory'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            📚 Теориялық негіздер (5 негізгі міндет)
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`pb-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            🎯 Өзін-өзі тексеру тест сұрағы
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {activeTab === 'theory' ? (
            <>
              {/* Task list pills */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {AI_CLASSIFICATION_TASKS.map((task, idx) => (
                  <button
                    key={task.id}
                    onClick={() => setSelectedTaskIndex(idx)}
                    className={`p-2.5 rounded-xl text-left transition-all cursor-pointer border text-xs ${
                      selectedTaskIndex === idx
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold shadow-2xs ring-2 ring-indigo-500/20'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <div className="truncate">{idx + 1}. {task.category}</div>
                  </button>
                ))}
              </div>

              {/* Selected Card display */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    {currentTask.title}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                    {currentTask.tag}
                  </span>
                </div>

                <div className="space-y-3 text-sm text-slate-700">
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Анықтамасы:</span>
                    <p className="leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                      {currentTask.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-indigo-600 mb-1">
                        Өмірдегі мысалдары:
                      </span>
                      <p className="text-xs text-slate-600">{currentTask.example}</p>
                    </div>

                    <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                      <span className="font-bold text-emerald-900 block text-xs uppercase tracking-wider mb-1">
                        Осы қатысу жүйесіндегі қолданылуы:
                      </span>
                      <p className="text-xs text-emerald-800">{currentTask.relationToSchool}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary note */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Есте сақтаңыз:</strong> Заманауи ақылды жүйелерде (Smart City, Smart School) көбінесе бірнеше ЖИ міндеттері қатар қолданылады. Мысалы, алдымен <em>Тану</em> (камера арқылы бетті тану), кейін <em>Классификация</em> (келді/келмеді санатына жатқызу), соңында <em>Болжау</em> (сабақ үлгерімін есептеу).
                </p>
              </div>
            </>
          ) : (
            /* Quiz Tab */
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded uppercase">
                  Сұрақ
                </span>
                <p className="font-bold text-slate-900 text-base mt-2">
                  {quizQuestion.question}
                </p>
              </div>

              <div className="space-y-2.5">
                {quizQuestion.options.map((opt, idx) => {
                  const isSelected = quizAnswer === idx;
                  const isCorrect = idx === quizQuestion.correctIndex;

                  let btnStyle = 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800';
                  if (quizSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={quizSubmitted}
                      onClick={() => handleSelectQuiz(idx)}
                      className={`w-full p-3.5 rounded-xl border text-left text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && isCorrect && <Check className="w-5 h-5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2 animate-fade-in">
                  <p className="font-bold text-slate-900">{quizQuestion.explanation}</p>
                  <button
                    onClick={() => {
                      setQuizAnswer(null);
                      setQuizSubmitted(false);
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer pt-1"
                  >
                    Сұрақты қайта тапсыру
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
          >
            Түсінікті, терезені жабу
          </button>
        </div>
      </div>
    </div>
  );
};
