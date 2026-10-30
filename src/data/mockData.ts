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
  RewardItem,
  AppNotification 
} from '../types';

import avatarOlena from '../assets/images/avatar_olena_volunteer_1790769067825.jpg';
import imgFirstAid from '../assets/images/hero_first_aid_volunteer_1790769030399.jpg';
import imgChildren from '../assets/images/volunteer_project_children_1790769043160.jpg';
import imgEco from '../assets/images/volunteer_project_eco_1790769055583.jpg';

export const initialProfile: VolunteerProfile = {
  id: 'vol-001',
  volunteerId: 'TH-0012545',
  firstName: 'Олена',
  lastName: 'Кравченко',
  email: 'olena@gmail.com',
  phone: '+380 67 123 45 67',
  city: 'Cardiff',
  country: 'UK',
  avatarUrl: avatarOlena,
  status: 'АКТИВНИЙ ВОЛОНТЕР',
  level: 'Срібний',
  levelNumber: 13,
  points: 2480,
  pointsToNextLevel: 520,
  levelProgressPercent: 67,
  joinDate: '14.02.2024',
  bio: 'Люблю допомагати людям, тваринам та природі. Вірю у силу спільноти та взаємну підтримку.',
  skills: ['Медицина', 'Психологія', 'Комунікація', 'Організація заходів', 'Догляд', 'Водіння (B)'],
  languages: ['Українська (рідна)', 'English (B2)', 'Polski (A2)'],
  directions: ['Люди', 'Медицина', 'Освіта', 'Екологія', 'Тварини'],
  stats: {
    hoursServed: 128,
    projectsCompleted: 14,
    coursesCompleted: 8,
    peopleHelped: 14,
    peersHelped: 23,
    childrenSupported: 3,
    patientsSupported: 2,
    ecoActions: 5
  },
  privacy: {
    profileVisibility: 'volunteers_only',
    showLevelAndPoints: true,
    showAchievements: true,
    hidePersonalContacts: false,
    allowDirectMessages: true
  }
};

export const initialBadges: Badge[] = [
  {
    id: 'badge-1',
    title: 'Перший проєкт',
    description: 'Успішно завершено першу волонтерську місію у фонді',
    iconName: 'Award',
    unlocked: true,
    unlockedAt: '18.02.2024',
    category: 'onboarding'
  },
  {
    id: 'badge-2',
    title: 'Базова підготовка',
    description: 'Пройдено обов’язковий інструктаж та етичний кодекс волонтера Thymus',
    iconName: 'GraduationCap',
    unlocked: true,
    unlockedAt: '22.02.2024',
    category: 'training'
  },
  {
    id: 'badge-3',
    title: '100 годин допомоги',
    description: 'Відпрацьовано понад 100 задокументованих волонтерських годин',
    iconName: 'Clock',
    unlocked: true,
    unlockedAt: '10.08.2024',
    category: 'hours'
  },
  {
    id: 'badge-4',
    title: 'Перша допомога',
    description: 'Сертифікований курс домедичної допомоги при травмах та надзвичайних станах',
    iconName: 'HeartPulse',
    unlocked: true,
    unlockedAt: '12.09.2024',
    category: 'training'
  },
  {
    id: 'badge-5',
    title: 'Еко-волонтер',
    description: 'Участь у 5+ екологічних акціях та висадці дерев',
    iconName: 'Leaf',
    unlocked: true,
    unlockedAt: '01.09.2024',
    category: 'impact'
  },
  {
    id: 'badge-6',
    title: 'Допоміг 10 волонтерам',
    description: 'Відгукнувся та вирішив 10 запитів у внутрішній системі Взаємодопомоги',
    iconName: 'Users',
    unlocked: true,
    unlockedAt: '15.09.2024',
    category: 'community'
  },
  {
    id: 'badge-7',
    title: '10 курсів знань',
    description: 'Пройти 10 професійних навчальних модулів у Hub (зараз 8 з 10)',
    iconName: 'BookOpen',
    unlocked: false,
    progress: { current: 8, total: 10 },
    category: 'training'
  },
  {
    id: 'badge-8',
    title: 'Наставник (Mentor)',
    description: 'Допомога новачкам пройти перший адаптаційний період у фонді',
    iconName: 'Sparkles',
    unlocked: true,
    unlockedAt: '20.09.2024',
    category: 'community'
  },
  {
    id: 'badge-9',
    title: 'Амбасадор Thymus',
    description: 'Почесний статус представника місії доброти і милосердя у світі',
    iconName: 'Crown',
    unlocked: false,
    progress: { current: 2480, total: 5000 },
    category: 'community'
  }
];

