import createGlobe from 'cobe';
import { useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

const MOVEMENT_DAMPING = 1400;
const PI = Math.PI;

export const GLOBE_CONFIG = {
  width: 900,
  height: 900,
  devicePixelRatio: 2,
  phi: 4.17,
  theta: 0.3,
  dark: 1,
  diffuse: 0.5,
  mapSamples: 16000,
  mapBrightness: 1.35,
  baseColor: [0.39, 0.96, 1] as [number, number, number], // Space Cyan dots matching design theme
  markerColor: [0.39, 0.96, 1] as [number, number, number], // Space Cyan markers
  glowColor: [0.39, 0.96, 1] as [number, number, number], // Space Cyan atmospheric glow
  markers: [
    { location: [30.0444, 31.2357], size: 0.08 }, // Egypt
    { location: [24.7136, 46.6753], size: 0.08 }, // Saudi Arabia
    { location: [41.0082, 28.9784], size: 0.08 }, // Turkey
    { location: [40.7128, -74.006], size: 0.08 }, // USA
  ],
};

export type CalloutAlign = 'top' | 'left' | 'right' | 'bottom';

export const GLOBE_HUBS = [
  // Egypt: Anchored Westward (Left into Africa) to give full breathing room from Gulf
  { id: 'egypt', flag: '🇪🇬', labelEn: 'Egypt', lat: 30.0444, lon: 31.2357, roleEn: 'Core Base & Remote Training', calloutAlign: 'left' as CalloutAlign },
  // Saudi Arabia: Anchored Eastward (Right into Gulf) eliminating overlap with Egypt
  { id: 'saudi', flag: '🇸🇦', labelEn: 'Saudi Arabia', lat: 24.7136, lon: 46.6753, roleEn: 'Freelance & Enterprise Platforms', calloutAlign: 'right' as CalloutAlign },
  // Turkey: Anchored Northward (Top into Black Sea/Europe) keeping Mediterranean clear
  { id: 'turkey', flag: '🇹🇷', labelEn: 'Turkey', lat: 41.0082, lon: 28.9784, roleEn: 'Luxira Holding', calloutAlign: 'top' as CalloutAlign },
  // USA: Anchored Westward (Left across North America) with streamlined spacing
  { id: 'usa', flag: '🇺🇸', labelEn: 'USA', lat: 40.7128, lon: -74.006, roleEn: 'Star+Games', calloutAlign: 'left' as CalloutAlign },
] as const;

export type HubId = typeof GLOBE_HUBS[number]['id'];

function shortestAngleDiff(current: number, target: number) {
  const TWO_PI = PI * 2;
  return ((target - current) % TWO_PI + TWO_PI * 1.5) % TWO_PI - PI;
}

function cobeProject(lat: number, lon: number, phi: number, theta: number = 0.3) {
  const r = (lat * PI) / 180;
  const a = (lon * PI) / 180 - PI;
  const cosR = Math.cos(r);
  const px = -cosR * Math.cos(a);
  const py = Math.sin(r);
  const pz = cosR * Math.sin(a);

  const ee = 0.8;
  const p = 0.05;
  const r_rad = ee + p;
  const t_vec = [px * r_rad, py * r_rad, pz * r_rad];

  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  const cosP = Math.cos(phi);
  const sinP = Math.sin(phi);

  const c = cosP * t_vec[0] + sinP * t_vec[2];
  const s = sinP * sinT * t_vec[0] + cosT * t_vec[1] - cosP * sinT * t_vec[2];
  const isFront = -sinP * cosT * t_vec[0] + sinT * t_vec[1] + cosP * cosT * t_vec[2] >= 0;

  return {
    xPct: ((c + 1) / 2) * 100,
    yPct: ((-s + 1) / 2) * 100,
    isFront,
  };
}

function getCalloutClasses(align: CalloutAlign) {
  switch (align) {
    case 'top':
      return 'bottom-3.5 left-1/2 -translate-x-1/2 mb-0.5';
    case 'left':
      return 'right-3.5 top-1/2 -translate-y-1/2 mr-0.5';
    case 'right':
      return 'left-3.5 top-1/2 -translate-y-1/2 ml-0.5';
    case 'bottom':
      return 'top-3.5 left-1/2 -translate-x-1/2 mt-0.5';
  }
}

export interface GlobeProps {
  className?: string;
  config?: typeof GLOBE_CONFIG;
  activeHubId?: HubId | null;
  targetPhi?: number | null;
  onSelectHub?: (id: HubId) => void;
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
  activeHubId,
  targetPhi,
  onSelectHub,
}: GlobeProps) {
  let phi = config.phi ?? 4.17;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const pointerInteractionMovement = useRef(0);
  const targetPhiRef = useRef<number | null>(targetPhi ?? null);

  const pinRefs = useRef<Record<HubId, HTMLButtonElement | null>>({
    egypt: null,
    saudi: null,
    turkey: null,
    usa: null,
  });

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const thetaMotion = useMotionValue(0);
  const thetaSpring = useSpring(thetaMotion, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  // Keep targetPhiRef in sync when targetPhi prop updates
  useEffect(() => {
    if (typeof targetPhi === 'number') {
      targetPhiRef.current = targetPhi;
    }
  }, [targetPhi]);

  const updatePointerInteraction = (coords: { x: number; y: number } | null) => {
    pointerInteracting.current = coords;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = coords !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: number, clientY: number) => {
    if (pointerInteracting.current !== null) {
      const deltaX = clientX - pointerInteracting.current.x;
      const deltaY = clientY - pointerInteracting.current.y;
      pointerInteractionMovement.current = deltaX;
      r.set(r.get() + deltaX / MOVEMENT_DAMPING);

      // Clamp vertical motion to maintain natural planetary orientation
      const nextTheta = thetaMotion.get() + deltaY / MOVEMENT_DAMPING;
      const clampedTheta = Math.max(-0.85, Math.min(0.85, nextTheta));
      thetaMotion.set(clampedTheta);

      pointerInteracting.current = { x: clientX, y: clientY };
      // Cancel automatic rotation targeting when user manually grabs
      targetPhiRef.current = null;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvas) {
        width = canvas.offsetWidth || 500;
      }
    };

    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvas, {
      ...config,
      width: (width || 500) * 2,
      height: (width || 500) * 2,
    });

    let animId: number;

    const animate = () => {
      // Smooth targeting rotation or ambient spin
      if (targetPhiRef.current !== null && !pointerInteracting.current) {
        const currentPhi = phi + rs.get();
        const diff = shortestAngleDiff(currentPhi, targetPhiRef.current);
        if (Math.abs(diff) > 0.005) {
          phi += diff * 0.08;
        } else {
          phi = targetPhiRef.current - rs.get();
          targetPhiRef.current = null;
        }
      } else if (!pointerInteracting.current) {
        phi += 0.003;
      }

      const currentPhi = phi + rs.get();
      const baseTheta = config.theta ?? 0.3;
      const currentTheta = Math.max(-0.95, Math.min(0.95, baseTheta + thetaSpring.get()));

      if (globe && typeof (globe as any).update === 'function') {
        (globe as any).update({
          phi: currentPhi,
          theta: currentTheta,
          width: (width || 500) * 2,
          height: (width || 500) * 2,
        });
      }

      // Update the 4 HTML Pin coordinates on the globe
      GLOBE_HUBS.forEach((hub) => {
        const pinEl = pinRefs.current[hub.id];
        if (!pinEl) return;
        const { xPct, yPct, isFront } = cobeProject(hub.lat, hub.lon, currentPhi, currentTheta);

        if (isFront) {
          pinEl.style.left = `${xPct}%`;
          pinEl.style.top = `${yPct}%`;
          pinEl.style.opacity = '1';
          pinEl.style.pointerEvents = 'auto';
        } else {
          pinEl.style.opacity = '0';
          pinEl.style.pointerEvents = 'none';
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    setTimeout(() => {
      if (canvas) {
        canvas.style.opacity = '1';
      }
    }, 50);

    return () => {
      cancelAnimationFrame(animId);
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [rs, thetaSpring, config]);

  return (
    <div
      className={twMerge(
        'relative mx-auto flex items-center justify-center aspect-square w-full max-w-[460px] sm:max-w-[500px]',
        className
      )}
    >
      {/* Interactive Canvas */}
      <canvas
        className="w-full h-full aspect-square opacity-0 transition-opacity duration-700 [contain:layout_paint_size] select-none touch-none cursor-grab active:cursor-grabbing"
        ref={canvasRef}
        onPointerDown={(e) => {
          updatePointerInteraction({ x: e.clientX, y: e.clientY });
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches[0]) {
            updatePointerInteraction({
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
            });
          }
        }}
        onTouchEnd={() => updatePointerInteraction(null)}
        onTouchCancel={() => updatePointerInteraction(null)}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            updateMovement(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
      />

      {/* 3 Interactive Country Pins (Overlay over Cobe Globe) */}
      {GLOBE_HUBS.map((hub) => {
        const isActive = activeHubId === hub.id;
        return (
          <button
            key={hub.id}
            ref={(el) => {
              pinRefs.current[hub.id] = el;
            }}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectHub?.(hub.id);
            }}
            className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 transition-transform duration-200 select-none focus:outline-none"
            style={{
              left: '50%',
              top: '50%',
              opacity: 0,
              pointerEvents: 'none',
            }}
            aria-label={`Show experience in ${hub.labelEn}`}
          >
            {/* Centered Luminous Beacon Dot (Always precisely at location coordinate) */}
            <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 flex h-3.5 w-3.5 items-center justify-center pointer-events-none">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--space-cyan)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--space-cyan)] shadow-[0_0_12px_#64f4ff]" />
            </div>

            {/* Directional Callout Badge Container */}
            <div className={`absolute ${getCalloutClasses(hub.calloutAlign)} pointer-events-auto`}>
              {/* Futuristic HUD hairline connector stem pointing to beacon dot */}
              {hub.calloutAlign === 'left' && (
                <span className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-[1px] bg-gradient-to-r from-transparent via-[var(--space-cyan)]/60 to-[var(--space-cyan)] pointer-events-none" />
              )}
              {hub.calloutAlign === 'right' && (
                <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-[1px] bg-gradient-to-l from-transparent via-[var(--space-cyan)]/60 to-[var(--space-cyan)] pointer-events-none" />
              )}
              {hub.calloutAlign === 'top' && (
                <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-[1px] h-3.5 bg-gradient-to-b from-transparent via-[var(--space-cyan)]/60 to-[var(--space-cyan)] pointer-events-none" />
              )}

              <div
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-xl transition-all duration-200 shadow-lg whitespace-nowrap ${
                  isActive
                    ? 'border-[var(--space-cyan)] bg-[var(--space-cyan)]/25 text-[var(--space-cyan)] shadow-[0_0_16px_rgba(100,244,255,0.5)] scale-105'
                    : 'border-white/20 bg-[var(--space-midnight)]/90 text-white hover:border-[var(--space-cyan)] hover:text-[var(--space-cyan)] group-hover:scale-105'
                }`}
              >
                <span className="text-xs">{hub.flag}</span>
                <span className="whitespace-nowrap">{hub.labelEn}</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
