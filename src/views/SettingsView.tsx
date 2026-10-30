import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Bell, 
  Eye, 
  KeyRound, 
  FileDown, 
  UserCheck, 
  Smartphone, 
  CheckCircle2,
  Save,
  Globe
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';

export const SettingsView: React.FC = () => {
  const { profile, updateProfile, showToast, language, setLanguage, t } = useVolunteer();

  const [visibility, setVisibility] = useState(profile.privacy.profileVisibility);
  const [showLevelAndPoints, setShowLevelAndPoints] = useState(profile.privacy.showLevelAndPoints);
  const [showAchievements, setShowAchievements] = useState(profile.privacy.showAchievements);
  const [hidePersonalContacts, setHidePersonalContacts] = useState(profile.privacy.hidePersonalContacts);

  // Notifications toggles
  const [notifPush, setNotifPush] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifTelegram, setNotifTelegram] = useState(true);

  // 2FA toggle
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  const handleSavePrivacy = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      privacy: {
        ...profile.privacy,
        profileVisibility: visibility,
        showLevelAndPoints,
        showAchievements,
        hidePersonalContacts
      }
    });
    showToast(language === 'en' ? 'Privacy settings saved successfully.' : 'Налаштування приватності збережено.');
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `thymus_volunteer_data_${profile.volunteerId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(language === 'en' ? 'GDPR export of your volunteer data downloaded.' : 'GDPR експорт ваших волонтерських даних завантажено.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-slate-700/50">
        <h1 className="text-2xl sm:text-3xl font-black font-heading leading-tight">
          {t('settings.bannerTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          {t('settings.bannerSub')}
        </p>
      </div>

      {/* 2. Language Preference Card (PROMINENT TOGGLE) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                {t('settings.languageTitle')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('settings.languageSub')}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-900">
            {language === 'ua' ? '🇺🇦 UA' : '🇬🇧 EN'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Ukrainian Option */}
          <button
            type="button"
            onClick={() => {
              if (language !== 'ua') {
                setLanguage('ua');
                showToast('Мову змінено на українську 🇺🇦');
              }
            }}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between ${
              language === 'ua'
                ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">🇺🇦</span>
              <div>
                <p className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span>Українська</span>
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-semibold">UA</span>
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {t('settings.ukrainianDesc')}
                </p>
              </div>
            </div>
            {language === 'ua' && (
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            )}
          </button>

          {/* English Option */}
          <button
            type="button"
            onClick={() => {
              if (language !== 'en') {
                setLanguage('en');
                showToast('Language changed to English 🇬🇧');
              }
            }}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between ${
              language === 'en'
                ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">🇬🇧</span>
              <div>
                <p className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span>English</span>
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-semibold">EN</span>
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {t('settings.englishDesc')}
                </p>
              </div>
            </div>
            {language === 'en' && (
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* 3. Privacy Form */}
      <form onSubmit={handleSavePrivacy} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-700" />
            <span>{t('settings.privacyAndVisibility')}</span>
          </h3>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {t('settings.whoCanSee')}
            </label>
            <select
              value={visibility}
              onChange={e => setVisibility(e.target.value as any)}
              className="w-full sm:w-80 p-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="volunteers_only">{t('settings.optVolunteersOnly')}</option>
              <option value="public">{t('settings.optPublic')}</option>
              <option value="private">{t('settings.optPrivate')}</option>
            </select>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">{t('settings.showLevelPoints')}</span>
                <span className="text-slate-500 text-[11px]">{t('settings.showLevelPointsSub')}</span>
              </div>
              <input
                type="checkbox"
                checked={showLevelAndPoints}
                onChange={e => setShowLevelAndPoints(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">{t('settings.showBadgesCerts')}</span>
                <span className="text-slate-500 text-[11px]">{t('settings.showBadgesCertsSub')}</span>
              </div>
              <input
                type="checkbox"
                checked={showAchievements}
                onChange={e => setShowAchievements(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">{t('settings.hideContacts')}</span>
                <span className="text-slate-500 text-[11px]">{t('settings.hideContactsSub')}</span>
              </div>
              <input
                type="checkbox"
                checked={hidePersonalContacts}
                onChange={e => setHidePersonalContacts(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 cursor-pointer"
              />
            </label>
          </div>

          <button
            type="submit"
            className="py-2.5 px-6 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{t('settings.savePrivacyBtn')}</span>
          </button>
        </div>
      </form>

      {/* 4. Notifications Channels */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-700" />
          <span>{t('settings.notifChannels')}</span>
        </h3>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">{t('settings.pushNotif')}</span>
              <span className="text-slate-500 text-[11px]">
                {language === 'en' ? 'Urgent alerts regarding nearby initiatives and mutual aid' : 'Термінові новини про проєкти поруч та взаємодопомогу'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifPush}
              onChange={e => setNotifPush(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">{t('settings.emailNotif')}</span>
              <span className="text-slate-500 text-[11px]">
                {language === 'en' ? 'Weekly digest, expense reimbursement approvals' : 'Щотижневий дайджест, статус компенсації витрат'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifEmail}
              onChange={e => setNotifEmail(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">{t('settings.telegramNotif')}</span>
              <span className="text-slate-500 text-[11px]">
                {language === 'en' ? 'Instant bot alerts for weekly Happy Thursday draws' : 'Миттєві сповіщення про виграш у четверговому розіграші'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifTelegram}
              onChange={e => setNotifTelegram(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* 5. Security & GDPR */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <h3 className="font-bold text-sm text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{t('settings.securityAndGdpr')}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="font-bold text-slate-800 block">{t('settings.twoFactorAuth')}</span>
            <p className="text-slate-600 text-[11px]">
              {language === 'en' 
                ? 'Account protection via SMS code or Google Authenticator app.'
                : 'Захист облікового запису SMS-кодом або додатком Google Authenticator.'}
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="font-semibold text-emerald-700">
                {language === 'en' ? '✓ Enabled' : '✓ Активовано'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIs2FAEnabled(!is2FAEnabled);
                  showToast(is2FAEnabled 
                    ? (language === 'en' ? '2FA disabled' : '2FA вимкнено')
                    : (language === 'en' ? '2FA enabled' : '2FA активовано'));
                }}
                className="text-xs text-blue-700 font-bold hover:underline cursor-pointer"
              >
                {is2FAEnabled 
                  ? (language === 'en' ? 'Configure' : 'Налаштувати')
                  : (language === 'en' ? 'Enable' : 'Увімкнути')}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <span className="font-bold text-slate-800 block">{t('settings.changePassword')}</span>
            <p className="text-slate-600 text-[11px]">
              {language === 'en'
                ? 'Last updated 3 months ago. Recommended every 6 months.'
                : 'Останнє оновлення: 3 місяці тому. Рекомендується оновлювати кожні півроку.'}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => showToast(language === 'en' 
                  ? 'Password reset instructions sent to your email.' 
                  : 'Інструкції щодо зміни паролю надіслано на вашу пошту.')}
                className="text-xs text-blue-700 font-bold hover:underline cursor-pointer"
              >
                {t('settings.updatePasswordBtn')}
              </button>
            </div>
          </div>
        </div>

        {/* GDPR Export */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-slate-800">{t('settings.exportData')}</span>
            <p className="text-slate-500 text-[11px]">
              {language === 'en'
                ? 'Download complete archive of your volunteer hours, missions, and certificates in JSON format.'
                : 'Завантажте повний архів ваших годин, проєктів та сертифікатів у форматі JSON.'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleExportData}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <FileDown className="w-4 h-4 text-slate-600" />
            <span>{t('settings.downloadMyData')}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
