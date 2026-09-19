import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Satellite } from 'lucide-react';
import { Button } from './ui/button';

const projects = [
  {
    title: 'Project Task Management',
    description:
      'A Laravel workspace for managing projects, tasks, members, assignments, status tracking, and team workflows.',
    tech: ['Laravel', 'Blade', 'PHP', 'MySQL'],
    orbit: 'Productivity',
    githubUrl: 'https://github.com/superiorshipet/project-task-managment',
    demoUrl: 'https://awarded-guy-cake-treasury.trycloudflare.com/login',
    
  },
  {
    title: 'ATS Website',
    description:
      'A hiring and applicant tracking platform with a modern frontend, backend API, database flows, and tracking integrations.',
    tech: ['TypeScript', 'React', 'PHP', 'PostgreSQL'],
    orbit: 'Hiring platform',
    githubUrl: 'https://github.com/superiorshipet/ATS-website',
    demoUrl: 'https://ats-website-flax.vercel.app',
  },
  {
    title: 'Luxira CRM New',
    description:
      'A CRM rebuild focused on .NET backend reliability, route parity, schema migration, and production-ready business workflows.',
    tech: ['C#', 'ASP.NET Core', 'SQL Server', 'OpenAPI'],
    orbit: 'CRM system',
    githubUrl: 'https://github.com/superiorshipet/luxira-crm-new',
  },
  {
    title: 'Stunning.io Task',
    description:
      'Full-stack task implementation with a .NET service layer and deployed client experience.',
    tech: ['C#', 'ASP.NET Core', 'React', 'Railway'],
    orbit: 'Full-stack task',
    githubUrl: 'https://github.com/superiorshipet/stunning.io-task',
    demoUrl: 'https://client-pi-ten-32.vercel.app',
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
    demoUrl: 'https://discover-madina.vercel.app',
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="relative overflow-hidden py-24">
      <div className="absolute left-1/2 top-12 h-px w-[74vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--space-starlight)]/20 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] px-4 py-2 text-sm text-[var(--space-moon)] backdrop-blur">
              <Satellite className="h-4 w-4 text-[var(--space-cyan)]" />
              Selected launches
            </div>
            <h2 className="font-display max-w-2xl text-5xl font-bold leading-[0.96] tracking-tight text-[var(--space-starlight)] md:text-7xl">
              Project constellation
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[var(--space-moon)]">
            A focused collection of applications, platforms, and backend-heavy products. Each module shows a different orbit: commerce, tourism, healthcare, learning, media, and operations.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ y: -12, rotateX: 3, rotateY: index % 2 === 0 ? -3 : 3 }}
              className="group relative"
            >
              <div className="portfolio-depth-card space-glass relative flex h-full min-h-[25rem] flex-col overflow-hidden rounded-lg p-6 transition-colors duration-300 group-hover:border-[var(--space-cyan)]/45">
                <motion.div
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-[var(--space-border)]"
                  animate={{ rotate: hoveredIndex === index ? 35 : 0 }}
                  transition={{ duration: 0.45 }}
                />
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--space-cyan)]">
                    {project.orbit}
                  </span>
                  <span className="font-display text-sm text-[var(--space-muted)]/60">{String(index + 1).padStart(2, '0')}</span>
                </div>

                <h3 className="font-display mb-4 text-3xl font-bold leading-tight text-[var(--space-starlight)]">{project.title}</h3>
                <p className="mb-6 line-clamp-4 text-base leading-7 text-[var(--space-moon)]">{project.description}</p>

                <div className="mb-8 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--space-starlight)]/82"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex gap-3">
                  {project.githubUrl && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="h-auto flex-1 rounded-full border-[var(--space-border)] bg-transparent py-3 text-sm text-[var(--space-starlight)] hover:bg-[var(--space-panel)]"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button
                      asChild
                      size="sm"
                      className="h-auto flex-1 rounded-full bg-[var(--space-button)] py-3 text-sm font-semibold text-[var(--space-button-text)] hover:bg-[var(--space-cyan)] hover:text-[var(--space-void)]"
                    >
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(100,244,255,0.16),transparent_48%)]"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
