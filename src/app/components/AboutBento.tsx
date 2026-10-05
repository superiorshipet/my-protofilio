import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Globe2, Sparkles, Terminal, Cpu, ShieldCheck } from 'lucide-react';
import { Globe } from './Globe';

export function AboutBento() {
  const [time, setTime] = useState('');

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

        {/* Bento Grid: 2 balanced columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="group relative rounded-3xl border border-[var(--space-border)] bg-[var(--space-panel)] p-8 transition-all duration-300 hover:border-[var(--space-cyan)]/45 overflow-hidden flex flex-col justify-between shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--space-cyan)]/10 blur-3xl group-hover:bg-[var(--space-cyan)]/18 transition-colors pointer-events-none" />
            
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
                I engineer backend-heavy, resilient architectures and responsive web platforms. My work blends modern clean architecture (C#, .NET Core, Python) with fluid, accessible interfaces (React, TypeScript, Motion). Every service is designed with modularity, high concurrency, and real-world scale in mind.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-5 border-t border-[var(--space-border)]">
              {['Clean Architecture', 'Microservices', 'REST & SignalR', 'Event-Driven', 'Cloud Native'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--space-border)] bg-[var(--space-panel-strong)] px-3 py-1 text-xs text-[var(--space-starlight)]/90 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Live Time Zone Clock & 3D Interactive Detailed Globe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative rounded-3xl border border-[var(--space-border)] bg-[var(--space-panel)] p-8 transition-all duration-300 hover:border-[var(--space-cyan)]/45 overflow-hidden flex flex-col justify-between shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl"
          >
            <div className="absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-[var(--space-violet)]/16 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--space-cyan)] mb-1">
                  <Clock className="h-4 w-4" />
                  Time Zone
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-[var(--space-muted)]">
                  Cairo, Egypt (UTC+2 / UTC+3)
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <div className="font-display text-2xl md:text-3xl font-extrabold text-[var(--space-starlight)] tabular-nums tracking-tight">
                  {time || '12:00:00 AM'}
                </div>
                <Globe2 className="h-5 w-5 text-[var(--space-cyan)]/80" />
              </div>
            </div>

            {/* Interactive 3D Spinning Globe (Draggable & Detailed) */}
            <div className="relative z-10 my-2 flex items-center justify-center min-h-[260px] sm:min-h-[290px]">
              <Globe className="max-w-[340px]" />
            </div>

            <div className="relative z-10 flex items-center justify-between gap-3 pt-3 border-t border-[var(--space-border)]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-emerald-400">
                  Open to Remote & Global Work
                </span>
              </div>
              <span className="text-[11px] font-mono text-[var(--space-muted)] hidden sm:inline">
                Drag to rotate 🌍
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
            className="group relative rounded-3xl border border-[var(--space-border)] bg-[var(--space-panel)] p-8 transition-all duration-300 hover:border-[var(--space-cyan)]/45 overflow-hidden flex flex-col justify-between shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl"
          >
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[var(--space-rose)]/12 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--space-cyan)] mb-4">
                <ShieldCheck className="h-4 w-4" />
                Core Philosophy
              </div>
              <div className="font-display text-4xl md:text-5xl font-black tracking-tighter text-[var(--space-starlight)]/90 mb-4">
                CODE IS CRAFT
              </div>
              <p className="text-sm md:text-base text-[var(--space-moon)] leading-relaxed">
                Writing clean, documented, and resilient code that teams love to collaborate on. Believing that architecture discipline upfront guarantees effortless scaling in production.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[var(--space-border)]">
              {['SOLID', 'DRY', 'TDD', 'Design Patterns', 'Domain-Driven Design'].map((badge) => (
                <span
                  key={badge}
                  className="rounded-md border border-[var(--space-border)] bg-[var(--space-panel-strong)] px-2.5 py-1 text-xs font-mono font-medium text-[var(--space-cyan)]"
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
            className="group relative rounded-3xl border border-[var(--space-border)] bg-[var(--space-panel)] p-8 transition-all duration-300 hover:border-[var(--space-cyan)]/45 overflow-hidden flex flex-col justify-between shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--space-violet)]/8 via-transparent to-[var(--space-cyan)]/8 pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--space-cyan)] mb-4">
                <Cpu className="h-4 w-4" />
                Tech Stack Core
              </div>
              <h4 className="font-display text-2xl font-bold text-[var(--space-starlight)] mb-2">
                Modern Tools & Runtimes
              </h4>
              <p className="text-xs text-[var(--space-moon)] mb-6">
                Hands-on production expertise across the full engineering lifecycle:
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-[var(--space-border)] pb-2.5">
                <span className="text-[var(--space-muted)]">Backend & APIs</span>
                <span className="font-semibold text-[var(--space-starlight)]">C#, ASP.NET Core, Python, Go</span>
              </div>
              <div className="flex items-center justify-between border-b border-[var(--space-border)] pb-2.5">
                <span className="text-[var(--space-muted)]">Frontend Architecture</span>
                <span className="font-semibold text-[var(--space-starlight)]">React, TypeScript, Tailwind CSS</span>
              </div>
              <div className="flex items-center justify-between border-b border-[var(--space-border)] pb-2.5">
                <span className="text-[var(--space-muted)]">Databases & Caches</span>
                <span className="font-semibold text-[var(--space-starlight)]">SQL Server, PostgreSQL, Redis</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--space-muted)]">DevOps & Infrastructure</span>
                <span className="font-semibold text-[var(--space-starlight)]">Docker, Git, Linux, Azure, CI/CD</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
