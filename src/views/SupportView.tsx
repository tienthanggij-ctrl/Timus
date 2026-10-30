import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Brain, 
  Phone, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Coffee, 
  AlertCircle,
  HelpCircle,
  Activity
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';

export const SupportView: React.FC = () => {
  const { profile, updateProfile, showToast, setIsEmergencyModalOpen } = useVolunteer();
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationDate, setConsultationDate] = useState('');
  const [consultationTopic, setConsultationTopic] = useState('Емоційне вигорання');
  
  // Interactive Burnout Self-Assessment State
  const [burnoutAnswers, setBurnoutAnswers] = useState<number[]>([1, 1, 1, 1, 1]);
  const [assessmentCalculated, setAssessmentCalculated] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConsultationModalOpen(false);
    showToast(`Запит на індивідуальну консультацію з психологом надіслано. Куратор зв'яжеться конфіденційно.`);
  };

  const handlePauseVolunteering = () => {
    const newStatus = profile.status === 'НА ПАУЗІ' ? 'АКТИВНИЙ ВОЛОНТЕР' : 'НА ПАУЗІ';
    updateProfile({ status: newStatus as any });
    showToast(newStatus === 'НА ПАУЗІ' ? 'Ваш статус змінено на "НА ПАУЗІ". Відпочивайте та відновлюйте сили!' : 'З поверненням до активного волонтерства!');
  };

  const calculateBurnoutScore = () => {
    const total = burnoutAnswers.reduce((a, b) => a + b, 0);
    setAssessmentCalculated(true);
  };

  const totalScore = burnoutAnswers.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-blue-900 rounded-2xl p-6 text-white shadow-lg border border-teal-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">
              ЦІЛІСНЕ БЛАГОПОЛУЧЧЯ ВОЛОНТЕРА (WELLBEING)
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-heading mt-1">
              Психологічна підтримка та супервізія
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-2xl">
              «Турбота про себе — це сила, а не слабкість». Фонд гарантує професійну допомогу, право на відпочинок та безпечний простір для відновлення ресурсу.
            </p>
          </div>

          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer self-start md:self-auto flex items-center gap-2"
          >
            <span>Екстрена допомога 24/7</span>
          </button>
        </div>
      </div>

      {/* 2. Key Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Pillar 1: Psychologist consultation */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-all">
          <div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center mb-3">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 font-heading">
              Індивідуальна бесіда з психологом
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Повністю безкоштовні та конфіденційні сесії з ліцензованими психотерапевтами фонду для подолання стресу та втоми.
            </p>
          </div>
          <button
            onClick={() => setIsConsultationModalOpen(true)}
            className="mt-5 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Записатися на консультацію
          </button>
        </div>

        {/* Pillar 2: Group Supervision */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-3">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 font-heading">
              Групова супервізія команд
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Щомісячні фасилітовані зустрічі координаторів та волонтерів для розвантаження складних випадків та обміну досвідом.
            </p>
          </div>
          <button
            onClick={() => showToast('Ви зареєструвалися на наступну супервізійну сесію (Середа, 19:00).')}
            className="mt-5 w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Приєднатися до групи
          </button>
        </div>

        {/* Pillar 3: Right to Pause */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-all">
          <div>
            <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center mb-3">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 font-heading">
              Право на паузу та відновлення
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Ви можете у будь-який момент тимчасово призупинити волонтерську діяльність без втрати накопичених балів і статусу.
            </p>
          </div>
          <button
            onClick={handlePauseVolunteering}
            className={`mt-5 w-full py-2.5 font-bold text-xs rounded-xl transition-colors cursor-pointer ${
              profile.status === 'НА ПАУЗІ'
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {profile.status === 'НА ПАУЗІ' ? 'Відновити активний статус' : 'Взяти тимчасову паузу'}
          </button>
        </div>

      </div>

      {/* 3. Interactive Burnout Self-Assessment Tool */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900 font-heading flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span>Швидка самодіагностика: Оцінка рівня емоційного навантаження</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Дайте щиру відповідь за шкалою від 1 (рідко) до 4 (дуже часто):
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            'Чи відчуваєте ви хронічну втому після завершення волонтерської зміни?',
            'Чи важко вам емоційно відсторонитися від переживань підопічних фонду?',
            'Чи відчуваєте ви роздратування через дрібні організаційні труднощі?',
            'Чи помічаєте ви зниження концентрації уваги або порушення сну?',
            'Чи з\'являється відчуття, що вашої допомоги недостатньо, скільки б ви не робили?'
          ].map((q, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="font-medium text-slate-800">{idx + 1}. {q}</span>
              <div className="flex items-center gap-1.5 shrink-0">
                {[1, 2, 3, 4].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      const updated = [...burnoutAnswers];
                      updated[idx] = val;
                      setBurnoutAnswers(updated);
                      setAssessmentCalculated(false);
                    }}
                    className={`w-8 h-8 rounded-lg font-bold text-xs transition-all ${
                      burnoutAnswers[idx] === val
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={calculateBurnoutScore}
            className="w-full sm:w-auto px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm"
          >
            Розрахувати мій індекс Wellbeing
          </button>

          {assessmentCalculated && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex-1 animate-in fade-in">
              <span className="font-bold">
                {totalScore <= 9 ? '🟢 Зелена зона (Низький рівень стресу): ' : totalScore <= 14 ? '🟡 Жовта зона (Помірне навантаження): ' : '🔴 Червона зона (Високий ризик вигорання): '}
              </span>
              <span>
                {totalScore <= 9
                  ? 'Ваш ресурс у нормі. Продовжуйте дотримуватися балансу відпочинку та допомоги.'
                  : totalScore <= 14
                  ? 'Рекомендуємо зробити кілька днів паузи, прогулятися парком або відвідати групу супервізії.'
                  : 'Будь ласка, зверніться до нашого психолога для розвантаження. Ваше здоров\'я — головний пріоритет.'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Consultation Modal */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-100">
              Запис на конфіденційну психологічну консультацію
            </h3>

            <form onSubmit={handleBookingSubmit} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Основна тема бесіди</label>
                <select
                  value={consultationTopic}
                  onChange={e => setConsultationTopic(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Емоційне вигорання">Емоційне вигорання та втома</option>
                  <option value="Стрес від роботи з травмою">Вторинна травма від важких історій</option>
                  <option value="Конфлікт або складнощі адаптації">Складнощі у команді або адаптація</option>
                  <option value="Особисті переживання">Особисті переживання та тривожність</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Зручний день та час</label>
                <input
                  type="text"
                  value={consultationDate}
                  onChange={e => setConsultationDate(e.target.value)}
                  placeholder="Наприклад: вівторок після 18:00"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500">
                Консультація відбувається онлайн у захищеній кімнаті або очно в офісі фонду. Всі дані суворо конфіденційні.
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsConsultationModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
                >
                  Підтвердити запис
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
