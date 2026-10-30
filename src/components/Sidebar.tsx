import React from 'react';
import { 
  Home, 
  IdCard, 
  GraduationCap, 
  Globe2, 
  HandHeart, 
  MessageSquare, 
  Trophy, 
  HeartHandshake, 
  Receipt, 
  TrendingUp, 
  Settings,
  LifeBuoy,
  QrCode,
  Sparkles
} from 'lucide-react';
import { useVolunteer, NavigationTab } from '../context/VolunteerContext';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsDigitalIdModalOpen, 
    setIsEmergencyModalOpen,
    profile,
    language,
    setLanguage,
    t,
    showToast
  } = useVolunteer();

  const navItems: { id: NavigationTab; labelKey: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'dashboard', labelKey: 'nav.dashboard', icon: Home },
    { id: 'profile', labelKey: 'nav.profile', icon: IdCard },
    { id: 'learning', labelKey: 'nav.learning', icon: GraduationCap, badge: 'LMS' },
    { id: 'projects', labelKey: 'nav.projects', icon: Globe2 },
    { id: 'waneri-help', labelKey: 'nav.waneriHelp', icon: HandHeart, badge: 'P2P' },
    { id: 'chat', labelKey: 'nav.chat', icon: MessageSquare },
    { id: 'rewards', labelKey: 'nav.rewards', icon: Trophy },
    { id: 'support', labelKey: 'nav.support', icon: HeartHandshake, badge: '24/7' },
    { id: 'expenses', labelKey: 'nav.expenses', icon: Receipt },
    { id: 'growth', labelKey: 'nav.growth', icon: TrendingUp },
    { id: 'settings', labelKey: 'nav.settings', icon: Settings },
  ];

  const handleNavClick = (tabId: NavigationTab) => {
    setActiveTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-64 h-full bg-[#0D2447] text-white flex flex-col justify-between shrink-0 select-none shadow-xl border-r border-blue-900/50">
      
      {/* Top Branding Section */}
      <div className="p-4 border-b border-blue-800/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
            {/* Stylized Logo mark */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-amber-500 p-0.5 flex items-center justify-center shadow-lg shadow-blue-950/40">
              <div className="w-full h-full bg-[#0B1E3B] rounded-[10px] flex items-center justify-center">
                <span className="text-xl font-black text-amber-400">T</span>
                <span className="text-xl font-black text-sky-400">F</span>
              </div>
            </div>
            <div>
              <div className="font-extrabold tracking-tight text-white leading-tight text-base font-heading">
                The Thymus
              </div>
              <div className="text-[11px] tracking-wider uppercase font-semibold text-amber-400/90 leading-none">
                Foundation
              </div>
              <div className="text-[9px] text-sky-300/70 tracking-widest uppercase">
                {t('hubName')}
              </div>
            </div>
          </div>

          {/* Mini language switcher in sidebar header */}
          <div className="flex items-center bg-blue-950/90 p-0.5 rounded-lg border border-blue-800/80 shadow-inner">
            <button
              onClick={() => {
                if (language !== 'ua') {
                  setLanguage('ua');
                  showToast('Мову змінено на українську 🇺🇦');
                }
              }}
              className={`px-1.5 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-0.5 ${
                language === 'ua'
                  ? 'bg-amber-400 text-blue-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Українська версія"
            >
              <span>🇺🇦</span>
              <span>UA</span>
            </button>
            <button
              onClick={() => {
                if (language !== 'en') {
                  setLanguage('en');
                  showToast('Language changed to English 🇬🇧');
                }
              }}
              className={`px-1.5 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer flex items-center gap-0.5 ${
                language === 'en'
                  ? 'bg-amber-400 text-blue-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="English version"
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold' 
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-amber-300' : 'text-slate-400 group-hover:text-amber-300'
                }`} />
                <span className="tracking-wide">{t(item.labelKey)}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                  isActive 
                    ? 'bg-amber-400 text-blue-950 font-bold' 
                    : 'bg-blue-950/80 text-sky-300 border border-blue-800/40'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Quick Action Box & Digital Card Shortcut */}
      <div className="p-3 border-t border-blue-800/40 space-y-2 bg-[#09182E]">
        {/* Digital ID mini preview */}
        <div 
          onClick={() => setIsDigitalIdModalOpen(true)}
          className="bg-blue-950/70 border border-blue-800/50 hover:border-amber-400/60 rounded-xl p-2.5 cursor-pointer transition-all hover:bg-blue-900/40 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-600/40 rounded-lg text-amber-400">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white group-hover:text-amber-300 transition-colors">
                  Digital Volunteer ID
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {profile.volunteerId}
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-semibold border border-amber-400/30">
              {language === 'en' ? 'Silver' : profile.level}
            </span>
          </div>
        </div>

        {/* 24/7 SOS Support quick launch */}
        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-950/30 transition-all cursor-pointer"
        >
          <LifeBuoy className="w-3.5 h-3.5 text-rose-200 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{language === 'en' ? 'Emergency SOS 24/7' : 'Швидка допомога 24/7'}</span>
        </button>
      </div>

    </aside>
  );
};
