import createGlobe from 'cobe';
import { useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0.1,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1] as [number, number, number],
  markerColor: [0.39, 0.96, 1] as [number, number, number],
  glowColor: [1, 1, 1] as [number, number, number],
  markers: [
    { location: [30.0444, 31.2357] as [number, number], size: 0.09 }, // Cairo, Egypt
    { location: [40.7128, -74.006] as [number, number], size: 0.07 }, // New York
    { location: [51.5074, -0.1278] as [number, number], size: 0.06 }, // London
    { location: [35.6762, 139.6503] as [number, number], size: 0.06 }, // Tokyo
    { location: [25.2048, 55.2708] as [number, number], size: 0.07 }, // Dubai
    { location: [-23.5505, -46.6333] as [number, number], size: 0.07 }, // Sao Paulo
    { location: [19.076, 72.8777] as [number, number], size: 0.07 }, // Mumbai
    { location: [14.5995, 120.9842] as [number, number], size: 0.05 }, // Manila
  ],
};

export function Globe({ className = '' }: { className?: string }) {
  let phi = 0;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);

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
      pointerInteracting.current = clientX;
      r.set(r.get() + delta / 350);
    }
  };

  useEffect(() => {
    let width = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvas) {
        width = canvas.offsetWidth;
      }
    };

    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvas, {
      ...GLOBE_CONFIG,
      width: (width || 320) * 2,
      height: (width || 320) * 2,
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          phi += 0.005;
        }
        state.phi = phi + rs.get();
        if (width) {
          state.width = width * 2;
          state.height = width * 2;
        }
      },
    });

    setTimeout(() => {
      if (canvas) canvas.style.opacity = '1';
    }, 100);

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [rs]);

  return (
    <div className={`relative mx-auto flex items-center justify-center w-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full aspect-square max-w-[340px] opacity-0 transition-opacity duration-700 [contain:layout_paint_size] cursor-grab touch-none select-none"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {}
        }}
        onPointerUp={(e) => {
          updatePointerInteraction(null);
          try {
            e.currentTarget.releasePointerCapture(e.pointerId);
          } catch {}
        }}
        onPointerCancel={() => updatePointerInteraction(null)}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            updateMovement(e.clientX);
          }
        }}
      />
    </div>
  );
}
