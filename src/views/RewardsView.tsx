import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Award, 
  Ticket, 
  Gift, 
  Clock, 
  CheckCircle2, 
  Lock, 
  ShieldCheck, 
  Info,
  ShoppingBag
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';
import { initialRewards } from '../data/mockData';

export const RewardsView: React.FC = () => {
  const { 
    profile, 
    badges, 
    certificates, 
    redeemReward, 
    addPoints,
    showToast 
  } = useVolunteer();

  const [activeTab, setActiveTab] = useState<'points' | 'badges' | 'draw' | 'store'>('points');
  const [ticketsCount, setTicketsCount] = useState(4);
  const [hasEnteredDraw, setHasEnteredDraw] = useState(false);

  const handleEnterDraw = () => {
    if (ticketsCount <= 0) {
      showToast('У вас немає активних квитків. Відвідайте волонтерську зміну для отримання нових!');
      return;
    }
    setHasEnteredDraw(true);
    showToast('🎉 Ваші 4 квитки успішно зареєстровано на розіграш Happy Thursday цього тижня!');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-amber-900 rounded-2xl p-6 text-white shadow-lg border border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">
              СИСТЕМА ВИЗНАННЯ ТА ВИНАГОРОД
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-heading mt-1">
              Мої винагороди та досягнення
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-2xl">
              Визнання цінності кожної хвилини вашої праці. Отримуйте бали, відзнаки та беріть участь у заходах спільноти.
            </p>
          </div>

          <div className="bg-white/10 px-5 py-3 rounded-2xl backdrop-blur-xs border border-white/20 text-center">
            <span className="text-xs uppercase text-amber-300 font-bold block">Поточний баланс</span>
            <span className="text-3xl font-black font-heading text-white tabular-nums">
              {profile.points.toLocaleString()}
            </span>
            <span className="text-[11px] text-blue-200 block">балів визнання</span>
          </div>
        </div>
      </div>

      {/* 2. Sub-tabs Switcher */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('points')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'points'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Бали та статус</span>
        </button>

        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'badges'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Досягнення ({badges.filter(b => b.unlocked).length}/{badges.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('draw')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'draw'
              ? 'bg-amber-500 text-blue-950 shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>Happy Thursday ({ticketsCount} квитки)</span>
        </button>

        <button
          onClick={() => setActiveTab('store')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'store'
              ? 'bg-blue-700 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Магазин відзнак</span>
        </button>
      </div>

      {/* 3. TAB 1: POINTS & STATUS PROGRESS */}
      {activeTab === 'points' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 font-heading mb-4">
              Ваш рух сходами волонтерського корпусу
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Поточний рівень</span>
                <p className="text-xl font-black text-blue-900 mt-1 font-heading">
                  {profile.level} волонтер (Рівень {profile.levelNumber})
                </p>
                <p className="text-xs text-slate-600 mt-2">
                  Доступ до складної логістики, внутрішніх супервізій та наставництва.
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <span className="text-xs text-amber-800 font-medium">Наступний рівень</span>
                <p className="text-xl font-black text-amber-950 mt-1 font-heading">
                  Золотий волонтер
                </p>
                <p className="text-xs text-amber-800 mt-2">
                  Залишилося набрати: <strong>{profile.pointsToNextLevel} балів</strong>.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Прогрес рівня</span>
                  <span className="font-mono">{profile.levelProgressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 via-sky-500 to-amber-500 h-full rounded-full"
                    style={{ width: `${profile.levelProgressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-500 block text-right">
                  Ціль: 3 000 балів
                </span>
              </div>
            </div>

            {/* Ways to earn points */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="font-bold text-sm text-slate-900 mb-3">
                Як отримувати додаткові бали визнання:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-blue-900 block">+50 – 100 балів</span>
                  <span className="text-slate-600">Відпрацьована волонтерська зміна або проєкт</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-amber-700 block">+150 балів</span>
                  <span className="text-slate-600">Успішне складання тесту та сертифікат у Hub</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-emerald-700 block">+75 балів</span>
                  <span className="text-slate-600">Відгук на запит у системі взаємодопомоги (P2P)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 4. TAB 2: BADGES & MEDALS CATALOG */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                badge.unlocked
                  ? 'bg-white border-slate-200 shadow-sm hover:border-amber-300'
                  : 'bg-slate-50/70 border-slate-200 opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${
                badge.unlocked ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-400'
              }`}>
                {badge.unlocked ? '🏆' : <Lock className="w-5 h-5 text-slate-400" />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">{badge.title}</h4>
                  {badge.unlocked && (
                    <span className="text-[10px] text-emerald-700 font-bold uppercase">
                      ✓ Отримано
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {badge.description}
                </p>
                {badge.unlockedAt && (
                  <span className="text-[10px] text-slate-400 font-mono mt-2 block">
                    Дата: {badge.unlockedAt}
                  </span>
                )}
                {badge.progress && (
                  <div className="mt-2 text-[10px] text-blue-800 font-bold font-mono">
                    Прогрес: {badge.progress.current} / {badge.progress.total}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. TAB 3: THYMUS COMMUNITY DRAW (HAPPY THURSDAY) */}
      {activeTab === 'draw' && (
        <div className="space-y-6">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F2D59] via-[#1B4B8B] to-[#12335E] text-white p-6 sm:p-8 shadow-xl border border-amber-400/30">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="px-3 py-1 bg-amber-400 text-blue-950 font-black text-xs rounded-full uppercase tracking-wider">
                🎉 Щотижневий розіграш спільноти
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-heading leading-tight">
                Thymus Happy Thursday
              </h2>
              <p className="text-xs sm:text-sm text-sky-200 leading-relaxed">
                Внутрішній спосіб подяки фонду за вашу відданість. Кожен відпрацьований проект та завершений курс автоматично дарують вам квитки на щотижневий розіграш пам'ятних подарунків та відзнак.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                  <span className="text-[10px] text-sky-200 uppercase block">Ваші квитки</span>
                  <span className="text-2xl font-black text-amber-300 font-mono tabular-nums">
                    {ticketsCount}
                  </span>
                  <span className="text-[10px] text-slate-300 block">активних участі</span>
                </div>

                <div className="bg-white/10 p-3 rounded-xl border border-white/20">
                  <span className="text-[10px] text-sky-200 uppercase block">До розіграшу</span>
                  <span className="text-2xl font-black text-white font-mono">
                    2д 14г
                  </span>
                  <span className="text-[10px] text-slate-300 block">Четвер, 18:00</span>
                </div>

                <div className="bg-white/10 p-3 rounded-xl border border-white/20 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-sky-200 uppercase block">Головний приз тижня</span>
                  <span className="text-xs font-bold text-amber-300 mt-1 block">
                    Фірмовий худі + Аптечка IFAK
                  </span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  disabled={hasEnteredDraw}
                  onClick={handleEnterDraw}
                  className={`px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer ${
                    hasEnteredDraw
                      ? 'bg-emerald-500 text-white cursor-default'
                      : 'bg-amber-400 hover:bg-amber-300 text-blue-950 font-black'
                  }`}
                >
                  {hasEnteredDraw ? '✓ Ваші 4 квитки зареєстровано на цей тиждень!' : 'Підтвердити участь у четверговому розіграші'}
                </button>
              </div>
            </div>
          </div>

          {/* Legal Compliance Box */}
          <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Юридичне застереження (UK Charity Compliance):</strong>
              Цей механізм є виключно внутрішньою некомерційною програмою визнання волонтерів The Thymus Foundation. Квитки не мають грошової вартості, не підлягають продажу або передачі третім особам, та нараховуються суто за фактичну участь у соціальних та навчальних ініціативах фонду.
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 4: REWARDS STORE */}
      {activeTab === 'store' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialRewards.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-36 object-cover rounded-xl bg-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-amber-600 font-mono">
                    {item.pointsCost} балів
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 mt-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <button
                onClick={() => redeemReward(item.pointsCost, item.title)}
                className="w-full mt-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Отримати за бали
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
