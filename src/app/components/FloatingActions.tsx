import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';

const whatsappUrl =
  'https://wa.me/+201285544547?text=Hi%20Mohamed%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20connect.';

const actions = [
  { href: 'https://github.com/superiorshipet', label: 'GitHub', Icon: Github },
  { href: 'https://www.linkedin.com/in/mohamed-shipet-700864266/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'mailto:mohmedshipet4@gmail.com', label: 'Email', Icon: Mail },
  { href: whatsappUrl, label: 'WhatsApp', Icon: MessageCircle },
];

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-20 right-4 sm:bottom-24 sm:right-5 z-40 flex flex-col items-center gap-2 sm:gap-3"
    >
      {/* Social quick dock - visible on both mobile and desktop */}
      <div className="space-glass flex flex-col gap-1.5 sm:gap-2 rounded-full p-1.5 sm:p-2 border border-[var(--space-border)] backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
        {actions.map(({ href, label, Icon }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            aria-label={label}
            whileHover={{ scale: 1.15, x: -3 }}
            whileTap={{ scale: 0.9 }}
            className="group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] text-[var(--space-muted)] transition-colors hover:border-[var(--space-cyan)]/50 hover:bg-[var(--space-cyan)]/15 hover:text-[var(--space-cyan)]"
          >
            <Icon className="h-4 w-4" />
            <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-lg border border-[var(--space-border)] bg-[var(--space-midnight)] px-2.5 py-1 text-xs font-semibold text-[var(--space-starlight)] opacity-0 shadow-xl transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1 hidden sm:block">
              {label}
            </span>
          </motion.a>
        ))}
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="back-to-top"
            type="button"
            aria-label="Back to top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="space-glass flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[var(--space-cyan)]/40 bg-[var(--space-panel)] text-[var(--space-cyan)] shadow-[0_0_20px_rgba(100,244,255,0.3)] transition-colors hover:bg-[var(--space-cyan)] hover:text-[var(--space-void)] cursor-pointer"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
