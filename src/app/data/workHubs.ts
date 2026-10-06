export type HubId = 'egypt' | 'saudi' | 'turkey' | 'usa';

export interface WorkHub {
  id: HubId;
  countryEn: string;
  flag: string;
  companyEn: string;
  roleEn: string;
  workTypeEn: string;
  locationEn: string;
  coords: [number, number]; // [lat, lon]
  targetPhi: number; // Optimal phi rotation to center on globe
  highlightsEn: string[];
  techStack: string[];
  accentColor: string;
}

export const WORK_HUBS: Record<HubId, WorkHub> = {
  egypt: {
    id: 'egypt',
    countryEn: 'Egypt',
    flag: '🇪🇬',
    companyEn: 'Core Base & Remote Training',
    roleEn: 'Full Stack Software Engineer',
    workTypeEn: 'Primary Base & Remote Work',
    locationEn: 'Cairo / Tanta, Egypt',
    coords: [30.0444, 31.2357],
    targetPhi: 4.17, // Centered on Egypt
    highlightsEn: [
      'Primary headquarters for full-stack software architecture and production engineering.',
      'Completed intensive technical training and hands-on remote engineering internships with global tech firms.',
      'Architected resilient backend systems, database infrastructures, and responsive frontend applications.',
    ],
    techStack: ['C#', 'ASP.NET Core', 'React', 'TypeScript', 'SQL Server', 'REST APIs', 'Cloud Native'],
    accentColor: '#10b981', // Emerald
  },
  saudi: {
    id: 'saudi',
    countryEn: 'Saudi Arabia',
    flag: '🇸🇦',
    companyEn: 'Freelance Systems & Enterprise Platforms',
    roleEn: 'Full-Stack & Systems Freelancer',
    workTypeEn: 'Freelance & Contract Projects',
    locationEn: 'Riyadh / Remote, Saudi Arabia',
    coords: [24.7136, 46.6753],
    targetPhi: 3.92, // Centered on Saudi Arabia & Gulf
    highlightsEn: [
      'Delivered multiple high-impact freelance engineering projects for Saudi clients and digital businesses.',
      'Architected custom e-commerce web applications, booking systems, and administrative control panels.',
      'Engineered secure payment integrations (Mada, Apple Pay, HyperPay) with optimized checkout pipelines.',
      'Designed scalable RESTful APIs, tuned database queries, and implemented ZATCA compliant e-invoicing workflows.',
    ],
    techStack: ['React', 'Next.js', 'C# / ASP.NET Core', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Payment APIs'],
    accentColor: '#10b981', // Saudi Emerald Green
  },
  turkey: {
    id: 'turkey',
    countryEn: 'Turkey',
    flag: '🇹🇷',
    companyEn: 'Luxira Holding',
    roleEn: 'Software Engineer',
    workTypeEn: 'Remote / Hybrid Engineering',
    locationEn: 'Istanbul, Turkey',
    coords: [41.0082, 28.9784],
    targetPhi: 4.21, // Centered on Turkey
    highlightsEn: [
      'Worked as a Software Engineer with Luxira Holding in Turkey.',
      'Engineered enterprise web platforms, digital service portals, and business operations workflows.',
      'Integrated resilient APIs, tuned database queries, and enhanced application response times.',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', '.NET / Node.js', 'Tailwind CSS', 'Enterprise APIs'],
    accentColor: '#38bdf8', // Sky Blue
  },
  usa: {
    id: 'usa',
    countryEn: 'United States',
    flag: '🇺🇸',
    companyEn: 'Star+Games',
    roleEn: 'Part-Time Software Engineer',
    workTypeEn: 'Part-Time Remote Contract',
    locationEn: 'United States',
    coords: [40.7128, -74.006],
    targetPhi: 6.0, // Centered on USA
    highlightsEn: [
      'Contributed as a Part-Time Software Engineer with Star+Games (USA).',
      'Engineered backend microservices, real-time communication protocols, and game platform data pipelines.',
      'Optimized high-concurrency throughput, connection resilience, and server performance under peak loads.',
    ],
    techStack: ['Real-Time APIs', 'WebSockets / SignalR', 'Distributed Systems', 'C# / .NET', 'Redis', 'Cloud'],
    accentColor: '#a855f7', // Purple
  },
};
