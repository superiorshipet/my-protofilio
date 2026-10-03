import { motion } from 'motion/react';
import { Code2, Server, Database, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["HTML", "CSS", "JavaScript", "React", "Angular"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "PHP", "Laravel", "ASP.NET Core", "C#","GO"],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["SQL Server", "MySQL", "MongoDB", "PostgreSQL", "Redis", "Firebase","Dgraph"],
  },
  {
    title: "Engineering",
    icon: Wrench,
    skills: ["Git", "Docker", "Linux", "Networking", "Cloud Computing", "Operating Systems"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden border-b border-[var(--space-border)] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end"
        >
          <div>
            <span className="section-kicker">01 / Capabilities</span>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-none text-[var(--space-starlight)] md:text-7xl">Technical range.</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[var(--space-moon)] md:justify-self-end">
            Tools and technologies I use to take products from architecture and data design to resilient APIs and polished interfaces.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group ${index === 0 || index === 3 ? 'lg:col-span-1' : ''}`}
            >
              <div className="editorial-surface relative h-full min-h-64 overflow-hidden rounded-[2rem] p-7 transition-colors duration-300 group-hover:border-[var(--space-cyan)]/45 md:p-9">
                <div className="mb-12 flex items-start justify-between">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.05 }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--space-button)] text-[var(--space-button-text)]"
                >
                  <category.icon className="h-5 w-5" />
                </motion.div>
                  <span className="font-mono text-xs text-[var(--space-muted)]">0{index + 1}</span>
                </div>

                <h3 className="mb-5 font-display text-3xl font-semibold text-[var(--space-starlight)] md:text-4xl">{category.title}</h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ y: -2 }}
                      className="cursor-default rounded-full border border-[var(--space-border)] bg-[var(--space-panel-strong)] px-3 py-1.5 font-mono text-xs text-[var(--space-moon)] transition-colors hover:border-[var(--space-cyan)]"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
