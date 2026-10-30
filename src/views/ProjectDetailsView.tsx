import React from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Phone, 
  CheckCircle2, 
  Share2, 
  QrCode, 
  ShieldCheck,
  Award
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';

export const ProjectDetailsView: React.FC = () => {
  const { 
    projects, 
    selectedProjectId, 
    joinProject, 
    setActiveTab, 
    showToast 
  } = useVolunteer();

  const project = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handleAddToCalendar = () => {
    showToast('Подію додано до вашого волонтерського розкладу!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* 1. Back button & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('projects')}
          className="flex items-center gap-2 text-xs font-bold text-blue-800 hover:text-blue-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад до списку проєктів</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Посилання на проєкт скопійовано для поширення!')}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            title="Поділитися"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Hero Visual Card */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[21/9] bg-slate-950">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover opacity-85"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm">
            {project.category}
          </span>
          <span className="px-3 py-1 bg-amber-400 text-blue-950 text-xs font-black rounded-lg shadow-sm">
            +50 балів за участь
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider block">
            The Thymus Foundation · Social Action Mission
          </span>
          <h1 className="text-xl sm:text-3xl font-black font-heading mt-1 leading-tight">
            {project.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{project.location} ({project.address})</span>
          </p>
        </div>
      </div>

      {/* 3. Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 spans): Description, Agenda, Skills */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* About Project */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 font-heading">
              Про цей проєкт та місію
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.description}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Волонтерський корпус The Thymus Foundation діє за найвищими стандартами взаємоповаги та безпеки. Кожному учаснику надається бейдж, необхідні витратні матеріали та підтримка досвідченого наставника.
            </p>

            {/* Required Skills */}
            <div className="pt-3 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Необхідні навички та якості
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.requiredSkills.map(skill => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 bg-blue-50 text-blue-900 rounded-lg font-semibold border border-blue-200/60"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Agenda */}
            <div className="pt-3 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                План волонтерської зміни
              </h4>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-start gap-3 p-2 bg-slate-50 rounded-lg">
                  <span className="font-mono font-bold text-blue-900 shrink-0">10:00 - 10:30</span>
                  <span>Збір учасників, інструктаж з техніки безпеки, кава-брейк</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-slate-50 rounded-lg">
                  <span className="font-mono font-bold text-blue-900 shrink-0">10:30 - 13:00</span>
                  <span>Основна активна частина програми (робота в малих групах)</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-slate-50 rounded-lg">
                  <span className="font-mono font-bold text-blue-900 shrink-0">13:00 - 14:00</span>
                  <span>Обід, відпочинок, взаємодія з бенефіціарами</span>
                </div>
                <div className="flex items-start gap-3 p-2 bg-slate-50 rounded-lg">
                  <span className="font-mono font-bold text-blue-900 shrink-0">14:00 - 16:00</span>
                  <span>Підбиття підсумків, заповнення звітних годин, фідбек</span>
                </div>
              </div>
            </div>

          </div>

          {/* Join action banner */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm text-slate-900 font-heading">
                {project.isRegistered ? 'Ви зареєстровані на цю зміну!' : 'Готові долучитися до команди?'}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                За участь у цій волонтерській зміні ви отримаєте <strong>+50 балів</strong> та <strong>6 зафіксованих годин</strong>.
              </p>
            </div>
            
            <button
              onClick={() => joinProject(project.id)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer ${
                project.isRegistered
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-blue-700 hover:bg-blue-800 text-white'
              }`}
            >
              {project.isRegistered ? 'Скасувати реєстрацію' : 'Долучитися до проєкту'}
            </button>
          </div>

        </div>

        {/* Right Column: Time, Location, Coordinator */}
        <div className="space-y-6">
          
          {/* Volunteer quota status */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Статус набору волонтерів</h3>
            
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Зареєстровано</span>
                <span className="font-mono text-blue-900 font-bold">
                  {project.registeredVolunteers} з {project.neededVolunteers}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${(project.registeredVolunteers / project.neededVolunteers) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-2 block">
                Залишилося вільних місць: <strong>{Math.max(0, project.neededVolunteers - project.registeredVolunteers)}</strong>
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-700 shrink-0" />
                <span>{project.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                <span>{project.time}</span>
              </div>
            </div>

            <button
              onClick={handleAddToCalendar}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Додати в календар (+iCal / Google)
            </button>
          </div>

          {/* Coordinator Card with QR check-in */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Координатор локації</h3>
            
            <div className="flex items-center gap-3">
              <img
                src={project.coordinator.avatarUrl}
                alt={project.coordinator.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="font-bold text-xs text-slate-900">{project.coordinator.name}</h4>
                <p className="text-[11px] text-slate-500">{project.coordinator.role}</p>
                <a
                  href={`tel:${project.coordinator.phone}`}
                  className="text-xs font-mono text-blue-700 hover:underline flex items-center gap-1 mt-0.5"
                >
                  <Phone className="w-3 h-3" />
                  {project.coordinator.phone}
                </a>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-800">QR-чек-ін на місці</p>
                <p className="text-[10px] text-slate-500">Покажіть для підтвердження годин</p>
              </div>
              <div className="p-1.5 bg-white rounded-lg border border-slate-200">
                <QrCode className="w-8 h-8 text-slate-800" />
              </div>
            </div>

            <button
              onClick={() => showToast(`Черговий зв'язок з координатором ${project.coordinator.name} активовано.`)}
              className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold rounded-xl transition-colors"
            >
              Написати повідомлення координатору
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
