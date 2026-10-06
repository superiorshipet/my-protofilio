import { useState, useEffect } from 'react';
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
  // Key to re-trigger the teleportation animation sequence
  const [teleportKey, setTeleportKey] = useState(0);
  const [isBeaming, setIsBeaming] = useState(true);

  // Auto-finish high-intensity beaming state after 2.6 seconds
  useEffect(() => {
    setIsBeaming(true);
    const timer = setTimeout(() => {
      setIsBeaming(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, [teleportKey]);

  const handleReTeleport = () => {
    setTeleportKey((prev) => prev + 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full select-none pt-2 sm:pt-4">
      {/* 1. 3D Hovering UFO Saucer (Flying Saucer arriving from deep space) */}
      <motion.div
        key={`saucer-entrance-${teleportKey}`}
        // Comes from deep space behind ("يجي من بعدي")
        initial={{
          scale: 0.15,
          y: 70,
          opacity: 0,
          filter: 'blur(8px) brightness(2.2)',
        }}
        animate={{
          scale: [0.15, 1.06, 1],
          y: [70, -8, 0],
          opacity: [0, 1, 1],
          filter: [
            'blur(8px) brightness(2.2)',
            'blur(0px) brightness(1.2)',
            'blur(0px) brightness(1)',
          ],
        }}
        transition={{
          duration: 1.15,
          ease: [0.16, 1, 0.3, 1], // Smooth cinematic arrival curve
        }}
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleReTeleport}
        title="UFO Transporter • Click to re-beam"
        className="relative z-40 cursor-pointer group mb-1 sm:mb-2"
        style={{
          transform: 'translateZ(95px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Subtle Warp/Re-beam Badge on Hover */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
          <span className="rounded-full border border-[var(--space-cyan)]/50 bg-[var(--space-void)]/95 px-2.5 py-0.5 font-mono text-[9px] font-semibold text-[var(--space-cyan)] shadow-[0_0_15px_rgba(100,244,255,0.4)] backdrop-blur-md">
            🛸 Warp • Click to Re-beam
          </span>
        </div>

        {/* Ambient Saucer Energy Aura Glow */}
        <div className="absolute inset-0 -z-10 rounded-full bg-[var(--space-cyan)]/25 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />

        {/* Continuous Space Hovering Motion */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotateZ: [-0.9, 0.9, -0.9],
          }}
          transition={{
            y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
            rotateZ: { duration: 4.6, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative w-44 sm:w-56 md:w-64 drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
        >
          {/* High-Resolution 3D UFO Saucer Asset */}
          <img
            src={ufoSaucerImg}
            alt="UFO Flying Saucer Transporter"
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:brightness-110"
          />

          {/* Glowing Ventral Emitter Core Portal on Saucer Bottom */}
          <div
            className="absolute left-1/2 bottom-[1%] -translate-x-1/2 w-10 sm:w-14 h-4 sm:h-5 rounded-full bg-cyan-100 blur-[1px] shadow-[0_0_28px_10px_rgba(100,244,255,0.95)]"
            style={{
              animation: 'pulse 1.8s infinite ease-in-out',
            }}
          />

          {/* Energy Rings Aura around Saucer perimeter */}
          <div className="absolute -inset-1 rounded-full border border-[var(--space-cyan)]/20 pointer-events-none animate-pulse opacity-60" />
        </motion.div>
      </motion.div>

      {/* 2. Volumetric 3D Conical Tractor Beam ("الشعاع الضوئي") */}
      <div
        className="pointer-events-none absolute top-14 sm:top-18 bottom-2 left-1/2 -translate-x-1/2 w-60 sm:w-72 md:w-84 overflow-hidden z-20 flex justify-center"
        style={{
          transform: 'translateZ(25px)',
          transformStyle: 'preserve-3d',
          clipPath: 'polygon(38% 0%, 62% 0%, 98% 100%, 2% 100%)',
        }}
      >
        {/* Main Conical Volumetric Light Beam */}
        <motion.div
          key={`beam-${teleportKey}`}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: 1,
            opacity: isBeaming ? [0, 1, 0.88] : 0.45,
          }}
          transition={{
            scaleY: { duration: 0.55, delay: 0.9, ease: 'easeOut' },
            opacity: { duration: 0.4, delay: 0.9 },
          }}
          style={{
            transformOrigin: 'top center',
            background:
              'linear-gradient(180deg, rgba(165, 243, 252, 0.95) 0%, rgba(100, 244, 255, 0.40) 22%, rgba(100, 244, 255, 0.14) 65%, rgba(100, 244, 255, 0.02) 100%)',
          }}
          className="absolute inset-0 w-full h-full backdrop-blur-[0.5px] drop-shadow-[0_0_25px_rgba(100,244,255,0.4)]"
        />

        {/* Hyper-intense Center Ray Core */}
        <motion.div
          key={`core-${teleportKey}`}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: 1,
            opacity: isBeaming ? [0, 1, 0.9, 0.65] : 0.35,
          }}
          transition={{
            scaleY: { duration: 0.45, delay: 0.95, ease: 'easeOut' },
            opacity: { duration: 0.5, delay: 0.95 },
          }}
          style={{
            transformOrigin: 'top center',
            clipPath: 'polygon(46% 0%, 54% 0%, 72% 100%, 28% 100%)',
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(165, 243, 252, 0.7) 16%, rgba(100, 244, 255, 0.24) 60%, transparent 100%)',
          }}
          className="absolute inset-0 w-full h-full"
        />

        {/* Descending Energy Pulse Wave Rings (strictly inside cone) */}
        {[0, 1, 2, 3].map((ringIdx) => (
          <motion.div
            key={`ring-${teleportKey}-${ringIdx}`}
            initial={{ y: '5%', opacity: 0, scaleX: 0.35 }}
            animate={{
              y: ['5%', '95%'],
              opacity: [0, 0.75, 0.45, 0],
              scaleX: [0.35, 0.65, 0.95, 1.1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'linear',
              delay: 1.0 + ringIdx * 0.55,
            }}
            className="absolute top-0 w-[90%] h-8 rounded-[100%] border-t-2 border-cyan-100/70 bg-gradient-to-b from-[var(--space-cyan)]/25 to-transparent"
          />
        ))}

        {/* Ambient Flowing Micro-Particles Streaming Downwards */}
        {[14, 30, 48, 65, 82].map((leftPct, pIdx) => (
          <motion.div
            key={`p-${pIdx}`}
            animate={{
              y: [0, 380],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 1.8 + (pIdx % 3) * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: pIdx * 0.3,
            }}
            style={{ left: `${leftPct}%` }}
            className="absolute top-2 h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_8px_rgba(100,244,255,0.9)]"
          />
        ))}
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
          key={`portrait-${teleportKey}`}
          // Starts hidden until saucer parks and beam shoots down
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
            delay: 1.25, // Materializes right after beam descends
            ease: 'easeOut',
          }}
          className="relative w-full overflow-visible"
        >
          {/* Holographic Laser Scanline sweeping down on teleport */}
          <AnimatePresence>
            {isBeaming && (
              <motion.div
                key={`scanline-${teleportKey}`}
                initial={{ top: '0%', opacity: 0 }}
                animate={{
                  top: ['0%', '100%'],
                  opacity: [0, 1, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.3,
                  delay: 1.25,
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
        {/* Floor Teleport Shockwave impact ring on re-beam */}
        {isBeaming && (
          <motion.div
            key={`floor-impact-${teleportKey}`}
            initial={{ scale: 0.4, opacity: 1 }}
            animate={{ scale: 1.25, opacity: 0 }}
            transition={{ duration: 1.2, delay: 1.3, ease: 'easeOut' }}
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
            key={`satellite-${label}-${teleportKey}`}
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: 1.7 + delay, duration: 0.4 },
              scale: { delay: 1.7 + delay, duration: 0.4 },
              y: {
                delay: 2.1 + delay,
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
