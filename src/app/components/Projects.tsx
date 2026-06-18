import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Satellite } from 'lucide-react';
import { Button } from './ui/button';

const projects = [
  {
    title: 'ATS Job Portal',
    description:
      'A job platform connecting talented developers with opportunities through real-time features and structured hiring flows.',
    tech: ['React', 'PHP', 'PostgreSQL', 'WebSocket'],
    orbit: 'Talent network',
    githubUrl: 'https://github.com/superiorshipet/ATS-website',
  },
  {
    title: 'SUPVEND',
    description:
      'An e-commerce system with inventory management, checkout, payment integration, Redis caching, and wallet support.',
    tech: ['Node.js', 'PostgreSQL', 'React', 'Stripe', 'Redis'],
    orbit: 'Commerce hub',
    githubUrl: 'https://github.com/superiorshipet/SUPVEND',
  },
  {
    title: 'Discover Madina',
    description:
      'A tourism guide for El Madina with smart visitor assistance, map-inspired exploration, and location-focused features.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
    orbit: 'City guide',
    githubUrl: 'https://github.com/superiorshipet/discover-madina',
    demoUrl: 'https://discover-madina-production.up.railway.app/',
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
    title: 'Discover',
    description:
      'A Saudi Arabia tourism platform with ticket integrations, attraction comments, and vacation planning tools.',
    tech: ['React', 'ASP.NET', 'PostgreSQL', 'WebSocket', 'Redis'],
    orbit: 'Travel planner',
    githubUrl: 'https://github.com/superiorshipet/----------------------',
    demoUrl: 'https://madinaguide.vercel.app',
  },
  {
    title: 'Nour Dental',
    description:
      'A dental clinic storefront for equipment sales, backed by ASP.NET services, PostgreSQL, Redis, and hosted delivery.',
    tech: ['C#', 'ASP.NET Core', 'PostgreSQL', 'Entity Framework', 'Redis'],
    orbit: 'Clinic commerce',
    demoUrl: 'https://www.elnordental.shop',
  },
  {
    title: 'Podcasty',
    description:
      'A podcast platform for creating, sharing, and listening to shows with real-time interaction features.',
    tech: ['React', 'ASP.NET', 'SQL Server', 'WebSocket'],
    orbit: 'Audio network',
    githubUrl: 'https://github.com/superiorshipet/podcasty',
  },
  {
    title: 'E-commerce for E-products',
    description:
      'A digital product marketplace with secure payments, product management, and a clear purchase flow.',
    tech: ['React', 'ASP.NET', 'PostgreSQL'],
    orbit: 'Digital goods',
    githubUrl: 'https://github.com/superiorshipet/E-commerce-for-E-products',
  },
  {
    title: 'Study Mate',
    description:
      'A study platform with interactive lessons, quizzes, progress tracking, and collaboration features for students.',
    tech: ['React', 'ASP.NET', 'PostgreSQL', 'WebSocket'],
    orbit: 'Learning orbit',
    githubUrl: 'https://github.com/superiorshipet/study-mate',
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
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="space-glass relative flex h-full min-h-[25rem] flex-col overflow-hidden rounded-lg p-6 transition-colors duration-300 group-hover:border-[var(--space-cyan)]/45">
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
