import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Lightbulb } from 'lucide-react';

const thoughts = [
  "Frameworks change.",
  "Fundamentals stay.",
  "Backend is a mindset.",
  "Always learning.",
  "Always building.",
];

export function DevThoughts() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % thoughts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-[var(--space-border)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="editorial-surface relative overflow-hidden rounded-[2.5rem] p-8 md:p-16">
            <Code2 className="absolute -right-16 -top-16 h-72 w-72 text-[var(--space-starlight)] opacity-[0.035]" />
            <span className="section-kicker">05 / Principles</span>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="mt-12 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--space-button)] text-[var(--space-button-text)]"
            >
              <Lightbulb className="h-5 w-5" />
            </motion.div>

            <h2 className="mt-6 font-display text-3xl font-semibold text-[var(--space-starlight)] md:text-5xl">
              Developer Mindset
            </h2>

            {/* Rotating Thoughts */}
            <div className="relative mt-8 flex h-40 items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: 90 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center"
                >
                  <p className="font-display text-5xl font-semibold leading-none text-[var(--space-starlight)] md:text-8xl">
                    "{thoughts[currentIndex]}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="mt-8 flex gap-2">
              {thoughts.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[var(--space-cyan)] w-8'
                      : 'bg-[var(--space-cyan)]/30 hover:bg-[var(--space-cyan)]/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
