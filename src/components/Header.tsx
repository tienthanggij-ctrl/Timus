import React, { useState } from 'react';
import { 
  Bell, 
  Sparkles, 
  IdCard, 
  LifeBuoy, 
  Search, 
  Menu, 
  X, 
  ChevronRight,
  User,
  LogOut,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useVolunteer, NavigationTab } from '../context/VolunteerContext';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { 
    profile, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead,
    setIsDigitalIdModalOpen, 
    setIsEmergencyModalOpen,
    activeTab,
    setActiveTab,
    logout,
    language,
    setLanguage,
    t,
    showToast
  } = useVolunteer();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const tabTitleKeys: Record<NavigationTab, string> = {
    'dashboard': 'nav.dashboard',
    'profile': 'nav.profile',
    'learning': 'nav.learning',
    'course-player': 'nav.coursePlayer',
    'projects': 'nav.projects',
    'project-details': 'nav.projectDetails',
    'waneri-help': 'nav.waneriHelp',
    'chat': 'nav.chat',
    'rewards': 'nav.rewards',
    'support': 'nav.support',
    'expenses': 'nav.expenses',
    'growth': 'nav.growth',
    'settings': 'nav.settings'
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Mobile hamburger & Context breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg lg:hidden hover:bg-slate-100 transition-colors"
            aria-label="Відкрити меню"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-slate-900 hidden sm:inline">The Thymus Foundation</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <span className="font-medium text-blue-900">{t(tabTitleKeys[activeTab])}</span>
          </div>
        </div>

        {/* Right Zone: Language Switcher, Points counter, SOS quick, Digital ID, Notifications, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200/80">
            <button
              onClick={() => {
                if (language !== 'ua') {
                  setLanguage('ua');
                  showToast('Мову змінено на українську 🇺🇦');
                }
              }}
              className={`px-2 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                language === 'ua'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Українська версія"
            >
              <span>🇺🇦</span>
              <span className="text-[11px] font-mono">UA</span>
            </button>
            <button
              onClick={() => {
                if (language !== 'en') {
                  setLanguage('en');
                  showToast('Language changed to English 🇬🇧');
                }
              }}
              className={`px-2 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="English version"
            >
              <span>🇬🇧</span>
              <span className="text-[11px] font-mono">EN</span>
            </button>
          </div>

          {/* Points Pill Counter */}
          <button
            onClick={() => setActiveTab('rewards')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-800 rounded-full text-xs font-semibold border border-orange-200/60 transition-colors cursor-pointer"
            title={language === 'ua' ? 'Ваші бали визнання' : 'Your recognition points'}
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-600 fill-orange-500" />
            <span className="font-mono tabular-nums">{profile.points.toLocaleString()}</span>
            <span className="text-[11px] text-orange-700/80 hidden md:inline">{t('points')}</span>
          </button>

          {/* Emergency SOS quick pill */}
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-medium border border-rose-200 transition-colors cursor-pointer"
          >
            <LifeBuoy className="w-3.5 h-3.5 text-rose-600" />
            <span>{t('header.sosQuick')}</span>
          </button>

          {/* Digital ID Button */}
          <button
            onClick={() => setIsDigitalIdModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-medium border border-blue-200/80 transition-colors cursor-pointer"
          >
            <IdCard className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">{t('header.digitalId')}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Сповіщення"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-600 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Notifications Popover */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900">Сповіщення</span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full">
                        {unreadCount} нових
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-blue-700 hover:text-blue-900 font-medium"
                    >
                      Прочитати всі
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-500 py-4 text-center">Немає нових сповіщень</p>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`py-2.5 px-1 cursor-pointer transition-colors hover:bg-slate-50 ${
                          !n.isRead ? 'bg-blue-50/40 rounded-lg' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <p className={`text-xs font-semibold ${!n.isRead ? 'text-blue-900' : 'text-slate-800'}`}>
                            {n.title}
                          </p>
                          <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      setIsNotifOpen(false);
                      setActiveTab('settings');
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Налаштувати сповіщення
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar with dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-blue-200 transition-all cursor-pointer"
            >
              <img
                src={profile.avatarUrl}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{profile.firstName} {profile.lastName}</p>
                  <p className="text-[11px] text-slate-500">{profile.volunteerId} · {profile.level}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg text-left"
                  >
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    {t('header.myProfile')}
                  </button>
                  <button
                    onClick={() => {
                      setIsDigitalIdModalOpen(true);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg text-left"
                  >
                    <IdCard className="w-3.5 h-3.5 text-slate-500" />
                    {t('header.digitalId')}
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('growth');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg text-left"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                    {t('header.growthTrajectory')}
                  </button>
                  <button
                    onClick={() => {
                      const nextLang = language === 'ua' ? 'en' : 'ua';
                      setLanguage(nextLang);
                      setIsUserMenuOpen(false);
                      showToast(nextLang === 'en' ? 'Language switched to English 🇬🇧' : 'Мову змінено на українську 🇺🇦');
                    }}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-slate-500" />
                      <span>{t('header.language')}</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                      {language === 'ua' ? '🇺🇦 UA' : '🇬🇧 EN'}
                    </span>
                  </button>
                </div>
                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg text-left"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    {t('header.logout')}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
