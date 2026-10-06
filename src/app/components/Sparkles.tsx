import { useEffect, useRef } from 'react';

export function Sparkles({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth || 800);
    let height = (canvas.height = canvas.offsetHeight || 400);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 800;
      height = canvas.height = canvas.offsetHeight || 400;
    };
    window.addEventListener('resize', onResize);

    // Subtle star sparkles
    const stars = Array.from({ length: 75 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.3 + 0.6,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.012 + 0.004,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.alpha += star.speed * star.direction;
        if (star.alpha > 0.95) {
          star.alpha = 0.95;
          star.direction = -1;
        } else if (star.alpha < 0.1) {
          star.alpha = 0.1;
          star.direction = 1;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
    />
  );
}
