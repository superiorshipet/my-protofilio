export interface WorkHub {
  id: 'egypt' | 'turkey' | 'usa';
  countryAr: string;
  countryEn: string;
  flag: string;
  companyAr: string;
  companyEn: string;
  roleAr: string;
  roleEn: string;
  workTypeAr: string;
  workTypeEn: string;
  locationAr: string;
  locationEn: string;
  coords: [number, number]; // [lat, lon]
  targetPhi: number; // Optimal phi rotation to center on globe
  highlightsAr: string[];
  highlightsEn: string[];
  techStack: string[];
  accentColor: string;
}

export const WORK_HUBS: Record<'egypt' | 'turkey' | 'usa', WorkHub> = {
  egypt: {
    id: 'egypt',
    countryAr: 'مصر',
    countryEn: 'Egypt',
    flag: '🇪🇬',
    companyAr: 'المقر الأساسي & تدريب شركات ريموت',
    companyEn: 'Core Base & Remote Training',
    roleAr: 'مهندس برمجيات متكامل (Full Stack Engineer)',
    roleEn: 'Full Stack Software Engineer',
    workTypeAr: 'مقر أساسي + تدريب وعمل عن بُعد',
    workTypeEn: 'Primary Base & Remote Work',
    locationAr: 'القاهرة / طنطا، مصر',
    locationEn: 'Cairo / Tanta, Egypt',
    coords: [30.0444, 31.2357],
    targetPhi: 4.17, // Centered on Egypt
    highlightsAr: [
      'المقر الأساسي لإدارة وتطوير المشاريع والمنظومات البرمجية المتكاملة.',
      'تلقيت تدريباً تقنياً مكثفاً وخبرات عملية تطبيقية مع شركات ريموت (عن بُعد) متخصصة في الأنظمة السحابية.',
      'تصميم وبناء بنية برمجية متينة تشمل الـ Backend وقواعد البيانات والواجهات التفاعلية الحديثة.',
    ],
    highlightsEn: [
      'Primary headquarters for full-stack software architecture and production engineering.',
      'Completed intensive technical training and hands-on remote engineering internships with global tech firms.',
      'Architected resilient backend systems, database infrastructures, and responsive frontend applications.',
    ],
    techStack: ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'SQL Server', 'REST APIs', 'Cloud Native'],
    accentColor: '#10b981', // Emerald
  },
  turkey: {
    id: 'turkey',
    countryAr: 'تركيا',
    countryEn: 'Turkey',
    flag: '🇹🇷',
    companyAr: 'شركة لوكسيرا (Luxera)',
    companyEn: 'Luxera Group',
    roleAr: 'مهندس برمجيات (Software Engineer)',
    roleEn: 'Software Engineer',
    workTypeAr: 'عن بُعد / هجين (Remote / Hybrid)',
    workTypeEn: 'Remote / Hybrid Engineering',
    locationAr: 'إسطنبول، تركيا',
    locationEn: 'Istanbul, Turkey',
    coords: [41.0082, 28.9784],
    targetPhi: 4.21, // Centered on Turkey
    highlightsAr: [
      'العمل كمهندس برمجيات في شركة لوكسيرا (Luxera) في تركيا.',
      'المساهمة في بناء وتطوير منصات الويب الرقمية وأنظمة إدارة الأعمال والخدمات المؤسسية.',
      'ربط وتطوير الواجهات البرمجية (APIs) وتحسين أداء قواعد البيانات لضمان كفاءة العمليات وسرعة الاستجابة.',
    ],
    highlightsEn: [
      'Worked as a Software Engineer with Luxera Group in Turkey.',
      'Engineered enterprise web platforms, digital service portals, and business operations workflows.',
      'Integrated resilient APIs, tuned database queries, and enhanced application response times.',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', '.NET / Node.js', 'Tailwind CSS', 'Enterprise APIs'],
    accentColor: '#38bdf8', // Sky Blue
  },
  usa: {
    id: 'usa',
    countryAr: 'الولايات المتحدة الأمريكية',
    countryEn: 'United States',
    flag: '🇺🇸',
    companyAr: 'ستار جيمز (Star Games)',
    companyEn: 'Star Games',
    roleAr: 'مهندس برمجيات دوام جزئي (Part-Time Software Engineer)',
    roleEn: 'Part-Time Software Engineer',
    workTypeAr: 'دوام جزئي عن بُعد (Part-Time Remote)',
    workTypeEn: 'Part-Time Remote Contract',
    locationAr: 'الولايات المتحدة الأمريكية',
    locationEn: 'United States',
    coords: [40.7128, -74.006],
    targetPhi: 6.0, // Centered on USA
    highlightsAr: [
      'العمل كمهندس برمجيات بنظام دوام جزئي (Part-Time) في شركة ستار جيمز (Star Games).',
      'بناء وتطوير خدمات الباك إند وأنظمة معالجة البيانات والاتصال في الوقت الفعلي (Real-Time Communication).',
      'تحسين كفاءة التزامن العالي (High Concurrency) واستقرار الخوادم تحت الضغط وأحمال المستخدمين.',
    ],
    highlightsEn: [
      'Contributed as a Part-Time Software Engineer with Star Games (USA).',
      'Engineered backend microservices, real-time communication protocols, and game platform data pipelines.',
      'Optimized high-concurrency throughput, connection resilience, and server performance under peak loads.',
    ],
    techStack: ['Real-Time APIs', 'WebSockets / SignalR', 'Distributed Systems', 'C# / .NET', 'Redis', 'Cloud'],
    accentColor: '#a855f7', // Purple
  },
};
