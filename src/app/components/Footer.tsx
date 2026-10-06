import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[var(--space-moon)] flex items-center gap-1"
          >
            Built with
            <span className="inline-block animate-pulse">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </span>
            by Mohamed
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