export const initialCourses: Course[] = [
  {
    id: 'course-first-aid',
    title: 'Перша медична допомога',
    description: 'Практичні навички зупинки кровотечі, серцево-легеневої реанімації та надання допомоги при невідкладних станах.',
    category: 'Перша допомога',
    duration: '2 год 30 хв',
    level: 'Базовий',
    format: 'Відео + конспект + інтерактивний тест',
    imageUrl: imgFirstAid,
    progressPercent: 80,
    pointsAwarded: 150,
    isCompleted: false,
    lessons: [
      {
        id: 'l1',
        title: 'Основи першої допомоги та безпека рятувальника',
        duration: '25 хв',
        completed: true,
        type: 'video',
        content: 'Головне правило — власна безпека. Перед наближенням до постраждалого оцініть навколишню обстановку: відсутність вогню, оголених дротів чи загрози обвалу. Одягніть захисні рукавички.'
      },
      {
        id: 'l2',
        title: 'Оцінка стану постраждалого (алгоритм CABCDE)',
        duration: '35 хв',
        completed: true,
        type: 'video',
        content: 'Визначення притомності (голос, дотик до плеча). Перевірка дихання: правило "чую, бачу, відчуваю" протягом 10 секунд. Якщо дихання відсутнє або агональне — негайно викликаємо 112/999.'
      },
      {
        id: 'l3',
        title: 'Серцево-легенева реанімація (СЛР) та дефібрилятор',
        duration: '40 хв',
        completed: true,
        type: 'video',
        content: 'Частота натискань: 100–120 на хвилину на глибину 5–6 см. Співвідношення: 30 натискань до 2 штучних вдихів (за наявності захисної маски). Застосування АЗД (автоматичного зовнішнього дефібрилятора).'
      },
      {
        id: 'l4',
        title: 'Критична кровотеча та накладання турнікета',
        duration: '30 хв',
        completed: false,
        type: 'interactive',
        content: 'Масивна кровотеча загрожує життю за 1–3 хвилини! Алгоритм: прямий тиск на рану, накладання джгута/турнікета на кінцівку на 5–7 см вище місця поранення (не на суглоб!). Фіксація точного часу накладання.'
      },
      {
        id: 'l5',
        title: 'Фінальний тест на знання та отримання сертифіката',
        duration: '20 хв',
        completed: false,
        type: 'test'
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Яка перша і найголовніша дія волонтера при виявленні постраждалого?',
        options: [
          'Оцінити безпеку місця події для себе та оточуючих',
          'Одразу почати непрямий масаж серця',
          'Дати потерпілому склянку води',
          'Перемістити людину в інше місце без огляду'
        ],
        correctAnswer: 0,
        explanation: 'Безпека рятувальника — пріоритет №1. Якщо небезпечно, ви станете другим постраждалим.'
      },
      {
        id: 'q2',
        question: 'Яка правильна частота компресій грудної клітки під час серцево-легеневої реанімації?',
        options: [
          '60–70 компресій на хвилину',
          '100–120 компресій на хвилину',
          '150–180 компресій на хвилину',
          'Довільна, як зручно волонтеру'
        ],
        correctAnswer: 1,
        explanation: 'Рекомендований міжнародний стандарт (ERC/AHA) — 100–120 натискань на хвилину під ритм пісні "Stayin\' Alive".'
      },
      {
        id: 'q3',
        question: 'Де правильно накладати кровоспинний турнікет при масивній кровотечі кінцівки?',
        options: [
          'Безпосередньо на ліктьовий або колінний суглоб',
          'На 5–7 см вище місця поранення або максимально високо на кінцівку (за неможливості чітко локалізувати рану)',
          'Нижче рани для збереження тепла',
          'Турнікет накладається виключно на шию'
        ],
        correctAnswer: 1,
        explanation: 'Турнікет накладається на 5-7 см вище рани (не на суглоб!), або в пах/пахву за екстреної необхідності, з обов\'язковим записом часу.'
      }
    ]
  },
  {
    id: 'course-psych-support',
    title: 'Психологічна перша допомога (PFA)',
    description: 'Як підтримати людину в гострому стресі, правила недискримінаційного спілкування та профілактика втоми від співчуття.',
    category: 'Психологічна підтримка',
    duration: '2 год',
    level: 'Середній',
    format: 'Відео + кейси',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    progressPercent: 100,
    pointsAwarded: 120,
    isCompleted: true,
    lessons: []
  },
  {
    id: 'course-vulnerable',
    title: 'Робота з вразливими категоріями та дітьми',
    description: 'Етичні стандарти Safeguarding, повага до особистих кордонів, підтримка людей похилого віку та осіб з інвалідністю.',
    category: 'Робота з вразливими',
    duration: '1 год 45 хв',
    level: 'Базовий',
    format: 'Лекції + інтерактивний гайд',
    imageUrl: imgChildren,
    progressPercent: 40,
    pointsAwarded: 100,
    isCompleted: false,
    lessons: []
  },
  {
    id: 'course-emergency',
    title: 'Дії під час надзвичайних ситуацій та тривог',
    description: 'Протоколи евакуації, координація з рятувальними службами, зв’язок та взаємодія у кризових штабах.',
    category: 'Надзвичайні ситуації',
    duration: '1 год 30 хв',
    level: 'Базовий',
    format: 'Відео + чеклисти',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    progressPercent: 0,
    pointsAwarded: 110,
    isCompleted: false,
    lessons: []
  },
  {
    id: 'course-eco-safety',
    title: 'Екологічне волонтерство та безпека природи',
    description: 'Сортування відходів, організація локальних толок, відновлення міських лісопарків та поводження з небезпечними відходами.',
    category: 'Екологія',
    duration: '1 год 15 хв',
    level: 'Базовий',
    format: 'Матеріали + тест',
    imageUrl: imgEco,
    progressPercent: 100,
    pointsAwarded: 90,
    isCompleted: true,
    lessons: []
  },
  {
    id: 'course-digital-skills',
    title: 'Digital-інструменти волонтера Thymus',
    description: 'Робота в CRM, захист персональних даних бенефіціарів, безпечна комунікація в месенджерах.',
    category: 'Digital skills',
    duration: '1 год',
    level: 'Базовий',
    format: 'Інтерактивний тренінг',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    progressPercent: 100,
    pointsAwarded: 80,
    isCompleted: true,
    lessons: []
  }
];

