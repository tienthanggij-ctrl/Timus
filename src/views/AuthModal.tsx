import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Heart,
  Lock,
  Mail,
  Phone,
  User,
  MapPin,
  Calendar
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginAsDemo, 
    registerNewVolunteer, 
    showToast,
    language,
    setLanguage,
    t
  } = useVolunteer();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState(1);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('olena@gmail.com');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regBirthDate, setRegBirthDate] = useState('1995-06-15');
  const [regCity, setRegCity] = useState('Cardiff');

  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Медицина', 'Комунікація']);
  const [selectedDirections, setSelectedDirections] = useState<string[]>(['Люди', 'Медицина']);
  const [agreedCodeOfEthics, setAgreedCodeOfEthics] = useState(true);

  if (!isAuthModalOpen) return null;

  const availableSkills = [
    'Медицина', 'Психологія', 'IT', 'Дизайн', 'SMM', 'Транспорт',
    'Організація заходів', 'Робота з дітьми', 'Робота з літніми',
    'Допомога тваринам', 'Екологія', 'Адміністративна робота', 'Переклад',
    'Фотографія / відео', 'Кулінарія'
  ];

  const availableDirections = [
    { id: 'Люди', label: '❤️ Люди', desc: 'Підтримка сімей та ВПО' },
    { id: 'Медицина', label: '🏥 Медицина', desc: 'Домедична допомога та догляд' },
    { id: 'Освіта', label: '🎓 Освіта', desc: 'Менторство, уроки та тренінги' },
    { id: 'Екологія', label: '🌱 Екологія', desc: 'Очищення водойм та зелені акції' },
    { id: 'Тварини', label: '🐕 Тварини', desc: 'Притулки та зоозахист' },
    { id: 'Соціальна допомога', label: '🏠 Соціальна допомога', desc: 'Турбота про літніх та самотніх' },
    { id: 'Надзвичайні ситуації', label: '🚨 Надзвичайні ситуації', desc: 'Кризові центри та безпека' }
  ];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleDirection = (dirId: string) => {
    setSelectedDirections(prev =>
      prev.includes(dirId) ? prev.filter(d => d !== dirId) : [...prev, dirId]
    );
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsDemo();
  };

  const handleRegisterComplete = () => {
    if (!regFirstName.trim() || !regEmail.trim()) {
      showToast("Будь ласка, вкажіть ім'я та email на першому кроці.");
      setStep(1);
      return;
    }
    registerNewVolunteer({
      firstName: regFirstName.trim(),
      lastName: regLastName.trim() || 'Волонтер',
      email: regEmail.trim(),
      phone: regPhone.trim() || '+44 7700 900888',
      city: regCity.trim() || 'Cardiff',
      skills: selectedSkills,
      directions: selectedDirections
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Brand Banner */}
        <div className="relative bg-gradient-to-r from-[#0E2C59] to-[#18488C] text-white px-6 py-6 border-b border-blue-900">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center p-0.5 bg-black/25 rounded-lg border border-white/20">
              <button
                type="button"
                onClick={() => {
                  setLanguage('ua');
                  showToast('Мову змінено на українську 🇺🇦');
                }}
                className={`px-2 py-0.5 text-[11px] font-bold rounded cursor-pointer transition-all ${
                  language === 'ua' ? 'bg-white text-blue-950 shadow-xs' : 'text-white/70 hover:text-white'
                }`}
                title="Українська версія"
              >
                🇺🇦 UA
              </button>
              <button
                type="button"
                onClick={() => {
                  setLanguage('en');
                  showToast('Language changed to English 🇬🇧');
                }}
                className={`px-2 py-0.5 text-[11px] font-bold rounded cursor-pointer transition-all ${
                  language === 'en' ? 'bg-white text-blue-950 shadow-xs' : 'text-white/70 hover:text-white'
                }`}
                title="English version"
              >
                🇬🇧 EN
              </button>
            </div>

            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3 pr-20">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-400 to-amber-400 p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-[#0E2C59] rounded-[10px] flex items-center justify-center">
                <span className="text-xl font-black text-amber-400">T</span>
                <span className="text-xl font-black text-sky-400">F</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                THE THYMUS FOUNDATION
              </span>
              <h2 className="text-xl font-black font-heading text-white leading-tight">
                {mode === 'login' 
                  ? (language === 'en' ? 'Welcome to Thymus Community' : 'Ласкаво просимо до спільноти Thymus') 
                  : (language === 'en' ? 'Join Volunteer Corps' : 'Реєстрація у волонтерському корпусі')}
              </h2>
              <p className="text-xs text-blue-200 mt-0.5">
                {language === 'en' 
                  ? 'Together we can do more. Join people dedicated to making a difference.'
                  : 'Разом ми можемо більше. Приєднуйтесь до людей, які змінюють життя.'}
              </p>
            </div>
          </div>
        </div>

        {/* Toggle Mode Bar */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-1">
          <button
            onClick={() => { setMode('login'); setStep(1); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-blue-900 shadow-sm border border-slate-200/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('auth.loginTab')}
          </button>
          <button
            onClick={() => { setMode('register'); setStep(1); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-blue-900 shadow-sm border border-slate-200/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t('auth.registerTab')}
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          
          {/* ================= LOGIN FORM ================= */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('auth.emailOrPhone')}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>{t('auth.rememberMe')}</span>
                </label>
                <button
                  type="button"
                  onClick={() => showToast(language === 'en' ? 'Password reset instructions sent to your email.' : 'Посилання на скидання паролю надіслано на email.')}
                  className="text-blue-700 hover:text-blue-900 font-medium cursor-pointer"
                >
                  {t('auth.forgotPassword')}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-700/20 transition-all cursor-pointer"
              >
                {t('auth.loginBtn')}
              </button>

              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={loginAsDemo}
                  className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{t('auth.quickDemo')}</span>
                </button>
              </div>

              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-center">
                <p className="text-[11px] italic text-blue-800">
                  {t('auth.quote')}
                </p>
              </div>
            </form>
          )}

          {/* ================= STEP-BY-STEP REGISTRATION ================= */}
          {mode === 'register' && (
            <div>
              {/* Stepper indicator */}
              <div className="flex items-center justify-between mb-6 px-2">
                {[
                  { num: 1, title: language === 'en' ? 'Profile' : 'Дані' },
                  { num: 2, title: language === 'en' ? 'Skills' : 'Навички' },
                  { num: 3, title: language === 'en' ? 'Causes' : 'Напрямки' },
                  { num: 4, title: language === 'en' ? 'Launch' : 'Старт' }
                ].map((s, idx) => (
                  <div key={s.num} className="flex items-center gap-1.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step === s.num
                          ? 'bg-blue-700 text-white ring-4 ring-blue-100'
                          : step > s.num
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {step > s.num ? '✓' : s.num}
                    </div>
                    <span className={`text-[11px] font-semibold hidden sm:inline ${
                      step === s.num ? 'text-blue-900 font-bold' : 'text-slate-500'
                    }`}>
                      {s.title}
                    </span>
                    {idx < 3 && <div className="w-6 sm:w-8 h-0.5 bg-slate-200 mx-1" />}
                  </div>
                ))}
              </div>

              {/* STEP 1: Basic info */}
              {step === 1 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">{t('auth.step1Title')}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Ім'я</label>
                      <input
                        type="text"
                        value={regFirstName}
                        onChange={e => setRegFirstName(e.target.value)}
                        placeholder="Наприклад: Олена"
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Прізвище</label>
                      <input
                        type="text"
                        value={regLastName}
                        onChange={e => setRegLastName(e.target.value)}
                        placeholder="Наприклад: Кравченко"
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Телефон</label>
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={e => setRegPhone(e.target.value)}
                        placeholder="+44 7700 900123"
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Місто перебування</label>
                      <input
                        type="text"
                        value={regCity}
                        onChange={e => setRegCity(e.target.value)}
                        placeholder="Cardiff / Київ / Swansea"
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Дата народження</label>
                      <input
                        type="date"
                        value={regBirthDate}
                        onChange={e => setRegBirthDate(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (!regFirstName.trim() || !regEmail.trim()) {
                          showToast("Будь ласка, заповніть обов'язкові поля: Ім'я та Email.");
                          return;
                        }
                        setStep(2);
                      }}
                      className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Далі: Досвід та навички</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Skills */}
              {step === 2 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">Крок 2: Розкажіть про свої навички</h3>
                    <span className="text-[11px] text-slate-500">Обрано: {selectedSkills.length}</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Оберіть те, чим ви володієте або чим готові допомагати:
                  </p>

                  <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-1">
                    {availableSkills.map(skill => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                            isSelected
                              ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'
                          }`}
                        >
                          {isSelected && '✓ '} {skill}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Назад</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Далі: Напрямки допомоги</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Directions */}
              {step === 3 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">Крок 3: У яких напрямках ви хочете допомагати?</h3>
                    <span className="text-[11px] text-slate-500">Обрано: {selectedDirections.length}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
                    {availableDirections.map(dir => {
                      const isSelected = selectedDirections.includes(dir.id);
                      return (
                        <div
                          key={dir.id}
                          onClick={() => toggleDirection(dir.id)}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-blue-50/80 border-blue-600 shadow-sm ring-1 ring-blue-600'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{dir.label}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{dir.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Назад</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Далі: Завершення</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Code of ethics and launch */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="text-center p-3 bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                    <div className="w-12 h-12 bg-amber-400 text-blue-950 font-black rounded-full flex items-center justify-center mx-auto shadow-md">
                      <Sparkles className="w-6 h-6 text-blue-950" />
                    </div>
                    <h3 className="text-sm font-black text-slate-900 mt-2 font-heading">
                      Майже готово! Вітальний бонус +100 балів
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                      Ви приєднуєтеся до відкритої міжнародної спільноти дієвих волонтерів <strong>The Thymus Foundation</strong>.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                    <p className="font-bold text-slate-800">Етичні принципи волонтера Thymus:</p>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px]">
                      <li>Повага до гідності кожної людини незалежно від обставин.</li>
                      <li>Конфіденційність персональних даних підопічних.</li>
                      <li>Безпека, взаємопідтримка та дотримання вказівок координатора.</li>
                      <li>Чесність і прозорість у звітності про витрати та години.</li>
                    </ul>
                  </div>

                  <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedCodeOfEthics}
                      onChange={e => setAgreedCodeOfEthics(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Я підтверджую достовірність даних та приймаю Етичний кодекс волонтера The Thymus Foundation.</span>
                  </label>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Назад</span>
                    </button>
                    <button
                      type="button"
                      disabled={!agreedCodeOfEthics}
                      onClick={handleRegisterComplete}
                      className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/30 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Завершити реєстрацію та отримати Digital ID</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
