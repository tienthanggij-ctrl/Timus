import React, { useState } from 'react';
import { 
  User, 
  IdCard, 
  Award, 
  FileText, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Plus, 
  X, 
  Edit3, 
  Check, 
  ExternalLink, 
  QrCode, 
  ShieldCheck, 
  Download,
  Share2,
  Clock,
  Sparkles
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';

export const ProfileView: React.FC = () => {
  const { 
    profile, 
    updateProfile, 
    certificates, 
    badges, 
    setIsDigitalIdModalOpen, 
    setActiveTab, 
    setSelectedCourseId,
    showToast 
  } = useVolunteer();

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(profile.bio);

  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const [selectedCertModal, setSelectedCertModal] = useState<typeof certificates[0] | null>(null);

  const handleSaveBio = () => {
    updateProfile({ bio: bioInput });
    setIsEditingBio(false);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (profile.skills.includes(newSkill.trim())) {
      showToast('Ця навичка вже є у списку');
      return;
    }
    updateProfile({ skills: [...profile.skills, newSkill.trim()] });
    setNewSkill('');
    setIsAddingSkill(false);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updateProfile({ skills: profile.skills.filter(s => s !== skillToRemove) });
  };

  const timelineEvents = [
    {
      date: '12.09.2024',
      title: 'Пройдено курс "Перша медична допомога"',
      category: 'Навчання',
      badge: 'Сертифікат видано'
    },
    {
      date: '05.09.2024',
      title: 'Участь у проекті "Підтримка дітей"',
      category: 'Місія',
      badge: '+6 волонтерських годин'
    },
    {
      date: '01.09.2024',
      title: 'Отримано бейдж "Еко-волонтер"',
      category: 'Визнання',
      badge: '+100 балів'
    },
    {
      date: '10.08.2024',
      title: 'Досягнуто рубежу 100 годин допомоги!',
      category: 'Віха',
      badge: 'Срібний рівень'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* 1. Header Profile Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg ring-2 ring-blue-100"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-blue-700 text-white font-mono text-[10px] font-bold rounded-md uppercase">
                {profile.level}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black font-heading text-slate-900">
                  {profile.firstName} {profile.lastName}
                </h1>
                <span className="p-1 bg-emerald-100 text-emerald-800 rounded-full" title="Верифікований волонтер">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Volunteer ID: <strong className="text-blue-900">{profile.volunteerId}</strong> · Рівень {profile.levelNumber}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {profile.city}, {profile.country}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  З нами з {profile.joinDate}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 font-bold text-amber-600">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {profile.points.toLocaleString()} балів
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
            <button
              onClick={() => setIsDigitalIdModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-700/20 transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Показати ID карту</span>
            </button>
            <span className="text-[11px] text-slate-400">
              Офіційний цифровий паспорт
            </span>
          </div>

        </div>
      </div>

      {/* 2. Profile Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Bio, Contacts, Skills */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Bio card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Про мене</h3>
              {!isEditingBio ? (
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Редагувати</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditingBio(false)}
                    className="text-xs text-slate-500 hover:text-slate-700"
                  >
                    Скасувати
                  </button>
                  <button
                    onClick={handleSaveBio}
                    className="text-xs text-emerald-700 font-bold flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Зберегти
                  </button>
                </div>
              )}
            </div>

            <div className="mt-3">
              {!isEditingBio ? (
                <p className="text-xs text-slate-600 leading-relaxed">{profile.bio}</p>
              ) : (
                <textarea
                  value={bioInput}
                  onChange={e => setBioInput(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              )}
            </div>
          </div>

          {/* Skills & Directions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900">Мої навички</h3>
                <button
                  onClick={() => setIsAddingSkill(!isAddingSkill)}
                  className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Додати навичку</span>
                </button>
              </div>

              {isAddingSkill && (
                <form onSubmit={handleAddSkill} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    placeholder="Введіть нову навичку..."
                    className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-blue-700 text-white rounded-lg text-xs font-bold"
                  >
                    Додати
                  </button>
                </form>
              )}

              <div className="flex flex-wrap gap-2 mt-3">
                {profile.skills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-blue-50 text-blue-900 rounded-lg font-medium border border-blue-200/60"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-blue-400 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Directions */}
            <div className="pt-3 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Пріоритетні напрямки допомоги
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.directions.map(dir => (
                  <span
                    key={dir}
                    className="text-xs px-3 py-1 bg-amber-50 text-amber-900 rounded-lg font-semibold border border-amber-200"
                  >
                    {dir}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="pt-3 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Мови спілкування
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map(lang => (
                  <span
                    key={lang}
                    className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium"
                  >
                    🌐 {lang}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Timeline History */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-100">
              Моя історія волонтерства (Timeline)
            </h3>
            
            <div className="mt-4 relative pl-6 border-l-2 border-blue-200 space-y-6">
              {timelineEvents.map((ev, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white" />
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-900">{ev.date}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-medium">
                      {ev.category}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 mt-1">{ev.title}</p>
                  <span className="text-[11px] text-amber-700 font-semibold">{ev.badge}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Contacts, Certificates, Wallet */}
        <div className="space-y-6">
          
          {/* Contacts Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-100">
              Контактна інформація
            </h3>
            <div className="space-y-3 mt-3 text-xs">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-mono">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-mono">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{profile.city}, United Kingdom</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 block">
                Контакти захищені політикою конфіденційності Thymus Foundation.
              </span>
            </div>
          </div>

          {/* Earned Certificates List */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Сертифікати ({certificates.length})</span>
              </h3>
              <button
                onClick={() => setActiveTab('learning')}
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold"
              >
                Всі курси →
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {certificates.map(cert => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCertModal(cert)}
                  className="py-3 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors group"
                >
                  <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700 leading-snug">
                    {cert.courseTitle}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                    <span className="font-mono">{cert.certificateNumber}</span>
                    <span>{cert.completedDate}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('learning')}
              className="w-full mt-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold rounded-xl transition-colors"
            >
              Пройти новий навчальний курс
            </button>
          </div>

          {/* Next Growth Step Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 bg-white px-2 py-0.5 rounded shadow-xs">
              Траєкторія лідера
            </span>
            <h4 className="text-sm font-bold text-slate-900 mt-2 font-heading">
              Шлях до статусу "Золотий волонтер"
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Залишилося набрати 520 балів для отримання права самостійно курувати проєкти фонду та бути наставником.
            </p>
            <button
              onClick={() => setActiveTab('growth')}
              className="mt-3 w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
            >
              Переглянути програму зростання
            </button>
          </div>

        </div>

      </div>

      {/* Certificate Detail Modal if clicked */}
      {selectedCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase">Офіційний сертифікат Thymus</span>
              <button
                onClick={() => setSelectedCertModal(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 p-6 bg-slate-50 border-2 border-dashed border-blue-200 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 bg-blue-700 text-amber-400 rounded-full flex items-center justify-center mx-auto shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black font-heading text-slate-900">
                {selectedCertModal.courseTitle}
              </h3>
              <p className="text-xs text-slate-600">
                Цим підтверджується, що волонтер <strong>{selectedCertModal.recipientName}</strong> (ID: {selectedCertModal.volunteerId}) успішно опанував програму навчання.
              </p>
              
              <div className="pt-2 text-left bg-white p-3 rounded-xl border border-slate-200 text-xs">
                <p className="font-semibold text-slate-700 mb-1">Підтверджені компетенції:</p>
                <ul className="list-disc list-inside text-slate-600 space-y-0.5 text-[11px]">
                  {selectedCertModal.skillsAcquired.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 font-mono">
                <span>{selectedCertModal.certificateNumber}</span>
                <span>Видано: {selectedCertModal.completedDate}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  showToast('Сертифікат збережено у форматі PDF');
                  setSelectedCertModal(null);
                }}
                className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Завантажити офіційний PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
