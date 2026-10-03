import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';

const projects = [
  {
    title: 'Project Task Management',
    description:
      'A Laravel workspace for managing projects, tasks, members, assignments, status tracking, and team workflows.',
    tech: ['Laravel', 'Blade', 'PHP', 'MySQL'],
    orbit: 'Productivity',
    githubUrl: 'https://github.com/superiorshipet/project-task-managment',
    demoUrl: 'https://tasharuky.duckdns.org/login',
    
  },
  {
    title: 'ATS Website',
    description:
      'A hiring and applicant tracking platform with a modern frontend, backend API, database flows, and tracking integrations.',
    tech: ['TypeScript', 'React', 'PHP', 'PostgreSQL'],
    orbit: 'Hiring platform',
    githubUrl: 'https://github.com/superiorshipet/ATS-website',
    demoUrl: 'https://the-ats-pro.duckdns.org/ats/',
  },
  {
    title: 'Stunning.io Task',
    description:
      'Full-stack task implementation with a .NET service layer and deployed client experience.',
    tech: ['C#', 'ASP.NET Core', 'React', 'Railway'],
    orbit: 'Full-stack task',
    githubUrl: 'https://github.com/superiorshipet/stunning.io-task',
    demoUrl: 'https://tasharuky.duckdns.org/stunning.io-task/',
  },
  {
    title: 'Luxira Chat',
    description:
      'Separate backend and frontend repositories for a chat experience connected to the Luxira ecosystem.',
    tech: ['C#', 'HTML', 'SignalR', 'API'],
    orbit: 'Realtime chat',
    githubUrl: 'https://github.com/superiorshipet/luxira-chatting-backend',
  },
  {
    title: 'Loxx King',
    description:
      'A TypeScript web application paired with a C# backend for a modern hosted product experience.',
    tech: ['TypeScript', 'C#', 'React', 'API'],
    orbit: 'Product app',
    githubUrl: 'https://github.com/superiorshipet/loxx-king',
    demoUrl: 'https://loxx-king.vercel.app',
  },
  {
    title: 'Discover Madina',
    description:
      'A tourism guide for Madina with attraction discovery, visitor planning, backend services, and a deployed web client.',
    tech: ['C#', 'React', 'PostgreSQL', 'WebSocket'],
    orbit: 'City guide',
    githubUrl: 'https://github.com/superiorshipet/discover-madina',
    demoUrl: 'https://discover-madina.duckdns.org/',
  },
  {
    title: 'Distributed Database Project',
    description:
      'Go project exploring distributed database behavior, concurrency, and system-level data management concepts.',
    tech: ['Go', 'Concurrency', 'Databases', 'Systems'],
    orbit: 'Systems',
    githubUrl: 'https://github.com/superiorshipet/distribution-database-project-for-eng-farosa',
  },
  {
    title: 'E-commerce for E-products',
    description:
      'A digital product marketplace with product browsing, purchase flow, and a deployed TypeScript frontend.',
    tech: ['TypeScript', 'React', 'E-commerce', 'Payments'],
    orbit: 'Digital goods',
    githubUrl: 'https://github.com/superiorshipet/E-commerce-for-E-products',
    demoUrl: 'https://e-commerce-for-e-products.vercel.app',
  },
  {
    title: 'SUPVEND',
    description:
      'A vending and commerce system for product management, purchasing flows, and practical marketplace operations.',
    tech: ['JavaScript', 'Node.js', 'PostgreSQL', 'Commerce'],
    orbit: 'Commerce hub',
    githubUrl: 'https://github.com/superiorshipet/SUPVEND',
    demoUrl: 'https://supvend.duckdns.org/supvend-ui/',
  },
  {
    title: 'Telegram Training Bot',                                           
    description:
      'A Python Telegram bot project for training flows, automation, and message-based user interaction.',
    tech: ['Python', 'Telegram', 'Bot', 'Automation'],
    orbit: 'Training bot',
    githubUrl: 'https://github.com/superiorshipet/telegram_training_bot',
  },
  {
    title: 'Pharmacy Management',
    description:
      'A pharmacy operations system for inventory control, sales tracking, customer records, and management workflows.',
    tech: ['C#', 'ASP.NET Core', 'SQL Server', 'Entity Framework'],
    orbit: 'Operations',
    githubUrl: 'https://github.com/superiorshipet/pharmacy',
    demoUrl: 'https://tasharuky.duckdns.org/pharmacy/'
  },
  {
    title: 'Study Mate',
    description:
      'A study platform with interactive learning flows, progress tracking, and collaboration features for students.',
    tech: ['TypeScript', 'React', 'ASP.NET', 'PostgreSQL'],
    orbit: 'Learning orbit',
    githubUrl: 'https://github.com/superiorshipet/study-mate',
    demoUrl: 'https://study-mate-blush.vercel.app',
  },
  {
    title: 'Podcasty',
    description:
      'A podcast platform for creating, sharing, and listening to shows with backend-driven media workflows.',
    tech: ['C#', 'ASP.NET', 'SQL Server', 'WebSocket'],
    orbit: 'Audio network',
    githubUrl: 'https://github.com/superiorshipet/podcasty',
    demoUrl: 'https://tasharuky.duckdns.org/podcasty-ui/'
  },
  {
    title: 'Belvie',
    description:
      'A furniture e-commerce platform with a polished storefront, product browsing, authentication, admin flows, and a connected backend API.',
    tech: ['React', 'ASP.NET Core', 'PostgreSQL', 'E-commerce'],
    orbit: 'Furniture store',
    demoUrl: 'https://belvie-arc.duckdns.org/belvie/',
  },
  {
    title: 'Arabic Perfume Shop',
    description:
      'An Arabic perfume e-commerce experience with product discovery, storefront pages, authentication, and backend-powered shop data.',
    tech: ['React', 'ASP.NET Core', 'PostgreSQL', 'Commerce'],
    orbit: 'Perfume shop',
    demoUrl: 'https://arabic-perfume.duckdns.org/arabic-perfume/',
  },
  {
    title: 'Data Mining Cancer Prediction',
    description:
      'A notebook-based machine learning project for cancer prediction and data mining experiments.',
    tech: ['Jupyter Notebook', 'Python', 'Data Mining', 'ML'],
    orbit: 'Machine learning',
    githubUrl: 'https://github.com/superiorshipet/data-mining-cancer-prediction-project',
  },
];

