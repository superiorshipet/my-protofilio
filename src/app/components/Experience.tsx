import { motion } from 'motion/react';
import { Code, Database, Cloud, Brain, Star } from 'lucide-react';

const experiences = [
  {
    period: "2026 June - Present",
    role: "Full-Stack .NET Developer (Full-Time)",
    company: "Luxira Holding",
    description: "Developing and maintaining a production CRM platform with business-critical workflows across order management, delivery operations, employee management, and customer support modules.",
    technologies: ["ASP.NET Core MVC", "C#", "Entity Framework Core", "SQL Server", "JavaScript", "SignalR", "CRM"],
    icon: Star,
  },
  {
    period: "2024 - Present",
    role: "Freelance Full-Stack Developer",
    company: "Nafezly & Mostaql",
    description: "Delivered 15+ custom web applications for clients across healthcare, e-commerce, and business sectors, from requirements gathering to deployment and ongoing support.",
    technologies: ["Node.js", "React", "SQL Server", "PostgreSQL", "REST APIs", "JWT", "Clean Architecture", "SOLID"],
    icon: Code,
  },
  {
    period: "2025 April - 2026 June",
    role: "Full-Stack .NET Developer (Part-Time)",
    company: "Star+ Games Startup",
    description: "Developed and maintained production features, designed REST APIs, optimized backend functionality, fixed production issues, and collaborated with the team using Git and Agile workflows.",
    technologies: ["ASP.NET Core", "React", "REST APIs", "Git", "Agile", "Backend Optimization"],
    icon: Star,
  },
  {
    period: "2025 (May - December)",
    role: "Intern Full Stack .NET Developer",
    company: "DEPI",
    description: "Built scalable web applications with modern frameworks and backend infrastructure during an intensive full-stack .NET internship.",
    technologies: ["React", "ASP.NET", "SQL Server"],
    icon: Cloud,
  },
  {
    period: "2023 June - 2024 January",
    role: "Intern Flutter Developer",
    company: "DEPI",
    description: "Developed cross-platform mobile applications and collaborated with design teams on user experiences.",
    technologies: ["Flutter", "Dart", "Firebase"],
    icon: Database,
  },
  {
    period: "2022 (November - December)",
    role: "Intern Backend Developer",
    company: "Code Alpha",
    description: "Developed responsive web applications and backend features while practicing practical web development workflows.",
    technologies: ["React", "PHP", "Laravel", "MySQL"],
    icon: Code,
  },
  {
    period: "2022 (June - July)",
    role: "Summer Course - PHP Laravel",
    company: "ITI",
    description: "Completed an intensive summer course focused on PHP and Laravel, building several projects and gaining hands-on web development experience.",
    technologies: ["PHP", "Laravel", "MySQL", "JavaScript"],
    icon: Brain,
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden border-b border-[var(--space-border)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end"
        >
          <div>
            <span className="section-kicker">03 / Experience</span>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-none text-[var(--space-starlight)] md:text-8xl">Built in the real world.</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[var(--space-moon)] md:justify-self-end">My engineering journey across production CRM systems, freelance products, startups, and focused technical training.</p>
        </motion.div>

        <div className="border-t border-[var(--space-border)]">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.24) }}
                className="grid gap-5 border-b border-[var(--space-border)] py-8 md:grid-cols-[11rem_1fr_1.3fr] md:gap-10 md:py-10"
              >
                <div>
                  <span className="font-mono text-xs uppercase leading-5 tracking-[0.12em] text-[var(--space-cyan)]">{exp.period}</span>
                </div>
                <div>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--space-button)] text-[var(--space-button-text)]"><exp.icon className="h-4 w-4" /></div>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-[var(--space-starlight)] md:text-3xl">{exp.role}</h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--space-muted)]">{exp.company}</p>
                </div>
                <div>
                  <p className="mb-5 leading-7 text-[var(--space-moon)]">{exp.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {exp.technologies.map((tech) => <span key={tech} className="font-mono text-[0.68rem] uppercase tracking-wide text-[var(--space-muted)]">{tech}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