export const initialCertificates: Certificate[] = [
  {
    id: 'cert-01',
    courseTitle: 'Психологічна перша допомога (PFA)',
    recipientName: 'Олена Кравченко',
    volunteerId: 'TH-0012545',
    completedDate: '15.08.2024',
    certificateNumber: 'TH-CERT-001245',
    validUntil: 'Безстроково',
    skillsAcquired: ['Кризове консультування', 'Активне слухання', 'Деескалація стресу', 'Safeguarding'],
    instructor: 'Д-р Марта Коваль, керівник психологічного напрямку Thymus'
  },
  {
    id: 'cert-02',
    courseTitle: 'Екологічне волонтерство та безпека природи',
    recipientName: 'Олена Кравченко',
    volunteerId: 'TH-0012545',
    completedDate: '01.09.2024',
    certificateNumber: 'TH-CERT-001892',
    validUntil: '01.09.2027',
    skillsAcquired: ['Організація толок', 'Еко-освіта', 'Безпека праці на природі'],
    instructor: 'Артем Дяченко, координатор Green Thymus'
  },
  {
    id: 'cert-03',
    courseTitle: 'Digital-інструменти волонтера Thymus',
    recipientName: 'Олена Кравченко',
    volunteerId: 'TH-0012545',
    completedDate: '20.07.2024',
    certificateNumber: 'TH-CERT-000981',
    validUntil: 'Безстроково',
    skillsAcquired: ['GDPR комплаєнс', 'Криптозахист каналів', 'Координація у CRM'],
    instructor: 'Ігор Шевчук, Lead IT Thymus Foundation'
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Підтримка дітей у складних життєвих обставинах',
    description: 'Допомога дітям, які опинилися у складних умовах або вимушено переміщені: розвиваючі ігри, арт-терапія, психоемоційне розвантаження та навчальні гуртки.',
    category: 'Люди',
    location: 'Cardiff Community Centre',
    address: 'Queen St 44, Cardiff CF10 2HQ',
    city: 'Cardiff',
    coordinates: { lat: 51.4816, lng: -3.1791 },
    distanceKm: 2.1,
    date: '15 вересня 2024',
    time: '10:00 – 16:00',
    neededVolunteers: 12,
    registeredVolunteers: 8,
    imageUrl: imgChildren,
    isRegistered: true,
    requiredSkills: ['Комунікація', 'Робота з дітьми', 'Емпатія', 'Творчість'],
    coordinator: {
      name: 'Марія Ковальчук',
      role: 'Координатор дитячих програм',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      phone: '+44 7700 900123'
    }
  },
  {
    id: 'proj-2',
    title: 'Медична підтримка та реабілітація',
    description: 'Супровід маломобільних пацієнтів, допомога в госпіталях, фасування медичних аптечок та логістика ліків для потребуючих родин.',
    category: 'Медицина',
    location: 'Swansea Health Outreach',
    address: 'High St 12, Swansea SA1 1LE',
    city: 'Swansea',
    coordinates: { lat: 51.6214, lng: -3.9436 },
    distanceKm: 58.0,
    date: '18 вересня 2024',
    time: '09:00 – 15:00',
    neededVolunteers: 12,
    registeredVolunteers: 5,
    imageUrl: imgFirstAid,
    isRegistered: false,
    requiredSkills: ['Медицина', 'Перша допомога', 'Догляд'],
    coordinator: {
      name: 'Олексій Мороз',
      role: 'Головний лікар мобільного підрозділу',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      phone: '+44 7700 900456'
    }
  },
  {
    id: 'proj-3',
    title: 'Еко-ініціатива: чисте місто та відновлення парків',
    description: 'Велика суботня толока: очищення прибережної зони річки Тафф, сортування пластику та висадка саджанців молодих дубів.',
    category: 'Екологія',
    location: 'Bute Park Green',
    address: 'North Rd, Cardiff CF10 3ER',
    city: 'Cardiff',
    coordinates: { lat: 51.4855, lng: -3.1878 },
    distanceKm: 1.4,
    date: '25 вересня 2024',
    time: '11:00 – 15:00',
    neededVolunteers: 8,
    registeredVolunteers: 3,
    imageUrl: imgEco,
    isRegistered: false,
    requiredSkills: ['Екологія', 'Фізична витривалість', 'Командна робота'],
    coordinator: {
      name: 'Тарас Савченко',
      role: 'Координатор Green Thymus',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      phone: '+44 7700 900789'
    }
  },
  {
    id: 'proj-4',
    title: 'Турбота про хвостиків: допомога притулку',
    description: 'Вигул песиків, прибирання вольєрів, доставка сухого корму та фотографування тварин для пошуку нових люблячих сімей.',
    category: 'Тварини',
    location: 'Cardiff Animal Shelter',
    address: 'Penarth Rd, Cardiff CF11 8TT',
    city: 'Cardiff',
    coordinates: { lat: 51.4642, lng: -3.1952 },
    distanceKm: 3.5,
    date: '28 вересня 2024',
    time: '12:00 – 17:00',
    neededVolunteers: 6,
    registeredVolunteers: 6,
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    isRegistered: false,
    requiredSkills: ['Любов до тварин', 'Фотографія', 'Терпіння'],
    coordinator: {
      name: 'Юлія Мельник',
      role: 'Куратор зоозахисту',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      phone: '+44 7700 900333'
    }
  },
  {
    id: 'proj-5',
    title: 'Теплий четвер: турбота про самотніх літніх людей',
    description: 'Доставка продуктових наборів, затишні бесіди за чаєм, дрібний побутовий ремонт та моральна підтримка літніх підопічних фонду.',
    category: 'Соціальна допомога',
    location: 'Bristol Community Hub',
    address: 'Broadmead 8, Bristol BS1 3HA',
    city: 'Bristol',
    coordinates: { lat: 51.4545, lng: -2.5879 },
    distanceKm: 65.0,
    date: '03 жовтня 2024',
    time: '10:00 – 14:00',
    neededVolunteers: 10,
    registeredVolunteers: 7,
    imageUrl: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=800&q=80',
    isRegistered: false,
    requiredSkills: ['Емпатія', 'Уважність', 'Терпіння', 'Водіння'],
    coordinator: {
      name: 'Ганна Василенко',
      role: 'Керівник соціальної служби',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      phone: '+44 7700 900555'
    }
  }
];

