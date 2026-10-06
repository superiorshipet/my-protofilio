import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Briefcase, Calendar, Building, Sparkles } from 'lucide-react';

const experiences = [
  {
    period: '2026 June - Present',
    role: 'Full-Stack .NET Developer (Full-Time)',
    company: 'Luxira Holding',
    description:
      'Architecting and scaling a production CRM platform with business-critical workflows across order management, delivery logistics, role-based access control, and live customer support modules.',
    technologies: ['ASP.NET Core MVC', 'C#', 'Entity Framework Core', 'SQL Server', 'JavaScript', 'SignalR', 'CRM'],
    current: true,
  },
  {
    period: '2024 - Present',
    role: 'Freelance Full-Stack Developer',
    company: 'Nafezly & Mostaql',
    description:
      'Delivered 15+ custom web applications for clients across healthcare, tourism, and e-commerce sectors, handling everything from architectural design to deployment and client handover.',
    technologies: ['Node.js', 'React', 'TypeScript', 'SQL Server', 'PostgreSQL', 'REST APIs', 'Clean Architecture', 'SOLID'],
    current: true,
  },
  {
    period: '2025 April - 2026 June',
    role: 'Full-Stack .NET Developer (Part-Time)',
    company: 'Star+ Games Startup',
    description:
      'Engineered game backend services, optimized high-concurrency database queries, resolved critical production bottlenecks, and maintained CI/CD workflows in an agile team.',
    technologies: ['ASP.NET Core', 'React', 'REST APIs', 'Git', 'Agile', 'Backend Optimization'],
  },
  {
    period: '2025 (May - December)',
    role: 'Intern Full Stack .NET Developer',
    company: 'DEPI',
    description:
      'Built scalable enterprise web applications, designed normalized relational schemas, and implemented RESTful microservices during an intensive full-stack .NET track.',
    technologies: ['React', 'ASP.NET', 'SQL Server', 'C#'],
  },
  {
    period: '2023 June - 2024 January',
    role: 'Intern Flutter Developer',
    company: 'DEPI',
    description:
      'Developed cross-platform mobile experiences with reactive state management, Firebase backend integration, and clean UI components.',
    technologies: ['Flutter', 'Dart', 'Firebase'],
  },
  {
    period: '2022 (November - December)',
    role: 'Intern Backend Developer',
    company: 'Code Alpha',
    description:
      'Developed responsive web interfaces, API endpoints, and authentication middleware while practicing professional agile software workflows.',
    technologies: ['React', 'PHP', 'Laravel', 'MySQL'],
  },
  {
    period: '2022 (June - July)',
    role: 'Summer Course - PHP Laravel',
    company: 'ITI',
    description:
      'Completed an intensive summer track focused on PHP, Laravel, and MVC architecture, building real-world projects and mastering relational database design.',
    technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
  },
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (lineRef.current) {
      setLineHeight(lineRef.current.getBoundingClientRect().height);
    }
  }, [lineRef]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 20%', 'end 70%'],
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, lineHeight]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section id="experience" ref={containerRef} className="relative py-24">
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--space-cyan)] backdrop-blur">
            <Briefcase className="h-3.5 w-3.5" />
            Career Path & Milestones
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[var(--space-starlight)]">
            Experience Timeline
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-[var(--space-moon)]">
            A journey of engineering, enterprise delivery, and continuous technical growth.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={lineRef} className="relative pl-6 md:pl-10">
          {/* Base Background Track */}
          <div className="absolute left-2.5 md:left-4 top-2 bottom-2 w-[2px] bg-[var(--space-border)] rounded-full" />

          {/* Glowing Animated Beam */}
          <motion.div
            style={{
              height: beamHeight,
              opacity: beamOpacity,
            }}
            className="absolute left-2.5 md:left-4 top-2 w-[2px] bg-gradient-to-b from-[var(--space-cyan)] via-[var(--space-violet)] to-[var(--space-rose)] rounded-full shadow-[0_0_12px_rgba(100,244,255,0.7)]"
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative group"
              >
                {/* Glowing Node Dot on Timeline */}
                <div className="absolute -left-[27px] md:-left-[39px] top-6 flex items-center justify-center">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    exp.current
                      ? 'border-[var(--space-cyan)] bg-[var(--space-cyan)]/20 shadow-[0_0_16px_rgba(100,244,255,0.8)]'
                      : 'border-[var(--space-border)] bg-[var(--space-midnight)] group-hover:border-[var(--space-cyan)] group-hover:scale-110'
                  }`}>
                    <div className={`h-2 w-2 rounded-full ${
                      exp.current ? 'bg-[var(--space-cyan)] animate-ping' : 'bg-[var(--space-muted)] group-hover:bg-[var(--space-cyan)]'
                    }`} />
                  </div>
                </div>

                {/* Content Card */}
                <div className="portfolio-depth-card space-glass rounded-2xl p-7 border border-[var(--space-border)] transition-all duration-300 hover:border-[var(--space-cyan)]/45">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--space-cyan)]">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{exp.period}</span>
                    </div>

                    {exp.current && (
                      <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        <Sparkles className="h-3 w-3" />
                        Active
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[var(--space-starlight)] group-hover:text-[var(--space-cyan)] transition-colors">
                    {exp.role}
                  </h3>

                  <div className="flex items-center gap-2 mt-1 mb-4 text-sm font-medium text-[var(--space-muted)]">
                    <Building className="h-4 w-4 text-[var(--space-cyan)]/80" />
                    <span>{exp.company}</span>
                  </div>

                  <p className="text-sm leading-relaxed text-[var(--space-moon)] mb-5">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--space-border)]">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[var(--space-border)] bg-[var(--space-panel)] px-2.5 py-1 text-xs font-mono text-[var(--space-starlight)]/85"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
