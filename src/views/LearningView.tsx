import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Clock, 
  Award, 
  CheckCircle2, 
  Play, 
  BookOpen, 
  Filter, 
  ChevronRight,
  FileCheck
} from 'lucide-react';
import { useVolunteer } from '../context/VolunteerContext';

export const LearningView: React.FC = () => {
  const { 
    courses, 
    certificates, 
    setActiveTab, 
    setSelectedCourseId 
  } = useVolunteer();

  const [activeSubTab, setActiveSubTab] = useState<'all' | 'my' | 'certs'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Усі курси', count: courses.length },
    { id: 'Перша допомога', label: '🚑 Перша допомога', count: 1 },
    { id: 'Психологічна підтримка', label: '🧠 Психологічна допомога', count: 1 },
    { id: 'Робота з вразливими', label: '🫂 Робота з вразливими', count: 1 },
    { id: 'Надзвичайні ситуації', label: '🚨 Надзвичайні ситуації', count: 1 },
    { id: 'Екологія', label: '🌱 Екологія', count: 1 },
    { id: 'Digital skills', label: '💻 Digital skills', count: 1 }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeSubTab === 'all' || 
                       (activeSubTab === 'my' && course.progressPercent > 0);
    return matchesCategory && matchesSearch && matchesTab;
  });

  const handleStartCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveTab('course-player');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white shadow-lg border border-blue-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">
              LMS АКАДЕМІЯ ВОЛОНТЕРА
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-heading mt-1">
              Навчальний центр The Thymus Foundation
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-2xl">
              Системне навчання, підготовка до сертифікації, розвиток практичних навичок порятунку та взаємопідтримки.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl backdrop-blur-xs border border-white/20">
            <div className="text-center">
              <span className="text-lg font-black text-amber-300 font-heading block tabular-nums">
                {courses.filter(c => c.isCompleted).length}
              </span>
              <span className="text-[10px] text-blue-200 uppercase">Завершено</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <span className="text-lg font-black text-white font-heading block tabular-nums">
                {certificates.length}
              </span>
              <span className="text-[10px] text-blue-200 uppercase">Сертифікатів</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sub-tab Bar & Search Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Subtabs */}
        <div className="flex items-center gap-1 w-full sm:w-auto p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'all'
                ? 'bg-white text-blue-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Усі курси ({courses.length})
          </button>
          <button
            onClick={() => setActiveSubTab('my')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'my'
                ? 'bg-white text-blue-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Моє навчання ({courses.filter(c => c.progressPercent > 0).length})
          </button>
          <button
            onClick={() => setActiveSubTab('certs')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeSubTab === 'certs'
                ? 'bg-white text-blue-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Сертифікати ({certificates.length})
          </button>
        </div>

        {/* Live Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Пошук курсу або теми..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 focus:bg-white"
          />
        </div>
      </div>

      {/* 3. Main Content: Courses Catalog or Certificates */}
      {activeSubTab !== 'certs' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Categories Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2 mb-2">
              Категорії знань
            </h3>
            <div className="space-y-1">
              {categories.map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                      isSelected
                        ? 'bg-blue-700 text-white font-bold shadow-md shadow-blue-700/20'
                        : 'text-slate-600 hover:bg-white hover:text-slate-900'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isSelected ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Promo box for First Aid course */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
              <span className="text-[10px] uppercase font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">
                Рекомендовано для вас
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-2 font-heading">
                Перша медична допомога
              </h4>
              <p className="text-[11px] text-slate-600 mt-1">
                Обов'язковий практичний курс для допуску до польових та медичних місій.
              </p>
              <button
                onClick={() => handleStartCourse('course-first-aid')}
                className="mt-3 w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Продовжити (80%)
              </button>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCourses.map(course => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col hover:border-blue-400 hover:shadow-md transition-all group"
                >
                  {/* Thumbnail */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold rounded-md">
                      {course.category}
                    </span>

                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-amber-400 text-blue-950 text-[10px] font-black rounded-md">
                      +{course.pointsAwarded} балів
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-2 text-[11px] text-slate-200">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {course.duration}
                        </span>
                        <span>·</span>
                        <span>{course.level}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm font-heading leading-snug group-hover:text-blue-700 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      {course.progressPercent > 0 ? (
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-1">
                            <span>Прогрес курсу</span>
                            <span className="font-mono font-bold text-blue-800">{course.progressPercent}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${course.isCompleted ? 'bg-emerald-500' : 'bg-blue-600'}`}
                              style={{ width: `${course.progressPercent}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-400">
                          Формат: {course.format}
                        </div>
                      )}

                      <button
                        onClick={() => handleStartCourse(course.id)}
                        className={`w-full mt-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          course.isCompleted
                            ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                            : course.progressPercent > 0
                            ? 'bg-blue-700 hover:bg-blue-800 text-white shadow-sm'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                      >
                        {course.isCompleted ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Пройдено · Повторити</span>
                          </>
                        ) : course.progressPercent > 0 ? (
                          <>
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Продовжити навчання</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>Розпочати курс</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-700">Курсів не знайдено</h4>
                <p className="text-xs text-slate-400 mt-1">Спробуйте змінити фільтри або пошуковий запит.</p>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* Certificates tab view */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certificates.map(cert => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {cert.courseTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-mono">
                  {cert.certificateNumber}
                </p>
                <div className="mt-3 text-[11px] text-slate-600">
                  <span className="text-slate-400 block">Видано:</span>
                  <span>{cert.completedDate}</span>
                </div>
                <div className="mt-2 text-[11px] text-slate-600">
                  <span className="text-slate-400 block">Інструктор:</span>
                  <span>{cert.instructor}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-emerald-700 font-bold uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Верифіковано
                </span>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="text-xs text-blue-700 hover:text-blue-900 font-bold"
                >
                  Переглянути →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