export const initialPeerRequests: PeerHelpRequest[] = [
  {
    id: 'req-1',
    authorName: 'Дмитро Поліщук',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    authorId: 'vol-089',
    title: 'Потрібна допомога з переїздом родини переселенців',
    description: 'Потрібно 2 міцних волонтери з авто або причепом, щоб допомогти перевезти речі та дитяче ліжечко з орендованої квартири в новий шелтер.',
    category: 'Транспорт',
    location: 'Cardiff (Canton -> Roath)',
    dateNeeded: '4 жовтня 2024',
    urgency: 'Терміново',
    helpersCount: 1,
    helpersNeeded: 2,
    status: 'active',
    createdAt: '2 години тому'
  },
  {
    id: 'req-2',
    authorName: 'Катерина Бойко',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    authorId: 'vol-112',
    title: 'Потрібен терміновий переклад медичних документів (🇺🇦 → 🇬🇧)',
    description: 'Мамі хлопчика з вадою серця потрібно перекласти 4 сторінки медичної виписки з лікарні для запису до NHS кардіолога у Великобританії.',
    category: 'Переклад',
    location: 'Дистанційно / Online',
    dateNeeded: '2 жовтня 2024',
    urgency: 'Висока',
    helpersCount: 0,
    helpersNeeded: 1,
    status: 'active',
    createdAt: '5 годин тому'
  },
  {
    id: 'req-3',
    authorName: 'Світлана Дорошенко',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    authorId: 'vol-054',
    title: 'Потрібна дитяча прогулянкова коляска для малюка',
    description: 'Шукаємо справну легку коляску для дитинки 8 місяців. Родина щойно приїхала з Харкова і поки не має базових дитячих речей.',
    category: 'Речі',
    location: 'Swansea Marina',
    dateNeeded: 'Якнайшвидше',
    urgency: 'Звичайна',
    helpersCount: 1,
    helpersNeeded: 1,
    status: 'in_progress',
    createdAt: 'Вчора'
  },
  {
    id: 'req-4',
    authorName: 'Віктор Грицай',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    authorId: 'vol-203',
    title: 'Шукаю волонтера-водія підвезти дідуся до лікарні',
    description: 'Потрібно відвезти 82-річного пана Михайла на плановий огляд в Університетський госпіталь Уельсу і повернути додому.',
    category: 'Транспорт',
    location: 'Cardiff',
    dateNeeded: '6 жовтня, 09:30',
    urgency: 'Звичайна',
    helpersCount: 0,
    helpersNeeded: 1,
    status: 'active',
    createdAt: '1 день тому'
  }
];

