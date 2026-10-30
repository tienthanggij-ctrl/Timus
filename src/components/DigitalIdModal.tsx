import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  Download, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail,
  Award
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';

export const DigitalIdModal: React.FC = () => {
  const { isDigitalIdModalOpen, setIsDigitalIdModalOpen, profile, showToast, language, t } = useVolunteer();
  const [showQrVerification, setShowQrVerification] = useState(false);

  if (!isDigitalIdModalOpen) return null;

  const handleCopyCardLink = () => {
    navigator.clipboard?.writeText(`https://verify.thymusfoundation.org/id/${profile.volunteerId}`);
    showToast(language === 'en' ? 'Digital ID verification link copied!' : 'Посилання на підтвердження цифрового ID скопійовано!');
  };

  const handleDownloadId = () => {
    showToast(language === 'en' ? 'Generating Digital Volunteer ID...' : 'Генерація цифрової картки ID для завантаження...');
    setTimeout(() => {
      showToast(language === 'en' ? 'Volunteer ID Card downloaded (Wallet/PDF)!' : 'Картку волонтера завантажено (PDF/Wallet)!');
    }, 1000);
  };

  const levelName = language === 'en'
    ? (profile.level === 'Срібний' ? 'Silver' : profile.level === 'Золотий' ? 'Gold' : profile.level === 'Бронзовий' ? 'Bronze' : profile.level === 'Платиновий' ? 'Platinum' : profile.level)
    : profile.level;

  const statusName = language === 'en'
    ? (profile.status === 'АКТИВНИЙ ВОЛОНТЕР' ? 'ACTIVE VOLUNTEER' : profile.status === 'НА ПАУЗІ' ? 'ON PAUSE' : 'NEW VOLUNTEER')
    : profile.status;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-700" />
            <h3 className="font-bold text-slate-900 text-sm">
              {language === 'en' ? 'Digital Volunteer ID Card' : 'Цифрова карта волонтера (Digital Volunteer ID)'}
            </h3>
          </div>
          <button
            onClick={() => setIsDigitalIdModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Digital Card Representation */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          
          {/* THE CARD ITSELF - Premium card styling matching Thymus Foundation branding */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#0F2D59] via-[#143B73] to-[#0A1E3B] text-white p-6 shadow-xl border border-blue-400/30 overflow-hidden">
            
            {/* Background geometric accents */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-amber-500/20 to-orange-500/0 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
            
            {/* Top row: Charity branding & Official Chip */}
            <div className="relative z-10 flex items-start justify-between border-b border-blue-400/20 pb-4">
              <div>
                <div className="text-[10px] tracking-widest text-amber-300 font-bold uppercase">
                  CHARITY ACTION COMMUNITY
                </div>
                <div className="text-lg font-black tracking-tight text-white font-heading">
                  The Thymus Foundation
                </div>
                <div className="text-[10px] text-sky-200">
                  {language === 'en' ? 'Official Volunteer Corps' : 'Офіційний волонтерський корпус'}
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="px-2 py-0.5 bg-amber-400 text-blue-950 font-bold text-[10px] rounded-md uppercase tracking-wider shadow-sm">
                  {levelName}
                </span>
                <span className="text-[10px] text-slate-300 mt-1 font-mono">
                  {language === 'en' ? `Level ${profile.levelNumber}` : `Рівень ${profile.levelNumber}`}
                </span>
              </div>
            </div>

            {/* Middle row: Avatar, Info, Status */}
            <div className="relative z-10 mt-5 flex items-center gap-4">
              <div className="relative">
                <img
                  src={profile.avatarUrl}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className="w-20 h-20 rounded-xl object-cover border-2 border-amber-400/80 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full text-white ring-2 ring-[#0F2D59]" title="Verified">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex-1">
                <h4 className="text-xl font-black text-white font-heading tracking-wide">
                  {profile.firstName} {profile.lastName}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-mono font-semibold text-amber-300">
                    ID: {profile.volunteerId}
                  </span>
                  <span className="text-[10px] text-slate-300">·</span>
                  <span className="text-[11px] text-slate-300">
                    {language === 'en' ? `since ${profile.joinDate}` : `з ${profile.joinDate}`}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 bg-blue-900/80 border border-blue-400/30 rounded text-sky-200">
                    📍 {profile.city}, {profile.country}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/40 rounded text-emerald-300 font-semibold">
                    ✓ {statusName}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom row: QR Code & Verification Watermark */}
            <div className="relative z-10 mt-5 pt-4 border-t border-blue-400/20 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
                  {language === 'en' ? 'Skills & Specialization' : 'Навички та спеціалізація'}
                </p>
                <div className="flex flex-wrap gap-1 mt-1 max-w-[260px]">
                  {profile.skills.slice(0, 4).map(skill => (
                    <span key={skill} className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* QR Code trigger */}
              <div 
                onClick={() => setShowQrVerification(!showQrVerification)}
                className="p-2 bg-white rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform"
                title={language === 'en' ? 'Click to verify status in registry' : 'Натисніть для перевірки статусу в системі'}
              >
                {/* SVG styled mock QR code with high contrast */}
                <div className="w-14 h-14 bg-white flex flex-col items-center justify-center p-0.5">
                  <div className="grid grid-cols-4 gap-0.5 w-full h-full p-0.5 border border-slate-900">
                    <div className="bg-slate-900 col-span-2 row-span-2" />
                    <div className="bg-slate-900" />
                    <div className="bg-slate-900" />
                    <div className="bg-slate-900" />
                    <div className="bg-slate-900 col-span-2 row-span-2" />
                    <div className="bg-slate-900" />
                    <div className="bg-slate-900" />
                    <div className="bg-slate-900 col-span-2" />
                  </div>
                </div>
                <span className="block text-[8px] text-center font-bold text-slate-800 mt-0.5">
                  SCAN VERIFY
                </span>
              </div>
            </div>

          </div>

          {/* QR Verification details sheet if toggled */}
          {showQrVerification && (
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === 'en' ? 'Official Volunteer Status Verification' : 'Офіційне підтвердження волонтерського статусу'}
                </span>
              </div>
              <p className="mt-1 text-slate-600 leading-relaxed">
                {language === 'en' ? (
                  <>
                    This individual is a verified member of <strong>The Thymus Foundation</strong> volunteer corps.
                    Active status: <strong>{statusName}</strong>. Tier: <strong>{levelName} (L{profile.levelNumber})</strong>.
                    Documented <strong>{profile.stats.hoursServed} hours</strong> of verified public service.
                  </>
                ) : (
                  <>
                    Ця особа є верифікованим учасником волонтерського корпусу <strong>The Thymus Foundation</strong>. 
                    Дійсний статус: <strong>{profile.status}</strong>. Рівень довіри: <strong>{profile.level} (L{profile.levelNumber})</strong>. 
                    Задокументовано <strong>{profile.stats.hoursServed} годин</strong> суспільно корисної праці.
                  </>
                )}
              </p>
            </div>
          )}

          {/* Quick stats on the card */}
          <div className="grid grid-cols-3 gap-3 mt-4 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-500 block">
                {language === 'en' ? 'Service Hours' : 'Годин допомоги'}
              </span>
              <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                {profile.stats.hoursServed} {language === 'en' ? 'hrs' : 'год'}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-500 block">
                {language === 'en' ? 'Projects' : 'Проєктів'}
              </span>
              <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                {profile.stats.projectsCompleted}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-500 block">
                {language === 'en' ? 'Points' : 'Балів визнання'}
              </span>
              <span className="text-base font-bold font-mono text-amber-600 tabular-nums">
                {profile.points.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-5">
            <button
              onClick={handleDownloadId}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-700/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t('profile.saveToWallet')}</span>
            </button>
            <button
              onClick={handleCopyCardLink}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-slate-600" />
              <span>{t('profile.shareCard')}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
