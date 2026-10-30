import React, { useState } from 'react';
import { 
  TrendingUp, 
  Award, 
  Crown, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  ChevronRight, 
  Share2, 
  Upload, 
  Heart,
  Send
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';

export const GrowthTrajectoryView: React.FC = () => {
  const { profile, showToast } = useVolunteer();
  const [storyText, setStoryText] = useState('');
  const [storyProject, setStoryProject] = useState('Підтримка дітей');
  const [isStorySubmitted, setIsStorySubmitted] = useState(false);

  const levelsHierarchy = [
    {
      level: 'Новачок',
      pointsReq: '0 – 500 балів',
      status: 'Пройдено',
      color: 'slate',
      perks: ['Доступ до загального чату', 'Базові навчальні модулі', 'Участь у волонтерських змінах під кураторством']
    },
    {
      level: 'Бронзовий',
      pointsReq: '500 – 1 500 балів',
      status: 'Пройдено',
      color: 'emerald',
      perks: ['Доступ до всіх напрямків проєктів', 'Сертифікація першої допомоги', 'Участь у Happy Thursday Draw']
    },
    {
      level: 'Срібний',
      pointsReq: '1 500 – 3 000 балів',
      status: 'Поточний статус',
      current: true,
      color: 'blue',
      perks: ['Право бути Ментором (наставником новачків)', 'Компенсація витрат на пальне та проїзд', 'Спеціальні воркшопи психоемоційної підтримки']
    },
    {
      level: 'Золотий',
      pointsReq: '3 000 – 5 000 балів',
      status: 'Наступна ціль (ще 520 б.)',
      color: 'amber',
      perks: ['Самостійна координація локальних міні-проєктів', 'Квитки на щорічний міжнародний саміт Thymus', 'Доступ до преміального фонду мерчу та спорядження']
    },
    {
      level: 'Платиновий',
      pointsReq: '5 000 – 10 000 балів',
      status: 'Лідер напрямку',
      color: 'purple',
      perks: ['Участь у стратегічних радах директорів фонду', 'Керівництво регіональними штабами волонтерів', 'Грантова підтримка авторських соціальних ініціатив']
    },
    {
      level: 'Амбасадор Thymus',
      pointsReq: '10 000+ балів або спецвідзнака',
      status: 'Почесна місія',
      color: 'sky',
      perks: ['Офіційне представлення фонду в медіа та урядових інституціях', 'Спікерство на міжнародних форумах', 'Створення ключового PR-контенту місії добра']
    }
  ];

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyText.trim()) return;
    setIsStorySubmitted(true);
    showToast('Дякуємо! Вашу історію передано прес-службі The Thymus Foundation для соцмереж!');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-amber-900 rounded-2xl p-6 text-white shadow-lg border border-amber-400/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">
              ШЛЯХ РОЗВИТКУ ОСОБИСТОСТІ У ФОНДІ
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-heading mt-1">
              Траєкторія лідерства та наставництва
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-2xl">
              Навчайся → Отримуй досвід → Допомагай → Підвищуй рівень → Отримуй визнання → Ставай наставником та амбасадором!
            </p>
          </div>

          <div className="bg-white/10 px-4 py-3 rounded-2xl border border-white/20 text-center">
            <span className="text-[10px] text-amber-300 uppercase font-bold">Ваш поточний рівень</span>
            <p className="text-xl font-black text-white mt-0.5 font-heading">
              {profile.level} (Рівень {profile.levelNumber})
            </p>
            <span className="text-[11px] text-blue-200">
              {profile.points.toLocaleString()} / 3 000 балів до Золотого
            </span>
          </div>
        </div>
      </div>

      {/* 2. Stepper Career Ladder */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <h3 className="font-bold text-base text-slate-900 font-heading">
          Сходинки зростання волонтера The Thymus Foundation
        </h3>

        <div className="space-y-4">
          {levelsHierarchy.map((lvl, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                lvl.current
                  ? 'bg-blue-50/80 border-blue-600 shadow-sm ring-2 ring-blue-600/20'
                  : lvl.status === 'Пройдено'
                  ? 'bg-slate-50/60 border-slate-200'
                  : 'bg-white border-slate-200 opacity-80'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className={`text-base font-black font-heading ${lvl.current ? 'text-blue-900' : 'text-slate-900'}`}>
                    {lvl.level}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white text-slate-700 border border-slate-200 font-mono">
                    {lvl.pointsReq}
                  </span>
                  {lvl.current && (
                    <span className="px-2 py-0.5 bg-blue-700 text-white font-bold text-[10px] rounded uppercase">
                      Ви зараз тут
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {lvl.perks.map((perk, pIdx) => (
                    <span
                      key={pIdx}
                      className="text-xs px-2.5 py-1 bg-white rounded-lg border border-slate-200/80 text-slate-700 font-medium"
                    >
                      ✓ {perk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className={`text-xs font-bold ${
                  lvl.current ? 'text-blue-800' : lvl.status === 'Пройдено' ? 'text-emerald-700' : 'text-slate-400'
                }`}>
                  {lvl.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Mentor & Ambassador Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Mentorship Program */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700">Програма наставництва</span>
              <h4 className="text-base font-bold text-slate-900 font-heading">
                Олена — Сертифікований Mentor
              </h4>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Як волонтер Срібного рівня, ви допомагаєте новачкам адаптуватися в команді, ділитеся досвідом на перших виїздах та підтримуєте корпоративну культуру взаємоповаги Thymus.
          </p>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="font-semibold text-slate-800">Ваші підопічні зараз:</span>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-600">
              <span className="px-2 py-1 bg-white border border-slate-200 rounded">
                👤 Ірина М. (Новачок, Кардіфф)
              </span>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded">
                👤 Павло К. (Новачок, Свонсі)
              </span>
            </div>
          </div>

          <button
            onClick={() => showToast('Відкрито кабінет наставника з методичними матеріалами адаптації.')}
            className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Відкрити інструменти наставника
          </button>
        </div>

        {/* Thymus Ambassador Mission */}
        <div className="bg-gradient-to-br from-[#0F2D59] to-[#16417A] text-white rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-400 text-blue-950 rounded-xl flex items-center justify-center font-black">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-300">Почесний статус</span>
              <h4 className="text-base font-bold text-white font-heading">
                Амбасадор добра і милосердя
              </h4>
            </div>
          </div>

          <p className="text-xs text-blue-100 leading-relaxed">
            Амбасадори The Thymus Foundation — це обличчя руху. Вони представляють цінності фонду на відкритих зустрічах, залучають меценатів та розповідають правду про соціальну взаємодію у світі.
          </p>

          <div className="p-3 bg-white/10 rounded-xl border border-white/20 text-xs text-blue-100 space-y-1">
            <p>✓ Публічні виступи та інтерв'ю</p>
            <p>✓ Участь у дипломатичних та благодійних вечорах</p>
            <p>✓ Можливість заснування авторських напрямків допомоги</p>
          </div>

          <button
            onClick={() => showToast('Інформація про кваліфікацію в Амбасадори надіслана вам на email.')}
            className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-blue-950 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Дізнатися критерії відбору в Амбасадори
          </button>
        </div>

      </div>

      {/* 4. "Моя історія волонтерства" Submission Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900 font-heading">
              Поділіться своєю історією волонтерства
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Після модерації фонд публікує надихаючі історії в Instagram, Facebook та Telegram-каналі Thymus.
            </p>
          </div>
          <Share2 className="w-5 h-5 text-slate-400" />
        </div>

        {!isStorySubmitted ? (
          <form onSubmit={handleStorySubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Проєкт або подія</label>
              <input
                type="text"
                value={storyProject}
                onChange={e => setStoryProject(e.target.value)}
                placeholder="Наприклад: Підтримка дітей у Кардіффі"
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Ваша розповідь</label>
              <textarea
                value={storyText}
                onChange={e => setStoryText(e.target.value)}
                rows={4}
                placeholder="«Сьогодні я вперше допомагала у програмі... Найбільше запам'яталося... Я зрозуміла, що...»"
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Надіслати історію координаторам фонду</span>
            </button>
          </form>
        ) : (
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-300 text-xs text-emerald-950 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Вашу історію прийнято! Дякуємо за відкритість та натхнення.</span>
            </div>
            <button
              onClick={() => setIsStorySubmitted(false)}
              className="text-emerald-800 hover:underline font-bold"
            >
              Написати ще одну
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
