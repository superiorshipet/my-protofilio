import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import ufoSaucerImg from '../../imports/ufo_saucer.png';
import portraitImg from '../../imports/image.png';

interface TechSatellite {
  Icon: LucideIcon;
  label: string;
  delay: number;
}

interface SpaceshipTeleporterProps {
  techIcons: TechSatellite[];
}

export function SpaceshipTeleporter({ techIcons }: SpaceshipTeleporterProps) {
  const [teleportKey, setTeleportKey] = useState(0);
  const [isBeaming, setIsBeaming] = useState(true);
  const lastTriggerRef = useRef(0);

  // Trigger / replay the primary UFO entrance and teleportation sequence
  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastTriggerRef.current < 600) return; // Prevent spamming while animation initializes
    lastTriggerRef.current = now;
    setIsBeaming(true);
    setTeleportKey((prev) => prev + 1);
  };

  // Auto-finish high-intensity beaming state after 2.6 seconds
  useEffect(() => {
    setIsBeaming(true);
    const timer = setTimeout(() => {
      setIsBeaming(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, [teleportKey]);

  return (
    <div
      key={teleportKey}
      className="relative flex flex-col items-center justify-center w-full select-none pt-2 sm:pt-4"
    >
      {/* 1. 3D Hovering UFO Saucer (Click to replay teleporter animation) */}
      <motion.div
        role="button"
        tabIndex={0}
        onClick={handleReplay}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleReplay(e as any);
          }
        }}
        aria-label="Replay teleporter animation"
        title="Click to replay UFO teleportation"
        initial={{
          scale: 0.15,
          y: 70,
          opacity: 0,
          filter: 'blur(8px) brightness(2.2)',
        }}
        animate={{
          scale: 1,
          y: 0,
          opacity: 1,
          filter: 'blur(0px) brightness(1)',
        }}
        transition={{
          duration: 1.15,
          ease: [0.16, 1, 0.3, 1], // Smooth cinematic arrival curve
        }}
        className="relative z-40 mb-1 sm:mb-2 select-none cursor-pointer group focus:outline-none"
        style={{
          transform: 'translateZ(95px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Ambient Saucer Energy Aura Glow */}
        <div className="absolute inset-0 -z-10 rounded-full bg-[var(--space-cyan)]/25 blur-2xl opacity-75 group-hover:opacity-100 group-hover:bg-[var(--space-cyan)]/40 transition-all duration-300" />

        {/* Continuous Space Hovering Motion with Clean Scale-on-Hover & Click-feedback */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotateZ: [-0.9, 0.9, -0.9],
          }}
          transition={{
            y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
            rotateZ: { duration: 4.6, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative w-44 sm:w-56 md:w-64 drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)] transition-all duration-200 group-hover:scale-105 group-active:scale-95"
        >
          {/* High-Resolution 3D UFO Saucer Asset */}
          <img
            src={ufoSaucerImg}
            alt="UFO Flying Saucer"
            className="w-full h-auto object-contain transition-transform duration-300"
          />

          {/* Glowing Ventral Emitter Core Portal on Saucer Bottom */}
          <div
            className="absolute left-1/2 bottom-[1%] -translate-x-1/2 w-10 sm:w-14 h-4 sm:h-5 rounded-full bg-cyan-100 blur-[1px] shadow-[0_0_28px_10px_rgba(100,244,255,0.95)] group-hover:shadow-[0_0_36px_14px_rgba(100,244,255,1)] transition-shadow duration-300"
            style={{
              animation: 'pulse 1.8s infinite ease-in-out',
            }}
          />

          {/* Energy Rings Aura around Saucer perimeter */}
          <div className="absolute -inset-1 rounded-full border border-[var(--space-cyan)]/20 pointer-events-none animate-pulse opacity-60 group-hover:border-[var(--space-cyan)]/50 transition-colors" />
        </motion.div>
      </motion.div>

      {/* 2. Volumetric 3D Conical Tractor Beam (Pure SVG Polygon - Zero Box Artifacts) */}
      <div
        className="pointer-events-none absolute top-14 sm:top-18 bottom-2 left-1/2 -translate-x-1/2 w-64 sm:w-76 md:w-88 z-20 flex justify-center"
        style={{
          transform: 'translateZ(25px)',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: 1,
            opacity: isBeaming ? 1 : 0.45,
          }}
          transition={{
            scaleY: { duration: 0.55, delay: 0.85, ease: 'easeOut' },
            opacity: { duration: 0.45, delay: 0.85 },
          }}
          style={{ transformOrigin: 'top center' }}
          className="relative w-full h-full"
        >
          <svg
            viewBox="0 0 300 450"
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible"
          >
            <defs>
              {/* Outer Beam Gradient */}
              <linearGradient id="tractorBeamOuter" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#cffafe" stopOpacity="0.85" />
                <stop offset="16%" stopColor="#64f4ff" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#64f4ff" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#64f4ff" stopOpacity="0.0" />
              </linearGradient>

              {/* Inner Core Beam Gradient */}
              <linearGradient id="tractorBeamCore" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="14%" stopColor="#a5f3fc" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#64f4ff" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#64f4ff" stopOpacity="0.0" />
              </linearGradient>

              {/* Saucer vent emitter hotspot */}
              <radialGradient id="apexHotspot" cx="50%" cy="0%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="40%" stopColor="#64f4ff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#64f4ff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ambient Conical Beam */}
            <polygon
              points="114,0 186,0 295,450 5,450"
              fill="url(#tractorBeamOuter)"
            />

            {/* Intense Center Ray Core */}
            <polygon
              points="132,0 168,0 225,450 75,450"
              fill="url(#tractorBeamCore)"
            />

            {/* Saucer vent emitter hotspot */}
            <ellipse cx="150" cy="2" rx="36" ry="8" fill="url(#apexHotspot)" />
          </svg>

          {/* Descending Conical Energy Waves */}
          {[0, 1, 2].map((ringIdx) => (
            <motion.div
              key={`ring-${ringIdx}`}
              initial={{ y: '5%', opacity: 0, scaleX: 0.35 }}
              animate={{
                y: ['5%', '92%'],
                opacity: [0, 0.7, 0.35, 0],
                scaleX: [0.35, 0.65, 0.95, 1.1],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'linear',
                delay: 1.0 + ringIdx * 0.7,
              }}
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-8 rounded-[100%] border-t-2 border-cyan-100/70 bg-gradient-to-b from-[var(--space-cyan)]/20 to-transparent"
            />
          ))}

          {/* Descending Light Particles */}
          {[20, 35, 50, 65, 80].map((leftPct, pIdx) => (
            <motion.div
              key={`p-${pIdx}`}
              animate={{
                y: [0, 360],
                opacity: [0, 0.85, 0],
              }}
              transition={{
                duration: 1.8 + (pIdx % 3) * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.8 + pIdx * 0.3,
              }}
              style={{ left: `${leftPct}%` }}
              className="pointer-events-none absolute top-2 h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_8px_rgba(100,244,255,0.9)]"
            />
          ))}
        </motion.div>
      </div>

      {/* 3. Mohamed's Holographic Photo Materialization Container ("يظهر صورتي") */}
      <div
        className="relative w-full max-w-[220px] sm:max-w-[270px] md:max-w-[310px] z-30"
        style={{
          transform: 'translateZ(50px)',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
            filter: 'brightness(2.6) drop-shadow(0 0 50px rgba(100, 244, 255, 0.95))',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter:
              'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 35px rgba(100, 244, 255, 0.25)) brightness(1)',
          }}
          transition={{
            duration: 1.2,
            delay: 1.15, // Materializes right after beam descends
            ease: 'easeOut',
          }}
          className="relative w-full overflow-visible"
        >
          {/* Holographic Laser Scanline sweeping down on initial materialize */}
          <AnimatePresence>
            {isBeaming && (
              <motion.div
                initial={{ top: '0%', opacity: 0 }}
                animate={{
                  top: ['0%', '100%'],
                  opacity: [0, 1, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.3,
                  delay: 1.15,
                  ease: 'easeInOut',
                }}
                className="pointer-events-none absolute left-0 right-0 z-40 h-1 bg-gradient-to-r from-transparent via-cyan-200 to-transparent shadow-[0_0_20px_6px_rgba(100,244,255,0.9)]"
              />
            )}
          </AnimatePresence>

          {/* Pure Frameless Character Image */}
          <img
            src={portraitImg}
            alt="Mohamed Shipet (Superior)"
            className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
          />
        </motion.div>
      </div>

      {/* 4. 3D Cosmic Orbit Teleporter Rings beneath figure */}
      <div
        className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 w-60 sm:w-72 md:w-84 h-20 rounded-[100%] border border-[var(--space-cyan)]/35 shadow-[0_0_30px_rgba(100,244,255,0.3)] z-10"
        style={{
          transform: 'rotateX(75deg) translateZ(-30px)',
        }}
      >
        {/* Floor Teleport Shockwave impact ring on initial materialize */}
        {isBeaming && (
          <motion.div
            initial={{ scale: 0.4, opacity: 1 }}
            animate={{ scale: 1.25, opacity: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 rounded-[100%] border-2 border-cyan-200 shadow-[0_0_25px_rgba(100,244,255,0.9)]"
          />
        )}
      </div>

      <div
        className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 w-44 sm:w-56 md:w-68 h-14 rounded-[100%] border border-[var(--space-cyan)]/20 z-10"
        style={{
          transform: 'rotateX(75deg) translateZ(-20px)',
        }}
      />

      {/* 5. Orbiting 3D Tech Satellites floating around Mohamed */}
      {techIcons.map(({ Icon, label, delay }, index) => {
        const positions = [
          { top: '20%', right: '-8px' },
          { bottom: '26%', right: '-12px' },
          { top: '32%', left: '-12px' },
          { bottom: '12%', left: '-8px' },
        ];
        const pos = positions[index] || {};
        return (
          <motion.div
            key={`satellite-${label}`}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 1.6 + delay, duration: 0.4 },
              scale: { delay: 1.6 + delay, duration: 0.4 },
              y: {
                delay: 2.0 + delay,
                duration: 3 + index * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            className="absolute z-30 pointer-events-none"
            style={{
              top: pos.top,
              bottom: pos.bottom,
              right: pos.right,
              left: pos.left,
              transform:
                index % 2 === 0 ? 'translateZ(85px)' : 'translateZ(105px)',
            }}
          >
            <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-[var(--space-cyan)]/40 bg-[var(--space-panel)]/90 text-[var(--space-cyan)] shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_15px_rgba(100,244,255,0.25)] backdrop-blur-md">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
