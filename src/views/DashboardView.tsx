import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Clock, 
  MapPin, 
  Award, 
  BookOpen, 
  Heart, 
  HandHeart, 
  Globe2, 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Flame,
  Share2
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';

export const DashboardView: React.FC = () => {
  const { 
    profile, 
    badges, 
    projects, 
    courses, 
    announcements, 
    setActiveTab, 
    setSelectedCourseId,
    setSelectedProjectId,
    setIsDigitalIdModalOpen,
    showToast,
    language,
    t
  } = useVolunteer();

  const activeProjects = projects.filter(p => p.isRegistered);
  const nextEvents = [
    {
      id: 'ev-1',
      title: language === 'en' ? 'First Aid Training Intensive (Cardiff)' : 'Тренінг з першої допомоги (Cardiff)',
      date: language === 'en' ? 'Sep 15, 10:00' : '15 вересня, 10:00',
      type: language === 'en' ? 'In-person Training' : 'Очний інтенсив',
      location: 'Cardiff Office'
    },
    {
      id: 'ev-2',
      title: language === 'en' ? 'Bute Park Volunteer Clean-up & Planting' : 'Волонтерська толока у Bute Park',
      date: language === 'en' ? 'Sep 20, 14:00' : '20 вересня, 14:00',
      type: language === 'en' ? 'Eco Mission' : 'Еко-акція',
      location: 'Cardiff Bute Park'
    },
    {
      id: 'ev-3',
      title: language === 'en' ? 'Online Supervision: Volunteer Wellbeing' : 'Онлайн-супервізія: Wellbeing волонтера',
      date: language === 'en' ? 'Sep 22, 12:00' : '22 вересня, 12:00',
      type: language === 'en' ? 'Zoom Webinar' : 'Вебінар у Zoom',
      location: language === 'en' ? 'Online' : 'Онлайн'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* 1. Welcome Greeting Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-2xl p-6 text-white shadow-lg border border-blue-700/50">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Thymus Foundation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading mt-1">
            {t('dashboard.greeting', { name: profile.firstName })}
          </h1>
          <p className="text-sm text-blue-200 mt-1">
            {t('dashboard.thanks')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDigitalIdModalOpen(true)}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold rounded-xl text-xs shadow-md shadow-amber-400/20 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>{t('dashboard.showId')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/20 transition-colors cursor-pointer"
          >
            {t('dashboard.needSupport')}
          </button>
        </div>
      </div>

      {/* 2. Main Grid: Status Card & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Status, Points, Level progress, Badges */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status & Level Progress Big Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t('dashboard.myStatus')}
                </span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-extrabold rounded-lg border border-emerald-200">
                {profile.status === 'АКТИВНИЙ ВОЛОНТЕР' ? t('activeVolunteer') : profile.status === 'НА ПАУЗІ' ? t('pausedVolunteer') : t('newVolunteer')}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div>
                <span className="text-xs text-slate-500 font-medium">{t('dashboard.recognitionPoints')}</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-black font-heading text-slate-900 tabular-nums">
                    {profile.points.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-amber-600 uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {t('points')}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {t('dashboard.pointsDesc')}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">{t('level')}:</span>
                  <span className="text-sm font-extrabold text-blue-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    {profile.level === 'Срібний' ? t('silverVolunteer') : profile.level === 'Золотий' ? t('goldVolunteer') : profile.level} (L{profile.levelNumber})
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-3 mt-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 via-sky-500 to-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${profile.levelProgressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-medium">
                  <span>{profile.levelProgressPercent}% {t('completed')}</span>
                  <span className="text-blue-800 font-semibold">
                    {t('dashboard.toNextLevel', { points: profile.pointsToNextLevel })} <strong>{t('dashboard.gold')}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Badges preview row */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t('dashboard.yourAchievements')} ({badges.filter(b => b.unlocked).length}/{badges.length})
                </span>
                <button
                  onClick={() => setActiveTab('rewards')}
                  className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
                >
                  <span>{t('dashboard.allAchievements')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {badges.slice(0, 4).map(badge => (
                  <div
                    key={badge.id}
                    onClick={() => setActiveTab('rewards')}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-sm cursor-pointer transition-all flex items-center gap-2.5 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-110 transition-transform">
                      ⭐
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{badge.title}</p>
                      <p className="text-[10px] text-slate-400 truncate">{badge.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 3. Four Quick Action Cards matching mockup */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              {t('dashboard.quickActions')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <div
                onClick={() => setActiveTab('waneri-help')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-rose-400 hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                </div>
                <span className="text-xs font-bold text-slate-800">{t('dashboard.needHelpAction')}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{t('dashboard.needHelpSub')}</span>
              </div>

              <div
                onClick={() => setActiveTab('waneri-help')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <HandHeart className="w-5 h-5 text-blue-700" />
                </div>
                <span className="text-xs font-bold text-slate-800">{t('dashboard.offerHelpAction')}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{t('dashboard.offerHelpSub')}</span>
              </div>

              <div
                onClick={() => setActiveTab('projects')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Globe2 className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-xs font-bold text-slate-800">{t('dashboard.findProjectAction')}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{t('dashboard.findProjectSub')}</span>
              </div>

              <div
                onClick={() => setActiveTab('learning')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-xs font-bold text-slate-800">{t('dashboard.coursesAction')}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{t('dashboard.coursesSub')}</span>
              </div>

            </div>
          </div>

        </div>

        {/* Right 1 Col: Upcoming Events & Registered Missions */}
        <div className="space-y-6">
          
          {/* Upcoming Events Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-700" />
                <span>{t('dashboard.upcomingEvents')}</span>
              </h3>
              <button
                onClick={() => setActiveTab('chat')}
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold"
              >
                {t('dashboard.allEvents')}
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-1">
              {nextEvents.map(ev => (
                <div key={ev.id} className="py-3 flex items-start gap-3 group">
                  <div className="p-2 bg-blue-50 text-blue-700 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors">
                      {ev.title}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <span className="font-semibold text-slate-600">{ev.date}</span>
                      <span>·</span>
                      <span>{ev.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('projects')}
              className="w-full mt-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              {t('dashboard.registerNewEvent')}
            </button>
          </div>

          {/* Active project card */}
          {activeProjects.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-5 border border-blue-200">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 bg-white px-2 py-0.5 rounded shadow-xs">
                {t('dashboard.activeMission')}
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 font-heading">
                {activeProjects[0].title}
              </h4>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                {activeProjects[0].description}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">📍 {activeProjects[0].location}</span>
                <span className="font-semibold text-blue-900">{activeProjects[0].date}</span>
              </div>
              <button
                onClick={() => {
                  setSelectedProjectId(activeProjects[0].id);
                  setActiveTab('project-details');
                }}
                className="w-full mt-3 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                {t('dashboard.missionDetails')}
              </button>
            </div>
          )}

          {/* Quick Wellbeing check-in card */}
          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧘</span>
              <div>
                <p className="text-xs font-bold text-amber-950">{t('dashboard.wellbeingCheck')}</p>
                <p className="text-[11px] text-amber-800">{t('dashboard.wellbeingSub')}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('support')}
              className="mt-3 w-full py-1.5 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-all text-center block cursor-pointer"
            >
              {t('dashboard.takeBurnoutTest')}
            </button>
          </div>

        </div>

      </div>

      {/* 4. Social Impact Block ("Мій вплив") */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              {t('dashboard.socialImpact')}
            </h3>
            <p className="text-xs text-slate-500">
              {t('dashboard.impactSub')}
            </p>
          </div>
          <button
            onClick={() => {
              showToast(language === 'en' ? 'Volunteer story template prepared for social sharing!' : 'Шаблон вашої історії волонтерства підготовлено для поширення у соцмережах!');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{t('dashboard.shareSocial')}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-5 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-2xl font-black font-heading text-rose-600 block tabular-nums">
              {profile.stats.peopleHelped}
            </span>
            <span className="text-xs font-bold text-slate-800 mt-1 block">{t('dashboard.peopleHelped')}</span>
            <span className="text-[10px] text-slate-400">Cardiff & South Wales</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-2xl font-black font-heading text-blue-700 block tabular-nums">
              {profile.stats.childrenSupported}
            </span>
            <span className="text-xs font-bold text-slate-800 mt-1 block">{t('dashboard.childrenSupported')}</span>
            <span className="text-[10px] text-slate-400">{language === 'en' ? 'education & care' : 'освіта та адаптація'}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-2xl font-black font-heading text-emerald-600 block tabular-nums">
              {profile.stats.patientsSupported}
            </span>
            <span className="text-xs font-bold text-slate-800 mt-1 block">{t('dashboard.patientsSupported')}</span>
            <span className="text-[10px] text-slate-400">{language === 'en' ? 'medical support' : 'медичний супровід'}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-2xl font-black font-heading text-teal-600 block tabular-nums">
              {profile.stats.ecoActions}
            </span>
            <span className="text-xs font-bold text-slate-800 mt-1 block">{t('dashboard.ecoActions')}</span>
            <span className="text-[10px] text-slate-400">{language === 'en' ? 'parks & rivers' : 'парки та водойми'}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 col-span-2 sm:col-span-1">
            <span className="text-2xl font-black font-heading text-amber-600 block tabular-nums">
              {profile.stats.hoursServed} {t('hours')}
            </span>
            <span className="text-xs font-bold text-slate-800 mt-1 block">{t('dashboard.timeDedicated')}</span>
            <span className="text-[10px] text-slate-400">{profile.stats.hoursServed} {t('dashboard.recordedHours')}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
