import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { FolderGit2, BookOpen, Calendar, Users } from 'lucide-react';

const stats = [
  { label: "Projects Built", value: 40, suffix: "+", icon: FolderGit2 },
  { label: "Technologies Learned", value: 15, suffix: "+", icon: BookOpen },
  { label: "Years of Learning", value: 5, suffix: "+", icon: Calendar },
  { label: "Team Collaborations", value: 10, suffix: "+", icon: Users },
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
    <section className="relative overflow-hidden border-b border-[var(--space-border)] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div><span className="section-kicker">04 / Scale</span><h2 className="mt-5 font-display text-5xl font-semibold text-[var(--space-starlight)] md:text-7xl">By the numbers.</h2></div>
          <p className="text-lg text-[var(--space-moon)]">Measuring growth and impact.</p>
        </motion.div>

        <div className="editorial-surface grid overflow-hidden rounded-[2.25rem] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="relative h-full border-b border-[var(--space-border)] p-8 text-left sm:border-r lg:border-b-0 lg:p-9">
                <motion.div
                  whileHover={{ rotate: 8 }}
                  className="mb-12 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--space-button)] text-[var(--space-button-text)]"
                >
                  <stat.icon className="h-4 w-4" />
                </motion.div>

                <div className="mb-3 font-display text-6xl font-semibold tabular-nums text-[var(--space-starlight)]">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--space-muted)]">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