export function Projects() {
  const featuredProjects = projects.slice(0, 6);
  const archiveProjects = projects.slice(6);
  const artworkStyles = [
    'from-[#101010] via-[#23464c] to-[#8cc4c3]',
    'from-[#171717] via-[#493f66] to-[#b3a7db]',
    'from-[#16120f] via-[#895435] to-[#e5b483]',
    'from-[#101418] via-[#2f526f] to-[#8fc8dd]',
    'from-[#17130d] via-[#6a582b] to-[#dcc779]',
    'from-[#171717] via-[#3f5944] to-[#a5c8aa]',
  ];

  return (
    <section id="projects" className="relative border-b border-[var(--space-border)] py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
        >
          <div>
            <span className="section-kicker">02 / Selected work</span>
            <h2 className="mt-5 font-display max-w-2xl text-5xl font-semibold leading-[0.9] text-[var(--space-starlight)] md:text-8xl">
              Systems with a purpose.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[var(--space-moon)]">
            Applications, platforms, and backend-heavy products across operations, hiring, commerce, tourism, healthcare, learning, and real-time communication.
          </p>
        </motion.div>

        <div className="space-y-6">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative lg:sticky"
              style={{ top: `${104 + index * 10}px` }}
            >
              <div className="editorial-surface grid min-h-[34rem] overflow-hidden rounded-[2.4rem] bg-[var(--space-panel-strong)] lg:grid-cols-[0.9fr_1.1fr]">
                <div className="flex flex-col p-7 md:p-10">
                  <div className="mb-14 flex items-center justify-between gap-4">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--space-muted)]">{project.orbit}</span>
                    <span className="font-mono text-xs text-[var(--space-muted)]">{String(index + 1).padStart(2, '0')} / 06</span>
                  </div>
                  <h3 className="mb-5 font-display text-4xl font-semibold leading-[0.95] text-[var(--space-starlight)] md:text-6xl">{project.title}</h3>
                  <p className="mb-7 max-w-xl text-base leading-7 text-[var(--space-moon)]">{project.description}</p>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="rounded-full border border-[var(--space-border)] px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-wide text-[var(--space-moon)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-3">
                    {project.githubUrl && (
                      <Button asChild variant="outline" size="sm" className="h-auto rounded-full border-[var(--space-border)] bg-transparent px-5 py-3 text-sm text-[var(--space-starlight)] hover:bg-[var(--space-midnight)]">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" />GitHub</a>
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button asChild size="sm" className="h-auto rounded-full bg-[var(--space-button)] px-5 py-3 text-sm text-[var(--space-button-text)] hover:bg-[var(--space-cyan)] hover:text-white">
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live project<ArrowUpRight className="ml-2 h-4 w-4" /></a>
                      </Button>
                    )}
                  </div>
                </div>
                <div className={`relative min-h-[22rem] overflow-hidden bg-gradient-to-br ${artworkStyles[index]}`}>
                  <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:52px_52px]" />
                  <motion.div whileHover={{ rotate: 4, scale: 1.04 }} className="absolute inset-[14%] flex flex-col justify-between rounded-[2rem] border border-white/20 bg-black/35 p-7 text-white shadow-2xl backdrop-blur-md">
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/65">Case study / {String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="mb-3 font-display text-4xl font-semibold leading-none md:text-6xl">{project.title.split(' ')[0]}</p>
                      <p className="max-w-sm text-sm leading-6 text-white/70">Architecture · Interface · Delivery</p>
                    </div>
                    <ExternalLink className="h-5 w-5 text-white/70" />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-28">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="section-kicker">Complete archive</span>
              <h3 className="mt-4 font-display text-4xl font-semibold text-[var(--space-starlight)] md:text-6xl">More shipped work.</h3>
            </div>
            <span className="font-mono text-xs text-[var(--space-muted)]">{archiveProjects.length} projects</span>
          </div>
          <div className="border-t border-[var(--space-border)]">
            {archiveProjects.map((project, index) => (
              <motion.article key={project.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group grid gap-5 border-b border-[var(--space-border)] py-7 md:grid-cols-[4rem_1.2fr_1fr_auto] md:items-center">
                <span className="font-mono text-xs text-[var(--space-muted)]">{String(index + 7).padStart(2, '0')}</span>
                <div>
                  <h4 className="font-display text-2xl font-semibold text-[var(--space-starlight)] md:text-3xl">{project.title}</h4>
                  <p className="mt-1 text-sm text-[var(--space-muted)]">{project.orbit}</p>
                </div>
                <p className="text-sm leading-6 text-[var(--space-moon)]">{project.tech.join(' · ')}</p>
                <div className="flex gap-2">
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--space-border)] text-[var(--space-starlight)] transition hover:bg-[var(--space-button)] hover:text-[var(--space-button-text)]"><Github className="h-4 w-4" /></a>}
                  {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--space-border)] text-[var(--space-starlight)] transition hover:bg-[var(--space-button)] hover:text-[var(--space-button-text)]"><ArrowUpRight className="h-4 w-4" /></a>}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
