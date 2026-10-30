import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  VolunteerProfile, 
  Badge, 
  Course, 
  Certificate, 
  Project, 
  PeerHelpRequest, 
  CanHelpOffer, 
  ChatChannel, 
  ChatMessage, 
  Announcement, 
  ExpenseClaim, 
  AppNotification 
} from '../types';
import { Language, translations } from '../i18n/translations';
import {
  initialProfile,
  initialBadges,
  initialCourses,
  initialCertificates,
  initialProjects,
  initialPeerRequests,
  initialCanHelpOffers,
  initialChannels,
  initialMessages,
  initialAnnouncements,
  initialExpenses,
  initialNotifications
} from '../data/mockData';

export type NavigationTab = 
  | 'dashboard' 
  | 'profile' 
  | 'learning' 
  | 'course-player' 
  | 'projects' 
  | 'project-details' 
  | 'waneri-help' 
  | 'chat' 
  | 'rewards' 
  | 'support' 
  | 'expenses' 
  | 'growth' 
  | 'settings';

interface VolunteerContextType {
  profile: VolunteerProfile;
  badges: Badge[];
  courses: Course[];
  certificates: Certificate[];
  projects: Project[];
  peerRequests: PeerHelpRequest[];
  canHelpOffers: CanHelpOffer[];
  channels: ChatChannel[];
  messages: Record<string, ChatMessage[]>;
  announcements: Announcement[];
  expenses: ExpenseClaim[];
  notifications: AppNotification[];
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  isDigitalIdModalOpen: boolean;
  setIsDigitalIdModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, replacements?: Record<string, string | number>) => string;

  // Actions
  addPoints: (amount: number, reason: string) => void;
  joinProject: (projectId: string) => void;
  leaveProject: (projectId: string) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  completeCourseQuiz: (courseId: string, score: number) => void;
  addPeerRequest: (request: {
    title: string;
    description: string;
    category: PeerHelpRequest['category'];
    location: string;
    dateNeeded: string;
    urgency: PeerHelpRequest['urgency'];
    helpersNeeded: number;
  }) => void;
  respondToPeerRequest: (requestId: string) => void;
  toggleCanHelpOffer: (offerId: string) => void;
  sendMessage: (channelId: string, content: string) => void;
  addReaction: (channelId: string, messageId: string, emoji: string) => void;
  registerForAnnouncement: (announcementId: string) => void;
  submitExpenseClaim: (claim: {
    category: ExpenseClaim['category'];
    amount: number;
    currency: ExpenseClaim['currency'];
    date: string;
    description: string;
    receiptName: string;
  }) => void;
  redeemReward: (cost: number, itemName: string) => boolean;
  updateProfile: (updated: Partial<VolunteerProfile>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  logout: () => void;
  loginAsDemo: () => void;
  registerNewVolunteer: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    skills: string[];
    directions: string[];
  }) => void;
}

const VolunteerContext = createContext<VolunteerContextType | undefined>(undefined);

