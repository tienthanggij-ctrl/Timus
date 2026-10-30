import React, { useState } from 'react';
import { 
  X, 
  LifeBuoy, 
  PhoneCall, 
  Bot, 
  ShieldAlert, 
  HeartHandshake, 
  Send, 
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';

export const EmergencySOSModal: React.FC = () => {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, showToast, language, t } = useVolunteer();
  const [activeTab, setActiveTab] = useState<'contacts' | 'bot' | 'report'>('contacts');
  const [reportText, setReportText] = useState('');
  const [reportLocation, setReportLocation] = useState('');
  const [botMessages, setBotMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: language === 'en'
        ? 'Welcome! I am the on-duty Thymus 24/7 Safety Assistant. If you face an urgent situation or require crisis assistance, chat here or use the hotlines below.'
        : 'Вітаю! Я черговий черговий асистент безпеки Thymus 24/7. Якщо у вас виникла екстрена ситуація, потрібна консультація лікаря або координатора — напишіть сюди або скористайтеся прямими номерами.',
      time: '24/7'
    }
  ]);
  const [botInput, setBotInput] = useState('');

  if (!isEmergencyModalOpen) return null;

  const handleSendBotMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!botInput.trim()) return;

    const userMsg = botInput.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setBotMessages(prev => [...prev, { sender: 'user', text: userMsg, time: now }]);
    setBotInput('');

    setTimeout(() => {
      let reply = 'Ваше повідомлення передано черговому координатору зміни. Очікуйте на зв\'язок протягом 3–5 хвилин. За крайньої небезпеки телефонуйте 999 (UK) або 112 (EU/UA).';
      if (userMsg.toLowerCase().includes('вигорання') || userMsg.toLowerCase().includes('стрес') || userMsg.toLowerCase().includes('психолог')) {
        reply = 'Психологічна кризова підтримка: ви можете зателефонувати безпосередньо черговому психологу за номером +44 800 123 4567 (опція 2) або відкрити розділ "Підтримка" в меню.';
      } else if (userMsg.toLowerCase().includes('травма') || userMsg.toLowerCase().includes('кров') || userMsg.toLowerCase().includes('швидка')) {
        reply = 'Увага! При фізичній травмі чи загрозі життю терміново викликайте швидку 999/112! Координатор безпеки вже сповіщений про ваш сигнал тривоги.';
      }
      setBotMessages(prev => [...prev, { sender: 'bot', text: reply, time: now }]);
    }, 600);
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    showToast('Сигнал про інцидент безпеки надіслано координаторам штабу.');
    setReportText('');
    setReportLocation('');
    setActiveTab('contacts');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-rose-200">
        
        {/* Header with SOS theme */}
        <div className="flex items-center justify-between px-6 py-4 bg-rose-600 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-rose-700 rounded-lg">
              <LifeBuoy className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">{t('sos.title')}</h3>
              <p className="text-[11px] text-rose-100">{t('sos.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEmergencyModalOpen(false)}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-rose-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-1 gap-1">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'contacts'
                ? 'bg-white text-rose-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('sos.tabPhones')}
          </button>
          <button
            onClick={() => setActiveTab('bot')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'bot'
                ? 'bg-white text-rose-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('sos.tabBot')}
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'report'
                ? 'bg-white text-rose-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('sos.tabReport')}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          
          {/* TAB 1: DIRECT HOTLINES */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900">
                  <p className="font-bold">Пам'ятайте про правило безпеки:</p>
                  <p className="mt-0.5 text-amber-800 leading-relaxed">
                    Якщо є загроза життю чи здоров'ю, насамперед викликайте державні екстрені служби (<strong>999</strong> у UK або <strong>112</strong> в Україні/Європі).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* UK Hotline */}
                <div className="p-4 rounded-xl border border-slate-200 hover:border-rose-300 hover:shadow-sm transition-all bg-white">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Великобританія (UK)</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">Гаряча лінія волонтерів</h4>
                  <p className="text-xs font-mono font-bold text-rose-600 mt-1">0800 123 4567</p>
                  <p className="text-[11px] text-slate-500 mt-1">Безкоштовно з усіх мобільних та міських номерів UK</p>
                  <a
                    href="tel:08001234567"
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-bold transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Зателефонувати
                  </a>
                </div>

                {/* Ukraine Hotline */}
                <div className="p-4 rounded-xl border border-slate-200 hover:border-rose-300 hover:shadow-sm transition-all bg-white">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Україна (UA)</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">Кризовий центр Thymus</h4>
                  <p className="text-xs font-mono font-bold text-rose-600 mt-1">0 800 500 335</p>
                  <p className="text-[11px] text-slate-500 mt-1">Цілодобово, безкоштовно по всій Україні</p>
                  <a
                    href="tel:0800500335"
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-bold transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Зателефонувати
                  </a>
                </div>

                {/* Duty Coordinator */}
                <div className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all bg-white">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Оперативний штаб</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">Черговий координатор</h4>
                  <p className="text-xs font-mono font-bold text-blue-700 mt-1">+44 7700 900999</p>
                  <p className="text-[11px] text-slate-500 mt-1">Питання логістики, доступу до об'єктів та заміни</p>
                  <a
                    href="tel:+447700900999"
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Зв'язатися
                  </a>
                </div>

                {/* Psychological Crisis Support */}
                <div className="p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all bg-white">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Психоемоційна підтримка</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">Психолог екстреної лінії</h4>
                  <p className="text-xs font-mono font-bold text-emerald-700 mt-1">+44 20 7946 0192</p>
                  <p className="text-[11px] text-slate-500 mt-1">Конфіденційна допомога при паніці та вигоранні</p>
                  <a
                    href="tel:+442079460192"
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-colors"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    Отримати підтримку
                  </a>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: 24/7 AI / DISPATCH BOT */}
          {activeTab === 'bot' && (
            <div className="flex flex-col h-[340px]">
              <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
                {botMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-blue-700 text-white rounded-br-none'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className={`text-[10px] mt-1 block ${msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bot Input */}
              <form onSubmit={handleSendBotMessage} className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={botInput}
                  onChange={e => setBotInput(e.target.value)}
                  placeholder="Опишіть ситуацію або поставте запитання..."
                  className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Надіслати</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: REPORT AN ISSUE */}
          {activeTab === 'report' && (
            <form onSubmit={handleSendReport} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Локація або проєкт
                </label>
                <input
                  type="text"
                  value={reportLocation}
                  onChange={e => setReportLocation(e.target.value)}
                  placeholder="Наприклад: Cardiff Community Centre, зміна 15 вересня"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Детальний опис проблеми або інциденту безпеки
                </label>
                <textarea
                  value={reportText}
                  onChange={e => setReportText(e.target.value)}
                  rows={4}
                  placeholder="Опишіть, що сталося (пошкодження майна, небезпечна ситуація, конфлікт, потреба в терміновій заміні волонтера)..."
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600">
                Звіт негайно потрапить до чергової служби безпеки фонду. За потреби ми зв'яжемося з вами за вказаним у профілі номером телефону.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/30 transition-all cursor-pointer"
              >
                Надіслати терміновий звіт черговому
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
