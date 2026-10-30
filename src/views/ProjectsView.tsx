import React, { useState } from 'react';
import { 
  Globe2, 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  ChevronRight,
  Compass,
  Navigation,
  Sparkles
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';
import { Project } from '../types';

export const ProjectsView: React.FC = () => {
  const { 
    projects, 
    joinProject, 
    setSelectedProjectId, 
    setActiveTab, 
    showToast 
  } = useVolunteer();

  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'near' | 'my'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [showMapView, setShowMapView] = useState(false);
  const [selectedMapProject, setSelectedMapProject] = useState<Project | null>(null);

  const categories = ['all', 'Люди', 'Медицина', 'Освіта', 'Екологія', 'Тварини', 'Соціальна допомога'];

  const filteredProjects = projects.filter(p => {
    const matchesTab = 
      activeTabFilter === 'all' ? true :
      activeTabFilter === 'near' ? (p.distanceKm && p.distanceKm <= 10) :
      p.isRegistered;

    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesCity = selectedCity === 'all' || p.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesCategory && matchesCity && matchesSearch;
  });

  const handleOpenDetails = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveTab('project-details');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-sky-900 rounded-2xl p-6 text-white shadow-lg border border-blue-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">
              АКТИВНІ ВОЛОНТЕРСЬКІ МІСІЇ
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-heading mt-1">
              Соціальні проєкти The Thymus Foundation
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-2xl">
              Обирайте ініціативи поруч з вами, долучайтесь до перевірених команд та змінюйте життя людей на краще.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMapView(!showMapView)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                showMapView 
                  ? 'bg-amber-400 text-blue-950 shadow-md' 
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{showMapView ? 'Приховати карту' : 'Проєкти на карті'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Map Preview Widget (if toggled) */}
      {showMapView && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-blue-700" />
              <h3 className="font-bold text-sm text-slate-900">
                Карта волонтерських локацій (UK & Wales)
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Ваша геопозиція: <strong>Cardiff (CF10)</strong>
            </span>
          </div>

          {/* Interactive Simulated Map Canvas */}
          <div className="mt-3 relative h-72 rounded-xl bg-slate-900 overflow-hidden border border-slate-300">
            {/* Map styling grid & background */}
            <div className="absolute inset-0 bg-[#1E293B] opacity-90" />
            <div 
              className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)]" 
              style={{ backgroundSize: '24px 24px' }} 
            />

            {/* Simulated UK coastline contour hint */}
            <div className="absolute top-10 left-10 text-slate-600 font-mono text-[10px] tracking-widest uppercase">
              SOUTH WALES & BRISTOL CHANNEL SECTOR
            </div>

            {/* Pins on map */}
            {projects.map(proj => {
              // Simulated pin offsets based on city
              let top = '45%';
              let left = '38%'; // Cardiff default
              if (proj.city === 'Swansea') { top = '42%'; left = '18%'; }
              if (proj.city === 'Bristol') { top = '52%'; left = '65%'; }

              const isSelected = selectedMapProject?.id === proj.id;

              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedMapProject(proj)}
                  style={{ top, left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  <div className={`p-2 rounded-full shadow-lg transition-transform group-hover:scale-125 ${
                    isSelected ? 'bg-amber-400 text-blue-950 scale-125 ring-4 ring-amber-300/40' : 'bg-blue-600 text-white'
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-white text-[10px] px-2 py-0.5 rounded shadow pointer-events-none">
                    {proj.city} ({proj.distanceKm} км)
                  </div>
                </div>
              );
            })}

            {/* Selected Map Card Popover */}
            {selectedMapProject && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white rounded-xl shadow-2xl p-3 border border-slate-200 z-30 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold text-blue-800 uppercase bg-blue-50 px-2 py-0.5 rounded">
                    {selectedMapProject.category}
                  </span>
                  <button
                    onClick={() => setSelectedMapProject(null)}
                    className="text-slate-400 hover:text-slate-700 text-xs"
                  >
                    ✕
                  </button>
                </div>
                <h4 className="font-bold text-xs text-slate-900 mt-1 line-clamp-1">
                  {selectedMapProject.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  📍 {selectedMapProject.location} · {selectedMapProject.distanceKm} км від вас
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleOpenDetails(selectedMapProject.id)}
                    className="flex-1 py-1.5 bg-blue-700 text-white text-[11px] font-bold rounded-lg"
                  >
                    Деталі місії
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Filters & Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        
        {/* Top filter tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1 w-full sm:w-auto p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveTabFilter('all')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTabFilter === 'all'
                  ? 'bg-white text-blue-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Всі проєкти ({projects.length})
            </button>
            <button
              onClick={() => setActiveTabFilter('near')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTabFilter === 'near'
                  ? 'bg-white text-blue-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Поруч зі мною (до 10 км)
            </button>
            <button
              onClick={() => setActiveTabFilter('my')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTabFilter === 'my'
                  ? 'bg-white text-blue-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Мої проєкти ({projects.filter(p => p.isRegistered).length})
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Пошук за назвою чи адресою..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 focus:bg-white"
            />
          </div>
        </div>

        {/* Category Pills & City selection */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                    isSelected
                      ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat === 'all' ? 'Усі категорії' : cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Місто:</span>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Усі міста</option>
              <option value="Cardiff">Cardiff (Кардіфф)</option>
              <option value="Swansea">Swansea (Свонсі)</option>
              <option value="Bristol">Bristol (Бристоль)</option>
            </select>
          </div>
        </div>

      </div>

      {/* 4. Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map(proj => {
          const percentFilled = Math.min(100, Math.round((proj.registeredVolunteers / proj.neededVolunteers) * 100));

          return (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div>
                {/* Image */}
                <div 
                  onClick={() => handleOpenDetails(proj.id)}
                  className="relative h-44 overflow-hidden bg-slate-100 cursor-pointer"
                >
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold rounded-md">
                    {proj.category}
                  </span>

                  {proj.distanceKm && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-white/90 backdrop-blur-xs text-blue-950 text-[10px] font-bold rounded-md flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-700" />
                      {proj.distanceKm} км
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-medium text-slate-200">
                      📅 {proj.date} · {proj.time}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 
                    onClick={() => handleOpenDetails(proj.id)}
                    className="font-bold text-slate-900 text-sm font-heading leading-snug group-hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    {proj.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{proj.location}, {proj.city}</span>
                  </div>

                  {/* Volunteers progress bar */}
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                      <span>Потрібно {proj.neededVolunteers} волонтерів</span>
                      <span className="font-mono text-blue-900">{proj.registeredVolunteers}/{proj.neededVolunteers}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${percentFilled >= 100 ? 'bg-amber-500' : 'bg-blue-600'}`}
                        style={{ width: `${percentFilled}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 pt-0 flex items-center gap-2">
                <button
                  onClick={() => handleOpenDetails(proj.id)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                >
                  Деталі
                </button>
                <button
                  onClick={() => joinProject(proj.id)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    proj.isRegistered
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                      : 'bg-blue-700 hover:bg-blue-800 text-white shadow-sm'
                  }`}
                >
                  {proj.isRegistered ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Ви зареєстровані</span>
                    </>
                  ) : (
                    <span>Долучитися (+50 балів)</span>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <Globe2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-700">Проєктів не знайдено</h4>
          <p className="text-xs text-slate-400 mt-1">Спробуйте скинути фільтри або обрати інше місто.</p>
        </div>
      )}

    </div>
  );
};
