import createGlobe from 'cobe';
import { useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG = {
  width: 900,
  height: 900,
  devicePixelRatio: 2,
  phi: 0.1,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.3,
  baseColor: [1, 1, 1] as [number, number, number], // Starlight white dots
  markerColor: [0.39, 0.96, 1] as [number, number, number], // Space Cyan markers
  glowColor: [0.39, 0.96, 1] as [number, number, number], // Space Cyan atmospheric halo
  markers: [
    { location: [30.0444, 31.2357] as [number, number], size: 0.08 }, // Cairo / Tanta, Egypt
    { location: [40.7128, -74.006] as [number, number], size: 0.07 }, // New York
    { location: [51.5074, -0.1278] as [number, number], size: 0.06 }, // London
    { location: [35.6762, 139.6503] as [number, number], size: 0.06 }, // Tokyo
    { location: [25.2048, 55.2708] as [number, number], size: 0.07 }, // Dubai
    { location: [-23.5505, -46.6333] as [number, number], size: 0.07 }, // Sao Paulo
    { location: [19.076, 72.8777] as [number, number], size: 0.07 }, // Mumbai
    { location: [14.5995, 120.9842] as [number, number], size: 0.05 }, // Manila
    { location: [39.9042, 116.4074] as [number, number], size: 0.07 }, // Beijing
    { location: [41.0082, 28.9784] as [number, number], size: 0.06 }, // Istanbul
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: typeof GLOBE_CONFIG;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
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
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005;
        state.phi = phi + rs.get();
        state.width = (width || 500) * 2;
        state.height = (width || 500) * 2;
      },
    });

    let animId: number;

    const animate = () => {
      if (!pointerInteracting.current) {
        phi += 0.005;
      }
      if (globe && typeof (globe as any).update === 'function') {
        (globe as any).update({
          phi: phi + rs.get(),
          width: (width || 500) * 2,
          height: (width || 500) * 2,
        });
      }
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
  }, [rs, config]);

  return (
    <div
      className={twMerge(
        'relative mx-auto flex items-center justify-center aspect-square w-full max-w-[460px] sm:max-w-[500px]',
        className
      )}
    >
      {/* Subtle Cyan Atmosphere Glow behind the full globe */}
      <div className="absolute inset-4 rounded-full bg-[var(--space-cyan)]/15 blur-2xl pointer-events-none -z-10" />

      <canvas
        className={twMerge(
          'w-full h-full aspect-square opacity-0 transition-opacity duration-700 [contain:layout_paint_size] select-none touch-none cursor-grab active:cursor-grabbing'
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