export const initialCanHelpOffers: CanHelpOffer[] = [
  {
    id: 'offer-1',
    category: 'Транспорт',
    title: 'Можу підвезти або доставити вантаж на авто',
    availability: '2 рази на тиждень (вівторок та субота)',
    description: 'Легковий універсал з містким багажником у районі Cardiff & Newport. Допоможу з перевезенням коробок або маломобільних людей.',
    enabled: true
  },
  {
    id: 'offer-2',
    category: 'Переклад',
    title: 'Письмовий переклад документів та супровід',
    availability: 'Онлайн вечорами, до 5 сторінок на тиждень',
    description: 'Вільна українська, впевнена англійська (B2). Допоможу розібратися з листами від ради, банку, лікарні або школи.',
    enabled: true
  },
  {
    id: 'offer-3',
    category: 'Психологія',
    title: 'Дружня розмова та перша психологічна підтримка',
    availability: 'За домовленістю у вихідні',
    description: 'Маю сертифікат PFA від Thymus Foundation. Готова вислухати та допомогти знайти внутрішній спокій.',
    enabled: true
  }
];

export const initialChannels: ChatChannel[] = [
  {
    id: 'ch-general',
    name: 'Загальний чат волонтерів',
    type: 'general',
    description: 'Головний простір для знайомств, координації та дружнього спілкування',
    membersCount: 1284,
    lastMessage: 'Вітаємо нових учасників з Кардіффа та Лондона! 💙🧡',
    lastMessageTime: '14:25'
  },
  {
    id: 'ch-project-med',
    name: 'Проєкт: Медична допомога',
    type: 'project',
    description: 'Координація медичних місій, фасування аптечок та логістика',
    membersCount: 96,
    lastMessage: 'Нова партія турнікетів та бинтів прибула до складу.',
    lastMessageTime: '13:40'
  },
  {
    id: 'ch-cardiff',
    name: 'Cardiff Volunteers Team',
    type: 'region',
    description: 'Місцева група волонтерів Кардіффа та Південного Уельсу',
    membersCount: 256,
    lastMessage: 'Збираємось біля Queen St у суботу о 10:00!',
    lastMessageTime: '12:20'
  },
  {
    id: 'ch-psych',
    name: 'Психологічна підтримка & Wellbeing',
    type: 'topic',
    description: 'Простір турботи про психоемоційний стан та супервізійні зустрічі',
    membersCount: 110,
    lastMessage: 'Нагадуємо про вечірню релакс-сесію о 19:30 у Zoom.',
    lastMessageTime: '11:00'
  },
  {
    id: 'ch-eco',
    name: 'Еко-команда Green Thymus',
    type: 'topic',
    description: 'Екологічні ініціативи, прибирання узбереж та зелений рух',
    membersCount: 72,
    lastMessage: 'Всі рукавички та мішки вже закуплені для толоки.',
    lastMessageTime: 'Вчора'
  },
  {
    id: 'ch-edu',
    name: 'Освітні проєкти & Менторство',
    type: 'topic',
    description: 'Підтримка учнів, гуртки програмування та мовні клуби',
    membersCount: 143,
    lastMessage: 'Хто готовий провести урок малювання цієї неділі?',
    lastMessageTime: 'Вчора'
  }
];

