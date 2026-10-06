import { Globe } from './Globe';
import { Sparkles } from './Sparkles';

export function AboutBento() {
  return (
    <section id="about" className="relative overflow-hidden py-16 md:py-24">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[70vw] -translate-x-1/2 bg-gradient-to-b from-[var(--space-cyan)]/10 via-[var(--space-violet)]/8 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="relative rounded-3xl p-6 md:p-9 border border-white/10 bg-gradient-to-tl from-[#3A3A3A] via-[#242424] to-[#3A3A3A] h-[17rem] sm:h-[19rem] md:h-[21rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1">
          {/* Sparkles particle starfield */}
          <Sparkles className="w-full h-full" />

          {/* Left Text Content */}
          <div className="z-10 absolute inset-y-6 md:inset-y-9 left-6 md:left-9 w-[55%] sm:w-[50%] pointer-events-none">
            <h3 className="mt-2 mb-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Time Zone
            </h3>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              I’m based in Tanta, open to work remotely
            </p>
          </div>

          {/* 3D Rotating Earth Globe */}
          <figure className="absolute left-[24%] sm:left-[30%] top-[6%] sm:top-[10%] pointer-events-auto">
            <Globe />
          </figure>
        </div>
      </div>
    </section>
  );
}
