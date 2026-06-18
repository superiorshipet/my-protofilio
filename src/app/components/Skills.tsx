import { motion } from 'motion/react';
import { Code2, Server, Database, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    color: "from-[var(--space-cyan)] to-[var(--space-violet)]",
    skills: ["HTML", "CSS", "JavaScript", "React", "Angular"],
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-[var(--space-violet)] to-[var(--space-rose)]",
    skills: ["Node.js", "Express.js", "PHP", "Laravel", "ASP.NET Core", "C#","GO"],
  },
  {
    title: "Database",
    icon: Database,
    color: "from-[var(--space-rose)] to-[var(--space-sun)]",
    skills: ["SQL Server", "MySQL", "MongoDB", "PostgreSQL", "Redis", "Firebase","Dgraph"],
  },
  {
    title: "Engineering",
    icon: Wrench,
    color: "from-[var(--space-sun)] to-[var(--space-cyan)]",
    skills: ["Git", "Docker", "Linux", "Networking", "Cloud Computing", "Operating Systems"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--space-starlight)] mb-4">
            Technical Skills
          </h2>
          <p className="text-[var(--space-moon)] text-lg">
            Tools and technologies I work with daily
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="space-glass h-full rounded-lg p-6 transition-all duration-300 group-hover:border-[var(--space-cyan)]/45">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <category.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-[var(--space-starlight)] mb-4">{category.title}</h3>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-[var(--space-panel)] border border-[var(--space-border)] rounded-full text-[var(--space-cyan)] text-sm hover:bg-[var(--space-panel-strong)] transition-colors cursor-default"
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