export const initialMessages: Record<string, ChatMessage[]> = {
  'ch-general': [
    {
      id: 'm1',
      channelId: 'ch-general',
      senderName: 'Олена Кравченко',
      senderAvatar: avatarOlena,
      senderId: 'vol-001',
      senderRole: 'Срібний волонтер',
      content: 'Привіт усім! Щойно закінчила модуль з Першої допомоги в нашому Hub — неймовірно корисні тести та алгоритми дій! 🚑👏',
      timestamp: '14:10',
      reactions: [
        { emoji: '❤️', count: 7, users: ['vol-002', 'vol-003'] },
        { emoji: '🔥', count: 4, users: ['vol-004'] }
      ]
    },
    {
      id: 'm2',
      channelId: 'ch-general',
      senderName: 'Максим Руденко',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      senderId: 'vol-005',
      senderRole: 'Координатор спільноти',
      isCoordinator: true,
      content: 'Олено, вітаємо з завершенням! Наступний крок — практика на вихідних у Кардіффі. Дякуємо за твою невтомну енергію! 💙🧡',
      timestamp: '14:18',
      reactions: [
        { emoji: '🙌', count: 5, users: ['vol-001', 'vol-006'] }
      ]
    },
    {
      id: 'm3',
      channelId: 'ch-general',
      senderName: 'Анна Ткаченко',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      senderId: 'vol-008',
      senderRole: 'Бронзовий волонтер',
      content: 'Підкажіть, будь ласка, чи можна приєднатися до суботньої дитячої арт-терапії, якщо я ще не здала другий модуль?',
      timestamp: '14:22',
      reactions: []
    },
    {
      id: 'm4',
      channelId: 'ch-general',
      senderName: 'Максим Руденко',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      senderId: 'vol-005',
      senderRole: 'Координатор спільноти',
      isCoordinator: true,
      content: 'Так, звичайно! Головне зареєструватися у розділі "Проєкти", а досвідчені наставники обов\'язково будуть поруч. Вітаємо нових учасників з Кардіффа та Лондона! 💙🧡',
      timestamp: '14:25',
      reactions: [
        { emoji: '🎉', count: 9, users: ['vol-001', 'vol-008'] }
      ]
    }
  ]
};

