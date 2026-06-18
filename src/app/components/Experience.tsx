import { motion } from 'motion/react';
import { Calendar, Code, Database, Cloud, Brain } from 'lucide-react';

const experiences = [
  {
    period: "2025 - 2026",
    role: "intern Full Stack Developer",
    company: "DEPI",
    description: "Building scalable web applications with modern frameworks and cloud infrastructure.",
    technologies: ["React", "Asp.net", "AWS", "Docker","redis","postgresql","Dgraph","sqlsever"],
    icon: Cloud,
  },
  {
    period: "2023 - 2024",
    role: "intern flutter developer",
    company: "DEPI",
    description: "Developed cross-platform mobile applications and collaborated with design teams on user experiences.",
    technologies: ["Flutter", "Dart", "Firebase"],
    icon: Database,
  },
  {
    period: "2022 - 2023",
    role: "Junior backend Developer",
    company: "Code Alpha",
    description: "Developed responsive web applications and collaborated with design teams on user experiences.",
    technologies: ["React", "PHP", "Laravel", "MySQL"],
    icon: Code,
  },
  {
    period: "2021 - 2022",
    role: "summer course at iti for php laravel",
    company: "ITI",
    description: "Completed an intensive summer course focused on PHP and Laravel, building several projects and gaining hands-on experience in web development.",
    technologies: ["PHP", "Laravel", "MySQL", "JavaScript"],
    icon: Brain,
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--space-starlight)] mb-4">
            Experience Timeline
          </h2>
          <p className="text-[var(--space-moon)] text-lg">
            My engineering journey through different technologies
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--space-cyan)] via-[var(--space-violet)] to-[var(--space-rose)]" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className={`md:flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Content Card */}
                  <div className="flex-1 mb-8 md:mb-0">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className={`space-glass rounded-lg p-6 transition-all hover:border-[var(--space-cyan)]/45 ${
                        index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                      }`}
                    >
                      {/* Period Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-[var(--space-cyan)]" />
                        <span className="text-[var(--space-cyan)] text-sm">{exp.period}</span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="font-display text-2xl font-bold text-[var(--space-starlight)] mb-1">{exp.role}</h3>
                      <p className="text-[var(--space-muted)] mb-3">{exp.company}</p>

                      {/* Description */}
                      <p className="text-[var(--space-moon)] mb-4">{exp.description}</p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-[var(--space-panel)] border border-[var(--space-border)] rounded-full text-[var(--space-cyan)] text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Icon */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      className="bg-gradient-to-br from-[var(--space-cyan)] to-[var(--space-violet)] rounded-full p-4 shadow-lg shadow-[rgba(100,244,255,0.25)]"
                    >
                      <exp.icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  {/* Spacing */}
                  <div className="hidden md:block flex-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
