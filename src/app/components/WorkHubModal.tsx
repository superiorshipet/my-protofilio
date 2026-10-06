import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, MapPin, Building2, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { WorkHub, WORK_HUBS, HubId } from '../data/workHubs';

interface WorkHubModalProps {
  hub: WorkHub | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectHub: (id: HubId) => void;
}

export function WorkHubModal({ hub, isOpen, onClose, onSelectHub }: WorkHubModalProps) {
  if (!hub) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-2xl rounded-3xl border border-[var(--space-border)] bg-[var(--space-midnight)]/95 p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl z-10 text-[var(--space-starlight)]"
            dir="ltr"
          >
            {/* Top Close Button & Quick Country Selectors */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--space-border)]">
              <div className="flex flex-wrap items-center gap-2">
                {(['egypt', 'saudi', 'turkey', 'usa'] as const).map((id) => {
                  const item = WORK_HUBS[id];
                  const active = hub.id === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onSelectHub(id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        active
                          ? 'bg-[var(--space-cyan)]/20 border border-[var(--space-cyan)] text-[var(--space-cyan)] shadow-[0_0_12px_rgba(100,244,255,0.3)]'
                          : 'border border-[var(--space-border)] bg-[var(--space-panel)] text-[var(--space-muted)] hover:text-[var(--space-starlight)] hover:border-white/20'
                      }`}
                    >
                      <span>{item.flag}</span>
                      <span>{item.countryEn}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-full p-2 text-[var(--space-muted)] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Header: Flag, Title & Role */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3.5">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-lg border border-white/10"
                  style={{ backgroundColor: `${hub.accentColor}18` }}
                >
                  {hub.flag}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold tracking-wider text-[var(--space-cyan)] uppercase">
                      {hub.countryEn}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-[var(--space-muted)]">
                      {hub.workTypeEn}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                    {hub.companyEn}
                  </h3>
                </div>
              </div>
            </div>

            {/* Role & Location Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-2xl border border-[var(--space-border)] bg-[var(--space-panel)]/50">
              <div className="flex items-center gap-2.5 text-sm">
                <Briefcase className="h-4 w-4 text-[var(--space-cyan)] shrink-0" />
                <div>
                  <span className="text-xs text-[var(--space-muted)] block">Role & Focus:</span>
                  <span className="font-semibold text-white">{hub.roleEn}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-sm">
                <MapPin className="h-4 w-4 text-[var(--space-violet)] shrink-0" />
                <div>
                  <span className="text-xs text-[var(--space-muted)] block">Location:</span>
                  <span className="font-semibold text-white">{hub.locationEn}</span>
                </div>
              </div>
            </div>

            {/* Highlights / Experience Details */}
            <div className="mb-6 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--space-cyan)] flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                Key Highlights & Experience
              </h4>

              <div className="space-y-2.5">
                {hub.highlightsEn.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-[var(--space-moon)] leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-1" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="mb-6">
              <span className="text-xs text-[var(--space-muted)] font-mono block mb-2">
                Engineering Stack & Architecture:
              </span>
              <div className="flex flex-wrap gap-2">
                {hub.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-[var(--space-border)] bg-[var(--space-panel-strong)] px-2.5 py-1 text-xs font-mono font-medium text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end pt-4 border-t border-[var(--space-border)]">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-xl border border-[var(--space-border)] bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
