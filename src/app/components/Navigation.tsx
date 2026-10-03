import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : prefersDark ? 'dark' : 'light';

    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed left-0 right-0 top-4 z-50 px-4"
      >
        <div
          className={`mx-auto max-w-3xl rounded-[1.4rem] border px-3 py-2 text-[var(--space-nav-text)] backdrop-blur-xl transition-all duration-300 ${
            isScrolled
              ? 'border-white/10 bg-[var(--space-nav-bg)] shadow-[0_18px_55px_rgba(0,0,0,0.2)]'
              : 'border-white/10 bg-[var(--space-nav-bg)]/95 shadow-[0_12px_40px_rgba(0,0,0,0.14)]'
          }`}
        >
          <div className="flex justify-between items-center">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 rounded-xl px-2 py-1 font-display text-sm font-bold tracking-tight"
            >
              <span className="grid h-7 w-7 grid-cols-2 gap-0.5 rounded-lg bg-[var(--space-cyan)] p-1.5" aria-hidden="true">
                <span className="rounded-full bg-white" />
                <span className="rounded-full bg-white/70" />
                <span className="rounded-full bg-white/70" />
                <span className="rounded-full bg-white" />
              </span>
              Mohamed Shipet
            </motion.a>

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -1 }}
                  className="rounded-xl px-3 py-2 text-xs text-[var(--space-nav-text)]/68 transition-colors hover:bg-white/10 hover:text-[var(--space-nav-text)]"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.92 }}
                whileHover={{ y: -1 }}
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-current/15 bg-white/8 text-[var(--space-nav-text)] transition-colors hover:bg-white/15"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 text-[var(--space-nav-text)] md:hidden"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-x-4 top-20 z-40 rounded-[1.75rem] border border-[var(--space-border)] bg-[var(--space-panel-strong)] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl px-4 py-3 text-lg text-[var(--space-moon)] transition-colors hover:bg-[var(--space-midnight)] hover:text-[var(--space-starlight)]"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-[var(--space-overlay)] backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