export const initialAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Практичний воркшоп з першої домедичної допомоги в Кардіффі',
    summary: 'Відпрацювання реанімації на манекенах, накладання джгутів CAT та зупинка кровотеч з сертифікованими інструкторами.',
    content: 'Дорогі волонтери! У суботу, 21 вересня о 10:00 у центральному офісі The Thymus Foundation відбудеться очний 4-годинний інтенсив. Усі учасники отримають офіційний бейдж рятувальника та додаткові +200 балів у систему визнання.',
    publishedAt: 'Сьогодні, 09:00',
    author: 'Максим Руденко',
    authorRole: 'Координатор навчальних програм',
    category: 'Навчання',
    actionText: 'Зареєструватися на тренінг',
    registeredUsers: 18,
    isUserRegistered: true
  },
  {
    id: 'ann-2',
    title: 'Щотижневий розіграш спільноти Happy Thursday!',
    summary: 'Внутрішня подяка найактивнішим учасникам: набори волонтера, термочашки, брендовані світшоти та книги.',
    content: 'Нагадуємо, що кожен відпрацьований проект або завершений навчальний курс дає вам квитки на щотижневу лотерею визнання. Наступний розіграш відбудеться вже цього четверга о 18:00.',
    publishedAt: 'Вчора, 16:30',
    author: 'The Thymus Team',
    authorRole: 'Офіс фонду',
    category: 'Фонд',
    actionText: 'Переглянути мої квитки'
  },
  {
    id: 'ann-3',
    title: 'Групова супервізія для волонтерів: боротьба з вигоранням',
    summary: 'Безпечний конфіденційний простір для обговорення складних емоційних ситуацій разом з ліцензованим психологом.',
    content: 'Волонтерство вимагає багато серця. Щоб не втратити себе, запрошуємо на щомісячну зустріч відновлення ресурсу. Середа, 25 вересня, 19:00 у Zoom.',
    publishedAt: '2 дні тому',
    author: 'Д-р Марта Коваль',
    authorRole: 'Керівник психологічної служби',
    category: 'Захід',
    actionText: 'Записатися на супервізію',
    registeredUsers: 14,
    isUserRegistered: false
  }
];

