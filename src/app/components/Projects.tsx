import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ExternalLink, Github, Satellite, Sparkles, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { Button } from './ui/button';

interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  orbit: string;
  category: 'Full-Stack' | 'Backend & APIs' | 'Commerce' | 'Systems & ML';
  featured?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  image: string;
}

const projects: ProjectItem[] = [
  {
    title: 'Project Task Management',
    description:
      'A robust workspace for managing team projects, sprint tasks, member role assignments, status boards, and automated workflows.',
    tech: ['Laravel', 'Blade', 'PHP', 'MySQL'],
    orbit: 'Productivity',
    category: 'Full-Stack',
    featured: true,
    githubUrl: 'https://github.com/superiorshipet/project-task-managment',
    demoUrl: 'https://tasharuky.duckdns.org/login',
    image: '/assets/real-projects/task-management.webp',
  },
  {
    title: 'ATS Website',
    description:
      'An enterprise applicant tracking and candidate assessment platform featuring resume ingestion, status workflows, and interactive dashboards.',
    tech: ['TypeScript', 'React', 'PHP', 'PostgreSQL'],
    orbit: 'Hiring platform',
    category: 'Full-Stack',
    featured: true,
    githubUrl: 'https://github.com/superiorshipet/ATS-website',
    demoUrl: 'https://the-ats-pro.duckdns.org/ats/',
    image: '/assets/real-projects/ats.webp',
  },
  {
    title: 'Pharmacy Management',
    description:
      'A mission-critical pharmacy operations system designed for inventory batch control, sales audits, prescription records, and supplier management.',
    tech: ['C#', 'ASP.NET Core', 'SQL Server', 'Entity Framework'],
    orbit: 'Operations',
    category: 'Backend & APIs',
    featured: true,
    githubUrl: 'https://github.com/superiorshipet/pharmacy',
    demoUrl: 'https://tasharuky.duckdns.org/pharmacy/',
    image: '/assets/real-projects/pharmacy.webp',
  },
  {
    title: 'Discover Madina',
    description:
      'A comprehensive cultural tourism platform with interactive landmark discovery, itinerary planning, geolocation maps, and realtime tourist services.',
    tech: ['C#', 'React', 'PostgreSQL', 'WebSocket'],
    orbit: 'City guide',
    category: 'Full-Stack',
    featured: true,
    githubUrl: 'https://github.com/superiorshipet/discover-madina',
    demoUrl: 'https://discover-madina.duckdns.org/',
    image: '/assets/real-projects/discover-madina.webp',
  },
  {
    title: 'SUPVEND',
    description:
      'An IoT smart vending and micro-retail platform with telemetry telemetry tracking, instant order processing, inventory sync, and hardware API connectivity.',
    tech: ['JavaScript', 'Node.js', 'PostgreSQL', 'Commerce'],
    orbit: 'Commerce hub',
    category: 'Commerce',
    featured: true,
    githubUrl: 'https://github.com/superiorshipet/SUPVEND',
    demoUrl: 'https://supvend.duckdns.org/supvend-ui/',
    image: '/assets/real-projects/supvend.webp',
  },
  {
    title: 'Study Mate',
    description:
      'A student collaboration and adaptive learning hub with structured study group rooms, real-time messaging, task boards, and academic resource hubs.',
    tech: ['TypeScript', 'React', 'ASP.NET', 'PostgreSQL'],
    orbit: 'Learning orbit',
    category: 'Full-Stack',
    githubUrl: 'https://github.com/superiorshipet/study-mate',
    demoUrl: 'https://study-mate-blush.vercel.app',
    image: '/assets/real-projects/study-mate.webp',
  },
  {
    title: 'Belvie Furniture',
    description:
      'A modern Scandinavian furniture e-commerce storefront with high-resolution catalogs, custom item configurator, secure checkout, and full admin CMS.',
    tech: ['React', 'ASP.NET Core', 'PostgreSQL', 'E-commerce'],
    orbit: 'Furniture store',
    category: 'Commerce',
    demoUrl: 'https://belvie-arc.duckdns.org/belvie/',
    image: '/assets/real-projects/belvie.webp',
  },
  {
    title: 'Arabic Perfume Shop',
    description:
      'An artisanal oriental perfume boutique with scent notes taxonomy, custom customer recommendations, authentication, and inventory sync.',
    tech: ['React', 'ASP.NET Core', 'PostgreSQL', 'Commerce'],
    orbit: 'Perfume shop',
    category: 'Commerce',
    demoUrl: 'https://arabic-perfume.duckdns.org/arabic-perfume/',
    image: '/assets/real-projects/arabic-perfume.webp',
  },
  {
    title: 'Podcasty',
    description:
      'A cloud podcasting platform supporting episode uploads, streaming playback, live chat rooms, and automated backend audio ingestion pipelines.',
    tech: ['C#', 'ASP.NET Core', 'SQL Server', 'WebSocket'],
    orbit: 'Audio network',
    category: 'Backend & APIs',
    githubUrl: 'https://github.com/superiorshipet/podcasty',
    demoUrl: 'https://tasharuky.duckdns.org/podcasty-ui/',
    image: '/assets/real-projects/podcasty.webp',
  },
  {
    title: 'Stunning.io Task',
    description:
      'High-performance full-stack service layer built on .NET with a reactive client, optimized DB queries, and containerized deployment.',
    tech: ['C#', 'ASP.NET Core', 'React', 'Docker'],
    orbit: 'Full-stack task',
    category: 'Backend & APIs',
    githubUrl: 'https://github.com/superiorshipet/stunning.io-task',
    demoUrl: 'https://tasharuky.duckdns.org/stunning.io-task/',
    image: '/assets/real-projects/stunning-task.webp',
  },
  {
    title: 'Luxira Chat',
    description:
      'Real-time messaging microservice built with SignalR WebSocket channels, instant delivery receipts, group channels, and decoupled frontend architecture.',
    tech: ['C#', 'SignalR', 'ASP.NET', 'WebSockets'],
    orbit: 'Realtime chat',
    category: 'Backend & APIs',
    githubUrl: 'https://github.com/superiorshipet/luxira-chatting-backend',
    image: '/assets/real-projects/luxira-chat.webp',
  },
  {
    title: 'Distributed Database Project',
    description:
      'A systems-level Go engine exploring distributed consensus, concurrency control, transaction isolation, and replicated key-value storage.',
    tech: ['Go', 'Concurrency', 'Distributed Systems', 'Raft'],
    orbit: 'Systems',
    category: 'Systems & ML',
    githubUrl: 'https://github.com/superiorshipet/distribution-database-project-for-eng-farosa',
    image: '/assets/real-projects/distributed-db.webp',
  },
  {
    title: 'Data Mining Cancer Prediction',
    description:
      'An exploratory machine learning notebook utilizing statistical classification algorithms, feature engineering, and ROC evaluation for oncology diagnosis.',
    tech: ['Python', 'Jupyter', 'Scikit-Learn', 'Pandas'],
    orbit: 'Machine learning',
    category: 'Systems & ML',
    githubUrl: 'https://github.com/superiorshipet/data-mining-cancer-prediction-project',
    image: '/assets/real-projects/cancer-prediction.webp',
  },
  {
    title: 'Telegram Training Bot',
    description:
      'An automated training bot delivering scheduled courses, interactive quizzes, automated grading, and learner progress tracking directly via Telegram.',
    tech: ['Python', 'Telegram API', 'Automation', 'SQLite'],
    orbit: 'Training bot',
    category: 'Systems & ML',
    githubUrl: 'https://github.com/superiorshipet/telegram_training_bot',
    image: '/assets/real-projects/telegram-bot.webp',
  },
  {
    title: 'Loxx King',
    description:
      'A full-stack product portal combining responsive TypeScript UI with high-throughput C# REST endpoints and authenticated user roles.',
    tech: ['TypeScript', 'C#', 'React', 'REST API'],
    orbit: 'Product app',
    category: 'Full-Stack',
    githubUrl: 'https://github.com/superiorshipet/loxx-king',
    demoUrl: 'https://loxx-king.vercel.app',
    image: '/assets/real-projects/loxx-king.webp',
  },
  {
    title: 'E-commerce for E-products',
    description:
      'A modern marketplace for downloadable digital assets with instant license provisioning, payment processing, and download protection.',
    tech: ['TypeScript', 'React', 'Tailwind', 'Stripe'],
    orbit: 'Digital goods',
    category: 'Commerce',
    githubUrl: 'https://github.com/superiorshipet/E-commerce-for-E-products',
    demoUrl: 'https://e-commerce-for-e-products.vercel.app',
    image: '/assets/real-projects/e-commerce-e-products.webp',
  },
];

