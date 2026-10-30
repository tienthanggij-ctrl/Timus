import React from 'react';
import { Home, GraduationCap, Globe2, HandHeart, User } from 'lucide-react';
import { useVolunteer, NavigationTab } from '../context/VolunteerContext';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, t } = useVolunteer();

  const primaryMobileTabs: { id: NavigationTab; labelKey: string; icon: React.ElementType }[] = [
    { id: 'dashboard', labelKey: 'nav.dashboard', icon: Home },
    { id: 'learning', labelKey: 'nav.learning', icon: GraduationCap },
    { id: 'projects', labelKey: 'nav.projects', icon: Globe2 },
    { id: 'waneri-help', labelKey: 'nav.waneriHelp', icon: HandHeart },
    { id: 'profile', labelKey: 'nav.profile', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {primaryMobileTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition-all ${
                isActive ? 'text-blue-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700 scale-110' : ''}`} />
              <span className="text-[10px] mt-0.5">{t(tab.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
