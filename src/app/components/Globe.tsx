import createGlobe from 'cobe';
import { useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

const MOVEMENT_DAMPING = 1400;

export function Globe({ className = '' }: { className?: string }) {
  let phi = 0;
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
      devicePixelRatio: 2,
      width: (width || 300) * 2,
      height: (width || 300) * 2,
      phi: 0.1,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.15, 0.3],
      markerColor: [0.39, 0.96, 1],
      glowColor: [0.2, 0.4, 0.8],
      markers: [
        // Cairo, Egypt
        { location: [30.0444, 31.2357], size: 0.1 },
        // London
        { location: [51.5074, -0.1278], size: 0.05 },
        // New York
        { location: [40.7128, -74.006], size: 0.06 },
        // Tokyo
        { location: [35.6762, 139.6503], size: 0.05 },
        // Dubai
        { location: [25.2048, 55.2708], size: 0.07 },
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
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
        className="w-full aspect-square max-w-[280px] opacity-0 transition-opacity duration-700 [contain:layout_paint_size] cursor-grab touch-none"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}
