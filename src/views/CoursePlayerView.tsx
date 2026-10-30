import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  CheckCircle2, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  HelpCircle, 
  BookOpen, 
  AlertTriangle, 
  Sparkles,
  Volume2,
  Maximize2
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';

export const CoursePlayerView: React.FC = () => {
  const { 
    courses, 
    selectedCourseId, 
    setActiveTab, 
    completeLesson, 
    completeCourseQuiz, 
    showToast 
  } = useVolunteer();

  const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  const [activeLessonId, setActiveLessonId] = useState<string>('l4');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(45); // simulated percent
  
  // Interactive quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Situational simulation interactive state
  const [triageSteps, setTriageSteps] = useState<number[]>([]);
  const [triageFeedback, setTriageFeedback] = useState<string | null>(null);

  const activeLesson = currentCourse.lessons.find(l => l.id === activeLessonId) || currentCourse.lessons[0];

  const handleSelectQuizOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    if (!currentCourse.quiz) return;
    const answeredCount = Object.keys(quizAnswers).length;
    if (answeredCount < currentCourse.quiz.length) {
      showToast('Будь ласка, дайте відповіді на всі запитання тесту!');
      return;
    }

    setQuizSubmitted(true);
    let correctCount = 0;
    currentCourse.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    if (correctCount >= 2) {
      setIsQuizCompleted(true);
      completeCourseQuiz(currentCourse.id, correctCount);
    } else {
      showToast(`Результат: ${correctCount}/${currentCourse.quiz.length}. Спробуйте ще раз для отримання сертифіката.`);
    }
  };

  const handleTriageStepClick = (stepIndex: number) => {
    if (triageSteps.includes(stepIndex)) return;
    const newSteps = [...triageSteps, stepIndex];
    setTriageSteps(newSteps);

    // Correct order: 0: Оцінити безпеку -> 1: Прямий тиск -> 2: Накласти турнікет -> 3: Зафіксувати час
    if (newSteps.length === 4) {
      const isCorrect = newSteps[0] === 0 && newSteps[1] === 1 && newSteps[2] === 2 && newSteps[3] === 3;
      if (isCorrect) {
        setTriageFeedback('🎉 Бездоганно! Ви точно дотрималися алгоритму CABCDE: Безпека → Прямий тиск → Турнікет → Фіксація часу.');
      } else {
        setTriageFeedback('⚠️ Порядок кроків відрізняється від протоколу. Пам\'ятайте: спочатку оцінка безпеки та прямий тиск, потім турнікет та час.');
      }
    }
  };

  const resetTriage = () => {
    setTriageSteps([]);
    setTriageFeedback(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* 1. Header Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('learning')}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">
              Навчальний модуль · {currentCourse.category}
            </span>
            <h1 className="text-lg sm:text-xl font-black font-heading text-slate-900 leading-tight">
              {currentCourse.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-slate-500 font-medium">Прогрес курсу</span>
            <p className="text-xs font-bold font-mono text-blue-900">{currentCourse.progressPercent}% виконано</p>
          </div>
          <div className="w-24 bg-slate-100 h-2.5 rounded-full overflow-hidden hidden sm:block">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all"
              style={{ width: `${currentCourse.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Main Player Layout: Left Lesson Content & Right Syllabus */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 spans): Video, Lesson interactive content, Quiz */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Lesson Header */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>{activeLesson.title}</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                Тривалість: {activeLesson.duration}
              </span>
            </div>

            {/* Video Player Simulator */}
            {activeLesson.type !== 'test' && (
              <div className="mt-4 relative rounded-2xl overflow-hidden bg-slate-950 aspect-video shadow-lg group">
                <img
                  src={currentCourse.imageUrl}
                  alt={activeLesson.title}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 flex flex-col justify-between p-4">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-xs font-medium bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-xs">
                      1080p HD · Український дубляж
                    </span>
                    <span className="text-xs font-mono bg-black/50 px-2 py-1 rounded-md">
                      04:12 / 18:30
                    </span>
                  </div>

                  {/* Big Play button */}
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                      className="w-16 h-16 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all cursor-pointer"
                    >
                      {isPlayingVideo ? (
                        <Pause className="w-7 h-7" />
                      ) : (
                        <Play className="w-7 h-7 fill-white ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Scrubber */}
                  <div className="space-y-1">
                    <div className="w-full bg-white/30 h-1.5 rounded-full overflow-hidden cursor-pointer">
                      <div 
                        className="bg-amber-400 h-full rounded-full transition-all"
                        style={{ width: `${isPlayingVideo ? 65 : videoProgress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-white/80 text-[11px]">
                      <span>{isPlayingVideo ? 'Відтворення навчального матеріалу...' : 'Пауза: зупинка кровотечі турнікетом'}</span>
                      <div className="flex items-center gap-3">
                        <Volume2 className="w-4 h-4" />
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Lesson Text & Key Rules */}
            {activeLesson.type !== 'test' && (
              <div className="mt-5 space-y-4">
                <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p className="font-semibold text-slate-900 text-sm">
                    {activeLesson.content || 'Матеріал уроку фокусується на швидких та рішучих діях рятувальника. У надзвичайних ситуаціях перші 60 секунд мають вирішальне значення.'}
                  </p>
                </div>

                {/* Important Notice Callout */}
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-relaxed">
                    <strong className="block text-sm font-heading">Золотий стандарт Thymus:</strong>
                    Ніколи не знімайте та не послаблюйте накладений турнікет самостійно на етапі волонтерської допомоги! Це право має виключно кваліфікований лікар у хірургічному стаціонарі.
                  </div>
                </div>

                {/* Interactive Triage Exercise (Engagement feature) */}
                <div className="p-5 bg-blue-50/70 rounded-2xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
                        Інтерактивний тренажер навичок
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 font-heading">
                        Ситуаційний кейс: Зупинка критичної кровотечі
                      </h4>
                    </div>
                    <button
                      onClick={resetTriage}
                      className="text-xs text-blue-700 hover:text-blue-900 font-semibold"
                    >
                      Скинути
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mt-2">
                    Встановіть правильний порядок ваших дій (натискайте послідовно):
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {[
                      { idx: 0, text: '1. Оцінити власну безпеку (відсутність вогню/обвалу)' },
                      { idx: 1, text: '2. Здійснити прямий тиск на рану рукою в рукавичці' },
                      { idx: 2, text: '3. Накласти кровоспинний турнікет на 5-7 см вище рани' },
                      { idx: 3, text: '4. Записати маркером точний час накладання джгута' }
                    ].map(step => {
                      const isChosen = triageSteps.includes(step.idx);
                      const order = triageSteps.indexOf(step.idx) + 1;
                      return (
                        <button
                          key={step.idx}
                          type="button"
                          onClick={() => handleTriageStepClick(step.idx)}
                          className={`p-2.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${
                            isChosen
                              ? 'bg-blue-700 text-white border-blue-700 font-semibold'
                              : 'bg-white text-slate-800 border-slate-300 hover:border-blue-400'
                          }`}
                        >
                          <span>{step.text}</span>
                          {isChosen && (
                            <span className="w-5 h-5 rounded-full bg-amber-400 text-blue-950 font-bold flex items-center justify-center text-[10px] shrink-0 ml-2">
                              {order}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {triageFeedback && (
                    <div className="mt-3 p-3 bg-white rounded-xl border border-blue-300 text-xs font-medium text-slate-800 animate-in fade-in">
                      {triageFeedback}
                    </div>
                  )}
                </div>

                {/* Mark as complete button */}
                <div className="pt-3 flex items-center justify-between">
                  <button
                    onClick={() => {
                      completeLesson(currentCourse.id, activeLesson.id);
                      showToast(`Урок "${activeLesson.title}" відзначено як пройдений (+25 балів)!`);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Позначити урок як завершений (+25 балів)</span>
                  </button>

                  <button
                    onClick={() => setActiveLessonId('l5')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <span>Перейти до тесту</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Test Module for Lesson 5 */}
            {activeLesson.type === 'test' && currentCourse.quiz && (
              <div className="mt-4 space-y-6">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h3 className="text-base font-bold text-blue-950 font-heading">
                    Підсумкове тестування знань: Перша допомога
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Дайте відповідь на 3 практичні запитання для перевірки готовності та отримання офіційного Сертифіката Thymus.
                  </p>
                </div>

                <div className="space-y-5">
                  {currentCourse.quiz.map((q, qIdx) => (
                    <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                      <p className="text-xs sm:text-sm font-bold text-slate-900">
                        {qIdx + 1}. {q.question}
                      </p>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = quizAnswers[q.id] === optIdx;
                          const isCorrect = q.correctAnswer === optIdx;
                          let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                          if (quizSubmitted) {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-semibold';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                            }
                          } else if (isSelected) {
                            btnStyle = 'bg-blue-50 border-blue-600 text-blue-900 font-semibold ring-1 ring-blue-600';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectQuizOption(q.id, optIdx)}
                              className={`w-full p-2.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg italic">
                          💡 Пояснення: {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Submit / Certificate issuance button */}
                <div className="pt-2">
                  {!isQuizCompleted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-700/20 transition-all cursor-pointer"
                    >
                      Перевірити результати та отримати сертифікат
                    </button>
                  ) : (
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-3">
                      <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                        <Award className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-black font-heading text-emerald-950">
                        Тест успішно складено! +150 балів нараховано
                      </h4>
                      <p className="text-xs text-emerald-800">
                        Сертифікат з унікальним номером згенеровано та додано до вашого волонтерського профілю.
                      </p>
                      <button
                        onClick={() => setActiveTab('profile')}
                        className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        Переглянути мій сертифікат у профілі
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Syllabus & Lesson list */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Програма курсу</span>
              <span className="text-xs text-slate-500 font-mono">
                {currentCourse.lessons.length} уроків
              </span>
            </h3>

            <div className="space-y-2 mt-3">
              {currentCourse.lessons.map((lesson, idx) => {
                const isActive = activeLessonId === lesson.id;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => setActiveLessonId(lesson.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                      isActive
                        ? 'bg-blue-50/80 border-blue-600 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isActive ? (
                        <Play className="w-4 h-4 text-blue-700 fill-blue-700" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-500">
                          {idx + 1}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className={`font-semibold leading-snug ${isActive ? 'text-blue-900 font-bold' : 'text-slate-800'}`}>
                        {lesson.title}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                        <span>{lesson.duration}</span>
                        <span>·</span>
                        <span className="capitalize">{lesson.type}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <p className="font-bold text-slate-800">Маєте питання щодо матеріалу?</p>
            <p className="text-[11px] leading-relaxed">
              Ви можете поставити запитання куратору медичного напрямку у розділі "Спільнота" у каналі "Проєкт: Медична допомога".
            </p>
            <button
              onClick={() => setActiveTab('chat')}
              className="text-xs text-blue-700 hover:text-blue-900 font-bold"
            >
              Перейти до чату медиків →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
