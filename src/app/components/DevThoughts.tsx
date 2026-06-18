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
    <section className="relative overflow-hidden py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Background Decoration */}
          <div className="absolute inset-0 flex items-center justify-center text-[var(--space-starlight)] opacity-[0.04]">
            <Code2 className="w-96 h-96" />
          </div>

          {/* Content */}
          <div className="space-glass relative rounded-lg p-12 text-center md:p-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--space-cyan)] to-[var(--space-violet)] mb-8 shadow-lg shadow-[rgba(100,244,255,0.25)]"
            >
              <Lightbulb className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--space-starlight)] mb-8">
              Developer Mindset
            </h2>

            {/* Rotating Thoughts */}
            <div className="relative h-32 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: 90 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <p className="font-display text-4xl md:text-6xl font-bold bg-gradient-to-r from-[var(--space-cyan)] via-[var(--space-starlight)] to-[var(--space-violet)] bg-clip-text text-transparent">
                    "{thoughts[currentIndex]}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
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

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-8 -right-8 w-16 h-16 rounded-2xl bg-[var(--space-panel)] backdrop-blur-sm border border-[var(--space-border)]"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -bottom-8 -left-8 w-20 h-20 rounded-2xl bg-[var(--space-panel)] backdrop-blur-sm border border-[var(--space-border)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
