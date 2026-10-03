import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--space-border)] py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <span className="font-display text-xl font-semibold text-[var(--space-starlight)]">Mohamed Shipet</span>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[var(--space-moon)] flex items-center gap-1"
          >
            Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
            by Mohamed
          </motion.p>
          <a href="#home" className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--space-muted)] hover:text-[var(--space-cyan)]">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
