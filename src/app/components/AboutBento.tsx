import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Globe2, Sparkles, Terminal } from 'lucide-react';
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

        {/* Bento Grid: 2 clean cards (Bio & TimeZone Globe) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Card 1: Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="group relative rounded-3xl border border-[var(--space-border)] bg-[var(--space-panel)] p-8 transition-all duration-300 hover:border-[var(--space-cyan)]/45 overflow-hidden flex flex-col justify-between shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl min-h-[440px]"
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

          {/* Card 2: Time Zone Card with 3D Rotating Globe from Reference Branch */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative rounded-3xl border border-[var(--space-border)] bg-[var(--space-panel)] p-8 transition-all duration-300 hover:border-[var(--space-cyan)]/45 overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl min-h-[440px] flex flex-col justify-between"
          >
            {/* Ambient background stars / glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-transparent to-cyan-950/20 pointer-events-none" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[var(--space-cyan)]/5 blur-3xl pointer-events-none" />

            {/* 3D Globe Figure Positioned exactly like reference TimeZoneCard */}
            <figure className="absolute -right-24 sm:-right-12 md:left-[24%] lg:left-[26%] -top-10 sm:-top-6 md:top-[2%] pointer-events-auto select-none">
              <Globe />
            </figure>

            {/* Left Content Column */}
            <div className="relative z-10 max-w-[62%] sm:max-w-[52%]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--space-cyan)] mb-2">
                <Clock className="h-4 w-4" />
                Time Zone
              </div>
              <h4 className="font-display text-xl sm:text-2xl font-bold text-[var(--space-starlight)] mb-2">
                Cairo, Egypt
              </h4>
              <p className="text-xs sm:text-sm text-[var(--space-moon)] leading-relaxed mb-4">
                I’m based in Cairo / Tanta, flexible with time zone communications and available for remote work worldwide.
              </p>

              {/* Live Digital Cairo Clock */}
              <div className="inline-flex items-center gap-2.5 rounded-2xl border border-[var(--space-border)] bg-[var(--space-panel-strong)]/80 px-4 py-2 backdrop-blur-md">
                <Globe2 className="h-4 w-4 text-[var(--space-cyan)] animate-spin-slow" />
                <span className="font-mono text-base sm:text-lg font-bold text-[var(--space-starlight)] tabular-nums">
                  {time || '12:00:00 AM'}
                </span>
                <span className="text-[10px] uppercase font-semibold text-[var(--space-muted)]">
                  UTC+2
                </span>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="relative z-10 flex items-center justify-between gap-3 pt-4 border-t border-[var(--space-border)] mt-6">
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
        </div>
      </div>
    </section>
  );
}
