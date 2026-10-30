import React, { useState } from 'react';
import { 
  HandHeart, 
  Heart, 
  Plus, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Car, 
  Languages, 
  Baby, 
  Briefcase, 
  Sparkles, 
  X,
  Phone,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';
import { PeerHelpRequest } from '../types';

export const WaneriHelpView: React.FC = () => {
  const { 
    peerRequests, 
    addPeerRequest, 
    respondToPeerRequest, 
    canHelpOffers, 
    toggleCanHelpOffer, 
    showToast 
  } = useVolunteer();

  const [activeTab, setActiveTab] = useState<'need-help' | 'can-help'>('need-help');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Request Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState<PeerHelpRequest['category']>('Транспорт');
  const [newLocation, setNewLocation] = useState('Cardiff');
  const [newDate, setNewDate] = useState('');
  const [newUrgency, setNewUrgency] = useState<PeerHelpRequest['urgency']>('Звичайна');
  const [newHelpersNeeded, setNewHelpersNeeded] = useState(1);

  const categories = ['all', 'Транспорт', 'Переклад', 'Речі', 'Консультація', 'Побут'];

  const filteredRequests = peerRequests.filter(req => {
    return selectedCategory === 'all' || req.category === selectedCategory;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) {
      showToast('Будь ласка, заповніть назву та опис запиту.');
      return;
    }

    addPeerRequest({
      title: newTitle.trim(),
      description: newDesc.trim(),
      category: newCat,
      location: newLocation.trim(),
      dateNeeded: newDate || 'Найближчим часом',
      urgency: newUrgency,
      helpersNeeded: newHelpersNeeded
    });

    setNewTitle('');
    setNewDesc('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-sky-900 rounded-2xl p-6 text-white shadow-lg border border-blue-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">
              PEER-TO-PEER СИСТЕМА ВЗАЄМОДОПОМОГИ
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-heading mt-1">
              Взаємодопомога (Waneri Help)
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-2xl">
              Внутрішня мережа взаємної підтримки між волонтерами та родинами підопічних. Допомагайте іншим або звертайтеся за дружнім плечем!
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold rounded-xl text-xs shadow-md shadow-amber-400/20 transition-all cursor-pointer flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Розмістити свій запит</span>
          </button>
        </div>
      </div>

      {/* 2. Mode Switcher (Need Help vs Can Help) */}
      <div className="flex border-b border-slate-200 bg-white p-2 rounded-2xl border shadow-xs gap-2">
        <button
          onClick={() => setActiveTab('need-help')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'need-help'
              ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Потрібна допомога ({peerRequests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('can-help')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'can-help'
              ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <HandHeart className="w-4 h-4" />
          <span>Я можу допомогти ({canHelpOffers.filter(o => o.enabled).length} активних пропозицій)</span>
        </button>
      </div>

      {/* 3. MODE 1: ACTIVE REQUESTS LIST */}
      {activeTab === 'need-help' && (
        <div className="space-y-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 mr-1">Категорії:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat === 'all' ? 'Усі запити' : cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRequests.map(req => {
              const isFulfilled = req.status === 'fulfilled';
              return (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Author, Urgency, Category */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={req.authorAvatar}
                          alt={req.authorName}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{req.authorName}</h4>
                          <span className="text-[10px] text-slate-400 font-medium">{req.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-800 rounded-md">
                          {req.category}
                        </span>
                        {req.urgency === 'Терміново' && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-md animate-pulse">
                            🚨 Терміново
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mt-3">
                      <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-700 transition-colors">
                        {req.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {req.description}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {req.location}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Дата: {req.dateNeeded}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: helpers status & CTA */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="text-[11px] font-medium text-slate-500">
                      Відгукнулося: <strong className="text-blue-900">{req.helpersCount}/{req.helpersNeeded}</strong>
                    </div>

                    <button
                      disabled={isFulfilled}
                      onClick={() => respondToPeerRequest(req.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isFulfilled
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-blue-700 hover:bg-blue-800 text-white shadow-sm'
                      }`}
                    >
                      {isFulfilled ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Допомогу надано</span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-3.5 h-3.5 fill-white" />
                          <span>Допомогти (+75 балів)</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. MODE 2: CAN HELP SETTINGS (Offer Help) */}
      {activeTab === 'can-help' && (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <h3 className="font-bold text-sm text-blue-950 font-heading">
              Ваші активні пропозиції допомоги іншим
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Увімкніть сфери, у яких ви готові підтримати колег-волонтерів або підопічних фонду. Система автоматично сповістить вас при появі відповідного запиту.
            </p>
          </div>

          <div className="space-y-3">
            {canHelpOffers.map(offer => (
              <div
                key={offer.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-800 uppercase bg-blue-50 px-2 py-0.5 rounded">
                      {offer.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{offer.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600">{offer.description}</p>
                  <p className="text-[11px] font-semibold text-slate-500">
                    🕒 Графік доступності: {offer.availability}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs font-bold ${offer.enabled ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {offer.enabled ? 'Активно' : 'Вимкнено'}
                  </span>
                  <button
                    onClick={() => toggleCanHelpOffer(offer.id)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                      offer.enabled ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        offer.enabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE PEER REQUEST MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">
                Створити запит про допомогу (Waneri Peer Request)
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Короткий заголовок потреби
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Наприклад: Потрібна допомога з перевезенням коробок"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Категорія</label>
                  <select
                    value={newCat}
                    onChange={e => setNewCat(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Транспорт">🚗 Транспорт</option>
                    <option value="Переклад">📑 Переклад</option>
                    <option value="Речі">🧸 Речі / Дитяче</option>
                    <option value="Консультація">💬 Консультація</option>
                    <option value="Побут">🛠 Побут</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Терміновість</label>
                  <select
                    value={newUrgency}
                    onChange={e => setNewUrgency(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Звичайна">Звичайна</option>
                    <option value="Висока">Висока</option>
                    <option value="Терміново">🚨 Терміново</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Детальний опис запиту
                </label>
                <textarea
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  rows={3}
                  placeholder="Опишіть ситуацію, скільки людей потрібно та які особливі умови..."
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Локація / Район</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                    placeholder="Cardiff / Swansea / Online"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Бажана дата</label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    placeholder="Наприклад: 4 жовтня"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Опублікувати запит
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
