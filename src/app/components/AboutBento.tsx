import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe2, Clock } from 'lucide-react';
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
    <section id="about" className="relative py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Information & Cairo Time */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--space-cyan)] backdrop-blur w-fit">
              <Globe2 className="h-3.5 w-3.5 text-[var(--space-cyan)]" />
              Global Reach & Time Zone
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--space-starlight)] mb-4">
              Cairo, Egypt
            </h2>

            <p className="text-base sm:text-lg text-[var(--space-moon)] leading-relaxed max-w-xl mb-8">
              Based in Egypt (UTC+2) and flexible with global communications. Collaborating seamlessly with engineering teams, startups, and remote organizations worldwide.
            </p>

            {/* Live Cairo Clock & Availability Card */}
            <div className="flex flex-wrap items-center gap-5 p-5 rounded-2xl border border-[var(--space-border)] bg-[var(--space-panel)]/80 backdrop-blur-xl w-fit shadow-[0_12px_40px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[var(--space-cyan)]" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--space-muted)]">
                    Local Time (Cairo)
                  </span>
                  <span className="font-mono text-2xl font-bold text-[var(--space-starlight)] tabular-nums">
                    {time || '12:00:00 AM'}
                  </span>
                </div>
              </div>

              <div className="hidden sm:block h-10 w-px bg-[var(--space-border)]" />

              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--space-muted)]">
                    Availability
                  </span>
                  <span className="text-sm font-semibold text-emerald-400">
                    Open to Remote & Global Work
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs font-mono text-[var(--space-muted)] mt-5 flex items-center gap-2">
              <span className="text-base">🌍</span> Drag the Earth in 3D space to rotate in any direction
            </p>
          </motion.div>

          {/* Right Column: Full Round 3D Earth Globe (No black frame, pure space cosmos) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center relative"
          >
            <Globe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