export const initialExpenses: ExpenseClaim[] = [
  {
    id: 'exp-1',
    category: 'Паливо',
    amount: 24.50,
    currency: 'GBP',
    date: '22.09.2024',
    description: 'Паливо для перевезення гуманітарного вантажу з Ньюпорта до Кардіффа (65 км)',
    receiptName: 'shell_receipt_cardiff_2209.pdf',
    status: 'На розгляді'
  },
  {
    id: 'exp-2',
    category: 'Транспорт',
    amount: 12.00,
    currency: 'GBP',
    date: '15.09.2024',
    description: 'Квитки на поїзд Swansea - Cardiff на дитячу волонтерську зміну',
    receiptName: 'transport_wales_ticket_1509.png',
    status: 'Погоджено',
    reviewedAt: '16.09.2024'
  },
  {
    id: 'exp-3',
    category: 'Квиток',
    amount: 18.00,
    currency: 'GBP',
    date: '10.09.2024',
    description: 'Вхідні квитки до інтерактивного музею науки для двох підопічних діток',
    receiptName: 'techniquest_cardiff_tickets.pdf',
    status: 'Погоджено',
    reviewedAt: '11.09.2024'
  },
  {
    id: 'exp-4',
    category: 'Обладнання',
    amount: 45.00,
    currency: 'GBP',
    date: '05.09.2024',
    description: 'Захисні робочі рукавички та граблі для паркової еко-толоки',
    receiptName: 'diy_store_bute_park.pdf',
    status: 'Відхилено',
    reviewedAt: '06.09.2024'
  }
];

export const initialRewards: RewardItem[] = [
  {
    id: 'rew-1',
    title: 'Фірмовий худі волонтера Thymus (Navy Blue)',
    pointsCost: 1500,
    category: 'Мерч',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
    description: 'Теплий преміальний худі зі 100% органічної бавовни з вишитим серцем Thymus.',
    inStock: true
  },
  {
    id: 'rew-2',
    title: 'Тактична індивідуальна волонтерська аптечка IFAK',
    pointsCost: 2000,
    category: 'Обладнання',
    imageUrl: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=400&q=80',
    description: 'Повний комплект: турнікет CAT, ізраїльський бандаж, атравматичні ножиці та гемостатик.',
    inStock: true
  },
  {
    id: 'rew-3',
    title: 'Еко-термопляшка з подвійними стінками 750ml',
    pointsCost: 800,
    category: 'Мерч',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80',
    description: 'Зберігає тепло 12 годин або холод 24 години на польових чергуваннях.',
    inStock: true
  },
  {
    id: 'rew-4',
    title: 'Квиток на щорічний саміт волонтерів The Thymus London 2024',
    pointsCost: 3000,
    category: 'Заходи',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80',
    description: 'Повний доступ до лекцій міжнародних спікерів, нетворкінгу та святкового гала-вечора.',
    inStock: true
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Новий проєкт поруч з вами!',
    message: 'У районі Bute Park додано еко-акцію "Чисте місто" (1.4 км від вас).',
    timestamp: '15 хв тому',
    isRead: false,
    type: 'project'
  },
  {
    id: 'notif-2',
    title: 'Ви отримали +150 балів ⭐',
    message: 'Успішно зараховано бали за проходження практичного тесту з першої допомоги.',
    timestamp: '1 год тому',
    isRead: false,
    type: 'points'
  },
  {
    id: 'notif-3',
    title: 'Ваші витрати погоджено 🟢',
    message: 'Компенсацію квитків Swansea - Cardiff (£12.00) затверджено фінвідділом.',
    timestamp: '3 год тому',
    isRead: true,
    type: 'expense'
  },
  {
    id: 'notif-4',
    title: 'Наближається Happy Thursday 🎉',
    message: 'У вас є 4 активних квитки для участі у розіграші цього четверга.',
    timestamp: 'Вчора',
    isRead: true,
    type: 'draw'
  }
];