const ITEMS_PER_PAGE = 6;
const categories = ['All', 'Full-Stack', 'Backend & APIs', 'Commerce', 'Systems & ML'] as const;

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [preview, setPreview] = useState<{ image: string; title: string; tech: string[] } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { damping: 16, stiffness: 120 });
  const springY = useSpring(cursorY, { damping: 16, stiffness: 120 });

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const previewWidth = 340;
    const previewHeight = 240;
    let posX = e.clientX + 22;
    let posY = e.clientY + 22;

    if (typeof window !== 'undefined') {
      if (posX + previewWidth > window.innerWidth) {
        posX = e.clientX - previewWidth - 20;
      }
      if (posY + previewHeight > window.innerHeight) {
        posY = e.clientY - previewHeight - 20;
      }
    }

    cursorX.set(posX);
    cursorY.set(posY);
  };

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setPreview(null);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setPreview(null);
    setCurrentPage(page);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => setPreview(null)}
      className="relative py-24"
    >

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--space-cyan)] backdrop-blur">
              <Satellite className="h-3.5 w-3.5" />
              Selected Works
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[var(--space-starlight)]">
              Project Constellation
            </h2>
            <p className="mt-3 max-w-xl text-base text-[var(--space-moon)]">
              Explore 16+ production platforms, systems, and tools built across scalable backend architectures, full-stack ecosystems, and commerce.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--space-muted)] font-mono">
            <Layers className="h-4 w-4 text-[var(--space-cyan)]" />
            <span>Showing {startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, filteredProjects.length)} of {filteredProjects.length}</span>
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="mb-10 flex flex-wrap gap-2.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--space-cyan)] text-[var(--space-void)] shadow-[0_0_20px_rgba(100,244,255,0.35)] font-bold'
                    : 'border border-[var(--space-border)] bg-[var(--space-panel)] text-[var(--space-muted)] hover:text-[var(--space-starlight)] hover:border-[var(--space-cyan)]/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {currentProjects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onHoverStart={() => {
                  setHoveredIndex(index);
                  if (project.image) {
                    setPreview({
                      image: project.image,
                      title: project.title,
                      tech: project.tech,
                    });
                  }
                }}
                onHoverEnd={() => {
                  setHoveredIndex(null);
                  setPreview(null);
                }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="portfolio-depth-card space-glass relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-2xl p-7 transition-all duration-300 group-hover:border-[var(--space-cyan)]/50 border border-[var(--space-border)]">
                  {/* Orbit Background Circle Accent */}
                  <motion.div
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full border border-[var(--space-border)]/60"
                    animate={{ rotate: hoveredIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Header orbit & featured badge */}
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[var(--space-border)] bg-[var(--space-panel-strong)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--space-cyan)]">
                      {project.orbit}
                    </span>

                    {project.featured && (
                      <span className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-300">
                        <Sparkles className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="font-display mb-3 text-2xl font-bold leading-tight text-[var(--space-starlight)] group-hover:text-[var(--space-cyan)] transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="mb-6 line-clamp-4 text-sm leading-relaxed text-[var(--space-moon)]">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-[var(--space-border)] bg-[var(--space-panel)] px-2.5 py-1 text-[11px] font-mono text-[var(--space-starlight)]/85"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="mt-auto flex gap-2.5 pt-4 border-t border-[var(--space-border)]">
                    {project.githubUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-auto flex-1 rounded-xl border-[var(--space-border)] bg-transparent py-2.5 text-xs text-[var(--space-starlight)] hover:bg-[var(--space-panel-strong)] hover:border-[var(--space-cyan)]/40 transition-colors"
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1.5 h-3.5 w-3.5" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button
                        asChild
                        size="sm"
                        className="h-auto flex-1 rounded-xl bg-[var(--space-button)] py-2.5 text-xs font-semibold text-[var(--space-button-text)] hover:bg-[var(--space-cyan)] hover:text-[var(--space-void)] transition-all shadow-[0_0_16px_rgba(100,244,255,0.2)]"
                      >
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Interactive Modern Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--space-border)] bg-[var(--space-panel)] text-[var(--space-starlight)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--space-cyan)]/40 transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[var(--space-cyan)] text-[var(--space-void)] shadow-[0_0_18px_rgba(100,244,255,0.4)]'
                        : 'border border-[var(--space-border)] bg-[var(--space-panel)] text-[var(--space-muted)] hover:text-[var(--space-starlight)]'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--space-border)] bg-[var(--space-panel)] text-[var(--space-starlight)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--space-cyan)]/40 transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Floating Cursor Web Preview */}
      <AnimatePresence>
        {preview && (
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-50 w-72 md:w-80 overflow-hidden rounded-xl border border-[var(--space-cyan)]/50 bg-[var(--space-void)]/95 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(100,244,255,0.3)] backdrop-blur-xl"
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.16 }}
          >
            {/* Browser top-bar */}
            <div className="flex items-center justify-between border-b border-[var(--space-border)] bg-[var(--space-panel)]/80 px-3 py-1.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
              </div>
              <span className="max-w-[150px] truncate font-mono text-[10px] text-[var(--space-starlight)]/90">
                {preview.title}
              </span>
              <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-[var(--space-cyan)]">
                LIVE PREVIEW
              </span>
            </div>

            {/* Browser viewport */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
              <img
                src={preview.image}
                alt={preview.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--space-void)]/90 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                {preview.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded border border-[var(--space-border)] bg-[var(--space-panel-strong)]/90 px-1.5 py-0.5 font-mono text-[9px] font-medium text-[var(--space-cyan)] shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
