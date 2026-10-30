import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useVolunteer();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 text-xs font-semibold max-w-md">
        <div className="p-1 bg-amber-400 text-blue-950 rounded-lg">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="flex-1 leading-snug">{toastMessage}</span>
      </div>
    </div>
  );
};
