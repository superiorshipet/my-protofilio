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
    <section className="py-20 bg-[#0F172A] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Background Decoration */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <Code2 className="w-96 h-96" />
          </div>

          {/* Content */}
          <div className="relative bg-gradient-to-br from-[#1E293B]/50 to-[#312E81]/50 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-12 md:p-16 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-2xl mb-8 shadow-lg shadow-cyan-500/30"
            >
              <Lightbulb className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
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
                  <p className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
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
                      ? 'bg-cyan-400 w-8'
                      : 'bg-cyan-400/30 hover:bg-cyan-400/50'
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
            className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-2xl backdrop-blur-sm border border-cyan-500/20"
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
            className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm border border-purple-500/20"
          />
        </motion.div>
      </div>
    </section>
  );
}
