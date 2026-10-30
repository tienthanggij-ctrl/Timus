export type VolunteerLevel = 
  | 'Новачок' 
  | 'Бронзовий' 
  | 'Срібний' 
  | 'Золотий' 
  | 'Платиновий' 
  | 'Амбасадор Thymus';

export interface VolunteerProfile {
  id: string;
  volunteerId: string; // e.g. TH-0012545
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  avatarUrl: string;
  status: 'АКТИВНИЙ ВОЛОНТЕР' | 'НА ПАУЗІ' | 'НОВИЙ УЧАСНИК';
  level: VolunteerLevel;
  levelNumber: number;
  points: number;
  pointsToNextLevel: number;
  levelProgressPercent: number;
  joinDate: string;
  bio: string;
  skills: string[];
  languages: string[];
  directions: string[]; // e.g. Люди, Медицина, Освіта, Екологія, Тварини
  stats: {
    hoursServed: number;
    projectsCompleted: number;
    coursesCompleted: number;
    peopleHelped: number;
    peersHelped: number;
    childrenSupported: number;
    patientsSupported: number;
    ecoActions: number;
  };
  privacy: {
    profileVisibility: 'public' | 'volunteers_only' | 'private';
    showLevelAndPoints: boolean;
    showAchievements: boolean;
    hidePersonalContacts: boolean;
    allowDirectMessages: boolean;
  };
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'onboarding' | 'hours' | 'training' | 'impact' | 'community';
  progress?: { current: number; total: number };
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'article' | 'interactive' | 'test';
  content?: string;
}

export interface CourseQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: 'Базовий' | 'Середній' | 'Поглиблений';
  format: string;
  imageUrl: string;
  progressPercent: number;
  lessons: CourseLesson[];
  quiz?: CourseQuizQuestion[];
  pointsAwarded: number;
  isCompleted: boolean;
}

export interface Certificate {
  id: string;
  courseTitle: string;
  recipientName: string;
  volunteerId: string;
  completedDate: string;
  certificateNumber: string;
  validUntil: string;
  skillsAcquired: string[];
  instructor: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Люди' | 'Медицина' | 'Освіта' | 'Екологія' | 'Тварини' | 'Соціальна допомога' | 'Надзвичайні ситуації';
  location: string;
  address: string;
  city: string;
  coordinates: { lat: number; lng: number };
  distanceKm?: number;
  date: string;
  time: string;
  neededVolunteers: number;
  registeredVolunteers: number;
  imageUrl: string;
  isRegistered: boolean;
  requiredSkills: string[];
  coordinator: {
    name: string;
    role: string;
    avatarUrl: string;
    phone: string;
  };
}

export interface PeerHelpRequest {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorId: string;
  title: string;
  description: string;
  category: 'Транспорт' | 'Переклад' | 'Речі' | 'Консультація' | 'Побут' | 'Навчання';
  location: string;
  dateNeeded: string;
  urgency: 'Звичайна' | 'Терміново' | 'Висока';
  helpersCount: number;
  helpersNeeded: number;
  status: 'active' | 'in_progress' | 'fulfilled';
  createdAt: string;
  isMyRequest?: boolean;
}

export interface CanHelpOffer {
  id: string;
  category: string;
  title: string;
  availability: string;
  description: string;
  enabled: boolean;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderName: string;
  senderAvatar: string;
  senderId: string;
  senderRole?: string;
  isCoordinator?: boolean;
  content: string;
  timestamp: string;
  reactions: { emoji: string; count: number; users: string[] }[];
}

export interface ChatChannel {
  id: string;
  name: string;
  type: 'general' | 'project' | 'region' | 'topic';
  description: string;
  membersCount: number;
  unreadCount?: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  author: string;
  authorRole: string;
  category: 'Навчання' | 'Захід' | 'Фонд' | 'Терміново';
  actionUrl?: string;
  actionText?: string;
  registeredUsers?: number;
  isUserRegistered?: boolean;
}

export interface ExpenseClaim {
  id: string;
  category: 'Паливо' | 'Квиток' | 'Транспорт' | 'Обладнання' | 'Спецодяг' | 'Інше';
  amount: number;
  currency: 'GBP' | 'UAH' | 'EUR';
  date: string;
  description: string;
  receiptName: string;
  status: 'На розгляді' | 'Погоджено' | 'Відхилено';
  reviewedAt?: string;
}

export interface RewardItem {
  id: string;
  title: string;
  pointsCost: number;
  category: 'Мерч' | 'Обладнання' | 'Курси' | 'Заходи';
  imageUrl: string;
  description: string;
  inStock: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'points' | 'project' | 'course' | 'chat' | 'expense' | 'draw';
}
