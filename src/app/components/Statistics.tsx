import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { FolderGit2, BookOpen, Calendar, Users } from 'lucide-react';

const stats = [
  { label: "Projects Built", value: 40, suffix: "+", icon: FolderGit2, color: "from-cyan-500 to-blue-600" },
  { label: "Technologies Learned", value: 15, suffix: "+", icon: BookOpen, color: "from-indigo-500 to-purple-600" },
  { label: "Years of Learning", value: 5, suffix: "+", icon: Calendar, color: "from-purple-500 to-pink-600" },
  { label: "Team Collaborations", value: 10, suffix: "+", icon: Users, color: "from-pink-500 to-cyan-600" },
];

function Counter({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function Statistics() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--space-starlight)] mb-4">
            By The Numbers
          </h2>
          <p className="text-[var(--space-moon)] text-lg">
            Measuring growth and impact
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="group"
            >
              <div className="space-glass h-full rounded-lg p-8 transition-all duration-300 group-hover:border-[var(--space-cyan)]/45 text-center">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Number */}
                <div className="font-display text-5xl font-bold text-[var(--space-starlight)] mb-3 tabular-nums">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-[var(--space-moon)] text-lg">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