export const VolunteerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<VolunteerProfile>(() => {
    const saved = localStorage.getItem('thymus_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('thymus_badges');
    return saved ? JSON.parse(saved) : initialBadges;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('thymus_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('thymus_certs');
    return saved ? JSON.parse(saved) : initialCertificates;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('thymus_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [peerRequests, setPeerRequests] = useState<PeerHelpRequest[]>(() => {
    const saved = localStorage.getItem('thymus_peer_requests');
    return saved ? JSON.parse(saved) : initialPeerRequests;
  });

  const [canHelpOffers, setCanHelpOffers] = useState<CanHelpOffer[]>(() => {
    const saved = localStorage.getItem('thymus_can_help');
    return saved ? JSON.parse(saved) : initialCanHelpOffers;
  });

  const [channels] = useState<ChatChannel[]>(initialChannels);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(initialMessages);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [expenses, setExpenses] = useState<ExpenseClaim[]>(() => {
    const saved = localStorage.getItem('thymus_expenses');
    return saved ? JSON.parse(saved) : initialExpenses;
  });
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);

  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>('proj-1');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>('course-first-aid');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isDigitalIdModalOpen, setIsDigitalIdModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('thymus_lang');
    return (saved === 'en' || saved === 'ua') ? saved : 'ua';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('thymus_lang', lang);
  };

  const t = (path: string, replacements?: Record<string, string | number>): string => {
    const keys = path.split('.');
    let current: any = translations[language];
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        let fallback: any = translations.en;
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk];
          } else {
            fallback = path;
            break;
          }
        }
        current = fallback;
        break;
      }
    }
    if (typeof current !== 'string') return path;
    if (replacements) {
      return Object.entries(replacements).reduce((acc, [key, val]) => {
        return acc.replace(new RegExp(`\\{${key}\\}`, 'g'), String(val));
      }, current);
    }
    return current;
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('thymus_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('thymus_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('thymus_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('thymus_projects', JSON.stringify(projects));
  }, [projects]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  const addPoints = (amount: number, reason: string) => {
    setProfile(prev => {
      const newPoints = prev.points + amount;
      const targetForGold = 3000;
      const pointsToNext = Math.max(0, targetForGold - newPoints);
      const progress = Math.min(100, Math.round((newPoints / targetForGold) * 100));

      const newLevel = newPoints >= 3000 ? 'Золотий' : prev.level;
      const newLevelNum = newPoints >= 3000 ? 15 : prev.levelNumber;

      return {
        ...prev,
        points: newPoints,
        pointsToNextLevel: pointsToNext,
        levelProgressPercent: progress,
        level: newLevel,
        levelNumber: newLevelNum
      };
    });

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `+${amount} балів нараховано ⭐`,
      message: reason,
      timestamp: 'Щойно',
      isRead: false,
      type: 'points'
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(`+${amount} балів: ${reason}`);
  };

  const joinProject = (projectId: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const isNowReg = !p.isRegistered;
          return {
            ...p,
            isRegistered: isNowReg,
            registeredVolunteers: isNowReg ? p.registeredVolunteers + 1 : Math.max(0, p.registeredVolunteers - 1)
          };
        }
        return p;
      })
    );

    const project = projects.find(p => p.id === projectId);
    if (project) {
      if (!project.isRegistered) {
        addPoints(50, `Реєстрація на проєкт "${project.title}"`);
        showToast(`Ви успішно зареєструвалися на проєкт "${project.title}"!`);
      } else {
        showToast(`Ви скасували реєстрацію на проєкт.`);
      }
    }
  };

  const leaveProject = (projectId: string) => {
    joinProject(projectId);
  };

  const completeLesson = (courseId: string, lessonId: string) => {
    setCourses(prev =>
      prev.map(c => {
        if (c.id === courseId) {
          const updatedLessons = c.lessons.map(l =>
            l.id === lessonId ? { ...l, completed: true } : l
          );
          const completedCount = updatedLessons.filter(l => l.completed).length;
          const progressPercent = Math.round((completedCount / updatedLessons.length) * 100);
          return {
            ...c,
            lessons: updatedLessons,
            progressPercent
          };
        }
        return c;
      })
    );
    addPoints(25, `Завершено урок`);
  };

  const completeCourseQuiz = (courseId: string, score: number) => {
    setCourses(prev =>
      prev.map(c => {
        if (c.id === courseId) {
          const updatedLessons = c.lessons.map(l => ({ ...l, completed: true }));
          return {
            ...c,
            lessons: updatedLessons,
            progressPercent: 100,
            isCompleted: true
          };
        }
        return c;
      })
    );

    const targetCourse = courses.find(c => c.id === courseId);
    const courseTitle = targetCourse ? targetCourse.title : 'Перша медична допомога';

    // Issue certificate
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      courseTitle,
      recipientName: `${profile.firstName} ${profile.lastName}`,
      volunteerId: profile.volunteerId,
      completedDate: new Date().toLocaleDateString('uk-UA'),
      certificateNumber: `TH-CERT-${Math.floor(100000 + Math.random() * 900000)}`,
      validUntil: 'Безстроково',
      skillsAcquired: ['Домедична допомога', 'Зупинка кровотечі', 'СЛР', 'Використання АЗД'],
      instructor: 'Д-р Марта Коваль, керівник медичного відділу'
    };

    setCertificates(prev => [newCert, ...prev]);

    // Update profile stats
    setProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        coursesCompleted: prev.stats.coursesCompleted + 1
      }
    }));

    addPoints(150, `Успішне складання тесту та отримання сертифіката "${courseTitle}"`);
    showToast(`🎉 Вітаємо! Сертифікат "${courseTitle}" збережено у вашому профілі!`);
  };

  const addPeerRequest = (reqData: {
    title: string;
    description: string;
    category: PeerHelpRequest['category'];
    location: string;
    dateNeeded: string;
    urgency: PeerHelpRequest['urgency'];
    helpersNeeded: number;
  }) => {
    const newReq: PeerHelpRequest = {
      id: `req-${Date.now()}`,
      authorName: `${profile.firstName} ${profile.lastName}`,
      authorAvatar: profile.avatarUrl,
      authorId: profile.id,
      title: reqData.title,
      description: reqData.description,
      category: reqData.category,
      location: reqData.location,
      dateNeeded: reqData.dateNeeded,
      urgency: reqData.urgency,
      helpersCount: 0,
      helpersNeeded: reqData.helpersNeeded,
      status: 'active',
      createdAt: 'Щойно',
      isMyRequest: true
    };
    setPeerRequests(prev => [newReq, ...prev]);
    showToast(`Ваш запит про допомогу розміщено у спільноті Thymus!`);
  };

  const respondToPeerRequest = (requestId: string) => {
    setPeerRequests(prev =>
      prev.map(r => {
        if (r.id === requestId) {
          const newCount = r.helpersCount + 1;
          return {
            ...r,
            helpersCount: newCount,
            status: newCount >= r.helpersNeeded ? 'fulfilled' : 'in_progress'
          };
        }
        return r;
      })
    );

    setProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        peersHelped: prev.stats.peersHelped + 1
      }
    }));

    addPoints(75, `Відгук на запит взаємодопомоги спільноти`);
    showToast(`Дякуємо! Контакти автора запиту надіслано вам у сповіщення.`);
  };

  const toggleCanHelpOffer = (offerId: string) => {
    setCanHelpOffers(prev =>
      prev.map(o => (o.id === offerId ? { ...o, enabled: !o.enabled } : o))
    );
  };

  const sendMessage = (channelId: string, content: string) => {
    if (!content.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId,
      senderName: `${profile.firstName} ${profile.lastName}`,
      senderAvatar: profile.avatarUrl,
      senderId: profile.id,
      senderRole: profile.level + ' волонтер',
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: []
    };

    setMessages(prev => ({
      ...prev,
      [channelId]: [...(prev[channelId] || []), newMsg]
    }));
  };

  const addReaction = (channelId: string, messageId: string, emoji: string) => {
    setMessages(prev => {
      const channelMsgs = prev[channelId] || [];
      const updated = channelMsgs.map(m => {
        if (m.id === messageId) {
          const existing = m.reactions.find(r => r.emoji === emoji);
          if (existing) {
            return {
              ...m,
              reactions: m.reactions.map(r =>
                r.emoji === emoji
                  ? { ...r, count: r.count + 1, users: [...r.users, profile.id] }
                  : r
              )
            };
          } else {
            return {
              ...m,
              reactions: [...m.reactions, { emoji, count: 1, users: [profile.id] }]
            };
          }
        }
        return m;
      });
      return { ...prev, [channelId]: updated };
    });
  };

  const registerForAnnouncement = (announcementId: string) => {
    setAnnouncements(prev =>
      prev.map(a => {
        if (a.id === announcementId) {
          const isReg = !a.isUserRegistered;
          return {
            ...a,
            isUserRegistered: isReg,
            registeredUsers: (a.registeredUsers || 0) + (isReg ? 1 : -1)
          };
        }
        return a;
      })
    );
    showToast('Ви успішно зареєструвалися на захід фонду!');
  };

  const submitExpenseClaim = (claimData: {
    category: ExpenseClaim['category'];
    amount: number;
    currency: ExpenseClaim['currency'];
    date: string;
    description: string;
    receiptName: string;
  }) => {
    const newClaim: ExpenseClaim = {
      id: `exp-${Date.now()}`,
      category: claimData.category,
      amount: claimData.amount,
      currency: claimData.currency,
      date: claimData.date,
      description: claimData.description,
      receiptName: claimData.receiptName,
      status: 'На розгляді'
    };

    setExpenses(prev => [newClaim, ...prev]);
    showToast('Заявку на компенсацію витрат подано до фінансового відділу Thymus.');
  };

  const redeemReward = (cost: number, itemName: string): boolean => {
    if (profile.points < cost) {
      showToast(`Недостатньо балів для замовлення (${profile.points} з ${cost})`);
      return false;
    }
    setProfile(prev => ({
      ...prev,
      points: prev.points - cost
    }));
    showToast(`Вітаємо! Ви замовили "${itemName}". Координатор зв'яжеться з вами.`);
    return true;
  };

  const updateProfile = (updated: Partial<VolunteerProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
    showToast('Дані профілю успішно оновлено!');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAuthModalOpen(true);
  };

  const loginAsDemo = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    showToast('Успішний вхід у систему Thymus Hub');
  };

  const registerNewVolunteer = (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    skills: string[];
    directions: string[];
  }) => {
    const newVolId = `TH-${Math.floor(100000 + Math.random() * 900000)}`;
    setProfile({
      id: `vol-${Date.now()}`,
      volunteerId: newVolId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      city: data.city || 'Cardiff',
      country: 'UK',
      avatarUrl: initialProfile.avatarUrl,
      status: 'АКТИВНИЙ ВОЛОНТЕР',
      level: 'Новачок',
      levelNumber: 1,
      points: 100,
      pointsToNextLevel: 400,
      levelProgressPercent: 20,
      joinDate: new Date().toLocaleDateString('uk-UA'),
      bio: 'Новий учасник спільноти The Thymus Foundation. Готовий допомагати та навчатися!',
      skills: data.skills.length > 0 ? data.skills : ['Комунікація', 'Організація'],
      languages: ['Українська', 'English'],
      directions: data.directions.length > 0 ? data.directions : ['Люди', 'Медицина'],
      stats: {
        hoursServed: 0,
        projectsCompleted: 0,
        coursesCompleted: 0,
        peopleHelped: 0,
        peersHelped: 0,
        childrenSupported: 0,
        patientsSupported: 0,
        ecoActions: 0
      },
      privacy: {
        profileVisibility: 'volunteers_only',
        showLevelAndPoints: true,
        showAchievements: true,
        hidePersonalContacts: false,
        allowDirectMessages: true
      }
    });
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    showToast(`Ласкаво просимо до The Thymus Foundation, ${data.firstName}! Вам нараховано +100 вітальних балів!`);
  };

  return (
    <VolunteerContext.Provider
      value={{
        profile,
        badges,
        courses,
        certificates,
        projects,
        peerRequests,
        canHelpOffers,
        channels,
        messages,
        announcements,
        expenses,
        notifications,
        activeTab,
        setActiveTab,
        selectedProjectId,
        setSelectedProjectId,
        selectedCourseId,
        setSelectedCourseId,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isDigitalIdModalOpen,
        setIsDigitalIdModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAuthenticated,
        toastMessage,
        showToast,
        addPoints,
        joinProject,
        leaveProject,
        completeLesson,
        completeCourseQuiz,
        addPeerRequest,
        respondToPeerRequest,
        toggleCanHelpOffer,
        sendMessage,
        addReaction,
        registerForAnnouncement,
        submitExpenseClaim,
        redeemReward,
        updateProfile,
        markNotificationRead,
        markAllNotificationsRead,
        logout,
        loginAsDemo,
        registerNewVolunteer,
        language,
        setLanguage,
        t
      }}
    >
      {children}
    </VolunteerContext.Provider>
  );
};

export const useVolunteer = () => {
  const context = useContext(VolunteerContext);
  if (!context) {
    throw new Error('useVolunteer must be used within a VolunteerProvider');
  }
  return context;
};
