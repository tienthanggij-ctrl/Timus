import React, { useState } from 'react';
import { VolunteerProvider, useVolunteer } from './context/VolunteerContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { DigitalIdModal } from './components/DigitalIdModal';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { Toast } from './components/Toast';
import { AuthModal } from './views/AuthModal';

import { DashboardView } from './views/DashboardView';
import { ProfileView } from './views/ProfileView';
import { LearningView } from './views/LearningView';
import { CoursePlayerView } from './views/CoursePlayerView';
import { ProjectsView } from './views/ProjectsView';
import { ProjectDetailsView } from './views/ProjectDetailsView';
import { WaneriHelpView } from './views/WaneriHelpView';
import { CommunityChatView } from './views/CommunityChatView';
import { RewardsView } from './views/RewardsView';
import { SupportView } from './views/SupportView';
import { ExpensesView } from './views/ExpensesView';
import { GrowthTrajectoryView } from './views/GrowthTrajectoryView';
import { SettingsView } from './views/SettingsView';

const MainAppContent: React.FC = () => {
  const { activeTab } = useVolunteer();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'profile':
        return <ProfileView />;
      case 'learning':
        return <LearningView />;
      case 'course-player':
        return <CoursePlayerView />;
      case 'projects':
        return <ProjectsView />;
      case 'project-details':
        return <ProjectDetailsView />;
      case 'waneri-help':
        return <WaneriHelpView />;
      case 'chat':
        return <CommunityChatView />;
      case 'rewards':
        return <RewardsView />;
      case 'support':
        return <SupportView />;
      case 'expenses':
        return <ExpensesView />;
      case 'growth':
        return <GrowthTrajectoryView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900">
      
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:flex h-full shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Slide-in Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          <div className="relative z-10 w-72 h-full bg-[#0D2447] animate-in slide-in-from-left duration-200">
            <Sidebar onCloseMobile={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderActiveView()}
        </main>

        <MobileNav />
      </div>

      {/* Global Modals & Toast */}
      <DigitalIdModal />
      <EmergencySOSModal />
      <AuthModal />
      <Toast />

    </div>
  );
};

export default function App() {
  return (
    <VolunteerProvider>
      <MainAppContent />
    </VolunteerProvider>
  );
}
