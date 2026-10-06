import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe2, Clock } from 'lucide-react';
import { Globe, HubId } from './Globe';
import { WorkHubModal } from './WorkHubModal';
import { WORK_HUBS } from '../data/workHubs';

export function AboutBento() {
  const [time, setTime] = useState('');
  const [selectedHubId, setSelectedHubId] = useState<HubId | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetPhi, setTargetPhi] = useState<number | null>(null);

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

  const handleSelectHub = (id: HubId) => {
    setSelectedHubId(id);
    setIsModalOpen(true);
    setTargetPhi(WORK_HUBS[id].targetPhi);
  };

  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Information, Cairo Time & Work Hubs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--space-border)] bg-[var(--space-panel)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--space-cyan)] backdrop-blur w-fit">
              <Globe2 className="h-3.5 w-3.5 text-[var(--space-cyan)]" />
              Global Reach & Work Hubs
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--space-starlight)] mb-4">
              Cairo, Egypt
            </h2>

            <p className="text-base sm:text-lg text-[var(--space-moon)] leading-relaxed max-w-xl mb-6">
              Based in Egypt (UTC+2) and collaborating seamlessly with global teams across the United States, Turkey, and worldwide.
            </p>

            {/* Live Cairo Clock & Availability Card */}
            <div className="flex flex-wrap items-center gap-5 p-5 rounded-2xl border border-[var(--space-border)] bg-[var(--space-panel)]/80 backdrop-blur-xl w-fit shadow-[0_12px_40px_rgba(0,0,0,0.3)] mb-6">
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
            </div>

          </motion.div>

          {/* Right Column: Full Round 3D Earth Globe with 3 Interactive Markers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center relative"
          >
            <Globe
              activeHubId={selectedHubId}
              targetPhi={targetPhi}
              onSelectHub={handleSelectHub}
            />
          </motion.div>
        </div>
      </div>

      {/* Interactive Work Experience Modal */}
      <WorkHubModal
        hub={selectedHubId ? WORK_HUBS[selectedHubId] : null}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectHub={handleSelectHub}
      />
    </section>
  );
}
