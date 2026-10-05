import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Clock, Copy, Globe2, Sparkles, Terminal, Cpu, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Globe } from './Globe';

export function AboutBento() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');

  const email = 'superiorshipet@gmail.com';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Africa/Cairo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section id="about" className="relative overflow-hidden py-24">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[70vw] -translate-x-1/2 bg-gradient-to-b from-[var(--space-cyan)]/10 via-[var(--space-violet)]/8 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--space-cyan)] backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Engineering Philosophy
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-[var(--space-starlight)]">
            About & Architecture
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base md:text-lg text-[var(--space-moon)]">
            A comprehensive look at how I design, architect, and ship high-impact software products.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {/* Card 1: Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="group relative md:col-span-4 rounded-2xl border border-[var(--space-border)] bg-[var(--space-panel)] p-8 transition-all duration-300 hover:border-[var(--space-cyan)]/45 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--space-cyan)]/10 blur-3xl group-hover:bg-[var(--space-cyan)]/18 transition-colors" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--space-cyan)]">
                  <Terminal className="h-4 w-4" />
                  Engineering Bio
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                  Full Stack Engineer
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--space-starlight)] mb-4">
                Hi! I’m Mohamed Shipet (Superior) 👋
              </h3>
              <p className="text-base leading-relaxed text-[var(--space-moon)] mb-6">
                I engineer backend-heavy, resilient architectures and responsive web platforms. My work blends modern clean architecture (C#, .NET Core, Python) with modern, fluid user interfaces (React, TypeScript, Motion). Every feature is designed with modularity, maintainability, and real-world scale in mind.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--space-border)]">
              {['Clean Architecture', 'Microservices', 'REST & GraphQL', 'Event-Driven', 'Cloud Native'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--space-border)] bg-[var(--space-panel-strong)] px-3 py-1 text-xs text-[var(--space-starlight)]/90 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Live Time Zone Clock & Interactive 3D Globe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative md:col-span-2 rounded-2xl border border-[var(--space-border)] bg-[var(--space-panel)] p-6 transition-all duration-300 hover:border-[var(--space-cyan)]/45 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[var(--space-violet)]/14 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--space-cyan)]">
                  <Clock className="h-4 w-4" />
                  Time Zone
                </span>
                <Globe2 className="h-4 w-4 text-[var(--space-muted)] group-hover:text-[var(--space-cyan)] transition-colors" />
              </div>

              <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--space-muted)]">
                Cairo, Egypt (UTC+2 / UTC+3)
              </h4>
              <div className="font-display text-2xl md:text-3xl font-extrabold text-[var(--space-starlight)] tabular-nums tracking-tight my-2">
                {time || '12:00:00 AM'}
              </div>
            </div>

            {/* Interactive 3D Spinning Globe (Draggable / Rotatable) */}
            <div className="relative z-0 my-[-20px] flex items-center justify-center">
              <Globe className="max-w-[240px] pointer-events-auto" />
            </div>

            <div className="relative z-10 mt-2 flex items-center gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-emerald-400">
                Open to Remote & Global Work
              </span>
            </div>
          </motion.div>

          {/* Card 3: Code Craftsmanship ("CODE IS CRAFT") */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -4 }}
            className="group relative md:col-span-2 rounded-2xl border border-[var(--space-border)] bg-[var(--space-panel)] p-8 transition-all duration-300 hover:border-[var(--space-cyan)]/45 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[var(--space-rose)]/10 blur-2xl" />

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--space-cyan)] mb-4">
                <ShieldCheck className="h-4 w-4" />
                Core Philosophy
              </div>
              <div className="font-display text-4xl font-black tracking-tighter text-[var(--space-starlight)]/90 mb-3">
                CODE IS CRAFT
              </div>
              <p className="text-sm text-[var(--space-moon)] leading-relaxed">
                Writing clean, documented, and tested code that other developers love to read and systems execute with zero friction.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {['SOLID', 'DRY', 'TDD', 'Design Patterns'].map((badge) => (
                <span
                  key={badge}
                  className="rounded-md border border-[var(--space-border)] bg-[var(--space-panel-strong)] px-2.5 py-1 text-[11px] font-mono font-medium text-[var(--space-cyan)]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Tech Stack Radar & Core Proficiencies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="group relative md:col-span-2 rounded-2xl border border-[var(--space-border)] bg-[var(--space-panel)] p-8 transition-all duration-300 hover:border-[var(--space-cyan)]/45 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--space-violet)]/6 via-transparent to-[var(--space-cyan)]/6 pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--space-cyan)] mb-4">
                <Cpu className="h-4 w-4" />
                Tech Stack Core
              </div>
              <h4 className="font-display text-xl font-bold text-[var(--space-starlight)] mb-3">
                Modern Tools & Runtimes
              </h4>
              <p className="text-xs text-[var(--space-moon)] mb-4">
                Hands-on production expertise across the full engineering lifecycle:
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-[var(--space-border)] pb-2">
                <span className="text-[var(--space-muted)]">Backend</span>
                <span className="font-semibold text-[var(--space-starlight)]">C#, ASP.NET Core, Python</span>
              </div>
              <div className="flex items-center justify-between border-b border-[var(--space-border)] pb-2">
                <span className="text-[var(--space-muted)]">Frontend</span>
                <span className="font-semibold text-[var(--space-starlight)]">React, TypeScript, Tailwind</span>
              </div>
              <div className="flex items-center justify-between border-b border-[var(--space-border)] pb-2">
                <span className="text-[var(--space-muted)]">Databases</span>
                <span className="font-semibold text-[var(--space-starlight)]">SQL Server, PostgreSQL, Redis</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--space-muted)]">DevOps</span>
                <span className="font-semibold text-[var(--space-starlight)]">Docker, Git, Linux, CI/CD</span>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Interactive Project Collaboration Callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            whileHover={{ y: -4 }}
            className="group relative md:col-span-2 rounded-2xl border border-[var(--space-border)] bg-[var(--space-panel)] p-8 transition-all duration-300 hover:border-[var(--space-cyan)]/45 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-[var(--space-cyan)]/15 blur-3xl group-hover:bg-[var(--space-cyan)]/25 transition-colors" />

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--space-cyan)] mb-4">
                <ArrowUpRight className="h-4 w-4" />
                Collaboration
              </div>
              <h4 className="font-display text-2xl font-bold text-[var(--space-starlight)] mb-3">
                Let’s Build Something Remarkable
              </h4>
              <p className="text-sm text-[var(--space-moon)] mb-6">
                Have a project idea, architecture challenge, or role available? Let’s connect and talk details.
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={handleCopy}
                className="group/btn relative flex w-full items-center justify-center gap-2.5 rounded-xl border border-[var(--space-cyan)]/40 bg-[var(--space-button)] py-3 px-4 text-sm font-semibold text-[var(--space-button-text)] shadow-[0_0_24px_rgba(100,244,255,0.2)] hover:bg-[var(--space-cyan)] hover:text-[var(--space-void)] transition-all cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 text-emerald-400"
                    >
                      <Check className="h-4 w-4" />
                      Email Copied!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copy Email Address
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <p className="mt-2 text-center text-[11px] text-[var(--space-muted)] font-mono">
                {email}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
