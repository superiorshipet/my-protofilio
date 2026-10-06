import createGlobe from 'cobe';
import { useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { User } from 'lucide-react';

// Tuned for silky-smooth, effortless 1:1 rotation when dragging left and right
const MOVEMENT_DAMPING = 360;
// Gentle vertical damping prevents accidental tilt during horizontal spins
const VERTICAL_DAMPING = 1200;
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
  markers: [], // Native HTML pins provide smooth horizon fade without WebGL limb bleeding
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
  const z = -sinP * cosT * t_vec[0] + sinT * t_vec[1] + cosP * cosT * t_vec[2];

  // Accurate horizon fade: smoothly fades to 0 before hitting the limb (z <= 0.16)
  // This completely eliminates horizon compression clumping when viewing the opposite hemisphere
  const fade = Math.max(0, Math.min(1, (z - 0.16) / 0.16));

  return {
    xPct: ((c + 1) / 2) * 100,
    yPct: ((-s + 1) / 2) * 100,
    fade,
    isFront: fade > 0.01,
  };
}

function getCalloutClasses(align: CalloutAlign) {
  switch (align) {
    case 'top':
      return 'bottom-4 left-1/2 -translate-x-1/2 mb-0.5';
    case 'left':
      return 'right-4 top-1/2 -translate-y-1/2 mr-0.5';
    case 'right':
      return 'left-4 top-1/2 -translate-y-1/2 ml-0.5';
    case 'bottom':
      return 'top-4 left-1/2 -translate-x-1/2 mt-0.5';
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
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const targetPhiRef = useRef<number | null>(targetPhi ?? null);

  const pinRefs = useRef<Record<HubId, HTMLButtonElement | null>>({
    egypt: null,
    saudi: null,
    turkey: null,
    usa: null,
  });

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 0.9,
    damping: 26,
    stiffness: 120,
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
    lastTimeRef.current = Date.now();
    if (coords !== null) {
      velocityRef.current = 0;
    }
    if (canvasRef.current) {
      canvasRef.current.style.cursor = coords !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: number, clientY: number) => {
    if (pointerInteracting.current !== null) {
      const now = Date.now();
      const dt = Math.max(now - lastTimeRef.current, 8);
      const deltaX = clientX - pointerInteracting.current.x;
      const deltaY = clientY - pointerInteracting.current.y;
      
      // Calculate instantaneous horizontal drag velocity
      velocityRef.current = (deltaX / MOVEMENT_DAMPING) / (dt / 16.6);
      lastTimeRef.current = now;

      pointerInteractionMovement.current = deltaX;
      r.set(r.get() + deltaX / MOVEMENT_DAMPING);

      // Stabilized vertical motion so horizontal spinning remains fluid and prioritized
      const nextTheta = thetaMotion.get() + deltaY / VERTICAL_DAMPING;
      const clampedTheta = Math.max(-0.6, Math.min(0.6, nextTheta));
      thetaMotion.set(clampedTheta);

      pointerInteracting.current = { x: clientX, y: clientY };
      // Cancel automatic rotation targeting when user manually grabs
      targetPhiRef.current = null;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe: any;

    const onResize = () => {
      if (canvas) {
        const newWidth = canvas.offsetWidth || 500;
        if (newWidth !== width) {
          width = newWidth;
          if (globe && typeof globe.update === 'function') {
            globe.update({
              width: width * 2,
              height: width * 2,
            });
          }
        }
      }
    };

    window.addEventListener('resize', onResize);
    width = canvas.offsetWidth || 500;

    // Lighter WebGL settings on phones: lower pixel ratio and fewer map samples.
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 2);
    const sizeMultiplier = isMobile ? 1.4 : 2;
    const initialWidth = width || (isMobile ? 340 : 500);
    globe = createGlobe(canvas, {
      ...config,
      devicePixelRatio: dpr,
      mapSamples: isMobile ? 6000 : config.mapSamples,
      width: initialWidth * sizeMultiplier,
      height: initialWidth * sizeMultiplier,
    });

    // Completely pause all WebGL updates when the globe is off-screen or tab is hidden.
    let visible = true;
    let animId = 0;
    let isRunning = false;

    const startLoop = () => {
      if (!isRunning && visible && !document.hidden) {
        isRunning = true;
        animId = requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      if (isRunning) {
        cancelAnimationFrame(animId);
        isRunning = false;
      }
    };

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) {
              startLoop();
            } else {
              stopLoop();
            }
          })
        : null;
    io?.observe(canvas);

    const onVisibilityChange = () => {
      if (!document.hidden && visible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const animate = () => {
      if (!visible || document.hidden) {
        isRunning = false;
        return;
      }
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
        if (Math.abs(velocityRef.current) > 0.0001) {
          phi += velocityRef.current;
          velocityRef.current *= 0.94;
        } else {
          velocityRef.current = 0;
          phi += 0.003;
        }
      }

      const currentPhi = phi + rs.get();
      const baseTheta = config.theta ?? 0.3;
      const currentTheta = Math.max(-0.95, Math.min(0.95, baseTheta + thetaSpring.get()));

      if (globe && typeof (globe as any).update === 'function') {
        (globe as any).update({
          phi: currentPhi,
          theta: currentTheta,
        });
      }

      // Update the 4 HTML Pin coordinates on the globe
      GLOBE_HUBS.forEach((hub) => {
        const pinEl = pinRefs.current[hub.id];
        if (!pinEl) return;
        const { xPct, yPct, fade, isFront } = cobeProject(hub.lat, hub.lon, currentPhi, currentTheta);

        if (isFront) {
          pinEl.style.left = `${xPct}%`;
          pinEl.style.top = `${yPct}%`;
          pinEl.style.opacity = `${fade}`;
          pinEl.style.pointerEvents = fade > 0.35 ? 'auto' : 'none';
        } else {
          pinEl.style.opacity = '0';
          pinEl.style.pointerEvents = 'none';
        }
      });

      animId = requestAnimationFrame(animate);
    };

    startLoop();

    setTimeout(() => {
      if (canvas) {
        canvas.style.opacity = '1';
      }
    }, 50);

    return () => {
      stopLoop();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      io?.disconnect();
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
            {/* Miniature Glowing Person Avatar Pin (زي الاشخاص في الاول) */}
            <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <span className={`absolute inline-flex h-6 w-6 animate-ping rounded-full bg-[var(--space-cyan)] ${isActive ? 'opacity-70' : 'opacity-35'}`} />
              <div className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-200 bg-[var(--space-midnight)]/90 ${
                isActive
                  ? 'border-[var(--space-cyan)] shadow-[0_0_15px_rgba(100,244,255,0.95)] scale-110'
                  : 'border-[var(--space-cyan)]/70 shadow-[0_0_10px_rgba(100,244,255,0.6)] group-hover:border-[var(--space-cyan)] group-hover:shadow-[0_0_14px_rgba(100,244,255,0.8)]'
              }`}>
                <User className={`h-2.5 w-2.5 transition-colors ${isActive ? 'text-white' : 'text-[var(--space-cyan)] group-hover:text-white'}`} />
              </div>
            </div>

            {/* Directional Callout Badge Container */}
            <div className={`absolute ${getCalloutClasses(hub.calloutAlign)} pointer-events-auto`}>
              {/* Futuristic HUD hairline connector stem pointing to beacon dot */}
              {hub.calloutAlign === 'left' && (
                <span className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-gradient-to-r from-transparent via-[var(--space-cyan)]/60 to-[var(--space-cyan)] pointer-events-none" />
              )}
              {hub.calloutAlign === 'right' && (
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-gradient-to-l from-transparent via-[var(--space-cyan)]/60 to-[var(--space-cyan)] pointer-events-none" />
              )}
              {hub.calloutAlign === 'top' && (
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-gradient-to-b from-transparent via-[var(--space-cyan)]/60 to-[var(--space-cyan)] pointer-events-none" />
              )}

              <div
                className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-none backdrop-blur-xl transition-all duration-200 shadow-[0_2px_10px_rgba(0,0,0,0.5)] whitespace-nowrap ${
                  isActive
                    ? 'border-[var(--space-cyan)] bg-[var(--space-cyan)]/25 text-[var(--space-cyan)] shadow-[0_0_16px_rgba(100,244,255,0.5)] scale-105'
                    : 'border-white/20 bg-[var(--space-midnight)]/95 text-white/95 hover:border-[var(--space-cyan)] hover:text-[var(--space-cyan)] group-hover:scale-105'
                }`}
              >
                <span className="text-[11px]">{hub.flag}</span>
                <span className="whitespace-nowrap tracking-wide">{hub.labelEn}</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
